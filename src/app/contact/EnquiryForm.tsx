"use client";

import { useState } from "react";

type FormData = {
  services: string[];
  dateFrom: string;
  dateTo: string;
  duration: string;
  accommodation: string;
  people: string;
  mobilityLevel: string;
  specificNeeds: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactMethod: string;
  message: string;
};

const initialData: FormData = {
  services: [],
  dateFrom: "",
  dateTo: "",
  duration: "",
  accommodation: "",
  people: "1",
  mobilityLevel: "",
  specificNeeds: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  contactMethod: "email",
  message: "",
};

const serviceOptions = [
  "Mobility Scooter Hire",
  "Electric Wheelchair Hire",
  "Manual Wheelchair Hire",
  "Walker / Rollator Hire",
  "Toilet Seat & Shower Chair",
  "Personal Carer (Daytime)",
  "Personal Carer (Night-time)",
  "Accessible Transport",
  "Airport Transfer",
  "All-Inclusive Package",
  "Family Services",
];

export default function EnquiryForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string | string[]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const toggleService = (service: string) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        setError(err.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again or contact us on WhatsApp.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Enquiry Submitted!
        </h2>
        <p className="text-muted mb-6">
          Thank you, {data.firstName}! We&apos;ve received your enquiry and will
          get back to you within 24 hours. Check your email ({data.email}) for a
          confirmation.
        </p>
        <p className="text-sm text-muted">
          Need a faster response?{" "}
          <a
            href="https://wa.me/6281246522084"
            className="text-ocean font-semibold hover:underline"
          >
            Message us on WhatsApp
          </a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= s
                  ? "bg-ocean text-white"
                  : "bg-sand-dark text-muted"
              }`}
            >
              {s}
            </div>
            {s < 4 && (
              <div
                className={`hidden sm:block w-12 md:w-20 h-0.5 ${
                  step > s ? "bg-ocean" : "bg-sand-dark"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Services */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            What services do you need?
          </h2>
          <p className="text-sm text-muted mb-6">
            Select all that apply. You can always change this later.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {serviceOptions.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`p-3 rounded-lg border text-left text-sm transition-colors ${
                  data.services.includes(service)
                    ? "border-ocean bg-ocean/5 text-ocean font-medium"
                    : "border-sand-dark text-muted hover:border-ocean/50"
                }`}
              >
                {data.services.includes(service) ? "✓ " : ""}
                {service}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Dates & Details */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Travel details
          </h2>
          <p className="text-sm text-muted mb-6">
            When are you planning to visit Bali?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="dateFrom" className="block text-sm font-medium mb-1">
                Arrival date
              </label>
              <input
                id="dateFrom"
                type="date"
                value={data.dateFrom}
                onChange={(e) => update("dateFrom", e.target.value)}
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
            <div>
              <label htmlFor="dateTo" className="block text-sm font-medium mb-1">
                Departure date
              </label>
              <input
                id="dateTo"
                type="date"
                value={data.dateTo}
                onChange={(e) => update("dateTo", e.target.value)}
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="people" className="block text-sm font-medium mb-1">
                Number of people
              </label>
              <input
                id="people"
                type="number"
                min="1"
                max="20"
                value={data.people}
                onChange={(e) => update("people", e.target.value)}
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
            <div>
              <label htmlFor="accommodation" className="block text-sm font-medium mb-1">
                Accommodation area
              </label>
              <select
                id="accommodation"
                value={data.accommodation}
                onChange={(e) => update("accommodation", e.target.value)}
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              >
                <option value="">Select area...</option>
                <option value="sanur">Sanur</option>
                <option value="kuta">Kuta / Legian</option>
                <option value="seminyak">Seminyak</option>
                <option value="nusa-dua">Nusa Dua</option>
                <option value="ubud">Ubud</option>
                <option value="canggu">Canggu</option>
                <option value="other">Other / Not booked yet</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Mobility needs */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Specific needs
          </h2>
          <p className="text-sm text-muted mb-6">
            Help us prepare the right support for you. This is optional.
          </p>
          <div className="mb-4">
            <label htmlFor="mobilityLevel" className="block text-sm font-medium mb-1">
              Mobility level
            </label>
            <select
              id="mobilityLevel"
              value={data.mobilityLevel}
              onChange={(e) => update("mobilityLevel", e.target.value)}
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            >
              <option value="">Prefer not to say</option>
              <option value="walking">Can walk with some assistance</option>
              <option value="wheelchair-some">Use wheelchair sometimes</option>
              <option value="wheelchair-full">Full-time wheelchair user</option>
              <option value="scooter">Use mobility scooter</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="specificNeeds" className="block text-sm font-medium mb-1">
              Anything else we should know?
            </label>
            <textarea
              id="specificNeeds"
              rows={4}
              value={data.specificNeeds}
              onChange={(e) => update("specificNeeds", e.target.value)}
              placeholder="E.g. condition type, specific equipment needs, dietary requirements, accessibility requirements for accommodation..."
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          </div>
        </div>
      )}

      {/* Step 4: Contact */}
      {step === 4 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Your contact details
          </h2>
          <p className="text-sm text-muted mb-6">
            How can we reach you with your personalised holiday plan?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First name *
              </label>
              <input
                id="firstName"
                type="text"
                required
                value={data.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last name *
              </label>
              <input
                id="lastName"
                type="text"
                required
                value={data.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone (with country code)
              </label>
              <input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+61 400 000 000"
                className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Preferred contact method
            </label>
            <div className="flex gap-4">
              {["email", "whatsapp", "phone"].map((method) => (
                <label key={method} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="radio"
                    name="contactMethod"
                    value={method}
                    checked={data.contactMethod === method}
                    onChange={(e) => update("contactMethod", e.target.value)}
                    className="accent-ocean"
                  />
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Additional message
            </label>
            <textarea
              id="message"
              rows={3}
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Anything else you'd like us to know..."
              className="w-full border border-sand-dark rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200 mt-4">
          {error}
        </div>
      )}
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-6 py-2 border border-sand-dark rounded-full text-sm font-medium hover:bg-sand transition-colors"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        {step < 4 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="px-6 py-2 bg-ocean text-white rounded-full text-sm font-semibold hover:bg-ocean-dark transition-colors"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-2 bg-coral text-white rounded-full text-sm font-semibold hover:bg-coral/90 transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        )}
      </div>
    </form>
  );
}
