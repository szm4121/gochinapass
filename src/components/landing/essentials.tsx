import { Wallet, ShieldCheck, Train, Smartphone, Wifi, ArrowRight, Compass } from "lucide-react";
import Link from "next/link";

const guides = [
  { icon: Wallet, title: "How to Use Alipay", desc: "Set up Alipay as a foreign tourist.", href: "/survival-guide/payment", gradient: "from-[#ff6b4a]/20 to-[#ffb347]/10" },
  { icon: ShieldCheck, title: "Best VPN for China", desc: "VPNs that still work in China.", href: "/deals/vpn", gradient: "from-[#00b4d8]/20 to-[#48cae4]/10" },
  { icon: Train, title: "China Train Booking", desc: "Book high-speed trains as a foreigner.", href: "/survival-guide/transport", gradient: "from-[#ffb347]/20 to-[#ff6b4a]/10" },
  { icon: Smartphone, title: "Must-Have Apps", desc: "Essential apps for your China trip.", href: "/survival-guide", gradient: "from-[#51cf66]/20 to-[#48cae4]/10" },
];

const tools = [
  { name: "Airalo", category: "eSIM", desc: "Best coverage across China.", icon: Wifi, gradient: "from-[#00b4d8]/20 to-[#48cae4]/10" },
  { name: "Holafly", category: "eSIM", desc: "Unlimited data for travelers.", icon: Wifi, gradient: "from-[#51cf66]/20 to-[#00b4d8]/10" },
  { name: "NordVPN", category: "VPN", desc: "Reliable VPN that works in China.", icon: ShieldCheck, gradient: "from-[#ff6b4a]/20 to-[#ffb347]/10" },
  { name: "ExpressVPN", category: "VPN", desc: "Fast speeds, Great Firewall proof.", icon: ShieldCheck, gradient: "from-[#ffb347]/20 to-[#ff6b4a]/10" },
];

export function Essentials() {
  return (
    <section className="py-20 bg-[#fff8f5]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            Everything You Need for <span className="text-primary">China</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From setting up payments to staying connected — we&apos;ve got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Guide links — 3/5 width */}
          <div className="md:col-span-3 space-y-3">
            {guides.map((g) => {
              const Icon = g.icon;
              return (
                <Link key={g.title} href={g.href}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white border border-border/60 hover:border-primary/20 hover:shadow-md transition-all group"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.gradient} flex items-center justify-center shrink-0`}>
                    <Icon className="w-5 h-5 text-foreground/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {g.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{g.desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              );
            })}
            <div className="pt-2">
              <Link href="/survival-guide" className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:gap-2.5 transition-all">
                View full guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right: Recommended tools — 2/5 width */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-3">
              {tools.map((t) => {
                const Icon = t.icon;
                return (
                  <Link key={t.name} href={`/deals/${t.category}`}
                    className="p-4 rounded-xl bg-white border border-border/60 hover:border-primary/20 hover:shadow-md transition-all group text-center"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center mx-auto mb-2.5`}>
                      <Icon className="w-5 h-5 text-foreground/70" />
                    </div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{t.desc}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
