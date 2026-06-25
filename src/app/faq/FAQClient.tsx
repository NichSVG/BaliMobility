"use client";

import { useState } from "react";

type FAQItem = {
  category: string;
  question: string;
  answer: string;
};

export default function FAQClient({ items }: { items: FAQItem[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Group by category
  const categories = items.reduce<Record<string, FAQItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="py-16 md:py-24" aria-label="FAQ categories">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {Object.entries(categories).map(([category, questions]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-foreground mb-6">{category}</h2>
              <div className="space-y-3">
                {questions.map((item, i) => {
                  const key = `${category}-${i}`;
                  const isOpen = openItems[key];
                  return (
                    <div key={key} className="bg-white border border-sand-dark rounded-xl overflow-hidden transition-shadow hover:shadow-sm">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-5 text-left font-medium text-foreground hover:bg-sand/50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4 text-base">{item.question}</span>
                        <svg
                          className={`w-5 h-5 shrink-0 text-muted transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-5 pb-5 text-muted leading-relaxed border-t border-sand-dark pt-4">
                          {item.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
