import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

const cities = [
  { name: "Beijing", slug: "beijing", desc: "Great Wall & Forbidden City", photo: "/beijing.jpg" },
  { name: "Shanghai", slug: "shanghai", desc: "Bund & Disneyland", photo: "/shanghai.jpg" },
  { name: "Chengdu", slug: "chengdu", desc: "Pandas & Hot Pot", photo: "/chengdu.jpg" },
  { name: "Xi'an", slug: "xian", desc: "Terracotta Warriors", photo: "/xian.jpg" },
];

export function Cities() {
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 md:gap-14 items-center">
          {/* Left: 2x2 city photo grid */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3 md:gap-4">
            {cities.map((city) => (
              <Link
                key={city.name}
                href={`/city-guides/${city.slug}`}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={city.photo}
                    alt={city.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-base md:text-lg font-bold text-white">{city.name}</h3>
                    <p className="text-xs text-white/70 mt-0.5">{city.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right: Description */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Explore China's Top <span className="text-secondary">Destinations</span>
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              From the Great Wall in Beijing to the Terracotta Warriors in Xi&apos;an, from Shanghai&apos;s futuristic skyline to Chengdu&apos;s panda base — discover China&apos;s most incredible cities.
            </p>
            <div className="flex flex-col gap-2 mb-8">
              {cities.map((city) => (
                <Link
                  key={city.name}
                  href={`/city-guides/${city.slug}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {city.name}
                  <span className="text-xs text-muted-foreground/50">— {city.desc}</span>
                </Link>
              ))}
            </div>
            <Link
              href="/city-guides"
              className="inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:gap-3 transition-all"
            >
              View all city guides <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
