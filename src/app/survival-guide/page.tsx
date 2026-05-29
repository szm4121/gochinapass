import { Wallet, Globe, Train, Smartphone, Shield, Languages, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China Survival Guide",
  description: "Essential guides for surviving and thriving in China as a foreign tourist.",
};

const guides = [
  {
    icon: Wallet,
    title: "Payment Guide",
    desc: "How to use Alipay, WeChat Pay, and foreign cards in China.",
    href: "/survival-guide/payment",
    gradient: "from-[#ff6b4a]/20 to-[#ffb347]/10",
    iconColor: "text-[#ff6b4a]",
  },
  {
    icon: Train,
    title: "Transport Guide",
    desc: "High-speed trains, subway systems, and ride-hailing (Didi) explained.",
    href: "/survival-guide/transport",
    gradient: "from-[#ffb347]/20 to-[#ff6b4a]/10",
    iconColor: "text-[#ffb347]",
  },
  {
    icon: Globe,
    title: "VPN & Internet",
    desc: "How to access blocked websites and stay connected during your trip.",
    href: "/deals/vpn",
    gradient: "from-[#00b4d8]/20 to-[#48cae4]/10",
    iconColor: "text-[#00b4d8]",
  },
  {
    icon: Smartphone,
    title: "Essential Apps",
    desc: "Must-have apps for navigation, translation, dining, and more.",
    href: "/survival-guide/apps",
    gradient: "from-[#48cae4]/20 to-[#00b4d8]/10",
    iconColor: "text-[#48cae4]",
  },
  {
    icon: Languages,
    title: "Language Tips",
    desc: "Basic Chinese phrases, translation tools, and communication strategies.",
    href: "/survival-guide/language",
    gradient: "from-[#51cf66]/20 to-[#48cae4]/10",
    iconColor: "text-[#51cf66]",
  },
  {
    icon: Shield,
    title: "Health & Safety",
    desc: "Visa requirements, travel insurance, emergency contacts, and medical care.",
    href: "/survival-guide/safety",
    gradient: "from-[#ff6b6b]/20 to-[#ffb347]/10",
    iconColor: "text-[#ff6b6b]",
  },
];

export default function SurvivalGuidePage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#fffbf0] via-white to-[#fff5f0] py-16">
          <div className="absolute top-10 left-10 text-4xl opacity-[0.06]">🧭</div>
          <div className="absolute bottom-10 right-20 text-4xl opacity-[0.06]">🗺️</div>
          <div className="max-w-[1200px] mx-auto px-6 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warm/10 rounded-full text-sm text-warm font-medium mb-4 border border-warm/10">
              <Compass className="w-4 h-4" />
              Insider Knowledge
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              China <span className="text-warm">Survival Guide</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Everything a first-time visitor needs to know — from paying for street food to navigating the subway.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-muted/30">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => {
                const Icon = guide.icon;
                return (
                  <Link
                    key={guide.title}
                    href={guide.href}
                    className="group p-6 rounded-2xl bg-white border border-border/60 hover:border-transparent hover:shadow-lg transition-all relative overflow-hidden"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${guide.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative">
                      <div className={`w-16 h-16 rounded-2xl ${guide.gradient} flex items-center justify-center mb-4`}>
                        <Icon className={`w-7 h-7 ${guide.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">{guide.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
