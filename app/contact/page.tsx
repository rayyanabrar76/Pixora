"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", service: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Info */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-3">Get In Touch</h1>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-md">
            Have a project in mind? Want to discuss a service? We respond to every message within a few hours.
          </p>

          <div className="space-y-5">
            {[
              { icon: "✉", label: "Email", value: "yourmail@gmail.com" },
              { icon: "📞", label: "Phone", value: "03XX-XXXXXXX" },
              { icon: "📍", label: "Location", value: "Your City, Pakistan" },
              { icon: "🕐", label: "Hours", value: "Mon–Sat, 9am – 9pm" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{item.label}</div>
                  <div className="text-gray-900 font-medium mt-0.5">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
          {sent ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-bold text-green-600 text-lg">Message sent!</h3>
              <p className="text-gray-500 text-sm mt-1">We&apos;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1.5">Your Name</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ahmed Khan"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-600 block mb-1.5">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Service You Need</label>
                <input value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                  placeholder="e.g. Logo Design, Website..."
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Message</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your project..."
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none" />
              </div>
              <button type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
