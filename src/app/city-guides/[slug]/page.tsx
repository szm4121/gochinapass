import { notFound } from "next/navigation";
import { MapPin, Star, Train, Wifi, Utensils, Sparkles, ArrowRight, Compass, Clock, Sun, Moon, Hotel, Globe } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { cities, type CityContent } from "@/content/cities";
import type { Metadata } from "next";

export function generateStaticParams() {
  return Object.values(cities).map((city) => ({ slug: city.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const city = cities[params.slug];
  if (!city) return { title: "City Not Found" };

  return {
    title: city.seo.title,
    description: city.seo.description,
    keywords: city.seo.keywords,
    openGraph: {
      title: city.seo.title,
      description: city.seo.description,
      type: "website",
    },
  };
}

const cityTheme: Record<string, string> = {
  beijing: "from-[#ff6b4a]/10 via-[#ffb347]/5 to-white",
  shanghai: "from-[#00b4d8]/10 via-[#48cae4]/5 to-white",
  chengdu: "from-[#51cf66]/10 via-[#48cae4]/5 to-white",
  xian: "from-[#ffb347]/10 via-[#ff6b4a]/5 to-white",
  guangzhou: "from-[#ff6b6b]/10 via-[#ffb347]/5 to-white",
  guilin: "from-[#00b4d8]/10 via-[#51cf66]/5 to-white",
};

const badgeColors: Record<string, string> = {
  beijing: "bg-primary/10 text-primary",
  shanghai: "bg-secondary/10 text-secondary",
  chengdu: "bg-lime/10 text-lime",
  xian: "bg-warm/10 text-warm",
  guangzhou: "bg-rose/10 text-rose",
  guilin: "bg-sky/10 text-sky",
};

const cityPhotos: Record<string, string> = {
  beijing: "/beijing.jpg",
  shanghai: "/shanghai.jpg",
  chengdu: "/chengdu.jpg",
  xian: "/xian.jpg",
  guangzhou: "/shanghai.jpg",
  guilin: "/guilin.jpg",
};

export default function CityGuidePage({ params }: { params: { slug: string } }) {
  const city = cities[params.slug];
  if (!city) notFound();

  const theme = cityTheme[city.slug] || cityTheme.beijing;
  const badge = badgeColors[city.slug] || badgeColors.beijing;

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0">
            <img src={cityPhotos[city.slug] || cityPhotos.beijing} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(0.8)" }} />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="max-w-[1000px] mx-auto px-6 relative">
            <span className="text-5xl block mb-4">{city.emoji}</span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              {city.name} Travel Guide
            </h1>
            <p className="text-base text-white/60 mb-1">{city.subtitle}</p>
            <p className="text-base text-white/70 flex items-center gap-1.5 mb-4">
              <MapPin className="w-4 h-4 text-white/70" />
              China &middot; Updated 2025 &middot; <Star className="w-3.5 h-3.5 fill-warm text-warm" /> {city.rating}
            </p>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-6">
              {city.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={`/ai-planner?q=Trip%20to%20${encodeURIComponent(city.name)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-sm">
                <Sparkles className="w-4 h-4" />
                AI Plan {city.name} Trip
              </Link>
              <Link href={`/deals`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full text-sm font-medium text-white hover:bg-white/25 transition-all">
                <Wifi className="w-4 h-4" />
                eSIM & VPN Deals
              </Link>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 bg-gradient-to-b from-white to-muted/30">
          <div className="max-w-[1000px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Main */}
              <div className="md:col-span-2 space-y-12">
                {/* Overview */}
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-3">Why Visit {city.name}?</h2>
                  <p className="text-sm text-muted-foreground/80 leading-relaxed">{city.overview}</p>
                </div>

                {/* Highlights */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}>Top Attractions</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {city.highlights.map((h, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white border border-border/60 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{h.emoji}</span>
                          <h4 className="font-semibold text-foreground text-sm">{h.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed">{h.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3-Day Itinerary */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}>3-Day Itinerary</span>
                  </div>
                  <div className="space-y-3">
                    {city.itinerary3Days.map((day, i) => (
                      <div key={i} className="rounded-xl border border-border/60 bg-white shadow-sm overflow-hidden">
                        <div className={`px-5 py-3 bg-gradient-to-r ${theme} border-b border-border/40`}>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center text-sm font-bold text-foreground/80 shadow-sm">
                              {i + 1}
                            </div>
                            <h4 className="font-bold text-sm text-foreground/90">{day.day}</h4>
                          </div>
                        </div>
                        <div className="px-5 py-2">
                          {day.activities.map((act, j) => (
                            <div key={j} className="flex gap-3 py-2 border-b border-border/20 last:border-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-[7px] shrink-0" />
                              <p className="text-sm text-foreground/75">{act}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-warm/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground/80 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Want a personalized itinerary?{" "}
                      <Link href={`/ai-planner?q=Trip%20to%20${encodeURIComponent(city.name)}`} className="text-primary font-semibold hover:underline">
                        Ask AI →
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Food */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}>Food & Dining</span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {city.food.map((f, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white border border-border/60 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{f.emoji}</span>
                          <h4 className="font-semibold text-foreground text-sm">{f.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground/70">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transport */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}>Getting Around</span>
                  </div>
                  <div className="space-y-3">
                    {city.transport.map((t, i) => (
                      <div key={i} className="p-4 rounded-xl bg-white border border-border/60 hover:shadow-md transition-all">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Train className="w-4 h-4 text-muted-foreground/60" />
                          <h4 className="text-sm font-semibold text-foreground">{t.mode}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground/70 leading-relaxed">{t.tip}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Link href="/survival-guide/transport" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
                      Complete China transport guide <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Hotel Affiliate */}
                <div className="p-5 rounded-xl bg-white border border-border/60 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Hotel className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">Hotels in {city.name}</h3>
                      <p className="text-xs text-muted-foreground">Best rates on Booking.com</p>
                    </div>
                  </div>
                  <Link
                    href={city.affiliate.hotel.url}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {city.affiliate.hotel.text} →
                  </Link>
                </div>

                {/* eSIM Affiliate */}
                {city.affiliate.esim ? (
                  <div className="p-5 rounded-xl bg-gradient-to-br from-[#00b4d8]/5 to-[#48cae4]/5 border border-secondary/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00b4d8]/20 to-[#48cae4]/10 flex items-center justify-center">
                        <Wifi className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Stay Connected</h3>
                        <p className="text-xs text-muted-foreground">eSIM for China travelers</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground/80 mb-3">Instant data when you land. Works with Google Maps, WhatsApp, and Alipay.</p>
                    <Link href={city.affiliate.esim.url} className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:underline">
                      {city.affiliate.esim.text} →
                    </Link>
                  </div>
                ) : null}

                {/* Tour Affiliate */}
                {city.affiliate.tour ? (
                  <div className="p-5 rounded-xl bg-gradient-to-br from-[#ffb347]/5 to-[#ff6b4a]/5 border border-warm/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ffb347]/20 to-[#ff6b4a]/10 flex items-center justify-center">
                        <Compass className="w-5 h-5 text-warm" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Guided Tours</h3>
                        <p className="text-xs text-muted-foreground">Book on GetYourGuide</p>
                      </div>
                    </div>
                    <Link href={city.affiliate.tour.url} className="inline-flex items-center gap-1 text-xs font-semibold text-warm hover:underline">
                      {city.affiliate.tour.text} →
                    </Link>
                  </div>
                ) : null}

                {/* Related Guides */}
                <div className="p-5 rounded-xl bg-white border border-border/60">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Essential China Guides</h3>
                  <div className="space-y-2">
                    <Link href="/survival-guide/payment" className="block text-sm text-muted-foreground hover:text-primary transition-colors">💳 How to Use Alipay</Link>
                    <Link href="/survival-guide/transport" className="block text-sm text-muted-foreground hover:text-primary transition-colors">🚄 China Train Booking</Link>
                    <Link href="/deals" className="block text-sm text-muted-foreground hover:text-primary transition-colors">🌐 Best VPN for China</Link>
                    <Link href="/survival-guide/transport" className="block text-sm text-muted-foreground hover:text-primary transition-colors">📱 Must-Have Apps</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 bg-gradient-to-r from-primary/5 via-warm/5 to-secondary/5">
          <div className="max-w-[600px] mx-auto px-6 text-center">
            <Compass className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Plan Your {city.name} Trip with AI
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Tell GoChinaPass your dates, budget, and interests — get a complete day-by-day itinerary in seconds.
            </p>
            <Link
              href={`/ai-planner?q=Trip%20to%20${encodeURIComponent(city.name)}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md"
            >
              <Sparkles className="w-5 h-5" />
              Start AI Planning
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
