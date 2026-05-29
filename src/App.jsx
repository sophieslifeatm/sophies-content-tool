import { useMemo, useState } from "react";

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
  junePaidCollabGoal: 4,
  junePaidCollabRevenueGoal: "$1,000+",
  activeInsight: "Fashion gets views + ShopMy revenue. Creator/PR tips convert followers. Lifestyle builds trust. Brand outreach is converting quickly with 10 confirmed gifting partnerships and 2 warm leads."
};

const INITIAL_BRANDS = [
  ["Divi", "gifting"], ["Salt & Stone", "gifting"], ["Saltair", "gifting"], ["Prequel", "gifting"], ["Sacheu Beauty", "gifting"],
  ["Merit Beauty", "gifting"], ["Cyklar", "gifting"], ["Grey Bandit", "gifting"], ["Sincerely Yours", "gifting"], ["L'Occitane", "gifting"],
  ["Naturium", "pr_list"], ["Glossier", "follow_up"], ["Josie Maran", "follow_up"], ["Paula's Choice", "not_now"],
  ["Target", "sent"], ["Aveda", "sent"], ["BaubleBar", "sent"], ["Orebella", "sent"], ["Overnight Blowout", "sent"], ["Loving Tan", "sent"],
  ["Athena Club", "sent"], ["Hanni", "sent"], ["Facile", "sent"], ["The Outset", "sent"], ["Shiseido", "sent"], ["DECIEM", "sent"],
  ["Tatcha", "sent"], ["ELEMIS", "sent"], ["ColourPop", "sent"], ["Dior Beauty", "sent"], ["Rare Beauty", "sent"], ["Gap Factory", "sent"],
  ["HigherDOSE", "sent"], ["Rhode", "sent"], ["Gorjana", "sent"], ["Cocokind", "sent"], ["Skinfix", "sent"], ["Snif", "sent"],
  ["Free People", "sent"], ["Dairy Boy", "sent"], ["Daily Drills", "sent"], ["Parke", "sent"], ["Adanola", "sent"], ["437", "sent"],
  ["Olaplex", "sent"], ["American Eagle", "sent"], ["JVN Hair", "sent"], ["Inn Beauty", "sent"], ["Dieux", "sent"], ["EADEM", "sent"],
  ["Versed", "sent"], ["Aritzia", "sent"], ["Summer Fridays", "sent"], ["REFY", "sent"], ["K18", "sent"], ["Gisou", "sent"],
  ["Meshki", "sent"], ["Cotton On", "sent"], ["Garage", "sent"], ["Hollister", "sent"], ["Aerie", "sent"], ["Kopari", "sent"],
  ["Dae Hair", "sent"], ["Abercrombie", "sent"], ["Eleven Eleven", "sent"], ["Tower 28", "sent"], ["Kosas", "sent"], ["Crown Affair", "sent"],
  ["LYS Beauty", "sent"], ["Emi Jay", "sent"], ["Victoria Beckham Beauty", "sent"], ["OSEA", "sent"], ["Necessaire", "sent"], ["Beis", "sent"],
  ["Dibs Beauty", "sent"], ["Supergoop", "sent"], ["PrettyLittleThing", "sent"], ["Haus Labs", "sent"], ["Lake", "sent"], ["Ilia", "sent"],
  ["Madhappy", "sent"], ["Colorescience", "sent"], ["Shark Ninja", "sent"], ["Still Here", "sent"], ["Set Active", "sent"], ["Gap", "sent"],
  ["Agolde", "sent"], ["Cozy Land", "sent"], ["Charlotte Tilbury", "sent"]
].map(([name, status]) => ({ name, status }));

const WINNERS = [
  { title: "Target Matching Set Haul", views: "1.06M", followers: 601, tag: "views + sales", why: "Highest reach, huge shares, strongest ShopMy conversion. Recreate with Target, Gap, Old Navy, Marshall's." },
  { title: "Morning of Self-Care", views: "502.7K", followers: "awareness", tag: "lifestyle", why: "Soft aesthetic content can go wide and builds trust between haul posts." },
  { title: "Haircut / Brunette Bob Video", views: "426.6K", followers: "awareness", tag: "transformation", why: "Transformation and aesthetic decision videos reach outside your core audience." },
  { title: "Princess Polly Spring Finds", views: "152.3K", followers: "brand proof", tag: "try-on", why: "Partner content works best when styled like a normal haul." },
  { title: "Amazon / SUUKSESS Spring Top Haul", views: "121.9K", followers: "fashion reach", tag: "affordable", why: "Affordable fashion and Skims-dupe framing is repeatable." },
  { title: "PR Haul Tips", views: "24.2K", followers: 454, tag: "followers", why: "Lower views than fashion, but converts followers extremely well." },
  { title: "Microinfluencer PR Haul", views: "18.4K", followers: 473, tag: "followers", why: "Creator-tip content is your strongest follower-conversion engine." }
];

const SHOPMY_WINNERS = [
  { item: "Target Wild Fable Straight Leg Pull-On Pants", clicks: "2.9K", orders: 136, earned: "$430" },
  { item: "Target Wild Fable Babydoll Tank Top", clicks: "2.9K", orders: 111, earned: "$275" },
  { item: "Target Wild Fable Pull-On Shorts", clicks: "1.7K", orders: 65, earned: "$152" }
];

const PLAN = [
  ["Target Finds of the Week: Wild Fable summer haul", "Haul", "Link every Target item + pin Target collection", "follow for more Target finds 🤍"],
  ["How I got PR with under 10K followers", "Tips", "Creator audience, no links needed", "follow for more microinfluencer tips ✨"],
  ["Amazon summer tops under $30", "Haul", "Amazon storefront + ShopMy collection", "follow for more affordable finds 🛍️"],
  ["PR haul: what brands sent me this week", "Tips", "Link gifted products when possible", "follow to see what I actually use 💕"],
  ["Gap / Old Navy / Aerie matching set try-on", "Haul", "Make a matching sets collection", "follow for more try-on hauls"],
  ["Morning room reset with linked products", "Lifestyle", "Room reset essentials collection", "follow for more room inspo ✨"],
  ["What I would do if I was starting ShopMy from zero", "Tips", "ShopMy referral + credibility", "follow for more creator tips"],
  ["Target Part 2: items I found after my viral haul", "Haul", "Create Viral Target Finds collection", "follow for part 3 🎯"],
  ["Affordable fashion pieces that look expensive", "Haul", "Target, Amazon, Gap, Aerie links", "follow for more affordable outfit ideas"],
  ["Brands I’d pitch as a microinfluencer", "Tips", "Mention PR/gifting wins", "follow for my exact outreach tips"],
  ["Spend the morning with me, creator edition", "Lifestyle", "OOTD + beauty + room products", "follow along for my daily life 🤍"],
  ["My most sold ShopMy items right now", "Haul", "Top 3 Target products front and center", "everything is linked in my bio 🛍️"],
  ["How brands find creators on TikTok", "Tips", "Use PR series as follower funnel", "follow for the next creator tip"],
  ["Summer outfits under $50", "Haul", "Make under $50 collection", "follow for more budget-friendly finds"]
];

const STATUS = {
  gifting: { label: "Gifting", emoji: "🎁" },
  pr_list: { label: "PR List", emoji: "📋" },
  not_now: { label: "Not Now", emoji: "⏸️" },
  paid: { label: "Paid", emoji: "💸" },
  follow_up: { label: "Follow Up", emoji: "⏳" },
  sent: { label: "Sent", emoji: "✉️" }
};

const TABS = ["Dashboard", "Ideas", "Captions", "ShopMy", "Plan", "Brands", "Update"];
const TAB_EMOJIS = ["📌", "💡", "✍️", "🛍️", "📅", "📊", "⚙️"];

function loadData() {
  try {
    const saved = localStorage.getItem("sophie-live-tool-v3");
    if (saved) return JSON.parse(saved);
    const old = localStorage.getItem("sophie-live-tool-v2");
    if (old) return JSON.parse(old);
  } catch {}
  return { stats: DEFAULT_DATA, brands: INITIAL_BRANDS };
}

function saveData(next) {
  localStorage.setItem("sophie-live-tool-v3", JSON.stringify(next));
}

function num(n) {
  return Number(String(n).replace(/[^0-9.]/g, "")) || 0;
}

function makeIdeas(prompt) {
  const p = prompt.toLowerCase();
  const target = p.includes("target") || p.includes("fashion") || p.includes("haul") || p.includes("outfit") || p.includes("gap");
  const pr = p.includes("pr") || p.includes("micro") || p.includes("brand") || p.includes("gifting");
  const shop = p.includes("shopmy") || p.includes("link") || p.includes("affiliate");
  const ideas = target ? [
    ["Target Finds of the Week 🎯", "Try on 3-5 affordable summer pieces, keep the cuts fast, and use a simple text overlay.", "Put Target collection first on ShopMy.", "This matches the exact format that got 1M+ views and real orders."],
    ["the matching sets I keep reaching for", "Show each set on, then quick mirror clips/details.", "Link all colors and similar finds.", "Matching sets + affordable basics are your proven revenue lane."],
    ["summer outfits under $50", "Fast try-on with prices on screen.", "Create a Summer Under $50 collection.", "Price framing makes your audience click and shop."]
  ] : pr ? [
    ["How I got PR with under 10K followers", "Tell one clear tip and show proof through packages/messages.", "No hard sell, use it to gain followers.", "PR/tip videos convert followers best for you."],
    ["Brands that sent me PR this month", "Montage Divi, Saltair, Salt & Stone, Prequel, Sacheu, Merit, etc.", "Link what you genuinely use.", "Builds credibility for followers and future brands."],
    ["What I send brands on ShopMy", "Show blurred screenshots and explain the formula.", "Can mention your ShopMy referral lightly.", "Your creator audience wants exact examples."]
  ] : shop ? [
    ["My most sold ShopMy items right now", "Show the Target pants, tank, and shorts with receipt-style stats.", "Pin Top Sellers collection.", "Social proof + sales proof = high conversion."],
    ["How I turn viral views into clicks", "Explain link in bio, collections, and caption wording using your Target video.", "Use ShopMy referral + top collections.", "This combines creator tips with revenue proof."],
    ["Everything my followers actually bought", "Show top sellers and why they work.", "Make 'Follower Favorites' collection.", "People trust what already sold."],
  ] : [
    ["Spend the morning with me, but everything is linked", "Lifestyle vlog with OOTD, beauty, room reset, and errands.", "Link outfit, room, and beauty products.", "Lifestyle builds trust between haul videos."],
    ["Affordable finds I’d buy again", "Show 5 things you genuinely love from Target/Amazon/Gap.", "Create 'Most Asked About' collection.", "Repurchase energy drives trust and clicks."],
    ["soft room reset + current favorites", "Aesthetic room reset with product cameos.", "Room Reset Essentials collection.", "Your room content has strong like-to-view trust."],
  ];
  return ideas.map((x, i) => `${i + 1}. ${x[0]}\nConcept: ${x[1]}\nShopMy angle: ${x[2]}\nWhy it should work: ${x[3]}`).join("\n\n");
}

function makeCaptions(prompt) {
  const isHaul = /target|amazon|gap|haul|outfit|try|marshall|old navy/.test(prompt.toLowerCase());
  const isPR = /pr|brand|gifting|micro/.test(prompt.toLowerCase());
  if (isHaul) return `Option 1:\nfollow for more haul videos like this 🤍 everything is so cute and actually affordable, linking all my favorites in bio!! #targetfinds #amazonfinds #tryonhaul #affordablefashion #shopmy #summeroutfits\n\nOption 2:\nthis is your sign to check the new summer finds because I’m obsessed ✨ linked everything I could in my ShopMy! follow for more affordable outfit inspo 🫶 #haul #outfitideas #targethaul #fashionfinds #creatorfinds`;
  if (isPR) return `Option 1:\nposting this because so many of you asked how brands find smaller creators 💕 follow for more PR + microinfluencer tips like this!! #prhaul #microinfluencer #microinfluencertips #howtogetpr #creatorlife\n\nOption 2:\nso grateful for these packages and I love sharing the real behind-the-scenes of growing as a creator ✨ follow for more tips + PR updates 🤍 #prunboxing #creatorjourney #brandcollab #gifted`;
  return `Option 1:\nspend the morning with me 🤍 nothing makes me feel more put together than a little reset moment. linking what I can in bio, follow for more little life moments ✨ #dayinmylife #morningroutine #roomreset #lifestylecreator\n\nOption 2:\nsoft morning reset because I needed this today 🫶 follow for more routines, room inspo, and everyday favorites 🤍 #roominspo #girlyroom #morningreset #lifestyle`;
}

function makeShopMy() {
  return `Your next ShopMy move: make the viral products impossible to miss.\n\n1. Put these collections first:\n- Viral Target Finds\n- My Most Sold Items\n- Summer Outfits Under $50\n- Matching Sets\n- Room Reset Essentials\n\n2. Use caption language that feels natural:\n- “linked everything in my bio”\n- “I added every color I could find to my ShopMy”\n- “these are my most sold items right now”\n\n3. Prioritize basics over random beauty right now.\nYour audience is buying pants, tanks, shorts, matching sets, and affordable outfit pieces.\n\n4. Make a video: “the Target pieces my followers actually bought” and show the 136-order pants, 111-order tank, and 65-order shorts.`;
}

function Card({ title, children, className = "" }) {
  return <div className={`card ${className}`}>{title && <h3>{title}</h3>}{children}</div>;
}

function Metric({ value, label, tone = "cream" }) {
  return <div className={`metric ${tone}`}><div className="metric-value">{value}</div><div className="metric-label">{label}</div></div>;
}

function Generator({ title, prompt, setPrompt, result, setResult, generate, placeholder, chips, extra }) {
  return <section className="section generator">
    <h2>{title}</h2>
    <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={placeholder} />
    <button className="primary" onClick={generate}>Generate</button>
    <div className="chips">{chips.map(c => <button key={c} onClick={() => setPrompt(c)}>{c}</button>)}</div>
    {result && <Card><pre>{result}</pre><button className="copy" onClick={() => navigator.clipboard?.writeText(result)}>Copy</button></Card>}
    {extra}
  </section>;
}

export default function SophieContentStudio() {
  const [store, setStore] = useState(loadData);
  const [tab, setTab] = useState(0);
  const [ideaPrompt, setIdeaPrompt] = useState("");
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [shopPrompt, setShopPrompt] = useState("");
  const [ideaResult, setIdeaResult] = useState("");
  const [captionResult, setCaptionResult] = useState("");
  const [shopResult, setShopResult] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [updateDraft, setUpdateDraft] = useState(JSON.stringify(store.stats, null, 2));

  const stats = store.stats;
  const brands = store.brands;
  const counts = useMemo(() => brands.reduce((acc, b) => ((acc[b.status] = (acc[b.status] || 0) + 1), acc), {}), [brands]);
  const needed = Math.max(0, num(stats.followerGoal) - num(stats.followers));
  const daysAtRecentRate = Math.ceil(needed / Math.max(1, num(stats.netFollowers7d) / 7));
  const giftCurrent = counts.gifting || 0;
  const warmLeads = counts.follow_up || 0;
  const filteredBrands = brands.filter(b => (filter === "all" || b.status === filter) && b.name.toLowerCase().includes(search.toLowerCase()));

  function updateStore(next) { setStore(next); saveData(next); }
  function changeBrandStatus(name, status) { updateStore({ ...store, brands: brands.map(b => b.name === name ? { ...b, status } : b) }); }
  function addBrand() { if (!newBrand.trim()) return; updateStore({ ...store, brands: [{ name: newBrand.trim(), status: "sent" }, ...brands] }); setNewBrand(""); }
  function saveStats() { try { const nextStats = JSON.parse(updateDraft); updateStore({ ...store, stats: nextStats }); } catch { alert("The JSON has an error. Check commas and quotes."); } }

  return <div className="app">
    <style>{CSS}</style>
    <header className="hero">
      <div className="hero-inner">
        <div className="eyebrow">{stats.handle}</div>
        <h1>Sophie's Content Studio</h1>
        <p className="subtitle">{stats.followers.toLocaleString()} → {stats.followerGoal.toLocaleString()} followers · {stats.shopmyTier} · {stats.shopmyLifetime} ShopMy lifetime</p>
        <div className="hero-grid">
          <Metric value={stats.followers.toLocaleString()} label="followers" tone="glass" />
          <Metric value={stats.views60d} label="views 60d" tone="glass" />
          <Metric value={stats.netFollowers7d} label="net followers 7d" tone="glass" />
          <Metric value={stats.shopmyLifetime} label="ShopMy lifetime" tone="glass" />
        </div>
      </div>
    </header>

    <nav className="tabs">
      {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} className={tab === i ? "active" : ""}><span>{TAB_EMOJIS[i]}</span>{t}</button>)}
    </nav>

    <main className="main">
      {tab === 0 && <section className="section dashboard">
        <div className="section-title"><span>Live Growth Dashboard</span><em>updated creator OS</em></div>
        <div className="dashboard-grid">
          <Metric value={needed.toLocaleString()} label="followers to 10K" tone="pink" />
          <Metric value={daysAtRecentRate} label="days at current pace" tone="blue" />
          <Metric value={`${giftCurrent}/${stats.juneGiftingGoal}`} label="gifting partners" tone="green" />
          <Metric value={warmLeads} label="warm brand leads" tone="yellow" />
        </div>
        <div className="masonry">
          <Card title="June Goals">
            <div className="goal"><span>10K followers</span><b>{needed.toLocaleString()} left</b></div>
            <div className="bar"><i style={{ width: `${Math.min(100, (stats.followers / stats.followerGoal) * 100)}%` }} /></div>
            <div className="goal"><span>ShopMy</span><b>{stats.juneShopMyGoal} in June</b></div>
            <div className="goal"><span>Gifting</span><b>{giftCurrent} confirmed · {stats.juneGiftingGoal - giftCurrent} left</b></div>
            <div className="goal"><span>Paid collabs</span><b>0/{stats.junePaidCollabGoal} · {stats.junePaidCollabRevenueGoal}</b></div>
          </Card>
          <Card title="Current Strategy">
            <p><b>Post mix:</b> 40% affordable fashion, 30% creator/PR tips, 20% lifestyle, 10% beauty.</p>
            <p><b>Best posting windows:</b> {stats.bestPostTimes}. Test 5:30 PM and 8:30 PM.</p>
            <p><b>Main insight:</b> {stats.activeInsight}</p>
          </Card>
          <Card title="What to Film Next" className="feature-card">
            <ol>
              <li>Summer Marshall's or Target haul</li>
              <li>PR haul update with new gifting wins</li>
              <li>Creator tip: how brands found you under 10K</li>
              <li>Room reset with products linked softly</li>
            </ol>
          </Card>
          <Card title="Top Content Winners" className="wide">
            <div className="winner-list">{WINNERS.map(w => <div className="winner" key={w.title}><div><b>{w.title}</b><p>{w.why}</p></div><span>{w.views}<small>{w.tag}</small></span></div>)}</div>
          </Card>
        </div>
      </section>}

      {tab === 1 && <Generator title="Viral Content Ideas ✨" prompt={ideaPrompt} setPrompt={setIdeaPrompt} result={ideaResult} setResult={setIdeaResult} generate={() => setIdeaResult(makeIdeas(ideaPrompt || "What should I post today?"))} placeholder="Example: I got Saltair PR, Target haul part 2, or microinfluencer tips" chips={["What should I post today?", "Target haul part 2", "PR tips video", "ShopMy video idea", "Summer affordable fashion"]} />}
      {tab === 2 && <Generator title="Caption Writer ✍️" prompt={captionPrompt} setPrompt={setCaptionPrompt} result={captionResult} setResult={setCaptionResult} generate={() => setCaptionResult(makeCaptions(captionPrompt || "Target haul"))} placeholder="Describe your video" chips={["Target summer haul", "PR haul as a microinfluencer", "Morning room reset", "Amazon tops under $30"]} />}
      {tab === 3 && <Generator title="ShopMy Strategy 🛍️" prompt={shopPrompt} setPrompt={setShopPrompt} result={shopResult} setResult={setShopResult} generate={() => setShopResult(makeShopMy(shopPrompt))} placeholder="Ask about links, collections, products, or clicks" chips={["How do I convert viral viewers into clicks?", "What collections should I make?", "How do I use my Target sales?", "How do I promote ShopMy without being annoying?"]} extra={<Card title="Proven ShopMy winners">{SHOPMY_WINNERS.map(w => <div className="shop-winner" key={w.item}><b>{w.item}</b><span>{w.clicks} clicks · {w.orders} orders · {w.earned}</span></div>)}</Card>} />}

      {tab === 4 && <section className="section"><h2>14-Day Plan to 10K 📅</h2><p className="muted">Built from your updated analytics: fashion for reach/revenue, creator tips for followers, lifestyle for trust.</p><div className="plan-grid">{PLAN.map((p, i) => <Card key={i} title={`Day ${i + 1} · ${p[1]}`}><p><b>{p[0]}</b></p><p>🛍️ {p[2]}</p><p>💬 CTA: “{p[3]}”</p></Card>)}</div></section>}

      {tab === 5 && <section className="section brands"><h2>Brand Outreach Tracker 📊</h2><p className="muted">{brands.length} brands tracked · {giftCurrent}/25 gifting · {warmLeads} warm leads</p><div className="filter-row">{["all", "gifting", "follow_up", "pr_list", "paid", "sent", "not_now"].map(f => <button key={f} onClick={() => setFilter(f)} className={filter === f ? "active" : ""}>{f === "all" ? "All" : `${STATUS[f].emoji} ${STATUS[f].label}`}</button>)}</div><input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search brands" /><div className="add-row"><input className="input" value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="Add new brand" /><button className="primary small" onClick={addBrand}>Add</button></div><div className="brand-list">{filteredBrands.map(b => <div className="brand" key={b.name}><b>{b.name}</b><select value={b.status} onChange={e => changeBrandStatus(b.name, e.target.value)}>{Object.entries(STATUS).map(([k, v]) => <option key={k} value={k}>{v.emoji} {v.label}</option>)}</select></div>)}</div></section>}

      {tab === 6 && <section className="section"><h2>Update Your Data ⚙️</h2><p className="muted">Paste updated stats here. This saves in your browser with localStorage.</p><textarea className="codebox" value={updateDraft} onChange={e => setUpdateDraft(e.target.value)} /><button className="primary" onClick={saveStats}>Save updated stats</button><button className="secondary" onClick={() => navigator.clipboard?.writeText(JSON.stringify(store, null, 2))}>Export backup</button></section>}
    </main>
  </div>;
}

const CSS = `
:root{
  --berry:#8b3a52;
  --berry-dark:#3b1f24;
  --rose:#fff3f6;
  --rose-2:#f9dfe8;
  --cream:#fffaf6;
  --ink:#2e1b1d;
  --muted:#8a777b;
  --line:#f1d8df;
  --shadow:0 18px 55px rgba(88,38,50,.10);
}
*{box-sizing:border-box}
body{margin:0;background:#fffaf8}
.app{min-height:100vh;background:radial-gradient(circle at 15% 5%, #ffe8ef 0, transparent 25%),radial-gradient(circle at 85% 12%, #f1e8ff 0, transparent 22%),linear-gradient(135deg,#fffaf7 0%,#fff7fb 48%,#f8f2ff 100%);color:var(--ink);font-family:Georgia,'Times New Roman',serif;}
.hero{padding:26px 18px 24px;background:linear-gradient(135deg,#341f20 0%,#6d253c 58%,#9a365b 100%);position:relative;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.2)}
.hero:before{content:"";position:absolute;inset:-30%;background:radial-gradient(circle at 30% 40%, rgba(255,255,255,.16), transparent 23%),radial-gradient(circle at 72% 35%, rgba(255,204,219,.15), transparent 28%);filter:blur(4px)}
.hero-inner{position:relative;max-width:840px;margin:0 auto;text-align:center}
.eyebrow{font-size:12px;letter-spacing:6px;color:#f6cbd7;text-transform:lowercase;margin-bottom:6px}.hero h1{font-size:clamp(34px,5vw,58px);line-height:.95;margin:0;font-weight:400;letter-spacing:-1.5px;color:#fff}.subtitle{color:#f6d4dc;font-size:15px;margin:12px 0 22px}.hero-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:760px;margin:0 auto}.tabs{position:sticky;top:0;z-index:5;display:flex;gap:8px;overflow:auto;padding:10px 14px;background:rgba(255,250,250,.82);backdrop-filter:blur(18px);border-bottom:1px solid var(--line)}.tabs button{border:0;background:transparent;color:#927e83;padding:10px 12px;border-radius:999px;font-family:inherit;font-size:15px;white-space:nowrap;cursor:pointer}.tabs button span{margin-right:5px}.tabs button.active{background:#fff;box-shadow:0 8px 22px rgba(139,58,82,.10);color:var(--berry);font-weight:700}.main{max-width:1180px;margin:0 auto;padding:30px 18px 60px}.section h2,.section-title span{font-weight:400;font-size:clamp(28px,4vw,46px);letter-spacing:-1px;margin:0 0 10px}.section-title{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}.section-title em{font-style:normal;color:var(--muted);font-size:15px}.dashboard-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}.metric{border-radius:24px;padding:20px;min-height:106px;display:flex;flex-direction:column;justify-content:center;border:1px solid rgba(255,255,255,.45);box-shadow:var(--shadow)}.metric.glass{background:rgba(255,255,255,.12);box-shadow:none;border-color:rgba(255,255,255,.18);color:#fff}.metric.pink{background:#fae6f1;color:#a01855}.metric.blue{background:#e6ebff;color:#343ab0}.metric.green{background:#ddf8e9;color:#0a6c48}.metric.yellow{background:#fff0bd;color:#9c5714}.metric-value{font-size:clamp(26px,3vw,38px);font-weight:800;line-height:1}.metric-label{text-transform:uppercase;letter-spacing:1px;font-size:12px;font-weight:800;margin-top:6px}.masonry{display:grid;grid-template-columns:1fr 1fr;gap:18px}.card{background:rgba(255,255,255,.74);border:1px solid var(--line);border-radius:28px;padding:24px;box-shadow:var(--shadow);backdrop-filter:blur(10px)}.card h3{margin:0 0 16px;font-size:25px;color:var(--berry);font-weight:700}.card p{font-size:16px;line-height:1.55}.card.wide{grid-column:1 / -1}.feature-card{background:linear-gradient(135deg,#fff,#fff0f5)}.feature-card li{margin:8px 0;font-size:17px}.goal{display:flex;justify-content:space-between;gap:18px;padding:9px 0;border-bottom:1px solid #f6e4e9}.goal span{color:var(--muted)}.bar{height:12px;background:#f6dfe7;border-radius:999px;overflow:hidden;margin:6px 0 14px}.bar i{display:block;height:100%;background:linear-gradient(90deg,#8b3a52,#d783a1);border-radius:999px}.winner-list{display:grid;gap:10px}.winner{display:flex;justify-content:space-between;gap:16px;align-items:center;padding:14px 0;border-bottom:1px solid #f7e5eb}.winner b{font-size:18px}.winner p{margin:5px 0 0;color:#6f5d61;font-size:14px}.winner span{color:var(--berry);font-weight:800;text-align:right;font-size:20px}.winner small{display:block;color:var(--muted);font-size:11px;text-transform:uppercase;letter-spacing:1px}.generator{max-width:940px;margin:0 auto}.generator textarea,.codebox,.input{width:100%;border:1px solid var(--line);background:rgba(255,255,255,.76);border-radius:24px;padding:20px;font-family:inherit;font-size:18px;color:var(--ink);outline:none;box-shadow:0 8px 28px rgba(139,58,82,.05)}.generator textarea{min-height:140px;resize:vertical}.codebox{min-height:420px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:14px}.primary,.secondary{border:0;border-radius:999px;padding:14px 24px;font-family:inherit;font-size:17px;font-weight:800;cursor:pointer;margin:14px 10px 14px 0}.primary{background:linear-gradient(135deg,#8b3a52,#6a253b);color:white;box-shadow:0 14px 35px rgba(139,58,82,.22)}.primary.small{padding:12px 18px;margin:0}.secondary{background:#fff;border:1px solid var(--line);color:var(--berry)}.chips,.filter-row{display:flex;flex-wrap:wrap;gap:10px;margin:14px 0 22px}.chips button,.filter-row button{border:1px solid var(--line);background:rgba(255,255,255,.74);border-radius:999px;padding:10px 16px;color:var(--berry);font-family:inherit;font-weight:700;cursor:pointer}.filter-row button.active{background:var(--berry);color:#fff}.muted{color:var(--muted);font-size:18px}.plan-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}.brand-list{display:grid;gap:10px;margin-top:16px}.brand{display:flex;align-items:center;justify-content:space-between;gap:16px;background:rgba(255,255,255,.78);border:1px solid var(--line);border-radius:22px;padding:14px 16px;box-shadow:0 10px 32px rgba(139,58,82,.06)}.brand b{font-size:18px}.brand select{border:1px solid var(--line);background:#fff;border-radius:999px;padding:9px 12px;color:var(--berry);font-family:inherit;font-weight:700}.add-row{display:flex;gap:10px;margin-top:10px}.shop-winner{padding:12px 0;border-bottom:1px solid #f5e2e8}.shop-winner b{display:block}.shop-winner span{color:var(--berry);font-weight:700}pre{white-space:pre-wrap;font-family:inherit;font-size:16px;line-height:1.6}.copy{border:1px solid var(--line);background:#fff;color:var(--berry);border-radius:999px;padding:9px 14px;font-family:inherit;font-weight:700}
@media(max-width:850px){.hero-grid,.dashboard-grid,.masonry,.plan-grid{grid-template-columns:1fr 1fr}.main{padding:22px 14px}.card{padding:20px;border-radius:22px}.section-title{display:block}.tabs{padding:8px}}
@media(max-width:560px){.hero-grid,.dashboard-grid,.masonry,.plan-grid{grid-template-columns:1fr}.hero h1{font-size:38px}.subtitle{font-size:13px}.tabs button{font-size:14px;padding:9px 10px}.winner{display:block}.winner span{text-align:left;display:block;margin-top:6px}.add-row{display:block}.add-row .primary{width:100%;margin-top:10px}.metric{min-height:auto}.section h2,.section-title span{font-size:32px}}
`;
