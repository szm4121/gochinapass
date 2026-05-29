"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideItem {
  name: string;
  image: string;
  onClick: () => void;
}

export function DestinationCarousel({ items }: { items: SlideItem[] }) {
  const [current, setCurrent] = useState(0);

  const visible = 2;
  const max = Math.max(0, items.length - visible);

  const go = (dir: number) => {
    setCurrent((c) => Math.min(max, Math.max(0, c + dir)));
  };

  return (
    <div className="relative group/carousel">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${current * (100 / visible)}%)` }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={item.onClick}
              className="flex-none px-2"
              style={{ width: `${100 / visible}%` }}
            >
              <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
                    <span className="text-base md:text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {current > 0 && (
        <button
          onClick={() => go(-1)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronLeft className="w-5 h-5 text-foreground/70" />
        </button>
      )}
      {current < max && (
        <button
          onClick={() => go(1)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover/carousel:opacity-100"
        >
          <ChevronRight className="w-5 h-5 text-foreground/70" />
        </button>
      )}

      <div className="flex items-center justify-center gap-2 mt-4">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-foreground/40" : "w-2 bg-foreground/15 hover:bg-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
