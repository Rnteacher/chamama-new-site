/* global React */
/* Content pane — left side. Scrollable stack of sections (MD §8.1 structure):
   hero · freedom · anchors(אדם/למידה/עולם) · daily · projects · parents · join */

const { useState: useStateC } = React;

/* ─── Section: Hero ─── */
function SectionHero({ idx, onJumpTo, ctaText, ctaHref }) {
  return (
    <section className="ch-section" id="hero" data-idx={idx} data-screen-label={`${String(idx + 1).padStart(2, '0')} Hero`}>
      <p className="ch-eyebrow ch-reveal ch-reveal--d1">תיכון החממה · עמל הוד השרון</p>
      <h1 className="ch-h1 ch-reveal ch-reveal--d2">
        עצמאות בתוך <span className="neon">מסגרת</span>.
      </h1>
      <p className="ch-lead ch-reveal ch-reveal--d3">
        תיכון החממה הוא בית ספר יוטוגוגי שבו חניכים וחניכות לומדים לבנות דרך אישית, ליצור פרויקטים אמיתיים ולקחת אחריות על הלמידה שלהם — בליווי צמוד של מבוגרים משמעותיים.
      </p>
      <p className="ch-support ch-reveal ch-reveal--d3">
        יותר בחירה מבית ספר רגיל. יותר ליווי ממה שנדמה כששומעים ״למידה עצמאית״.
      </p>
      <div className="ch-btn-row ch-reveal ch-reveal--d4">
        <a className="ch-btn ch-btn--neon" href={ctaHref} onClick={(e) => {e.preventDefault();onJumpTo("join");}}>
          <span>בואו להכיר</span>
          <span className="ch-btn__arrow">←</span>
        </a>
        <a className="ch-btn ch-btn--ghost" href="learning.html">
          <span>איך לומדים כאן</span>
          <span className="ch-btn__arrow">↗</span>
        </a>
      </div>
    </section>);

}

/* ─── Section: Freedom / explanation ─── */
function SectionFreedom({ idx }) {
  const cards = [
  { k: "מנטורינג", h: "מבוגר שמכיר אותך", p: "לכל חניך מנטור אישי שרואה אותו, יודע מה קשה לו, ומחזיק את הקצב — לא רק את החומר." },
  { k: "תוכנית אישית", h: "מסלול שנבנה איתך", p: "תוכנית לימודים שמתאימה לחניך הספציפי הזה, עם גבולות ברורים ובתוכם חופש אמיתי לכיוון." },
  { k: "שיחות תהליך", h: "מחזירות לתנועה", p: "כשמתבלבלים, נתקעים או מאבדים מוטיבציה — יש שיחה שמחזירה למסלול, לא ויתור." },
  { k: "קבוצת שייכות", h: "לא לומדים לבד", p: "קבוצה קטנה וקבועה שמכירה אותך, מבוגר שאחראי עליה, ומקום שבו כל חניך נראה." }];

  return (
    <section className="ch-section ch-section--alt" id="freedom" data-idx={idx} data-screen-label={`${String(idx + 1).padStart(2, '0')} Freedom`}>
      <p className="ch-eyebrow ch-reveal">השיטה</p>
      <h2 className="ch-h2 ch-reveal ch-reveal--d1">חופש שצריך ללמוד <span className="neon">איך להשתמש בו</span>.</h2>
      <p className="ch-lead ch-reveal ch-reveal--d2">
        בחממה חניכים וחניכות מקבלים יותר מקום לבחור, לשאול, ליצור ולהוביל. אבל הבחירה הזו לא עומדת לבד — היא מלווה בארבעה דברים שמחזיקים אותה.
      </p>
      <div className="ch-freedom-grid">
        {cards.map((c, i) =>
        <article key={i} className={`ch-freedom-card ch-reveal ch-reveal--right ch-reveal--d${Math.min(i + 1, 4)}`}>
            <p className="ch-freedom-card__k">{c.k}</p>
            <h3 className="ch-freedom-card__h">{c.h}</h3>
            <p className="ch-freedom-card__p">{c.p}</p>
          </article>
        )}
      </div>
      <p className="ch-support ch-reveal" style={{ marginTop: 28 }}>
        המטרה היא לא רק ללמוד חומר — אלא ללמוד איך ללמוד, איך לפעול, איך להתמיד, ואיך להפוך רעיון למציאות.
      </p>
    </section>);

}

/* ─── Section: Anchors (אדם / למידה / עולם) ─── */
function SectionAnchors({ idx }) {
  const anchors = [
  { id: "01", h: "אדם", p: "מי אני, מה חשוב לי, ולאן אני רוצה להתפתח. תהליך אישי שמתחיל בשאלה, לא בהצהרה." },
  { id: "02", h: "למידה", p: "איך אני לומד, חוקר, מתנסה ומתקדם. למידה שמתחילה בסקרנות ונבנית מניסיון אמיתי." },
  { id: "03", h: "עולם", p: "מה אני יוצר, למי זה חשוב, ואיך זה יוצא החוצה — אל קהילה, אנשים ועולם." }];

  return (
    <section className="ch-section" id="anchors" data-idx={idx} data-screen-label={`${String(idx + 1).padStart(2, '0')} Anchors`}>
      <p className="ch-eyebrow ch-reveal">שלושה עוגנים</p>
      <h2 className="ch-h2 ch-reveal ch-reveal--d1">אדם, למידה, <span className="neon">עולם</span>.</h2>
      <p className="ch-lead ch-reveal ch-reveal--d2">
        שלושה עוגנים פשוטים שמלווים כל תהליך אישי בחממה. הם לא מקצועות — הם שאלות שכל חניך לומד לשאול את עצמו.
      </p>
      <div className="ch-anchors ch-anchors--three">
        {anchors.map((a, i) =>
        <article key={a.id} className={`ch-anchor ch-reveal ch-reveal--right ch-reveal--d${i + 1}`}>
            <span className="ch-anchor__num">{a.id}</span>
            <h3 className="ch-anchor__h">{a.h}</h3>
            <p className="ch-anchor__p">{a.p}</p>
          </article>
        )}
      </div>
    </section>);

}

/* ─── Section: Day-to-day ─── */
function SectionDaily({ idx }) {
  const rows = [
  { t: "8:45", h: "פתיחת יום בקבוצה", p: "מתחילים בקבוצת השייכות: מה קורה היום, מה תקוע, ומה הצעד הבא של כל אחד." },
  { t: "9:30", h: "זמן פרויקט", p: "עבודה אישית או קבוצתית על הפרויקט — ולחניכים שלומדים באקדמיה, גם זמן לקורס באוניברסיטה הפתוחה. המנטור זמין לשאלה, לכיוון ולשיחות אישיות." },
  { t: "11:30", h: "מרחבי למידה", p: "מגמות, סדנאות וקבוצות למידה — חלקם לפי בחירה, חלקם לקראת בחינות הגמר ותעודת המקצוע. לא הכול חופשי, ולא הכול כפוי." },
  { t: "13:30", h: "מפגש סיום יום", p: "מסיימים בקבוצה: מה למדו היום, מה הלהיב, מה תקע, ומה עושים מחר טוב יותר ומכוון יותר." }];

  return (
    <section className="ch-section ch-section--alt" id="daily" data-idx={idx} data-screen-label={`${String(idx + 1).padStart(2, '0')} Daily`}>
      <p className="ch-eyebrow ch-reveal">יום־יום</p>
      <h2 className="ch-h2 ch-reveal ch-reveal--d1">איך זה נראה <span className="neon">ביום־יום</span>.</h2>
      <p className="ch-lead ch-reveal ch-reveal--d2">
        בלי צלצולים מיותרים, אבל עם קצב, מבנה ואחריות. ככה נראה יום טיפוסי בחממה — גמיש, אבל לא מופקר.
      </p>
      <div className="ch-daily">
        {rows.map((r, i) =>
        <div key={i} className={`ch-daily__row ch-reveal ch-reveal--right ch-reveal--d${Math.min(i + 1, 4)}`}>
            <p className="ch-daily__time">{r.t}</p>
            <h3 className="ch-daily__h">{r.h}</h3>
            <p className="ch-daily__p">{r.p}</p>
          </div>
        )}
      </div>
    </section>);

}

/* ─── Section: Projects ─── */
function SectionProjects({ idx }) {
  const projects = [
  { n: "01", tag: "מייקרס", who: "דורון, שנה ג׳", t: "רובוט R2D2", d: "רובוט אוטונומי שזז, מסתובב ומאיר. התחיל מאהבה לסרטי מסע בין כוכבים, הסתיים ברפליקה אמינה של הרובוט — כולל הדפסת חלקים בתלת מימד." },
  { n: "02", tag: "הפקה", who: "יאיר ואריאל, שנות ב׳-ג׳", t: "פודקאסט על זהות ושייכות", d: "סדרת שיחות עם מתבגרים ומבוגרים על שייכות, בחירה ולחץ חברתי. שלוש עונות, עם מאזינים אמיתיים מחוץ לבית הספר." },
  { n: "03", tag: "הייטק", who: "אורי ואריאל, שנה ג׳", t: 'אפליקציית "חיבורי"', d: 'אפליקציה שמחברת בין בני נוער בעלי כישורים דומים. התחילה כהאקתון בנושא קהילה, הסתיימה בגרסה שעובדת ושהוצגה בתקשורת.' },
  { n: "04", tag: "סביבה", who: "גלעד, שנה ד׳", t: "גינה לימודית בחצר", d: "הפיכת פינה מוזנחת בחצר לגינת ירק וצמחי מאכל. חלום של חניך להיות חקלאי — ויבול ראשון שכבר יצא." }];

  return (
    <section className="ch-section" id="projects" data-idx={idx} data-screen-label={`${String(idx + 1).padStart(2, '0')} Projects`}>
      <p className="ch-eyebrow ch-reveal">פרויקטים נבחרים</p>
      <h2 className="ch-h2 ch-reveal ch-reveal--d1">לא תרגיל. <span className="neon">עבודה אמיתית.</span></h2>
      <p className="ch-lead ch-reveal ch-reveal--d2">
        כל פרויקט הוא סיפור תהליך: מאיפה זה התחיל, מה היה קשה, מה השתנה בדרך, ומה יצא לעולם בסוף.
      </p>
      <div className="ch-projects">
        {projects.map((p, i) =>
        <a key={p.n} className={`ch-project ch-reveal ch-reveal--right ch-reveal--d${Math.min(i + 1, 4)}`} href="projects.html">
            <span className="ch-project__num">{p.n}</span>
            <span>
              <h3 className="ch-project__h">{p.t}</h3>
              <p className="ch-project__p">{p.d}</p>
            </span>
            <span className="ch-project__meta">
              <span className="ch-project__tag">{p.tag}</span>
              <span className="ch-project__who">{p.who}</span>
            </span>
          </a>
        )}
      </div>
      <div className="ch-btn-row ch-reveal" style={{ marginTop: 28 }}>
        <a className="ch-btn ch-btn--ghost" href="projects.html">
          <span>לכל הפרויקטים</span>
          <span className="ch-btn__arrow">←</span>
        </a>
      </div>
    </section>);

}

/* ─── Section: Parents FAQ ─── */
function SectionParents({ idx }) {
  const [open, setOpen] = useStateC(0);
  const faqs = [
  { q: "האם באמת לומדים כאן? יש מערכת?", a: "כן. יש מערכת, יש מפגשי למידה, ויש דרישות. היא פשוט גמישה יותר ומותאמת לחניך — לא מערכת אחת לכולם." },
  { q: "מה עם תעודה ועתיד מקצועי?", a: "בחממה אין בחינות בגרות — יש בחינות גמר, והחניכים מסיימים עם תעודת מקצוע. חניכים שמוכנים יכולים גם להתחיל ללמוד באקדמיה דרך האוניברסיטה הפתוחה, בליווי צמוד." },
  { q: "מה קורה אם הילד שלי לא יוזם, או לא עושה כלום?", a: "זה בדיוק מה שהליווי קיים בשבילו. מנטור ושיחות תהליך לא נותנים לחניך ״להיעלם״ — מחזירים אותו לתנועה, בלי לוותר ובלי להשתלט." },
  { q: "איך אתם יודעים שהחניך מתקדם?", a: "דרך תיעוד תהליך, שיחות קבועות ותוצרים אמיתיים — לא רק דרך ציון במבחן. ההתקדמות נראית, ואנחנו משתפים אתכם בה." },
  { q: "האם זה מתאים לכל אחד?", a: "לא בהכרח, ואנחנו אומרים את זה בכנות. בתהליך ההיכרות נבדוק יחד אם החממה היא המקום הנכון לחניך הזה, עכשיו." },
  { q: "מה תפקיד ההורים בתהליך?", a: "שותפות, לא ניהול. אנחנו בקשר רציף, משתפים בתהליך, ומבקשים מכם להחזיק יחד איתנו — לא במקומנו." }];

  return (
    <section className="ch-section ch-section--dark" id="parents" data-idx={idx} data-screen-label={`${String(idx + 1).padStart(2, '0')} Parents`}>
      <p className="ch-eyebrow ch-reveal">להורים</p>
      <h2 className="ch-h2 ch-reveal ch-reveal--d1">חופש לא אומר <span className="neon">לבד</span>.</h2>
      <p className="ch-lead ch-reveal ch-reveal--d2">
        לפני שמתלהבים או נלחצים — הנה השאלות שהורים באמת שואלים אותנו, והתשובות הכנות שלנו.
      </p>
      <div className="ch-faq ch-reveal ch-reveal--d3">
        {faqs.map((f, i) =>
        <div key={i} className={"ch-faq__item" + (open === i ? " is-open" : "")}>
            <button className="ch-faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
              <span>{f.q}</span>
              <span className="ch-faq__sign">+</span>
            </button>
            <div className="ch-faq__a"><p>{f.a}</p></div>
          </div>
        )}
      </div>
      <div className="ch-btn-row ch-reveal" style={{ marginTop: 28 }}>
        <a className="ch-btn ch-btn--ghost" href="parents.html">
          <span>עוד להורים</span>
          <span className="ch-btn__arrow">←</span>
        </a>
      </div>
    </section>);

}

/* ─── Section: Join (open day / CTA) ─── */
function SectionJoin({ idx, ctaText }) {
  const [submitted, setSubmitted] = useStateC(false);
  const [sending, setSending] = useStateC(false);
  const [form, setForm] = useStateC({ parent: "", student: "", phone: "", grade: "", email: "" });
  function update(k, v) {setForm((f) => ({ ...f, [k]: v }));}

  function encode(data) {
    return new URLSearchParams(data).toString();
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.parent || !form.phone) return;
    setSending(true);
    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "open-day",
          parent:  form.parent,
          student: form.student || "",
          phone:   form.phone,
          grade:   form.grade  || "",
          email:   form.email  || "",
        }),
      });
      if (!response.ok) throw new Error("server error");
      setSubmitted(true);
    } catch (err) {
      setSending(false);
      alert("הייתה בעיה בשליחת הטופס. נסו שוב או צרו קשר בטלפון 09-7884549.");
    }
  }
  return (
    <section className="ch-section ch-section--dark" id="join" data-idx={idx} data-screen-label={`${String(idx + 1).padStart(2, '0')} Join`}>
      <p className="ch-eyebrow ch-reveal">הצטרפות · יום פתוח 22 במרץ</p>
      <h2 className="ch-h2 ch-reveal ch-reveal--d1">בואו <span className="neon">להכיר</span>.</h2>
      <p className="ch-lead ch-reveal ch-reveal--d2">
        הדרך הכי טובה להבין את החממה היא לבוא ולשבת. שעת היכרות — עם ההורים, עם החניך, ועם השאלות הקשות.
      </p>

      {submitted ?
      <div className="ch-register-success ch-reveal in">
          <h3 className="ch-register-success__h">נרשמתם, תודה.</h3>
          <p className="ch-register-success__p">
            שלחנו אישור{form.email ? ` ל${form.email}` : ""}. נחזור אליכם בימים הקרובים לתיאום סופי.
            <br />
            עד אז — מוזמנים לקרוא על הדרך שלנו ולעבור על הפרויקטים.
          </p>
        </div> :

      <form className="ch-register-grid ch-reveal ch-reveal--d3" onSubmit={submit}>
          <div className="ch-field">
            <label className="ch-field__label">שם ההורה</label>
            <input type="text" required value={form.parent} onChange={(e) => update("parent", e.target.value)} placeholder="רותם כהן" />
          </div>
          <div className="ch-field">
            <label className="ch-field__label">שם החניך/ה</label>
            <input type="text" value={form.student} onChange={(e) => update("student", e.target.value)} placeholder="יואב כהן" />
          </div>
          <div className="ch-field">
            <label className="ch-field__label">טלפון</label>
            <input type="tel" required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="050-1234567" />
          </div>
          <div className="ch-field">
            <label className="ch-field__label">עולה מכיתה</label>
            <select value={form.grade} onChange={(e) => update("grade", e.target.value)}>
              <option value="">בחרו —</option>
              <option value="ט">ט׳ (שכבת פתיחה)</option>
              <option value="י">י׳</option>
              <option value="יא">י״א</option>
              <option value="other">אחר / טרם החלטנו</option>
            </select>
          </div>
          <div className="ch-field ch-field--wide">
            <label className="ch-field__label">אימייל</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="rotem@example.com" />
          </div>
          <div className="ch-register-actions ch-field--wide">
            <button type="submit" className="ch-btn ch-btn--neon" disabled={sending}>
              <span>{sending ? "שולח..." : (ctaText || "להרשמה ליום הפתוח")}</span>
              <span className="ch-btn__arrow">←</span>
            </button>
            <a className="ch-btn ch-btn--ghost" href="mailto:info@chamama.org">
              <span>או דברו איתנו</span>
              <span className="ch-btn__arrow">↗</span>
            </a>
          </div>
        </form>
      }

      <p className="ch-register-note ch-reveal">
        ההרשמה ליום הפתוח אינה מחייבת. אם לא הצלחתם להגיע — נשמח לקבוע פגישה אישית.
      </p>

      <div className="ch-footer-strip">
        <span>© תיכון החממה · עמל הוד השרון</span>
        <a href="mailto:info@chamama.org">info@chamama.org</a>
        <a href="tel:097884549">09-7884549</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
        <a href="#" onClick={(e) => e.preventDefault()}>Facebook</a>
        <span className="ch-footer-partners">
          <img src="assets/logos/partner-ministry-of-labor.png" alt="משרד העבודה" />
          <img src="assets/logos/partner-amal.png" alt="רשת עמל" />
          <img src="assets/logos/partner-hod-hasharon.png" alt="עיריית הוד השרון" />
        </span>
      </div>
    </section>);

}

const SECTIONS = {
  hero: SectionHero,
  freedom: SectionFreedom,
  anchors: SectionAnchors,
  daily: SectionDaily,
  projects: SectionProjects,
  parents: SectionParents,
  join: SectionJoin
};

function ContentPane({ paneRef, sectionOrder, onJumpTo, ctaText, ctaHref }) {
  return (
    <div className="ch-pane ch-pane--content" ref={paneRef}>
      <div className="ch-content">
        {sectionOrder.map((key, i) => {
          const S = SECTIONS[key];
          if (!S) return null;
          return <S key={key} idx={i} onJumpTo={onJumpTo} ctaText={ctaText} ctaHref={ctaHref} />;
        })}
      </div>
    </div>);

}

window.ContentPane = ContentPane;