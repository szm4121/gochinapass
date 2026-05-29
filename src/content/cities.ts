export interface CityContent {
  name: string;
  slug: string;
  subtitle: string;
  desc: string;
  rating: string;
  emoji: string;
  color: string;
  heroImage: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  overview: string;
  highlights: { title: string; desc: string; emoji: string }[];
  itinerary3Days: { day: string; activities: string[] }[];
  itinerary5Days: { day: string; activities: string[] }[];
  food: { name: string; desc: string; emoji: string }[];
  transport: { mode: string; tip: string }[];
  affiliate: {
    hotel: { text: string; url: string };
    esim?: { text: string; url: string };
    tour?: { text: string; url: string };
  };
}

export const cities: Record<string, CityContent> = {
  beijing: {
    name: "Beijing",
    slug: "beijing",
    subtitle: "Capital of China — Where History Meets Modernity",
    desc: "Great Wall, Forbidden City, Hutongs",
    rating: "4.8",
    emoji: "🏛️",
    color: "from-[#ff6b4a]/20 to-[#ffb347]/10",
    heroImage: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200&h=600&fit=crop&auto=format",
    seo: {
      title: "Beijing Travel Guide 2025 | Great Wall, Forbidden City & More",
      description: "Complete Beijing travel guide for foreign tourists. Great Wall tours, Forbidden City tickets, best hotels, local food, and AI-powered itinerary planning.",
      keywords: ["Beijing travel guide", "Great Wall of China tour", "Forbidden City tickets", "Beijing hotels", "things to do in Beijing", "Beijing food guide"],
    },
    overview: "Beijing, China's sprawling capital, has history stretching back three millennia. From the magnificent Forbidden City to the awe-inspiring Great Wall, Beijing offers an unforgettable journey through China's imperial past. Modern skyscrapers, trendy art districts, and world-class dining make it a city of endless discovery.",
    highlights: [
      { title: "The Great Wall", desc: "Walk on the world's most famous wall at Mutianyu or Badaling sections.", emoji: "🏯" },
      { title: "Forbidden City", desc: "Explore the 600-year-old imperial palace with over 9,000 rooms.", emoji: "🏛️" },
      { title: "Temple of Heaven", desc: "Visit the iconic circular temple where emperors prayed for good harvest.", emoji: "⛩️" },
      { title: "Summer Palace", desc: "Stroll through the royal garden with Kunming Lake and Long Corridor.", emoji: "🌳" },
      { title: "Beijing Hutongs", desc: "Ride a rickshaw through centuries-old alleyways in the old city.", emoji: "🚲" },
    ],
    itinerary3Days: [
      { day: "Day 1 — Imperial Beijing", activities: ["Morning: Forbidden City (book tickets in advance)", "Lunch: Wangfujing Snack Street", "Afternoon: Jingshan Park for rooftop view", "Evening: Wangfujing Night Market"] },
      { day: "Day 2 — The Great Wall", activities: ["Full day: Great Wall at Mutianyu (less crowded)", "Lunch: Local farm restaurant near the wall", "Afternoon: Return to city, rest", "Evening: Beijing Duck at Quanjude or Da Dong"] },
      { day: "Day 3 — Culture & Modern Beijing", activities: ["Morning: Temple of Heaven + local park life", "Lunch: Beijing zhajiangmian (noodles)", "Afternoon: 798 Art District", "Evening: Houhai Lake bar street"] },
    ],
    itinerary5Days: [
      { day: "Day 1", activities: ["Forbidden City", "Jingshan Park", "Wangfujing Night Market"] },
      { day: "Day 2", activities: ["Great Wall at Mutianyu", "Beijing Duck dinner"] },
      { day: "Day 3", activities: ["Temple of Heaven", "798 Art District", "Houhai Lake"] },
      { day: "Day 4", activities: ["Summer Palace", "Beijing Zoo (pandas!)", "Ghost Street for dinner"] },
      { day: "Day 5", activities: ["Hutong rickshaw tour", "Bell & Drum Towers", "Departure"] },
    ],
    food: [
      { name: "Peking Duck", desc: "Crispy skin, tender meat, wrapped in thin pancakes.", emoji: "🦆" },
      { name: "Zhajiangmian", desc: "Beijing-style noodles with fermented soybean paste.", emoji: "🍜" },
      { name: "Jianbing", desc: "Savory Chinese crepe — the ultimate street breakfast.", emoji: "🥞" },
      { name: "Hot Pot", desc: "Beijing-style copper pot hot pot, especially in winter.", emoji: "🍲" },
    ],
    transport: [
      { mode: "Subway", tip: "Beijing subway is cheap ($0.50/ride) and covers all major attractions. Get a Yikatong card at any station." },
      { mode: "Didi (Uber)", tip: "Download Didi app in English. Much cheaper than taxis. Enter destination in Chinese for best results." },
      { mode: "High-speed rail", tip: "Beijing has two major stations: Beijing South (high-speed) and Beijing West. Book via Trip.com." },
    ],
    affiliate: {
      hotel: { text: "Search hotels in Beijing", url: "https://www.booking.com/city/cn/beijing.html" },
      esim: { text: "Get Airalo eSIM for China", url: "https://www.airalo.com/china-esim" },
      tour: { text: "Book a Beijing tour", url: "https://www.getyourguide.com/beijing-l169/" },
    },
  },

  shanghai: {
    name: "Shanghai",
    slug: "shanghai",
    subtitle: "China's Vibrant Mega-City — East Meets West",
    desc: "Bund, Disneyland, French Concession",
    rating: "4.7",
    emoji: "🌃",
    color: "from-[#48cae4]/20 to-[#00b4d8]/10",
    heroImage: "https://images.unsplash.com/photo-1537531383492-f81478b1d7a8?w=1200&h=600&fit=crop&auto=format",
    seo: {
      title: "Shanghai Travel Guide 2025 | Bund, Disneyland & Local Tips",
      description: "Plan your Shanghai trip with our complete guide. Best attractions, hotel deals, food recommendations, and AI-generated itineraries.",
      keywords: ["Shanghai travel guide", "Shanghai attractions", "Bund Shanghai", "Shanghai Disneyland", "Shanghai hotels", "Shanghai food guide"],
    },
    overview: "Shanghai dazzles with its stunning skyline, historic Bund waterfront, and vibrant food scene. As China's most international city, it offers a perfect blend of East and West — from French colonial architecture to futuristic skyscrapers.",
    highlights: [
      { title: "The Bund", desc: "Walk along the Huangpu River and admire the colonial architecture.", emoji: "🌃" },
      { title: "Shanghai Disneyland", desc: "The only Disney park in mainland China with unique attractions.", emoji: "🏰" },
      { title: "Yu Garden", desc: "A classical Ming Dynasty garden in the heart of the old city.", emoji: "🌿" },
      { title: "French Concession", desc: "Tree-lined streets, boutique shops, and sidewalk cafés.", emoji: "🌳" },
      { title: "Shanghai Tower", desc: "China's tallest building with observation deck on floor 118.", emoji: "🏢" },
    ],
    itinerary3Days: [
      { day: "Day 1 — Iconic Shanghai", activities: ["Morning: The Bund + Huangpu River cruise", "Lunch: Yu Garden + dumplings at Din Tai Fung", "Afternoon: City God Temple + Old Street", "Evening: Lujiazui skyline夜景"] },
      { day: "Day 2 — Culture & Food", activities: ["Morning: French Concession walk", "Lunch: Local xiaolongbao (soup dumplings)", "Afternoon: Shanghai Museum", "Evening: Acrobatics show"] },
      { day: "Day 3 — Modern Shanghai", activities: ["Morning: Shanghai Tower observation deck", "Lunch: Nanjing Road shopping", "Afternoon: Tianzifang art district", "Evening: Huangpu River night cruise"] },
    ],
    itinerary5Days: [
      { day: "Day 1", activities: ["The Bund", "Yu Garden", "Old City God Temple"] },
      { day: "Day 2", activities: ["Shanghai Disneyland (full day)"] },
      { day: "Day 3", activities: ["Shanghai Tower", "Nanjing Road", "Huangpu night cruise"] },
      { day: "Day 4", activities: ["French Concession", "Shanghai Museum", "Tianzifang"] },
      { day: "Day 5", activities: ["Zhujiajiao Water Town", "Departure"] },
    ],
    food: [
      { name: "Xiaolongbao", desc: "Soup dumplings — Shanghai's signature dish.", emoji: "🥟" },
      { name: "Shengjianbao", desc: "Pan-fried pork buns with crispy bottom.", emoji: "🥟" },
      { name: "Shanghai-style noodles", desc: "Thick noodles with scallion oil and soy sauce.", emoji: "🍜" },
      { name: "Red-braised pork", desc: "Hongshaorou — melt-in-your-mouth pork belly.", emoji: "🍖" },
    ],
    transport: [
      { mode: "Subway", tip: "Shanghai metro is the best way to get around. 18 lines cover the whole city. Use Alipay or buy a Shanghai Public Transportation Card." },
      { mode: "Maglev Train", tip: "Shanghai Maglev reaches 431 km/h — the fastest train in the world. Connects Pudong Airport to Longyang Road station." },
      { mode: "Didi", tip: "Very affordable in Shanghai. A 15-minute ride costs around $3-5." },
    ],
    affiliate: {
      hotel: { text: "Search hotels in Shanghai", url: "https://www.booking.com/city/cn/shanghai.html" },
      esim: { text: "Get Airalo eSIM for China", url: "https://www.airalo.com/china-esim" },
    },
  },

  chengdu: {
    name: "Chengdu",
    slug: "chengdu",
    subtitle: "Home of Pandas, Hot Pot, and Sichuan Culture",
    desc: "Pandas, Hot Pot, Sichuan Opera",
    rating: "4.6",
    emoji: "🐼",
    color: "from-[#51cf66]/20 to-[#48cae4]/10",
    heroImage: "https://images.unsplash.com/photo-1590736969955-71cc94901146?w=1200&h=600&fit=crop&auto=format",
    seo: {
      title: "Chengdu Travel Guide | Pandas, Hot Pot & Sichuan Adventures",
      description: "Plan your Chengdu trip — panda base tickets, best hot pot restaurants, Sichuan Opera, and AI itinerary planner.",
      keywords: ["Chengdu travel guide", "Chengdu panda base", "Sichuan hot pot", "Chengdu itinerary", "Sichuan travel"],
    },
    overview: "Chengdu, the capital of Sichuan province, is famous for giant pandas, fiery hot pot, and laid-back teahouse culture. It's the gateway to China's wild southwest and a city that perfectly balances tradition and modernity.",
    highlights: [
      { title: "Panda Base", desc: "See giant pandas up close at the Chengdu Research Base.", emoji: "🐼" },
      { title: "Sichuan Hot Pot", desc: "Experience the numbing spice of authentic Sichuan hot pot.", emoji: "🍲" },
      { title: "Sichuan Opera", desc: "Watch face-changing performances — a unique Sichuan tradition.", emoji: "🎭" },
      { title: "Jinli Ancient Street", desc: "Traditional street with snacks, crafts, and souvenirs.", emoji: "🏮" },
      { title: "Mount Qingcheng", desc: "Taoist mountain retreat, a day trip from Chengdu.", emoji: "⛰️" },
    ],
    itinerary3Days: [
      { day: "Day 1 — Pandas & Parks", activities: ["Morning: Panda Base (go early!)", "Lunch: Local noodle shop", "Afternoon: People's Park + tea house", "Evening: Sichuan hot pot dinner"] },
      { day: "Day 2 — Culture", activities: ["Morning: Wuhou Shrine (Three Kingdoms history)", "Lunch: Jinli Street snacks", "Afternoon: Du Fu Thatched Cottage", "Evening: Sichuan Opera show"] },
      { day: "Day 3 — Day Trip", activities: ["Full day: Mount Qingcheng + Dujiangyan Irrigation System", "Evening: Return to Chengdu, farewell dinner"] },
    ],
    itinerary5Days: [
      { day: "Day 1", activities: ["Panda Base", "People's Park", "Hot pot dinner"] },
      { day: "Day 2", activities: ["Wuhou Shrine", "Jinli Street", "Sichuan Opera"] },
      { day: "Day 3", activities: ["Mount Qingcheng", "Dujiangyan"] },
      { day: "Day 4", activities: ["Leshan Giant Buddha (day trip)", "Return for tea time"] },
      { day: "Day 5", activities: ["Chengdu Museum", "Shopping", "Departure"] },
    ],
    food: [
      { name: "Sichuan Hot Pot", desc: "Numbing and spicy — a must-try experience.", emoji: "🍲" },
      { name: "Mapo Tofu", desc: "Silken tofu in spicy chili and bean sauce.", emoji: "🫘" },
      { name: "Kung Pao Chicken", desc: "Originated in Sichuan — spicy and nutty.", emoji: "🍗" },
      { name: "Dan Dan Noodles", desc: "Spicy sesame noodles, true street food classic.", emoji: "🍜" },
    ],
    transport: [
      { mode: "Subway", tip: "Chengdu metro has 6 lines covering the city center and panda base." },
      { mode: "High-speed rail", tip: "Chengdu East station connects to Xi'an (3.5h), Beijing (7h), and Shanghai (11h)." },
      { mode: "Bus", tip: "Buses to Panda Base depart from downtown. Take metro line 3 to Panda Avenue station." },
    ],
    affiliate: {
      hotel: { text: "Search hotels in Chengdu", url: "https://www.booking.com/city/cn/chengdu.html" },
      tour: { text: "Book a Chengdu tour", url: "https://www.getyourguide.com/chengdu-l165/" },
    },
  },

  xian: {
    name: "Xi'an",
    slug: "xian",
    subtitle: "Ancient Capital — Home of the Terracotta Warriors",
    desc: "Terracotta Warriors, Ancient City Wall",
    rating: "4.7",
    emoji: "🏺",
    color: "from-[#ffb347]/20 to-[#ff6b4a]/10",
    heroImage: "https://images.unsplash.com/photo-1590419684242-09ba3f5d8d8e?w=1200&h=600&fit=crop&auto=format",
    seo: {
      title: "Xi'an Travel Guide | Terracotta Warriors & Ancient China",
      description: "Complete Xi'an travel guide — Terracotta Army tickets, city wall bike rental, Muslim Quarter food, and AI itineraries.",
      keywords: ["Xi'an travel guide", "Terracotta Warriors", "Xi'an attractions", "Xi'an city wall", "Xi'an Muslim Quarter"],
    },
    overview: "Xi'an, one of China's oldest cities, was the starting point of the Silk Road and home to the legendary Terracotta Army. With its perfectly preserved city wall and vibrant Muslim Quarter, Xi'an offers a journey back in time.",
    highlights: [
      { title: "Terracotta Warriors", desc: "Thousands of life-sized warriors guarding China's first emperor.", emoji: "🏺" },
      { title: "Ancient City Wall", desc: "Ride a bike on the best-preserved city wall in China.", emoji: "🚲" },
      { title: "Muslim Quarter", desc: "Lively food street with Muslim-Chinese cuisine.", emoji: "🌙" },
      { title: "Big Wild Goose Pagoda", desc: "Buddhist pagoda with nightly musical fountain show.", emoji: "🛕" },
      { title: "Shaanxi History Museum", desc: "World-class museum free with reservation.", emoji: "🏛️" },
    ],
    itinerary3Days: [
      { day: "Day 1 — Ancient Wonders", activities: ["Morning: Terracotta Warriors (1h bus ride)", "Lunch: Local restaurant near the site", "Afternoon: Return to city, rest", "Evening: Muslim Quarter food crawl"] },
      { day: "Day 2 — City Wall & Culture", activities: ["Morning: Bike ride on Ancient City Wall", "Lunch: Liangpi (cold noodles) in Muslim Quarter", "Afternoon: Shaanxi History Museum", "Evening: Big Wild Goose Pagoda + fountain show"] },
      { day: "Day 3 — History & Departure", activities: ["Morning: Small Wild Goose Pagoda", "Lunch: Local dumpling banquet", "Afternoon: Calligraphy Street", "Departure"] },
    ],
    itinerary5Days: [
      { day: "Day 1", activities: ["Terracotta Warriors", "Muslim Quarter"] },
      { day: "Day 2", activities: ["City Wall bike ride", "Shaanxi Museum", "Goose Pagoda"] },
      { day: "Day 3", activities: ["Huashan Mountain day hike"] },
      { day: "Day 4", activities: ["Daming Palace", "Tang Bo Art Street"] },
      { day: "Day 5", activities: ["Calligraphy Street", "Departure"] },
    ],
    food: [
      { name: "Yangrou Paomo", desc: "Lamb soup with shredded flatbread — Xi'an's signature.", emoji: "🍲" },
      { name: "Biang Biang Noodles", desc: "Wide hand-pulled noodles with chili oil.", emoji: "🍜" },
      { name: "Liangpi", desc: "Cold noodles in spicy sauce, perfect for summer.", emoji: "🥗" },
      { name: "Persimmon Cake", desc: "Sweet snack unique to Xi'an.", emoji: "🫓" },
    ],
    transport: [
      { mode: "Subway", tip: "Xi'an metro has 4 lines, covering the city wall area, train station, and Muslim Quarter." },
      { mode: "Bus 306/914", tip: "Take bus 306 from Xi'an Railway Station to Terracotta Warriors (1h, $2)." },
      { mode: "High-speed rail", tip: "Xi'an North station connects to Beijing (4.5h), Chengdu (3.5h), and Shanghai (6h)." },
    ],
    affiliate: {
      hotel: { text: "Search hotels in Xi'an", url: "https://www.booking.com/city/cn/xian.html" },
      tour: { text: "Book a Xi'an tour", url: "https://www.getyourguide.com/xi-an-l168/" },
    },
  },

  guangzhou: {
    name: "Guangzhou",
    slug: "guangzhou",
    subtitle: "Canton's Heart — Dim Sum & Modern Skyscrapers",
    desc: "Canton Tower, Dim Sum, Shamian Island",
    rating: "4.4",
    emoji: "🥟",
    color: "from-[#ff6b6b]/20 to-[#ffb347]/10",
    heroImage: "https://images.unsplash.com/photo-1537531383492-f81478b1d7a8?w=1200&h=600&fit=crop&auto=format",
    seo: {
      title: "Guangzhou Travel Guide | Dim Sum, Canton Tower & Pearl River",
      description: "Plan your Guangzhou trip — best dim sum restaurants, Canton Tower tickets, Shamian Island walking tour, and AI itinerary.",
      keywords: ["Guangzhou travel guide", "Canton Tower", "Guangzhou dim sum", "Shamian Island", "Guangzhou attractions"],
    },
    overview: "Guangzhou is the culinary capital of China. As the birthplace of dim sum and Cantonese cuisine, it's a paradise for food lovers. Modern skyscrapers, historic temples, and the scenic Pearl River make it a fascinating destination.",
    highlights: [
      { title: "Canton Tower", desc: "The tallest TV tower in the world with a transparent skywalk.", emoji: "🗼" },
      { title: "Dim Sum", desc: "The birthplace of dim sum — try it at a traditional teahouse.", emoji: "🥟" },
      { title: "Shamian Island", desc: "Colonial-era island with tree-lined streets and European architecture.", emoji: "🏝️" },
      { title: "Canton Fair", desc: "China's largest trade fair (held twice yearly).", emoji: "🏢" },
      { title: "Pearl River Cruise", desc: "Night cruise to see Guangzhou's illuminated skyline.", emoji: "🚢" },
    ],
    itinerary3Days: [
      { day: "Day 1 — City Highlights", activities: ["Morning: Chen Clan Ancestral Hall", "Lunch: Traditional dim sum at Guangzhou Restaurant", "Afternoon: Shamian Island walk", "Evening: Canton Tower + Pearl River night cruise"] },
      { day: "Day 2 — Culture & Shopping", activities: ["Morning: Yuexiu Park + Five Rams Statue", "Lunch: Wonton noodles", "Afternoon: Beijing Road shopping", "Evening: Shangxiajiu Pedestrian Street"] },
      { day: "Day 3 — Food & Departure", activities: ["Morning: Qingping Market", "Lunch: Roast goose at a local restaurant", "Afternoon: Departure"] },
    ],
    itinerary5Days: [
      { day: "Day 1", activities: ["Chen Clan Hall", "Shamian Island", "Canton Tower"] },
      { day: "Day 2", activities: ["Yuexiu Park", "Beijing Road", "Pearl River cruise"] },
      { day: "Day 3", activities: ["Shenzhen day trip (30min train)"] },
      { day: "Day 4", activities: ["Baiyun Mountain hike", "Local food tour"] },
      { day: "Day 5", activities: ["Shopping", "Departure"] },
    ],
    food: [
      { name: "Dim Sum", desc: "Har gow (shrimp dumplings), siu mai, char siu bao.", emoji: "🥟" },
      { name: "Wonton Noodles", desc: "Thin egg noodles with shrimp wontons in broth.", emoji: "🍜" },
      { name: "Roast Goose", desc: "Cantonese roast goose with crispy skin.", emoji: "🦆" },
      { name: "White Cut Chicken", desc: "Simple boiled chicken with ginger-scallion oil.", emoji: "🍗" },
    ],
    transport: [
      { mode: "Subway", tip: "16 metro lines cover the city. Very affordable at $0.50-1 per ride." },
      { mode: "High-speed rail", tip: "Guangzhou South to Shenzhen (30min), Hong Kong (50min), Beijing (8h)." },
      { mode: "Ferry", tip: "Pearl River ferries connect both sides of the city. Cheap and scenic." },
    ],
    affiliate: {
      hotel: { text: "Search hotels in Guangzhou", url: "https://www.booking.com/city/cn/guangzhou.html" },
      esim: { text: "Get Airalo eSIM for China", url: "https://www.airalo.com/china-esim" },
    },
  },

  guilin: {
    name: "Guilin",
    slug: "guilin",
    subtitle: "China's Most Scenic Destination — Karst Mountains & Li River",
    desc: "Li River, Karst Mountains, Rice Terraces",
    rating: "4.5",
    emoji: "🏔️",
    color: "from-[#00b4d8]/20 to-[#51cf66]/10",
    heroImage: "https://images.unsplash.com/photo-1529921876812-e58150e4f0b6?w=1200&h=600&fit=crop&auto=format",
    seo: {
      title: "Guilin Travel Guide | Li River Cruise, Yangshuo & Rice Terraces",
      description: "Plan your Guilin trip — Li River cruise, Yangshuo adventures, Longji Rice Terraces, and AI itinerary planner.",
      keywords: ["Guilin travel guide", "Li River cruise", "Yangshuo", "Longji Rice Terraces", "Guilin attractions"],
    },
    overview: "Guilin's dramatic limestone karst landscape has inspired Chinese poets and painters for centuries. A Li River cruise from Guilin to Yangshuo is one of China's most scenic experiences. Outdoor lovers will find hiking, cycling, and rock climbing.",
    highlights: [
      { title: "Li River Cruise", desc: "4-hour cruise through stunning karst scenery to Yangshuo.", emoji: "🚢" },
      { title: "Yangshuo", desc: "Explore the countryside by bike or bamboo raft.", emoji: "🚲" },
      { title: "Longji Rice Terraces", desc: "Dragon's Backbone — spectacular terraced fields.", emoji: "🌾" },
      { title: "Reed Flute Cave", desc: "Limestone cave with colorful lighting.", emoji: "🕳️" },
      { title: "Elephant Trunk Hill", desc: "Guilin's iconic landmark shaped like an elephant drinking water.", emoji: "🐘" },
    ],
    itinerary3Days: [
      { day: "Day 1 — Guilin City", activities: ["Morning: Elephant Trunk Hill + Seven Star Park", "Lunch: Guilin rice noodles (local specialty)", "Afternoon: Reed Flute Cave", "Evening: Walking along Two Rivers & Four Lakes"] },
      { day: "Day 2 — Li River Cruise", activities: ["Full day: Li River cruise to Yangshuo (4h)", "Lunch: On the boat or in Yangshuo", "Afternoon: Explore Yangshuo West Street", "Evening: Impression Liu Sanjie light show"] },
      { day: "Day 3 — Yangshuo Adventure", activities: ["Morning: Bike ride through Yangshuo countryside", "Lunch: Local farmhouse restaurant", "Afternoon: Bamboo rafting on Yulong River", "Departure"] },
    ],
    itinerary5Days: [
      { day: "Day 1", activities: ["Guilin city", "Elephant Trunk Hill", "Reed Flute Cave"] },
      { day: "Day 2", activities: ["Li River cruise", "Yangshuo arrival"] },
      { day: "Day 3", activities: ["Yangshuo cycling", "Bamboo rafting"] },
      { day: "Day 4", activities: ["Longji Rice Terraces day trip"] },
      { day: "Day 5", activities: ["Return to Guilin", "Departure"] },
    ],
    food: [
      { name: "Guilin Rice Noodles", desc: "The city's signature — rice noodles in bone broth.", emoji: "🍜" },
      { name: "Beer Fish", desc: "Yangshuo specialty — fish cooked with local beer.", emoji: "🐟" },
      { name: "Stuffed Li River Snails", desc: "Snails stuffed with minced pork and herbs.", emoji: "🐌" },
      { name: "Water Chestnut Cake", desc: "Sweet dessert made from local water chestnuts.", emoji: "🍰" },
    ],
    transport: [
      { mode: "High-speed rail", tip: "Guilin station connects to Beijing (9h), Shanghai (8h), and Guangzhou (2.5h)." },
      { mode: "Bus", tip: "Buses from Guilin to Yangshuo run every 20 minutes ($5, 1.5h)." },
      { mode: "Bicycle", tip: "Rent a bike in Yangshuo for $3/day — the best way to explore the countryside." },
    ],
    affiliate: {
      hotel: { text: "Search hotels in Guilin", url: "https://www.booking.com/city/cn/guilin.html" },
      tour: { text: "Book a Guilin tour", url: "https://www.getyourguide.com/guilinshi-l2010/" },
    },
  },
};
