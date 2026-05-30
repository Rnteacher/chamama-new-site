/* global React */
/* Visual pane — right side. Stack of full-height image panels, translated by activeIdx.
   Each panel is an <image-slot> the school fills with a real photo (drag & drop).
   Layout (full / framed / type) is controlled by .ch-stage[data-vislayout]. */

/* One entry per section key. `idx` is the display number shown in captions. */
const VIS = {
  hero: {
    slot: "vis-hero",
    placeholder: "תמונת שער — חניכים במרחב הפתוח של החממה",
    title: "המרחב",
    sub: "החצר, חדרי הסטודיו, הפינות השקטות — איפה שהיום קורה.",
    tag: "תיכון החממה · הוד השרון",
    typoWord: <>עצמאות בתוך <span className="neon">מסגרת</span></>,
    typoSub: "בית ספר יוטוגוגי לחניכים וחניכות שבונים דרך אישית.",
  },
  freedom: {
    slot: "vis-freedom",
    placeholder: "שיחת מנטורינג — חניך/ה עם מבוגר/ת משמעותי/ת",
    title: "ליווי",
    sub: "חופש לא עומד לבד. לכל חניך מבוגר שמכיר אותו מקרוב.",
    tag: "מנטורינג · תוכנית אישית",
    typoWord: <>חופש <span className="neon">מוחזק</span></>,
    typoSub: "יותר בחירה מבית ספר רגיל. יותר ליווי ממה שנדמה.",
  },
  anchors: {
    slot: "vis-anchors",
    placeholder: "רגע של עבודה — חניכה מרוכזת בתהליך אישי",
    title: "אדם · למידה · עולם",
    sub: "שלושה עוגנים שמלווים כל תהליך אישי בחממה.",
    tag: "שלושה עוגנים",
    typoWord: <>אדם · למידה · <span className="neon">עולם</span></>,
    typoSub: "מי אני, איך אני לומד, ומה אני יוצר בעולם.",
  },
  daily: {
    slot: "vis-daily",
    placeholder: "סצנת יום־יום — סדנה, פינת עבודה, דיון בקבוצה",
    title: "יום בחממה",
    sub: "בוקר פתוח, מפגשי קבוצה, עבודת פרויקט, שיחות תהליך.",
    tag: "ככה זה נראה",
    typoWord: <>יום אחד <span className="neon">כאן</span></>,
    typoSub: "בלי צלצולים מיותרים. עם קצב, מבנה ואחריות.",
  },
  projects: {
    slot: "vis-projects",
    placeholder: "תוצר פרויקט — תיק עבודות של חניך/ה",
    title: "פרויקטים",
    sub: "עבודה אמיתית שיוצאת אל העולם — לא תרגיל.",
    tag: "תיק עבודות · 2025/26",
    typoWord: <>דברים <span className="neon">קורים</span></>,
    typoSub: "אפליקציות, פודקאסטים, מחקר קהילתי, עיצוב.",
  },
  parents: {
    slot: "vis-parents",
    placeholder: "הורים וחניכים — ערב חשיפה / שיחה משותפת",
    title: "להורים",
    sub: "הילד שלכם לא נשאר לבד עם החופש.",
    tag: "שאלות שהורים שואלים",
    typoWord: <>חופש לא אומר <span className="neon">לבד</span></>,
    typoSub: "יש בחירה, אבל יש גם מי שמחזיק, שואל ומכוון.",
  },
  join: {
    slot: "vis-join",
    placeholder: "ביקור בחממה — ערב חשיפה, קפה, שיחה",
    title: "בואו להכיר",
    sub: "הדרך הכי טובה להבין את החממה היא לבוא ולשבת.",
    tag: "ערב חשיפה · 22 במרץ",
    typoWord: <>הדלת <span className="neon">פתוחה</span></>,
    typoSub: "ערב חשיפה לחניכים, הורים ושאלות קשות. עם קפה.",
  },
};

function VisPanel({ keyName, idx }) {
  const v = VIS[keyName] || VIS.hero;
  const num = String(idx + 1).padStart(2, "0");
  return (
    <div className={`ch-vis-panel ch-vis-panel--${keyName}`}>
      <div className="ch-beam ch-beam--soft" />
      <div className="ch-vis-pattern ch-vis-pattern--p2" />

      {/* IMAGE figure (framed + full layouts) */}
      <figure className="ch-vis-figure">
        {/* eslint-disable-next-line react/no-unknown-property */}
        <image-slot
          id={v.slot}
          src={`assets/uploads/${v.slot}.webp`}
          panx={v.slot === "vis-parents" ? "8.2622" : undefined}
          shape="rect"
          fit="cover"
          placeholder={v.placeholder}
        ></image-slot>
        <figcaption className="ch-vis-figcap">
          <span className="ch-vis-figcap__idx">{num}</span>
          <span className="ch-vis-figcap__body">
            <h3 className="ch-vis-figcap__title">{v.title}</h3>
            <p className="ch-vis-figcap__sub">{v.sub}</p>
          </span>
        </figcaption>
      </figure>

      {/* overlaid scrim + tag (full layout) */}
      <div className="ch-vis-scrim" />
      <div className="ch-vis-tag">
        <span className="ch-vis-tag__dot" />
        <span><b>{num}</b> · {v.tag}</span>
      </div>

      {/* typography-only fallback (type layout) */}
      <div className="ch-vis-typo">
        <div className="ch-vis-typo__word">{v.typoWord}</div>
        <p className="ch-vis-typo__sub">{v.typoSub}</p>
      </div>
    </div>
  );
}

function VisualPane({ activeIdx, sectionOrder }) {
  return (
    <div className="ch-pane ch-pane--visual">
      <div className="ch-vis-stack" style={{ transform: `translateY(${-activeIdx * 100}vh)` }}>
        {sectionOrder.map((key, i) => (
          <VisPanel key={key} keyName={key} idx={i} />
        ))}
      </div>
    </div>
  );
}

window.VisualPane = VisualPane;
