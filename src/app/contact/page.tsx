import { Metadata } from "next";
import EnquiryForm from "./EnquiryForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Plan your accessible Bali holiday. Contact us for a free quote on equipment hire, carers, transport, and all-inclusive packages.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us | Bali Mobility",
    description:
      "Plan your accessible Bali holiday. Contact us for a free quote on equipment hire, carers, transport, and all-inclusive packages.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Plan Your Holiday"
        subtitle="Get in Touch"
        description="Tell us about your needs and we&apos;ll create a personalised accessible holiday plan. No obligation — just friendly, expert advice."
        variant="warm"
        image="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=80"
        breadcrumbs={[{ label: "Contact", href: "/contact" }]}
      />

      <section className="py-16 md:py-24" aria-label="Enquiry form and contact details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <EnquiryForm />
            </div>

            {/* Contact Info Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-sand-dark">
                <h2 className="font-bold text-lg mb-4">Contact Details</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <div className="font-medium text-foreground">Address</div>
                    <div className="text-muted">
                      Perumahan Griya Carik No.16
                      <br />
                      Bona Kelod, Blahbatuh, Gianyar
                      <br />
                      Bali, Indonesia
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">WhatsApp</div>
                    <a
                      href="https://wa.me/6282146522084"
                      className="text-ocean hover:underline"
                    >
                      +62 821-4652-2084
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <a
                      href="mailto:dedikbali@yahoo.com"
                      className="text-ocean hover:underline"
                    >
                      dedikbali@yahoo.com
                    </a>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Hours</div>
                    <div className="text-muted">
                      Daily: 8:00 AM – 4:00 PM (WITA)
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500 text-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">
                  Prefer WhatsApp?
                </h3>
                <p className="text-sm text-white/90 mb-4">
                  Message us directly for a faster response. We usually reply
                  within minutes during business hours.
                </p>
                <a
                  href="https://wa.me/6282146522084?text=Hi%20Bali%20Mobility!%20I%27d%20like%20to%20enquire%20about%20a%20holiday."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-white text-green-600 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="bg-white rounded-xl p-6 border border-sand-dark">
                <h3 className="font-bold text-lg mb-2">Response Time</h3>
                <p className="text-sm text-muted">
                  We aim to respond to all enquiries within 24 hours. For urgent
                  requests, please call or message us on WhatsApp.
                </p>
              </div>

              {/* Google Map Embed */}
              <div className="rounded-xl overflow-hidden border border-sand-dark">
                <iframe
                  title="Bali Mobility office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.1!2d115.25!3d-8.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDAnNDguMCJTIDExNcKwMTUnMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
