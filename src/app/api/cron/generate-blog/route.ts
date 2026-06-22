import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-10",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const BLOG_TOPICS = [
  // Bali Culture & Festivals
  "Nyepi (Bali Day of Silence): What travellers need to know",
  "Galungan and Kuningan: Bali's most important festival",
  "Bali Arts Festival: A month-long celebration of Balinese culture",
  "Saraswati Day: Bali's celebration of knowledge and learning",
  "Pagerwesi: The day of strengthening mind and spirit",
  "Odalan: Temple anniversary ceremonies in Bali",
  "Melasti: Bali's sacred purification ceremony before Nyepi",
  "Omed-omedan: Bali's unique kissing festival",
  "Makepung: Buffalo racing in Bali",
  "Bali Kite Festival: A spectacular sky celebration",

  // Accessibility & Disability
  "How Bali is becoming more wheelchair accessible",
  "Travelling to Bali with a mobility scooter: What you need to know",
  "Accessible temples in Bali: A wheelchair user's guide",
  "Bali's best wheelchair-friendly restaurants",
  "Flying to Bali with mobility equipment: Airline policies guide",
  "Accessible shopping in Bali: Malls and markets for wheelchair users",
  "Bali's accessible spas and wellness centres",
  "How to navigate Bali airports with a wheelchair",
  "Accessible day trips from Bali for mobility-impaired travellers",
  "Tips for solo travellers with disabilities visiting Bali",

  // Travel Tips
  "Best time to visit Bali for accessible travel",
  "Bali on a budget: Affordable accessible holidays",
  "What to pack for an accessible Bali holiday",
  "Bali travel insurance: What mobility-impaired travellers need",
  "Getting around Bali with limited mobility",
  "Bali's most accessible hotels and resorts",
  "A week in Bali: Accessible itinerary for first-timers",
  "Bali with kids: Family-friendly accessible activities",
  "Bali's rainy season: Tips for wheelchair users",
  "How to hire a private driver in Bali",
];

function getRandomTopic(): string {
  return BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function generateBlogPost(topic: string) {
  const prompt = `Write a detailed, engaging blog post about: "${topic}"

This is for Bali Mobility (balimobility.com), a family-run company in Bali that rents mobility equipment (wheelchairs, mobility scooters, walker frames, shower seats, toilet seats, baby push chairs, baby car seats).

Requirements:
- Write in a friendly, helpful tone
- 800-1200 words
- Include practical tips and advice
- Mention Bali Mobility naturally where relevant (not spammy)
- Include a call-to-action at the end
- Use subheadings (## format)
- Focus on accessibility and mobility where relevant
- Be informative and SEO-friendly

Return the response as a valid JSON object with these fields:
- title: The blog post title (string)
- excerpt: A 2-3 sentence summary (string)
- content: The full blog post in markdown format (string)
- category: One of "bali-culture", "accessibility", "travel-tips", "equipment", "destinations" (string)
- tags: Array of 3-5 relevant tags (array of strings)
- seoTitle: SEO-optimized title (max 60 chars) (string)
- seoDescription: Meta description (max 160 chars) (string)

IMPORTANT: Return ONLY valid JSON, no other text.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a travel blogger specializing in accessible travel in Bali. Write engaging, helpful content that ranks well in search engines. Always respond with valid JSON only.\n\n${prompt}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  // Clean the response - remove markdown code blocks if present
  const cleanedText = text
    .replace(/```json\n?/g, "")
    .replace(/```\n?/g, "")
    .trim();

  return JSON.parse(cleanedText);
}

export async function GET(req: NextRequest) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "GEMINI_API_KEY not configured" },
      { status: 500 }
    );
  }

  try {
    const topic = getRandomTopic();
    console.log(`Generating blog post about: ${topic}`);

    const post = await generateBlogPost(topic);

    // Save to Sanity
    const doc = await sanity.create({
      _type: "blogPost",
      title: post.title,
      slug: { current: generateSlug(post.title) },
      excerpt: post.excerpt,
      content: [
        {
          _type: "block",
          _key: "content",
          style: "normal",
          children: [
            {
              _type: "span",
              _key: "text",
              text: post.content,
              marks: [],
            },
          ],
        },
      ],
      category: post.category,
      tags: post.tags,
      publishedAt: new Date().toISOString(),
      featured: false,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
    });

    console.log(`Blog post created: ${doc._id} - ${post.title}`);

    return NextResponse.json({
      success: true,
      id: doc._id,
      title: post.title,
      topic,
    });
  } catch (error: any) {
    console.error("Blog generation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
