import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TextSection } from "@/components/sections/TextSection";
import { CTASection } from "@/components/sections/CTASection";
import { StatsSection } from "@/components/sections/StatsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { ImageTextSection } from "@/components/sections/ImageTextSection";

interface SectionRendererProps {
  sections: any[];
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  if (!sections || sections.length === 0) return null;

  return (
    <>
      {sections.map((section) => {
        switch (section._type) {
          case "heroSection":
            return (
              <HeroSection
                key={section._key}
                heading={section.heading}
                subheading={section.subheading}
                image={section.image}
                buttons={section.buttons}
                overlay={section.overlay}
                height={section.height}
              />
            );
          case "featuresSection":
            return (
              <FeaturesSection
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                description={section.description}
                columns={section.columns}
                features={section.features}
                background={section.background}
              />
            );
          case "textSection":
            return (
              <TextSection
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                content={section.content}
                alignment={section.alignment}
                background={section.background}
                image={section.image}
                imagePosition={section.imagePosition}
              />
            );
          case "ctaSection":
            return (
              <CTASection
                key={section._key}
                heading={section.heading}
                description={section.description}
                buttons={section.buttons}
                background={section.background}
              />
            );
          case "statsSection":
            return (
              <StatsSection
                key={section._key}
                stats={section.stats}
                background={section.background}
              />
            );
          case "gallerySection":
            return (
              <GallerySection
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                description={section.description}
                images={section.images}
                columns={section.columns}
              />
            );
          case "testimonialsSection":
            return (
              <TestimonialsSection
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                description={section.description}
                limit={section.limit}
                showOnlyFeatured={section.showOnlyFeatured}
                background={section.background}
              />
            );
          case "faqSection":
            return (
              <FAQSection
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                description={section.description}
                category={section.category}
                background={section.background}
              />
            );
          case "imageTextSection":
            return (
              <ImageTextSection
                key={section._key}
                eyebrow={section.eyebrow}
                heading={section.heading}
                text={section.text}
                points={section.points}
                image={section.image}
                imageAlt={section.imageAlt}
                imagePosition={section.imagePosition}
                button={section.button}
                background={section.background}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
