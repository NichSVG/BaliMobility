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
  const prompt = `Write a single blog post, roughly 900 to 1100 words, for a blog about Bali. Before writing, randomly pick ONE of the following as the main topic and commit to it fully rather than trying to cover everything:

1. A specific Balinese festival or ceremony — Nyepi and the Ogoh-ogoh parade, Galungan and Kuningan, a village odalan temple anniversary, the Bali Arts Festival, or a smaller local ritual.
2. A specific attraction or place — a temple (Tirta Empul, Uluwatu, Besakih), a natural site (Tegalalang rice terraces, a waterfall, a beach), or a neighborhood worth spending a day in (Ubud center, Sanur promenade, Canggu).
3. Practical mobility tips for getting around Bali — traffic and road conditions, how locals and expats actually get around (scooters, drivers, apps, walking), what's easy versus hard to navigate, and specifically what it's like for someone with limited mobility, a wheelchair, a cane, or just an older traveler who can't manage rough terrain or steep steps.
4. General life and observations on the island — traffic, weather patterns, the rhythm of a normal week, something the writer noticed or got wrong about Bali before living there.

Whichever topic you pick, ground the piece in one specific scene or thread rather than writing a generic overview. If you pick mobility tips, don't write it as a listicle — thread the tips through real anecdotes and specific streets, places, or situations, the way someone would tell a friend about it rather than how a guidebook would list it. If you pick an attraction, go there in the writing: describe getting to it, what the ground and terrain are actually like, not just what's scenic about it.

This is genuine travel and culture writing, not marketing content. The subject is Bali itself, not any company or service.

Voice: write like someone who has actually spent real time in Bali — a long-term resident or frequent visitor, not a tourism board. First person is fine. Use contractions. Vary sentence length on purpose: some short and blunt, some long and winding. For calibration, aim for something closer to "The gamelan started before I'd finished my coffee, which in Ubud on a ceremony day means the morning is already gone" than "Bali comes alive with vibrant sounds and colors during festival season." Include a genuine, specific opinion somewhere, not just praise — a complaint, a preference, something with an actual point of view. The piece doesn't need to resolve neatly; it's fine to end on an image or a small unfinished thought instead of a tidy wrap-up.

Ground everything in specifics: real place names, actual streets or landmarks, real sensory detail (what pavement feels like under a wheelchair or cane, what clove cigarette smoke and incense smell like together, the heat right before an afternoon downpour), instead of generic travel-writing adjectives like "magical" or "breathtaking."

If the topic naturally touches on accessibility — uneven sidewalks, missing curb cuts outside the main tourist strips, temple steps, how festival crowds change what's navigable — let that come through as something the writer noticed firsthand, not a bulleted tips list, unless topic 3 was chosen, in which case practical detail is the point but should still read as lived experience rather than a checklist.

Do not mention any specific business by name unless it arises with total naturalness, and even then keep it vague and unbranded ("an accessible transport service," "a driver I usually call") rather than naming a company. If no natural moment for it arises, leave it out entirely — the post should work perfectly well with zero promotional content.

Formatting: plain paragraphs only. No markdown headers, no ## symbols, no asterisks or ** for bold, no bullet points or numbered lists anywhere in the output, even for the mobility tips topic. If you include a title, write it as a plain line of text with nothing formatted around it. Break the piece into a good number of distinct paragraphs — short ones, generally 2 to 4 sentences each, not dense blocks of 8 to 10 sentences. Separate every paragraph with a blank line. Vary paragraph length for rhythm, but never let one paragraph run more than about 5 sentences.

Avoid these specifically:
- Opening lines like "Bali, an island of..." or "Nestled in the Indian Ocean..." or "Picture this:"
- Words like nestled, vibrant tapestry, boasts, elevate, delve, unlock, a testament to, whether you're...or, from...to, it's important to note, in today's world, in conclusion, moreover, furthermore, additionally
- The three-adjective list rhythm ("colorful, chaotic, and captivating")
- A final paragraph that just summarizes everything above it
- Paragraphs that are all roughly the same length
- Heavy em-dash use — use them rarely, the way someone editing their own writing would
- Ending on a call to action or anything that sounds like marketing copy

Output only the finished blog post. No title options, no notes on which topic you picked, nothing before or after it.

The random topic selected for this post is: "${topic}"

After writing the blog post, you must return valid JSON with these fields:
- title: string (the title of the blog post)
- excerpt: string (1-2 sentences, conversational summary)
- content: string (the full blog post in plain text paragraphs — NO ## headers, NO markdown, NO bullet points, NO asterisks)
- category: one of "bali-culture", "accessibility", "travel-tips", "equipment", or "destinations"
- tags: string[] (3-5 tags)
- seoTitle: string (max 60 chars)
- seoDescription: string (max 160 chars)

Return ONLY valid JSON. No text before or after the JSON.`;

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
              "You are a writer who has spent real time living in Bali. You write genuine travel and culture writing, not marketing content. The subject is Bali itself. Ground everything in specifics: real place names, real sensory detail, actual streets or landmarks. Vary sentence length. Include a real opinion, not just praise. Never use markdown headers, bullet points, numbered lists, or asterisks. Write plain paragraphs only. Always respond with valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.85,
        max_tokens: 6000,
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
