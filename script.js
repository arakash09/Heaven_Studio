const { useState, useEffect, useRef, useMemo, useCallback } = React;

      /* =====================================================================
         SECTION 3: STUDIO DATA, IMAGES & CONSTANTS (CUSTOMIZE CONTENT HERE)
      ===================================================================== */

      // High-resolution vector fallbacks if local images (logo.jpg, Akash.jpg, sketch.png) are in different folders
      const LOGO_FALLBACK_SVG =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
            <rect width="400" height="400" fill="#ffffff"/>
            <rect x="80" y="80" width="240" height="240" fill="#000000"/>
            <path d="M 75 75 L 202 325" stroke="#ffffff" stroke-width="26" stroke-linecap="butt"/>
            <path d="M 200 325 A 125 125 0 0 1 325 200" stroke="#ffffff" stroke-width="26" fill="none" stroke-linecap="butt"/>
          </svg>
        `);

      const AKASH_FALLBACK_SVG =
        "data:image/svg+xml;utf8," +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750">
            <defs>
              <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#14171d"/>
                <stop offset="100%" stop-color="#08090b"/>
              </linearGradient>
            </defs>
            <rect width="600" height="750" fill="url(#bg)"/>
            <circle cx="300" cy="310" r="210" fill="none" stroke="#c9a05a" stroke-width="2" stroke-dasharray="8 8" opacity="0.4"/>
            <circle cx="300" cy="240" r="78" fill="#c9a05a" opacity="0.2"/>
            <path d="M165 520 C165 405 435 405 435 520 Z" fill="#f4f0e8" opacity="0.9"/>
            <text x="300" y="610" text-anchor="middle" fill="#e8cc92" font-family="Georgia, serif" font-size="28">Architect Atikur Rahman (Akash)</text>
            <text x="300" y="648" text-anchor="middle" fill="#8b8f98" font-family="monospace" font-size="14" letter-spacing="4">FOUNDER · HEAVEN STUDIO</text>
          </svg>
        `);

      // Architectural Pencil Sketch SVG Fallback (if public/images/sketch.png isn't found)
      const SKETCH_FALLBACK_URL =
        "https://images.pexels.com/photos/34378030/pexels-photo-34378030.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";
      const RENDER_FALLBACK_URL =
        "https://images.pexels.com/photos/34378030/pexels-photo-34378030.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200";

      const STUDIO = {
        name: "Heaven Studio",
        nameBn: "হেভেন স্টুডিও",
        tagline: "Architecture · Structure · Interior · Engineering · Visualization",
        taglineBn: "স্থাপত্য · স্ট্রাকচার · ইন্টেরিয়র · ইঞ্জিনিয়ারিং · থ্রিডি ভিজ্যুয়ালাইজেশন",
        city: "Dhaka, Bangladesh",
        whatsappLocal: "01511280698",
        whatsappIntl: "8801511280698",
        email: "heavenarchitectsstudio@gmail.com",
        hours: "Sat – Thu · 9:00 AM – 9:00 PM (BST)",
        youtube: "https://youtube.com/@heavenarchitects",
        youtubeChannelId: "UCpnU9f5UwOw8Jfa9iEKlqBQ",
        youtubeHandle: "@heavenarchitects",
        facebook: "https://www.facebook.com/heavenarchitectsstudio",
        facebookPage: "heavenarchitectsstudio",
        instagram: "https://www.instagram.com/heavenarchitectsstudio",
        x: "https://x.com/heavenarchitect",
        linkedin: "https://www.linkedin.com/company/heavenarchitectsstudio",
        pinterest: "https://www.pinterest.com/heavenarchitectsstudio",
        tiktok: "https://www.tiktok.com/@heavenarchitects",
        mapEmbed:
          "https://www.openstreetmap.org/export/embed.html?bbox=90.3742%2C23.7286%2C90.4402%2C23.8050&layer=mapnik&marker=23.7668%2C90.4072",
        mapLink: "https://www.google.com/maps/search/?api=1&query=Dhaka%2C+Bangladesh",
      };

      const FOUNDER = {
        name: "Architect Atikur Rahman (Akash)",
        nameBn: "আর্কিটেক্ট আতিকুর রহমান (আকাশ)",
        role: "Founder & Principal Architect",
        roleBn: "প্রতিষ্ঠাতা ও প্রধান স্থপতি, হেভেন স্টুডিও",
        image: "Akash.jpg",
        bio: "Leading Heaven Studio with a vision to make climate-responsive, structurally sound, and aesthetically timeless architecture accessible to every homeowner across all 64 districts of Bangladesh. Every project at Heaven Studio is personally reviewed by Architect Atikur Rahman (Akash) to ensure spatial harmony, BNBC code compliance, and honest site execution.",
        quote:
          "“A home is not merely concrete and brick — it is a family’s lifelong dream drafted with proportion, daylight, and engineering integrity.”",
      };

      const waLink = (text = "Hello Heaven Studio, I would like a design consultation.") =>
        `https://wa.me/${STUDIO.whatsappIntl}?text=${encodeURIComponent(text)}`;

      const NAV = [
        { id: "home", label: "Home", num: "01" },
        { id: "about", label: "About us", num: "02" },
        { id: "services", label: "Services", num: "03", hasDropdown: true },
        { id: "projects", label: "Projects", num: "04", hasDropdown: true },
        { id: "feed", label: "Live social feed", num: "05" },
        { id: "contact", label: "Contact", num: "06" },
      ];

      const SERVICES = [
        {
          emoji: "🏛️",
          title: "Architectural Design",
          titleBn: "আর্কিটেকচারাল ডিজাইন",
          code: "ARC",
          desc: "Concept to working drawing — space planning, façade language, ventilation, daylight and by-laws compliant plans for homes, apartments, commercial and industrial buildings.",
          points: ["Concept & mood boards", "Floor plans, elevations, sections", "Site & setback analysis", "Working drawing set"],
        },
        {
          emoji: "🏗️",
          title: "Structural Design",
          titleBn: "স্ট্রাকচারাল ডিজাইন",
          code: "STR",
          desc: "BNBC / BDS code compliant RCC & steel structure designed by experienced engineers for seismic zone-2 wind loads, with bar bending schedules and safe economical detailing.",
          points: ["Foundation & column layout", "Beam, slab, stair detailing", "BBS & bar cutting list", "Load & stability calculation"],
        },
        {
          emoji: "⚡",
          title: "Electrical Design",
          titleBn: "ইলেকট্রিক্যাল ডিজাইন",
          code: "ELE",
          desc: "Complete single line diagram, load calculation, wiring layout, earthing, lightning protection and DB schedule for safe, future-ready power distribution.",
          points: ["Load calculation & SLD", "Wiring & lighting layout", "Earthing & LPS design", "DB schedule & BOQ"],
        },
        {
          emoji: "🚰",
          title: "Plumbing & Sanitary Design",
          titleBn: "প্লাম্বিং ও স্যানিটারি ডিজাইন",
          code: "PLB",
          desc: "Water supply, drainage, rainwater and sewerage systems laid out with correct slope, trap and vent logic — plus water tank, pump and septic planning.",
          points: ["Water supply scheme", "Drainage & soil line layout", "RWH & septic tank design", "Fixture BOQ"],
        },
        {
          emoji: "🧯",
          title: "Fire Safety Design",
          titleBn: "ফায়ার সেফটি ডিজাইন",
          code: "FIR",
          desc: "Fire detection, alarm, hydrant, sprinkler, escape route and compartmentation drawings prepared to meet RAJUK & Bangladesh Fire Service requirements.",
          points: ["Escape & smoke management", "Detector & alarm layout", "Hydrant / sprinkler system", "Fire license drawing set"],
        },
        {
          emoji: "🎬",
          title: "3D Visualization & Animation",
          titleBn: "থ্রিডি ভিজ্যুয়ালাইজেশন ও অ্যানিমেশন",
          code: "3DX",
          desc: "Photoreal exterior & interior rendering, drone-matched composites, walkthrough animation and VR-ready scenes so you see the building before a single brick is cast.",
          points: ["Exterior / interior stills", "Cinematic walkthrough film", "Day & night lighting study", "360° VR panorama"],
        },
        {
          emoji: "🛋️",
          title: "Interior & Exterior Design",
          titleBn: "ইন্টেরিয়র ও এক্সটেরিয়র ডিজাইন",
          code: "INT",
          desc: "Material board, false ceiling, lighting scene, custom furniture and turnkey execution drawings for apartments, offices, showrooms and restaurants.",
          points: ["3D interior views", "False ceiling & lighting", "Material & furniture BOQ", "Site supervision"],
        },
        {
          emoji: "🌿",
          title: "Landscape Design",
          titleBn: "ল্যান্ডস্কেপ ডিজাইন",
          code: "LND",
          desc: "Roof garden, courtyard, lawn and hardscape design with irrigation, drainage and plant scheduling tuned for the Bangladeshi climate.",
          points: ["Master landscape plan", "Roof garden detailing", "Planting & irrigation plan", "Hardscape material palette"],
        },
        {
          emoji: "📋",
          title: "RAJUK Drawing & Approval Support",
          titleBn: "রাজউক ড্রয়িং ও অনুমোদন সহায়তা",
          code: "RAJ",
          desc: "Full RAJUK (and CDA / KDA / local authority) submission set — land use, authorized plan, soil report annexure, structural certificate — prepared and followed up for you.",
          points: ["Land use & clearance docs", "Submission drawing set", "Owner affidavit support", "Follow-up until approval"],
        },
        {
          emoji: "🪨",
          title: "Soil Test & Site Survey",
          titleBn: "সয়েল টেস্ট ও সাইট সার্ভে",
          code: "SOI",
          desc: "Boring, SPT, triaxial and proctor testing with signed engineer-stamped report, plus contour & total-station survey to lock your foundation design on facts.",
          points: ["SPT / boring test", "Bearing capacity report", "Contour & layout survey", "Report stamped by engineer"],
        },
        {
          emoji: "👷",
          title: "Construction Consultation & Supervision",
          titleBn: "কনস্ট্রাকশন কনসালটেশন ও সুপারভিশন",
          code: "CON",
          desc: "Realistic estimate, vendor & material specification, stage-wise inspection, quality photo reports and handover documentation — budget under control, quality on record.",
          points: ["Detailed cost estimate", "Stage-wise site visit", "Quality & safety audit", "As-built & handover docs"],
        },
      ];

      const P = (id) =>
        `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200`;

      const ONGOING = [
        {
          name: "Heaven Villa — Classical Duplex",
          nameBn: "হেভেন ভিলা — ক্লাসিক্যাল ডুপ্লেক্স",
          location: "Uttara Sector 12, Dhaka",
          type: "Residential · 5 Bed Duplex",
          area: "4,850 sft",
          year: "2026",
          image: P(34378030),
          tags: ["Architecture", "Structure", "Interior"],
          progress: 72,
        },
        {
          name: "Green Crest Apartment Block",
          nameBn: "গ্রিন ক্রেস্ট অ্যাপার্টমেন্ট",
          location: "Bashundhara R/A, Dhaka",
          type: "Residential · G+7",
          area: "11,200 sft",
          year: "2026",
          image: P(10135453),
          tags: ["RAJUK", "Structure", "Fire Safety"],
          progress: 45,
        },
        {
          name: "Tin Shed Rural Home Series",
          nameBn: "আধুনিক টিনশেড বাড়ির ডিজাইন",
          location: "Manikganj",
          type: "Affordable Housing · 4 Bed",
          area: "1,320 sft",
          year: "2026",
          image: P(740587),
          tags: ["Low cost", "3D Animation"],
          progress: 88,
        },
        {
          name: "Aurora Corporate Interior",
          nameBn: "অরোরা কর্পোরেট ইন্টেরিয়র",
          location: "Gulshan Avenue, Dhaka",
          type: "Office Interior · 2 Floors",
          area: "6,400 sft",
          year: "2026",
          image: P(12441654),
          tags: ["Interior", "Electrical", "HVAC"],
          progress: 34,
        },
      ];

      const DELIVERED = [
        {
          name: "Skyline Courtyard House",
          location: "Dhanmondi, Dhaka",
          type: "Residential Duplex",
          area: "3,900 sft",
          year: "2025",
          image: P(8134750),
          tags: ["Architecture", "Landscape"],
        },
        {
          name: "White Canvas Residence",
          location: "Purbachal, Dhaka",
          type: "Private Villa",
          area: "5,600 sft",
          year: "2025",
          image: P(10610733),
          tags: ["Architecture", "3D", "RAJUK"],
        },
        {
          name: "Terrace House Marbella Style",
          location: "Chattogram",
          type: "Residential · G+4",
          area: "7,150 sft",
          year: "2024",
          image: P(34188660),
          tags: ["Structure", "Supervision"],
        },
        {
          name: "Lagoon Edge Villa",
          location: "Cox's Bazar",
          type: "Resort Villa",
          area: "2,780 sft",
          year: "2024",
          image: P(16573669),
          tags: ["Architecture", "Landscape", "3D"],
        },
        {
          name: "Hillside Retreat",
          location: "Sajek, Rangamati",
          type: "Boutique Resort",
          area: "9,300 sft",
          year: "2024",
          image: P(7031606),
          tags: ["Architecture", "Soil Test"],
        },
        {
          name: "Gallery Loft Interior",
          location: "Banani, Dhaka",
          type: "Apartment Interior",
          area: "2,250 sft",
          year: "2023",
          image: P(8134752),
          tags: ["Interior", "Furniture"],
        },
      ];

      const STATS = [
        { value: "1,140+", label: "Design IDs delivered" },
        { value: "12 yrs", label: "Studio practice" },
        { value: "64", label: "Districts served" },
        { value: "4.9 ★", label: "Client rating" },
      ];

      const PROCESS = [
        {
          n: "01",
          t: "Consult & Brief",
          d: "Free WhatsApp / call consultation — plot size, facing, budget, family needs and dream references.",
        },
        {
          n: "02",
          t: "Concept & Plan",
          d: "Multiple floor plan options with area statement, setback check and cost indication.",
        },
        {
          n: "03",
          t: "3D & Approval",
          d: "Photoreal 3D views + walkthrough, then RAJUK / authority drawing set and submission.",
        },
        {
          n: "04",
          t: "Build & Handover",
          d: "Structural & MEP detail, estimate, stage-wise supervision until keys are in your hand.",
        },
      ];

      const YT_SEED = [
        {
          id: "C91fcIvX64o",
          title: "রাজকীয় ডুপ্লেক্স বাড়ির ডিজাইন | 5 Bedroom Classical Duplex House | Heaven STUDIO | ID_1143",
          date: "2026-10-21T08:34:48+00:00",
          views: 1240,
        },
        {
          id: "kW_AWMrwCvU",
          title: "কম খরচে ৪ বেডরুমের সুন্দর টিনশেড বাড়ি | 4 Bedroom Tin Shed House Design | Heaven STUDIO | ID_1141",
          date: "2026-10-20T18:59:18+00:00",
          views: 2150,
        },
        {
          id: "fJUz9wiXL84",
          title: "ছাদে চমৎকার গার্ডেন ও BBQ জোন সহ ডুপ্লেক্স | Duplex House Design | Heaven STUDIO | ID_1140",
          date: "2026-10-19T05:07:46+00:00",
          views: 3420,
        },
      ];

      const FB_SEED = [
        {
          id: "seed-fb-1",
          title: "5 Bedroom Classical Duplex Villa — Project ID_1143",
          message:
            "ছাদে চমৎকার রুফটপ গার্ডেন ও BBQ জোন সহ ৫ বেডরুমের রাজকীয় ক্লাসিক্যাল ডুপ্লেক্স বাড়ির 3D ভিউ ও ফ্লোর প্ল্যান। আপনার জমির মাপে বাড়ির ডিজাইন করতে যোগাযোগ করুন Heaven Studio-তে। Call/WhatsApp: 01511-280698",
          date: "2026-10-21T09:12:00+00:00",
          image: P(34378030),
          likes: "482",
          comments: "64",
        },
        {
          id: "seed-fb-2",
          title: "RAJUK Approval & Structural Safety Checklist",
          message:
            "রাজউক প্ল্যান পাস ও BNBC কোড অনুযায়ী ভূমিকম্প সহনীয় স্ট্রাকচারাল ডিজাইন কেন জরুরি? আমাদের অভিজ্ঞ আর্কিটেক্ট ও ইঞ্জিনিয়ার টিম আপনার স্বপ্নের বাড়ির প্রতিটি ধাপ তদারকি করতে প্রস্তুত।",
          date: "2026-10-18T14:05:00+00:00",
          image: P(4458205),
          likes: "359",
          comments: "41",
        },
        {
          id: "seed-fb-3",
          title: "Luxury Residence & Corporate Interior Turnkey",
          message:
            "আধুনিক ইন্টেরিয়র ডিজাইন ও BOQ বাজেট প্ল্যানিং — আপনার ফ্ল্যাট, ডুপ্লেক্স কিংবা অফিসকে নান্দনিক ও কার্যক্ষম করে তুলতে আজই ফ্রি কনসালটেশন বুক করুন। স্থপতি আতিকুর রহমান (আকাশ) ও টিম।",
          date: "2026-10-12T10:40:00+00:00",
          image: P(12441654),
          likes: "518",
          comments: "89",
        },
      ];

      const SOCIAL_LINKS = [
        { label: "Facebook", url: STUDIO.facebook, color: "#1877F2", icon: "facebook" },
        { label: "YouTube", url: STUDIO.youtube, color: "#FF0033", icon: "youtube" },
        { label: "X (Twitter)", url: STUDIO.x, color: "#111111", icon: "x" },
        { label: "Instagram", url: STUDIO.instagram, color: "#E1306C", icon: "instagram" },
        { label: "LinkedIn", url: STUDIO.linkedin, color: "#0A66C2", icon: "linkedin" },
        { label: "WhatsApp", url: waLink(), color: "#25D366", icon: "whatsapp" },
        { label: "Pinterest", url: STUDIO.pinterest, color: "#E60023", icon: "pinterest" },
        { label: "TikTok", url: STUDIO.tiktok, color: "#00f2fe", icon: "tiktok" },
        { label: "Email", url: `mailto:${STUDIO.email}`, color: "#C9A05A", icon: "mail" },
      ];

      /* =====================================================================
         SECTION 4: BRAND ICONS & LOGO COMPONENTS
      ===================================================================== */
      function SocialSvg({ type, className = "w-4 h-4" }) {
        switch (type) {
          case "youtube":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
              </svg>
            );
          case "facebook":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.89v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
              </svg>
            );
          case "x":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            );
          case "instagram":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.96.24 2.42.4.6.24 1.03.52 1.48.97.45.45.73.88.97 1.48.16.46.35 1.25.4 2.42.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.96-.4 2.42-.24.6-.52 1.03-.97 1.48-.45.45-.88.73-1.48.97-.46.16-1.25.35-2.42.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.96-.24-2.42-.4a4 4 0 0 1-1.48-.97 4 4 0 0 1-.97-1.48c-.16-.46-.35-1.25-.4-2.42C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.96.4-2.42.24-.6.52-1.03.97-1.48.45-.45.88-.73 1.48-.97.46-.16 1.25-.35 2.42-.4C8.42 2.21 8.8 2.2 12 2.2zm0 3.05a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5zm0 11.13a4.38 4.38 0 1 1 0-8.76 4.38 4.38 0 0 1 0 8.76zm6.99-11.4a1.58 1.58 0 1 1-3.15 0 1.58 1.58 0 0 1 3.15 0z" />
              </svg>
            );
          case "linkedin":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            );
          case "whatsapp":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.12-.41-2.14-1.32-.79-.71-1.32-1.58-1.47-1.88-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.11.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.12-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" />
              </svg>
            );
          case "pinterest":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.42 7.63 11.17-.11-.95-.2-2.4.04-3.44.22-.93 1.4-5.94 1.4-5.94s-.36-.72-.36-1.78c0-1.66.96-2.9 2.16-2.9 1.02 0 1.51.76 1.51 1.68 0 1.02-.65 2.56-.99 3.98-.28 1.19.6 2.16 1.77 2.16 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.9 2.74.1.12.11.22.08.34l-.33 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.75-7.25 7.92-7.25 4.16 0 7.39 2.96 7.39 6.93 0 4.13-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.14 1.12.35 2.3.54 3.54.54 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
              </svg>
            );
          case "tiktok":
            return (
              <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            );
          default:
            return (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            );
        }
      }

      function LogoImage({ className = "h-10 w-10 rounded-lg" }) {
        return (
          <img
            src="logo.jpg"
            alt="Heaven Studio Logo"
            className={`${className} object-contain bg-white`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = LOGO_FALLBACK_SVG;
            }}
          />
        );
      }

      function LogoLockup() {
        return (
          <span className="brand-lockup flex items-center gap-3">
            <LogoImage className="h-10 w-10 rounded-lg border border-brass/40 shadow-[0_0_16px_rgba(201,160,90,0.25)]" />
            <span className="flex flex-col leading-none text-left">
              <span className="font-display text-[1.35rem] font-bold tracking-[0.06em] text-paper">HEAVEN</span>
              <span className="label mt-1 text-[0.58rem] font-semibold tracking-[0.48em] text-brass">STUDIO</span>
            </span>
          </span>
        );
      }

      /* =====================================================================
         SECTION 5: PRELOADER FUNCTIONALITY (SIMPLE ANIMATION OF logo.jpg)
      ===================================================================== */
      function Preloader({ onDone }) {
        const [pct, setPct] = useState(0);
        const [fadeOut, setFadeOut] = useState(false);

        useEffect(() => {
          const start = performance.now();
          const duration = 2000;
          let raf = 0;
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            setPct(Math.round(p * 100));
            if (p < 1) {
              raf = requestAnimationFrame(tick);
            } else {
              setFadeOut(true);
              setTimeout(onDone, 650);
            }
          };
          raf = requestAnimationFrame(tick);
          return () => cancelAnimationFrame(raf);
        }, [onDone]);

        return (
          <div
            onClick={() => {
              setFadeOut(true);
              setTimeout(onDone, 300);
            }}
            className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-ink transition-opacity duration-700 ${
              fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 grid-lines opacity-40" />

            <div className="relative flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <span className="absolute -inset-4 rounded-3xl border border-brass/30 animate-pulse" />
                <span
                  className="absolute -inset-8 rounded-full border border-dashed border-brass/20 animate-spin"
                  style={{ animationDuration: "18s" }}
                />
                <img
                  src="logo.jpg"
                  alt="Heaven Studio Preloader Logo"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = LOGO_FALLBACK_SVG;
                  }}
                  className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl object-contain bg-white p-2 shadow-[0_0_50px_rgba(201,160,90,0.35)] animate-logo-pulse"
                />
              </div>

              <h1 className="mt-8 font-display text-3xl sm:text-4xl font-light tracking-[0.28em] gold-text">
                HEAVEN STUDIO
              </h1>
              <p className="bn mt-1.5 text-xs text-paper/50">
                {STUDIO.nameBn} · {STUDIO.city}
              </p>

              <div className="mt-6 w-56 sm:w-64">
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-paper/10">
                  <div
                    className="h-full bg-gradient-to-r from-brass/50 via-brasslite to-brass transition-all duration-150"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[0.6rem] tracking-[0.25em] text-paper/45">
                  <span>LOADING</span>
                  <span className="text-brasslite">{pct}%</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      /* =====================================================================
         SECTION 6: NAVIGATION BAR (CENTERED DESKTOP PILL + MOBILE 3-LINE MENU)
      ===================================================================== */
      function Navbar({ onTryNow, onSelectService, onSelectProjectTab }) {
        const [scrolled, setScrolled] = useState(false);
        const [scrollPct, setScrollPct] = useState(0);
        const [active, setActive] = useState("home");
        const [mobileOpen, setMobileOpen] = useState(false);
        const [openDropdown, setOpenDropdown] = useState(null); // 'services' | 'projects' | null
        const [mobileSubmenu, setMobileSubmenu] = useState(null);

        useEffect(() => {
          const onScroll = () => {
            setScrolled(window.scrollY > 24);
            const docH = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(docH > 0 ? Math.min(1, window.scrollY / docH) : 0);

            const mid = window.scrollY + window.innerHeight * 0.32;
            let cur = "home";
            for (const n of NAV) {
              const el = document.getElementById(n.id);
              if (el && el.offsetTop <= mid) cur = n.id;
            }
            setActive(cur);
          };
          onScroll();
          window.addEventListener("scroll", onScroll, { passive: true });
          return () => window.removeEventListener("scroll", onScroll);
        }, []);

        const go = (id) => {
          setMobileOpen(false);
          setOpenDropdown(null);
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        return (
          <>
            <header
              className={`fixed inset-x-0 top-0 z-[200] transition-all duration-500 ${
                scrolled
                  ? "border-b border-paper/10 bg-ink/85 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  : "border-b border-transparent bg-ink/40 backdrop-blur-sm"
              }`}
            >
              <div className="relative mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-4 sm:px-7">
                {/* Left: Brand Logo */}
                <button
                  onClick={() => go("home")}
                  className="shrink-0 transition hover:opacity-85 z-20"
                  aria-label="Heaven Studio Home"
                >
                  <LogoLockup />
                </button>

                {/* Center: Desktop Menu Tabs (Visible on md & larger screens, perfectly centered) */}
                <nav
                  aria-label="Primary Navigation"
                  className="hidden md:flex items-center gap-1 rounded-full border border-brass/25 bg-ink2/85 p-1.5 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(244,240,232,0.08)] backdrop-blur-xl lg:absolute lg:left-1/2 lg:-translate-x-1/2"
                >
                  {NAV.map((n) => {
                    const isAct = active === n.id;

                    // Services Tab + Dropdown
                    if (n.id === "services") {
                      return (
                        <div
                          key={n.id}
                          className="relative"
                          onMouseEnter={() => setOpenDropdown("services")}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          <button
                            onClick={() => go("services")}
                            className={`relative flex items-center gap-1.5 rounded-full px-3.5 lg:px-4 py-2 text-[0.76rem] lg:text-[0.8rem] font-medium tracking-wide transition-all duration-300 ${
                              isAct
                                ? "border border-brass/50 bg-gradient-to-r from-brass/25 via-brass/15 to-brass/25 text-brasslite shadow-[0_0_20px_rgba(201,160,90,0.25)]"
                                : "text-paper/75 hover:bg-paper/[0.05] hover:text-paper"
                            }`}
                          >
                            <span>{n.label}</span>
                            <svg
                              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                                openDropdown === "services" ? "rotate-180 text-brass" : "text-brass/70"
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>

                          {openDropdown === "services" && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[520px] z-50">
                              <div className="rounded-2xl border border-brass/35 bg-ink2/95 p-4 shadow-[0_30px_80px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                                <div className="mb-2.5 flex items-center justify-between border-b border-paper/10 pb-2 px-2">
                                  <span className="label text-[0.52rem] text-brass">11 Multidisciplinary Services</span>
                                  <button
                                    onClick={() => go("services")}
                                    className="font-mono text-[0.6rem] text-brasslite hover:underline"
                                  >
                                    VIEW ALL →
                                  </button>
                                </div>
                                <div className="grid grid-cols-2 gap-1.5 max-h-[360px] overflow-y-auto pr-1">
                                  {SERVICES.map((s, idx) => (
                                    <button
                                      key={s.title}
                                      onClick={() => {
                                        onSelectService(idx);
                                        setOpenDropdown(null);
                                      }}
                                      className="flex items-start gap-2.5 rounded-xl p-2.5 text-left transition hover:bg-brass/15 group"
                                    >
                                      <span className="text-lg leading-none mt-0.5">{s.emoji}</span>
                                      <span className="min-w-0 flex-1">
                                        <span className="block truncate text-xs font-medium text-paper group-hover:text-brasslite">
                                          {s.title}
                                        </span>
                                        <span className="bn block truncate text-[0.68rem] text-paper/45">
                                          {s.titleBn}
                                        </span>
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Projects Tab + Dropdown
                    if (n.id === "projects") {
                      return (
                        <div
                          key={n.id}
                          className="relative"
                          onMouseEnter={() => setOpenDropdown("projects")}
                          onMouseLeave={() => setOpenDropdown(null)}
                        >
                          <button
                            onClick={() => go("projects")}
                            className={`relative flex items-center gap-1.5 rounded-full px-3.5 lg:px-4 py-2 text-[0.76rem] lg:text-[0.8rem] font-medium tracking-wide transition-all duration-300 ${
                              isAct
                                ? "border border-brass/50 bg-gradient-to-r from-brass/25 via-brass/15 to-brass/25 text-brasslite shadow-[0_0_20px_rgba(201,160,90,0.25)]"
                                : "text-paper/75 hover:bg-paper/[0.05] hover:text-paper"
                            }`}
                          >
                            <span>{n.label}</span>
                            <svg
                              className={`h-3.5 w-3.5 transition-transform duration-300 ${
                                openDropdown === "projects" ? "rotate-180 text-brass" : "text-brass/70"
                              }`}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>

                          {openDropdown === "projects" && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 z-50">
                              <div className="rounded-2xl border border-brass/35 bg-ink2/95 p-3.5 shadow-[0_30px_80px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                                <div className="mb-2 flex items-center justify-between border-b border-paper/10 pb-2 px-2">
                                  <span className="label text-[0.52rem] text-brass">Project Portfolio</span>
                                  <span className="font-mono text-[0.58rem] text-paper/40">1,140+ IDs</span>
                                </div>
                                <div className="space-y-1.5">
                                  <button
                                    onClick={() => {
                                      onSelectProjectTab("ongoing");
                                      setOpenDropdown(null);
                                    }}
                                    className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-brass/15 group"
                                  >
                                    <div>
                                      <span className="block text-sm font-medium text-paper group-hover:text-brasslite">
                                        Ongoing Projects
                                      </span>
                                      <span className="bn block text-xs text-paper/45">চলমান প্রজেক্ট সমূহ</span>
                                    </div>
                                    <span className="rounded-full border border-brass/40 bg-brass/10 px-2.5 py-0.5 font-mono text-[0.6rem] text-brasslite">
                                      {ONGOING.length} Active
                                    </span>
                                  </button>
                                  <button
                                    onClick={() => {
                                      onSelectProjectTab("delivered");
                                      setOpenDropdown(null);
                                    }}
                                    className="flex w-full items-center justify-between rounded-xl p-3 text-left transition hover:bg-brass/15 group"
                                  >
                                    <div>
                                      <span className="block text-sm font-medium text-paper group-hover:text-brasslite">
                                        Delivered Projects
                                      </span>
                                      <span className="bn block text-xs text-paper/45">হস্তান্তরিত প্রজেক্ট সমূহ</span>
                                    </div>
                                    <span className="rounded-full border border-paper/20 px-2.5 py-0.5 font-mono text-[0.6rem] text-paper/60">
                                      {DELIVERED.length} Featured
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }

                    // Standard Tab
                    return (
                      <button
                        key={n.id}
                        onClick={() => go(n.id)}
                        className={`relative rounded-full px-3.5 lg:px-4 py-2 text-[0.76rem] lg:text-[0.8rem] font-medium tracking-wide transition-all duration-300 ${
                          isAct
                            ? "border border-brass/50 bg-gradient-to-r from-brass/25 via-brass/15 to-brass/25 text-brasslite shadow-[0_0_20px_rgba(201,160,90,0.25)]"
                            : "text-paper/75 hover:bg-paper/[0.05] hover:text-paper"
                        }`}
                      >
                        {n.label}
                      </button>
                    );
                  })}
                </nav>

                {/* Right: CTA Button + Mobile 3-Line Hamburger Menu */}
                <div className="flex items-center gap-2 sm:gap-3 z-20">
                  <button
                    onClick={onTryNow}
                    className="heaven-glow hidden sm:flex items-center gap-2 rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] px-5 lg:px-6 py-2.5 lg:py-3 text-[0.72rem] lg:text-[0.75rem] font-semibold tracking-[0.18em] text-ink shadow-[0_8px_28px_-8px_rgba(201,160,90,0.7)] transition hover:brightness-110"
                  >
                    <span>✦ TRY NOW</span>
                  </button>
                  {/* 3-line Menu Button on Mobile */}
                  <button
                    onClick={() => setMobileOpen(true)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper md:hidden"
                    aria-label="Open menu"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scroll progress gold hairline */}
              <div className="h-[2px] w-full bg-transparent overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brass/20 via-brasslite to-brass transition-transform duration-150 origin-left"
                  style={{ transform: `scaleX(${scrollPct})` }}
                />
              </div>
            </header>

            {/* Mobile Drawer */}
            {mobileOpen && (
              <div className="fixed inset-0 z-[300] overflow-y-auto bg-ink/98 backdrop-blur-xl md:hidden">
                <div className="flex h-[78px] items-center justify-between px-4 sm:px-7 border-b border-paper/10">
                  <LogoLockup />
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/15 text-paper"
                    aria-label="Close menu"
                  >
                    ✕
                  </button>
                </div>
                <nav className="flex flex-col px-6 py-4">
                  {NAV.map((n) => (
                    <div key={n.id} className="border-b border-paper/10">
                      <div className="flex items-center justify-between py-4">
                        <button onClick={() => go(n.id)} className="flex items-baseline gap-3 text-left">
                          <span className="font-mono text-xs text-brass/70">{n.num}</span>
                          <span className="font-display text-2xl font-light text-paper hover:text-brasslite">
                            {n.label}
                          </span>
                        </button>
                        {n.hasDropdown && (
                          <button
                            onClick={() => setMobileSubmenu(mobileSubmenu === n.id ? null : n.id)}
                            className="rounded-full border border-brass/30 px-3 py-1 text-xs text-brasslite"
                          >
                            {mobileSubmenu === n.id ? "Hide ▲" : "Options ▼"}
                          </button>
                        )}
                      </div>

                      {n.id === "services" && mobileSubmenu === "services" && (
                        <div className="mb-4 grid grid-cols-1 gap-1.5 rounded-xl bg-paper/[0.03] p-3">
                          {SERVICES.map((s, idx) => (
                            <button
                              key={s.title}
                              onClick={() => {
                                setMobileOpen(false);
                                onSelectService(idx);
                              }}
                              className="flex items-center gap-2.5 rounded-lg p-2 text-left text-xs text-paper/80 hover:bg-brass/15"
                            >
                              <span>{s.emoji}</span>
                              <span>{s.title}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {n.id === "projects" && mobileSubmenu === "projects" && (
                        <div className="mb-4 flex flex-col gap-2 rounded-xl bg-paper/[0.03] p-3">
                          <button
                            onClick={() => {
                              setMobileOpen(false);
                              onSelectProjectTab("ongoing");
                            }}
                            className="flex items-center justify-between rounded-lg p-2.5 text-left text-xs text-paper/85 hover:bg-brass/15"
                          >
                            <span>Ongoing Projects (চলমান প্রজেক্ট)</span>
                            <span className="font-mono text-brasslite">{ONGOING.length}</span>
                          </button>
                          <button
                            onClick={() => {
                              setMobileOpen(false);
                              onSelectProjectTab("delivered");
                            }}
                            className="flex items-center justify-between rounded-lg p-2.5 text-left text-xs text-paper/85 hover:bg-brass/15"
                          >
                            <span>Delivered Projects (হস্তান্তরিত প্রজেক্ট)</span>
                            <span className="font-mono text-brasslite">{DELIVERED.length}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="px-6 pb-10 pt-4">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onTryNow();
                    }}
                    className="w-full rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] py-4 text-xs font-semibold tracking-[0.2em] text-ink"
                  >
                    START YOUR PROJECT
                  </button>
                </div>
              </div>
            )}
          </>
        );
      }

      /* =====================================================================
         SECTION 7: SCROLL-DRIVEN PENCIL SKETCH TO 3D REALITY TRANSFORMATION
      ===================================================================== */
      function SketchToRealitySection() {
        const sectionRef = useRef(null);
        const [progress, setProgress] = useState(0); // 0 = full sketch, 1 = full 3D reality

        useEffect(() => {
          let raf = 0;
          const updateScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            if (scrollable <= 0) return;
            const raw = -rect.top / scrollable;
            const clamped = Math.max(0, Math.min(1, raw));
            setProgress(clamped);
          };

          const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(updateScroll);
          };

          updateScroll();
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
          };
        }, []);

        // Smooth interpolation for reveal percentage (starts revealing at 8%, completes at 82%)
        const normalized = Math.max(0, Math.min(1, (progress - 0.08) / 0.74));
        const insetTopPct = (1 - normalized) * 100; // 100% -> 0%
        const rotX = (1 - progress) * 12; // 12deg -> 0deg
        const scale = 1.08 - progress * 0.08; // 1.08 -> 1.0
        const gridOpacity = Math.max(0, 0.85 - normalized * 1.3);
        const sketchOpacity = 1 - normalized * 0.55;

        // Active Stage Caption (Stage 01, 02, or 03)
        const stage = normalized < 0.36 ? 1 : normalized < 0.76 ? 2 : 3;

        return (
          <section ref={sectionRef} className="relative h-[280svh] bg-ink">
            <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden pt-12">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(80% 60% at 50% 40%, rgba(201,160,90,0.12), transparent 65%)",
                }}
              />

              <div style={{ perspective: "1400px" }} className="relative w-[min(1160px,92vw)]">
                {/* Top Header & Interactive Manual Slider Option */}
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
                    <span className="label text-[0.55rem] text-brass">
                      Scroll Transformation · Pencil Sketch → Photoreal 3D
                    </span>
                  </div>
                  <span className="font-mono text-xs text-brasslite">
                    {Math.round(normalized * 100)}% REALITY REVEALED
                  </span>
                </div>

                {/* 3D Tilted Architectural Frame */}
                <div
                  style={{
                    transform: `rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
                    transformStyle: "preserve-3d",
                    transition: "transform 0.08s linear",
                  }}
                  className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-paper/15 bg-ink2 shadow-[0_60px_140px_-50px_rgba(0,0,0,0.95)]"
                >
                  {/* Layer 1: Architectural Pencil Sketch */}
                  <img
                    src="public/images/sketch.png"
                    alt="Pencil architectural drawing"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = SKETCH_FALLBACK_URL;
                      e.currentTarget.style.filter =
                        "grayscale(1) invert(1) contrast(2.2) brightness(1.08) sepia(0.18)";
                    }}
                    style={{ opacity: sketchOpacity }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Layer 2: Blueprint Grid Overlay that dissolves on scroll */}
                  <div
                    className="absolute inset-0 grid-lines pointer-events-none"
                    style={{ opacity: gridOpacity }}
                  />

                  {/* Layer 3: Photoreal 3D Render revealed upward via clip-path */}
                  <img
                    src="public/images/render.jpg"
                    alt="Photoreal 3D render of the same design"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = RENDER_FALLBACK_URL;
                    }}
                    style={{
                      clipPath: `inset(${insetTopPct.toFixed(2)}% 0% 0% 0%)`,
                      transform: "scale(1.01)",
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  {/* Layer 4: Glowing Brass Laser Reveal Beam */}
                  <div
                    style={{ top: `${insetTopPct.toFixed(2)}%` }}
                    className="pointer-events-none absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-brasslite to-transparent shadow-[0_0_28px_6px_rgba(232,204,146,0.65)]"
                  />

                  {/* Layer 5: Architectural Corner Ticks & Vignette */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,transparent_55%,rgba(0,0,0,0.55))]" />
                  {[
                    "left-3 top-3 border-l border-t",
                    "right-3 top-3 border-r border-t",
                    "left-3 bottom-3 border-l border-b",
                    "right-3 bottom-3 border-r border-b",
                  ].map((c) => (
                    <span key={c} className={`pointer-events-none absolute h-6 w-6 border-brass/70 ${c}`} />
                  ))}

                  {/* Stage Captions */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-8 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent">
                    {stage === 1 && (
                      <div>
                        <span className="label text-[0.55rem] text-brass">Stage 01 · Concept</span>
                        <p className="font-display text-2xl sm:text-4xl text-paper">Pencil study &amp; massing</p>
                      </div>
                    )}
                    {stage === 2 && (
                      <div>
                        <span className="label text-[0.55rem] text-brass">Stage 02 · Engineering &amp; Material</span>
                        <p className="font-display text-2xl sm:text-4xl text-paper">Material · light · landscape</p>
                      </div>
                    )}
                    {stage === 3 && (
                      <div>
                        <span className="label text-[0.55rem] text-brass">Stage 03 · Final Reality</span>
                        <p className="font-display text-2xl sm:text-4xl text-paper">
                          Photoreal 3D — approved &amp; buildable
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Dimension Scale */}
                  <div
                    style={{ opacity: normalized }}
                    className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 sm:flex transition-opacity"
                  >
                    <span className="h-16 w-px bg-brass/60" />
                    <span className="font-mono text-[0.55rem] tracking-[0.3em] text-brass [writing-mode:vertical-rl]">
                      4,850 SFT · G+1
                    </span>
                    <span className="h-16 w-px bg-brass/60" />
                  </div>
                </div>

                {/* Bottom Progress Rail */}
                <div className="mt-6 flex items-center gap-4">
                  <span className="label text-[0.5rem] text-paper/45">DRAWING (SKETCH)</span>
                  <div className="relative h-[3px] flex-1 bg-paper/10 overflow-hidden rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-brass/50 to-brasslite"
                      style={{ width: `${(normalized * 100).toFixed(1)}%` }}
                    />
                  </div>
                  <span className="label text-[0.5rem] text-brasslite">REALITY (3D RENDER)</span>
                </div>
              </div>
            </div>
          </section>
        );
      }

      /* =====================================================================
         SECTION 8: HOME HERO & 4-STEP PROCESS SECTION
      ===================================================================== */

      /* Responsive Three.js architectural cityscape background */
      function Hero3DBackground() {
        const mountRef = useRef(null);
        useEffect(() => {
          const host = mountRef.current;
          if (!host || !window.THREE) return;
          const THREE = window.THREE;
          const scene = new THREE.Scene();
          scene.fog = new THREE.FogExp2(0x08090b, 0.035);
          const camera = new THREE.PerspectiveCamera(52, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 140);
          camera.position.set(0, 5.5, 19);
          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
          renderer.setSize(host.clientWidth, host.clientHeight);
          renderer.setClearColor(0x08090b, 0);
          host.appendChild(renderer.domElement);
          const gold = new THREE.LineBasicMaterial({ color: 0xc9a05a, transparent: true, opacity: 0.52 });
          const blue = new THREE.LineBasicMaterial({ color: 0x7fb2ff, transparent: true, opacity: 0.23 });
          const city = new THREE.Group();
          const rand = () => Math.random();
          for (let i = 0; i < 64; i++) {
            const w = 0.65 + rand() * 1.5, h = 1.1 + rand() * 6.8, d = 0.65 + rand() * 1.5;
            const geometry = new THREE.BoxGeometry(w, h, d);
            const wire = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), rand() > 0.84 ? blue : gold);
            wire.position.set((rand() - 0.5) * 43, h / 2, (rand() - 0.5) * 30 - 3);
            wire.userData = { h, delay: rand() * 1.8, baseX: wire.position.x };
            wire.scale.y = 0.01;
            city.add(wire);
          }
          scene.add(city);
          const grid = new THREE.GridHelper(76, 54, 0x5b4b31, 0x28252a);
          grid.material.transparent = true; grid.material.opacity = 0.35; grid.position.y = 0.02; scene.add(grid);
          const gem = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(2.25, 1)), new THREE.LineBasicMaterial({ color: 0xe8cc92, transparent: true, opacity: 0.62 }));
          gem.position.set(7.3, 5.8, 0); scene.add(gem);
          const positions = new Float32Array(1200 * 3);
          for (let i=0;i<positions.length;i++) positions[i]=(rand()-.5)*90;
          const starGeometry = new THREE.BufferGeometry(); starGeometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
          const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xe8cc92, size: 0.055, transparent: true, opacity: 0.65 })); scene.add(stars);
          let mx=0, my=0, frame=0, running=true; const start=performance.now();
          const onMove=e=>{ mx=e.clientX/window.innerWidth-.5; my=e.clientY/window.innerHeight-.5; };
          const onResize=()=>{ const w=host.clientWidth,h=host.clientHeight; if(!w||!h)return; camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h); };
          window.addEventListener('pointermove',onMove,{passive:true}); window.addEventListener('resize',onResize);
          const animate=now=>{ if(!running)return; const t=(now-start)/1000;
            city.children.forEach(b=>{const k=Math.max(0,Math.min(1,(t-b.userData.delay)/1.7)); const ease=1-Math.pow(1-k,3); b.scale.y=Math.max(.01,ease); b.position.y=b.userData.h*ease/2;});
            city.rotation.y=Math.sin(t*.08)*.10+mx*.12; gem.rotation.x=t*.17;gem.rotation.y=t*.22;gem.position.y=5.8+Math.sin(t*.7)*.35;stars.rotation.y=t*.009;
            camera.position.x+=(mx*2-camera.position.x)*.025;camera.position.y+=(5.5-my*1.2-camera.position.y)*.025;camera.lookAt(0,2.1,0);
            const scrollFade=Math.max(.12,1-Math.min(1,window.scrollY/(window.innerHeight*.9))*.78); host.style.opacity=String(scrollFade); renderer.render(scene,camera); frame=requestAnimationFrame(animate); };
          frame=requestAnimationFrame(animate);
          return ()=>{ running=false;cancelAnimationFrame(frame);window.removeEventListener('pointermove',onMove);window.removeEventListener('resize',onResize);scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material.dispose();}});renderer.dispose();if(renderer.domElement.parentNode===host)host.removeChild(renderer.domElement); };
        }, []);
        return <><div id="hero3d" ref={mountRef} aria-hidden="true"/><div className="hero-3d-vignette" aria-hidden="true"/></>;
      }

      function HomeSection({ onTryNow }) {
        return (
          <>
            <section id="home" className="relative min-h-[95svh] overflow-hidden pt-[84px] flex flex-col justify-between">
              <Hero3DBackground />
              <div className="absolute inset-0 grid-lines opacity-35 z-[1] pointer-events-none" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 80% at 78% 12%, rgba(201,160,90,0.16), transparent 55%), radial-gradient(90% 70% at 8% 90%, rgba(127,178,255,0.10), transparent 60%)",
                }}
              />

              <div className="hero-content-layer relative mx-auto grid max-w-[1500px] gap-10 px-5 pb-12 pt-10 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center my-auto">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inset-0 rounded-full bg-live animate-pulse-ring" />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-live" />
                    </span>
                    <span className="label text-[0.58rem] text-paper/60">Studio Open · Dhaka, Bangladesh</span>
                  </div>

                  <h1 className="mt-6 font-display text-[clamp(2.7rem,7vw,5.4rem)] font-light leading-[0.96] tracking-tight">
                    <span className="block">We sketch</span>
                    <span className="block italic gold-text">the heaven</span>
                    <span className="block">you live in.</span>
                  </h1>

                  <p className="mt-7 max-w-xl text-[0.98rem] leading-relaxed text-paper/65">
                    Heaven Studio is a full-stack architecture &amp; engineering practice — from the first pencil line
                    and RAJUK drawing to photoreal 3D, structural safety and on-site supervision.{" "}
                    <span className="bn text-brasslite">স্বপ্নের বাড়ির প্রতিটি রেখায় স্থাপত্য ও প্রকৌশলের নিখুঁত সমন্বয়।</span>
                  </p>

                  <div className="mt-9 flex flex-wrap items-center gap-3">
                    <button
                      onClick={onTryNow}
                      className="heaven-glow group rounded-full bg-paper px-7 py-4 text-xs font-semibold tracking-[0.2em] text-ink transition hover:bg-brasslite"
                    >
                      START YOUR PROJECT ↗
                    </button>
                    <a
                      href="#feed"
                      className="flex items-center gap-3 rounded-full border border-paper/20 px-6 py-4 text-xs tracking-[0.2em] text-paper/80 transition hover:border-brass/60 hover:text-brasslite"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brass/20 text-brass">
                        ▶
                      </span>
                      WATCH LATEST DESIGN
                    </a>
                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2 text-xs tracking-[0.16em] text-paper/55 underline decoration-paper/20 underline-offset-8 hover:text-brasslite"
                    >
                      or WhatsApp 01511 280698
                    </a>
                  </div>

                  <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-y-6 border-t border-paper/10 pt-7 sm:grid-cols-4">
                    {STATS.map((s) => (
                      <div key={s.label}>
                        <dt className="font-display text-3xl text-brasslite">{s.value}</dt>
                        <dd className="label mt-1 text-[0.52rem] text-paper/45">{s.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Hero Architectural Visual Card + Floating Pencil Study Card */}
                <div className="relative mx-auto w-full max-w-xl">
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-paper/15 bg-ink2 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]">
                    <img
                      src="public/images/render.jpg"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = RENDER_FALLBACK_URL;
                      }}
                      alt="Heaven Studio 3D architectural render"
                      className="h-full w-full object-cover transition duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-85" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <span>
                        <span className="label block text-[0.5rem] text-brass">Project ID_1143</span>
                        <span className="mt-1 block font-display text-2xl">Classical Duplex Villa</span>
                      </span>
                      <span className="rounded-full border border-paper/20 bg-ink/70 px-3 py-1 font-mono text-[0.6rem] text-paper/75">
                        3D · 2026
                      </span>
                    </div>
                  </div>

                  {/* Floating Pencil Study Miniature */}
                  <div className="absolute -bottom-6 -left-5 hidden w-44 rotate-[-6deg] rounded-xl border border-brass/30 bg-paper/95 p-2 shadow-2xl sm:block animate-float">
                    <img
                      src="public/images/sketch.png"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = SKETCH_FALLBACK_URL;
                        e.currentTarget.style.filter = "grayscale(1) invert(1) contrast(2)";
                      }}
                      alt="Pencil sketch study"
                      className="w-full rounded aspect-[16/10] object-cover"
                    />
                    <span className="mt-1 block text-center font-mono text-[0.52rem] tracking-[0.2em] text-ink/70">
                      PENCIL STUDY
                    </span>
                  </div>
                </div>
              </div>

              <div className="hero-content-layer relative flex justify-center pb-6">
                <span className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.3em] text-paper/45 animate-bounce">
                  ↓ SCROLL · WATCH THE PENCIL BECOME A BUILDING
                </span>
              </div>
            </section>

            {/* Scroll-driven Sketch -> Reality Morph Section */}
            <SketchToRealitySection />

            {/* 4-Step Process & Marquee */}
            <section className="relative border-y border-paper/10 bg-ink2/60 py-20">
              <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                  <div>
                    <span className="label text-[0.55rem] text-brass">How we work</span>
                    <h2 className="mt-3 max-w-xl font-display text-4xl font-light leading-tight sm:text-5xl">
                      Four calm steps from <span className="italic text-brasslite">brief</span> to keys in hand.
                    </h2>
                  </div>
                  <p className="max-w-sm text-sm text-paper/55">
                    Every stage is documented, drawn and costed — so nothing about your build is left to guesswork.
                  </p>
                </div>
                <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 md:grid-cols-4">
                  {PROCESS.map((s) => (
                    <div key={s.n} className="group relative bg-ink p-7 transition-colors hover:bg-smoke/60">
                      <span className="font-mono text-3xl text-brass/40 transition-colors group-hover:text-brass">
                        {s.n}
                      </span>
                      <h3 className="mt-5 font-display text-2xl">{s.t}</h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-paper/55">{s.d}</p>
                    </div>
                  ))}
                </div>

                {/* Discipline Marquee */}
                <div className="relative mt-14 overflow-hidden border-y border-paper/10 py-4">
                  <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
                    {[0, 1].map((k) => (
                      <div key={k} className="flex gap-10">
                        {[
                          "🏛️ Architectural Design",
                          "🏗️ Structural Design",
                          "⚡ Electrical",
                          "🚰 Plumbing",
                          "🧯 Fire Safety",
                          "🎬 3D Animation",
                          "🛋️ Interior",
                          "🌿 Landscape",
                          "📋 RAJUK Approval",
                          "🪨 Soil Test",
                          "👷 Supervision",
                        ].map((t) => (
                          <span key={t} className="font-display text-2xl text-paper/35 sm:text-3xl">
                            {t}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      }

      /* =====================================================================
         SECTION 9: ABOUT US & FOUNDER (ARCHITECT ATIKUR RAHMAN AKASH)
      ===================================================================== */
      function AboutSection() {
        const PILLARS = [
          { t: "Design first", d: "Every plan starts on paper — proportion, light and movement before software." },
          {
            t: "Engineer checked",
            d: "Structural, electrical, plumbing and fire drawings signed by licensed engineers.",
          },
          { t: "Site honest", d: "We supervise what we draw, with stage-wise photo reports to the owner." },
          { t: "RAJUK ready", d: "Approval drawings, soil report annexure and follow-up handled end to end." },
        ];

        return (
          <section id="about" className="relative overflow-hidden py-24 sm:py-28">
            <div className="absolute inset-0 grid-lines opacity-30" />
            <div className="relative mx-auto max-w-[1500px] px-5 sm:px-7">
              <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                <div className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-paper/12">
                    <img
                      src="https://images.pexels.com/photos/9617369/pexels-photo-9617369.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=800"
                      alt="Heaven Studio drafting"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="label text-[0.5rem] text-brass">Since 2014 · Dhaka</span>
                      <p className="bn mt-2 font-display text-2xl leading-snug text-paper">
                        স্থাপত্য ও প্রকৌশলের সমন্বয়ে গড়ে ওঠা আস্থার প্রতিষ্ঠান
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="label text-[0.55rem] text-brass">About us · 02</span>
                  <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-light leading-[1.05]">
                    A studio that draws like <span className="italic gold-text">architects</span> and counts like{" "}
                    <span className="italic gold-text">engineers</span>.
                  </h2>
                  <p className="mt-6 max-w-2xl leading-relaxed text-paper/65">
                    Heaven Studio is a Dhaka-based multidisciplinary design practice. Architects, civil &amp; structural
                    engineers, electrical and plumbing designers, 3D artists and site supervisors work under one roof —
                    so your drawing, your budget and your build never contradict each other. From a rural tin-shed home
                    to a G+7 apartment block, the same detailing discipline applies.
                  </p>

                  <div className="mt-9 grid gap-px overflow-hidden rounded-xl border border-paper/10 bg-paper/10 sm:grid-cols-2">
                    {PILLARS.map((p) => (
                      <div key={p.t} className="bg-ink p-6 transition-colors hover:bg-smoke/70">
                        <h3 className="font-display text-xl text-brasslite">{p.t}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-paper/55">{p.d}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-2.5">
                    {["BNBC aligned", "RAJUK submission set", "Licensed engineers", "1,140+ design IDs"].map((b) => (
                      <span
                        key={b}
                        className="rounded-full border border-brass/30 bg-brass/10 px-4 py-2 text-[0.72rem] text-brasslite"
                      >
                        ✦ {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* FOUNDER SPOTLIGHT CARD: Architect Atikur Rahman (Akash) [Akash.jpg] */}
              <div className="mt-20 rounded-3xl border border-brass/35 bg-gradient-to-br from-ink2 via-graphite/90 to-ink p-6 sm:p-10 lg:p-12 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.9)]">
                <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:items-center">
                  <div className="relative mx-auto w-full max-w-[340px]">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-2 border-brass/40 bg-ink shadow-2xl">
                      <img
                        src={FOUNDER.image}
                        alt={FOUNDER.name}
                        className="h-full w-full object-cover object-top transition duration-700 hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = AKASH_FALLBACK_SVG;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <span className="rounded-full border border-brass/40 bg-ink/80 px-3 py-1 font-mono text-[0.58rem] tracking-[0.2em] text-brasslite backdrop-blur">
                          FOUNDER &amp; PRINCIPAL
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-4 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-brass" />
                      <span className="label text-[0.55rem] text-brasslite">Leadership &amp; Vision</span>
                    </div>

                    <h3 className="mt-4 font-display text-3xl sm:text-5xl font-light text-paper">{FOUNDER.name}</h3>
                    <p className="bn mt-1.5 text-lg text-brasslite">
                      {FOUNDER.nameBn} — <span className="text-paper/65">{FOUNDER.roleBn}</span>
                    </p>
                    <p className="label mt-1 text-[0.6rem] text-paper/45">{FOUNDER.role} · Heaven Studio</p>

                    <blockquote className="mt-6 border-l-2 border-brass/60 pl-4 font-display text-xl italic text-paper/85 sm:text-2xl">
                      {FOUNDER.quote}
                    </blockquote>

                    <p className="mt-5 text-sm sm:text-base leading-relaxed text-paper/65">{FOUNDER.bio}</p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <a
                        href={waLink(
                          "Hello Architect Atikur Rahman (Akash), I would like to discuss a project with Heaven Studio."
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] px-6 py-3 text-xs font-semibold tracking-[0.16em] text-ink transition hover:brightness-110"
                      >
                        CONSULT WITH ARCHITECT AKASH ↗
                      </a>
                      <a
                        href={STUDIO.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-paper/15 px-5 py-3 text-xs tracking-[0.14em] text-paper/75 transition hover:border-brass/50 hover:text-brasslite"
                      >
                        FOLLOW ON FACEBOOK
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      /* =====================================================================
         SECTION 10: SERVICES SECTION (11 DISCIPLINES + ACCORDION)
      ===================================================================== */
      function ServicesSection({ openIndex, setOpenIndex }) {
        const requestService = (title) =>
          window.open(
            waLink(`Hello Heaven Studio, I need *${title}* service. Please share the process & cost.`),
            "_blank"
          );

        return (
          <section id="services" className="relative border-t border-paper/10 py-24 sm:py-28">
            <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="label text-[0.55rem] text-brass">Services · 03</span>
                  <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
                    Eleven disciplines, <span className="italic gold-text">one accountable studio.</span>
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-paper/55">
                    Tap any service below or choose from the navigation dropdown to see deliverables and request a quote.
                  </p>
                </div>

                <div className="w-full max-w-sm">
                  <span className="label mb-2 block text-[0.5rem] text-paper/45">Jump to a service</span>
                  <select
                    value={openIndex ?? ""}
                    onChange={(e) => {
                      const idx = Number(e.target.value);
                      setOpenIndex(idx);
                      setTimeout(() => {
                        document.getElementById(`svc-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }, 60);
                    }}
                    className="input-field"
                  >
                    {SERVICES.map((s, i) => (
                      <option key={s.title} value={i} className="bg-ink2 text-paper">
                        {s.emoji} {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-12 grid gap-3 lg:grid-cols-2">
                {SERVICES.map((s, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <div
                      key={s.title}
                      id={`svc-${i}`}
                      className={`overflow-hidden rounded-2xl border transition-colors ${
                        isOpen
                          ? "border-brass/50 bg-brass/[0.07]"
                          : "border-paper/12 bg-paper/[0.02] hover:border-paper/25"
                      }`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : i)}
                        className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                      >
                        <span className="text-2xl leading-none">{s.emoji}</span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-xl sm:text-2xl">{s.title}</span>
                          <span className="bn block truncate text-xs text-paper/45">{s.titleBn}</span>
                        </span>
                        <span className="hidden font-mono text-[0.6rem] tracking-[0.2em] text-brass/60 sm:block">
                          {s.code}
                        </span>
                        <span className={`text-brass transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                          ▼
                        </span>
                      </button>

                      {isOpen && (
                        <div className="border-t border-brass/20 px-5 py-5 sm:px-6">
                          <p className="text-sm leading-relaxed text-paper/70">{s.desc}</p>
                          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                            {s.points.map((p) => (
                              <li key={p} className="flex items-center gap-2 text-xs text-paper/65">
                                <span className="text-brass">✓</span> {p}
                              </li>
                            ))}
                          </ul>
                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <button
                              onClick={() => requestService(s.title)}
                              className="rounded-full bg-brass px-5 py-2.5 text-[0.7rem] font-semibold tracking-[0.14em] text-ink transition hover:bg-brasslite"
                            >
                              REQUEST THIS SERVICE
                            </button>
                            <span className="font-mono text-[0.6rem] tracking-[0.16em] text-paper/40">
                              DELIVERY 5–15 DAYS
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      }

      /* =====================================================================
         SECTION 11: PROJECTS PORTFOLIO SECTION (ONGOING & DELIVERED)
      ===================================================================== */
      function ProjectsSection({ tab, setTab }) {
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const list = tab === "ongoing" ? ONGOING : DELIVERED;

        const TABS = [
          { key: "ongoing", label: "Ongoing projects", bn: "চলমান প্রজেক্ট", count: ONGOING.length },
          { key: "delivered", label: "Delivered projects", bn: "হস্তান্তরিত প্রজেক্ট", count: DELIVERED.length },
        ];

        const activeTabInfo = TABS.find((t) => t.key === tab);

        return (
          <section id="projects" className="relative border-t border-paper/10 bg-ink2/40 py-24 sm:py-28">
            <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="label text-[0.55rem] text-brass">Projects · 04</span>
                  <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
                    Built, being built, <span className="italic gold-text">believed in.</span>
                  </h2>
                </div>

                <div className="relative w-full max-w-md">
                  <span className="label mb-2 block text-[0.5rem] text-paper/45">Select Project Category</span>
                  <button
                    onClick={() => setDropdownOpen((o) => !o)}
                    className="flex w-full items-center justify-between gap-4 rounded-2xl border border-paper/15 bg-paper/[0.03] px-5 py-4 text-left transition hover:border-brass/40"
                  >
                    <span>
                      <span className="block font-display text-xl">{activeTabInfo.label}</span>
                      <span className="bn block text-xs text-paper/45">{activeTabInfo.bn}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="rounded-full border border-brass/40 px-3 py-1 font-mono text-xs text-brasslite">
                        {activeTabInfo.count}
                      </span>
                      <span className={`text-brass transition-transform ${dropdownOpen ? "rotate-180" : ""}`}>▼</span>
                    </span>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-brass/30 bg-ink2 shadow-2xl">
                      {TABS.map((t) => (
                        <button
                          key={t.key}
                          onClick={() => {
                            setTab(t.key);
                            setDropdownOpen(false);
                          }}
                          className={`flex w-full items-center justify-between border-b border-paper/10 px-5 py-4 text-left transition last:border-0 ${
                            tab === t.key ? "bg-brass/15 text-brasslite" : "hover:bg-paper/5"
                          }`}
                        >
                          <span>
                            <span className="block text-sm font-medium">{t.label}</span>
                            <span className="bn block text-xs text-paper/45">{t.bn}</span>
                          </span>
                          <span className="font-mono text-xs text-paper/45">{t.count} ITEMS</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((p) => (
                  <article
                    key={p.name}
                    className="group relative overflow-hidden rounded-2xl border border-paper/12 bg-ink flex flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full border border-paper/25 bg-ink/75 px-3 py-1 font-mono text-[0.58rem] tracking-[0.18em] text-paper/80 backdrop-blur">
                        {tab === "ongoing" ? "ON SITE" : "DELIVERED"}
                      </span>
                      <span className="absolute right-4 top-4 font-mono text-xs text-brasslite">{p.year}</span>
                      {tab === "ongoing" && typeof p.progress === "number" && (
                        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                          <div className="mb-1 flex justify-between font-mono text-[0.55rem] tracking-[0.2em] text-paper/75">
                            <span>PROGRESS</span>
                            <span>{p.progress}%</span>
                          </div>
                          <div className="h-1 w-full bg-paper/15 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-brass to-brasslite"
                              style={{ width: `${p.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display text-2xl leading-tight">{p.name}</h3>
                      {p.nameBn && <p className="bn mt-1 text-xs text-paper/50">{p.nameBn}</p>}
                      <p className="mt-3 text-xs text-paper/60">📍 {p.location}</p>
                      <p className="mt-1 text-xs text-paper/60">
                        📐 {p.area} · {p.type}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-paper/12 px-3 py-1 text-[0.65rem] text-paper/55"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={waLink(`Hello Heaven Studio, please share details of the project "${p.name}".`)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto pt-5 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.16em] text-brasslite hover:underline"
                      >
                        ASK ABOUT THIS PROJECT ↗
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      }

      /* =====================================================================
         SECTION 12: TWO-ROW LIVE SOCIAL FEED & CIRCULAR SOCIAL ICONS
         - Row 1: 3 Latest Videos from https://youtube.com/@heavenarchitects
         - Row 2: 3 Latest Contents from https://www.facebook.com/heavenarchitectsstudio
      ===================================================================== */
      function SocialFeedSection() {
        const [videos, setVideos] = useState(YT_SEED.slice(0, 3));
        const [fbPosts, setFbPosts] = useState(FB_SEED.slice(0, 3));
        const [playingId, setPlayingId] = useState(null);
        const [syncStatus, setSyncStatus] = useState("CONNECTING FEED");
        const [loading, setLoading] = useState(false);

        const fetchLatestYouTube = useCallback(async (forceRefresh = false) => {
          setLoading(true);
          try {
            const res = await fetch(`/api/social-feed${forceRefresh ? "?refresh=1" : ""}`, { cache: "no-store" });
            if (!res.ok) throw new Error("Feed API unavailable");
            const data = await res.json();
            if (Array.isArray(data.youtube) && data.youtube.length) setVideos(data.youtube.slice(0, 3));
            if (Array.isArray(data.facebook) && data.facebook.length) setFbPosts(data.facebook.slice(0, 3));
            setSyncStatus(data.facebook_live ? "LIVE SYNCED" : "YOUTUBE LIVE · FB SETUP NEEDED");
          } catch {
            // Static previews remain available when the backend is not running.
            setSyncStatus("PREVIEW MODE · START SERVER FOR LIVE FEED");
          } finally { setLoading(false); }
        }, []);

        useEffect(() => {
          fetchLatestYouTube();
          const timer = window.setInterval(fetchLatestYouTube, 15 * 60 * 1000);
          return () => window.clearInterval(timer);
        }, [fetchLatestYouTube]);

        const formatDate = (iso) => {
          try {
            return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
          } catch {
            return "";
          }
        };

        return (
          <section id="feed" className="relative border-t border-paper/10 py-24 sm:py-28">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(90% 60% at 15% 0%, rgba(255,0,51,0.07), transparent 60%), radial-gradient(80% 60% at 90% 10%, rgba(24,119,242,0.09), transparent 60%)",
              }}
            />

            <div className="relative mx-auto max-w-[1500px] px-5 sm:px-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <span className="label text-[0.55rem] text-brass">Live social feed · 05</span>
                  <h2 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
                    Fresh from the <span className="italic gold-text">drafting board</span>
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm text-paper/60">
                    Row 1 showcases our 3 latest architectural design films from{" "}
                    <a href={STUDIO.youtube} target="_blank" rel="noreferrer" className="text-brasslite underline">
                      @heavenarchitects
                    </a>
                    , and Row 2 highlights our 3 latest updates from{" "}
                    <a href={STUDIO.facebook} target="_blank" rel="noreferrer" className="text-brasslite underline">
                      facebook.com/heavenarchitectsstudio
                    </a>
                    .
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 rounded-full border border-paper/15 bg-paper/[0.03] px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-live animate-pulse" />
                    <span className="label text-[0.52rem] text-live">{syncStatus}</span>
                  </span>
                  <button
                    onClick={() => fetchLatestYouTube(true)}
                    className="rounded-full border border-paper/15 px-4 py-2 font-mono text-[0.65rem] tracking-[0.16em] text-paper/75 transition hover:border-brass/50 hover:text-brasslite"
                  >
                    {loading ? "SYNCING..." : "↻ REFRESH FEED"}
                  </button>
                </div>
              </div>

              {/* ROW 1: 3 LATEST YOUTUBE VIDEOS */}
              <div className="mt-12">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF0033] text-white">
                      <SocialSvg type="youtube" className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="label block text-[0.52rem] text-brass">Row 01 · YouTube Channel</span>
                      <h3 className="font-display text-2xl text-paper">Latest 3 Videos from @heavenarchitects</h3>
                    </div>
                  </div>
                  <a
                    href={`${STUDIO.youtube}?sub_confirmation=1`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#FF0033] px-4 py-2 text-[0.7rem] font-semibold tracking-[0.14em] text-white transition hover:brightness-110"
                  >
                    <SocialSvg type="youtube" className="h-3.5 w-3.5" /> SUBSCRIBE CHANNEL ↗
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {videos.slice(0, 3).map((v, idx) => (
                    <div
                      key={v.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-paper/12 bg-ink2 shadow-xl transition hover:border-[#FF0033]/50"
                    >
                      <div className="relative aspect-video w-full bg-black overflow-hidden">
                        {playingId === v.id ? (
                          <iframe
                            className="absolute inset-0 h-full w-full"
                            src={`https://www.youtube.com/embed/${v.id}?autoplay=1&rel=0`}
                            title={v.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <button
                            onClick={() => setPlayingId(v.id)}
                            className="relative block h-full w-full text-left"
                            aria-label={`Play ${v.title}`}
                          >
                            <img
                              src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                              alt={v.title}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                            <span className="absolute left-3 top-3 rounded-full bg-[#FF0033] px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.16em] text-white">
                              VIDEO 0{idx + 1}
                            </span>
                            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF0033] text-white shadow-[0_0_30px_rgba(255,0,51,0.6)] transition group-hover:scale-110">
                              ▶
                            </span>
                          </button>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex items-center justify-between font-mono text-[0.6rem] text-paper/45">
                            <span>{formatDate(v.date)}</span>
                            {v.views && <span>{v.views.toLocaleString()} views</span>}
                          </div>
                          <h4 className="bn mt-2 line-clamp-2 font-medium text-sm sm:text-base leading-snug text-paper group-hover:text-brasslite">
                            {v.title}
                          </h4>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-paper/10 pt-3">
                          <button
                            onClick={() => setPlayingId(v.id)}
                            className="text-[0.68rem] font-mono tracking-[0.14em] text-brasslite hover:underline"
                          >
                            {playingId === v.id ? "PLAYING NOW" : "▶ PLAY HERE"}
                          </button>
                          <a
                            href={`https://www.youtube.com/watch?v=${v.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[0.68rem] font-mono tracking-[0.14em] text-paper/60 hover:text-white"
                          >
                            YOUTUBE ↗
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROW 2: 3 LATEST FACEBOOK PAGE CONTENTS */}
              <div className="mt-14">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white">
                      <SocialSvg type="facebook" className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="label block text-[0.52rem] text-brass">Row 02 · Facebook Page</span>
                      <h3 className="font-display text-2xl text-paper">
                        Latest 3 Contents from /heavenarchitectsstudio
                      </h3>
                    </div>
                  </div>
                  <a
                    href={STUDIO.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#1877F2] px-4 py-2 text-[0.7rem] font-semibold tracking-[0.14em] text-white transition hover:brightness-110"
                  >
                    <SocialSvg type="facebook" className="h-3.5 w-3.5" /> FOLLOW FACEBOOK PAGE ↗
                  </a>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {fbPosts.slice(0, 3).map((post, idx) => (
                    <a
                      key={post.id}
                      href={post.url || STUDIO.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex flex-col overflow-hidden rounded-2xl border border-paper/12 bg-ink2 shadow-xl transition hover:border-[#1877F2]/60"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink">
                        <img
                          src={post.image || P(34378030)}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = P(34378030); }}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-[#1877F2] px-3 py-1 font-mono text-[0.55rem] tracking-[0.14em] text-white">
                          <SocialSvg type="facebook" className="h-3 w-3" /> FB POST 0{idx + 1}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="flex items-center justify-between text-xs text-[#4e93ff]">
                            <span className="font-medium">Heaven Studio</span>
                            <span className="font-mono text-[0.6rem] text-paper/45">{formatDate(post.date)}</span>
                          </div>
                          <h4 className="mt-2 font-display text-xl text-paper group-hover:text-brasslite">
                            {post.title}
                          </h4>
                          <p className="bn mt-2 line-clamp-3 text-xs sm:text-sm leading-relaxed text-paper/70">
                            {post.message}
                          </p>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-paper/10 pt-3 font-mono text-[0.62rem] text-paper/50">
                          <span>
                            👍 {post.likes} · 💬 {post.comments}
                          </span>
                          <span className="text-brasslite group-hover:underline">VIEW ON FB ↗</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* SIDE-BY-SIDE LITTLE CIRCLE SOCIAL MEDIA ICONS */}
              <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-brass/25 bg-paper/[0.03] px-6 py-6 sm:flex-row">
                <div>
                  <span className="label text-[0.52rem] text-brass">Connect with Heaven Studio</span>
                  <p className="mt-1 font-display text-2xl text-paper">Follow our official social channels</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      title={s.label}
                      aria-label={s.label}
                      className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-paper/20 bg-ink2 text-paper/85 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:text-white"
                      style={{
                        boxShadow: `0 4px 14px -4px ${s.color}66`,
                      }}
                    >
                      <span
                        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ backgroundColor: s.color }}
                      />
                      <span className="relative z-10">
                        <SocialSvg type={s.icon} className="h-4 w-4" />
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      }

      /* =====================================================================
         SECTION 13: CONTACT SECTION & FOOTER
      ===================================================================== */
      function ContactSection() {
        return (
          <section id="contact" className="relative border-t border-paper/10 bg-ink2/40 py-24 sm:py-28">
            <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
              <div className="max-w-2xl">
                <span className="label text-[0.55rem] text-brass">Contact · 06</span>
                <h2 className="bn mt-3 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-light leading-tight">
                  আপনার স্বপ্নের বাড়ির <span className="italic gold-text">ডিজাইন শুরু করবেন?</span>
                </h2>
                <p className="mt-3 text-sm text-paper/55">
                  Studio at Dhaka, Bangladesh — working nationwide across all 64 districts. Send your plot size and
                  requirement on WhatsApp and get a fee proposal the same day.
                </p>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
                <div className="relative overflow-hidden rounded-2xl border border-paper/12">
                  <iframe
                    title="Heaven Studio location — Dhaka, Bangladesh"
                    src={STUDIO.mapEmbed}
                    className="h-[400px] w-full lg:h-full lg:min-h-[480px]"
                    style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9) brightness(0.92)" }}
                    loading="lazy"
                  />
                  <a
                    href={STUDIO.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 right-4 rounded-full bg-paper px-5 py-3 text-[0.7rem] font-semibold tracking-[0.14em] text-ink transition hover:bg-brasslite"
                  >
                    OPEN IN GOOGLE MAPS ↗
                  </a>
                </div>

                <div className="rounded-2xl border border-brass/30 bg-brass/[0.06] p-7 flex flex-col justify-between">
                  <div>
                    <span className="label text-[0.5rem] text-brass">Direct Design Consultation</span>
                    <a
                      href={waLink()}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex items-center gap-4 rounded-xl border border-paper/10 bg-ink/70 p-4 transition hover:border-live/50"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-ink">
                        <SocialSvg type="whatsapp" className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-[0.65rem] tracking-[0.16em] text-paper/45">WHATSAPP / CALL</span>
                        <span className="block font-display text-2xl tracking-wide">{STUDIO.whatsappLocal}</span>
                      </span>
                      <span className="ml-auto text-live">↗</span>
                    </a>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <a
                        href={`tel:+${STUDIO.whatsappIntl}`}
                        className="flex items-center gap-3 rounded-xl border border-paper/10 bg-ink/40 p-4 text-xs text-paper/80 transition hover:border-brass/50"
                      >
                        📞 Call +{STUDIO.whatsappIntl}
                      </a>
                      <a
                        href={`mailto:${STUDIO.email}`}
                        className="flex items-center gap-3 rounded-xl border border-paper/10 bg-ink/40 p-4 text-xs text-paper/80 truncate transition hover:border-brass/50"
                      >
                        ✉️ {STUDIO.email}
                      </a>
                    </div>

                    <div className="mt-6 border-t border-paper/10 pt-5">
                      <p className="font-display text-2xl leading-tight">
                        Heaven STUDIO <span className="bn text-brasslite">| {STUDIO.nameBn}</span>
                      </p>
                      <p className="mt-1 text-xs text-paper/60">Founder: {FOUNDER.name}</p>
                      <p className="mt-3 text-xs text-paper/60">📍 Dhaka, Bangladesh — site visits in all 64 districts</p>
                      <p className="mt-1.5 text-xs text-paper/60">🕘 {STUDIO.hours}</p>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-paper/10 pt-5">
                    <span className="label block text-[0.48rem] text-paper/45 mb-3">Official Social Links</span>
                    <div className="flex flex-wrap items-center gap-2">
                      {SOCIAL_LINKS.map((s) => (
                        <a
                          key={s.label}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          title={s.label}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 bg-ink text-paper/75 transition hover:border-brass hover:text-brasslite"
                        >
                          <SocialSvg type={s.icon} className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      function Footer({ onSelectService }) {
        const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        return (
          <footer className="relative overflow-hidden border-t border-paper/10 bg-ink pt-16 pb-24">
            <div className="mx-auto max-w-[1500px] px-5 sm:px-7">
              <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
                <div>
                  <LogoLockup />
                  <p className="mt-4 max-w-sm text-xs leading-relaxed text-paper/55">{STUDIO.tagline}</p>
                  <p className="bn mt-1 text-xs text-brasslite">{STUDIO.taglineBn}</p>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {SOCIAL_LINKS.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        title={s.label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 bg-ink2 text-paper/75 transition hover:border-brass hover:bg-brass hover:text-ink"
                      >
                        <SocialSvg type={s.icon} className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="label text-[0.5rem] text-brass">Navigate</span>
                  <ul className="mt-4 space-y-2.5">
                    {NAV.map((n) => (
                      <li key={n.id}>
                        <button
                          onClick={() => go(n.id)}
                          className="text-sm text-paper/60 transition hover:text-brasslite"
                        >
                          {n.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="label text-[0.5rem] text-brass">Services</span>
                  <ul className="mt-4 space-y-2">
                    {SERVICES.slice(0, 7).map((s, idx) => (
                      <li key={s.title}>
                        <button
                          onClick={() => onSelectService(idx)}
                          className="text-left text-xs text-paper/55 transition hover:text-brasslite"
                        >
                          {s.emoji} {s.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="label text-[0.5rem] text-brass">Reach us</span>
                  <ul className="mt-4 space-y-2.5 text-xs text-paper/60">
                    <li>Founder: {FOUNDER.name}</li>
                    <li>
                      <a href={`mailto:${STUDIO.email}`} className="break-all hover:text-brasslite">
                        {STUDIO.email}
                      </a>
                    </li>
                    <li>
                      <a href={`tel:+${STUDIO.whatsappIntl}`} className="hover:text-brasslite">
                        +{STUDIO.whatsappIntl}
                      </a>
                    </li>
                    <li>{STUDIO.city}</li>
                  </ul>
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="mt-6 rounded-full border border-paper/15 px-4 py-2 text-[0.65rem] tracking-[0.16em] text-paper/60 transition hover:border-brass/50 hover:text-brasslite"
                  >
                    ↑ BACK TO TOP
                  </button>
                </div>
              </div>

              <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-paper/10 pt-6 sm:flex-row font-mono text-[0.62rem] tracking-[0.14em] text-paper/40">
                <p>© {new Date().getFullYear()} HEAVEN STUDIO · ALL DRAWINGS COPYRIGHT PROTECTED</p>
                <p>FOUNDED BY ARCHITECT ATIKUR RAHMAN (AKASH)</p>
              </div>
            </div>
          </footer>
        );
      }

      /* =====================================================================
         SECTION 14: HEAVEN AI ASSISTANT & FLOATING WHATSAPP DOCK
      ===================================================================== */
      function HeavenAIAssistant() {
        const [aiOpen, setAiOpen] = useState(false);
        const [input, setInput] = useState("");
        const [msgs, setMsgs] = useState([
          {
            from: "ai",
            text: "Assalamu Alaikum! Welcome to Heaven Studio (founded by Architect Atikur Rahman Akash). Ask me about our 11 services, design fees, RAJUK approval or delivery timeline.",
          },
        ]);

        const QUICK_CHIPS = ["Services & price", "Founder info", "RAJUK approval", "Delivery time"];

        const generateReply = (q) => {
          const lower = q.toLowerCase();
          if (lower.includes("price") || lower.includes("fee") || lower.includes("cost") || lower.includes("service")) {
            return "Typical Residential Design Fee Guide:\n• Architectural + 3D: ~25 BDT/sft\n• Structural Design: ~14 BDT/sft\n• Full MEP: ~18 BDT/sft\n• Interior Design: ~45 BDT/sft\nMessage us on WhatsApp (01511-280698) with your plot size for an exact quotation.";
          }
          if (
            lower.includes("founder") ||
            lower.includes("akash") ||
            lower.includes("atikur") ||
            lower.includes("architect")
          ) {
            return "Heaven Studio was founded by Architect Atikur Rahman (Akash), Principal Architect. He personally oversees architectural planning, BNBC compliance, and design quality across all projects.";
          }
          if (lower.includes("rajuk") || lower.includes("approval")) {
            return "We prepare the full RAJUK / CDA / KDA submission drawing set, structural certificates, and soil report annexures, and follow up until your plan is approved.";
          }
          if (lower.includes("time") || lower.includes("delivery")) {
            return "Typical delivery: Concept & floor plan 5–7 days, full working drawing set 10–15 days, 3D views 4–8 days, walkthrough film 7–12 days.";
          }
          return "Thank you for your message! You can explore our 11 services above or chat directly with Architect Atikur Rahman (Akash) & team on WhatsApp at 01511-280698.";
        };

        const sendMsg = (textToSend) => {
          const userQ = textToSend.trim();
          if (!userQ) return;
          setMsgs((m) => [...m, { from: "me", text: userQ }, { from: "ai", text: generateReply(userQ) }]);
          setInput("");
        };

        return (
          <>
            {/* Bottom-Left WhatsApp Quick Button */}
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-glow fixed bottom-5 left-5 z-[450] flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-ink shadow-[0_10px_30px_rgba(37,211,102,0.5)] transition hover:brightness-110"
            >
              <SocialSvg type="whatsapp" className="h-5 w-5" />
              <span className="hidden text-[0.68rem] font-semibold tracking-[0.14em] sm:inline">WHATSAPP</span>
            </a>

            {/* Bottom-Left Email Quick Button */} 
            <a 
              href={`mailto:${STUDIO.email}`} 
              className="heaven-glow fixed bottom-20 left-5 z-[450] flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] px-4 py-3 text-ink shadow-[0_10px_30px_rgba(201,160,90,0.5)] transition hover:brightness-110" 
             aria-label="Email Heaven Studio" 
            > 
              <span className="text-lg" 
              aria-hidden="true">✉</span> 
              <span className="text-[0.68rem] font-semibold tracking-[0.14em]">EMAIL</span> 
            </a>

            {/* Bottom-Right Heaven AI Launcher */}
            <button
              onClick={() => setAiOpen((o) => !o)}
              className="heaven-glow fixed bottom-5 right-5 z-[450] flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] px-5 py-3 text-ink shadow-[0_10px_30px_rgba(201,160,90,0.6)] transition hover:brightness-110"
            >
              <span className="text-sm font-bold">{aiOpen ? "✕" : "✦"}</span>
              <span className="text-[0.68rem] font-semibold tracking-[0.14em]">
                {aiOpen ? "CLOSE" : "ASK HEAVEN AI"}
              </span>
            </button>

            {aiOpen && (
              <div className="fixed bottom-20 right-5 z-[460] flex h-[450px] w-[min(92vw,370px)] flex-col overflow-hidden rounded-2xl border border-brass/30 bg-ink2 shadow-2xl">
                <div className="flex items-center justify-between border-b border-paper/10 bg-ink px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <LogoImage className="h-7 w-7 rounded-md" />
                    <div>
                      <span className="block text-xs font-semibold text-paper">Heaven Studio AI</span>
                      <span className="block font-mono text-[0.55rem] text-live">● ONLINE · বাংলা / EN</span>
                    </div>
                  </div>
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-brass/40 px-2.5 py-1 text-[0.58rem] text-brasslite"
                  >
                    WHATSAPP
                  </a>
                </div>

                <div className="flex-1 space-y-3 overflow-y-auto p-4 text-xs">
                  {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                          m.from === "me"
                            ? "bg-paper/15 text-paper"
                            : "border border-brass/25 bg-brass/10 text-paper/90"
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Chips */}
                <div className="flex gap-1.5 overflow-x-auto border-t border-paper/10 px-3 py-2">
                  {QUICK_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => sendMsg(chip)}
                      className="shrink-0 rounded-full border border-paper/15 px-2.5 py-1 text-[0.62rem] text-paper/65 hover:border-brass/50 hover:text-brasslite"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMsg(input);
                  }}
                  className="flex gap-2 border-t border-paper/10 p-3"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about price, founder, RAJUK..."
                    className="input-field py-2 text-xs"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-brass px-4 text-xs font-semibold text-ink hover:bg-brasslite"
                  >
                    Send
                  </button>
                </form>
              </div>
            )}
          </>
        );
      }

      /* =====================================================================
         SECTION 15: PROJECT ENQUIRY MODAL ("TRY NOW") & MAIN APP ROOT
      ===================================================================== */
      function TryNowModal({ open, onClose }) {
        const TYPES = [
          "Residential house",
          "Duplex / Villa",
          "Apartment block",
          "Commercial / Office",
          "Interior only",
          "3D only",
        ];
        const BUDGETS = ["Under 5 lakh", "5 – 15 lakh", "15 – 40 lakh", "40 lakh +"];
        const [form, setForm] = useState({
          name: "",
          phone: "",
          type: TYPES[0],
          service: SERVICES[0].title,
          plot: "",
          budget: BUDGETS[1],
          notes: "",
        });

        if (!open) return null;

        const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

        const submit = (e) => {
          e.preventDefault();
          const msg =
            `*New Project Enquiry — Heaven Studio*\n` +
            `Name: ${form.name}\nPhone: ${form.phone}\nProject type: ${form.type}\n` +
            `Service needed: ${form.service}\nPlot / area: ${form.plot}\nBudget: ${form.budget}\n` +
            (form.notes ? `Notes: ${form.notes}\n` : "") +
            `\nPlease share a design consultation & quotation.`;
          window.open(waLink(msg), "_blank");
          onClose();
        };

        return (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} />
            <form
              onSubmit={submit}
              className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-brass/30 bg-ink2 p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-paper/10 pb-4">
                <div className="flex items-center gap-3">
                  <LogoImage className="h-9 w-9 rounded-lg" />
                  <div>
                    <span className="block font-display text-2xl">Start your project</span>
                    <span className="label text-[0.52rem] text-brass">Free design consultation</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-paper/15 px-3 py-1 text-sm text-paper/70 hover:text-paper"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="label mb-1.5 block text-[0.52rem] text-paper/50">Your Name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="e.g. Rafiq Hasan"
                      className="input-field"
                    />
                  </label>
                  <label className="block">
                    <span className="label mb-1.5 block text-[0.52rem] text-paper/50">WhatsApp Number</span>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="input-field"
                    />
                  </label>
                </div>

                <div>
                  <span className="label mb-1.5 block text-[0.52rem] text-paper/50">Project Type</span>
                  <div className="flex flex-wrap gap-2">
                    {TYPES.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => set("type", t)}
                        className={`rounded-full border px-3.5 py-1.5 text-xs transition ${
                          form.type === t
                            ? "border-brass bg-brass/20 text-brasslite"
                            : "border-paper/15 text-paper/60 hover:border-paper/35"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="label mb-1.5 block text-[0.52rem] text-paper/50">Service Needed</span>
                    <select value={form.service} onChange={(e) => set("service", e.target.value)} className="input-field">
                      {SERVICES.map((s) => (
                        <option key={s.title} value={s.title} className="bg-ink2">
                          {s.emoji} {s.title}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="label mb-1.5 block text-[0.52rem] text-paper/50">Plot Size / Area</span>
                    <input
                      value={form.plot}
                      onChange={(e) => set("plot", e.target.value)}
                      placeholder="e.g. 5 Katha, Dhaka"
                      className="input-field"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="label mb-1.5 block text-[0.52rem] text-paper/50">Project Notes</span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Floor count, bedrooms, facing or special requirements..."
                    className="input-field resize-none"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-[#8a6a33] via-[#e8cc92] to-[#8a6a33] py-4 text-xs font-semibold tracking-[0.18em] text-ink transition hover:brightness-110"
                >
                  SEND BRIEF ON WHATSAPP ↗
                </button>
              </div>
            </form>
          </div>
        );
      }

      function App() {
        const [loading, setLoading] = useState(true);
        const [tryOpen, setTryOpen] = useState(false);
        const [serviceOpenIndex, setServiceOpenIndex] = useState(0);
        const [projectTab, setProjectTab] = useState("ongoing");

        const handleSelectServiceFromNav = (idx) => {
          setServiceOpenIndex(idx);
          const el = document.getElementById("services");
          if (el) el.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            document.getElementById(`svc-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 350);
        };

        const handleSelectProjectTabFromNav = (tabKey) => {
          setProjectTab(tabKey);
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        };

        return (
          <div className="relative min-h-screen bg-ink text-paper">
            {loading && <Preloader onDone={() => setLoading(false)} />}

            <Navbar
              onTryNow={() => setTryOpen(true)}
              onSelectService={handleSelectServiceFromNav}
              onSelectProjectTab={handleSelectProjectTabFromNav}
            />

            <main>
              <HomeSection onTryNow={() => setTryOpen(true)} />
              <AboutSection />
              <ServicesSection openIndex={serviceOpenIndex} setOpenIndex={setServiceOpenIndex} />
              <ProjectsSection tab={projectTab} setTab={setProjectTab} />
              <SocialFeedSection />
              <ContactSection />
            </main>

            <Footer onSelectService={handleSelectServiceFromNav} />
            <HeavenAIAssistant />
            <TryNowModal open={tryOpen} onClose={() => setTryOpen(false)} />
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById("root"));
      root.render(<App />);
