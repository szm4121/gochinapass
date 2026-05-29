import { ArrowRight, Bot, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Chat & Plan Instantly",
    desc: "Just tell GoChinaPass where you want to go. From cheap flights to hotel options, our AI understands your travel needs in seconds.",
    cta: "Start Planning Now",
    href: "/ai-planner",
    visual: <ChatPreview />,
  },
  {
    num: "02",
    title: "Get Tailored Recommendations",
    desc: "Based on your budget and preferences, GoChinaPass suggests the best hotels, transport options, and must-see attractions — all personalized for you.",
    cta: "Start Planning Now",
    href: "/ai-planner",
    visual: <HotelCard />,
  },
  {
    num: "03",
    title: "Create Your Smart Itinerary",
    desc: "Generate a complete day-by-day China itinerary with one click. Save time and enjoy a plan that fits your journey perfectly.",
    cta: "Start Planning Now",
    href: "/ai-planner",
    visual: <ItineraryPreview />,
  },
];

function ChatPreview() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/60 p-4 space-y-3">
      {/* Chat header */}
      <div className="flex items-center gap-2 pb-2 border-b border-border/30">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-warm flex items-center justify-center">
          <Bot className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-semibold text-foreground/70">GoChinaPass AI</span>
        <span className="ml-auto text-[10px] text-muted-foreground/40">Now</span>
      </div>
      {/* Messages */}
      <div className="space-y-2.5">
        <div className="flex justify-end">
          <div className="bg-primary text-primary-foreground text-xs rounded-2xl rounded-tr-sm px-3.5 py-2 max-w-[85%] leading-relaxed">
            I want to visit Beijing, Shanghai &amp; Chengdu for 10 days, budget $2000
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-muted text-muted-foreground text-xs rounded-2xl rounded-tl-sm px-3.5 py-2 max-w-[85%] leading-relaxed">
            Great choice! Here&apos;s a 10-day itinerary covering all three cities. Starting with 3 days in Beijing to see the Great Wall and Forbidden City...
          </div>
        </div>
        {/* Typing indicator */}
        <div className="flex items-center gap-1.5 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{animationDuration:'0.8s'}} />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.15s'}} />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.3s'}} />
        </div>
      </div>
    </div>
  );
}

function HotelCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/60 overflow-hidden">
      {/* Real hotel photo */}
      <div className="h-32 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop&auto=format"
          alt="Hotel"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      {/* Card body */}
      <div className="p-3.5 space-y-2">
        <div>
          <h4 className="text-sm font-bold text-foreground">The Peninsula Shanghai</h4>
          <p className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> The Bund, Shanghai
          </p>
        </div>
        <div className="flex gap-1.5">
          <span className="px-2 py-0.5 bg-primary/10 rounded-full text-[10px] text-primary font-medium">Free WiFi</span>
          <span className="px-2 py-0.5 bg-primary/10 rounded-full text-[10px] text-primary font-medium">Breakfast</span>
          <span className="px-2 py-0.5 bg-primary/10 rounded-full text-[10px] text-primary font-medium">River View</span>
        </div>
        <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:opacity-90 transition-all">
          View Deal
        </button>
      </div>
    </div>
  );
}

function ItineraryPreview() {
  const days = [
    { day: "Day 1", location: "Beijing", color: "bg-primary/10 text-primary", activities: ["🏯 Great Wall", "🍜 Peking Duck"] },
    { day: "Day 2", location: "Beijing", color: "bg-warm/10 text-warm", activities: ["🏛️ Forbidden City", "🚲 Hutong Tour"] },
    { day: "Day 3", location: "Shanghai", color: "bg-secondary/10 text-secondary", activities: ["🌃 The Bund", "🥟 Dim Sum"] },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-border/60 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-foreground/80">Your 10-Day China Trip</span>
        </div>
        <span className="text-[10px] text-muted-foreground/40">AI Generated</span>
      </div>
      {/* Timeline */}
      <div className="space-y-0">
        {days.map((d, i) => (
          <div key={i} className="flex gap-3">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full ${d.color} ring-2 ring-white z-10`} />
              {i < days.length - 1 && <div className="w-px flex-1 bg-border/60 my-0.5" />}
            </div>
            {/* Content */}
            <div className="pb-4 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-foreground/80">{d.day}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${d.color}`}>{d.location}</span>
              </div>
              <div className="space-y-0.5">
                {d.activities.map((act, j) => (
                  <p key={j} className="text-[11px] text-muted-foreground/70">{act}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepBlock({ step, idx }: { step: (typeof steps)[0]; idx: number }) {
  const isReversed = idx % 2 === 1;

  return (
    <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}>
      {/* Visual side */}
      <div className="flex-1 w-full max-w-sm">
        {step.visual}
      </div>
      {/* Text side */}
      <div className="flex-1 text-center md:text-left">
        <span className="text-xs font-semibold tracking-widest text-muted-foreground/40">
          Step {step.num}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-4">
          {step.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 max-w-md">
          {step.desc}
        </p>
        <Link
          href={step.href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all group"
        >
          {step.cta}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            How GoChinaPass <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Three simple steps to plan your perfect China trip — no hassle, no stress.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {steps.map((step, idx) => (
            <StepBlock key={step.num} step={step} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
