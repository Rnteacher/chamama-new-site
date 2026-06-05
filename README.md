# תיכון החממה — אתר סטטי

## פריסה ל-Netlify

### Drag & Drop (הדרך הפשוטה)
1. כנסו ל-[app.netlify.com](https://app.netlify.com)
2. גררו את **תיקיית הפרויקט כולה** לאזור ה-deploy
3. Netlify יפרוס את האתר ויזהה את הטפסים אוטומטית

### דרך GitHub
1. דחפו את הפרויקט ל-repository ב-GitHub
2. ב-Netlify: **New site → Import from Git**
3. בחרו את ה-repository — אין צורך ב-build command, **Publish directory: `.`** (תיקיית השורש)

---

## טפסים — Netlify Forms

האתר משתמש ב-**Netlify Forms** לאיסוף פניות ונרשמים. ארבעה טפסים פעילים:

| שם טופס | קובץ | שדות |
|---------|------|------|
| `open-day` | `index.html` (React) | parent, student, phone, grade, email |
| `contact` | `join.html` (HTML) | parent, student, phone, grade, email, message |
| `product-order` | `shop.html` (HTML) | product_id, product_title, name, phone, email, message |
| `newsletter-signup` | `blog.html` | name, email, consent, source |

*הערה:* ההרשמה לניוזלטר ממוקמת אך ורק בדף הבלוג (`blog.html`). דף התצוגה המקדימה (`newsletter-preview.html`) משמש ככלי ניהול פנימי לצוות בלבד ואינו מאפשר הרשמה. שליחת המיילים בפועל מתבצעת ידנית על ידי העתקת ה-HTML המעוצב והדבקתו בתוכנת המייל (כמו Gmail או Outlook). בעתיד ניתן יהיה לחבר שירות דיוור אוטומטי כגון Brevo או Mailchimp.

### בדיקות לאחר פריסה
- [ ] כנסו ל-Netlify Dashboard → **Forms** — ודאו שמופיעים ארבעה טפסים: `open-day`, `contact`, `product-order`, ו-`newsletter-signup`
- [ ] מלאו ושלחו כל טופס — ודאו שההגשה מופיעה ב-Dashboard
- [ ] בדקו שנשלחת הודעת אישור לאימייל (אם הגדרתם email notifications)
- [ ] ודאו שהודעת ההצלחה בעברית מוצגת לאחר שליחה
- [ ] ודאו שמוצרים שנמכרו (sold) בחנות לא מאפשרים הזמנה
- [ ] ודאו שדף הפוסט הבודד (`blog-post.html?slug=...`) עובד תקין
- [ ] ודאו שדף הכנת הניוזלטר (`newsletter-preview.html`) מציג רק פוסטים שסומנו לכך, תחת הסינונים שבחרתם (הדף אינו מאונדקס במנועי חיפוש)
- [ ] ודאו שטופס ההזמנה של החנות פועל ומציג הודעת הצלחה בעברית לאחר הגשה במודל
- [ ] בדקו את העתקת הניוזלטר והדבקתו בתוכנת הדואר האלקטרוני (HTML מעוצב)
- [ ] ודאו שטופס ההרשמה לניוזלטר בבלוג שולח ומציג הודעת הצלחה

---

## מבנה הפרויקט

```
index.html          — דף הבית (React SPA, split-scroll)
about.html          — מהי החממה
learning.html       — איך לומדים כאן
projects.html       — פרויקטים
parents.html        — להורים
team.html           — צוות
join.html           — הצטרפות + טופס התעניינות
blog.html           — בלוג וחדשות (רשימת פוסטים)
blog-post.html      — תצוגת פוסט בודד (לפי slug)
newsletter-preview.html — כלי להכנת ניוזלטר והעתקה למייל
shop.html           — קטלוג מוצרים פתוח להזמנות

app.jsx             — אפליקציית React ראשית
content-pane.jsx    — תוכן המקטעים (כולל טופס יום פתוח)
visual-pane.jsx     — פאנל התמונות הימני
image-slot.js       — רכיב תמונות עם placeholder

styles.css          — עיצוב דף הבית
tokens.css          — ערכי צבע ועיצוב
pages.css           — עיצוב הדפים הסטטיים
blog-shop.css       — עיצוב ייעודי לבלוג ולחנות
pages.js            — JavaScript בסיסי לדפים הסטטיים

data/               — קבצי נתונים מקומיים (posts.json, products.json)
assets/             — תמונות, לוגואים, פונטים
fonts/              — פונטים מקומיים
```

## הרצה מקומית

**ללא התקנות** — פתחו שרת HTTP פשוט:

```bash
# Python (מובנה)
python -m http.server 8080

# Node (npx)
npx serve .

# VS Code: תוסף Live Server
```

ואז פתחו `http://localhost:8080` בדפדפן.

> **שימו לב:** שליחת הטפסים דרך Netlify Forms עובדת רק לאחר פריסה בפועל על Netlify. בפיתוח מקומי תקבלו שגיאת 405 — זה תקין.

---

## פרטי קשר
- טלפון: **09-7884549**
- אימייל: **info@chamama.org**

## Google Sheets content source

הבלוג, החנות והניוזלטרים השמורים קוראים כעת מגיליונות Google Sheets באופן דינמי באמצעות **Netlify Functions**. קבצי ה-JSON המקומיים בפרויקט (`data/posts.json`, `data/products.json`, `data/newsletters.json`) נשמרים כגיבוי (Fallback) למקרה של תקלה ברשת או בפיתוח מקומי.

### הגדרות ומשתני סביבה ב-Netlify
לחיבור הגיליונות, יש להגדיר ב-Netlify את שלושת משתני הסביבה הבאים:
* `POSTS_CSV_URL` — קישור ה-CSV של הלשונית `posts`
* `PRODUCTS_CSV_URL` — קישור ה-CSV של הלשונית `products`
* `NEWSLETTERS_CSV_URL` — קישור ה-CSV של הלשונית `newsletters`

### מבנה הגיליונות ופרסום לרשת
1. פתחו גיליון Google Sheets חדש עם שלוש לשוניות (Tabs): `posts`, `products` ו-`newsletters`.
2. בכל לשונית, הגדירו את העמודות הבאות בשורה הראשונה:
   - **posts**: `slug,title,date,type,excerpt,body,image,tags,published,newsletter`
     - *הערה לגבי tags*: רשימה מופרדת באמצעות קו אנכי (`|`), לדוגמה `הרשמה|אירועים`.
     - *הערה לגבי published ו-newsletter*: תומך בערכים `TRUE/FALSE`, `yes/no`, `1/0` או `כן/לא`.
   - **products**: `id,title,creator,category,price,currency,description,image,status,published`
     - *הערה לגבי status*: ערך מסוג `available` או `sold`.
     - *הערה לגבי price*: מספר בלבד.
   - **newsletters**: `id,title,date,issue,template,intro,post_slugs,published`
     - *id*: מזהה ייחודי קבוע לניוזלטר (למשל `newsletter-2026-06`).
     - *template*: סוג תבנית: `classic` (קלאסי), `magazine` (מגזין), `poster` (פוסטר), או `compact` (קומפקטי).
     - *post_slugs*: רשימת מזהי (slugs) פוסטים מופרדת בצינור (`|`), למשל `exhibition-2026|open-evening-2026`.
     - *published*: TRUE/FALSE (כן/לא).
3. בצעו שיתוף לרשת: **קובץ (File) ← שיתוף (Share) ← פרסם באינטרנט (Publish to web)**.
4. בחרו לפרסם כל לשונית בנפרד כקובץ **ערכים מופרדים בפסיק (CSV)** והעתיקו את הקישור שנוצר לכל אחת.
5. הזינו את הקישורים במשתני הסביבה בלוח הבקרה של Netlify.

### התנהגות במטמון (Cache)
השרת של Netlify Functions מחזיר את הנתונים עם כותרת `Cache-Control: public, max-age=60`, מה שאומר שעדכונים מגוגל שיטס ישתקפו באתר לאחר רענון, במרווח של כדקה לכל היותר.

> [!CAUTION]
> אין לפרסם מידע רגיש או פרטי בגיליונות גוגל שיטס, כיוון שקישורי ה-CSV הללו נגישים לציבור דרך הקישור הישיר.

---

## תזרים עבודה: יצירה וניהול ניוזלטרים שמורים

מערכת הניוזלטרים מציעה שמירה של גיליונות יציבים בכתובות קבועות (למשל `newsletter.html?id=newsletter-2026-06`), תמיכה ב-4 תבניות תצוגה מעוצבות, אפשרות הדפסה נקייה או שמירה כ-PDF ופעולות שיתוף קלות.

### תזרים העבודה לצוות בית הספר
1. **יצירת התוכן**:
   - פתחו את כלי העזר הפנימי של הצוות: `newsletter-preview.html` (הדף מסומן ב-`noindex,nofollow` כדי שמנועי חיפוש לא יסרקו אותו).
   - הגדירו את מזהה הניוזלטר, הכותרת, תיאור הפתיח, בחרו תבנית עיצובית וסננו פוסטים.
   - לחצו על **"העתק שורת ניוזלטר לשיטס"**.
2. **פרסום הרשומה**:
   - הדביקו את השורה ישירות לתוך לשונית `newsletters` בגוגל שיטס (או באמצעות אפליקציית Apps Script CMS בנפרד).
   - ודאו שמצב הפרסום מוגדר ל-`כן` (TRUE).
3. **שיתוף הניוזלטר**:
   - היכנסו לקישור הציבורי שנוצר בדפדפן: `newsletter.html?id=[מזהה הניוזלטר]`.
   - בראש הדף, השתמשו בכפתור **העתק קישור** או **העתק טקסט למייל** (המכיל נוסח קצר בעברית עם הקישור).
   - הדביקו ושלחו את הקישור לתפוצה שלכם דרך Gmail, Brevo, Mailchimp או בכל תוכנת דיוור אחרת.
4. **הדפסה ושמירה כ-PDF**:
   - לחצו על כפתור **"הדפסה / שמירה כ־PDF"** בראש דף הניוזלטר הציבורי.
   - הדפדפן יפתח את חלון ההדפסה. עיצוב הדף מותאם במיוחד להדפסה (`@media print` מסתיר את כפתורי הניווט והשיתוף, שומר על תצוגה מיושרת לימין, גדלים מתאימים ומונע חיתוך כותרות או תמונות). ניתן לבחור מדפסת פיזית או לשמור כקובץ PDF ישירות מהדפדפן.
   - שים לב: לא מיושם מחולל PDF בצד השרת. כל ההדפסה והשמירה מבוצעות דרך מנגנון ההדפסה המובנה בדפדפן הלקוח (`window.print()`).

---

### בדיקות לאחר פריסה (Google Sheets & Newsletters)
- [ ] ודאו שפרסמתם את לשונית `newsletters` כ-CSV והעתקתם את הקישור.
- [ ] הגדירו את `NEWSLETTERS_CSV_URL` במשתני הסביבה של Netlify.
- [ ] פרסו את האתר ב-Netlify.
- [ ] כנסו לכתובת `/.netlify/functions/newsletters` בדפדפן וודאו שמוחזר פלט JSON תקין המכיל את רשומת הניוזלטר.
- [ ] כנסו לקישור הציבורי של הניוזלטר: `newsletter.html?id=newsletter-2026-06` וודאו שהוא נטען ומציג את התכנים בעיצוב שבחרתם.
- [ ] בדקו את כל 4 התבניות הנתמכות (`classic`, `magazine`, `poster`, `compact`) וודאו שהן נראות מעולה.
- [ ] בדקו את כפתורי השיתוף וההעתקה בראש הדף הציבורי.
- [ ] בדקו את התנהגות ההדפסה ולוח התצוגה המקדימה להדפסה של הדפדפן.
- [ ] ודאו שדף בונה הניוזלטר `newsletter-preview.html` מייצר את שורת ה-TSV להעתקה ומאפשר קישור תצוגה מקדימה תקין.
- [ ] ודאו שרשומות שלא סומנו כפעילות/מפורסמות (`published = FALSE`) מציגות הודעת שגיאה "הניוזלטר לא נמצא" בדף הציבורי.



