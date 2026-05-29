import { MessageCircle, Sparkles, Map, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Chat & Plan Instantly",
    desc: "Tell GoChinaPass where you want to go, your budget, and how many days. Our AI understands your travel needs in seconds and starts building your perfect China trip.",
    cta: "Start Planning Now",
    href: "/ai-planner",
    visual: "💬",
    gradient: "from-[#ff6b4a] to-[#ffb347]",
  },
  {
    num: "02",
    title: "Get Tailored Recommendations",
    desc: "Based on your preferences, GoChinaPass suggests the best hotels, transport options, and must-see attractions — all personalized for your style and budget.",
    cta: "Start Planning Now",
    href: "/ai-planner",
    visual: "✨",
    gradient: "from-[#00b4d8] to-[#48cae4]",
  },
  {
    num: "03",
    title: "Create Your Smart Itinerary",
    desc: "Generate a complete day-by-day China itinerary with one click. Save time and enjoy a plan that fits your journey perfectly, from hidden gems to iconic landmarks.",
    cta: "Start Planning Now",
    href: "/ai-planner",
    visual: "🗺️",
    gradient: "from-[#ffb347] to-[#ff6b4a]",
  },
];

function StepBlock({ step, idx }: { step: (typeof steps)[0]; idx: number }) {
  const isReversed = idx % 2 === 1;

  return (
    <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10 md:gap-16`}>
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

      {/* Visual side */}
      <div className="flex-1 w-full max-w-sm">
        <div className={`aspect-[4/3] rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/5" />
          <span className="text-7xl md:text-8xl relative z-10">{step.visual}</span>
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            How GoChinaPass <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Three simple steps to plan your perfect China trip — no hassle, no stress.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-20 md:space-y-28">
          {steps.map((step, idx) => (
            <StepBlock key={step.num} step={step} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
