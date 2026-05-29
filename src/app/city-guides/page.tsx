import { MapPin, ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "China City Travel Guides",
  description: "Detailed travel guides for Chinese cities — Beijing, Shanghai, Chengdu, and more.",
};

const cities = [
  { name: "Beijing", slug: "beijing", desc: "Great Wall, Forbidden City, Hutongs", articles: 5, emoji: "🏛️", color: "from-[#ff6b4a]/20 to-[#ffb347]/10", rating: "4.8" },
  { name: "Shanghai", slug: "shanghai", desc: "Bund, Disneyland, French Concession", articles: 4, emoji: "🌃", color: "from-[#48cae4]/20 to-[#00b4d8]/10", rating: "4.7" },
  { name: "Chengdu", slug: "chengdu", desc: "Pandas, Hot Pot, Sichuan Opera", articles: 3, emoji: "🐼", color: "from-[#51cf66]/20 to-[#48cae4]/10", rating: "4.6" },
  { name: "Xi'an", slug: "xian", desc: "Terracotta Warriors, Ancient City Wall", articles: 2, emoji: "🏺", color: "from-[#ffb347]/20 to-[#ff6b4a]/10", rating: "4.7" },
  { name: "Guangzhou", slug: "guangzhou", desc: "Canton Tower, Dim Sum, Shamian Island", articles: 2, emoji: "🥟", color: "from-[#ff6b6b]/20 to-[#ffb347]/10", rating: "4.4" },
  { name: "Guilin", slug: "guilin", desc: "Li River, Karst Mountains, Rice Terraces", articles: 2, emoji: "🏔️", color: "from-[#00b4d8]/20 to-[#51cf66]/10", rating: "4.5" },
];

export default function CityGuidesPage() {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        <section className="relative overflow-hidden bg-gradient-to-br from-[#fff5f0] via-white to-[#f0faff] py-16">
          <div className="absolute top-10 right-20 text-4xl opacity-[0.06]">🏯</div>
          <div className="absolute bottom-10 left-10 text-4xl opacity-[0.06]">🌃</div>
          <div className="max-w-[1200px] mx-auto px-6 relative">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 rounded-full text-sm text-secondary font-medium mb-4 border border-secondary/10">
              <TrendingUp className="w-4 h-4" />
              Explore China
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              City <span className="text-secondary">Guides</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Hand-picked recommendations, practical tips, and AI-powered itineraries for China&apos;s top destinations.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-white to-muted/30">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/city-guides/${city.slug}`}
                  className="group p-6 rounded-2xl bg-white border border-border/60 hover:border-transparent hover:shadow-lg transition-all relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${city.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${city.color} flex items-center justify-center text-3xl`}>
                        {city.emoji}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-warm text-warm" />
                        <span className="text-xs font-medium text-muted-foreground">{city.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{city.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{city.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{city.articles} guides</span>
                      <div className="flex items-center gap-1 text-sm text-primary font-medium">
                        <Sparkles className="w-4 h-4" />
                        <span>Plan trip</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
