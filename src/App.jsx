import { useMemo, useState } from "react";

const DEFAULT_ANALYTICS = {
  followers: "7,905",
  goal: "10K",
  views60d: "1.7M+",
  shopmy: "$1,681",
  giftingConfirmed: "10",
  giftingGoal: "25",
  paidCollabs: "0",
  paidGoal: "4",
  engagementRate: "13.1%",
  bestTimes: "4 PM, 6 PM, 9 PM",
  topContent: "Target haul: 1.1M views\nMorning self-care: 502.7K views\nHaircut video: 426.3K views\nAmazon haul: 121.5K views",
  topShopMy: "Target Wild Fable pants: 136 orders / $430\nTarget Wild Fable tank: 111 orders / $275\nTarget Wild Fable shorts: 65 orders / $152",
};

const DEFAULT_BRANDS = [
  { name: "Divi", status: "gifting" },
  { name: "Salt & Stone", status: "gifting" },
  { name: "Saltair", status: "gifting" },
  { name: "Prequel", status: "gifting" },
  { name: "Naturium", status: "pr_list" },
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
  { name: "Tatcha", status: "sent" },
  { name: "Rhode", status: "sent" },
  { name: "Free People", status: "sent" },
  { name: "Dae Hair", status: "sent" },
  { name: "Kosas", status: "sent" },
  { name: "Tower 28", status: "sent" },
  { name: "Crown Affair", status: "sent" },
];

const TABS = ["💡 Ideas", "✍️ Captions", "🛍️ ShopMy", "📅 Plan", "📊 Brands", "⚙️ Update"];

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
    <label style={styles.fieldLabel}>
      <span>{label}</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} style={styles.input} />
    </label>
  );
}

function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <label style={styles.fieldLabelWide}>
      <span>{label}</span>
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder || label} rows={5} style={styles.textarea} />
    </label>
  );
}

export default function SophieContentTool() {
  const [activeTab, setActiveTab] = useState(0);
  const [analytics, setAnalytics] = useState(() => loadSaved("sophieAnalyticsClean", DEFAULT_ANALYTICS));
  const [brands, setBrands] = useState(() => loadSaved("sophieBrandsClean", DEFAULT_BRANDS));
  const [draftAnalytics, setDraftAnalytics] = useState(analytics);
  const [newBrand, setNewBrand] = useState("");
  const [newBrandStatus, setNewBrandStatus] = useState("sent");
  const [brandSearch, setBrandSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [savedNote, setSavedNote] = useState("");

  const [ideaPrompt, setIdeaPrompt] = useState("");
  const [ideaResult, setIdeaResult] = useState("");
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [captionResult, setCaptionResult] = useState("");
  const [shopmyPrompt, setShopmyPrompt] = useState("");
  const [shopmyResult, setShopmyResult] = useState("");

  const counts = useMemo(() => {
    return {
      all: brands.length,
      gifting: brands.filter(b => b.status === "gifting").length,
      sent: brands.filter(b => b.status === "sent").length,
      pr: brands.filter(b => b.status === "pr_list").length,
      notNow: brands.filter(b => b.status === "not_now").length,
    };
  }, [brands]);

  const filteredBrands = brands.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(brandSearch.toLowerCase());
    const matchesFilter = brandFilter === "all" || b.status === brandFilter;
    return matchesSearch && matchesFilter;
  });

  const followersNumber = Number(String(analytics.followers).replace(/[^0-9]/g, "")) || 0;
  const goalNumber = Number(String(analytics.goal).replace(/[^0-9]/g, "")) || 10000;
  const followerProgress = Math.min(100, Math.round((followersNumber / goalNumber) * 100));
  const giftingProgress = Math.min(100, Math.round((Number(analytics.giftingConfirmed) / Number(analytics.giftingGoal || 25)) * 100));
  const paidProgress = Math.min(100, Math.round((Number(analytics.paidCollabs) / Number(analytics.paidGoal || 4)) * 100));

  function saveAnalytics() {
    setAnalytics(draftAnalytics);
    localStorage.setItem("sophieAnalyticsClean", JSON.stringify(draftAnalytics));
    setSavedNote("Saved! Your dashboard is updated.");
    setTimeout(() => setSavedNote(""), 2500);
  }

  function addBrand() {
    if (!newBrand.trim()) return;
    const updated = [...brands, { name: newBrand.trim(), status: newBrandStatus }];
    setBrands(updated);
    localStorage.setItem("sophieBrandsClean", JSON.stringify(updated));
    setNewBrand("");
  }

  function updateBrandStatus(index, status) {
    const brandToChange = filteredBrands[index];
    const updated = brands.map(b => b.name === brandToChange.name ? { ...b, status } : b);
    setBrands(updated);
    localStorage.setItem("sophieBrandsClean", JSON.stringify(updated));
  }

  function deleteBrand(index) {
    const brandToDelete = filteredBrands[index];
    const updated = brands.filter(b => b.name !== brandToDelete.name);
    setBrands(updated);
    localStorage.setItem("sophieBrandsClean", JSON.stringify(updated));
  }

  function generateIdeas() {
    const topic = ideaPrompt.trim() || "my next TikTok";
    setIdeaResult(`1. ${topic} but make it feel like a casual best friend recommendation\nHook: “I fear this is about to be my entire personality…”\nAngle: Film it naturally, then link everything in your ShopMy.\nWhy it works: Your audience responds best to casual hauls and finds that feel real.\n\n2. The follow-up video people need\nHook: “Since my last one did so well, here’s part 2…”\nAngle: Repeat your viral format with new products or a more specific category.\nWhy it works: Part 2 videos make people feel like they are already invested.\n\n3. What I would actually buy again\nHook: “Things I own that are actually worth it…”\nAngle: Put the strongest ShopMy products first.\nWhy it works: It feels honest and drives clicks because it sounds personal.`);
  }

  function generateCaption() {
    const topic = captionPrompt.trim() || "this video";
    setCaptionResult(`Option 1:\n${topic} because I clearly cannot stop finding cute things 🤍 linking everything I can in my bio!! follow for more everyday finds + hauls ✨ #haul #fashionfinds #shopmy #creatorlife #grwm\n\nOption 2:\nI was not planning on loving these this much but here we are 🫶 everything is linked in my bio, follow for more cute finds + honest reviews 💕 #tiktokfinds #beautyfinds #outfitinspo #shopmy #lifestylecreator`);
  }

  function generateShopmy() {
    const topic = shopmyPrompt.trim() || "my ShopMy";
    setShopmyResult(`For ${topic}, I would focus on making the links feel like a helpful part of the video, not an afterthought.\n\nBest move:\nMention “I linked everything in my bio” in the caption and pin a comment with the exact category name.\n\nWhat to prioritize:\n1. Target and Amazon finds first because those are your proven converters.\n2. Any product shown on camera, even if it is only in the background.\n3. Create shelves that match your video titles, like “Target haul,” “Room reset,” or “Summer basics.”\n\nEasy CTA:\n“Linked everything I could find in my bio under my ShopMy 🤍”`);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <p style={styles.handle}>@sophieslifeatm</p>
        <h1 style={styles.title}>Sophie's Content Studio</h1>
        <p style={styles.subtitle}>Simple creator workspace for content ideas, captions, ShopMy, brands, and easy updates.</p>
      </header>

      <nav style={styles.tabs}>
        {TABS.map((tab, index) => (
          <button key={tab} onClick={() => setActiveTab(index)} style={{ ...styles.tab, ...(activeTab === index ? styles.activeTab : {}) }}>
            {tab}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        {activeTab === 0 && (
          <section style={styles.card}>
            <h2 style={styles.h2}>Viral Content Ideas ✨</h2>
            <p style={styles.body}>Type a product, vibe, or video idea and get simple content ideas.</p>
            <textarea value={ideaPrompt} onChange={e => setIdeaPrompt(e.target.value)} placeholder="Example: summer Amazon finds, PR unboxing, Target haul follow-up" rows={5} style={styles.textarea} />
            <button onClick={generateIdeas} style={styles.primaryButton}>Generate Ideas</button>
            {ideaResult && <div style={styles.result}>{ideaResult}</div>}
          </section>
        )}

        {activeTab === 1 && (
          <section style={styles.card}>
            <h2 style={styles.h2}>Caption Writer ✍️</h2>
            <p style={styles.body}>Describe your video and get captions in your style.</p>
            <textarea value={captionPrompt} onChange={e => setCaptionPrompt(e.target.value)} placeholder="Example: Target summer haul with 5 cute sets" rows={5} style={styles.textarea} />
            <button onClick={generateCaption} style={styles.primaryButton}>Write Caption</button>
            {captionResult && <div style={styles.result}>{captionResult}</div>}
          </section>
        )}

        {activeTab === 2 && (
          <section style={styles.card}>
            <h2 style={styles.h2}>ShopMy Strategy 🛍️</h2>
            <p style={styles.body}>Ask for ShopMy organization, link strategy, or video CTA help.</p>
            <textarea value={shopmyPrompt} onChange={e => setShopmyPrompt(e.target.value)} placeholder="Example: How do I convert my Target haul views into clicks?" rows={5} style={styles.textarea} />
            <button onClick={generateShopmy} style={styles.primaryButton}>Get Strategy</button>
            {shopmyResult && <div style={styles.result}>{shopmyResult}</div>}
          </section>
        )}

        {activeTab === 3 && (
          <section style={styles.card}>
            <h2 style={styles.h2}>30-Day Plan 📅</h2>
            <div style={styles.planGrid}>
              {[
                "Target or Amazon haul with exact links",
                "PR unboxing with quick first impressions",
                "Morning room reset with ShopMy links",
                "Microinfluencer tips part 2",
                "Affordable dupes under $30",
                "GRWM using products you can link",
                "Weekly recap of favorite finds",
              ].map((item, i) => (
                <div key={item} style={styles.planItem}>
                  <span style={styles.day}>Day {i + 1}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 4 && (
          <section style={styles.card}>
            <h2 style={styles.h2}>Brand Tracker 📊</h2>
            <p style={styles.body}>{counts.all} brands total · {counts.gifting} gifting · {counts.sent} sent</p>
            <div style={styles.formGridSmall}>
              <input value={newBrand} onChange={e => setNewBrand(e.target.value)} placeholder="Add brand name" style={styles.input} />
              <select value={newBrandStatus} onChange={e => setNewBrandStatus(e.target.value)} style={styles.input}>
                <option value="sent">Sent</option>
                <option value="gifting">Gifting</option>
                <option value="pr_list">PR List</option>
                <option value="not_now">Not Now</option>
              </select>
              <button onClick={addBrand} style={styles.primaryButtonSmall}>Add</button>
            </div>
            <div style={styles.filterRow}>
              {["all", "gifting", "pr_list", "sent", "not_now"].map(status => (
                <button key={status} onClick={() => setBrandFilter(status)} style={{ ...styles.filterButton, ...(brandFilter === status ? styles.activeFilter : {}) }}>
                  {status === "all" ? "All" : status.replace("_", " ")}
                </button>
              ))}
            </div>
            <input value={brandSearch} onChange={e => setBrandSearch(e.target.value)} placeholder="Search brands" style={styles.input} />
            <div style={styles.brandList}>
              {filteredBrands.map((brand, index) => (
                <div key={brand.name} style={styles.brandRow}>
                  <span style={styles.brandName}>{brand.name}</span>
                  <select value={brand.status} onChange={e => updateBrandStatus(index, e.target.value)} style={styles.statusSelect}>
                    <option value="sent">Sent</option>
                    <option value="gifting">Gifting</option>
                    <option value="pr_list">PR List</option>
                    <option value="not_now">Not Now</option>
                  </select>
                  <button onClick={() => deleteBrand(index)} style={styles.deleteButton}>×</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 5 && (
          <section style={styles.card}>
            <h2 style={styles.h2}>Update Your Info ⚙️</h2>
            <p style={styles.body}>This is the easy update tab. Type your new numbers in the boxes and press save. No code or JSON needed.</p>
            {savedNote && <div style={styles.savedNote}>{savedNote}</div>}

            <div style={styles.formGrid}>
              <Field label="Followers" value={draftAnalytics.followers} onChange={v => setDraftAnalytics({ ...draftAnalytics, followers: v })} />
              <Field label="Follower Goal" value={draftAnalytics.goal} onChange={v => setDraftAnalytics({ ...draftAnalytics, goal: v })} />
              <Field label="Views 60 Days" value={draftAnalytics.views60d} onChange={v => setDraftAnalytics({ ...draftAnalytics, views60d: v })} />
              <Field label="ShopMy Earned" value={draftAnalytics.shopmy} onChange={v => setDraftAnalytics({ ...draftAnalytics, shopmy: v })} />
              <Field label="Gifting Confirmed" value={draftAnalytics.giftingConfirmed} onChange={v => setDraftAnalytics({ ...draftAnalytics, giftingConfirmed: v })} />
              <Field label="Gifting Goal" value={draftAnalytics.giftingGoal} onChange={v => setDraftAnalytics({ ...draftAnalytics, giftingGoal: v })} />
              <Field label="Paid Collabs" value={draftAnalytics.paidCollabs} onChange={v => setDraftAnalytics({ ...draftAnalytics, paidCollabs: v })} />
              <Field label="Paid Goal" value={draftAnalytics.paidGoal} onChange={v => setDraftAnalytics({ ...draftAnalytics, paidGoal: v })} />
              <Field label="Engagement Rate" value={draftAnalytics.engagementRate} onChange={v => setDraftAnalytics({ ...draftAnalytics, engagementRate: v })} />
              <Field label="Best Posting Times" value={draftAnalytics.bestTimes} onChange={v => setDraftAnalytics({ ...draftAnalytics, bestTimes: v })} />
            </div>
            <TextAreaField label="Top Content" value={draftAnalytics.topContent} onChange={v => setDraftAnalytics({ ...draftAnalytics, topContent: v })} />
            <TextAreaField label="Top ShopMy Products" value={draftAnalytics.topShopMy} onChange={v => setDraftAnalytics({ ...draftAnalytics, topShopMy: v })} />
            <button onClick={saveAnalytics} style={styles.primaryButton}>Save Updates</button>
          </section>
        )}

        {activeTab !== 5 && (
          <section style={styles.progressCard}>
            <h3 style={styles.cardTitle}>Glow Up Tracker</h3>
            <Progress label="Followers" value={`${analytics.followers} / ${analytics.goal}`} percent={followerProgress} />
            <Progress label="Gifting" value={`${analytics.giftingConfirmed} / ${analytics.giftingGoal}`} percent={giftingProgress} />
            <Progress label="Paid collabs" value={`${analytics.paidCollabs} / ${analytics.paidGoal}`} percent={paidProgress} />
          </section>
        )}
      </main>
    </div>
  );
}

function Progress({ label, value, percent }) {
  return (
    <div style={styles.progressWrap}>
      <div style={styles.progressTop}><span>{label}</span><span>{value}</span></div>
      <div style={styles.progressTrack}><div style={{ ...styles.progressFill, width: `${percent}%` }} /></div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fffaf5 0%, #fff5f7 50%, #f8f2ff 100%)",
    color: "#342126",
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  header: {
    padding: "56px 24px 42px",
    textAlign: "center",
    background: "linear-gradient(135deg, #3b1f27 0%, #7f344d 100%)",
  },
  handle: {
    margin: 0,
    color: "rgba(255,255,255,.65)",
    letterSpacing: 6,
    textTransform: "uppercase",
    fontSize: 13,
  },
  title: {
    margin: "12px 0 10px",
    color: "#fff",
    fontSize: "clamp(38px, 7vw, 72px)",
    fontWeight: 500,
    lineHeight: 1,
  },
  subtitle: {
    maxWidth: 680,
    margin: "0 auto",
    color: "rgba(255,235,240,.82)",
    fontFamily: "Arial, sans-serif",
    fontSize: 18,
    lineHeight: 1.45,
  },
  tabs: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    padding: "14px 20px",
    background: "rgba(255,255,255,.72)",
    borderBottom: "1px solid #efd4dc",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  tab: {
    border: "1px solid transparent",
    background: "transparent",
    color: "#8b6d76",
    borderRadius: 999,
    padding: "10px 16px",
    fontWeight: 700,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "Arial, sans-serif",
  },
  activeTab: {
    background: "#fff",
    color: "#9a3f5f",
    border: "1px solid #e8bdca",
    boxShadow: "0 6px 18px rgba(143, 58, 82, .08)",
  },
  main: {
    width: "min(1120px, calc(100% - 32px))",
    margin: "36px auto",
    display: "grid",
    gap: 24,
  },
  card: {
    background: "rgba(255,255,255,.9)",
    border: "1px solid #edcbd5",
    borderRadius: 28,
    padding: "28px",
    boxShadow: "0 20px 60px rgba(143,58,82,.08)",
  },
  progressCard: {
    background: "rgba(255,255,255,.75)",
    border: "1px solid #edcbd5",
    borderRadius: 24,
    padding: 24,
  },
  h2: {
    margin: "0 0 8px",
    color: "#963a5a",
    fontSize: "clamp(30px, 4vw, 46px)",
    lineHeight: 1.05,
    fontWeight: 600,
  },
  body: {
    margin: "0 0 22px",
    color: "#806b72",
    fontFamily: "Arial, sans-serif",
    fontSize: 17,
    lineHeight: 1.5,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #edcbd5",
    borderRadius: 16,
    padding: "14px 16px",
    fontSize: 16,
    outline: "none",
    background: "#fff",
    color: "#342126",
    fontFamily: "Arial, sans-serif",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #edcbd5",
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    lineHeight: 1.5,
    outline: "none",
    resize: "vertical",
    background: "#fff",
    color: "#342126",
    fontFamily: "Arial, sans-serif",
  },
  primaryButton: {
    marginTop: 14,
    width: "100%",
    border: "none",
    borderRadius: 18,
    padding: "15px 20px",
    fontSize: 17,
    fontWeight: 800,
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #9b3f5f, #6f2b41)",
    fontFamily: "Arial, sans-serif",
  },
  primaryButtonSmall: {
    border: "none",
    borderRadius: 16,
    padding: "12px 18px",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #9b3f5f, #6f2b41)",
    fontFamily: "Arial, sans-serif",
  },
  result: {
    marginTop: 18,
    background: "#fff7f9",
    border: "1px solid #edcbd5",
    borderRadius: 20,
    padding: 20,
    whiteSpace: "pre-wrap",
    color: "#493139",
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },
  formGridSmall: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr auto",
    gap: 10,
    marginBottom: 16,
  },
  fieldLabel: {
    display: "grid",
    gap: 7,
    color: "#9a6b7a",
    fontFamily: "Arial, sans-serif",
    fontWeight: 800,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  fieldLabelWide: {
    display: "grid",
    gap: 7,
    marginTop: 16,
    color: "#9a6b7a",
    fontFamily: "Arial, sans-serif",
    fontWeight: 800,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  savedNote: {
    background: "#fff0f5",
    border: "1px solid #edcbd5",
    color: "#963a5a",
    padding: "12px 16px",
    borderRadius: 16,
    marginBottom: 18,
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    margin: "14px 0",
  },
  filterButton: {
    border: "1px solid #edcbd5",
    background: "#fff",
    color: "#806b72",
    borderRadius: 999,
    padding: "8px 14px",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    textTransform: "capitalize",
  },
  activeFilter: {
    color: "#963a5a",
    background: "#fff2f6",
  },
  brandList: {
    display: "grid",
    gap: 8,
    marginTop: 14,
  },
  brandRow: {
    display: "grid",
    gridTemplateColumns: "1fr 150px 42px",
    gap: 10,
    alignItems: "center",
    background: "#fff",
    border: "1px solid #f2d7df",
    borderRadius: 16,
    padding: 12,
    fontFamily: "Arial, sans-serif",
  },
  brandName: {
    fontWeight: 800,
    color: "#3b1f27",
  },
  statusSelect: {
    border: "1px solid #edcbd5",
    borderRadius: 12,
    padding: 10,
    color: "#963a5a",
    background: "#fff7f9",
    fontWeight: 700,
  },
  deleteButton: {
    border: "none",
    borderRadius: 12,
    background: "#f8e2e8",
    color: "#963a5a",
    fontSize: 22,
    cursor: "pointer",
  },
  progressWrap: {
    marginTop: 18,
    fontFamily: "Arial, sans-serif",
  },
  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#342126",
    fontWeight: 800,
    marginBottom: 8,
  },
  progressTrack: {
    height: 14,
    borderRadius: 999,
    background: "#f2d8e0",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #b56882, #efb4c6)",
    borderRadius: 999,
  },
  cardTitle: {
    margin: 0,
    color: "#963a5a",
    fontSize: 28,
  },
  planGrid: {
    display: "grid",
    gap: 12,
  },
  planItem: {
    background: "#fff7f9",
    border: "1px solid #edcbd5",
    borderRadius: 18,
    padding: 18,
    fontFamily: "Arial, sans-serif",
    fontWeight: 700,
    color: "#3b1f27",
  },
  day: {
    display: "inline-block",
    marginBottom: 8,
    color: "#963a5a",
    fontWeight: 900,
  },
};
