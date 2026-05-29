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
  activeInsight: "Fashion gets views + ShopMy revenue. Creator/PR tips convert followers. Lifestyle builds trust.",
};

const INITIAL_BRANDS = [
  ["Divi", "gifting"], ["Salt & Stone", "gifting"], ["Saltair", "gifting"], ["Prequel", "gifting"], ["Sacheu", "gifting"], ["Naturium", "pr_list"], ["Paula's Choice", "not_now"],
  ["Target", "sent"], ["Merit Beauty", "sent"], ["Aveda", "sent"], ["BaubleBar", "sent"], ["Orebella", "sent"], ["Overnight Blowout", "sent"], ["Loving Tan", "sent"], ["Cyklar", "sent"], ["Athena Club", "sent"], ["Hanni", "sent"], ["Facile", "sent"], ["The Outset", "sent"], ["Shiseido", "sent"], ["DECIEM", "sent"], ["Tatcha", "sent"], ["ELEMIS", "sent"], ["ColourPop", "sent"], ["Dior Beauty", "sent"], ["Rare Beauty", "sent"], ["Gap Factory", "sent"], ["HigherDOSE", "sent"], ["Rhode", "sent"], ["Gorjana", "sent"], ["Cocokind", "sent"], ["Skinfix", "sent"], ["Snif", "sent"], ["Free People", "sent"], ["Dairy Boy", "sent"], ["Daily Drills", "sent"], ["Parke", "sent"], ["Adanola", "sent"], ["Sincerely Yours", "sent"], ["437", "sent"], ["Olaplex", "sent"], ["American Eagle", "sent"], ["JVN Hair", "sent"], ["Inn Beauty", "sent"], ["Dieux", "sent"], ["Glossier", "sent"], ["EADEM", "sent"], ["Versed", "sent"], ["Aritzia", "sent"], ["Summer Fridays", "sent"], ["REFY", "sent"], ["K18", "sent"], ["Gisou", "sent"], ["Meshki", "sent"], ["Cotton On", "sent"], ["Garage", "sent"], ["Hollister", "sent"], ["Grey Bandit", "sent"], ["Aerie", "sent"], ["Kopari", "sent"], ["Dae Hair", "sent"], ["Abercrombie", "sent"], ["Eleven Eleven", "sent"], ["Tower 28", "sent"], ["Kosas", "sent"], ["Crown Affair", "sent"], ["LYS Beauty", "sent"], ["Emi Jay", "sent"], ["Victoria Beckham Beauty", "sent"], ["OSEA", "sent"], ["Necessaire", "sent"], ["Beis", "sent"], ["Dibs Beauty", "sent"], ["Supergoop", "sent"], ["PrettyLittleThing", "sent"], ["Haus Labs", "sent"], ["Lake", "sent"], ["Ilia", "sent"], ["Madhappy", "sent"], ["Colorescience", "sent"], ["Shark Ninja", "sent"], ["Still Here", "sent"], ["Set Active", "sent"], ["Gap", "sent"], ["Agolde", "sent"], ["Cozy Land", "sent"], ["Charlotte Tilbury", "sent"],
].map(([name, status]) => ({ name, status }));

const WINNERS = [
  { title: "Target Matching Set Haul", views: "1.06M", newViewers: "727K", followers: 601, why: "Highest reach, huge shares, and strongest ShopMy conversion. Make Target sequels immediately." },
  { title: "Morning of Self-Care", views: "502.7K", newViewers: "Lifestyle reach", followers: "Awareness", why: "Self-care/lifestyle can go very wide. Use it as trust-building between fashion and creator-tip videos." },
  { title: "Haircut / Brunette Bob Video", views: "426.6K", newViewers: "Beauty transformation", followers: "Awareness", why: "Transformation/aesthetic decision content has viral potential outside your core followers." },
  { title: "Princess Polly Spring Finds", views: "152.3K", newViewers: "81K", followers: "Brand proof", why: "Fashion partner content works when styled as an organic try-on haul." },
  { title: "Amazon / SUUKSESS Spring Top Haul", views: "121.9K", newViewers: "78K", followers: "Fashion reach", why: "Affordable Amazon fashion and Skims-dupe framing is a repeatable winner." },
  { title: "PR Haul Tips", views: "24.2K", newViewers: "13K", followers: 454, why: "Lower views than fashion, but converts followers extremely well." },
  { title: "Microinfluencer PR Haul", views: "18.4K", newViewers: "Creator audience", followers: 473, why: "Creator-tip content is your best follower-conversion engine." },
  { title: "Morning Room Reset", views: "11.3K", newViewers: "Community", followers: "Trust", why: "Strong relationship-building content. Keep it between growth/revenue posts." },
];

const SHOPMY_WINNERS = [
  { item: "Target Wild Fable Straight Leg Pull-On Pants", clicks: "2.9K", orders: 136, earned: "$430" },
  { item: "Target Wild Fable Babydoll Tank Top", clicks: "2.9K", orders: 111, earned: "$275" },
  { item: "Target Wild Fable Pull-On Shorts", clicks: "1.7K", orders: 65, earned: "$152" },
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
  ["Summer outfits under $50", "Haul", "Make under $50 collection", "follow for more budget-friendly finds"],
];

const STATUS = {
  gifting: { label: "🎁 Gifting", bg: "#d1fae5", text: "#065f46" },
  pr_list: { label: "📋 PR List", bg: "#dbeafe", text: "#1d4ed8" },
  not_now: { label: "⏸️ Not Now", bg: "#f3f4f6", text: "#6b7280" },
  paid: { label: "💸 Paid", bg: "#ede9fe", text: "#5b21b6" },
  follow_up: { label: "⏳ Follow Up", bg: "#ffedd5", text: "#9a3412" },
  sent: { label: "✉️ Sent", bg: "#fef3c7", text: "#92400e" },
};

const TABS = ["📌 Dashboard", "💡 Ideas", "✍️ Captions", "🛍️ ShopMy", "📅 Plan", "📊 Brands", "⚙️ Update"];
const pill = { border: "1px solid #f0d8df", background: "#fff", borderRadius: 999, padding: "7px 12px", fontFamily: "inherit", color: "#8b3a52" };

function loadData() {
  try {
    const saved = localStorage.getItem("sophie-live-tool-v2");
    if (saved) return JSON.parse(saved);
  } catch {}
  return { stats: DEFAULT_DATA, brands: INITIAL_BRANDS };
}

function saveData(next) {
  localStorage.setItem("sophie-live-tool-v2", JSON.stringify(next));
}

function num(n) {
  return Number(String(n).replace(/[^0-9.]/g, "")) || 0;
}

function makeIdeas(prompt) {
  const p = prompt.toLowerCase();
  const isTarget = p.includes("target") || p.includes("fashion") || p.includes("haul") || p.includes("outfit");
  const isPR = p.includes("pr") || p.includes("micro") || p.includes("brand") || p.includes("gifting");
  const isShop = p.includes("shopmy") || p.includes("link") || p.includes("affiliate");
  const base = isTarget ? [
    ["Target Finds of the Week 🎯", "Film a quick try-on with 3-5 Wild Fable/new arrival pieces and keep the video tight.", "Put Target collection first on ShopMy.", "This matches the 1.09M view format and your top-earning products."],
    ["I found the cutest Target set under $40", "Open with the set in hand, then try it on immediately.", "Link the full outfit + similar colors.", "Affordable matching sets already proved they convert."],
  ] : isPR ? [
    ["How I got PR with under 10K followers", "Explain one real tip, then show proof through packages or messages.", "No hard sell, use it to gain followers.", "PR/tip videos are your best follower-converters."],
    ["Brands that sent me PR this month", "Fast montage of Divi, Saltair, Salt & Stone, Prequel, Sacheu.", "Link what you genuinely use.", "Builds credibility for followers and future brands."],
  ] : isShop ? [
    ["My most sold ShopMy items right now", "Show the Target pants, tank, and shorts with receipts-style text overlay.", "Pin Top Sellers collection.", "Your audience buys basics, not random luxury."],
    ["How I make money from links as a microinfluencer", "Explain ShopMy quickly while showing your actual top sellers.", "Use ShopMy referral + top collections.", "Combines creator tips with revenue proof."],
  ] : [
    ["Spend the morning with me, but everything is linked", "Lifestyle vlog with OOTD, beauty, room reset, and coffee/errands.", "Link outfit, room, and beauty products.", "Lifestyle builds trust between haul videos."],
    ["Affordable finds I’d buy again", "Show 5 things you genuinely love from Target/Amazon/Gap.", "Create 'Most Asked About' collection.", "Repurchase energy drives trust and clicks."],
  ];

  const extras = [
    ["Follow for more hauls like these 🤍", "Use this exact CTA in caption and/or text overlay.", "Works for followers.", "Your viral Target video used a direct follow CTA."],
    ["What I’d post if I wanted to hit 10K this month", "Turn your growth strategy into content, with honest creator advice.", "No links needed.", "Creator transparency converts followers."],
    ["The pieces my followers actually bought", "Show ShopMy top sellers and explain why they’re worth it.", "Top Sellers collection.", "Social proof + sales proof = high conversion."],
  ];

  return [...base, ...extras].map((x, i) => `${i + 1}. ${x[0]}\nConcept: ${x[1]}\nShopMy angle: ${x[2]}\nWhy it should work: ${x[3]}`).join("\n\n");
}

function makeCaptions(prompt) {
  const isHaul = /target|amazon|gap|haul|outfit|try/.test(prompt.toLowerCase());
  const isPR = /pr|brand|gifting|micro/.test(prompt.toLowerCase());
  if (isHaul) return `Option 1:\nfollow for more haul videos like this 🤍 everything is so cute and actually affordable, linking all my favorites in bio!! #targetfinds #amazonfinds #tryonhaul #affordablefashion #shopmy #summeroutfits\n\nOption 2:\nthis is your sign to check the new summer finds because I’m obsessed ✨ linked everything I could in my ShopMy! follow for more affordable outfit inspo 🫶 #haul #outfitideas #targethaul #fashionfinds #creatorfinds`;
  if (isPR) return `Option 1:\nposting this because so many of you asked how brands find smaller creators 💕 follow for more PR + microinfluencer tips like this!! #prhaul #microinfluencer #microinfluencertips #howtogetpr #creatorlife\n\nOption 2:\nso grateful for these packages and I love sharing the real behind-the-scenes of growing as a creator ✨ follow for more tips + PR updates 🤍 #prunboxing #creatorjourney #brandcollab #gifted`;
  return `Option 1:\nspend the morning with me 🤍 nothing makes me feel more put together than a little reset moment. linking what I can in bio, follow for more little life moments ✨ #dayinmylife #morningroutine #roomreset #lifestylecreator\n\nOption 2:\nsoft morning reset because I needed this today 🫶 follow for more routines, room inspo, and everyday favorites 🤍 #roominspo #girlyroom #morningreset #lifestyle`;
}

function makeShopMy(prompt) {
  return `ShopMy move for this: put your Target / affordable fashion links first.\n\n1. Create or update these collections:\n- Viral Target Finds\n- My Most Sold Items\n- Summer Outfits Under $50\n- Matching Sets\n- Room Reset Essentials\n\n2. Caption language that converts:\n- “linked everything in my bio”\n- “I added every color I could find to my ShopMy”\n- “these are my most sold items right now”\n\n3. What to prioritize:\nYour audience is buying basics: pants, tanks, shorts, matching sets, and affordable outfit pieces. Put those above beauty links right now.\n\n4. Video idea:\nMake a video called “the Target pieces my followers actually bought” and show the 136-order pants, 111-order tank, and 65-order shorts.`;
}

export default function SophieContentStudioLive() {
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
  const needed = Math.max(0, num(stats.followerGoal) - num(stats.followers));
  const daysAtRecentRate = Math.ceil(needed / Math.max(1, num(stats.netFollowers7d) / 7));
  const counts = useMemo(() => brands.reduce((acc, b) => ((acc[b.status] = (acc[b.status] || 0) + 1), acc), {}), [brands]);

  function updateStore(next) { setStore(next); saveData(next); }
  function changeBrandStatus(name, status) { updateStore({ ...store, brands: brands.map(b => b.name === name ? { ...b, status } : b) }); }
  function addBrand() { if (!newBrand.trim()) return; updateStore({ ...store, brands: [{ name: newBrand.trim(), status: "sent" }, ...brands] }); setNewBrand(""); }

  const filteredBrands = brands.filter(b => (filter === "all" || b.status === filter) && b.name.toLowerCase().includes(search.toLowerCase()));

  return <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#fff7f9 0%,#fff 55%,#f7f1ff 100%)", color: "#2d1b1b", fontFamily: "Georgia, 'Times New Roman', serif" }}>
    <header style={{ background: "linear-gradient(135deg,#2d1b1b,#7a2844)", color: "white", textAlign: "center", padding: "30px 18px 22px" }}>
      <div style={{ letterSpacing: 4, fontSize: 12, opacity: .75 }}>{stats.handle}</div>
      <h1 style={{ margin: "8px 0 4px", fontSize: 30, fontWeight: 400 }}>Sophie's Content Studio</h1>
      <p style={{ margin: "0 0 16px", color: "#f7d4dd", fontSize: 14 }}>{stats.followers.toLocaleString()} → {stats.followerGoal.toLocaleString()} followers · ShopMy {stats.shopmyTier} · {stats.shopmyEarned2026} earned in 2026</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10, maxWidth: 520, margin: "0 auto" }}>
        {[
          [stats.followers.toLocaleString(), "Followers"], [stats.views60d, "Views 60d"], [stats.netFollowers7d, "Net followers 7d"], [stats.shopmyLifetime, "ShopMy lifetime"]
        ].map(([v, l]) => <div key={l} style={{ background: "rgba(255,255,255,.11)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 14, padding: 11 }}><b style={{ fontSize: 22 }}>{v}</b><div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 1, color: "#f4c8d3" }}>{l}</div></div>)}
      </div>
    </header>

    <nav style={{ display: "flex", overflowX: "auto", background: "white", borderBottom: "1px solid #f2dfe5", padding: "0 8px" }}>
      {TABS.map((t, i) => <button key={t} onClick={() => setTab(i)} style={{ background: "none", border: 0, borderBottom: tab === i ? "3px solid #8b3a52" : "3px solid transparent", color: tab === i ? "#8b3a52" : "#8d8588", padding: "14px 12px 12px", whiteSpace: "nowrap", fontFamily: "inherit", fontWeight: tab === i ? 700 : 400 }}>{t}</button>)}
    </nav>

    <main style={{ maxWidth: 680, margin: "0 auto", padding: 18 }}>
      {tab === 0 && <section>
        <h2 style={{ fontWeight: 400 }}>Live Growth Dashboard 📌</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 10 }}>
          {[
            [needed.toLocaleString(), "Followers to 10K", "#fce7f3", "#9d174d"], [daysAtRecentRate, "Days at current pace", "#e0e7ff", "#3730a3"], [stats.profileViews60d, "Profile views 60d", "#d1fae5", "#065f46"], [stats.shares60d, "Shares 60d", "#fef3c7", "#92400e"]
          ].map(([v, l, bg, color]) => <div key={l} style={{ background: bg, color, borderRadius: 16, padding: 16 }}><div style={{ fontSize: 26, fontWeight: 800 }}>{v}</div><div style={{ fontSize: 12, textTransform: "uppercase", fontWeight: 700 }}>{l}</div></div>)}
        </div>
        <Card title="June goals">
          <p><b>Follower goal:</b> 10K followers, {needed.toLocaleString()} left.</p>
          <p><b>ShopMy goal:</b> {stats.juneShopMyGoal} earnings in June.</p>
          <p><b>Gifting goal:</b> {stats.juneGiftingGoal} gifting partners, {(stats.juneGiftingGoal - (counts.gifting || 0)).toLocaleString()} more needed.</p>
          <p><b>Paid collab goal:</b> {stats.junePaidCollabGoal} paid collabs totaling {stats.junePaidCollabRevenueGoal}.</p>
        </Card>
        <Card title="Your current strategy">
          <p><b>Post mix:</b> 40% affordable fashion, 30% creator/PR tips, 20% lifestyle, 10% beauty.</p>
          <p><b>Best posting windows:</b> {stats.bestPostTimes}. Test 5:30 PM and 8:30 PM.</p>
          <p><b>Main insight:</b> {stats.activeInsight}</p>
        </Card>
        <Card title="Top content winners">
          {WINNERS.map(w => <div key={w.title} style={{ padding: "9px 0", borderBottom: "1px solid #f8e7ec" }}><b>{w.title}</b><div style={{ color: "#8b3a52", fontSize: 13 }}>{w.views} views · {w.followers} followers</div><div style={{ color: "#666", fontSize: 13 }}>{w.why}</div></div>)}
        </Card>
      </section>}

      {tab === 1 && <Generator title="Viral Content Ideas ✨" prompt={ideaPrompt} setPrompt={setIdeaPrompt} result={ideaResult} setResult={setIdeaResult} generate={() => setIdeaResult(makeIdeas(ideaPrompt || "What should I post today?"))} placeholder="Example: I got Saltair PR, Target haul part 2, or microinfluencer tips" chips={["What should I post today?", "Target haul part 2", "PR tips video", "ShopMy video idea", "Summer affordable fashion"]} />}
      {tab === 2 && <Generator title="Caption Writer ✍️" prompt={captionPrompt} setPrompt={setCaptionPrompt} result={captionResult} setResult={setCaptionResult} generate={() => setCaptionResult(makeCaptions(captionPrompt || "Target haul"))} placeholder="Describe your video" chips={["Target summer haul", "PR haul as a microinfluencer", "Morning room reset", "Amazon tops under $30"]} />}
      {tab === 3 && <Generator title="ShopMy Strategy 🛍️" prompt={shopPrompt} setPrompt={setShopPrompt} result={shopResult} setResult={setShopResult} generate={() => setShopResult(makeShopMy(shopPrompt))} placeholder="Ask about links, collections, products, or clicks" chips={["How do I convert viral viewers into clicks?", "What collections should I make?", "How do I use my Target sales?", "How do I promote ShopMy without being annoying?"]} extra={<Card title="Proven ShopMy winners">{SHOPMY_WINNERS.map(w => <p key={w.item}><b>{w.item}</b><br/><span style={{ color: "#8b3a52" }}>{w.clicks} clicks · {w.orders} orders · {w.earned}</span></p>)}</Card>} />}

      {tab === 4 && <section><h2 style={{ fontWeight: 400 }}>14-Day Plan to 10K 📅</h2><p style={{ color: "#777" }}>Built from your updated analytics: fashion for reach/revenue, creator tips for followers, lifestyle for trust.</p>{PLAN.map((p, i) => <Card key={i} title={`Day ${i + 1} · ${p[1]}`}><p><b>{p[0]}</b></p><p>🛍️ {p[2]}</p><p>💬 CTA: “{p[3]}”</p></Card>)}</section>}

      {tab === 5 && <section>
        <h2 style={{ fontWeight: 400 }}>Brand Outreach Tracker 📊</h2>
        <p style={{ color: "#777" }}>{brands.length} brands contacted · {counts.gifting || 0}/{stats.juneGiftingGoal} gifting · {counts.paid || 0}/{stats.junePaidCollabGoal} paid · {counts.pr_list || 0} PR list</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>{["all", "gifting", "pr_list", "paid", "follow_up", "sent", "not_now"].map(f => <button key={f} onClick={() => setFilter(f)} style={{ ...pill, background: filter === f ? "#8b3a52" : "white", color: filter === f ? "white" : "#8b3a52" }}>{f === "all" ? "All" : STATUS[f].label}</button>)}</div>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search brands" style={inputStyle}/>
        <div style={{ display: "flex", gap: 8, margin: "10px 0" }}><input value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="Add new brand" style={inputStyle}/><button onClick={addBrand} style={{ ...pill, background: "#8b3a52", color: "white" }}>Add</button></div>
        {filteredBrands.map(b => <div key={b.name} style={{ background: "white", border: "1px solid #f4dfe6", borderRadius: 14, padding: 12, display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}><b>{b.name}</b><select value={b.status} onChange={e => changeBrandStatus(b.name, e.target.value)} style={{ ...pill, background: STATUS[b.status].bg, color: STATUS[b.status].text }}><option value="sent">Sent</option><option value="gifting">Gifting</option><option value="pr_list">PR List</option><option value="not_now">Not Now</option><option value="paid">Paid</option><option value="follow_up">Follow Up</option></select></div>)}
      </section>}

      {tab === 6 && <section>
        <h2 style={{ fontWeight: 400 }}>Update Your Data ⚙️</h2>
        <p style={{ color: "#777" }}>This saves in your browser using localStorage, so the website can keep updating without rebuilding the code.</p>
        <textarea value={updateDraft} onChange={e => setUpdateDraft(e.target.value)} style={{ ...inputStyle, minHeight: 280, fontFamily: "monospace", fontSize: 12 }} />
        <button onClick={() => { try { const nextStats = JSON.parse(updateDraft); updateStore({ ...store, stats: nextStats }); alert("Updated!"); } catch { alert("The JSON has an error. Check commas/quotes."); } }} style={{ ...pill, background: "#8b3a52", color: "white", marginTop: 8 }}>Save updated stats</button>
        <button onClick={() => { const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "sophie-content-studio-backup.json"; a.click(); }} style={{ ...pill, marginLeft: 8 }}>Export backup</button>
      </section>}
    </main>
  </div>;
}

const inputStyle = { width: "100%", boxSizing: "border-box", border: "1px solid #f0d8df", borderRadius: 14, padding: 12, fontFamily: "inherit", fontSize: 14, outline: "none", background: "white" };

function Card({ title, children }) { return <div style={{ background: "white", border: "1px solid #f4dfe6", borderRadius: 18, padding: 16, marginTop: 14, boxShadow: "0 2px 14px rgba(139,58,82,.06)" }}><h3 style={{ margin: "0 0 10px", color: "#8b3a52" }}>{title}</h3><div style={{ fontSize: 14, lineHeight: 1.55 }}>{children}</div></div>; }

function Generator({ title, prompt, setPrompt, result, setResult, generate, placeholder, chips, extra }) { return <section><h2 style={{ fontWeight: 400 }}>{title}</h2><textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={placeholder} style={{ ...inputStyle, minHeight: 100 }} /><button onClick={generate} style={{ ...pill, background: "linear-gradient(135deg,#8b3a52,#6b2a3e)", color: "white", width: "100%", marginTop: 10, padding: 13 }}>Generate</button><div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>{chips.map(c => <button key={c} onClick={() => setPrompt(c)} style={pill}>{c}</button>)}</div>{result && <Card title="Result"><div style={{ whiteSpace: "pre-wrap" }}>{result}</div><button onClick={() => navigator.clipboard?.writeText(result)} style={{ ...pill, marginTop: 10 }}>Copy result</button></Card>}{extra}</section>; }
