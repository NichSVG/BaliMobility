import { client } from "@/lib/sanity";
import { faqQuery } from "@/lib/queries";
import FAQClient from "@/app/faq/FAQClient";

interface FAQSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  category?: string;
  background?: string;
}

export async function FAQSection({
  eyebrow = "FAQ",
  heading = "Frequently Asked Questions",
  description,
  category,
  background = "white",
}: FAQSectionProps) {
  const allFaqs = await client.fetch(faqQuery).catch(() => []);
  const faqs = category
    ? allFaqs.filter((f: any) => f.category === category)
    : allFaqs;

  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section className={`py-20 md:py-28 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="inline-block text-ocean font-semibold text-sm uppercase tracking-wider mb-4">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-muted text-lg">{description}</p>
          )}
        </div>
        <FAQClient items={faqs} />
      </div>
    </section>
  );
}
