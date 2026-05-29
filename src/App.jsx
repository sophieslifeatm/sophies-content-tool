import { useEffect, useMemo, useState } from "react";

const DEFAULT_DATA = {
  handle: "@sophieslifeatm",
  followers: 7905,
  followerGoal: 10000,
  likesTotal: "525.5K",
  views7d: "1.09M",
  views28d: "1.3M",
  views60d: "1.7M+",
  profileViews7d: "13,065",
  profileViews28d: "21K",
  profileViews60d: "32K",
  likes7d: "194,864",
  comments7d: "941",
  shares7d: "16,052",
  likes60d: "234K",
  comments60d: "4,685",
  shares60d: "17K",
  netFollowers7d: 693,
  engagementRate: "13.1%",
  femaleAudience: "75%",
  maleAudience: "23%",
  otherAudience: "2%",
  bestPostTimes: "4 PM, 6 PM, 9 PM",
  shopmyEarned2026: "$1,681",
  shopmyLifetime: "$1,681",
  shopmyPending: "$1,148",
  shopmyUpcoming: "$250",
  shopmyPaid: "$284",
  shopmyClicksToday: 362,
  trustedShoppers: 404,
  shopmyTier: "Icon 89",
  juneShopMyGoal: "$1,000",
  juneGiftingGoal: 25,
  juneGiftingCurrent: 10,
  juneGiftingNeeded: 15,
  junePaidCollabGoal: 4,
  junePaidCollabCurrent: 0,
  junePaidCollabRevenueGoal: "$1,000+",
  warmLeads: "Glossier, Josie Maran",
  activeInsight: "Fashion gets views + ShopMy revenue. Creator/PR tips convert followers. Lifestyle builds trust. Brand outreach is converting quickly with 10 confirmed gifting partnerships and 2 warm leads."
};

const START_BRANDS = [
  ["Divi", "Gifting"], ["Salt & Stone", "Gifting"], ["Saltair", "Gifting"], ["Prequel", "Gifting"], ["Sacheu Beauty", "Gifting"],
  ["Merit Beauty", "Gifting"], ["Cyklar", "Gifting"], ["Grey Bandit", "Gifting"], ["Sincerely Yours", "Gifting"], ["L'Occitane", "Gifting"],
  ["Glossier", "Warm Lead"], ["Josie Maran", "Warm Lead"], ["Naturium", "PR List"], ["Paula's Choice", "Not Now"],
  ["Target", "Sent"], ["Aveda", "Sent"], ["BaubleBar", "Sent"], ["Rare Beauty", "Sent"], ["Gap", "Sent"], ["Aritzia", "Sent"],
  ["Summer Fridays", "Sent"], ["Kosas", "Sent"], ["Tower 28", "Sent"], ["Crown Affair", "Sent"], ["Dibs Beauty", "Sent"], ["Shark Ninja", "Sent"],
  ["Charlotte Tilbury", "Sent"], ["Free People", "Sent"], ["American Eagle", "Sent"], ["Aerie", "Sent"], ["Hollister", "Sent"], ["Garage", "Sent"]
].map(([name, status]) => ({ name, status }));

const WINNERS = [
  { title: "Target Matching Set Haul", metric: "1.06M views · 601 followers", tag: "viral haul", note: "Your strongest format: affordable fashion, simple try-on, clear follow CTA, and high ShopMy conversion." },
  { title: "Morning of Self-Care", metric: "502.7K views", tag: "lifestyle reach", note: "Aesthetic lifestyle works for awareness and trust-building between hauls." },
  { title: "Haircut / Brunette Bob", metric: "426.6K views", tag: "transformation", note: "Transformation and aesthetic decision content can reach outside your core audience." },
  { title: "Princess Polly Spring Finds", metric: "152.3K views", tag: "brand proof", note: "Partner content works when it feels organic and try-on based." },
  { title: "Amazon / SUUKSESS Spring Top Haul", metric: "121.9K views", tag: "affordable fashion", note: "Affordable Amazon fashion and Skims-dupe framing is a repeatable winner." },
  { title: "PR Haul Tips", metric: "24.2K views · 454 followers", tag: "follower converter", note: "Lower views, but extremely strong follower conversion. Keep using this as a growth pillar." }
];

const CONTENT_BOARD = [
  { title: "Film next", items: ["Target/Wild Fable summer haul", "PR haul: what came this week", "Marshalls summer haul"] },
  { title: "Post style", items: ["Fast try-on", "Simple text overlay", "Natural caption + ShopMy mention"] },
  { title: "Best CTAs", items: ["follow for more hauls like this", "linked in my ShopMy", "which one would you wear?"] }
];

const DREAM_BRANDS = ["Victoria Beckham Beauty", "Kosas", "Summer Fridays", "Crown Affair", "Rhode", "Tower 28", "Glossier", "Rare Beauty"];

const PLAN = [
  ["Completed", "Gap Matching Set Haul", "Posted May 29 · quick no-talking try-on", "test if music-only try-on beats talking version", "✅"],
  ["Haul", "Target Finds of the Week: Wild Fable summer haul", "Link every Target item + pin Target collection", "follow for more Target finds 🤍", "🛍️"],
  ["Tips", "How I got PR with under 10K followers", "Creator audience, no links needed", "follow for more microinfluencer tips ✨", "💌"],
  ["Haul", "Amazon summer tops under $30", "Amazon storefront + ShopMy collection", "follow for more affordable finds 🛍️", "🛒"],
  ["PR", "PR haul: what brands sent me this week", "Merit, Cyklar, Grey Bandit, L'Occitane, Sincerely Yours", "which package would you open first?", "📦"],
  ["Lifestyle", "Morning room reset + product mentions", "Room decor, fragrance, body care links", "follow for more room inspo ☁️", "☁️"],
  ["Haul", "Marshalls summer haul", "Link similar finds and affordable alternatives", "follow for more summer finds", "🌷"],
  ["Beauty", "Everyday beauty routine with recent PR", "Link the exact products used", "follow for more honest beauty reviews", "🫧"],
  ["Tips", "What I send brands for gifting", "No links needed", "follow for part 2", "✍️"],
  ["ShopMy", "How I organize my ShopMy for followers", "Mention collections + best sellers", "follow for creator tips", "🔗"],
  ["Haul", "Aritzia-inspired summer outfits", "Link Aritzia and affordable dupes", "follow for more outfit inspo", "👚"],
  ["Lifestyle", "Spend the morning with me: pool, errands, reset", "OOTD + wellness products", "follow for daily life", "🍵"],
  ["Tips", "How one viral video changed my ShopMy", "Use Target sales as proof", "follow for more behind the scenes", "📈"],
  ["Haul", "Top 10 ShopMy picks right now", "Feature best converters", "shop my links in bio", "⭐"]
];

const STATUS = {
  Gifting: { emoji: "🎁", bg: "#e4f3df", color: "#466d3d" },
  "Warm Lead": { emoji: "✨", bg: "#fff0c9", color: "#8a5b00" },
  "PR List": { emoji: "📋", bg: "#eae3f5", color: "#65548a" },
  Paid: { emoji: "💸", bg: "#f7dde5", color: "#8d3b56" },
  Sent: { emoji: "✉️", bg: "#f8edf0", color: "#9b6878" },
  "Not Now": { emoji: "⏸️", bg: "#eeeeee", color: "#6f6f6f" },
};

const TABS = ["Dashboard", "Ideas", "Captions", "ShopMy", "Plan", "Brands", "Update"];
const STORAGE_DATA = "sophieCreatorDataV5";
const STORAGE_BRANDS = "sophieBrandsV5";

function readData() {
  try {
    const saved = localStorage.getItem(STORAGE_DATA);
    return saved ? { ...DEFAULT_DATA, ...JSON.parse(saved) } : DEFAULT_DATA;
  } catch {
    return DEFAULT_DATA;
  }
}

function Progress({ value, max, label, detail }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="progress-card">
      <div className="progress-top"><span>{label}</span><strong>{detail || `${value}/${max}`}</strong></div>
      <div className="bar"><div style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("Dashboard");
  const [data, setData] = useState(readData());
  const [draft, setDraft] = useState(JSON.stringify(readData(), null, 2));
  const [brands, setBrands] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_BRANDS)) || START_BRANDS; } catch { return START_BRANDS; }
  });
  const [brandFilter, setBrandFilter] = useState("All");
  const [brandSearch, setBrandSearch] = useState("");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => localStorage.setItem(STORAGE_BRANDS, JSON.stringify(brands)), [brands]);
  const remaining = Math.max(0, data.followerGoal - Number(data.followers || 0));
  const giftingCurrent = brands.filter(b => b.status === "Gifting").length || Number(data.juneGiftingCurrent || 10);
  const warmLeadCount = brands.filter(b => b.status === "Warm Lead").length || 2;
  const paidCurrent = Number(data.junePaidCollabCurrent || 0);

  const filteredBrands = useMemo(() => brands.filter(b => {
    const byFilter = brandFilter === "All" || b.status === brandFilter;
    const bySearch = b.name.toLowerCase().includes(brandSearch.toLowerCase());
    return byFilter && bySearch;
  }), [brands, brandFilter, brandSearch]);

  function saveData() {
    try {
      const parsed = JSON.parse(draft);
      localStorage.setItem(STORAGE_DATA, JSON.stringify(parsed));
      setData({ ...DEFAULT_DATA, ...parsed });
      alert("Saved!");
    } catch {
      alert("Something is wrong with the JSON. Check commas and quotes.");
    }
  }

  function quickGenerate(kind) {
    const text = prompt.toLowerCase();
    if (kind === "ideas") {
      setResult(`1. ${text || "Target haul part 2"}\nHook: follow for haul videos like these 🤍\nWhy it works: It repeats your 1M+ affordable fashion format and gives people a clear reason to follow.\nShopMy angle: Pin the collection and say everything is linked in bio.\n\n2. PR haul: brands that said yes this week\nHook: I got 10 gifting yeses with under 10K followers\nWhy it works: Your PR tip videos convert followers really well.\n\n3. Spend the morning with me + PR products\nHook: slow morning reset after a chaotic week ☁️\nWhy it works: Lifestyle builds trust and gives brands a natural integration.\n\n4. Top 5 things followers bought from my ShopMy\nHook: these are the exact pieces my followers keep buying\nWhy it works: Social proof + shopping intent.\n\n5. Affordable summer outfits under $40\nHook: outfits that look more expensive than they are\nWhy it works: Affordable fashion is your strongest reach category.`);
    } else if (kind === "caption") {
      setResult(`Option 1\nso obsessed with these finds 🤍 everything is linked in my ShopMy in bio!! follow for more hauls like this 🫶\n#tryonhaul #summeroutfits #affordablefashion #shopmy #haul\n\nOption 2\nquick little haul because these were too cute not to share ☁️ linked everything in my ShopMy in bio!! follow for more affordable finds 🤍\n#fashionhaul #tryonhaul #summerfashion #outfitinspo`);
    } else {
      setResult(`Best move: put your strongest converters first.\n\n1. Pin a Target/Wild Fable collection at the top of ShopMy.\n2. Make a “things from my viral videos” collection.\n3. In captions, use: “linked everything in my ShopMy in bio 🔗”\n4. After every haul, add a comment saying: “links are under my ShopMy in bio 🤍”\n5. Keep affordable fashion first because it is driving the most orders and clicks.`);
    }
  }

  return (
    <div className="page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700;800&display=swap');
        :root{--ink:#2f2324;--brown:#5a3f3b;--rose:#c990a3;--rose2:#f7e4ea;--blush:#fff5f7;--cream:#fffaf2;--sage:#dfead9;--blue:#e8edf7;--line:#edd6dc;--muted:#897477;}
        *{box-sizing:border-box} body{margin:0}.page{min-height:100vh;background:linear-gradient(135deg,#fffaf2 0%,#fff5f7 47%,#f8f3ff 100%);color:var(--ink);font-family:Inter,system-ui,sans-serif}.hero{padding:18px 18px 34px;background:var(--cream);border-bottom:1px solid var(--line)}.moodboard{max-width:1180px;margin:0 auto 22px;display:grid;grid-template-columns:1.4fr .9fr .9fr 1.1fr 1fr;gap:10px;height:126px}.tile{border-radius:22px;background-size:cover;background-position:center;box-shadow:0 12px 34px rgba(137,83,99,.12);border:1px solid rgba(255,255,255,.8);position:relative;overflow:hidden}.tile:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent,rgba(68,38,43,.18))}.tile span{position:absolute;left:14px;bottom:12px;color:white;font-weight:800;text-shadow:0 2px 10px rgba(0,0,0,.25);z-index:1}.tile.one{background:linear-gradient(135deg,#f4cbd8,#fff0d6)}.tile.two{background:linear-gradient(135deg,#e5eadb,#fff4f6)}.tile.three{background:linear-gradient(135deg,#f7dde4,#fff9f1)}.tile.four{background:linear-gradient(135deg,#f0d2df,#e8edf7)}.tile.five{background:linear-gradient(135deg,#f8eac9,#f7dce6)}.hero-inner{max-width:1180px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:24px;align-items:end}.eyebrow{letter-spacing:7px;color:#a77c85;font-size:12px;text-transform:lowercase}.title{font-family:'DM Serif Display',serif;color:#332224;font-size:62px;line-height:.92;margin:8px 0 12px}.subtitle{color:var(--muted);font-size:16px}.hero-card{background:rgba(255,255,255,.74);border:1px solid var(--line);border-radius:30px;padding:20px;box-shadow:0 22px 70px rgba(126,69,86,.11);backdrop-filter:blur(16px)}.stat-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.stat{background:linear-gradient(135deg,#fff,#fff7fa);border:1px solid #f2d8df;border-radius:22px;padding:18px;text-align:center}.stat strong{font-family:'DM Serif Display';display:block;color:#8d3b56;font-size:32px;line-height:1}.stat span{color:#9f7f88;text-transform:uppercase;font-size:11px;letter-spacing:1.4px;font-weight:800}.tabs{position:sticky;top:0;z-index:5;background:rgba(255,250,246,.88);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);padding:10px 18px;display:flex;gap:10px;overflow:auto}.tabs button{border:1px solid transparent;background:transparent;color:#8f7078;border-radius:999px;padding:10px 16px;font-weight:700;cursor:pointer;white-space:nowrap}.tabs button.active{background:white;border-color:#edc8d3;color:#9b3154;box-shadow:0 8px 24px rgba(127,37,70,.08)}.wrap{max-width:1180px;margin:0 auto;padding:34px 20px 80px}.grid{display:grid;grid-template-columns:.95fr 1.05fr;gap:22px}.grid-three{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.card{background:rgba(255,255,255,.76);border:1px solid var(--line);border-radius:28px;padding:24px;box-shadow:0 18px 55px rgba(127,37,70,.07);backdrop-filter:blur(12px);margin-bottom:20px}.card h2,.card h3,.section-title{font-family:'DM Serif Display',serif;font-size:34px;margin:0 0 14px;color:#8d3b56}.tiny-label{font-size:12px;text-transform:uppercase;letter-spacing:1.5px;color:#aa8990;font-weight:900}.metric{border-radius:24px;padding:22px;background:#fff}.metric.pink{background:linear-gradient(135deg,#f9e4ee,#fff7fa)}.metric.blue{background:linear-gradient(135deg,#e9eefc,#f7f9ff)}.metric.sage{background:linear-gradient(135deg,#e3f1df,#f9fff7)}.metric.cream{background:linear-gradient(135deg,#fff1cb,#fffaf0)}.metric strong{font-family:'DM Serif Display';font-size:38px;color:#8d3b56;display:block}.metric span{text-transform:uppercase;font-weight:800;font-size:12px}.progress-card{margin:14px 0}.progress-top{display:flex;justify-content:space-between;font-weight:800;margin-bottom:7px}.bar{height:13px;background:#f4dfe5;border-radius:999px;overflow:hidden}.bar div{height:100%;background:linear-gradient(90deg,#b7798c,#e7aebe);border-radius:999px}.pill-row{display:flex;flex-wrap:wrap;gap:9px}.pill{border:1px solid #edc5d0;border-radius:999px;padding:9px 14px;background:white;color:#9b3154;font-weight:700}.winner{display:grid;grid-template-columns:92px 1fr;gap:16px;padding:16px 0;border-bottom:1px solid #f3d8e2}.winner:last-child{border-bottom:0}.thumb{height:92px;border-radius:20px;background:linear-gradient(135deg,#f3d7df,#fdf3e5);display:grid;place-items:center;font-size:28px}.winner b{font-size:18px}.winner em{display:block;color:#a63c5e;font-style:normal;font-weight:800;margin:4px 0}.idea-card{background:#fff;border:1px solid #f1d4de;border-radius:24px;padding:22px;margin-bottom:16px}.idea-card small{color:#9b3154;text-transform:uppercase;font-weight:800}.textarea{width:100%;min-height:150px;border:1px solid #edc5d0;background:rgba(255,255,255,.75);border-radius:24px;padding:20px;font-size:16px;font-family:Inter;outline:none}.btn{width:100%;border:0;background:linear-gradient(135deg,#b7798c,#8d3b56);color:white;border-radius:999px;padding:16px 22px;font-size:16px;font-weight:800;margin:14px 0;cursor:pointer;box-shadow:0 12px 30px rgba(127,37,70,.16)}.result{white-space:pre-wrap;font-size:16px;line-height:1.65}.brand-row{display:flex;align-items:center;justify-content:space-between;background:white;border:1px solid #f1d4de;border-radius:22px;padding:16px 18px;margin:10px 0}.badge{border-radius:999px;padding:8px 12px;font-weight:800}.brand-controls{display:grid;grid-template-columns:1fr;gap:12px;margin:16px 0}.brand-controls input{border:1px solid #edc5d0;border-radius:18px;padding:14px 16px;font-size:16px}.json{font-family:ui-monospace,monospace;min-height:480px;font-size:14px;line-height:1.45}.plan-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.plan-card{background:white;border:1px solid #f1d4de;border-radius:25px;padding:22px}.plan-card.done{background:linear-gradient(135deg,#fff8fb,#eef7ea);border-color:#d9ead3}.plan-type{display:inline-block;color:#9b3154;font-weight:900;margin-bottom:8px}.soft{background:#fff8fb;border:1px solid #f1d4de;border-radius:24px;padding:20px}.soft b{color:#9b3154}.muted{color:var(--muted);line-height:1.6}.dream-board{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.dream{border-radius:22px;border:1px solid #f1d4de;background:linear-gradient(135deg,#fff,#fff1f5);padding:20px;min-height:100px;display:flex;align-items:end;font-weight:800;color:#7b4d59}@media(max-width:900px){.hero-inner,.grid,.grid-three,.plan-grid{grid-template-columns:1fr}.moodboard{grid-template-columns:1fr 1fr 1fr;height:180px}.title{font-size:42px}.wrap{padding:22px 14px}.card{padding:20px;border-radius:24px}.stat strong{font-size:26px}.metric strong{font-size:30px}.tabs{padding:8px 10px}.tabs button{padding:9px 12px}.dream-board{grid-template-columns:1fr 1fr}.winner{grid-template-columns:70px 1fr}.thumb{height:70px}}
      `}</style>

      <header className="hero">
        <div className="moodboard">
          <div className="tile one"><span>room reset</span></div>
          <div className="tile two"><span>PR days</span></div>
          <div className="tile three"><span>try-ons</span></div>
          <div className="tile four"><span>ShopMy</span></div>
          <div className="tile five"><span>10K era</span></div>
        </div>
        <div className="hero-inner">
          <div>
            <div className="eyebrow">{data.handle.replace('@','@ ')}</div>
            <h1 className="title">Sophie's Creator Studio</h1>
            <p className="subtitle">Notion-style creator workspace with Pinterest touches for content, gifting, ShopMy, and 10K growth.</p>
          </div>
          <div className="hero-card">
            <div className="stat-grid">
              <div className="stat"><strong>{Number(data.followers).toLocaleString()}</strong><span>followers</span></div>
              <div className="stat"><strong>{data.views60d}</strong><span>views 60d</span></div>
              <div className="stat"><strong>{giftingCurrent}/25</strong><span>gifting</span></div>
              <div className="stat"><strong>{data.shopmyLifetime}</strong><span>ShopMy</span></div>
            </div>
          </div>
        </div>
      </header>

      <nav className="tabs">{TABS.map(t => <button className={tab===t?'active':''} key={t} onClick={() => setTab(t)}>{t==='Dashboard'?'📌 ':t==='Ideas'?'💡 ':t==='Captions'?'✍️ ':t==='ShopMy'?'🛍️ ':t==='Plan'?'📅 ':t==='Brands'?'📊 ':'⚙️ '}{t}</button>)}</nav>

      <main className="wrap">
        {tab === "Dashboard" && <>
          <div className="grid">
            <section className="card">
              <span className="tiny-label">quick view</span>
              <h2>Today’s Creator HQ</h2>
              <div className="grid-three" style={{gridTemplateColumns:'1fr 1fr'}}>
                <div className="metric pink"><strong>{remaining.toLocaleString()}</strong><span>followers to 10K</span></div>
                <div className="metric sage"><strong>{giftingCurrent}/25</strong><span>gifting partners</span></div>
                <div className="metric blue"><strong>{warmLeadCount}</strong><span>warm leads</span></div>
                <div className="metric cream"><strong>{data.shopmyLifetime}</strong><span>ShopMy lifetime</span></div>
              </div>
            </section>
            <section className="card">
              <span className="tiny-label">june goals</span>
              <h2>Glow Up Tracker</h2>
              <Progress value={Number(data.followers)} max={Number(data.followerGoal)} label="Followers" detail={`${Number(data.followers).toLocaleString()} / 10,000`} />
              <Progress value={giftingCurrent} max={Number(data.juneGiftingGoal)} label="Gifting" detail={`${giftingCurrent} confirmed · ${Number(data.juneGiftingGoal)-giftingCurrent} left`} />
              <Progress value={paidCurrent} max={Number(data.junePaidCollabGoal)} label="Paid collabs" detail={`${paidCurrent} / ${data.junePaidCollabGoal}`} />
            </section>
          </div>

          <section className="card">
            <span className="tiny-label">creator plan</span>
            <h2>What to film next</h2>
            <div className="grid-three">{CONTENT_BOARD.map(x => <div className="soft" key={x.title}><h3 style={{fontSize:25}}>{x.title}</h3>{x.items.map(i => <p className="muted" key={i}>♡ {i}</p>)}</div>)}</div>
          </section>

          <div className="grid">
            <section className="card">
              <span className="tiny-label">brand momentum</span>
              <h2>Warm Leads + PR</h2>
              <p className="muted"><b>Warm leads:</b> Glossier and Josie Maran.</p>
              <p className="muted"><b>Confirmed gifting:</b> Divi, Salt & Stone, Saltair, Prequel, Sacheu, Merit, Cyklar, Grey Bandit, Sincerely Yours, L'Occitane.</p>
              <p className="muted"><b>Next move:</b> keep posting fashion reach content, then use PR/creator tips to convert viewers into followers.</p>
            </section>
            <section className="card">
              <span className="tiny-label">current strategy</span>
              <h2>What’s working</h2>
              <p className="muted"><b>Fashion:</b> gets reach and ShopMy revenue.</p>
              <p className="muted"><b>Creator/PR tips:</b> convert followers.</p>
              <p className="muted"><b>Lifestyle:</b> builds trust and brand fit.</p>
              <p className="muted"><b>Best times:</b> {data.bestPostTimes}. Test 5:30 PM and 8:30 PM.</p>
            </section>
          </div>

          <section className="card">
            <span className="tiny-label">proof board</span>
            <h2>Top Content Winners</h2>
            {WINNERS.map((w, idx) => <div className="winner" key={w.title}><div className="thumb">{idx===0?'👚':idx===1?'🫧':idx===2?'💇‍♀️':idx===3?'🌷':idx===4?'🛍️':'📦'}</div><div><b>{w.title}</b><em>{w.metric} · {w.tag}</em><p className="muted">{w.note}</p></div></div>)}
          </section>

          <section className="card">
            <span className="tiny-label">vision board</span>
            <h2>Dream Brand Board</h2>
            <div className="dream-board">{DREAM_BRANDS.map(b => <div className="dream" key={b}>✧ {b}</div>)}</div>
          </section>
        </>}

        {tab === "Ideas" && <Generator title="Viral Content Ideas ✨" placeholder="Example: I got Saltair PR, Target haul part 2, or microinfluencer tips" chips={["What should I post today?", "Target haul part 2", "PR tips video", "ShopMy video idea", "Summer affordable fashion"]} prompt={prompt} setPrompt={setPrompt} result={result} onGenerate={() => quickGenerate('ideas')} />}
        {tab === "Captions" && <Generator title="Caption Writer ✍️" placeholder="Describe your video" chips={["Target summer haul", "PR haul as a microinfluencer", "Morning room reset", "Amazon tops under $30"]} prompt={prompt} setPrompt={setPrompt} result={result} onGenerate={() => quickGenerate('caption')} />}
        {tab === "ShopMy" && <>
          <section className="card"><h2>ShopMy Command Center 🛍️</h2><div className="grid-three"><div className="metric pink"><strong>{data.shopmyLifetime}</strong><span>lifetime</span></div><div className="metric sage"><strong>{data.shopmyPending}</strong><span>pending</span></div><div className="metric blue"><strong>{data.shopmyUpcoming}</strong><span>upcoming</span></div></div></section>
          <Generator title="Ask ShopMy Strategy" placeholder="Ask about links, collections, products, or clicks" chips={["How do I convert viral viewers into clicks?", "What collections should I make?", "How do I use my Target sales?", "How do I promote ShopMy without being annoying?"]} prompt={prompt} setPrompt={setPrompt} result={result} onGenerate={() => quickGenerate('shopmy')} />
          <section className="card"><h2>Proven ShopMy Winners</h2>{[["Target Wild Fable Straight Leg Pull-On Pants","2.9K clicks · 136 orders · $430"],["Target Wild Fable Babydoll Tank Top","2.9K clicks · 111 orders · $275"],["Target Wild Fable Pull-On Shorts","1.7K clicks · 65 orders · $152"]].map(([a,b])=><div className="winner" key={a}><div className="thumb">🛍️</div><div><b>{a}</b><em>{b}</em></div></div>)}</section>
        </>}
        {tab === "Plan" && <section><h2 className="section-title">Creator Sprint to 10K 🎀</h2><p className="muted">Built from your updated analytics: fashion for reach/revenue, creator tips for followers, lifestyle for trust.</p><div className="plan-grid">{PLAN.map((p,i)=><div className={`plan-card ${i===0?'done':''}`} key={i}><span className="plan-type">{p[4]} Day {i+1} · {p[0]}</span><h3 style={{fontSize:22,margin:'8px 0'}}>{p[1]}</h3><p>♡ {p[2]}</p><p>💬 CTA/Goal: “{p[3]}”</p></div>)}</div></section>}
        {tab === "Brands" && <section className="card"><h2>Brand Outreach Tracker 📊</h2><p className="muted">90+ brands contacted · {giftingCurrent}/25 gifting · {paidCurrent}/4 paid · {warmLeadCount} warm leads</p><div className="pill-row">{["All","Gifting","Warm Lead","PR List","Paid","Sent","Not Now"].map(f=><button className="pill" onClick={()=>setBrandFilter(f)} key={f}>{f}</button>)}</div><div className="brand-controls"><input placeholder="Search brands" value={brandSearch} onChange={e=>setBrandSearch(e.target.value)}/></div>{filteredBrands.map((b,i)=>{const s=STATUS[b.status]||STATUS.Sent;return <div className="brand-row" key={b.name}><strong>{s.emoji} {b.name}</strong><select className="badge" style={{background:s.bg,color:s.color,border:'0'}} value={b.status} onChange={e=>{const next=[...brands];const realIndex=brands.findIndex(x=>x.name===b.name);next[realIndex]={...next[realIndex],status:e.target.value};setBrands(next)}}>{Object.keys(STATUS).map(k=><option key={k}>{k}</option>)}</select></div>})}</section>}
        {tab === "Update" && <section className="card"><h2>Update Your Data ⚙️</h2><p className="muted">Paste updated stats here. This saves in your browser using localStorage.</p><textarea className="textarea json" value={draft} onChange={e=>setDraft(e.target.value)} /><button className="btn" onClick={saveData}>Save updated stats</button><button className="pill" onClick={()=>navigator.clipboard.writeText(JSON.stringify(data,null,2))}>Export backup</button></section>}
      </main>
    </div>
  );
}

function Generator({ title, placeholder, chips, prompt, setPrompt, result, onGenerate }) {
  return <section className="card"><h2>{title}</h2><textarea className="textarea" placeholder={placeholder} value={prompt} onChange={e=>setPrompt(e.target.value)} /><button className="btn" onClick={onGenerate}>Generate</button><div className="pill-row">{chips.map(c=><button className="pill" onClick={()=>setPrompt(c)} key={c}>{c}</button>)}</div>{result && <div className="card result" style={{marginTop:20}}>{result}</div>}</section>
}
