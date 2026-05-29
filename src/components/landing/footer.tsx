import { Compass, Heart } from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { label: "AI Planner", href: "/ai-planner" },
    { label: "City Guides", href: "/city-guides" },
    { label: "Survival Guide", href: "/survival-guide" },
    { label: "Deals", href: "/deals" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Affiliate Disclosure", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-accent text-white/80">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-warm flex items-center justify-center shadow-lg">
                <Compass className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                GoChina<span className="text-primary">Pass</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">Your AI-powered travel companion for exploring China. Plan smarter, travel better.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/90 mb-4 capitalize">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-white/50 hover:text-primary transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} GoChinaPass. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary" /> for China travelers
          </p>
        </div>
      </div>
    </footer>
  );
}
