import { Wifi, Shield, ExternalLink, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

const partners = [
  { name: "Airalo", category: "eSIM", desc: "Best coverage across China. Easy to install.", badge: "Popular", gradient: "from-[#00b4d8]/20 to-[#48cae4]/10", icon: Wifi, iconColor: "text-[#00b4d8]" },
  { name: "Holafly", category: "eSIM", desc: "Unlimited data for China travelers.", badge: "Unlimited", gradient: "from-[#51cf66]/20 to-[#00b4d8]/10", icon: Wifi, iconColor: "text-[#51cf66]" },
  { name: "NordVPN", category: "VPN", desc: "Reliable VPN that works in China.", badge: "68% OFF", gradient: "from-[#ff6b4a]/20 to-[#ffb347]/10", icon: Shield, iconColor: "text-[#ff6b4a]" },
  { name: "ExpressVPN", category: "VPN", desc: "Fast speeds, Great Firewall proof.", badge: "Top Rated", gradient: "from-[#ffb347]/20 to-[#ff6b4a]/10", icon: Shield, iconColor: "text-[#ffb347]" },
];

export function Deals() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-4 border border-primary/10">
            <Zap className="w-4 h-4" />
            Exclusive Deals
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Travel <span className="text-warm">Essentials</span>
          </h2>
          <p className="text-muted-foreground">Get the best tools for your China trip at exclusive prices.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {partners.map((p) => {
            const Icon = p.icon;
            return (
              <Link key={p.name} href={`/deals/${p.category}`} className="group p-6 rounded-2xl bg-white border border-border/60 hover:border-transparent hover:shadow-lg transition-all relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className={`w-14 h-14 rounded-xl ${p.gradient} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${p.iconColor}`} />
                  </div>
                  <div className="text-base font-semibold text-foreground mb-1">{p.name}</div>
                  <div className="text-xs text-muted-foreground mb-3">{p.category}</div>
                  <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">{p.badge}</span>
                    <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
                      Get Deal <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/deals" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-border/60 rounded-full text-sm text-foreground font-medium hover:border-primary/30 hover:text-primary hover:shadow-md transition-all">
            View All Deals <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
