import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/image";

interface TextSectionProps {
  eyebrow?: string;
  heading?: string;
  content?: any[];
  alignment?: string;
  background?: string;
  image?: any;
  imagePosition?: string;
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => <p className="text-muted text-lg leading-relaxed mb-4">{children}</p>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold text-foreground mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-semibold text-foreground mb-3">{children}</h3>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-ocean pl-4 italic text-muted my-4">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc list-inside space-y-2 mb-4 text-muted">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal list-inside space-y-2 mb-4 text-muted">{children}</ol>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ children, value }: any) => (
      <a href={value?.href} className="text-ocean hover:underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export function TextSection({
  eyebrow,
  heading,
  content,
  alignment = "left",
  background = "white",
  image,
  imagePosition = "right",
}: TextSectionProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";
  const alignClass = alignment === "center" ? "text-center" : "text-left";

  const textContent = (
    <div className={alignClass}>
      {eyebrow && (
        <span className="inline-block text-ocean font-semibold text-sm uppercase tracking-wider mb-4">
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{heading}</h2>
      )}
      {content && <PortableText value={content} components={portableTextComponents} />}
    </div>
  );

  if (image) {
    const imageUrl = urlFor(image).width(800).quality(80).url();
    const imageEl = (
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src={imageUrl}
          alt={heading || ""}
          width={800}
          height={600}
          className="w-full h-auto"
        />
      </div>
    );

    return (
      <section className={`py-20 md:py-28 ${bgClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid md:grid-cols-2 gap-12 items-center ${imagePosition === "left" ? "md:order-1" : ""}`}>
            <div className={imagePosition === "left" ? "md:order-2" : ""}>{textContent}</div>
            <div className={imagePosition === "left" ? "md:order-1" : ""}>{imageEl}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-20 md:py-28 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">{textContent}</div>
    </section>
  );
}
