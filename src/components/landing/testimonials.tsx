import { Star } from "lucide-react";

const testimonials = [
  { name: "Sarah", from: "Australia", text: "GoChinaPass saved me so much planning time. The AI generated a perfect 10-day itinerary covering Beijing, Xi'an, and Shanghai.", rating: 5, color: "from-[#ff6b4a]/20 to-[#ffb347]/10" },
  { name: "Mike", from: "USA", text: "The Alipay guide was a lifesaver. I would have been completely lost without it. Everything worked exactly as described.", rating: 5, color: "from-[#00b4d8]/20 to-[#48cae4]/10" },
  { name: "Emma", from: "UK", text: "I was worried about the internet situation, but the VPN guide sorted me out. Used NordVPN the whole trip without issues.", rating: 5, color: "from-[#51cf66]/20 to-[#00b4d8]/10" },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-[#f5fbff]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
            What Travelers <span className="text-secondary">Say</span>
          </h2>
          <p className="text-muted-foreground">Real stories from real China travelers.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`relative p-6 rounded-2xl bg-gradient-to-br ${t.color} border border-border/60 hover:shadow-md transition-shadow`}>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="w-5 h-5 fill-warm text-warm" />)}
              </div>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-warm flex items-center justify-center text-base font-bold text-white shadow-sm">{t.name[0]}</div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.from}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
