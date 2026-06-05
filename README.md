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

האתר משתמש ב-**Netlify Forms** לאיסוף פניות. שלושה טפסים פעילים:

| שם טופס | קובץ | שדות |
|---------|------|------|
| `open-day` | `index.html` (React) | parent, student, phone, grade, email |
| `contact` | `join.html` (HTML) | parent, student, phone, grade, email, message |
| `product-order` | `shop.html` (HTML) | product_id, product_title, name, phone, email, message |

### בדיקות לאחר פריסה
- [ ] כנסו ל-Netlify Dashboard → **Forms** — ודאו שמופיעים שלושה טפסים: `open-day`, `contact`, ו-`product-order`
- [ ] מלאו ושלחו כל טופס — ודאו שההגשה מופיעה ב-Dashboard
- [ ] בדקו שנשלחת הודעת אישור לאימייל (אם הגדרתם email notifications)
- [ ] ודאו שהודעת ההצלחה בעברית מוצגת לאחר שליחה
- [ ] ודאו שמוצרים שנמכרו (sold) בחנות לא מאפשרים הזמנה
- [ ] ודאו שדף הפוסט הבודד (`blog-post.html?slug=...`) עובד תקין
- [ ] ודאו שדף הכנת הניוזלטר (`newsletter-preview.html`) מציג רק פוסטים שסומנו לכך
- [ ] ודאו שטופס ההזמנה של החנות פועל ומציג הודעת הצלחה בעברית לאחר הגשה במודל

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

---

## ארכיטקטורת נתונים (בלוג וחנות)
- הבלוג והחנות קוראים כעת מקבצי JSON מקומיים (`data/posts.json` ו-`data/products.json`).
- המבנה מתוכנן כך שבעתיד ניתן להחליף את מקור הנתונים ב-Google Sheets באמצעות Netlify Functions או Google Apps Script, ללא שכתוב של ה-frontend.
- אין כרגע בסיס נתונים או צד שרת פעיל.
- החנות אינה כוללת סליקה או תשלום בפועל, אלא שליחת בקשות הזמנה בלבד באמצעות Netlify Forms.

