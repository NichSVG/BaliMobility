import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { blogPostBySlugQuery, blogPostsQuery } from "@/lib/queries";
import PageHeader from "@/components/PageHeader";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

export const revalidate = 0;

const categoryLabels: Record<string, string> = {
  "bali-culture": "Bali Culture & Festivals",
  accessibility: "Accessibility & Disability",
  "travel-tips": "Travel Tips",
  equipment: "Equipment Guides",
  destinations: "Destinations",
};

function stripMarkdownHeaders(text: string): string {
  return text
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => {
      if (typeof children === 'string') {
        const cleaned = stripMarkdownHeaders(children);
        if (!cleaned) return null;
        return <p className="text-muted mb-4">{cleaned}</p>;
      }
      return <p className="text-muted mb-4">{children}</p>;
    },
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  },
};

export async function generateStaticParams() {
  const posts = await client.fetch(blogPostsQuery).catch(() => []);
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client
    .fetch(blogPostBySlugQuery, { slug })
    .catch(() => null);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.seoTitle || post.title,
    description:
      post.seoDescription ||
      post.excerpt ||
      `Read about ${post.title} on the Bali Mobility blog.`,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await client
    .fetch(blogPostBySlugQuery, { slug })
    .catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title={post.title}
        subtitle={categoryLabels[post.category] || post.category}
        description={post.excerpt}
        variant="ocean"
      />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-sm font-semibold text-ocean bg-ocean/10 px-3 py-1 rounded-full">
              {categoryLabels[post.category] || post.category}
            </span>
            <span className="text-sm text-muted">
              {new Date(post.publishedAt).toLocaleDateString("en-AU", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content ? (
              <PortableText value={post.content} components={components} />
            ) : (
              <p className="text-muted">Content loading...</p>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-sand-dark">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-sm text-muted bg-sand px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-sand-dark">
            <div className="bg-sand rounded-xl p-6">
              <h3 className="font-bold text-foreground mb-2">
                Need mobility equipment in Bali?
              </h3>
              <p className="text-muted mb-4">
                We rent wheelchairs, mobility scooters, walker frames and more.
                Free delivery to your hotel.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors"
                >
                  Rent Equipment
                </Link>
                <a
                  href="https://wa.me/6282146522084"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href="/blog"
              className="text-ocean font-semibold hover:underline flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </article>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.seoDescription || post.excerpt,
            datePublished: post.publishedAt,
            author: {
              "@type": "Organization",
              name: "Bali Mobility",
              url: "https://balimobility.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Bali Mobility",
              url: "https://balimobility.com",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://balimobility.com/blog/${post.slug}`,
            },
          }),
        }}
      />
    </>
  );
}
