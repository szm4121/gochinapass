export interface GuideContent {
  slug: string;
  title: string;
  subtitle: string;
  desc: string;
  heroImage: string;
  lastUpdated: string;
  sources: { label: string; url: string }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  sections: {
    title: string;
    content: string;
  }[];
  tips: string[];
  affiliate?: {
    text: string;
    url: string;
  };
}

export const guides: Record<string, GuideContent> = {
  payment: {
    slug: "payment",
    title: "Payment Guide",
    subtitle: "How to use Alipay, WeChat Pay, and foreign cards in China",
    desc: "China is almost cashless. Here's how to pay for everything as a foreign tourist.",
    heroImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop&auto=format",
    lastUpdated: "May 2025",
    sources: [
      { label: "Alipay Official Help Center", url: "https://help.alipay.com" },
      { label: "Alipay International Users Guide", url: "https://www.alipay.com/global" },
    ],
    seo: {
      title: "How to Use Alipay in China 2025 | Foreign Tourist Payment Guide",
      description: "Complete guide to using Alipay and WeChat Pay as a foreign tourist in China. Link your international credit card, set up payments, and pay like a local.",
      keywords: ["How to use Alipay in China", "WeChat Pay for foreigners", "China payment guide", "Alipay foreign credit card", "pay in China without Chinese bank account"],
    },
    sections: [
      {
        title: "Why China is Cashless",
        content: "China runs on mobile payments. Even street vendors, subway ticket machines, and small restaurants use QR code payments. As a foreigner, you can absolutely use these systems — you just need to set them up before you go.",
      },
      {
        title: "Using Alipay as a Foreigner",
        content: "Alipay is the most foreigner-friendly payment app in China. Download the app from your app store, register with your email or phone number, and link your international Visa or Mastercard. Once set up, you can scan any Alipay QR code to pay instantly. The exchange rate is competitive and there are no additional fees for most transactions. You can also use Alipay to book Didi rides, buy train tickets through the mini-program, and even order food.",
      },
      {
        title: "Setting Up WeChat Pay",
        content: "WeChat Pay works similarly but requires a bit more setup. You'll need to add your international card within the WeChat app. Once linked, you can pay by scanning merchant QR codes or showing your payment code. WeChat Pay is accepted at even more places than Alipay — from high-end restaurants to street food stalls. Note that you may need a Chinese bank account for some advanced features, but the basic card-linked payment works for 95% of transactions.",
      },
      {
        title: "Do I Need Cash?",
        content: "While China is mostly cashless, it's wise to carry ¥200-500 ($30-70 USD) in cash for emergencies. Small street vendors, some taxi drivers (especially older ones), and rural areas may not accept digital payments. ATMs are widely available at banks and airports, and accept international cards with a small withdrawal fee. Stick to Bank of China, ICBC, or China Merchants Bank ATMs for the most reliable service.",
      },
      {
        title: "Using International Credit Cards",
        content: "Visa and Mastercard are accepted at most hotels, international restaurants, and large shopping malls. However, many local businesses only accept Chinese mobile payments. Always have Alipay or WeChat Pay as your primary payment method, and use your physical card as a backup. UnionPay is the most widely accepted card network as it's Chinese — if your bank issues a co-branded UnionPay card, bring it.",
      },
    ],
    tips: [
      "Set up Alipay BEFORE you leave home — you'll need SMS verification which may not work with a Chinese SIM card",
      "Link your credit card to Alipay, not a debit card, for better fraud protection",
      "Some international cards get blocked by Chinese payment systems — call your bank before traveling",
      "Alipay's 'Tour Pass' feature lets you preload funds without a Chinese bank account",
      "Keep screenshots of your payment QR codes offline in case you have no internet",
    ],
    affiliate: {
      text: "Get an eSIM before you arrive — you'll need internet to set up Alipay",
      url: "/deals",
    },
  },

  transport: {
    slug: "transport",
    title: "Transport Guide",
    subtitle: "Trains, subway, ride-hailing, and getting around China",
    desc: "China's transport system is world-class. Here's how to navigate it as a first-time visitor.",
    heroImage: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=800&h=400&fit=crop&auto=format",
    lastUpdated: "May 2025",
    sources: [
      { label: "Trip.com Train Booking", url: "https://www.trip.com/trains/" },
      { label: "China Railway Official (12306)", url: "https://www.12306.cn/en/" },
    ],
    seo: {
      title: "China Transport Guide 2025 | High-Speed Trains, Subway & Didi",
      description: "Complete guide to China's transport system for foreign tourists. How to book high-speed trains, use the subway, take Didi, and navigate like a local.",
      keywords: ["China train booking", "How to use China subway", "Didi in China for foreigners", "China high-speed rail guide", "China transport app"],
    },
    sections: [
      {
        title: "High-Speed Trains",
        content: "China's high-speed rail network is the largest in the world and the best way to travel between cities. Trains are clean, punctual, and comfortable. You can book tickets through Trip.com (English interface, accepts international cards) or at the station. Second class seats are perfectly comfortable and the most affordable option. Key routes: Beijing to Shanghai (4.5 hours, ¥550), Beijing to Xi'an (4.5 hours, ¥520), Shanghai to Guilin (8 hours, ¥600). Arrive at the station 30-45 minutes early to allow for security checks.",
      },
      {
        title: "Subway Systems",
        content: "Every major Chinese city has a modern, clean, and affordable subway system. Tickets cost ¥3-10 ($0.50-1.50) per ride. You can buy single-ride tickets at vending machines (many have English interface), or get a rechargeable transit card. In Beijing and Shanghai, you can now use Alipay directly at the turnstiles — just scan your payment QR code. Subway signs are bilingual (Chinese + English), and announcements are made in English as well. Download the metro map offline before your trip.",
      },
      {
        title: "Didi (Chinese Uber)",
        content: "Didi is China's ride-hailing app and it works just like Uber. Download the Didi app (it has an English version), register with your phone number, and add your international credit card. Enter your destination in Chinese for best results. Fares are very affordable — a 15-minute ride costs around ¥15-30 ($2-5). During peak hours or in bad weather, surge pricing applies. Didi is generally safer and more reliable than hailing a regular taxi.",
      },
      {
        title: "Domestic Flights",
        content: "For very long distances (Beijing to Guilin, or Shanghai to Chengdu), domestic flights can save time. China's major airlines — Air China, China Eastern, China Southern — are safe and reliable. Book through Trip.com or directly on airline websites. A checked bag is usually included in the fare. Note that you need your passport to check in, and arrive at least 1.5 hours before departure.",
      },
      {
        title: "Buses & Long-Distance",
        content: "Long-distance buses are the cheapest option for shorter routes. They're useful for reaching smaller cities and scenic areas that aren't on the high-speed rail network. For example, the bus from Guilin to Yangshuo takes 1.5 hours and costs ¥35 ($5). Buses are less comfortable than trains but offer more flexibility for rural destinations.",
      },
    ],
    tips: [
      "Book train tickets on Trip.com up to 15 days in advance — popular routes sell out",
      "Download the MetroMan or China Subway app for offline metro maps of all major cities",
      "Didi has an 'English Mode' — switch it in settings before your first ride",
      "Keep your passport handy — you need it to collect train tickets and check in for flights",
      "Avoid traveling during Chinese New Year and National Day (Oct 1-7) — everything is packed",
    ],
    affiliate: {
      text: "Book trains and hotels on Trip.com — best English interface for China travel",
      url: "/deals",
    },
  },

  vpn: {
    slug: "vpn",
    title: "VPN & Internet Guide",
    subtitle: "How to access Google, WhatsApp, Instagram and more in China",
    desc: "The Great Firewall blocks many Western websites. Here's how to stay connected.",
    heroImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&auto=format",
    lastUpdated: "May 2025",
    sources: [
      { label: "NordVPN China Guide", url: "https://nordvpn.com/zh/feature/china/" },
      { label: "ExpressVPN China Guide", url: "https://www.expressvpn.com/china" },
    ],
    seo: {
      title: "Best VPN for China 2025 | How to Access Google & WhatsApp",
      description: "The best VPNs that still work in China in 2025. Step-by-step guide to set up a VPN before your trip, access Google, WhatsApp, Instagram, and more.",
      keywords: ["Best VPN for China", "VPN that works in China", "how to access Google in China", "China internet restrictions", "VPN for China travel"],
    },
    sections: [
      {
        title: "What's Blocked in China?",
        content: "The Great Firewall of China blocks a significant portion of the internet. Common blocked services include Google (all services), Gmail, WhatsApp, Instagram, Facebook, Twitter/X, YouTube, Netflix, Spotify, and many news websites (BBC, New York Times). Services that work without VPN: Bing, Apple iMessage/Facetime (limited), LinkedIn (partially), and most Chinese apps like WeChat and Alipay.",
      },
      {
        title: "Best VPNs for China in 2025",
        content: "Not all VPNs work in China — the government actively blocks them. The most reliable VPNs as of 2025 are NordVPN and ExpressVPN. Both have dedicated servers optimized for China, offer obfuscated servers that hide VPN traffic, and have strong customer support. Astrill VPN is also popular among China travelers but has a more complex interface. Avoid free VPNs — they rarely work in China and have serious privacy concerns.",
      },
      {
        title: "Setting Up Before You Go",
        content: "This is critical: install and test your VPN BEFORE entering China. Many VPN websites are blocked inside China, making it nearly impossible to download the app or purchase a subscription once you're there. Download the app, create your account, and test the connection while you're still at home. Note any server addresses or configurations you might need. Save screenshots of setup instructions.",
      },
      {
        title: "Using VPN in China",
        content: "Once in China, connect to a VPN server optimized for China — usually labeled 'obfuscated' or 'stealth' in the app. If one server doesn't connect, try another. Connection speeds vary by server location and time of day. Expect slower speeds than usual, especially during peak hours. Some hotels and airports have WiFi that blocks VPNs — your phone's 4G/5G data (via a Chinese eSIM) often works better.",
      },
      {
        title: "eSIM vs Physical SIM",
        content: "For internet access, an eSIM is the most convenient option for most travelers. Airalo and Holafly offer China-specific eSIM plans that activate immediately upon arrival. No need to find a physical SIM card shop. An eSIM gives you your own data connection, which is more reliable than WiFi for VPN connections. If your phone doesn't support eSIM, you can buy a physical SIM card at the airport or at China Mobile/China Unicom shops.",
      },
    ],
    tips: [
      "Install your VPN before arriving in China — you can't download it once inside",
      "Both NordVPN and ExpressVPN offer 30-day money-back guarantees — try them before your trip",
      "Airport WiFi in China often blocks VPNs — use mobile data instead",
      "Keep a backup VPN installed in case your primary one stops working",
      "WeChat calls and FaceTime sometimes work better than WhatsApp for voice/video",
    ],
    affiliate: {
      text: "Get NordVPN with 68% discount — reliable in China",
      url: "/deals/vpn",
    },
  },

  apps: {
    slug: "apps",
    title: "Essential Apps",
    subtitle: "Must-have apps for navigating, translating, and surviving China",
    desc: "The apps every foreign tourist needs for a smooth China trip.",
    heroImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop&auto=format",
    lastUpdated: "May 2025",
    sources: [
      { label: "WeChat Official Site", url: "https://www.wechat.com" },
      { label: "Alipay Official Site", url: "https://www.alipay.com" },
    ],
    seo: {
      title: "Best Apps for China Travel 2025 | Essential Mobile Apps",
      description: "The essential apps for traveling in China — navigation, translation, messaging, ride-hailing, and more. What to download before your trip.",
      keywords: ["China travel apps", "best apps for China travel", "apps that work in China", "China navigation app", "China translation app"],
    },
    sections: [
      {
        title: "WeChat — The Everything App",
        content: "WeChat is not just messaging — it's an entire operating system for daily life in China. You'll use it to chat, pay (WeChat Pay), read news, order food, book services, and more. Almost every business in China has a WeChat account. Download the app, register with your phone number, and set up WeChat Pay by linking your international card. Pro tip: set up WeChat Pay before you go if possible.",
      },
      {
        title: "Alipay — Payments & More",
        content: "Alipay is your primary payment tool. Beyond payments, Alipay includes mini-programs for booking trains, ordering food (Ele.me), hailing rides, and even finding nearby restaurants with English menus. The app has a built-in translator for scanning Chinese text. Link your international Visa or Mastercard before you travel.",
      },
      {
        title: "Didi — Ride-Hailing",
        content: "Didi is the Chinese equivalent of Uber. It has an English interface option and accepts international credit cards. Enter your destination in Chinese characters for best results. Didi is cheaper than taxis and more reliable. The app can also be accessed through Alipay's mini-programs if you don't want to install another app.",
      },
      {
        title: "Google Translate & Pleco",
        content: "Google Translate works in China with a VPN and is excellent for camera translation — just point your phone at Chinese text. Pleco is the best Chinese-English dictionary app and works entirely offline. Download the Pleco dictionary packages before your trip. For voice translation, Microsoft Translator is a good backup that works without a VPN.",
      },
      {
        title: "Maps: Apple Maps vs Baidu Maps",
        content: "Google Maps is unreliable in China. Apple Maps actually works well because it uses Chinese map data. Baidu Maps is the most detailed but is entirely in Chinese. AutoNavi (Gaode Maps) is another Chinese option with some English support. Download offline maps of your destinations before arriving.",
      },
    ],
    tips: [
      "Download all apps and set up accounts before you leave — some require SMS verification",
      "Install Pleco's Chinese dictionary packages offline before your trip",
      "Baidu Maps has an English version but it's hidden in settings — look for 'International Mode'",
      "WeChat's 'Scan' feature can translate Chinese text in real-time",
      "Most Chinese apps require a phone number for registration — use your home number or get a Chinese SIM",
    ],
    affiliate: {
      text: "Stay connected with a China eSIM — download before you arrive",
      url: "/deals",
    },
  },

  language: {
    slug: "language",
    title: "Language Tips",
    subtitle: "Basic Chinese phrases and communication tools for travelers",
    desc: "You don't need to learn Chinese, but these phrases will make your trip much easier.",
    heroImage: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&h=400&fit=crop&auto=format",
    lastUpdated: "May 2025",
    sources: [
      { label: "Pleco Dictionary App", url: "https://www.pleco.com" },
      { label: "Google Translate Help", url: "https://support.google.com/translate" },
    ],
    seo: {
      title: "Basic Chinese Phrases for Travelers | China Language Guide",
      description: "Essential Chinese phrases for tourists visiting China. Learn key words for transportation, dining, shopping, and emergencies. Plus the best translation tools.",
      keywords: ["basic Chinese phrases", "China language guide", "Mandarin for travelers", "how to say in Chinese", "China translation tools"],
    },
    sections: [
      {
        title: "The Most Important Phrase",
        content: "A friendly '谢谢' (xiè xiè — sheh-sheh) goes a long way in China. Unlike some cultures, Chinese people appreciate any attempt to speak their language. Even mispronounced words are met with smiles and encouragement. Start with '你好' (nǐ hǎo — nee how) for hello and '再见' (zài jiàn — zye jyen) for goodbye.",
      },
      {
        title: "Essential Travel Phrases",
        content: "For restaurants: '买单' (mǎi dān — my dan) means 'check please'. For bargaining: '太贵了' (tài guì le — tye gway luh) means 'too expensive'. For directions: '在哪里?' (zài nǎ lǐ? — zye na lee) means 'where is it?' For help: '请问' (qǐng wèn — ching wenn) means 'excuse me, may I ask'. These five phrases will cover 80% of your interactions.",
      },
      {
        title: "Numbers & Money",
        content: "Chinese numbers are essential for shopping and negotiating. One to ten: yī (1), èr (2), sān (3), sì (4), wǔ (5), liù (6), qī (7), bā (8), jiǔ (9), shí (10). For prices, '多少钱?' (duō shǎo qián? — dwor shao chyen?) means 'how much money?'. Chinese people often use hand gestures for numbers — these are different from Western gestures and worth learning.",
      },
      {
        title: "Using Translation Apps",
        content: "Google Translate's camera mode is your best friend for reading menus, signs, and packaging. Point your phone at Chinese text and it translates in real-time. Microsoft Translator works without a VPN. Pleco is essential for understanding individual characters. For voice translation, say clearly and keep phrases short. When using apps, always verify important translations — especially for food allergies or medical needs.",
      },
      {
        title: "Non-Verbal Communication",
        content: "Much of Chinese communication is non-verbal. Nodding doesn't always mean agreement — it often means 'I hear you'. Avoid pointing with your finger; use an open hand instead. When someone pours you tea, tap the table twice with your fingers as a thank-you. Smiling is universal and will get you far. Chinese people are generally very patient with foreigners who try to communicate politely.",
      },
    ],
    tips: [
      "Download Pleco's dictionary offline before your trip",
      "Learn numbers 1-10 — they're used for everything from prices to subway lines",
      "Write down your hotel address in Chinese characters to show taxi drivers",
      "Chinese people use a nod that means 'I understand' not 'I agree'",
      "The Google Translate app's camera mode is invaluable for reading menus and signs",
    ],
  },

  safety: {
    slug: "safety",
    title: "Health & Safety",
    subtitle: "Visa requirements, insurance, emergency contacts, and staying safe",
    desc: "China is one of the safest travel destinations. Here's what you need to know.",
    heroImage: "https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?w=800&h=400&fit=crop&auto=format",
    lastUpdated: "May 2025",
    sources: [
      { label: "China Visa Service Center", url: "https://www.visaforchina.org" },
      { label: "World Nomads Insurance", url: "https://www.worldnomads.com" },
    ],
    seo: {
      title: "China Travel Safety Guide 2025 | Visas, Insurance & Emergency Info",
      description: "Complete safety guide for traveling in China. Visa requirements, travel insurance, emergency contacts, health tips, and staying safe as a foreign tourist.",
      keywords: ["China travel safety", "China visa requirements", "China travel insurance", "emergency numbers China", "is China safe for tourists"],
    },
    sections: [
      {
        title: "China Travel Visa",
        content: "Most nationalities need a visa to enter China. The most common is the L (Tourist) visa, valid for 30 days single or double entry. Apply at your nearest Chinese embassy or visa center at least 2-4 weeks before travel. Some cities offer 144-hour transit visa-free access — check if your itinerary qualifies. Requirements typically include: passport valid for 6+ months, completed application, hotel bookings, flight itinerary, and a recent photo. The process is straightforward but requires paperwork.",
      },
      {
        title: "Travel Insurance",
        content: "Travel insurance is strongly recommended for China. While China is safe, medical costs can be high for serious issues. Make sure your policy covers: medical evacuation (hospitals may require upfront payment), trip cancellation, lost luggage, and adventure activities if you plan to hike or ski. World Nomads and SafetyWing are popular choices among travelers to China. Keep a digital and physical copy of your insurance documents.",
      },
      {
        title: "Emergency Numbers",
        content: "Save these numbers before you go: Police — 110, Ambulance — 120, Fire — 119. For tourist-specific help, call the China National Tourist Hotline at 12301. Your embassy's emergency number is also essential — register with your embassy through their travel registration system before departure. Most embassy numbers are answered 24/7 for emergencies.",
      },
      {
        title: "Health Tips",
        content: "Tap water is NOT drinkable in China — always drink bottled or boiled water. Street food is generally safe, but stick to busy stalls with high turnover. Air pollution can be severe in northern cities (Beijing, Xi'an) — bring N95 masks if you're sensitive. Major cities have international hospitals with English-speaking staff. Bring any prescription medications in their original packaging with a doctor's note. Pharmacies are common but staff rarely speak English.",
      },
      {
        title: "General Safety",
        content: "China is one of the safest travel destinations in the world. Violent crime against tourists is extremely rare. The biggest risks are: pickpocketing in crowded tourist areas, taxi scams (use Didi instead), and food allergies (learn the Chinese word for your allergen). Women travelers generally feel safe, but standard precautions apply. China's public security is very visible with police and cameras everywhere, which contributes to the low crime rate.",
      },
    ],
    tips: [
      "Apply for your visa 4-6 weeks before travel — processing can take 2-3 weeks",
      "Take photos of your passport, visa, and insurance documents and store them in the cloud",
      "Carry a business card from your hotel in Chinese to show taxi drivers",
      "Register with your embassy's travel advisory service before departure",
      "Download the China Emergency app from your local embassy if available",
    ],
    affiliate: {
      text: "Compare travel insurance plans for China on SafetyWing",
      url: "/deals",
    },
  },
};

export const guideList = Object.values(guides).map((g) => ({
  title: g.title,
  slug: g.slug,
  desc: g.desc,
}));
