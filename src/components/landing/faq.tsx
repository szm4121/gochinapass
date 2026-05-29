"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Do I need a visa to visit China?", a: "Most nationalities require a visa to enter China. However, China offers 144-hour transit visa-free policies in many cities. Check your eligibility on our visa guide page." },
  { q: "Can I use Google and WhatsApp in China?", a: "Google services, WhatsApp, Instagram, Facebook, and many other Western websites are blocked in China. You'll need a VPN to access them. We recommend NordVPN or ExpressVPN — both work reliably." },
  { q: "How do I pay for things in China?", a: "China is almost cashless. Alipay and WeChat Pay are everywhere. As a foreigner, you can link your international credit card to Alipay. We have a step-by-step guide to help you set it up." },
  { q: "Is it safe to travel in China?", a: "China is one of the safest travel destinations in the world. Violent crime is extremely rare. The biggest challenges are language barriers and internet restrictions — both of which we help you navigate." },
  { q: "How do I book train tickets?", a: "You can book through 12306 (Chinese railway) or use third-party apps like Trip.com. We recommend Trip.com for English interface and international payment support." },
  { q: "Do I need a Chinese phone number?", a: "Many services in China require SMS verification. You can get a Chinese SIM card at the airport, or use an eSIM from Airalo before you arrive for instant connectivity." },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">Everything you need to know before your China trip.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl bg-white border border-border/60 overflow-hidden hover:border-primary/20 transition-colors">
              <button className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors" onClick={() => setOpenIdx(openIdx === idx ? null : idx)}>
                <span className="text-sm font-medium text-foreground">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openIdx === idx ? "rotate-180" : ""}`} />
              </button>
              {openIdx === idx && <div className="px-5 pb-5"><p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
