import Link from "next/link";
import WhyUs from "@/components/WhyUs";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-linear-to-brrom-[#0a0f1a] to-blue-800 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4">About Us</h1>
          <p className="text-white/70 text-lg leading-relaxed">
            We&apos;re a passionate digital services team based in Pakistan, dedicated to helping small businesses
            and entrepreneurs build a powerful online presence at an affordable price.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="bg-blue-50 rounded-2xl h-72 flex items-center justify-center text-8xl">🚀</div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Our Story
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 mt-4 mb-4">
              Built to help local businesses compete online
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Pixora was founded with a simple mission: make professional digital services accessible
              to every business, not just the big ones. We believe a small shop in a small city deserves the same
              online quality as a multinational brand.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From graphic design to full website development, we handle every aspect of your digital presence
              with care, speed, and competitive pricing that fits the Pakistani market.
            </p>
          </div>
        </div>
      </section>

      <WhyUs />

      {/* Stats */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { val: "200+", label: "Happy Clients" },
            { val: "500+", label: "Projects Done" },
            { val: "3yr", label: "In Business" },
            { val: "5★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-blue-600">{s.val}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-extrabold mb-3">Let&apos;s work together</h2>
          <p className="text-white/80 mb-7">Start your project today and see the difference quality makes.</p>
          <Link href="/shop"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
            Browse Services
          </Link>
        </div>
      </section>
    </>
  );
}
