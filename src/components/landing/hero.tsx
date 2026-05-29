"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Map } from "lucide-react";
import { DestinationCarousel } from "./destination-carousel";

export function Hero() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleSubmit = (query?: string) => {
    const q = encodeURIComponent(query ?? input.trim());
    if (q) router.push(`/ai-planner?q=${q}`);
  };

  const cityPhotos: Record<string, string> = {
    Beijing: "/beijing.jpg",
    Shanghai: "/shanghai.jpg",
    Chengdu: "/chengdu.jpg",
    "Xi'an": "/xian.jpg",
    Guilin: "/guilin.jpg",
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background with vibrant gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fff5f0] via-white to-[#e8f8ff]" />
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: `radial-gradient(circle at 20% 50%, #ff6b4a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #00b4d8 0%, transparent 50%), radial-gradient(circle at 50% 80%, #ffb347 0%, transparent 50%)` }} 
      />
      
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 text-5xl opacity-15 animate-bounce" style={{animationDuration: '6s'}}>🏯</div>
      <div className="absolute top-40 right-20 text-4xl opacity-15 animate-bounce" style={{animationDuration: '8s'}}>🐼</div>
      <div className="absolute bottom-32 left-1/4 text-4xl opacity-15 animate-bounce" style={{animationDuration: '7s'}}>🏔️</div>
      <div className="absolute bottom-20 right-1/3 text-5xl opacity-15 animate-bounce" style={{animationDuration: '9s'}}>🌃</div>

      <div className="relative max-w-[1000px] mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
        {/* Tagline */}
        <div className="text-sm text-primary font-medium mb-6">
          Your AI Travel Guide to China
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-5">
          Plan Your China Trip<br />
          <span className="bg-gradient-to-r from-primary via-[#ffb347] to-secondary bg-clip-text text-transparent">
            with AI
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Generate complete itineraries, discover hidden gems, find hotels & transport — <br className="hidden md:block" />
          all in one chat. Built for first-time visitors.
        </p>

        {/* Big Input */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-[#ffb347] to-secondary rounded-2xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-lg shadow-black/5 border border-border/60">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Where do you want to go in China?"
                className="flex-1 px-6 py-4 bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none rounded-2xl"
              />
              <button 
                onClick={() => handleSubmit()}
                className="mr-2 p-3 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                disabled={!input.trim()}
              >
                <Sparkles className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mini trip-type suggestions */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { label: "7-Day Classic", q: "7 days in China, first time, budget $2000" },
            { label: "Food & Culture", q: "Food and culture trip in Beijing & Shanghai" },
            { label: "Budget Trip", q: "Budget backpacking through China for 2 weeks" },
            { label: "Family Trip", q: "Family-friendly China itinerary with kids" },
          ].map((s) => (
            <button key={s.label} onClick={() => handleSubmit(s.q)}
              className="px-4 py-1.5 text-xs text-muted-foreground/70 bg-white/60 border border-border/40 rounded-full hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all">
              {s.label}
            </button>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <a href="/ai-planner" 
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-lg">
            <Sparkles className="w-5 h-5" />
            Start AI Planning
          </a>
          <a href="/city-guides"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-foreground border border-border/60 rounded-full text-sm font-semibold hover:border-primary/30 hover:text-primary hover:shadow-md transition-all">
            <Map className="w-5 h-5" />
            Browse City Guides
          </a>
        </div>

        {/* Stats bar */}
        <div className="flex items-center justify-center gap-6 md:gap-10 mb-12">
          {[
            { label: "Trips Planned", value: "10,000+" },
            { label: "Cities Covered", value: "50+" },
            { label: "Traveler Rating", value: "⭐ 4.9" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-lg md:text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground/60 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Popular destinations — carousel */}
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] text-muted-foreground/40 font-medium mb-5 tracking-[0.15em] uppercase">
            Popular Destinations
          </p>
          <DestinationCarousel
            items={[
              { name: "Beijing", image: cityPhotos.Beijing, onClick: () => handleSubmit("Trip to Beijing") },
              { name: "Shanghai", image: cityPhotos.Shanghai, onClick: () => handleSubmit("Trip to Shanghai") },
              { name: "Chengdu", image: cityPhotos.Chengdu, onClick: () => handleSubmit("Trip to Chengdu") },
              { name: "Xi'an", image: cityPhotos["Xi'an"], onClick: () => handleSubmit("Trip to Xi'an") },
              { name: "Guilin", image: cityPhotos.Guilin, onClick: () => handleSubmit("Trip to Guilin") },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
