"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/contact";

type FormData = {
  services: string[];
  dateFrom: string;
  dateTo: string;
  accommodation: string;
  people: string;
  mobilityLevel: string;
  specificNeeds: string;
  firstName: string;
  lastName: string;
  message: string;
};

const initialData: FormData = {
  services: [],
  dateFrom: "",
  dateTo: "",
  accommodation: "",
  people: "1",
  mobilityLevel: "",
  specificNeeds: "",
  firstName: "",
  lastName: "",
  message: "",
};

const serviceOptions = [
  { name: "Mobility Scooter", icon: "🛵" },
  { name: "Wheelchair", icon: "🦽" },
  { name: "Baby Push Chair", icon: "👶" },
  { name: "Baby Car Seat", icon: "🚗" },
  { name: "Walker Frame", icon: "🦯" },
  { name: "Shower Seat", icon: "🚿" },
  { name: "Toilet Seat", icon: "🚽" },
];

const accommodationLabels: Record<string, string> = {
  sanur: "Sanur",
  kuta: "Kuta / Legian",
  seminyak: "Seminyak",
  "nusa-dua": "Nusa Dua",
  ubud: "Ubud",
  canggu: "Canggu",
  other: "Other / Not booked yet",
};

const mobilityLabels: Record<string, string> = {
  walking: "Can walk with some assistance",
  "wheelchair-some": "Use wheelchair sometimes",
  "wheelchair-full": "Full-time wheelchair user",
  scooter: "Use mobility scooter",
  other: "Other",
};

const stepLabels = ["Equipment", "Details", "Your Name"];

function buildWhatsAppMessage(data: FormData): string {
  const lines: string[] = [];

  lines.push("*New Equipment Rental Enquiry*");
  lines.push("━━━━━━━━━━━━━━━━━━━━");
  lines.push("");
  lines.push(`*Name:* ${data.firstName} ${data.lastName}`);

  if (data.services.length > 0) {
    lines.push("");
    lines.push("*Equipment:*");
    data.services.forEach((s) => lines.push(`  • ${s}`));
  }

  if (data.dateFrom || data.dateTo) {
    lines.push("");
    lines.push("*Travel Dates:*");
    if (data.dateFrom) lines.push(`  Arrival: ${data.dateFrom}`);
    if (data.dateTo) lines.push(`  Departure: ${data.dateTo}`);
  }

  const details: string[] = [];
  if (data.people && data.people !== "1") details.push(`${data.people} people`);
  if (data.accommodation) details.push(accommodationLabels[data.accommodation] || data.accommodation);
  if (details.length > 0) {
    lines.push("");
    lines.push(`*Details:* ${details.join(" · ")}`);
  }

  if (data.mobilityLevel) {
    lines.push("");
    lines.push(`*Mobility:* ${mobilityLabels[data.mobilityLevel] || data.mobilityLevel}`);
  }

  if (data.specificNeeds) {
    lines.push("");
    lines.push(`*Notes:* ${data.specificNeeds}`);
  }

  if (data.message) {
    lines.push("");
    lines.push(`*Message:* ${data.message}`);
  }

  return lines.join("\n");
}

export default function EnquiryForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const canProceed = () => {
    if (step === 1) return data.services.length > 0;
    if (step === 2) return true;
    return data.firstName.trim() !== "" && data.lastName.trim() !== "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          services: data.services,
          dateFrom: data.dateFrom,
          dateTo: data.dateTo,
          people: data.people,
          accommodation: data.accommodation,
          mobilityLevel: data.mobilityLevel,
          specificNeeds: data.specificNeeds,
          message: data.message,
          contactMethod: "whatsapp",
        }),
      });
    } catch {
      // WhatsApp is the primary channel, API save is best-effort
    }

    const message = buildWhatsAppMessage(data);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setSent(true);
    setSaving(false);
  };

  if (sent) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Enquiry Ready!
        </h2>
        <p className="text-muted mb-6">
          Your enquiry has been sent to WhatsApp. If it didn&apos;t open
          automatically, click the button below.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
        >
          Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 md:p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => s < step && setStep(s)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s
                    ? "bg-ocean text-white"
                    : "bg-sand-dark text-muted"
                } ${s < step ? "cursor-pointer hover:bg-ocean-dark" : ""}`}
              >
                {step > s ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </button>
              {s < 3 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                  step > s ? "bg-ocean" : "bg-sand-dark"
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted px-1">
          {stepLabels.map((label, i) => (
            <span key={label} className={step >= i + 1 ? "text-ocean font-medium" : ""}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* Step 1: Equipment */}
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            What equipment do you need?
          </h2>
          <p className="text-sm text-muted mb-6">
            Select all that apply.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mb-6">
            {serviceOptions.map((service) => (
              <button
                key={service.name}
                type="button"
                onClick={() => toggleService(service.name)}
                className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                  data.services.includes(service.name)
                    ? "border-ocean bg-ocean/5 shadow-sm"
                    : "border-sand-dark hover:border-ocean/40 hover:bg-sand/50"
                }`}
              >
                {data.services.includes(service.name) && (
                  <span className="absolute top-2 right-2 w-5 h-5 bg-ocean rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
                <span className="text-2xl block mb-1" aria-hidden="true">{service.icon}</span>
                <span className={`text-sm font-medium ${data.services.includes(service.name) ? "text-ocean" : "text-foreground"}`}>
                  {service.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Travel Details */}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Travel details
          </h2>
          <p className="text-sm text-muted mb-6">
            When are you visiting Bali?
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
                className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
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
                className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
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
                className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
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
                className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
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
          <div className="mb-4">
            <label htmlFor="mobilityLevel" className="block text-sm font-medium mb-1">
              Mobility level (optional)
            </label>
            <select
              id="mobilityLevel"
              value={data.mobilityLevel}
              onChange={(e) => update("mobilityLevel", e.target.value)}
              className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
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
              Anything else we should know? (optional)
            </label>
            <textarea
              id="specificNeeds"
              rows={3}
              value={data.specificNeeds}
              onChange={(e) => update("specificNeeds", e.target.value)}
              placeholder="E.g. specific equipment needs, weight requirements..."
              className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          </div>
        </div>
      )}

      {/* Step 3: Name & Submit */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Your name
          </h2>
          <p className="text-sm text-muted mb-6">
            So we know who we&apos;re speaking with.
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
                className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
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
                className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Additional message (optional)
            </label>
            <textarea
              id="message"
              rows={3}
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Anything else you'd like us to know..."
              className="w-full border border-sand-dark rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ocean"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="flex-1 py-3.5 border-2 border-sand-dark rounded-xl text-sm font-semibold hover:bg-sand transition-colors"
          >
            Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => canProceed() && setStep(step + 1)}
            disabled={!canProceed()}
            className={`flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all ${
              canProceed()
                ? "bg-ocean text-white hover:bg-ocean-dark shadow-sm"
                : "bg-sand-dark text-muted cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        ) : (
          <button
            type="submit"
            disabled={saving}
            className="flex-1 py-3.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {saving ? "Sending..." : "Send via WhatsApp"}
          </button>
        )}
      </div>

      {/* Sticky mobile WhatsApp shortcut */}
      <div className="mt-4 text-center">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Bali Mobility! I'd like to enquire about equipment rental.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-600 text-sm font-medium hover:underline"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Or skip the form — chat with us directly
        </a>
      </div>
    </form>
  );
}
