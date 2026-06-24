import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-10",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const GROQ_API_KEY = process.env.GROQ_API_KEY;

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
  const prompt = `Write a blog post about: "${topic}"

This is for Bali Mobility (balimobility.com), a family-run company in Bali that rents mobility equipment (wheelchairs, mobility scooters, walker frames, shower seats, toilet seats, baby push chairs, baby car seats).

WRITING STYLE:
- Write like a real person having a conversation, not like a textbook
- Use short paragraphs (2-4 sentences max)
- Mix up sentence lengths - some short, some longer
- NEVER use ## or # markdown headers - just write in flowing paragraphs
- Use bullet points sparingly, only for actual lists of items
- Tell stories and give examples, not just generic advice
- Be warm and helpful, not corporate
- 600-900 words (shorter is fine, don't pad it out)

CONTENT:
- Share real practical tips someone would actually use
- Mention Bali Mobility naturally once or twice (don't force it)
- End with a casual call-to-action, not a sales pitch
- Focus on accessibility and mobility where it fits naturally

Return as valid JSON:
- title: string
- excerpt: 1-2 sentences, conversational summary
- content: the blog post in plain text paragraphs (NO ## headers at all)
- category: "bali-culture" | "accessibility" | "travel-tips" | "equipment" | "destinations"
- tags: string[] (3-5 tags)
- seoTitle: string (max 60 chars)
- seoDescription: string (max 160 chars)

Return ONLY valid JSON.`;

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly travel blogger who writes like you're talking to a friend. You know Bali well and care about helping people with disabilities travel comfortably. Write naturally, not like AI. NEVER use ## or # headers in your content - just write flowing paragraphs. Respond with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4096,
        response_format: { type: "json_object" },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Groq API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);
  
  // Strip any ## headers from content
  if (result.content) {
    result.content = result.content
      .replace(/^#{1,6}\s+.*$/gm, '') // Remove markdown headers
      .replace(/\n{3,}/g, '\n\n') // Collapse multiple blank lines
      .trim();
  }
  
  return result;
}

export async function GET(req: NextRequest) {
  // Verify cron secret
  const querySecret = req.nextUrl.searchParams.get("secret");
  const cronSecret = process.env.CRON_SECRET;

  if (querySecret !== cronSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!GROQ_API_KEY) {
    return NextResponse.json(
      { error: "GROQ_API_KEY not configured" },
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
