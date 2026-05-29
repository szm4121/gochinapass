import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb, Compass } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { guides, guideList } from "@/content/guides";
import type { Metadata } from "next";

export function generateStaticParams() {
  return Object.values(guides).map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const guide = guides[params.slug];
  if (!guide) return { title: "Guide Not Found" };
  return {
    title: guide.seo.title,
    description: guide.seo.description,
    keywords: guide.seo.keywords,
    openGraph: {
      title: guide.seo.title,
      description: guide.seo.description,
      type: "article",
    },
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const guide = guides[params.slug];
  if (!guide) notFound();

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-4rem)]">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0">
            <img src={guide.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(0.7) brightness(0.9)" }} />
            <div className="absolute inset-0 bg-gradient-to-br from-[#fffbf0]/80 via-white/75 to-[#fff5f0]/80" />
          </div>
          <div className="max-w-[800px] mx-auto px-6 relative">
            <Link href="/survival-guide" className="text-sm text-white/70 hover:text-white transition-colors mb-4 inline-flex items-center gap-1">
              ← Back to Survival Guide
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mt-4 mb-3">
              {guide.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {guide.subtitle}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 bg-white">
          <div className="max-w-[800px] mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Main content */}
              <div className="md:col-span-2 space-y-10">
                {guide.sections.map((section, i) => (
                  <div key={i}>
                    <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">{section.content}</p>
                    {section.videoUrl && (
                      <div className="mt-4 relative aspect-video rounded-xl overflow-hidden bg-muted">
                        <iframe
                          src={section.videoUrl}
                          title={section.title}
                          className="absolute inset-0 w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                  </div>
                ))}

                {/* Videos are embedded inline within sections */}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Tips */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-warm/5 to-primary/5 border border-warm/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-warm" />
                    <h3 className="text-sm font-semibold text-foreground">Quick Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {guide.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-muted-foreground/80 leading-relaxed flex gap-2">
                        <span className="text-warm shrink-0">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* App Download Links */}
                {guide.appLinks && guide.appLinks.length > 0 && (
                  <div className="p-5 rounded-xl bg-white border border-border/60">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Download the App</h3>
                    <div className="space-y-2">
                      {guide.appLinks.map((app, i) => (
                        <div key={i} className="space-y-2">
                          <p className="text-xs text-muted-foreground/70">{app.name}</p>
                          <div className="flex gap-2">
                            <a href={app.ios} target="_blank" rel="noopener noreferrer"
                              className="flex-1 px-3 py-2 bg-accent text-white rounded-lg text-xs font-medium text-center hover:opacity-90 transition-all">
                              App Store
                            </a>
                            <a href={app.android} target="_blank" rel="noopener noreferrer"
                              className="flex-1 px-3 py-2 bg-accent text-white rounded-lg text-xs font-medium text-center hover:opacity-90 transition-all">
                              Google Play
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sources */}
                <div className="p-5 rounded-xl bg-white border border-border/60">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Sources</h3>
                  <p className="text-xs text-muted-foreground/60 mb-3">Last updated: {guide.lastUpdated}</p>
                  <div className="space-y-2">
                    {guide.sources.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                        className="block text-xs text-primary hover:underline">
                        {s.label} ↗
                      </a>
                    ))}
                  </div>
                </div>

                {/* Affiliate */}
                {guide.affiliate && (
                  <div className="p-5 rounded-xl bg-white border border-border/60">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Compass className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">Recommended</h3>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground/80 mb-3">{guide.affiliate.text}</p>
                    <Link href={guide.affiliate.url} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                      Learn more →
                    </Link>
                  </div>
                )}

                {/* Related guides */}
                <div className="p-5 rounded-xl bg-white border border-border/60">
                  <h3 className="text-sm font-semibold text-foreground mb-3">All Guides</h3>
                  <div className="space-y-2">
                    {guideList.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/survival-guide/${g.slug}`}
                        className={`block text-sm transition-colors ${
                          g.slug === guide.slug ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        {g.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-warm/5 to-primary/5">
          <div className="max-w-[600px] mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Need More Help?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Ask GoChinaPass AI for personalized advice about {guide.title.toLowerCase()}.
            </p>
            <Link
              href={`/ai-planner?q=${encodeURIComponent("Help me with " + guide.title + " in China")}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md"
            >
              Ask AI Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
