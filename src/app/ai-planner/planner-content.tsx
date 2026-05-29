"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Sparkles, Send, Loader2, MapPin, Sun, Moon, Coffee, Utensils, Hotel, Train, Wifi, Shield, CheckCircle2, Timer, Landmark, Globe, ChevronRight, Clock, DollarSign, Star, Compass, ArrowRight, Brain, MessageSquare, Bot, User, RefreshCw, Copy, ThumbsUp } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = {
  role: "user" | "assistant";
  content: string;
  jsonData?: string;
  done: boolean;
};

const suggestions = [
  "7 days in China, first time, budget $2000",
  "Food and culture trip in Beijing & Shanghai",
  "Budget backpacking through China for 2 weeks",
  "Family-friendly China itinerary with kids",
];

// ─── Enhanced Travel Markdown Components ───────────────────

const md = {
  h1: (p: any) => (
    <h1 className="text-2xl md:text-3xl font-bold mt-8 mb-5 first:mt-0 text-foreground tracking-tight leading-tight" {...p} />
  ),
  h2: (p: any) => {
    const text = typeof p.children?.[0] === 'string' ? p.children[0] : p.children?.[0]?.props?.children?.[0] ?? "";
    let icon = null;
    let colorClass = "text-primary";
    let bgClass = "bg-primary/10";
    if (text.includes("📍") || text.includes("Day") || text.includes("行程")) {
      icon = <MapPin className="w-4 h-4" />;
      colorClass = "text-primary";
      bgClass = "bg-primary/10";
    } else if (text.includes("💰") || text.includes("Budget") || text.includes("预算")) {
      icon = <DollarSign className="w-4 h-4" />;
      colorClass = "text-warm";
      bgClass = "bg-warm/10";
    } else if (text.includes("🚄") || text.includes("Transport") || text.includes("交通")) {
      icon = <Train className="w-4 h-4" />;
      colorClass = "text-secondary";
      bgClass = "bg-secondary/10";
    } else if (text.includes("📱") || text.includes("Essential") || text.includes("必备")) {
      icon = <Wifi className="w-4 h-4" />;
      colorClass = "text-sky";
      bgClass = "bg-sky/10";
    } else if (text.includes("💡") || text.includes("Tip") || text.includes("提示")) {
      icon = <Star className="w-4 h-4" />;
      colorClass = "text-lime";
      bgClass = "bg-lime/10";
    } else if (text.includes("🏨") || text.includes("Accom") || text.includes("住宿")) {
      icon = <Hotel className="w-4 h-4" />;
      colorClass = "text-rose";
      bgClass = "bg-rose/10";
    } else if (text.includes("🍽") || text.includes("Meal") || text.includes("美食") || text.includes("餐饮")) {
      icon = <Utensils className="w-4 h-4" />;
      colorClass = "text-rose";
      bgClass = "bg-rose/10";
    }
    return (
      <div className="flex items-center gap-2 mt-7 mb-4">
        {icon ? <div className={"w-7 h-7 rounded-lg flex items-center justify-center shrink-0 " + bgClass}><div className={colorClass}>{icon}</div></div> : null}
        <h2 className="text-base md:text-lg font-bold text-foreground tracking-tight">{p.children}</h2>
      </div>
    );
  },
  h3: (p: any) => {
    const text = typeof p.children?.[0] === 'string' ? p.children[0] : p.children?.[0]?.props?.children?.[0] ?? "";
    let icon = null;
    let color = "text-amber-500";
    if (text.includes("Morning") || text.includes("上午")) { icon = <Sun className="w-4 h-4" />; color = "text-amber-500"; }
    else if (text.includes("Afternoon") || text.includes("下午")) { icon = <Sun className="w-4 h-4" />; color = "text-orange-500"; }
    else if (text.includes("Evening") || text.includes("晚上")) { icon = <Moon className="w-4 h-4" />; color = "text-indigo-400"; }
    else if (text.includes("🍽") || text.includes("Meal") || text.includes("用餐")) { icon = <Utensils className="w-4 h-4" />; color = "text-rose-500"; }
    return <h3 className={"text-sm font-semibold mt-5 mb-2.5 flex items-center gap-1.5 " + color}>{icon}{p.children}</h3>;
  },
  p: (p: any) => <p className="text-sm leading-[1.75] mb-3 last:mb-0 text-foreground/75" {...p} />,
  ul: (p: any) => <ul className="space-y-1.5 mb-3" {...p} />,
  ol: (p: any) => <ol className="list-decimal list-inside text-sm space-y-1.5 mb-3 text-foreground/75" {...p} />,
  li: (p: any) => {
    const content = p.children?.[1] || p.children?.[0];
    return (
      <li className="text-foreground/70 text-sm flex items-start gap-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mt-[7px] shrink-0" />
        <span className="flex-1">{content}</span>
      </li>
    );
  },
  strong: (p: any) => <strong className="font-semibold text-foreground/85" {...p} />,
  hr: (p: any) => <div className="my-6 border-t border-border/40" {...p} />,
  blockquote: (p: any) => (
    <div className="my-4 pl-4 border-l-2 border-primary/30 py-1.5 bg-primary/[0.03] rounded-r-lg text-sm text-muted-foreground/80 italic" {...p} />
  ),
  table: (p: any) => (
    <div className="overflow-x-auto my-4 rounded-xl border border-border/50 bg-white shadow-sm">
      <table className="w-full text-sm border-collapse" {...p} />
    </div>
  ),
  th: (p: any) => <th className="border-b border-border/50 bg-gradient-to-r from-accent/60 to-accent/30 p-3 text-left font-semibold text-foreground/80 text-xs uppercase tracking-wider" {...p} />,
  td: (p: any) => <td className="border-b border-border/30 p-3 text-foreground/65" {...p} />,
  code: ({ children, className, ...rest }: any) =>
    className
      ? <pre className="bg-accent/70 p-4 rounded-xl overflow-x-auto mb-4 text-sm font-mono border border-border/40 shadow-sm" {...rest}><code>{children}</code></pre>
      : <code className="bg-primary/5 px-1.5 py-0.5 rounded-md text-sm font-mono text-primary/80 border border-primary/10" {...rest}>{children}</code>,
};// ─── Travel Day Card ──────────────────────────────────────────

const timeIcons: Record<string, any> = {
  Morning: Sun, Afternoon: Sun, Evening: Moon,
  Breakfast: Coffee, Lunch: Utensils, Dinner: Utensils,
};

function ActivityRow({ act }: { act: any }) {
  const Icon = timeIcons[act.time] || null;
  const timeColors: Record<string, string> = {
    Morning: "bg-amber-50 border-amber-200 text-amber-600",
    Afternoon: "bg-orange-50 border-orange-200 text-orange-600",
    Evening: "bg-indigo-50 border-indigo-200 text-indigo-500",
    Breakfast: "bg-rose-50 border-rose-200 text-rose-500",
    Lunch: "bg-orange-50 border-orange-200 text-orange-500",
    Dinner: "bg-purple-50 border-purple-200 text-purple-500",
  };
  const timeColor = timeColors[act.time] || "bg-gray-50 border-gray-200 text-gray-500";

  return (
    <div className="flex gap-3 py-3 group/item">
      <div className={"flex flex-col items-center gap-1.5 shrink-0 w-16 px-2 py-1.5 rounded-lg border " + timeColor}>
        {Icon && <Icon className="w-3.5 h-3.5" />}
        <span className="text-[10px] font-semibold uppercase tracking-wider leading-tight text-center">{act.time}</span>
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-semibold text-foreground/85 leading-snug">{act.activity ?? ""}</p>
        {act.details ? <p className="text-xs text-muted-foreground/70 mt-1 leading-relaxed">{act.details}</p> : null}
      </div>
    </div>
  );
}

function DayCard({ day, i }: { day: any; i: number }) {
  const gradientColors = [
    "from-primary/10 via-primary/5 to-white",
    "from-secondary/10 via-secondary/5 to-white",
    "from-warm/10 via-warm/5 to-white",
    "from-lime/10 via-lime/5 to-white",
    "from-rose/10 via-rose/5 to-white",
    "from-sky/10 via-sky/5 to-white",
    "from-primary/10 via-warm/5 to-white",
  ];
  const badgeColors = [
    "bg-primary/10 text-primary",
    "bg-secondary/10 text-secondary",
    "bg-warm/10 text-warm",
    "bg-lime/10 text-lime",
    "bg-rose/10 text-rose",
    "bg-sky/10 text-sky",
    "bg-primary/10 text-primary",
  ];
  const g = gradientColors[i % gradientColors.length];
  const bc = badgeColors[i % badgeColors.length];

  return (
    <div className="rounded-xl border border-border/60 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Day Header */}
      <div className={"px-5 py-3.5 bg-gradient-to-r " + g + " border-b border-border/40"}>
        <div className="flex items-center gap-3">
          <div className={"w-10 h-10 rounded-full flex items-center justify-center text-base font-bold shrink-0 " + bc}>
            {day.day ?? i + 1}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm text-foreground/90 leading-snug flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-primary/60" />
              {day.title ?? ""}
            </h4>
            {day.location ? (
              <p className="text-[11px] text-muted-foreground/60 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" />
                {day.location}
              </p>
            ) : null}
          </div>
        </div>
      </div>
      {/* Activities */}
      <div className="px-5 py-2 divide-y divide-border/20">
        {day.activities?.map((act: any, j: number) => <ActivityRow key={j} act={act} />)}
      </div>
      {/* Meals */}
      {day.meals?.length ? (
        <div className="px-5 py-3 bg-gradient-to-r from-rose/[0.03] to-amber/[0.03] border-t border-border/20">
          <p className="text-xs font-semibold text-rose-500/80 mb-2 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5" />
            Meals
          </p>
          <div className="space-y-1.5">
            {day.meals.map((m: any, j: number) => (
              <p key={j} className="text-xs text-muted-foreground/70">
                <span className="font-medium text-foreground/70">{m.meal}:</span> {m.recommendation}
                {m.notes ? <span className="text-muted-foreground/50"> — {m.notes}</span> : null}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}function extractJSON(text: string) {
  const i = text.indexOf("===JSON===");
  if (i === -1) return null;
  try { return JSON.parse(text.slice(i + 10).trim()); } catch { return null; }
}

function TripView({ data }: { data: any }) {
  return (
    <div className="space-y-5">
      {/* Title + Overview Card */}
      {data.title ? (
        <div className="p-5 rounded-xl bg-gradient-to-br from-primary/5 via-primary/[0.02] to-white border border-primary/10 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-warm flex items-center justify-center shrink-0 shadow-sm">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-foreground tracking-tight">{data.title}</h3>
              {data.overview ? <p className="text-sm text-muted-foreground/80 mt-1.5 leading-relaxed">{data.overview}</p> : null}
            </div>
          </div>
        </div>
      ) : null}

      {/* Days */}
      {data.days?.length ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <MapPin className="w-3.5 h-3.5 text-primary" />
            </div>
            <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Itinerary</h4>
          </div>
          {data.days.map((day: any, i: number) => <DayCard key={i} day={day} i={i} />)}
        </div>
      ) : null}

      {/* Budget */}
      {data.budget ? (
        <div className="p-5 rounded-xl bg-gradient-to-br from-warm/5 to-amber/[0.02] border border-warm/10 shadow-sm">
          <h4 className="font-semibold text-sm text-foreground/90 mb-4 flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-warm/10 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5 text-warm" />
            </div>
            Budget Estimate
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {(["accommodation","transport","food","activities"] as const).map(cat => {
              const v = data.budget[cat]?.mid ?? data.budget[cat]?.low;
              if (!v) return null;
              const labels: Record<string, string> = { accommodation: "Accommodation", transport: "Transport", food: "Food", activities: "Activities" };
              return (
                <div key={cat} className="p-3 rounded-lg bg-white/60 border border-border/40 text-center">
                  <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mb-1">{labels[cat] || cat}</p>
                  <p className="font-bold text-foreground/90 text-sm">${v}<span className="text-[10px] text-muted-foreground/50 font-normal">/day</span></p>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Transport */}
      {data.transport?.length ? (
        <div className="p-5 rounded-xl bg-gradient-to-br from-secondary/5 to-sky/[0.02] border border-secondary/10 shadow-sm">
          <h4 className="font-semibold text-sm text-foreground/90 mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-secondary/10 flex items-center justify-center">
              <Train className="w-3.5 h-3.5 text-secondary" />
            </div>
            Transport
          </h4>
          <div className="space-y-2">
            {data.transport.map((t: any, i: number) => (
              <div key={i} className="flex flex-wrap items-center gap-2 text-sm p-3 rounded-lg bg-white/60 border border-border/40 hover:bg-white transition-colors">
                <span className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center text-[10px] font-bold text-secondary shrink-0">{i + 1}</span>
                <span className="font-medium text-foreground/85">{t.between}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                <span className="text-muted-foreground/70">{t.mode}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/20" />
                <span className="text-muted-foreground/60">{t.duration}</span>
                {t.approxCost ? <><span className="w-1 h-1 rounded-full bg-muted-foreground/20" /><span className="text-primary font-semibold">{t.approxCost}</span></> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Tips */}
      {data.tips?.length ? (
        <div className="p-5 rounded-xl bg-gradient-to-br from-lime/5 to-green/[0.02] border border-lime/10 shadow-sm">
          <h4 className="font-semibold text-sm text-foreground/90 mb-3 flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-lime/10 flex items-center justify-center">
              <Star className="w-3.5 h-3.5 text-lime" />
            </div>
            Tips
          </h4>
          <ul className="space-y-2">
            {data.tips.map((tip: string, i: number) => (
              <li key={i} className="text-sm text-muted-foreground/75 flex gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-lime/50 mt-[7px] shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}function MarkdownView({ content, done }: { content: string; done: boolean }) {
  const i = content.indexOf("===JSON===");
  const display = i === -1 ? content : content.slice(0, i).trim();
  
  // Loading state (no content yet)
  if (!display && !done) {
    return (
      <div className="flex flex-col gap-3 py-6 items-center">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-warm flex items-center justify-center">
            <Brain className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div className="absolute inset-0 animate-ping opacity-20 rounded-full bg-primary" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-foreground/80">
            <span className="inline-block animate-pulse">Planning</span> your trip<span className="inline-block animate-bounce" style={{animationDuration:'1s'}}>.</span>
            <span className="inline-block animate-bounce" style={{animationDuration:'1s', animationDelay:'0.2s'}}>.</span>
            <span className="inline-block animate-bounce" style={{animationDuration:'1s', animationDelay:'0.4s'}}>.</span>
          </p>
          <p className="text-xs text-muted-foreground/50">Searching destinations, routes, and recommendations</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Generated content */}
      <div className="[&_*]:leading-relaxed">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={md}>{display || "..."}</ReactMarkdown>
      </div>

      {/* Streaming indicator */}
      {!done ? (
        <div className="flex items-center justify-center gap-2.5 mt-6 pt-4 border-t border-border/30">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s'}} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.15s'}} />
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.3s'}} />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50">
            <Sparkles className="w-3 h-3" />
            <span>AI is generating more content...</span>
          </div>
        </div>
      ) : (
        /* Done indicator */
        <div className="flex items-center gap-2 mt-5 pt-3 border-t border-border/20">
          <div className="flex items-center gap-1.5 text-[11px] text-lime-500/70">
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete</span>
          </div>
        </div>
      )}
    </div>
  );
}// ─── Main Component ───────────────────────────────────────────

export default function PlannerContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q");
  const autoSubmittedRef = useRef(false);

  const [query, setQuery] = useState(initialQ ?? "");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(!initialQ);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-start from URL param
  useEffect(() => {
    if (!initialQ || autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;

    const timer = setTimeout(async () => {
      setMessages(m => [...m,
        { role: "user", content: initialQ!, done: true },
        { role: "assistant", content: "", done: false },
      ]);
      setIsLoading(true);

      let buf = "";
      const upd = () => setMessages(m => { const u = [...m]; const l = u[u.length-1]; if (l?.role === "assistant") u[u.length-1] = {...l, content: buf}; return u; });

      try {
        const res = await fetch("/api/ai/trip-planner", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: initialQ }),
        });
        if (!res.ok || !res.body) throw new Error();

        const reader = res.body.getReader();
        const dec = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = dec.decode(value, {stream: true});
          for (const line of chunk.split("\n")) {
            if (!line || !line.startsWith("0:")) continue;
            buf += JSON.parse(line.slice(2));
          }
          if (buf.length > 10) upd();
        }

        const jd = extractJSON(buf);
        setMessages(m => { const u = [...m]; const l = u[u.length-1]; if (l?.role === "assistant") u[u.length-1] = {...l, content: buf, jsonData: jd ? JSON.stringify(jd) : undefined, done: true}; return u; });
      } catch {
        setMessages(m => { const u = [...m]; if (u[u.length-1]?.role === "assistant") u[u.length-1] = {role: "assistant", content: "Error generating trip. Check DEEPSEEK_API_KEY.", done: true}; return u; });
      } finally { setIsLoading(false); }
    }, 200);
    return () => clearTimeout(timer);
  }, [initialQ]);

  const handleSubmit = async (input: string) => {
    if (!input.trim() || isLoading) return;
    setMessages(m => [...m, { role: "user", content: input, done: true }, { role: "assistant", content: "", done: false }]);
    setQuery("");
    setShowSuggestions(false);
    setIsLoading(true);

    let buf = "";
    const upd = () => setMessages(m => { const u = [...m]; const l = u[u.length-1]; if (l?.role === "assistant") u[u.length-1] = {...l, content: buf}; return u; });

    try {
      const res = await fetch("/api/ai/trip-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });
      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let updateCounter = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = dec.decode(value, {stream: true});
        for (const line of chunk.split("\n")) {
          if (!line || !line.startsWith("0:")) continue;
          buf += JSON.parse(line.slice(2));
          updateCounter++;
        }
        if (updateCounter % 2 === 0 || chunk.length > 50) upd();
      }

      const jd = extractJSON(buf);
      setMessages(m => { const u = [...m]; const l = u[u.length-1]; if (l?.role === "assistant") u[u.length-1] = {...l, content: buf, jsonData: jd ? JSON.stringify(jd) : undefined, done: true}; return u; });
    } catch {
      setMessages(m => { const u = [...m]; if (u[u.length-1]?.role === "assistant") u[u.length-1] = {role: "assistant", content: "Something went wrong.", done: true}; return u; });
    } finally { setIsLoading(false); }
  };

  function renderMsg(msg: Message) {
    // User message
    if (msg.role === "user") {
      return (
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center shrink-0 mt-0.5">
            <User className="w-4 h-4 text-foreground/50" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-primary-foreground/90 leading-relaxed">{msg.content}</p>
          </div>
        </div>
      );
    }

    // Assistant message
    // Loading state (empty, not done)
    if (!msg.content && !msg.done) {
      return (
        <div className="flex flex-col gap-3 py-6 items-center">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-warm flex items-center justify-center shadow-sm">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 animate-ping opacity-20 rounded-xl bg-primary" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-semibold text-foreground/80">Planning your trip...</p>
            <p className="text-xs text-muted-foreground/50">Searching destinations and building itinerary</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s'}} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.15s'}} />
            <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.3s'}} />
          </div>
        </div>
      );
    }

    // JSON data available (after done)
    if (msg.done && msg.jsonData) {
      try {
        const data = JSON.parse(msg.jsonData);
        return (
          <div className="space-y-4">
            <details className="group" open>
              <summary className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary/5 to-warm/5 border border-primary/10 cursor-pointer hover:from-primary/10 hover:to-warm/10 transition-all select-none">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground/80 flex-1">
                  {msg.content.split("\n")[0]?.replace(/^#\s*/, "")?.trim() || "View formatted itinerary"}
                </span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-lime-500" />
                  <span className="text-xs text-primary group-open:hidden">▼ Show cards</span>
                  <span className="text-xs text-primary hidden group-open:inline">▲ Hide cards</span>
                </div>
              </summary>
              <div className="mt-4"><TripView data={data} /></div>
            </details>
            <MarkdownView content={msg.content} done={true} />
          </div>
        );
      } catch { /* fall through to markdown */ }
    }
    return <MarkdownView content={msg.content} done={msg.done} />;
  }
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fff5f0] via-white to-[#f0faff] py-12 md:py-16">
        <div className="absolute top-10 left-5 text-3xl opacity-[0.08]">🏯</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-[0.08]">🐼</div>
        <div className="max-w-[800px] mx-auto px-6 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-6 border border-primary/10">
            <Sparkles className="w-5 h-5" />
            AI Travel Planner
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-3">
            Plan Your <span className="bg-gradient-to-r from-primary via-[#ffb347] to-secondary bg-clip-text text-transparent">Dream Trip</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">Tell us where you want to go and we&apos;ll build a complete itinerary in seconds.</p>
          <div className="relative max-w-xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-[#ffb347] to-secondary rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
              <div className="relative flex items-center bg-white rounded-xl shadow-lg shadow-black/5 border border-border/60">
                <input type="text" value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit(query)}
                  placeholder="e.g., 7 days in China, first time, budget $2000"
                  className="flex-1 px-6 py-4 bg-transparent text-base text-foreground placeholder:text-muted-foreground/50 focus:outline-none rounded-xl"
                  disabled={isLoading}
                />
                <button onClick={() => handleSubmit(query)} disabled={isLoading || !query.trim()}
                  className="mr-2 p-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
                >{isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}</button>
              </div>
            </div>
          </div>
          {!initialQ && <div className="flex flex-wrap justify-center gap-2 mt-6">
            {suggestions.map(s => <button key={s} onClick={() => { setQuery(s); handleSubmit(s); }}
              className="px-4 py-2 bg-white border border-border/60 rounded-full text-sm text-muted-foreground hover:border-primary/30 hover:text-primary hover:shadow-sm transition-all">{s}</button>)}
          </div>}
        </div>
      </section>
      <section className="py-8 bg-gradient-to-b from-white to-muted/20">
        <div className="max-w-[800px] mx-auto px-6 space-y-6">
          {messages.map((msg, idx) => {
            const isUser = msg.role === "user";
            const isLastAssistant = !isUser && idx === messages.length - 1 && msg.content && !msg.done;
            
            return (
              <div key={idx} className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {/* Assistant avatar */}
                {!isUser ? (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-warm flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                ) : null}
                
                {/* Message bubble */}
                <div className={`${
                  isUser ? "max-w-[75%]" : "max-w-[88%]"
                } rounded-2xl ${
                  isUser
                    ? "bg-primary text-primary-foreground px-5 py-3.5 shadow-sm"
                    : "bg-white border border-border/50 px-6 py-5 shadow-sm hover:shadow-md transition-shadow"
                }`}>
                  {/* Assistant label */}
                  {!isUser && !isLastAssistant ? (
                    <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-border/20">
                      <div className="w-4 h-4 rounded bg-primary/10 flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5 text-primary" />
                      </div>
                      <span className="text-[11px] font-semibold text-primary/70 uppercase tracking-wider">
                        {msg.done ? "GoChinaPass AI" : "Generating..."}
                      </span>
                      {!msg.done ? (
                        <div className="flex items-center gap-0.5 ml-1">
                          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s'}} />
                          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.15s'}} />
                          <div className="w-1 h-1 rounded-full bg-primary animate-bounce" style={{animationDuration:'0.8s', animationDelay:'0.3s'}} />
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                  {renderMsg(msg)}
                </div>
                
                {/* User avatar */}
                {isUser ? (
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                ) : null}
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>
      </section>
    </>
  );
}
