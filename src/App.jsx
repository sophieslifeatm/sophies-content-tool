import { useMemo, useState } from "react";

const DEFAULT_ANALYTICS = {
  followers: "7,905",
  goal: "10,000",
  views7d: "1.09M",
  views28d: "1.3M",
  views60d: "1.7M+",
  likesTotal: "525.5K",
  engagementRate: "13.1%",
  shopmy: "$1,681",
  shopmyClicks: "362",
  trustedShoppers: "404",
  giftingConfirmed: "10",
  giftingGoal: "25",
  paidCollabs: "0",
  paidGoal: "4",
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
  { name: "Athena Club", status: "sent" },
  { name: "Hanni", status: "sent" },
  { name: "The Outset", status: "sent" },
  { name: "Tatcha", status: "sent" },
  { name: "Rhode", status: "sent" },
  { name: "Free People", status: "sent" },
  { name: "Dae Hair", status: "sent" },
  { name: "Kosas", status: "sent" },
  { name: "Tower 28", status: "sent" },
  { name: "Crown Affair", status: "sent" },
];

const PLAN_DATA = [
  { week: 1, days: [
    { day: 1, type: "haul", idea: "Target summer haul with Wild Fable matching sets and new arrivals", shopmy: "Link all Target items", cta: "Follow for more Target hauls" },
    { day: 2, type: "lifestyle", idea: "Morning routine with pool, errands, coffee, and outfit details", shopmy: "Link outfit and products used", cta: "Follow for more daily life content" },
    { day: 3, type: "beauty", idea: "First impressions of a new gifted skincare package", shopmy: "Link the routine in one shelf", cta: "Follow for honest beauty reviews" },
    { day: 4, type: "haul", idea: "Amazon summer tops under $30 with try-on clips", shopmy: "Link Amazon and similar items", cta: "Follow for affordable finds" },
    { day: 5, type: "tips", idea: "How I got gifting as a microinfluencer", shopmy: "Mention creator tools naturally", cta: "Follow for more creator tips" },
    { day: 6, type: "beauty", idea: "Haircare gifted unboxing with first impressions", shopmy: "Link haircare products", cta: "Follow for the full review" },
    { day: 7, type: "lifestyle", idea: "Morning room reset with bedding, decor, and routine clips", shopmy: "Create a room reset shelf", cta: "Follow for more room inspiration" },
  ]},
  { week: 2, days: [
    { day: 8, type: "beauty", idea: "Body care routine with current favorite products", shopmy: "Link shower and body care", cta: "Follow for more routine videos" },
    { day: 9, type: "beauty", idea: "Everyday summer makeup routine in natural lighting", shopmy: "Link all makeup used", cta: "Follow for more GRWMs" },
    { day: 10, type: "haul", idea: "Worth it or not: Aritzia pieces and affordable alternatives", shopmy: "Link splurge and dupe options", cta: "Follow for more honest try-ons" },
    { day: 11, type: "lifestyle", idea: "Day in my life as a Connecticut creator", shopmy: "Link outfit and tote essentials", cta: "Follow for more day in my life content" },
    { day: 12, type: "beauty", idea: "Summer shower routine with body care favorites", shopmy: "Link full routine", cta: "Follow for more beauty routines" },
    { day: 13, type: "tips", idea: "How I organize ShopMy as a small creator", shopmy: "Show exact shelves and categories", cta: "Follow for creator tips" },
    { day: 14, type: "haul", idea: "Gap or Target basics that look more expensive than they are", shopmy: "Link basics shelf", cta: "Follow for affordable fashion" },
  ]},
  { week: 3, days: [
    { day: 15, type: "beauty", idea: "PR haul update with everything received this month", shopmy: "Link all gifted brands", cta: "Follow for more PR hauls" },
    { day: 16, type: "haul", idea: "Free People inspired finds and affordable dupes", shopmy: "Link dupes first", cta: "Follow for dupe content" },
    { day: 17, type: "lifestyle", idea: "Productive morning reset with realistic routine clips", shopmy: "Link routine products", cta: "Follow for morning content" },
    { day: 18, type: "haul", idea: "Abercrombie or Amazon summer try-on with closet staples", shopmy: "Link try-on shelf", cta: "Follow for try-on hauls" },
    { day: 19, type: "beauty", idea: "Skincare routine update with what is actually working", shopmy: "Link full skincare routine", cta: "Follow for honest reviews" },
    { day: 20, type: "tips", idea: "How to reach out to brands with examples", shopmy: "Keep focused on creator advice", cta: "Follow for part two" },
    { day: 21, type: "haul", idea: "Amazon basics under $25 that look elevated", shopmy: "Link Amazon shelf", cta: "Follow for Amazon finds" },
  ]},
  { week: 4, days: [
    { day: 22, type: "lifestyle", idea: "Week in my life with outfits, routines, and errands", shopmy: "Link outfits throughout", cta: "Follow for weekly vlogs" },
    { day: 23, type: "haul", idea: "Target closet essentials and best recent finds", shopmy: "Link all Target items", cta: "Follow for Target hauls" },
    { day: 24, type: "beauty", idea: "Sephora wishlist and what I would actually buy", shopmy: "Link wishlist shelf", cta: "Follow for beauty finds" },
    { day: 25, type: "tips", idea: "Three things that helped me grow toward 10K", shopmy: "Mention creator tools lightly", cta: "Follow for the growth journey" },
    { day: 26, type: "beauty", idea: "Huge PR haul with quick rating for each product", shopmy: "Link all gifted products", cta: "Follow for unboxings" },
    { day: 27, type: "lifestyle", idea: "Spend the day with me with a clean summer routine feel", shopmy: "Link products and outfit", cta: "Follow for lifestyle content" },
    { day: 28, type: "shopmy", idea: "My top 10 ShopMy picks based on what followers actually buy", shopmy: "Feature top converters", cta: "Follow and shop my page" },
  ]},
];

const TABS = ["Dashboard", "Ideas", "Captions", "ShopMy", "Plan", "Brands", "Update"];

const STATUS_LABELS = {
  gifting: "Gifting",
  pr_list: "PR List",
  sent: "Sent",
  not_now: "Not Now",
};

const TYPE_LABELS = {
  haul: "Haul",
  beauty: "Beauty",
  lifestyle: "Lifestyle",
  tips: "Tips",
  shopmy: "ShopMy",
};

function loadSaved(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function toNumber(value, fallback = 0) {
  const num = Number(String(value).replace(/[^0-9]/g, ""));
  return Number.isFinite(num) && num > 0 ? num : fallback;
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
  const [analytics, setAnalytics] = useState(() => loadSaved("sophieAnalyticsCleanV2", DEFAULT_ANALYTICS));
  const [draftAnalytics, setDraftAnalytics] = useState(analytics);
  const [brands, setBrands] = useState(() => loadSaved("sophieBrandsCleanV2", DEFAULT_BRANDS));
  const [postLogs, setPostLogs] = useState(() => loadSaved("sophiePostLogsCleanV2", {}));
  const [expandedWeek, setExpandedWeek] = useState(0);
  const [savedNote, setSavedNote] = useState("");

  const [newBrand, setNewBrand] = useState("");
  const [newBrandStatus, setNewBrandStatus] = useState("sent");
  const [brandSearch, setBrandSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");

  const [logDay, setLogDay] = useState("");
  const [logWhat, setLogWhat] = useState("");
  const [logViews, setLogViews] = useState("");
  const [logNotes, setLogNotes] = useState("");

  const [ideaPrompt, setIdeaPrompt] = useState("");
  const [ideaResult, setIdeaResult] = useState("");
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [captionResult, setCaptionResult] = useState("");
  const [shopmyPrompt, setShopmyPrompt] = useState("");
  const [shopmyResult, setShopmyResult] = useState("");

  const counts = useMemo(() => ({
    all: brands.length,
    gifting: brands.filter(b => b.status === "gifting").length,
    sent: brands.filter(b => b.status === "sent").length,
    pr: brands.filter(b => b.status === "pr_list").length,
    notNow: brands.filter(b => b.status === "not_now").length,
  }), [brands]);

  const filteredBrands = brands.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(brandSearch.toLowerCase());
    const matchesFilter = brandFilter === "all" || b.status === brandFilter;
    return matchesSearch && matchesFilter;
  });

  const followersNumber = toNumber(analytics.followers, 7905);
  const goalNumber = toNumber(analytics.goal, 10000);
  const followerProgress = Math.min(100, Math.round((followersNumber / goalNumber) * 100));
  const giftingProgress = Math.min(100, Math.round((toNumber(analytics.giftingConfirmed) / toNumber(analytics.giftingGoal, 25)) * 100));
  const paidProgress = Math.min(100, Math.round((toNumber(analytics.paidCollabs) / toNumber(analytics.paidGoal, 4)) * 100));
  const followersLeft = Math.max(0, goalNumber - followersNumber).toLocaleString();

  const recentLogs = Object.entries(postLogs)
    .sort((a, b) => Number(b[0]) - Number(a[0]))
    .slice(0, 5);

  function showSaved(message) {
    setSavedNote(message);
    setTimeout(() => setSavedNote(""), 2500);
  }

  function saveAnalytics() {
    setAnalytics(draftAnalytics);
    save("sophieAnalyticsCleanV2", draftAnalytics);
    showSaved("Saved. Your dashboard is updated.");
  }

  function addBrand() {
    if (!newBrand.trim()) return;
    const updated = [...brands, { name: newBrand.trim(), status: newBrandStatus }];
    setBrands(updated);
    save("sophieBrandsCleanV2", updated);
    setNewBrand("");
    showSaved("Brand added.");
  }

  function updateBrandStatus(index, status) {
    const brandToChange = filteredBrands[index];
    const updated = brands.map((brand, brandIndex) => {
      if (brand.name === brandToChange.name && brands.findIndex(b => b.name === brandToChange.name) === brandIndex) {
        return { ...brand, status };
      }
      return brand;
    });
    setBrands(updated);
    save("sophieBrandsCleanV2", updated);
  }

  function deleteBrand(index) {
    const brandToDelete = filteredBrands[index];
    const updated = brands.filter(b => b.name !== brandToDelete.name);
    setBrands(updated);
    save("sophieBrandsCleanV2", updated);
  }

  function logPost(dayOverride) {
    const day = String(dayOverride || logDay).trim();
    if (!day || !logWhat.trim()) {
      showSaved("Add a day number and what you posted.");
      return;
    }
    const updated = {
      ...postLogs,
      [day]: {
        what: logWhat.trim(),
        views: logViews.trim(),
        notes: logNotes.trim(),
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      },
    };
    setPostLogs(updated);
    save("sophiePostLogsCleanV2", updated);
    setLogDay("");
    setLogWhat("");
    setLogViews("");
    setLogNotes("");
    showSaved(`Day ${day} logged.`);
  }

  function removeLog(day) {
    const updated = { ...postLogs };
    delete updated[day];
    setPostLogs(updated);
    save("sophiePostLogsCleanV2", updated);
  }

  function quickLog(day) {
    setActiveTab(6);
    setLogDay(String(day));
    showSaved(`Fill in what you posted for day ${day}.`);
  }

  function generateIdeas() {
    const topic = ideaPrompt.trim() || "my next TikTok";
    setIdeaResult(`1. ${topic}: the follow-up people will actually want\nHook: Since my last one did so well, here is what I would do next\nConcept: Use the same format that already worked, but make it more specific and easier to shop.\nShopMy angle: Put the exact shelf name in the caption and pin a comment.\n\n2. What I would buy again\nHook: Things I own that are actually worth repurchasing\nConcept: Make it feel like a casual recommendation, not a formal review.\nShopMy angle: Lead with Target, Amazon, and affordable finds because those convert best.\n\n3. The under $30 version\nHook: The affordable version is honestly so good\nConcept: Compare the vibe of a popular product with a lower priced alternative.\nShopMy angle: Link both the inspiration and the dupe in the same shelf.\n\n4. Come shop my saves\nHook: My saved folder is dangerous right now\nConcept: Screen record or film a fast casual roundup of what you are eyeing.\nShopMy angle: Turn it into a weekly ShopMy shelf.\n\n5. Microinfluencer lesson learned\nHook: One thing I wish I knew before reaching out to brands\nConcept: Give one clear tip with an example, then make it a series.\nShopMy angle: Build trust with creator content while your bio links stay visible.`);
  }

  function generateCaption() {
    const topic = captionPrompt.trim() || "this video";
    setCaptionResult(`Option 1:\n${topic} because I clearly cannot stop finding cute things. Linking everything I can in my bio under my ShopMy. Follow for more everyday finds and honest hauls. #haul #fashionfinds #shopmy #creatorlife #grwm\n\nOption 2:\nI was not planning on loving these this much, but here we are. Everything is linked in my bio. Follow for more cute finds, try-ons, and honest reviews. #tiktokfinds #beautyfinds #outfitinspo #shopmy #lifestylecreator`);
  }

  function generateShopmy() {
    const topic = shopmyPrompt.trim() || "my ShopMy";
    setShopmyResult(`For ${topic}, make the link feel helpful instead of promotional.\n\nBest move:\nUse the same wording in the video, caption, and pinned comment so people know exactly where to click.\n\nWhat to prioritize:\n1. Target and Amazon finds first because those are proven converters.\n2. Any product shown on camera, even if it is not the main focus.\n3. Shelves that match your video titles, like Target haul, room reset, summer basics, and PR favorites.\n\nEasy CTA:\nEverything I can find is linked in my bio under my ShopMy.`);
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <p style={styles.handle}>@sophieslifeatm</p>
          <h1 style={styles.title}>Sophie's Content Studio</h1>
          <p style={styles.subtitle}>A clean creator workspace for planning content, tracking brands, logging posts, and updating analytics without touching code.</p>
        </div>
      </header>

      <nav style={styles.tabs}>
        {TABS.map((tab, index) => (
          <button key={tab} onClick={() => setActiveTab(index)} style={{ ...styles.tab, ...(activeTab === index ? styles.activeTab : {}) }}>
            {tab}
          </button>
        ))}
      </nav>

      <main style={styles.main}>
        {savedNote && <div style={styles.toast}>{savedNote}</div>}

        {activeTab === 0 && (
          <Dashboard analytics={analytics} counts={counts} followersLeft={followersLeft} followerProgress={followerProgress} giftingProgress={giftingProgress} paidProgress={paidProgress} recentLogs={recentLogs} />
        )}

        {activeTab === 1 && (
          <section style={styles.card}>
            <Eyebrow>Content ideas</Eyebrow>
            <h2 style={styles.h2}>Generate video ideas</h2>
            <p style={styles.body}>Type a product, vibe, or video concept. The output is based on your strongest categories: hauls, PR tips, beauty routines, room resets, and affordable finds.</p>
            <textarea value={ideaPrompt} onChange={e => setIdeaPrompt(e.target.value)} placeholder="Example: summer Amazon finds, PR unboxing, Target haul follow-up" rows={5} style={styles.textarea} />
            <button onClick={generateIdeas} style={styles.primaryButton}>Generate ideas</button>
            <QuickPrompts setValue={setIdeaPrompt} prompts={["Target haul follow-up", "PR unboxing ideas", "Microinfluencer tips video", "Summer room reset", "Amazon basics under $30"]} />
            {ideaResult && <div style={styles.result}>{ideaResult}</div>}
          </section>
        )}

        {activeTab === 2 && (
          <section style={styles.card}>
            <Eyebrow>Caption writer</Eyebrow>
            <h2 style={styles.h2}>Write captions</h2>
            <p style={styles.body}>Describe your video and get simple caption options with a hook, follow CTA, and hashtags.</p>
            <textarea value={captionPrompt} onChange={e => setCaptionPrompt(e.target.value)} placeholder="Example: Target summer haul with five cute sets" rows={5} style={styles.textarea} />
            <button onClick={generateCaption} style={styles.primaryButton}>Write caption</button>
            {captionResult && <div style={styles.result}>{captionResult}</div>}
          </section>
        )}

        {activeTab === 3 && (
          <section style={styles.card}>
            <Eyebrow>ShopMy strategy</Eyebrow>
            <h2 style={styles.h2}>Optimize links</h2>
            <div style={styles.statGrid}>
              <MiniStat label="ShopMy" value={analytics.shopmy} />
              <MiniStat label="Clicks" value={analytics.shopmyClicks} />
              <MiniStat label="Shoppers" value={analytics.trustedShoppers} />
              <MiniStat label="Top views" value={analytics.views60d} />
            </div>
            <textarea value={shopmyPrompt} onChange={e => setShopmyPrompt(e.target.value)} placeholder="Example: How do I convert my Target haul views into clicks?" rows={5} style={styles.textarea} />
            <button onClick={generateShopmy} style={styles.primaryButton}>Get strategy</button>
            {shopmyResult && <div style={styles.result}>{shopmyResult}</div>}
            <InfoList title="Current winners" text={analytics.topShopMy} />
          </section>
        )}

        {activeTab === 4 && (
          <section style={styles.card}>
            <Eyebrow>Thirty day plan</Eyebrow>
            <h2 style={styles.h2}>Plan and post log</h2>
            <p style={styles.body}>Open a week, mark a post, and keep track of what you actually published.</p>
            <div style={styles.legendRow}>
              {Object.entries(TYPE_LABELS).map(([key, label]) => <span key={key} style={styles.typeBadge}>{label}</span>)}
              <span style={styles.postedBadge}>Posted</span>
            </div>
            {PLAN_DATA.map((week, wi) => (
              <div key={week.week} style={styles.weekWrap}>
                <button onClick={() => setExpandedWeek(expandedWeek === wi ? -1 : wi)} style={{ ...styles.weekButton, ...(expandedWeek === wi ? styles.weekButtonOpen : {}) }}>
                  <span>Week {week.week}</span>
                  <span>Days {week.days[0].day} to {week.days[week.days.length - 1].day}</span>
                </button>
                {expandedWeek === wi && (
                  <div style={styles.daysList}>
                    {week.days.map(day => {
                      const log = postLogs[String(day.day)];
                      return (
                        <article key={day.day} style={styles.dayCard}>
                          <div style={styles.dayTop}>
                            <span style={styles.dayLabel}>Day {day.day}</span>
                            <span style={log ? styles.postedBadge : styles.typeBadge}>{log ? "Posted" : TYPE_LABELS[day.type]}</span>
                          </div>
                          <p style={log ? styles.dayIdeaMuted : styles.dayIdea}>{day.idea}</p>
                          {log ? (
                            <div style={styles.logBox}>
                              <strong>Posted:</strong> {log.what}
                              {log.views ? <span> | {log.views} views</span> : null}
                              {log.notes ? <p style={styles.logNote}>{log.notes}</p> : null}
                              <button onClick={() => removeLog(String(day.day))} style={styles.textButton}>Remove log</button>
                            </div>
                          ) : (
                            <>
                              <p style={styles.smallText}>ShopMy: {day.shopmy}</p>
                              <p style={styles.smallText}>CTA: {day.cta}</p>
                              <button onClick={() => quickLog(day.day)} style={styles.secondaryButton}>Mark posted</button>
                            </>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

        {activeTab === 5 && (
          <section style={styles.card}>
            <Eyebrow>Brand tracker</Eyebrow>
            <h2 style={styles.h2}>Track outreach</h2>
            <p style={styles.body}>{counts.all} brands total | {counts.gifting} gifting | {counts.sent} sent</p>
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
                  {status === "all" ? "All" : STATUS_LABELS[status]}
                </button>
              ))}
            </div>
            <input value={brandSearch} onChange={e => setBrandSearch(e.target.value)} placeholder="Search brands" style={styles.input} />
            <div style={styles.brandList}>
              {filteredBrands.map((brand, index) => (
                <div key={`${brand.name}-${index}`} style={styles.brandRow}>
                  <span style={styles.brandName}>{brand.name}</span>
                  <select value={brand.status} onChange={e => updateBrandStatus(index, e.target.value)} style={styles.statusSelect}>
                    <option value="sent">Sent</option>
                    <option value="gifting">Gifting</option>
                    <option value="pr_list">PR List</option>
                    <option value="not_now">Not Now</option>
                  </select>
                  <button onClick={() => deleteBrand(index)} style={styles.deleteButton}>Remove</button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 6 && (
          <section style={styles.card}>
            <Eyebrow>Update center</Eyebrow>
            <h2 style={styles.h2}>Update your data</h2>
            <p style={styles.body}>Use normal boxes to update analytics, ShopMy numbers, and your post log. No code or JSON needed.</p>

            <div style={styles.formGrid}>
              <Field label="Followers" value={draftAnalytics.followers} onChange={v => setDraftAnalytics({ ...draftAnalytics, followers: v })} />
              <Field label="Follower goal" value={draftAnalytics.goal} onChange={v => setDraftAnalytics({ ...draftAnalytics, goal: v })} />
              <Field label="Views 7 days" value={draftAnalytics.views7d} onChange={v => setDraftAnalytics({ ...draftAnalytics, views7d: v })} />
              <Field label="Views 28 days" value={draftAnalytics.views28d} onChange={v => setDraftAnalytics({ ...draftAnalytics, views28d: v })} />
              <Field label="Views 60 days" value={draftAnalytics.views60d} onChange={v => setDraftAnalytics({ ...draftAnalytics, views60d: v })} />
              <Field label="Total likes" value={draftAnalytics.likesTotal} onChange={v => setDraftAnalytics({ ...draftAnalytics, likesTotal: v })} />
              <Field label="Engagement rate" value={draftAnalytics.engagementRate} onChange={v => setDraftAnalytics({ ...draftAnalytics, engagementRate: v })} />
              <Field label="Best posting times" value={draftAnalytics.bestTimes} onChange={v => setDraftAnalytics({ ...draftAnalytics, bestTimes: v })} />
              <Field label="ShopMy earned" value={draftAnalytics.shopmy} onChange={v => setDraftAnalytics({ ...draftAnalytics, shopmy: v })} />
              <Field label="ShopMy clicks" value={draftAnalytics.shopmyClicks} onChange={v => setDraftAnalytics({ ...draftAnalytics, shopmyClicks: v })} />
              <Field label="Trusted shoppers" value={draftAnalytics.trustedShoppers} onChange={v => setDraftAnalytics({ ...draftAnalytics, trustedShoppers: v })} />
              <Field label="Gifting confirmed" value={draftAnalytics.giftingConfirmed} onChange={v => setDraftAnalytics({ ...draftAnalytics, giftingConfirmed: v })} />
              <Field label="Gifting goal" value={draftAnalytics.giftingGoal} onChange={v => setDraftAnalytics({ ...draftAnalytics, giftingGoal: v })} />
              <Field label="Paid collabs" value={draftAnalytics.paidCollabs} onChange={v => setDraftAnalytics({ ...draftAnalytics, paidCollabs: v })} />
              <Field label="Paid goal" value={draftAnalytics.paidGoal} onChange={v => setDraftAnalytics({ ...draftAnalytics, paidGoal: v })} />
            </div>
            <TextAreaField label="Top content" value={draftAnalytics.topContent} onChange={v => setDraftAnalytics({ ...draftAnalytics, topContent: v })} />
            <TextAreaField label="Top ShopMy products" value={draftAnalytics.topShopMy} onChange={v => setDraftAnalytics({ ...draftAnalytics, topShopMy: v })} />
            <button onClick={saveAnalytics} style={styles.primaryButton}>Save analytics</button>

            <div style={styles.divider} />
            <Eyebrow>Post log</Eyebrow>
            <h2 style={styles.h2Small}>Log a posted video</h2>
            <div style={styles.formGrid}>
              <Field label="Day number" value={logDay} onChange={setLogDay} placeholder="Example: 3" />
              <Field label="Views" value={logViews} onChange={setLogViews} placeholder="Example: 24.7K" />
            </div>
            <TextAreaField label="What did you post?" value={logWhat} onChange={setLogWhat} placeholder="Example: Target haul with three Wild Fable sets" />
            <Field label="Notes" value={logNotes} onChange={setLogNotes} placeholder="Example: Posted at 7 PM, comments asked for links" />
            <button onClick={() => logPost()} style={styles.primaryButton}>Save post log</button>

            {recentLogs.length > 0 && (
              <div style={styles.recentLogWrap}>
                <h3 style={styles.cardTitle}>Recent logs</h3>
                {recentLogs.map(([day, log]) => (
                  <div key={day} style={styles.recentLogRow}>
                    <div>
                      <strong>Day {day}</strong>
                      <p style={styles.smallText}>{log.what}</p>
                      {log.views ? <p style={styles.smallText}>{log.views} views</p> : null}
                    </div>
                    <button onClick={() => removeLog(day)} style={styles.textButton}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

function Dashboard({ analytics, counts, followersLeft, followerProgress, giftingProgress, paidProgress, recentLogs }) {
  return (
    <>
      <section style={styles.dashboardGrid}>
        <div style={styles.dashboardHero}>
          <Eyebrow>Creator HQ</Eyebrow>
          <h2 style={styles.h2}>Today’s workspace</h2>
          <p style={styles.body}>Track your growth, plan your posts, and keep your creator numbers current from one clean dashboard.</p>
          <div style={styles.statGrid}>
            <MiniStat label="Followers" value={analytics.followers} />
            <MiniStat label="Views 60 days" value={analytics.views60d} />
            <MiniStat label="ShopMy" value={analytics.shopmy} />
            <MiniStat label="Gifting" value={`${analytics.giftingConfirmed}/${analytics.giftingGoal}`} />
          </div>
        </div>
        <div style={styles.cardCompact}>
          <Eyebrow>Goals</Eyebrow>
          <h3 style={styles.cardTitle}>Glow up tracker</h3>
          <Progress label="Followers" value={`${followersLeft} left`} percent={followerProgress} />
          <Progress label="Gifting" value={`${analytics.giftingConfirmed} / ${analytics.giftingGoal}`} percent={giftingProgress} />
          <Progress label="Paid collabs" value={`${analytics.paidCollabs} / ${analytics.paidGoal}`} percent={paidProgress} />
        </div>
      </section>

      <section style={styles.card}>
        <Eyebrow>Quick view</Eyebrow>
        <div style={styles.quickGrid}>
          <InfoList title="Top content" text={analytics.topContent} />
          <InfoList title="Top ShopMy" text={analytics.topShopMy} />
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>Brand tracker</h3>
            <p style={styles.infoLine}>{counts.all} total brands</p>
            <p style={styles.infoLine}>{counts.gifting} gifting confirmed</p>
            <p style={styles.infoLine}>{counts.sent} outreach sent</p>
          </div>
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>Recent posts</h3>
            {recentLogs.length ? recentLogs.map(([day, log]) => (
              <p key={day} style={styles.infoLine}>Day {day}: {log.what}</p>
            )) : <p style={styles.infoLine}>No post logs yet.</p>}
          </div>
        </div>
      </section>
    </>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={styles.miniStat}>
      <strong>{value}</strong>
      <span>{label}</span>
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

function InfoList({ title, text }) {
  return (
    <div style={styles.infoBox}>
      <h3 style={styles.infoTitle}>{title}</h3>
      {String(text).split("\n").filter(Boolean).map((line, index) => <p key={index} style={styles.infoLine}>{line}</p>)}
    </div>
  );
}

function QuickPrompts({ prompts, setValue }) {
  return (
    <div style={styles.chips}>
      {prompts.map(prompt => (
        <button key={prompt} onClick={() => setValue(prompt)} style={styles.chip}>{prompt}</button>
      ))}
    </div>
  );
}

function Eyebrow({ children }) {
  return <p style={styles.eyebrow}>{children}</p>;
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fbf7f1 0%, #faf3f0 46%, #f3f1ea 100%)",
    color: "#302528",
    fontFamily: "Inter, Arial, sans-serif",
  },
  header: {
    padding: "64px 24px 46px",
    background: "linear-gradient(135deg, #f7efe9 0%, #efe2dd 55%, #e9ded7 100%)",
    borderBottom: "1px solid #e2d3cc",
  },
  headerInner: {
    width: "min(1120px, calc(100% - 24px))",
    margin: "0 auto",
  },
  handle: {
    margin: "0 0 14px",
    color: "#9b7d78",
    letterSpacing: 6,
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: 800,
  },
  title: {
    margin: "0 0 12px",
    color: "#2f2326",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(42px, 7vw, 78px)",
    fontWeight: 500,
    lineHeight: 0.95,
    letterSpacing: -1.5,
  },
  subtitle: {
    maxWidth: 760,
    margin: 0,
    color: "#7c6966",
    fontSize: 18,
    lineHeight: 1.45,
    fontWeight: 500,
  },
  tabs: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    padding: "14px max(20px, calc((100vw - 1120px)/2))",
    background: "rgba(251,247,241,.88)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid #e2d3cc",
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  tab: {
    border: "1px solid transparent",
    background: "transparent",
    color: "#7c6966",
    borderRadius: 999,
    padding: "10px 16px",
    fontWeight: 800,
    cursor: "pointer",
    whiteSpace: "nowrap",
    fontFamily: "Inter, Arial, sans-serif",
  },
  activeTab: {
    background: "#ffffff",
    color: "#7d4e58",
    border: "1px solid #d8c4bf",
    boxShadow: "0 8px 22px rgba(71, 48, 46, .07)",
  },
  main: {
    width: "min(1120px, calc(100% - 32px))",
    margin: "34px auto 60px",
    display: "grid",
    gap: 24,
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.15fr) minmax(320px, .85fr)",
    gap: 24,
  },
  dashboardHero: {
    background: "rgba(255,255,255,.88)",
    border: "1px solid #e4d2cc",
    borderRadius: 30,
    padding: 30,
    boxShadow: "0 18px 55px rgba(71, 48, 46, .07)",
  },
  card: {
    background: "rgba(255,255,255,.9)",
    border: "1px solid #e4d2cc",
    borderRadius: 30,
    padding: "30px",
    boxShadow: "0 18px 55px rgba(71, 48, 46, .07)",
  },
  cardCompact: {
    background: "rgba(255,255,255,.86)",
    border: "1px solid #e4d2cc",
    borderRadius: 30,
    padding: 28,
    boxShadow: "0 18px 55px rgba(71, 48, 46, .07)",
  },
  eyebrow: {
    margin: "0 0 10px",
    color: "#a1847f",
    textTransform: "uppercase",
    letterSpacing: 2.4,
    fontSize: 12,
    fontWeight: 900,
  },
  h2: {
    margin: "0 0 10px",
    color: "#7d4e58",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "clamp(32px, 4vw, 48px)",
    lineHeight: 1.04,
    fontWeight: 600,
    letterSpacing: -.7,
  },
  h2Small: {
    margin: "0 0 16px",
    color: "#7d4e58",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 34,
    lineHeight: 1.05,
    fontWeight: 600,
  },
  body: {
    margin: "0 0 22px",
    color: "#7c6966",
    fontSize: 16,
    lineHeight: 1.55,
    fontWeight: 500,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
    margin: "18px 0 22px",
  },
  miniStat: {
    display: "grid",
    gap: 7,
    background: "linear-gradient(135deg, #fbf7f4, #f5ebe8)",
    border: "1px solid #e5d2cc",
    borderRadius: 22,
    padding: 18,
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ddcbc5",
    borderRadius: 16,
    padding: "14px 16px",
    fontSize: 16,
    outline: "none",
    background: "#fff",
    color: "#302528",
    fontFamily: "Inter, Arial, sans-serif",
  },
  textarea: {
    width: "100%",
    boxSizing: "border-box",
    border: "1px solid #ddcbc5",
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    lineHeight: 1.55,
    outline: "none",
    resize: "vertical",
    background: "#fff",
    color: "#302528",
    fontFamily: "Inter, Arial, sans-serif",
  },
  primaryButton: {
    marginTop: 14,
    width: "100%",
    border: "none",
    borderRadius: 18,
    padding: "15px 20px",
    fontSize: 16,
    fontWeight: 900,
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #8b5b64, #5f4245)",
    fontFamily: "Inter, Arial, sans-serif",
  },
  secondaryButton: {
    marginTop: 10,
    border: "1px solid #d8c4bf",
    borderRadius: 14,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
    color: "#7d4e58",
    background: "#fbf7f4",
    fontFamily: "Inter, Arial, sans-serif",
  },
  primaryButtonSmall: {
    border: "none",
    borderRadius: 16,
    padding: "12px 18px",
    fontSize: 15,
    fontWeight: 900,
    cursor: "pointer",
    color: "#fff",
    background: "linear-gradient(135deg, #8b5b64, #5f4245)",
    fontFamily: "Inter, Arial, sans-serif",
  },
  result: {
    marginTop: 18,
    background: "#fbf7f4",
    border: "1px solid #e2d0ca",
    borderRadius: 22,
    padding: 20,
    whiteSpace: "pre-wrap",
    color: "#443638",
    lineHeight: 1.65,
    fontWeight: 500,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
    alignItems: "end",
  },
  formGridSmall: {
    display: "grid",
    gridTemplateColumns: "minmax(220px, 2fr) minmax(150px, 1fr) auto",
    gap: 10,
    marginBottom: 16,
  },
  fieldLabel: {
    display: "grid",
    gap: 7,
    color: "#8d7774",
    fontWeight: 900,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  fieldLabelWide: {
    display: "grid",
    gap: 7,
    marginTop: 16,
    color: "#8d7774",
    fontWeight: 900,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  toast: {
    position: "fixed",
    left: "50%",
    bottom: 28,
    transform: "translateX(-50%)",
    zIndex: 10,
    background: "#302528",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: 999,
    boxShadow: "0 12px 30px rgba(0,0,0,.18)",
    fontWeight: 800,
  },
  divider: {
    height: 1,
    background: "#e4d2cc",
    margin: "30px 0",
  },
  filterRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    margin: "14px 0",
  },
  filterButton: {
    border: "1px solid #ddcbc5",
    background: "#fff",
    color: "#7c6966",
    borderRadius: 999,
    padding: "8px 14px",
    cursor: "pointer",
    fontWeight: 800,
    textTransform: "capitalize",
  },
  activeFilter: {
    color: "#7d4e58",
    background: "#f5ebe8",
  },
  brandList: {
    display: "grid",
    gap: 8,
    marginTop: 14,
  },
  brandRow: {
    display: "grid",
    gridTemplateColumns: "1fr 150px 92px",
    gap: 10,
    alignItems: "center",
    background: "#fff",
    border: "1px solid #e4d2cc",
    borderRadius: 18,
    padding: 12,
  },
  brandName: {
    fontWeight: 900,
    color: "#302528",
  },
  statusSelect: {
    border: "1px solid #ddcbc5",
    borderRadius: 12,
    padding: 10,
    color: "#7d4e58",
    background: "#fbf7f4",
    fontWeight: 800,
  },
  deleteButton: {
    border: "none",
    borderRadius: 12,
    background: "#f0e4df",
    color: "#7d4e58",
    padding: "10px 12px",
    cursor: "pointer",
    fontWeight: 900,
  },
  progressWrap: {
    marginTop: 20,
  },
  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#302528",
    fontWeight: 900,
    marginBottom: 8,
  },
  progressTrack: {
    height: 12,
    borderRadius: 999,
    background: "#eaded9",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #9f7780, #c6a7a5)",
    borderRadius: 999,
  },
  cardTitle: {
    margin: "0 0 10px",
    color: "#7d4e58",
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: 30,
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: 16,
  },
  infoBox: {
    background: "#fbf7f4",
    border: "1px solid #e2d0ca",
    borderRadius: 22,
    padding: 18,
  },
  infoTitle: {
    margin: "0 0 10px",
    color: "#5f4245",
    fontSize: 17,
  },
  infoLine: {
    margin: "7px 0",
    color: "#6f5f5d",
    fontWeight: 600,
    lineHeight: 1.45,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  chip: {
    border: "1px solid #ddcbc5",
    borderRadius: 999,
    padding: "8px 13px",
    background: "#fbf7f4",
    color: "#7d4e58",
    cursor: "pointer",
    fontWeight: 800,
  },
  legendRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  typeBadge: {
    display: "inline-block",
    background: "#f3ebe6",
    color: "#6f5f5d",
    border: "1px solid #e1d3cd",
    borderRadius: 999,
    padding: "5px 11px",
    fontSize: 12,
    fontWeight: 900,
  },
  postedBadge: {
    display: "inline-block",
    background: "#e9eee4",
    color: "#64705d",
    border: "1px solid #d4dccd",
    borderRadius: 999,
    padding: "5px 11px",
    fontSize: 12,
    fontWeight: 900,
  },
  weekWrap: {
    marginBottom: 12,
  },
  weekButton: {
    width: "100%",
    border: "1px solid #ddcbc5",
    background: "#fff",
    borderRadius: 20,
    padding: "16px 18px",
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    color: "#302528",
    fontWeight: 900,
    fontSize: 15,
  },
  weekButtonOpen: {
    background: "#f3ebe6",
    color: "#7d4e58",
  },
  daysList: {
    display: "grid",
    gap: 10,
    marginTop: 10,
  },
  dayCard: {
    background: "#fff",
    border: "1px solid #e4d2cc",
    borderRadius: 20,
    padding: 18,
  },
  dayTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  dayLabel: {
    color: "#a1847f",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 1,
    fontSize: 12,
  },
  dayIdea: {
    margin: "0 0 10px",
    color: "#302528",
    fontWeight: 900,
    lineHeight: 1.45,
  },
  dayIdeaMuted: {
    margin: "0 0 10px",
    color: "#a79490",
    fontWeight: 800,
    lineHeight: 1.45,
    textDecoration: "line-through",
  },
  smallText: {
    margin: "5px 0",
    color: "#766662",
    lineHeight: 1.45,
    fontWeight: 600,
  },
  logBox: {
    background: "#f7f4ef",
    border: "1px solid #e4d8d1",
    borderRadius: 16,
    padding: 14,
    color: "#4e4240",
    lineHeight: 1.5,
  },
  logNote: {
    margin: "6px 0 0",
    color: "#766662",
  },
  textButton: {
    border: "none",
    background: "transparent",
    color: "#8b5b64",
    padding: 0,
    marginTop: 8,
    cursor: "pointer",
    fontWeight: 900,
  },
  recentLogWrap: {
    marginTop: 24,
  },
  recentLogRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    padding: 14,
    background: "#fbf7f4",
    border: "1px solid #e2d0ca",
    borderRadius: 18,
    marginTop: 10,
  },
};
