import { Globe, Wallet, Train, Smartphone, Compass, ShieldCheck, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

const guides = [
  { icon: Wallet, title: "How to Use Alipay", desc: "Set up Alipay as a foreign tourist.", href: "/survival-guide/payment", color: "from-[#ff6b4a]/20 to-[#ffb347]/10", iconColor: "text-[#ff6b4a]" },
  { icon: ShieldCheck, title: "Best VPN for China", desc: "VPNs that still work in China.", href: "/deals/vpn", color: "from-[#00b4d8]/20 to-[#48cae4]/10", iconColor: "text-[#00b4d8]" },
  { icon: Train, title: "China Train Booking", desc: "Book high-speed trains as a foreigner.", href: "/survival-guide/transport", color: "from-[#ffb347]/20 to-[#ff6b4a]/10", iconColor: "text-[#ffb347]" },
  { icon: Smartphone, title: "Must-Have Apps", desc: "Essential apps for your China trip.", href: "/survival-guide", color: "from-[#51cf66]/20 to-[#48cae4]/10", iconColor: "text-[#51cf66]" },
];

export function SurvivalPreview() {
  return (
    <section className="py-20 bg-[#fff8f5]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-warm/10 rounded-full text-sm text-warm font-medium mb-4 border border-warm/10">
              <Compass className="w-4 h-4" />
              Insider Knowledge
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              China <span className="text-primary">Survival Guide</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              From paying for street food to navigating the subway — everything a first-time visitor needs to know.
            </p>

            <div className="space-y-3">
              {guides.map((g) => {
                const Icon = g.icon;
                return (
                  <Link key={g.title} href={g.href} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border/60 hover:border-primary/20 hover:shadow-md transition-all group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.color} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${g.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{g.title}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{g.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-6">
              <Link href="/survival-guide" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all">
                View full guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#ff6b4a]/5 via-[#ffb347]/5 to-[#00b4d8]/5 border border-border/60">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-warm flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-4">
                {[
                  { emoji: "💳", text: "Pay like a local", color: "from-[#ff6b4a]/10 to-[#ffb347]/5" },
                  { emoji: "🚄", text: "Travel like a local", color: "from-[#00b4d8]/10 to-[#48cae4]/5" },
                  { emoji: "📱", text: "Connect like a local", color: "from-[#51cf66]/10 to-[#00b4d8]/5" },
                ].map((t, i) => (
                  <div key={i} className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${t.color} border border-white/50`}>
                    <span className="text-xl">{t.emoji}</span>
                    <span className="text-sm font-medium text-foreground/80">{t.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
