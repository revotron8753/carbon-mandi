import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/custom/contact/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us — Carbon Mandi",
  description:
    "Get in touch with Carbon Mandi — partner with us to accelerate India's clean, circular bioeconomy.",
};

export default function ContactPage() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Left — intro + details */}
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-mission">
              Contact Us
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-mission">
              Let&rsquo;s build a greener future together
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Whether you&rsquo;re a farmer, partner, investor or researcher —
              tell us a little about you and our team will get back to you.
            </p>

            <ul className="mt-8 space-y-4 text-[14px] text-ink-soft">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-mission" strokeWidth={1.8} />
                carbonmandi@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-mission" strokeWidth={1.8} />
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="hover:text-mission">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-mission" strokeWidth={1.8} />
                IIT Ropar Technology &amp; Innovation Foundation, Punjab, India
              </li>
            </ul>
          </div>

          {/* Right — form card */}
          <div className="rounded-2xl bg-paper p-6 shadow-[0_30px_80px_-40px_rgba(13,92,61,0.5)] ring-1 ring-line lg:p-8">
            <ContactForm source="Contact page" />
          </div>
        </div>
      </div>
    </section>
  );
}
