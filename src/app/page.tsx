import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Cities } from "@/components/landing/cities";
import { Essentials } from "@/components/landing/essentials";
import { Testimonials } from "@/components/landing/testimonials";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Cities />
        <Essentials />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
