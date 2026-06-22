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

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Step 1: Choose Your Wheelchair</h2>
            <p className="text-muted mb-4">
              We offer lightweight, foldable wheelchairs with the following features:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li>Lightweight aluminium frame (easy to lift and transport)</li>
              <li>Removable footrests</li>
              <li>Folding design (fits in car boots)</li>
              <li>Weight capacity: 120kg</li>
              <li>Comfortable padded seating</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Step 2: Book in Advance</h2>
            <p className="text-muted mb-4">
              We recommend booking at least <strong>1 week before</strong> your trip. This ensures availability and gives us time to arrange delivery to your hotel.
            </p>
            <p className="text-muted mb-4">
              You can book via:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>WhatsApp:</strong> Message us at +62 821-4652-2084 (fastest)</li>
              <li><strong>Contact form:</strong> Fill out our <Link href="/contact" className="text-ocean hover:underline">enquiry form</Link></li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Step 3: Delivery</h2>
            <p className="text-muted mb-4">
              We deliver free of charge to hotels and villas across Bali:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li>Sanur</li>
              <li>Kuta / Legian</li>
              <li>Seminyak</li>
              <li>Nusa Dua</li>
              <li>Ubud</li>
              <li>And surrounding areas</li>
            </ul>
            <p className="text-muted mb-4">
              We can deliver <strong>before you arrive</strong> so the wheelchair is waiting at your hotel when you check in.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Step 4: During Your Rental</h2>
            <p className="text-muted mb-4">
              If you have any issues with the wheelchair, contact us anytime. We offer <strong>24/7 support</strong> and can repair or replace equipment within hours.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Step 5: Return</h2>
            <p className="text-muted mb-4">
              When you&apos;re done, simply leave the wheelchair at your hotel and we&apos;ll pick it up. No need to drop it off anywhere.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Rental Rates</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sand">
                    <th className="text-left p-3 font-semibold text-foreground">Duration</th>
                    <th className="text-left p-3 font-semibold text-foreground">AUD</th>
                    <th className="text-left p-3 font-semibold text-foreground">IDR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Daily</td>
                    <td className="p-3 text-muted">$20</td>
                    <td className="p-3 text-muted">200,000</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Weekly</td>
                    <td className="p-3 text-muted">$90</td>
                    <td className="p-3 text-muted">900,000</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Full Holiday</td>
                    <td className="p-3 text-muted">$130</td>
                    <td className="p-3 text-muted">1,300,000</td>
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
