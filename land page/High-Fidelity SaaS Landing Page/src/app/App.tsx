import { useState } from 'react';
import {
  Sparkles,
  Map,
  Wallet,
  Wifi,
  MapPin,
  Train,
  Shield,
  Globe,
  Hotel,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg tracking-tight" style={{ fontWeight: 600 }}>GoChinaPass</span>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#planner" className="text-sm text-foreground hover:text-primary transition-colors">AI Planner</a>
              <a href="#cities" className="text-sm text-foreground hover:text-primary transition-colors">City Guides</a>
              <a href="#guide" className="text-sm text-foreground hover:text-primary transition-colors">Travel Guide</a>
              <a href="#deals" className="text-sm text-foreground hover:text-primary transition-colors">Deals</a>
            </nav>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">EN</button>
              <button className="text-sm text-foreground hover:text-primary transition-colors">Login</button>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity">
                Start Planning
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col gap-4">
                <a href="#planner" className="text-sm text-foreground">AI Planner</a>
                <a href="#cities" className="text-sm text-foreground">City Guides</a>
                <a href="#guide" className="text-sm text-foreground">Travel Guide</a>
                <a href="#deals" className="text-sm text-foreground">Deals</a>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm w-full">
                  Start Planning
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent to-white">
        <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-[1.2fr,1fr] gap-12 items-center">
            {/* Left Side */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight" style={{ fontWeight: 700, lineHeight: '1.1' }}>
                  Plan Your Trip to China with AI
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Generate complete itineraries, hotels, transport routes and travel tips in seconds.
                </p>
              </div>

              {/* AI Input Box */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Where do you want to go in China?"
                    className="w-full px-6 py-4 pr-12 bg-white border border-border rounded-xl text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                  <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                </div>
                <button className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl text-base hover:opacity-90 transition-opacity shadow-sm">
                  Generate My Trip
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {['First-time visitors', 'Budget travel', 'Food tours', 'Luxury trips', 'Business travel'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white border border-border rounded-full text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side - AI Preview Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-border p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>AI Generated Itinerary</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-base" style={{ fontWeight: 500 }}>Beijing</span>
                  <span className="text-sm text-muted-foreground">Days 1-3</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-base" style={{ fontWeight: 500 }}>Xi'an</span>
                  <span className="text-sm text-muted-foreground">Days 4-5</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-base" style={{ fontWeight: 500 }}>Shanghai</span>
                  <span className="text-sm text-muted-foreground">Days 6-7</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span style={{ fontWeight: 500 }}>7 days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hotels</span>
                  <span style={{ fontWeight: 500 }}>Included</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Transport</span>
                  <span style={{ fontWeight: 500 }}>High-speed rail</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget</span>
                  <span style={{ fontWeight: 500 }}>$1,200 - $1,800</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Sparkles, title: 'AI Trip Planner', desc: 'Generate personalized itineraries instantly' },
              { icon: Map, title: 'China City Guides', desc: 'Comprehensive guides for every destination' },
              { icon: Wallet, title: 'Payment Guide', desc: 'Setup Alipay & WeChat Pay easily' },
              { icon: Wifi, title: 'Internet Guide', desc: 'VPN recommendations & eSIM options' }
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
              >
                <item.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg mb-2" style={{ fontWeight: 600 }}>{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending SEO Articles */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-12 tracking-tight" style={{ fontWeight: 700 }}>
            Most Popular Travel Guides
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'How to use Alipay in China', category: 'Payment', desc: 'Step-by-step guide for foreigners' },
              { title: 'Best VPN for China', category: 'Internet', desc: 'Top-rated VPNs that actually work' },
              { title: 'China eSIM Guide', category: 'Connectivity', desc: 'Stay connected without SIM cards' },
              { title: 'China Subway Guide', category: 'Transport', desc: 'Navigate metro systems like a local' },
              { title: 'How to book train tickets in China', category: 'Transport', desc: 'Complete booking tutorial' },
              { title: 'WeChat Pay for foreigners', category: 'Payment', desc: 'Setup and verification guide' }
            ].map((article) => (
              <article
                key={article.title}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow cursor-pointer"
              >
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs mb-3">
                  {article.category}
                </span>
                <h3 className="text-lg mb-2" style={{ fontWeight: 600 }}>{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* AI Travel Demo */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl tracking-tight" style={{ fontWeight: 700 }}>
                Try AI Travel Planner
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI-powered planner creates complete itineraries in seconds. Just tell us your preferences, and we'll handle the rest — from hotels to transportation to must-see attractions.
              </p>
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                Start Planning Now
              </button>
            </div>

            {/* Right - Chat UI Mockup */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg rounded-tr-sm max-w-[80%]">
                  I want to visit China for 5 days
                </div>
              </div>

              <div className="flex justify-start">
                <div className="bg-secondary text-foreground px-4 py-3 rounded-lg rounded-tl-sm max-w-[85%] space-y-2">
                  <p className="text-sm" style={{ fontWeight: 500 }}>Great! Here's your 5-day China itinerary:</p>
                  <div className="space-y-1 text-sm">
                    <div>📍 Day 1-2: Beijing (Forbidden City, Great Wall)</div>
                    <div>📍 Day 3-4: Xi'an (Terracotta Warriors)</div>
                    <div>📍 Day 5: Shanghai (The Bund, Yu Garden)</div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Hotels & transport included ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Essentials */}
      <section id="deals" className="py-16 md:py-20 bg-secondary">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-12 tracking-tight" style={{ fontWeight: 700 }}>
            Travel Essentials for China
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wifi, title: 'eSIM for China', desc: 'Stay connected everywhere', cta: 'Get eSIM' },
              { icon: Shield, title: 'VPN for China', desc: 'Access global apps & services', cta: 'Get VPN' },
              { icon: Hotel, title: 'Hotel Booking', desc: 'Exclusive deals on top hotels', cta: 'Book Now' },
              { icon: Globe, title: 'Local Tours', desc: 'Curated experiences & guides', cta: 'Explore' }
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card border border-border rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-lg mb-2" style={{ fontWeight: 600 }}>{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90 transition-opacity">
                  {item.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* City Guides */}
      <section id="cities" className="py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-12 tracking-tight" style={{ fontWeight: 700 }}>
            Popular Destinations
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Beijing',
                desc: 'Ancient capital with imperial palaces and the Great Wall',
                img: 'https://images.unsplash.com/photo-1777998857277-1e67b29ae93d?w=600&h=400&fit=crop&auto=format',
                rating: '4.8'
              },
              {
                name: 'Shanghai',
                desc: 'Modern metropolis blending East and West',
                img: 'https://images.unsplash.com/photo-1616680687799-ea36d6fb2173?w=600&h=400&fit=crop&auto=format',
                rating: '4.9'
              },
              {
                name: 'Chengdu',
                desc: 'Panda paradise and spicy Sichuan cuisine hub',
                img: 'https://images.unsplash.com/photo-1723242015936-ab12ca2626b3?w=600&h=400&fit=crop&auto=format',
                rating: '4.7'
              },
              {
                name: "Xi'an",
                desc: 'Home to the Terracotta Warriors and ancient Silk Road',
                img: 'https://images.unsplash.com/photo-1527922891260-918d42a4efc8?w=600&h=400&fit=crop&auto=format',
                rating: '4.8'
              },
              {
                name: 'Guangzhou',
                desc: 'Cantonese culture and culinary excellence',
                img: 'https://images.unsplash.com/photo-1539008783272-879419b3c424?w=600&h=400&fit=crop&auto=format',
                rating: '4.6'
              },
              {
                name: 'Shenzhen',
                desc: 'Tech hub with futuristic skyline and innovation',
                img: 'https://images.unsplash.com/photo-1522614288668-a697127e9b21?w=600&h=400&fit=crop&auto=format',
                rating: '4.7'
              }
            ].map((city) => (
              <div
                key={city.name}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={city.img}
                    alt={`${city.name} cityscape`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl" style={{ fontWeight: 600 }}>{city.name}</h3>
                    <div className="flex items-center gap-1">
                      <span className="text-sm" style={{ fontWeight: 500 }}>{city.rating}</span>
                      <span className="text-sm text-muted-foreground">★</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{city.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 bg-secondary">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl mb-12 tracking-tight text-center" style={{ fontWeight: 700 }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: 'Is China safe for tourists?',
                a: 'Yes, China is generally very safe for tourists. Major cities have low crime rates and excellent public security. Follow standard travel precautions and stay aware of your surroundings.'
              },
              {
                q: 'Can I use Google in China?',
                a: "Google services are blocked in mainland China. You'll need a VPN to access Google, Gmail, Google Maps, and other Google services. We recommend setting up a VPN before you arrive."
              },
              {
                q: 'Do I need VPN in China?',
                a: 'Yes, a VPN is essential for accessing many Western websites and apps including Google, Facebook, Instagram, WhatsApp, and more. Choose a reliable VPN provider before your trip.'
              },
              {
                q: 'Can foreigners use Alipay?',
                a: 'Yes! Foreigners can now use Alipay by linking an international credit card. You can also use the TourPass feature for temporary access. WeChat Pay also supports foreign cards in major cities.'
              },
              {
                q: 'How do I travel around China?',
                a: 'China has an excellent high-speed rail network connecting major cities. For city travel, use metros (subway systems), taxis, or ride-hailing apps like Didi. Domestic flights are also affordable for longer distances.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent/50 transition-colors"
                >
                  <span style={{ fontWeight: 500 }}>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-sm text-muted-foreground">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg tracking-tight" style={{ fontWeight: 600 }}>GoChinaPass</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI-powered travel companion for exploring China.
              </p>
            </div>

            <div>
              <h4 className="text-sm mb-4" style={{ fontWeight: 600 }}>Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">AI Planner</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">City Guides</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Travel Tips</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm mb-4" style={{ fontWeight: 600 }}>Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Affiliate Disclosure</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm mb-4" style={{ fontWeight: 600 }}>Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 GoChinaPass. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
