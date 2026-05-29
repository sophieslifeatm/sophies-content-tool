import { useEffect, useMemo, useState } from "react";

const DEFAULT_ANALYTICS = {
  followers: "7,910",
  followerGoal: "10K",
  views7d: "1.1M",
  views30d: "1M+",
  engagementRate: "12.8%",
  shopmyEarned: "$1,543",
  shopmyTier: "Icon",
  trustedShoppers: "404",
  giftingBrands: "Divi, Salt & Stone, Saltair, Prequel",
  bestPostingTimes: "4 PM, 6 PM, 9 PM",
  topContent: "Target Matching Set Haul: 1.1M views\nMorning of self-care: 502.7K views\nThe urge to get this haircut as a brunette: 426.3K views\nAmazon Spring Top Haul: 121.5K views\nSephora kit review: 39.9K views",
  topShopMy: "Target Wild Fable pants: 136 orders / $430\nTarget Wild Fable tank: 111 orders / $275\nTarget Wild Fable shorts: 65 orders / $152",
};

const DEFAULT_BRANDS = [
  { name: "Divi", status: "gifting" },
  { name: "Salt & Stone", status: "gifting" },
  { name: "Saltair", status: "gifting" },
  { name: "Prequel", status: "gifting" },
  { name: "Naturium", status: "pr_list" },
  { name: "Paula's Choice", status: "not_now" },
  { name: "Target", status: "sent" },
  { name: "Merit Beauty", status: "sent" },
  { name: "Aveda", status: "sent" },
  { name: "Baublebar", status: "sent" },
  { name: "Orebella", status: "sent" },
  { name: "Loving Tan", status: "sent" },
  { name: "Cyklar", status: "sent" },
  { name: "Athena Club", status: "sent" },
  { name: "Hanni", status: "sent" },
  { name: "Facile", status: "sent" },
  { name: "The Outset", status: "sent" },
  { name: "Shiseido", status: "sent" },
  { name: "DECIEM", status: "sent" },
  { name: "Tatcha", status: "sent" },
  { name: "ELEMIS", status: "sent" },
  { name: "ColourPop", status: "sent" },
  { name: "Dior Beauty", status: "sent" },
  { name: "Rare Beauty", status: "sent" },
  { name: "Gap Factory", status: "sent" },
  { name: "HigherDOSE", status: "sent" },
  { name: "Rhode", status: "sent" },
  { name: "Gorjana", status: "sent" },
  { name: "Cocokind", status: "sent" },
  { name: "Skinfix", status: "sent" },
  { name: "Snif", status: "sent" },
  { name: "Free People", status: "sent" },
  { name: "Dairy Boy", status: "sent" },
  { name: "Daily Drills", status: "sent" },
  { name: "Parke", status: "sent" },
  { name: "Adanola", status: "sent" },
  { name: "Sincerely Yours", status: "sent" },
  { name: "437", status: "sent" },
  { name: "Olaplex", status: "sent" },
  { name: "American Eagle", status: "sent" },
  { name: "JVN Hair", status: "sent" },
  { name: "Inn Beauty", status: "sent" },
  { name: "Dieux", status: "sent" },
  { name: "Glossier", status: "sent" },
  { name: "Eadem", status: "sent" },
  { name: "Versed", status: "sent" },
  { name: "Aritzia", status: "sent" },
  { name: "Summer Fridays", status: "sent" },
  { name: "Refy", status: "sent" },
  { name: "K18", status: "sent" },
  { name: "Gisou", status: "sent" },
  { name: "Meshki", status: "sent" },
  { name: "Cotton On", status: "sent" },
  { name: "Garage", status: "sent" },
  { name: "Hollister", status: "sent" },
  { name: "Grey Bandit", status: "sent" },
  { name: "Aerie", status: "sent" },
  { name: "Kopari", status: "sent" },
  { name: "Dae Hair", status: "sent" },
  { name: "Abercrombie", status: "sent" },
  { name: "Tower 28", status: "sent" },
  { name: "Kosas", status: "sent" },
  { name: "Crown Affair", status: "sent" },
  { name: "Emi Jay", status: "sent" },
  { name: "Victoria Beckham Beauty", status: "sent" },
  { name: "Osea", status: "sent" },
  { name: "Necessaire", status: "sent" },
  { name: "Beis", status: "sent" },
  { name: "Dibs Beauty", status: "sent" },
  { name: "Supergoop", status: "sent" },
  { name: "Pretty Little Thing", status: "sent" },
  { name: "Haus Labs", status: "sent" },
  { name: "Lake", status: "sent" },
  { name: "Ilia", status: "sent" },
  { name: "Madhappy", status: "sent" },
  { name: "Colorescience", status: "sent" },
  { name: "Shark Ninja", status: "sent" },
  { name: "Still Here", status: "sent" },
  { name: "Set Active", status: "sent" },
  { name: "Gap", status: "sent" },
  { name: "Agolde", status: "sent" },
  { name: "Charlotte Tilbury", status: "sent" },
];

const TABS = ["Ideas", "Captions", "ShopMy", "Plan", "Brands", "Update"];

const THIRTY_DAY_PLAN = [
  { day: 1, type: "Haul", idea: "Target summer haul with Wild Fable matching sets and new arrivals", shopmy: "Link every Target item", cta: "follow for more Target hauls" },
  { day: 2, type: "Lifestyle", idea: "Summer morning in my life with outfit, coffee, errands, and reset clips", shopmy: "Outfit links and room finds", cta: "follow along for my daily life" },
  { day: 3, type: "Beauty", idea: "First impressions using a new gifted product in a GRWM", shopmy: "Beauty routine collection", cta: "follow for honest beauty reviews" },
  { day: 4, type: "Haul", idea: "Amazon summer tops under $30 try-on", shopmy: "Amazon storefront plus ShopMy", cta: "follow for more affordable finds" },
  { day: 5, type: "Tips", idea: "How I get gifting as a microinfluencer", shopmy: "Creator favorites shelf", cta: "follow for more creator tips" },
  { day: 6, type: "Beauty", idea: "Haircare gifted unboxing plus first try", shopmy: "Haircare shelf", cta: "follow to see my full review" },
  { day: 7, type: "Lifestyle", idea: "Morning room reset with clean girl room details", shopmy: "Room and decor finds", cta: "follow for more room inspo" },
  { day: 8, type: "Haul", idea: "PR haul update with everything I received this week", shopmy: "Gifted products shelf", cta: "follow for more PR hauls" },
  { day: 9, type: "Beauty", idea: "Everyday summer makeup routine", shopmy: "Makeup routine collection", cta: "follow for more GRWMs" },
  { day: 10, type: "Haul", idea: "Splurge vs save fashion finds", shopmy: "Splurge and dupe shelves", cta: "follow for honest try-ons" },
];

const STATUS_CONFIG = {
  gifting: { label: "Gifting", bg: "#f5e7ee", text: "#8b3a52" },
  pr_list: { label: "PR List", bg: "#f1eef8", text: "#5f4b8b" },
  sent: { label: "Sent", bg: "#f8efe7", text: "#8b553a" },
  not_now: { label: "Not Now", bg: "#eeeeee", text: "#777" },
};

function loadSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <span style={styles.fieldLabel}>{label}</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} style={styles.input} />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 5 }) {
  return (
    <label style={{ display: "block" }}>
      <span style={styles.fieldLabel}>{label}</span>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} rows={rows} style={styles.textarea} />
    </label>
  );
}

export default function SophieTool() {
  const [activeTab, setActiveTab] = useState(0);
  const [analytics, setAnalytics] = useState(() => loadSaved("sophieAnalytics", DEFAULT_ANALYTICS));
  const [draftAnalytics, setDraftAnalytics] = useState(analytics);
  const [brands, setBrands] = useState(() => loadSaved("sophieBrands", DEFAULT_BRANDS));
  const [brandDraft, setBrandDraft] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [brandSearch, setBrandSearch] = useState("");
  const [prompt, setPrompt] = useState("");
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [shopMyPrompt, setShopMyPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedNote, setSavedNote] = useState("");

  useEffect(() => {
    localStorage.setItem("sophieAnalytics", JSON.stringify(analytics));
  }, [analytics]);

  useEffect(() => {
    localStorage.setItem("sophieBrands", JSON.stringify(brands));
  }, [brands]);

  useEffect(() => {
    setBrandDraft(brands.map(b => `${b.name} | ${b.status}`).join("\n"));
  }, [brands]);

  const counts = useMemo(() => {
    return {
      gifting: brands.filter(b => b.status === "gifting").length,
      sent: brands.filter(b => b.status === "sent").length,
      all: brands.length,
    };
  }, [brands]);

  const context = useMemo(() => `
You are a TikTok content strategist for Sophie (@sophieslifeatm), a beauty, fashion, and lifestyle creator.

CURRENT ANALYTICS:
- Followers: ${analytics.followers}, goal: ${analytics.followerGoal}
- 7 day views: ${analytics.views7d}
- 30 day views: ${analytics.views30d}
- Engagement rate: ${analytics.engagementRate}
- ShopMy tier: ${analytics.shopmyTier}
- ShopMy earned: ${analytics.shopmyEarned}
- Trusted shoppers: ${analytics.trustedShoppers}
- Gifting brands: ${analytics.giftingBrands}
- Best posting times: ${analytics.bestPostingTimes}

TOP CONTENT:
${analytics.topContent}

TOP SHOPMY CONVERTERS:
${analytics.topShopMy}

SOPHIE'S VOICE:
Casual, warm, relatable, like texting a friend. Use emojis naturally: 🤍 ✨ 💕 🫶. Keep it specific, not generic.
`, [analytics]);

  async function callClaude(systemExtra, userMsg) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: context + "\n" + systemExtra,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
    const data = await res.json();
    return data.content?.[0]?.text || "Something went wrong. Try again.";
  }

  async function generate(kind) {
    const value = kind === "caption" ? captionPrompt : kind === "shopmy" ? shopMyPrompt : prompt;
    if (!value.trim()) return;
    setLoading(true);
    setResult("");
    try {
      const instructions = {
        ideas: "Generate 5 specific viral TikTok ideas for Sophie. Include hook text, concept, ShopMy angle, and why it should perform well.",
        caption: "Write 2 TikTok caption options in Sophie's voice. Include a strong hook, natural emojis, follow CTA, and 5 to 8 hashtags.",
        shopmy: "Give specific ShopMy strategy advice for Sophie. Include what to link, how to organize shelves, video CTA wording, and how to turn views into clicks.",
      };
      setResult(await callClaude(instructions[kind], value));
    } catch {
      setResult("Error connecting. Try again.");
    }
    setLoading(false);
  }

  function saveAnalytics() {
    setAnalytics(draftAnalytics);
    setSavedNote("Saved. Your dashboard and AI prompts are updated.");
    setTimeout(() => setSavedNote(""), 2500);
  }

  function saveBrands() {
    const parsed = brandDraft
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean)
      .map(line => {
        const [name, status = "sent"] = line.split("|").map(part => part.trim());
        const cleanStatus = ["gifting", "pr_list", "sent", "not_now"].includes(status) ? status : "sent";
        return { name, status: cleanStatus };
      });
    setBrands(parsed);
    setSavedNote("Saved. Your brand tracker is updated.");
    setTimeout(() => setSavedNote(""), 2500);
  }

  const filteredBrands = brands.filter(b => {
    const matchesFilter = brandFilter === "all" || b.status === brandFilter;
    const matchesSearch = b.name.toLowerCase().includes(brandSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <div style={styles.eyebrow}>@sophieslifeatm</div>
        <h1 style={styles.title}>Sophie's Content Studio</h1>
        <p style={styles.subtitle}>{analytics.followers} → {analytics.followerGoal} followers · ShopMy {analytics.shopmyTier} · {analytics.shopmyEarned} earned</p>
      </header>

      <nav style={styles.tabs}>
        {TABS.map((tab, i) => (
          <button key={tab} onClick={() => { setActiveTab(i); setResult(""); }} style={{ ...styles.tab, ...(activeTab === i ? styles.activeTab : {}) }}>
            {tab}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        {activeTab === 0 && (
          <section>
            <h2 style={styles.h2}>Viral Content Ideas ✨</h2>
            <p style={styles.body}>Type a product, vibe, trend, or video idea and get content ideas based on what already performs for you.</p>
            <div style={styles.card}>
              <textarea value={prompt} onChange={e => setPrompt(e.target.value)} placeholder="Example: I just got a Saltair package, or summer Amazon finds, or Target haul follow-up" style={styles.bigPrompt} />
              <button onClick={() => generate("ideas")} style={styles.primaryButton}>{loading ? "Generating..." : "Generate Ideas"}</button>
            </div>
            <QuickChips setPrompt={setPrompt} chips={["Capitalize on my viral Target haul", "PR unboxing ideas", "Summer lifestyle content", "Microinfluencer tips", "Affordable dupes", "ShopMy tutorial"]} />
            <Result result={result} />
          </section>
        )}

        {activeTab === 1 && (
          <section>
            <h2 style={styles.h2}>Caption Writer ✍️</h2>
            <p style={styles.body}>Describe the video and get captions that sound like you, with a hook, CTA, and hashtags.</p>
            <div style={styles.card}>
              <textarea value={captionPrompt} onChange={e => setCaptionPrompt(e.target.value)} placeholder="Example: Target summer haul showing 5 Wild Fable sets, all under $40" style={styles.bigPrompt} />
              <button onClick={() => generate("caption")} style={styles.primaryButton}>{loading ? "Writing..." : "Write Caption"}</button>
            </div>
            <Result result={result} />
          </section>
        )}

        {activeTab === 2 && (
          <section>
            <h2 style={styles.h2}>ShopMy Strategy 🛍️</h2>
            <p style={styles.body}>Ask what to link, how to organize shelves, or how to turn viral views into clicks.</p>
            <div style={styles.simpleGrid}>
              <MiniStat label="ShopMy" value={analytics.shopmyTier} />
              <MiniStat label="Earned" value={analytics.shopmyEarned} />
              <MiniStat label="Shoppers" value={analytics.trustedShoppers} />
              <MiniStat label="Best Views" value={analytics.views7d} />
            </div>
            <div style={styles.card}>
              <textarea value={shopMyPrompt} onChange={e => setShopMyPrompt(e.target.value)} placeholder="Example: How do I get more clicks from my Target haul views?" style={styles.bigPrompt} />
              <button onClick={() => generate("shopmy")} style={styles.primaryButton}>{loading ? "Thinking..." : "Get Strategy"}</button>
            </div>
            <Result result={result} />
          </section>
        )}

        {activeTab === 3 && (
          <section>
            <h2 style={styles.h2}>Simple 30-Day Plan 📅</h2>
            <p style={styles.body}>A clean daily content plan based on your strongest categories: hauls, PR, lifestyle, beauty, and creator tips.</p>
            <div style={{ display: "grid", gap: 12 }}>
              {THIRTY_DAY_PLAN.map(item => (
                <div key={item.day} style={styles.planCard}>
                  <div style={styles.planTop}><span>Day {item.day}</span><span style={styles.pill}>{item.type}</span></div>
                  <h3 style={styles.planTitle}>{item.idea}</h3>
                  <p style={styles.planText}>ShopMy: {item.shopmy}</p>
                  <p style={styles.planText}>CTA: {item.cta}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 4 && (
          <section>
            <h2 style={styles.h2}>Brand Tracker 📊</h2>
            <p style={styles.body}>{counts.all} brands total · {counts.gifting} gifting · {counts.sent} sent</p>
            <div style={styles.filterRow}>
              {["all", "gifting", "pr_list", "sent", "not_now"].map(status => (
                <button key={status} onClick={() => setBrandFilter(status)} style={{ ...styles.filterButton, ...(brandFilter === status ? styles.activeFilter : {}) }}>
                  {status === "all" ? "All" : STATUS_CONFIG[status].label}
                </button>
              ))}
            </div>
            <input value={brandSearch} onChange={e => setBrandSearch(e.target.value)} placeholder="Search brands" style={styles.input} />
            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
              {filteredBrands.map(b => {
                const config = STATUS_CONFIG[b.status] || STATUS_CONFIG.sent;
                return (
                  <div key={`${b.name}-${b.status}`} style={styles.brandRow}>
                    <span>{b.name}</span>
                    <span style={{ ...styles.status, background: config.bg, color: config.text }}>{config.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {activeTab === 5 && (
          <section>
            <h2 style={styles.h2}>Update Your Dashboard</h2>
            <p style={styles.body}>Change your analytics here instead of editing code. Press save and the site will update automatically.</p>

            {savedNote && <div style={styles.savedNote}>{savedNote}</div>}

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Main analytics</h3>
              <div style={styles.formGrid}>
                <Field label="Followers" value={draftAnalytics.followers} onChange={v => setDraftAnalytics({ ...draftAnalytics, followers: v })} />
                <Field label="Follower Goal" value={draftAnalytics.followerGoal} onChange={v => setDraftAnalytics({ ...draftAnalytics, followerGoal: v })} />
                <Field label="7 Day Views" value={draftAnalytics.views7d} onChange={v => setDraftAnalytics({ ...draftAnalytics, views7d: v })} />
                <Field label="30 Day Views" value={draftAnalytics.views30d} onChange={v => setDraftAnalytics({ ...draftAnalytics, views30d: v })} />
                <Field label="Engagement Rate" value={draftAnalytics.engagementRate} onChange={v => setDraftAnalytics({ ...draftAnalytics, engagementRate: v })} />
                <Field label="Best Posting Times" value={draftAnalytics.bestPostingTimes} onChange={v => setDraftAnalytics({ ...draftAnalytics, bestPostingTimes: v })} />
                <Field label="ShopMy Tier" value={draftAnalytics.shopmyTier} onChange={v => setDraftAnalytics({ ...draftAnalytics, shopmyTier: v })} />
                <Field label="ShopMy Earned" value={draftAnalytics.shopmyEarned} onChange={v => setDraftAnalytics({ ...draftAnalytics, shopmyEarned: v })} />
                <Field label="Trusted Shoppers" value={draftAnalytics.trustedShoppers} onChange={v => setDraftAnalytics({ ...draftAnalytics, trustedShoppers: v })} />
                <Field label="Gifting Brands" value={draftAnalytics.giftingBrands} onChange={v => setDraftAnalytics({ ...draftAnalytics, giftingBrands: v })} />
              </div>
              <TextAreaField label="Top Content" value={draftAnalytics.topContent} onChange={v => setDraftAnalytics({ ...draftAnalytics, topContent: v })} />
              <TextAreaField label="Top ShopMy Products" value={draftAnalytics.topShopMy} onChange={v => setDraftAnalytics({ ...draftAnalytics, topShopMy: v })} />
              <button onClick={saveAnalytics} style={styles.primaryButton}>Save Analytics</button>
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Brand tracker</h3>
              <p style={styles.helpText}>Use this format: Brand Name | status. Status options: gifting, pr_list, sent, not_now.</p>
              <textarea value={brandDraft} onChange={e => setBrandDraft(e.target.value)} rows={12} style={styles.textarea} />
              <button onClick={saveBrands} style={styles.primaryButton}>Save Brands</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function QuickChips({ chips, setPrompt }) {
  return (
    <div style={{ margin: "18px 0" }}>
      <p style={styles.chipTitle}>Quick prompts</p>
      <div style={styles.chips}>{chips.map(chip => <button key={chip} onClick={() => setPrompt(chip)} style={styles.chip}>{chip}</button>)}</div>
    </div>
  );
}

function Result({ result }) {
  if (!result) return null;
  return <div style={styles.result}>{result}</div>;
}

function MiniStat({ label, value }) {
  return (
    <div style={styles.miniStat}>
      <div style={styles.miniValue}>{value}</div>
      <div style={styles.miniLabel}>{label}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fff8f9 0%, #ffffff 48%, #f7f2fb 100%)",
    fontFamily: "Georgia, serif",
    color: "#2d1b1b",
  },
  hero: {
    padding: "42px 20px 34px",
    textAlign: "center",
    background: "linear-gradient(135deg, #3b1d27 0%, #74344b 100%)",
    color: "white",
  },
  eyebrow: {
    fontSize: 12,
    letterSpacing: 4,
    textTransform: "uppercase",
    color: "rgba(255,230,235,.72)",
    marginBottom: 10,
  },
  title: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.1,
    fontWeight: 400,
  },
  subtitle: {
    margin: "14px auto 0",
    fontSize: 18,
    color: "rgba(255,225,232,.85)",
  },
  tabs: {
    display: "flex",
    justifyContent: "center",
    gap: 6,
    padding: "0 16px",
    background: "#fff",
    borderBottom: "1px solid #f0e5e8",
    overflowX: "auto",
  },
  tab: {
    background: "transparent",
    border: "none",
    borderBottom: "3px solid transparent",
    padding: "18px 16px 14px",
    color: "#9a8f92",
    fontFamily: "inherit",
    fontSize: 17,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  activeTab: {
    color: "#8b3a52",
    borderBottomColor: "#8b3a52",
    fontWeight: 700,
  },
  main: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "42px 22px 80px",
  },
  h2: {
    fontSize: 34,
    fontWeight: 400,
    margin: "0 0 10px",
  },
  body: {
    fontSize: 19,
    lineHeight: 1.55,
    color: "#7f7778",
    maxWidth: 760,
    margin: "0 0 28px",
  },
  card: {
    background: "rgba(255,255,255,.9)",
    border: "1px solid #f0d9df",
    borderRadius: 22,
    padding: 22,
    boxShadow: "0 18px 40px rgba(139,58,82,.07)",
    marginBottom: 20,
  },
  cardTitle: {
    margin: "0 0 16px",
    fontSize: 22,
    fontWeight: 400,
  },
  bigPrompt: {
    width: "100%",
    minHeight: 145,
    resize: "vertical",
    border: "none",
    outline: "none",
    background: "transparent",
    color: "#2d1b1b",
    fontFamily: "inherit",
    fontSize: 20,
    lineHeight: 1.55,
    boxSizing: "border-box",
  },
  primaryButton: {
    width: "100%",
    border: "none",
    borderRadius: 16,
    padding: "16px 22px",
    background: "linear-gradient(135deg, #a24361 0%, #6d2b40 100%)",
    color: "white",
    fontFamily: "inherit",
    fontSize: 18,
    cursor: "pointer",
    marginTop: 14,
  },
  chipTitle: {
    color: "#aaa",
    fontSize: 15,
    textTransform: "uppercase",
    letterSpacing: 2,
    margin: "0 0 12px",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    background: "#fff8f9",
    border: "1px solid #efc9d3",
    borderRadius: 999,
    padding: "10px 18px",
    color: "#8b3a52",
    fontFamily: "inherit",
    fontSize: 16,
    cursor: "pointer",
  },
  result: {
    whiteSpace: "pre-wrap",
    background: "#fff",
    border: "1px solid #f0d9df",
    borderRadius: 22,
    padding: 24,
    fontSize: 17,
    lineHeight: 1.65,
    boxShadow: "0 18px 40px rgba(139,58,82,.07)",
  },
  simpleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 12,
    marginBottom: 18,
  },
  miniStat: {
    background: "#fff",
    border: "1px solid #f0d9df",
    borderRadius: 18,
    padding: 18,
  },
  miniValue: {
    color: "#8b3a52",
    fontSize: 28,
    fontWeight: 700,
  },
  miniLabel: {
    color: "#9a8f92",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  planCard: {
    background: "#fff",
    border: "1px solid #f0d9df",
    borderRadius: 18,
    padding: 18,
  },
  planTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#9a8f92",
    fontSize: 14,
    marginBottom: 8,
  },
  pill: {
    background: "#fff2f5",
    color: "#8b3a52",
    borderRadius: 999,
    padding: "5px 12px",
  },
  planTitle: {
    margin: "0 0 8px",
    fontSize: 19,
    fontWeight: 500,
  },
  planText: {
    margin: "4px 0",
    color: "#777",
    fontSize: 15,
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 14,
  },
  filterButton: {
    border: "1px solid #f0d9df",
    background: "#fff",
    color: "#777",
    borderRadius: 999,
    padding: "9px 16px",
    fontFamily: "inherit",
    cursor: "pointer",
  },
  activeFilter: {
    background: "#8b3a52",
    color: "#fff",
  },
  brandRow: {
    background: "#fff",
    border: "1px solid #f0d9df",
    borderRadius: 14,
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
    fontSize: 16,
  },
  status: {
    borderRadius: 999,
    padding: "5px 12px",
    fontSize: 13,
    whiteSpace: "nowrap",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: 14,
    marginBottom: 16,
  },
  fieldLabel: {
    display: "block",
    color: "#8b3a52",
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #edd5dc",
    borderRadius: 14,
    padding: "13px 15px",
    background: "#fff",
    color: "#2d1b1b",
    fontFamily: "inherit",
    fontSize: 16,
    outline: "none",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #edd5dc",
    borderRadius: 14,
    padding: "13px 15px",
    background: "#fff",
    color: "#2d1b1b",
    fontFamily: "inherit",
    fontSize: 16,
    lineHeight: 1.45,
    outline: "none",
    resize: "vertical",
    marginBottom: 12,
  },
  savedNote: {
    background: "#fff2f5",
    border: "1px solid #efc9d3",
    color: "#8b3a52",
    borderRadius: 14,
    padding: "12px 16px",
    marginBottom: 16,
  },
  helpText: {
    color: "#777",
    fontSize: 15,
    marginTop: -4,
  },
};
