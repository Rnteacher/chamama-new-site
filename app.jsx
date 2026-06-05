/* global React, ReactDOM */
/* App — orchestrates header, two panes, reveal-on-scroll. */

const { useState: useStateA, useEffect: useEffectA, useRef: useRefA } = React;

const LABELS = {
  hero:     "בית",
  freedom:  "השיטה",
  anchors:  "עוגנים",
  daily:    "יום־יום",
  projects: "פרויקטים",
  parents:  "להורים",
  join:     "הצטרפות",
};

/* Main site navigation */
const NAV = [
  { href: "about.html",    label: "מהי החממה" },
  { href: "learning.html", label: "איך לומדים כאן" },
  { href: "projects.html", label: "פרויקטים" },
  { href: "blog.html",     label: "בלוג" },
  { href: "shop.html",     label: "חנות" },
  { href: "parents.html",  label: "להורים" },
  { href: "team.html",     label: "צוות" },
  { href: "join.html",     label: "הצטרפות" },
];

/* Fixed site configuration — no tweaks panel in production */
const SITE = {
  palette:      "calm",
  vislayout:    "framed",
  splitRatio:   "50/50",
  visualBg:     "dark-green",
  ctaText:      "להרשמה לערב חשיפה",
  ctaHref:      "#join",
  sectionOrder: ["hero", "freedom", "anchors", "daily", "projects", "parents", "join"],
};

function Header({ onJumpTo, progressRef }) {
  return (
    <>
      <div className="ch-progress"><div className="ch-progress__bar" ref={progressRef} /></div>
      <header className="ch-header">
        <a href="index.html" className="ch-header__brand">
          <img className="ch-header__brand-logo" src="assets/logos/logo-full.png" alt="תיכון החממה — תיכון יוטוגוגי, עמל הוד השרון" />
        </a>
        <nav className="ch-header__nav" aria-label="ניווט">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="ch-header__link">
              {item.label}
            </a>
          ))}
        </nav>
        <button className="ch-header__cta" onClick={() => onJumpTo("join")}>
          {SITE.ctaText}
        </button>
      </header>
    </>
  );
}

function App() {
  const contentRef = useRefA(null);
  const progressRef = useRefA(null);
  const [activeIdx, setActiveIdx] = useStateA(0);

  const finalOrder = SITE.sectionOrder;
  const activeKey = finalOrder[Math.min(activeIdx, finalOrder.length - 1)];

  const splitMap = {
    "50/50": { right: "1fr", left: "1fr" },
    "60/40": { right: "1.5fr", left: "1fr" },
    "40/60": { right: "1fr",   left: "1.5fr" },
  };
  const split = splitMap[SITE.splitRatio] || splitMap["50/50"];

  useEffectA(() => {
    const root = contentRef.current;
    if (!root) return;
    let ticking = false;

    const update = () => {
      ticking = false;
      const h = root.clientHeight;

      root.querySelectorAll(".ch-reveal").forEach((el) => {
        if (el.classList.contains("in")) return;
        const r = el.getBoundingClientRect();
        const rootTop = root.getBoundingClientRect().top;
        if (r.top - rootTop < h * 0.92) el.classList.add("in");
      });

      const mid = h * 0.5;
      let best = 0;
      root.querySelectorAll("[data-idx]").forEach((s) => {
        const r = s.getBoundingClientRect();
        const rootTop = root.getBoundingClientRect().top;
        const top = r.top - rootTop;
        const bottom = top + r.height;
        if (top <= mid && bottom > mid) best = parseInt(s.dataset.idx, 10);
      });
      setActiveIdx(best);

      const max = root.scrollHeight - root.clientHeight;
      const pct = Math.min(1, Math.max(0, root.scrollTop / Math.max(1, max)));
      if (progressRef.current) progressRef.current.style.width = (pct * 100) + "%";
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    root.addEventListener("scroll", onScroll, { passive: true });
    update();
    const t1 = setTimeout(update, 200);
    const t2 = setTimeout(update, 800);
    return () => { root.removeEventListener("scroll", onScroll); clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffectA(() => {
    document.body.dataset.palette = SITE.palette;
  }, []);

  function jumpTo(id) {
    const root = contentRef.current;
    if (!root) return;
    const el = root.querySelector(`#${id}`);
    if (el) root.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  }

  const VisualPaneC = window.VisualPane;
  const ContentPaneC = window.ContentPane;

  return (
    <>
      <Header
        onJumpTo={jumpTo}
        progressRef={progressRef}
      />
      <div
        className="ch-stage"
        data-visbg={SITE.visualBg}
        data-vislayout={SITE.vislayout}
        style={{ "--ch-split-right": split.right, "--ch-split-left": split.left }}
      >
        <VisualPaneC activeIdx={activeIdx} sectionOrder={finalOrder} />
        <ContentPaneC paneRef={contentRef} sectionOrder={finalOrder} onJumpTo={jumpTo} ctaText={SITE.ctaText} ctaHref={SITE.ctaHref} />
      </div>

      <div className="ch-counter">
        <span className="ch-counter__dot"></span>
        <span className="ch-counter__num">{String(activeIdx + 1).padStart(2, "0")}</span>
        <span className="ch-counter__sep">/</span>
        <span>{String(finalOrder.length).padStart(2, "0")}</span>
        <span style={{ opacity: 0.6, marginInlineStart: 6 }}>· {LABELS[activeKey] || ""}</span>
      </div>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
