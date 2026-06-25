import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "How to Rent a Wheelchair in Bali: Complete Guide",
  description:
    "Everything you need to know about renting a wheelchair in Bali. Delivery, rates, equipment types, and tips from a local rental company.",
  alternates: {
    canonical: "/blog/how-to-rent-wheelchair-bali",
  },
};

export default function BlogPost() {
  return (
    <>
      <PageHeader
        title="How to Rent a Wheelchair in Bali"
        subtitle="Equipment Guide"
        description="Everything you need to know about renting a wheelchair in Bali — from booking to delivery."
        variant="ocean"
      />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted mb-8">
              Renting a wheelchair in Bali is straightforward — if you know what to expect. Here&apos;s our complete guide based on years of helping travellers get the right equipment.
            </p>

            <p className="text-muted mb-4">
              We offer lightweight, foldable wheelchairs with removable footrests, a folding design that fits in car boots, and a weight capacity of 120kg. They have comfortable padded seating and are easy to lift and transport.
            </p>

            <p className="text-muted mb-4">
              We recommend booking at least <strong>1 week before</strong> your trip. This ensures availability and gives us time to arrange delivery to your hotel. You can book via WhatsApp at +62 821-4652-2084 (fastest) or fill out our enquiry form.
            </p>

            <p className="text-muted mb-4">
              We deliver free of charge to hotels and villas across Bali including Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and surrounding areas. We can deliver <strong>before you arrive</strong> so the wheelchair is waiting at your hotel when you check in.
            </p>

            <p className="text-muted mb-4">
              If you have any issues with the wheelchair, contact us anytime. We offer <strong>24/7 support</strong> and can repair or replace equipment within hours. When you&apos;re done, simply leave the wheelchair at your hotel and we&apos;ll pick it up. No need to drop it off anywhere.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sand">
                    <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    <th className="text-left p-3 font-semibold text-foreground">USD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Daily</td>
                    <td className="p-3 text-muted">$10</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">3 Days</td>
                    <td className="p-3 text-muted">$25</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Weekly</td>
                    <td className="p-3 text-muted">$50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sand rounded-xl p-6 mt-8">
              <h3 className="font-bold text-foreground mb-2">Ready to book?</h3>
              <p className="text-muted mb-4">Contact us to reserve your wheelchair for your Bali trip.</p>
              <a href="https://wa.me/6282146522084" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
