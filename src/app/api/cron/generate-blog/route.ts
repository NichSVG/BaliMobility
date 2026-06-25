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
  // Mobility & Equipment SEO
  "Mobility scooter vs wheelchair for Bali holidays: Which is right for you?",
  "How to rent a mobility scooter in Bali: Complete guide for 2026",
  "Best mobility scooters for travelling: What to look for",
  "Wheelchair hire in Bali: Everything you need to know before you go",
  "Is Bali wheelchair accessible? An honest guide for 2026",
  "Mobility scooter rental vs buying: Why renting makes sense for holidays",
  "How to choose the right mobility equipment for your Bali trip",
  "Walker frames vs wheelchairs: Which mobility aid do you need in Bali?",
  "Shower chairs and toilet seats: Bathroom safety equipment for Bali holidays",
  "Mobility scooter battery life: How far can you really go in Bali?",

  // Accessible Bali Travel
  "Wheelchair-friendly beaches in Bali: Where to go and what to expect",
  "Accessible restaurants in Sanur, Kuta, and Seminyak",
  "How to get around Bali with limited mobility: Transport options",
  "Accessible Bali: A day-by-day itinerary for wheelchair users",
  "Bali's most accessible temples for mobility-impaired visitors",
  "Flying to Bali with a wheelchair: Airline policies and tips",
  "Accessible shopping in Bali: Malls, markets, and boutiques",
  "Bali spa and wellness experiences for people with disabilities",
  "Solo travel in Bali with a mobility scooter: Tips and advice",
  "Family holidays in Bali with elderly parents: Accessibility guide",

  // Bali Destinations & Culture
  "Ubud for wheelchair users: Accessible rice terraces, art, and culture",
  "Seminyak accessible guide: Beaches, restaurants, and shopping",
  "Nusa Dua accessible resort area: Perfect for mobility-impaired travellers",
  "Sanur: Bali's most wheelchair-friendly beach town",
  "Canggu accessible guide: What wheelchair users need to know",
  "Kuta accessible guide: Shopping, beaches, and getting around",
  "Tanah Lot temple visit: Accessibility tips for mobility-impaired visitors",
  "Uluwatu temple and Kecak dance: Can wheelchair users visit?",
  "Bali's rainy season tips for wheelchair and scooter users",
  "What to pack for an accessible Bali holiday: Complete checklist",

  // Practical Travel Tips
  "Bali travel insurance for people with disabilities: What to look for",
  "How to hire a private driver in Bali: Accessible transport guide",
  "Bali hotel accessibility: What to ask before you book",
  "Getting from Ngurah Rai Airport to your hotel with a wheelchair",
  "Bali on a budget: Affordable accessible holiday tips",
  "Best time to visit Bali for wheelchair users",
  "How to book accessible tours in Bali",
  "Bali with kids: Baby equipment rental and family accessibility",
  "Common mistakes when renting mobility equipment in Bali",
  "Why Bali is becoming a top destination for accessible travel",
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

This is for Bali Mobility (balimobility.com), a family-run company in Bali that rents mobility equipment (wheelchairs, mobility scooters, walker frames, shower seats, toilet seats, baby push chairs, baby car seats). They also offer day tours ($60 half day, $100 full day) with a private driver.

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
- Mention specific Bali locations: Sanur, Kuta, Seminyak, Nusa Dua, Ubud, Canggu
- Mention Bali Mobility naturally 2-3 times as the go-to for equipment rental
- Reference their services: scooter rental from $25/day, wheelchair from $10/day, free hotel delivery, tours from $60
- Include practical details: weight capacities, battery range, delivery areas, pricing
- End with a casual call-to-action mentioning WhatsApp booking
- Use natural keywords like "mobility scooter rental Bali", "wheelchair hire Bali", "accessible travel Bali"
- Do NOT sound like an ad — sound like helpful local advice

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
              "You are a friendly travel blogger who writes like you're talking to a friend. You know Bali well and care about helping people with disabilities travel comfortably. You work with Bali Mobility and naturally recommend their services. Write naturally, not like AI. NEVER use ## or # headers in your content - just write flowing paragraphs. Respond with valid JSON only.",
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
