import { Wifi, Shield, ExternalLink, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Deals — eSIM, VPN",
  description: "Exclusive deals on eSIMs, VPNs, and travel essentials for your China trip.",
};

const deals = [
  {
    icon: Wifi,
    name: "Airalo",
    category: "eSIM",
    desc: "Best coverage across China. Easy to install before your trip.",
    badge: "Popular",
    href: "/deals/esim",
    gradient: "from-[#00b4d8]/20 to-[#48cae4]/10",
    iconColor: "text-[#00b4d8]",
  },
  {
    icon: Wifi,
    name: "Holafly",
    category: "eSIM",
    desc: "Unlimited data plans specifically for China travelers.",
    badge: "Unlimited Data",
    href: "/deals/esim",
    gradient: "from-[#51cf66]/20 to-[#00b4d8]/10",
    iconColor: "text-[#51cf66]",
  },
  {
    icon: Shield,
    name: "NordVPN",
    category: "VPN",
    desc: "Reliable VPN with 68% discount for long-term plans.",
    badge: "68% OFF",
    href: "/deals/vpn",
    gradient: "from-[#ff6b4a]/20 to-[#ffb347]/10",
    iconColor: "text-[#ff6b4a]",
  },
  {
    icon: Shield,
    name: "ExpressVPN",
    category: "VPN",
    desc: "Fast speeds and reliable connections that work in China.",
    badge: "Top Rated",
    href: "/deals/vpn",
    gradient: "from-[#ffb347]/20 to-[#ff6b4a]/10",
    iconColor: "text-[#ffb347]",
  },
];

export default function DealsPage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#fffbf0] via-white to-[#fff5f0] py-16">
          <div className="absolute top-10 right-20 text-4xl opacity-[0.06]">💳</div>
          <div className="absolute bottom-10 left-10 text-4xl opacity-[0.06]">📡</div>
          <div className="max-w-[1200px] mx-auto px-6 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4 border border-primary/10">
              <Zap className="w-4 h-4" />
              Exclusive Deals
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Travel <span className="text-primary">Essentials</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Exclusive discounts on essential services for your China trip. Stay connected and protected.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-muted/30">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {deals.map((deal) => {
                const Icon = deal.icon;
                return (
                  <Link
                    key={deal.name}
                    href={deal.href}
                    className="group p-6 rounded-2xl bg-white border border-border/60 hover:border-transparent hover:shadow-lg transition-all relative overflow-hidden flex items-start gap-5"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${deal.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative shrink-0">
                      <div className={`w-16 h-16 rounded-2xl ${deal.gradient} flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${deal.iconColor}`} />
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{deal.name}</h3>
                        <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {deal.badge}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{deal.desc}</p>
                      <div className="flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all">
                        Get Deal <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-warm/5 to-secondary/5 border border-border/60 text-center">
              <Sparkles className="w-8 h-8 text-primary/40 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">More Deals Coming Soon</h3>
              <p className="text-sm text-muted-foreground">Hotel bookings, travel insurance, tour packages — we&apos;re adding more exclusive deals.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
