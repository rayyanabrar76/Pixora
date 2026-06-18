"use client";

import Link from "next/link";
import { PMark } from "@/components/Logo";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

const POLICIES = ["Shipping Policy", "Refund Policy", "Return Policy", "Terms of Service", "Privacy Policy", "FAQ"];
const SERVICES_LIST = ["Logo Design", "Landing Page", "Social Media Management", "SEO Optimization", "E-Commerce Store", "Email Marketing", "Google My Business", "Photography"];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto" style={{ display: "flex", flexDirection: "column" }}>

      {/* Top accent line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right,transparent,rgba(59,130,246,0.5),transparent)" }} />

      {/* Hero brand strip */}
      <div className="border-b border-gray-800/50 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* Logo + tagline */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-5">
              <PMark size={64} />
              <span className="text-5xl font-extrabold tracking-tight">
                <span className="text-white">Pix</span>
                <span className="text-blue-400">ora</span>
              </span>
            </div>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
              Your trusted partner for professional digital services. We design, build, and market — so you can focus on growing your business.
            </p>
          </div>
          {/* Newsletter / CTA */}
          <div className="lg:w-96 w-full">
            <p className="text-white font-bold text-base mb-3">Stay in the loop</p>
            <p className="text-gray-500 text-sm mb-4">Get updates on our latest services and offers.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com"
                className="flex-1 bg-gray-800 border border-gray-700 text-white text-sm px-4 py-3 rounded-xl outline-none focus:border-blue-500 placeholder-gray-600" />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-column grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest after:block after:mt-2 after:w-8 after:h-0.5 after:bg-blue-600">Our Services</h4>
          <ul className="space-y-3">
            {SERVICES_LIST.map((s) => (
              <li key={s}>
                <Link href="/shop"
                  className="text-sm text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40 group-hover:bg-blue-500 transition-colors shrink-0" />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest after:block after:mt-2 after:w-8 after:h-0.5 after:bg-blue-600">Quick Links</h4>
          <ul className="space-y-3">
            {[
              { href: "/",        label: "Home"       },
              { href: "/shop",    label: "Shop"       },
              { href: "/about",   label: "About Us"   },
              { href: "/contact", label: "Contact"    },
              { href: "/cart",    label: "Cart"       },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href}
                  className="text-sm text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40 group-hover:bg-blue-500 transition-colors shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-white font-bold mt-6 mb-5 text-sm uppercase tracking-widest after:block after:mt-2 after:w-8 after:h-0.5 after:bg-blue-600">Policies</h4>
          <ul className="space-y-3">
            {POLICIES.map((p) => (
              <li key={p}>
                <a href="#"
                  className="text-sm text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600/40 group-hover:bg-blue-500 transition-colors shrink-0" />
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest after:block after:mt-2 after:w-8 after:h-0.5 after:bg-blue-600">Get in Touch</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                <Mail size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 uppercase tracking-widest">Email</p>
                <a href="mailto:yourmail@gmail.com" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">yourmail@gmail.com</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 uppercase tracking-widest">Phone</p>
                <a href="tel:03000000000" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">03XX-XXXXXXX</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1 uppercase tracking-widest">Location</p>
                <p className="text-sm text-gray-400">Your City, Pakistan</p>
              </div>
            </li>
          </ul>
        </div>

        {/* Follow + Hours */}
        <div>
          <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-widest after:block after:mt-2 after:w-8 after:h-0.5 after:bg-blue-600">Follow Us</h4>
          <div className="flex gap-3 mb-6">
            {[
              { Icon: FaFacebookF,  label: "Facebook",  color: "#1877f2" },
              { Icon: FaInstagram,  label: "Instagram", color: "#e1306c" },
              { Icon: FaLinkedinIn, label: "LinkedIn",  color: "#0077b5" },
              { Icon: FaWhatsapp,   label: "WhatsApp",  color: "#25d366" },
            ].map(({ Icon, label, color }) => (
              <a key={label} href="#" title={label}
                className="w-11 h-11 rounded-xl bg-gray-800 border border-gray-700 hover:border-transparent text-gray-400 hover:text-white flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                style={{ ["--hover-color" as string]: color }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = color;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 20px ${color}55`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}>
                <Icon size={17} />
              </a>
            ))}
          </div>

          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest after:block after:mt-3 after:w-8 after:h-0.5 after:bg-blue-600">Working Hours</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between text-gray-500">
              <span>Mon – Fri</span>
              <span className="text-gray-300">9:00 AM – 7:00 PM</span>
            </li>
            <li className="flex justify-between text-gray-500">
              <span>Saturday</span>
              <span className="text-gray-300">10:00 AM – 5:00 PM</span>
            </li>
            <li className="flex justify-between text-gray-500">
              <span>Sunday</span>
              <span className="text-red-400/80">Closed</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800/50 py-5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <span>© 2026 <span className="text-gray-400 font-semibold">Pixora</span>. All rights reserved.</span>
          <span>Designed &amp; built with ❤️ in Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
