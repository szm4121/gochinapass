"use client";

import { useState } from "react";
import { Menu, X, Compass, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/ai-planner", label: "AI Planner", icon: Compass },
  { href: "/city-guides", label: "City Guides", icon: Globe },
  { href: "/survival-guide", label: "Travel Guide" },
  { href: "/deals", label: "Deals" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff6b4a] to-[#ffb347] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              GoChina<span className="text-primary">Pass</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-full transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-all shadow-sm hover:shadow-md">
              Start Planning
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-muted rounded-xl transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button className="mt-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium text-center">
                Start Planning
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
