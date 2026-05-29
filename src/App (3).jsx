import { useEffect, useMemo, useState } from "react";

const DEFAULT_DATA = {
  handle: "@sophieslifeatm",
  followers: 7905,
  followerGoal: 10000,
  likesTotal: "525.5K",
  views7d: "1.09M",
  views60d: "1.7M+",
  netFollowers7d: 693,
  shopmyLifetime: "$1,681",
  shopmyPending: "$1,148",
  shopmyUpcoming: "$250",
  shopmyPaid: "$284",
  trustedShoppers: 404,
  shopmyTier: "Icon 89",
  giftingPartners: 10,
  giftingGoal: 25,
  warmLeads: 4,
  paidCollabs: 0,
  paidCollabGoal: 4,
  currentFocus: "Keep posting fashion reach content, mix in PR tips for follower growth, and use lifestyle videos to build trust.",
};

const DEFAULT_TASKS = [
  { text: "Post Marshalls summer haul", done: false },
  { text: "Post PR haul / what came this week", done: false },
  { text: "Follow up with warm brand leads", done: false },
  { text: "Add new ShopMy links after every haul", done: false },
  { text: "Film one creator tips video", done: false },
];

const DEFAULT_CONTENT = [
  { title: "Target Matching Set Haul", metric: "1.06M views", note: "+601 followers · strongest ShopMy conversion" },
  { title: "Morning of Self-Care", metric: "502.7K views", note: "Lifestyle reach · builds trust" },
  { title: "Haircut / Brunette Bob", metric: "426.6K views", note: "Transformation content reaches beyond core followers" },
  { title: "Princess Polly Spring Finds", metric: "152.3K views", note: "Brand proof · organic try-on style works" },
  { title: "Amazon / SUUKSESS Spring Top Haul", metric: "121.9K views", note: "Affordable fashion + dupe framing is repeatable" },
  { title: "PR Haul Tips", metric: "24.2K views", note: "+454 followers · lower views but high follower conversion" },
];

const DEFAULT_BRANDS = {
  warm: ["Glossier", "Josie Maran", "Kosas", "Summer Fridays"],
  followUp: ["Victoria Beckham Beauty", "Crown Affair", "Tower 28", "Rare Beauty"],
  confirmed: ["Divi", "Salt & Stone", "Saltair", "Prequel", "Sacheu", "Merit Beauty", "Grey Bandit", "Cyklar", "L'Occitane", "Sincerely Yours"],
};

const STORAGE_KEY = "sophie_creator_studio_simple_v1";

function safeNumber(value, fallback = 0) {
  const n = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(n) ? n : fallback;
}

function percent(current, goal) {
  const c = safeNumber(current);
  const g = safeNumber(goal, 1);
  return Math.max(0, Math.min(100, Math.round((c / g) * 100)));
}

function Progress({ label, value, detail }) {
  return (
    <div className="progressRow">
      <div className="progressTop">
        <span>{label}</span>
        <b>{detail}</b>
      </div>
      <div className="bar">
        <div style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text" }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(name, type === "number" ? safeNumber(e.target.value) : e.target.value)}
      />
    </label>
  );
}

function ListEditor({ title, items, onChange, placeholder }) {
  const update = (index, value) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const remove = (index) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="editorCard">
      <h3>{title}</h3>
      {items.map((item, index) => (
        <div className="listEdit" key={`${title}-${index}`}>
          <input value={item} onChange={(e) => update(index, e.target.value)} />
          <button onClick={() => remove(index)}>×</button>
        </div>
      ))}
      <button className="softBtn" onClick={() => onChange([...items, placeholder])}>+ Add</button>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [data, setData] = useState(DEFAULT_DATA);
  const [tasks, setTasks] = useState(DEFAULT_TASKS);
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [brands, setBrands] = useState(DEFAULT_BRANDS);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.data) setData({ ...DEFAULT_DATA, ...parsed.data });
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.content) setContent(parsed.content);
        if (parsed.brands) setBrands({ ...DEFAULT_BRANDS, ...parsed.brands });
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const saveAll = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, tasks, content, brands }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const resetAll = () => {
    if (!window.confirm("Reset everything back to the original version?")) return;
    setData(DEFAULT_DATA);
    setTasks(DEFAULT_TASKS);
    setContent(DEFAULT_CONTENT);
    setBrands(DEFAULT_BRANDS);
    localStorage.removeItem(STORAGE_KEY);
  };

  const followersLeft = Math.max(0, safeNumber(data.followerGoal) - safeNumber(data.followers));
  const followerPct = percent(data.followers, data.followerGoal);
  const giftingPct = percent(data.giftingPartners, data.giftingGoal);
  const paidPct = percent(data.paidCollabs, data.paidCollabGoal);

  const stats = useMemo(() => [
    { label: "Followers", value: data.followers.toLocaleString?.() ?? data.followers },
    { label: "To 10K", value: followersLeft.toLocaleString() },
    { label: "Views 60D", value: data.views60d },
    { label: "ShopMy", value: data.shopmyLifetime },
  ], [data, followersLeft]);

  const updateData = (name, value) => setData((prev) => ({ ...prev, [name]: value }));

  const toggleTask = (index) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, done: !task.done } : task));
  };

  const updateTaskText = (index, text) => {
    setTasks(tasks.map((task, i) => i === index ? { ...task, text } : task));
  };

  const removeTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  const addTask = () => setTasks([...tasks, { text: "New task", done: false }]);

  const updateContent = (index, key, value) => {
    setContent(content.map((item, i) => i === index ? { ...item, [key]: value } : item));
  };

  const addContent = () => setContent([...content, { title: "New content", metric: "0 views", note: "Add notes here" }]);

  const removeContent = (index) => setContent(content.filter((_, i) => i !== index));

  return (
    <div className="app">
      <style>{`
        :root {
          --cream: #fbf7f2;
          --card: rgba(255,255,255,.86);
          --text: #39262b;
          --muted: #8b7378;
          --rose: #a04362;
          --rose2: #c88aa0;
          --border: #efd1da;
          --shadow: 0 18px 60px rgba(93, 56, 68, .10);
        }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at 15% 5%, rgba(246, 214, 222, .55), transparent 28%),
            radial-gradient(circle at 90% 12%, rgba(238, 225, 215, .75), transparent 35%),
            linear-gradient(180deg, var(--cream), #fff8fb 58%, #fbf7f2);
          color: var(--text);
        }
        h1, h2, h3 { font-family: Georgia, "Times New Roman", serif; margin: 0; color: var(--text); }
        p { color: var(--muted); line-height: 1.5; }
        button, input, textarea { font: inherit; }
        button { cursor: pointer; border: 0; }

        .hero {
          max-width: 1120px;
          margin: 0 auto;
          padding: 64px 24px 44px;
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 36px;
          align-items: end;
        }
        .handle {
          color: var(--rose);
          letter-spacing: .42em;
          font-size: 13px;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .hero h1 {
          font-size: clamp(44px, 7vw, 78px);
          line-height: .92;
          letter-spacing: -0.05em;
        }
        .hero p {
          max-width: 680px;
          font-size: 18px;
          margin: 18px 0 0;
        }
        .heroStats {
          background: rgba(255,255,255,.68);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          box-shadow: var(--shadow);
        }
        .stat {
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 22px 14px;
          text-align: center;
          background: linear-gradient(180deg, #fff, #fff7fa);
        }
        .stat b {
          display: block;
          font-family: Georgia, "Times New Roman", serif;
          color: var(--rose);
          font-size: 32px;
          line-height: 1;
        }
        .stat span {
          display: block;
          margin-top: 7px;
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 800;
        }

        .tabs {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(251,247,242,.9);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          padding: 10px 16px;
          display: flex;
          gap: 8px;
          overflow-x: auto;
        }
        .tab {
          color: var(--muted);
          background: transparent;
          padding: 12px 16px;
          border-radius: 999px;
          font-weight: 800;
          white-space: nowrap;
        }
        .tab.active {
          background: #fff;
          color: var(--rose);
          box-shadow: 0 0 0 1px var(--border) inset;
        }

        .page {
          max-width: 1060px;
          margin: 0 auto;
          padding: 34px 24px 72px;
        }
        .grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }
        .card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 28px;
          box-shadow: var(--shadow);
        }
        .card h2 {
          font-size: 36px;
          letter-spacing: -0.04em;
        }
        .eyebrow {
          color: var(--rose2);
          font-weight: 900;
          letter-spacing: .18em;
          text-transform: uppercase;
          font-size: 12px;
          margin-bottom: 8px;
        }
        .miniStats {
          margin-top: 20px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .mini {
          background: linear-gradient(180deg, #fff6f9, #fff);
          border: 1px solid var(--border);
          border-radius: 22px;
          padding: 22px;
        }
        .mini b {
          display: block;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 34px;
          color: var(--rose);
        }
        .mini span {
          display: block;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .1em;
          color: var(--muted);
          font-weight: 850;
        }

        .progressRow { margin-top: 18px; }
        .progressTop {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          font-weight: 850;
          margin-bottom: 9px;
        }
        .bar {
          height: 12px;
          border-radius: 999px;
          background: #f3dfe5;
          overflow: hidden;
        }
        .bar div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, var(--rose2), var(--rose));
        }

        .wide { grid-column: 1 / -1; }
        .taskRow, .contentRow, .brandPill {
          background: rgba(255,255,255,.75);
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 14px 16px;
        }
        .taskRow {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 12px;
          align-items: center;
          margin-top: 10px;
        }
        .taskRow input[type="checkbox"] {
          accent-color: var(--rose);
          width: 18px;
          height: 18px;
        }
        .taskRow input[type="text"] {
          border: 0;
          background: transparent;
          color: var(--text);
          width: 100%;
          outline: 0;
          font-weight: 700;
        }
        .taskRow.done input[type="text"] {
          text-decoration: line-through;
          color: var(--muted);
        }
        .xBtn {
          background: #fff;
          color: var(--muted);
          border: 1px solid var(--border);
          border-radius: 999px;
          width: 26px;
          height: 26px;
        }
        .primaryBtn, .softBtn {
          margin-top: 14px;
          border-radius: 999px;
          padding: 12px 18px;
          font-weight: 850;
        }
        .primaryBtn {
          background: var(--rose);
          color: white;
          box-shadow: 0 12px 24px rgba(160, 67, 98, .18);
        }
        .softBtn {
          background: #fff;
          color: var(--rose);
          border: 1px solid var(--border);
        }

        .contentRow {
          margin-top: 10px;
          display: grid;
          grid-template-columns: 1.2fr .7fr;
          gap: 10px 18px;
          align-items: start;
        }
        .contentRow .metric { color: var(--rose); font-weight: 850; }
        .contentRow .note {
          grid-column: 1 / -1;
          color: var(--muted);
          font-size: 14px;
        }

        .brandColumns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .brandBox h3 {
          font-size: 24px;
          margin-bottom: 12px;
        }
        .brandPill {
          margin-top: 8px;
          font-weight: 750;
        }

        .shopGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .shopItem {
          padding: 18px;
          border: 1px solid var(--border);
          border-radius: 20px;
          background: #fff;
        }
        .shopItem span { display: block; color: var(--muted); font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: .1em; }
        .shopItem b { display: block; color: var(--rose); font-family: Georgia, serif; font-size: 32px; margin-top: 8px; }

        .formGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .field span {
          display: block;
          font-weight: 850;
          color: var(--muted);
          margin-bottom: 7px;
          font-size: 13px;
        }
        .field input, .field textarea {
          width: 100%;
          border: 1px solid var(--border);
          border-radius: 16px;
          background: #fff;
          padding: 13px 14px;
          color: var(--text);
          outline-color: var(--rose2);
        }
        .field textarea { min-height: 90px; resize: vertical; }
        .formSection {
          margin-top: 24px;
        }
        .formSection h3 {
          font-size: 26px;
          margin-bottom: 14px;
        }
        .saveBar {
          margin-top: 24px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        .saved {
          color: var(--rose);
          font-weight: 850;
        }
        .editorCard {
          background: rgba(255,255,255,.72);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 20px;
        }
        .editorCard h3 { font-size: 24px; }
        .listEdit {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          margin-top: 10px;
        }
        .listEdit input {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px;
          outline-color: var(--rose2);
        }
        .listEdit button {
          border-radius: 14px;
          background: #fff;
          border: 1px solid var(--border);
          color: var(--muted);
          width: 44px;
        }
        .contentEditorRow {
          border: 1px solid var(--border);
          background: rgba(255,255,255,.72);
          border-radius: 22px;
          padding: 16px;
          margin-top: 12px;
          display: grid;
          gap: 10px;
        }
        .contentEditorRow input {
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px;
          outline-color: var(--rose2);
        }
        .contentEditorRow .two {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 10px;
        }

        @media (max-width: 860px) {
          .hero, .grid2, .brandColumns, .formGrid { grid-template-columns: 1fr; }
          .hero { padding-top: 42px; }
          .heroStats, .miniStats, .shopGrid { grid-template-columns: 1fr 1fr; }
          .page { padding-inline: 16px; }
          .card { padding: 22px; }
        }
        @media (max-width: 540px) {
          .heroStats, .miniStats, .shopGrid { grid-template-columns: 1fr; }
          .hero h1 { font-size: 44px; }
          .card h2 { font-size: 30px; }
          .contentRow { grid-template-columns: 1fr; }
        }
      `}</style>

      <header className="hero">
        <div>
          <div className="handle">{data.handle}</div>
          <h1>Sophie's Content Studio</h1>
          <p>A simple creator dashboard for what to post next, what is working, ShopMy, brand outreach, and the 10K sprint.</p>
        </div>
        <div className="heroStats">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </header>

      <nav className="tabs">
        {[
          ["dashboard", "📌 Dashboard"],
          ["content", "🎥 Content"],
          ["brands", "📊 Brands"],
          ["shopmy", "🛍️ ShopMy"],
          ["update", "⚙️ Update"],
        ].map(([id, label]) => (
          <button className={`tab ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)} key={id}>
            {label}
          </button>
        ))}
      </nav>

      {activeTab === "dashboard" && (
        <main className="page">
          <div className="grid2">
            <section className="card">
              <div className="eyebrow">Quick View</div>
              <h2>Today’s Focus</h2>
              <div className="miniStats">
                <div className="mini"><b>{followersLeft.toLocaleString()}</b><span>Followers to 10K</span></div>
                <div className="mini"><b>{data.giftingPartners}/{data.giftingGoal}</b><span>Gifting partners</span></div>
                <div className="mini"><b>{data.warmLeads}</b><span>Warm leads</span></div>
                <div className="mini"><b>{data.shopmyLifetime}</b><span>ShopMy lifetime</span></div>
              </div>
            </section>

            <section className="card">
              <div className="eyebrow">June Goals</div>
              <h2>Growth Tracker</h2>
              <Progress label="Followers" value={followerPct} detail={`${safeNumber(data.followers).toLocaleString()} / ${safeNumber(data.followerGoal).toLocaleString()}`} />
              <Progress label="Gifting" value={giftingPct} detail={`${data.giftingPartners} confirmed · ${Math.max(0, data.giftingGoal - data.giftingPartners)} left`} />
              <Progress label="Paid collabs" value={paidPct} detail={`${data.paidCollabs} / ${data.paidCollabGoal}`} />
            </section>

            <section className="card wide">
              <div className="eyebrow">This Week</div>
              <h2>What to do next</h2>
              {tasks.map((task, index) => (
                <div className={`taskRow ${task.done ? "done" : ""}`} key={index}>
                  <input type="checkbox" checked={task.done} onChange={() => toggleTask(index)} />
                  <input type="text" value={task.text} onChange={(e) => updateTaskText(index, e.target.value)} />
                  <button className="xBtn" onClick={() => removeTask(index)}>×</button>
                </div>
              ))}
              <button className="softBtn" onClick={addTask}>+ Add task</button>
            </section>

            <section className="card">
              <div className="eyebrow">Brand Momentum</div>
              <h2>Warm Leads + PR</h2>
              <p><b>Warm:</b> {brands.warm.join(", ")}</p>
              <p><b>Follow up:</b> {brands.followUp.join(", ")}</p>
              <p><b>Confirmed:</b> {brands.confirmed.slice(0, 6).join(", ")}{brands.confirmed.length > 6 ? "..." : ""}</p>
            </section>

            <section className="card">
              <div className="eyebrow">Current Strategy</div>
              <h2>What’s Working</h2>
              <p>{data.currentFocus}</p>
              <p><b>Best times:</b> {data.bestPostTimes}</p>
            </section>

            <section className="card wide">
              <div className="eyebrow">Proof Board</div>
              <h2>Top Content Winners</h2>
              {content.map((item, index) => (
                <div className="contentRow" key={index}>
                  <b>{item.title}</b>
                  <span className="metric">{item.metric}</span>
                  <span className="note">{item.note}</span>
                </div>
              ))}
            </section>
          </div>
        </main>
      )}

      {activeTab === "content" && (
        <main className="page">
          <section className="card">
            <div className="eyebrow">Content</div>
            <h2>Top Performing Videos</h2>
            {content.map((item, index) => (
              <div className="contentEditorRow" key={index}>
                <div className="two">
                  <input value={item.title} onChange={(e) => updateContent(index, "title", e.target.value)} placeholder="Video title" />
                  <input value={item.metric} onChange={(e) => updateContent(index, "metric", e.target.value)} placeholder="Views / followers" />
                  <button className="xBtn" onClick={() => removeContent(index)}>×</button>
                </div>
                <input value={item.note} onChange={(e) => updateContent(index, "note", e.target.value)} placeholder="Why it worked" />
              </div>
            ))}
            <button className="softBtn" onClick={addContent}>+ Add content winner</button>
            <button className="primaryBtn" onClick={saveAll} style={{ marginLeft: 10 }}>Save content</button>
          </section>
        </main>
      )}

      {activeTab === "brands" && (
        <main className="page">
          <section className="card">
            <div className="eyebrow">Brand Tracker</div>
            <h2>Outreach Snapshot</h2>
            <div className="brandColumns section">
              <div className="brandBox">
                <h3>Warm Leads</h3>
                {brands.warm.map((brand) => <div className="brandPill" key={brand}>{brand}</div>)}
              </div>
              <div className="brandBox">
                <h3>Follow Up</h3>
                {brands.followUp.map((brand) => <div className="brandPill" key={brand}>{brand}</div>)}
              </div>
              <div className="brandBox">
                <h3>Confirmed</h3>
                {brands.confirmed.map((brand) => <div className="brandPill" key={brand}>{brand}</div>)}
              </div>
            </div>
          </section>
        </main>
      )}

      {activeTab === "shopmy" && (
        <main className="page">
          <section className="card">
            <div className="eyebrow">ShopMy</div>
            <h2>Revenue + Links</h2>
            <div className="shopGrid section">
              <div className="shopItem"><span>Lifetime</span><b>{data.shopmyLifetime}</b></div>
              <div className="shopItem"><span>Pending</span><b>{data.shopmyPending}</b></div>
              <div className="shopItem"><span>Upcoming</span><b>{data.shopmyUpcoming}</b></div>
              <div className="shopItem"><span>Paid</span><b>{data.shopmyPaid}</b></div>
              <div className="shopItem"><span>Trusted shoppers</span><b>{data.trustedShoppers}</b></div>
              <div className="shopItem"><span>Tier</span><b>{data.shopmyTier}</b></div>
            </div>
          </section>
        </main>
      )}

      {activeTab === "update" && (
        <main className="page">
          <section className="card">
            <div className="eyebrow">Update</div>
            <h2>Update Your Info</h2>
            <p>Type your new numbers into the boxes. Click Save Changes. No code needed.</p>

            <div className="formSection">
              <h3>TikTok Stats</h3>
              <div className="formGrid">
                <Field label="Followers" name="followers" value={data.followers} onChange={updateData} type="number" />
                <Field label="Follower Goal" name="followerGoal" value={data.followerGoal} onChange={updateData} type="number" />
                <Field label="Total Likes" name="likesTotal" value={data.likesTotal} onChange={updateData} />
                <Field label="Views 7D" name="views7d" value={data.views7d} onChange={updateData} />
                <Field label="Views 60D" name="views60d" value={data.views60d} onChange={updateData} />
                <Field label="Net Followers 7D" name="netFollowers7d" value={data.netFollowers7d} onChange={updateData} type="number" />
              </div>
            </div>

            <div className="formSection">
              <h3>ShopMy</h3>
              <div className="formGrid">
                <Field label="ShopMy Lifetime" name="shopmyLifetime" value={data.shopmyLifetime} onChange={updateData} />
                <Field label="Pending" name="shopmyPending" value={data.shopmyPending} onChange={updateData} />
                <Field label="Upcoming" name="shopmyUpcoming" value={data.shopmyUpcoming} onChange={updateData} />
                <Field label="Paid" name="shopmyPaid" value={data.shopmyPaid} onChange={updateData} />
                <Field label="Trusted Shoppers" name="trustedShoppers" value={data.trustedShoppers} onChange={updateData} type="number" />
                <Field label="Tier" name="shopmyTier" value={data.shopmyTier} onChange={updateData} />
              </div>
            </div>

            <div className="formSection">
              <h3>Goals + Strategy</h3>
              <div className="formGrid">
                <Field label="Gifting Partners" name="giftingPartners" value={data.giftingPartners} onChange={updateData} type="number" />
                <Field label="Gifting Goal" name="giftingGoal" value={data.giftingGoal} onChange={updateData} type="number" />
                <Field label="Warm Leads Count" name="warmLeads" value={data.warmLeads} onChange={updateData} type="number" />
                <Field label="Paid Collabs" name="paidCollabs" value={data.paidCollabs} onChange={updateData} type="number" />
                <Field label="Paid Collab Goal" name="paidCollabGoal" value={data.paidCollabGoal} onChange={updateData} type="number" />
                <Field label="Best Posting Times" name="bestPostTimes" value={data.bestPostTimes} onChange={updateData} />
              </div>
              <label className="field" style={{ display: "block", marginTop: 14 }}>
                <span>Current Focus</span>
                <textarea value={data.currentFocus} onChange={(e) => updateData("currentFocus", e.target.value)} />
              </label>
            </div>

            <div className="formSection">
              <h3>Brand Lists</h3>
              <div className="grid2">
                <ListEditor title="Warm Leads" items={brands.warm} placeholder="New warm lead" onChange={(items) => setBrands({ ...brands, warm: items })} />
                <ListEditor title="Follow Up" items={brands.followUp} placeholder="New follow up" onChange={(items) => setBrands({ ...brands, followUp: items })} />
                <ListEditor title="Confirmed Gifting" items={brands.confirmed} placeholder="New gifting partner" onChange={(items) => setBrands({ ...brands, confirmed: items })} />
              </div>
            </div>

            <div className="saveBar">
              <button className="primaryBtn" onClick={saveAll}>Save Changes</button>
              <button className="softBtn" onClick={resetAll}>Reset</button>
              {saved && <span className="saved">Saved ✓</span>}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
