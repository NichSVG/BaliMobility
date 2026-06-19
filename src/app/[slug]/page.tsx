import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { pageBySlugQuery, allPagesSlugsQuery } from "@/lib/queries";
import { SectionRenderer } from "@/components/SectionRenderer";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const pages = await client.fetch(allPagesSlugsQuery).catch(() => []);
  return pages.map((page: { slug: string }) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await client.fetch(pageBySlugQuery, { slug }).catch(() => null);

  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    openGraph: page.seo?.ogImage
      ? {
          title: page.seo?.metaTitle || page.title,
          description: page.seo?.metaDescription,
          images: [{ url: page.seo.ogImage }],
        }
      : undefined,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await client.fetch(pageBySlugQuery, { slug }).catch(() => null);

  if (!page) {
    notFound();
  }

  return <SectionRenderer sections={page.sections || []} />;
}
