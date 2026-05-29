import { ArrowRight, Star, MapPin } from "lucide-react";
import Link from "next/link";

// Unsplash photo IDs for each city
const cityPhotos: Record<string, string> = {
  Beijing:
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&h=600&fit=crop&auto=format",
  Shanghai:
    "https://images.unsplash.com/photo-1537531383492-f81478b1d7a8?w=600&h=600&fit=crop&auto=format",
  Chengdu:
    "https://images.unsplash.com/photo-1590736969955-71cc94901146?w=600&h=600&fit=crop&auto=format",
  "Xi'an":
    "https://images.unsplash.com/photo-1590419684242-09ba3f5d8d8e?w=600&h=600&fit=crop&auto=format",
  Guilin:
    "https://images.unsplash.com/photo-1529921876812-e58150e4f0b6?w=600&h=600&fit=crop&auto=format",
  Guangzhou:
    "https://images.unsplash.com/photo-1537531383492-f81478b1d7a8?w=600&h=600&fit=crop&auto=format",
};

const cities = [
  { name: "Beijing", slug: "beijing", desc: "Great Wall & Forbidden City", rating: "4.8" },
  { name: "Shanghai", slug: "shanghai", desc: "Bund & Disneyland", rating: "4.7" },
  { name: "Chengdu", slug: "chengdu", desc: "Pandas & Hot Pot", rating: "4.6" },
  { name: "Xi'an", slug: "xian", desc: "Terracotta Warriors", rating: "4.7" },
  { name: "Guilin", slug: "guilin", desc: "Li River & Karst", rating: "4.5" },
  { name: "Guangzhou", slug: "guangzhou", desc: "Dim Sum & Canton Tower", rating: "4.4" },
];

const activities = [
  {
    title: "The Great Wall",
    location: "Beijing",
    tag: "Historical Sites",
    price: "From $45",
    gradient: "from-[#ff6b4a]/20 to-[#ffb347]/10",
    emoji: "🏛️",
  },
  {
    title: "Panda Base",
    location: "Chengdu",
    tag: "Wildlife",
    price: "From $20",
    gradient: "from-[#51cf66]/20 to-[#48cae4]/10",
    emoji: "🐼",
  },
  {
    title: "Li River Cruise",
    location: "Guilin",
    tag: "Scenic",
    price: "From $55",
    gradient: "from-[#00b4d8]/20 to-[#51cf66]/10",
    emoji: "🏔️",
  },
];

function CityCard({ name, slug, rating, desc }: { name: string; slug: string; rating: string; desc: string }) {
  const photoUrl = cityPhotos[name] || cityPhotos["Beijing"];

  return (
    <Link href={`/city-guides/${slug}`} className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all bg-white border border-border/60 hover:border-secondary/30">
      {/* Card image */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-warm/10" />
        <img
          src={photoUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      {/* Card body */}
      <div className="p-4">
        <h3 className="text-base font-bold text-foreground group-hover:text-secondary transition-colors mb-2">
          {name}
        </h3>
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-warm text-warm" />
          <span className="text-sm text-muted-foreground font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground/50 ml-1">{desc}</span>
        </div>
      </div>
    </Link>
  );
}

export function Cities() {
  return (
    <>
      {/* Destinations */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Explore China's Top <span className="text-secondary">Destinations</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              From the Great Wall to the Li River — discover what each city has to offer.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-10">
            {cities.map((city) => (
              <CityCard key={city.name} {...city} />
            ))}
          </div>
        </div>
      </section>

      {/* Things to Do */}
      <section className="py-20 bg-[#f5fbff]">
        <div className="max-w-[1000px] mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-3">
              Things to <span className="text-warm">Do</span>
            </h2>
            <p className="text-muted-foreground">
              Hand-picked experiences for your China trip.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {activities.map((act) => (
              <div
                key={act.title}
                className="group rounded-2xl overflow-hidden border border-border/60 hover:shadow-lg hover:border-transparent transition-all bg-white cursor-pointer"
              >
                <div className={`h-44 bg-gradient-to-br ${act.gradient} flex items-center justify-center relative`}>
                  <span className="text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">{act.emoji}</span>
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-foreground shadow-sm">
                      {act.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground">{act.title}</h3>
                    <span className="text-sm font-semibold text-primary">{act.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-secondary" /> {act.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/city-guides" className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all">
              Explore more things to do <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
