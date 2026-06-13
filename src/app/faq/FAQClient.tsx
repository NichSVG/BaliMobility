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
                    <div key={key} className="bg-white border border-sand-dark rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between p-4 text-left font-medium text-foreground hover:bg-sand/50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4">{item.question}</span>
                        <svg className={`w-5 h-5 shrink-0 text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-sm text-muted border-t border-sand-dark pt-3">{item.answer}</div>
                      )}
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
