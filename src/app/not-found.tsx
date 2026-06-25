import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32 text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-6xl mb-6">🛴</div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted text-lg mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have been moved or doesn&apos;t exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/equipment"
            className="inline-block border border-ocean text-ocean px-6 py-3 rounded-full font-semibold hover:bg-ocean/5 transition-colors"
          >
            View Equipment
          </Link>
          <Link
            href="/contact"
            className="inline-block border border-sand-dark text-foreground px-6 py-3 rounded-full font-semibold hover:bg-sand transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
