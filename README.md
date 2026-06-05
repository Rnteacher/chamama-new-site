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

## Google Sheets content source

הבלוג והחנות קוראים כעת מגיליונות Google Sheets באופן דינמי באמצעות **Netlify Functions**. קבצי ה-JSON המקומיים הישנים (`data/posts.json` ו-`data/products.json`) נשמרים בפרויקט כגיבוי (Fallback) למקרה של תקלה ברשת או בפיתוח מקומי.

### הגדרות ומשתני סביבה ב-Netlify
לחיבור הגיליונות, יש להגדיר ב-Netlify את שני משתני הסביבה הבאים:
* `POSTS_CSV_URL` — קישור ה-CSV של הלשונית `posts`
* `PRODUCTS_CSV_URL` — קישור ה-CSV של הלשונית `products`

### מבנה הגיליונות ופרסום לרשת
1. פתחו גיליון Google Sheets חדש עם שתי לשוניות (Tabs): `posts` ו-`products`.
2. בכל לשונית, הגדירו את העמודות הבאות בשורה הראשונה:
   - **posts**: `slug,title,date,type,excerpt,body,image,tags,published,newsletter`
     - *הערה לגבי tags*: רשימה מופרדת באמצעות קו אנכי (`|`), לדוגמה `הרשמה|אירועים`.
     - *הערה לגבי published ו-newsletter*: תומך בערכים `TRUE/FALSE`, `yes/no`, `1/0` או `כן/לא`.
   - **products**: `id,title,creator,category,price,currency,description,image,status,published`
     - *הערה לגבי status*: ערך מסוג `available` או `sold`.
     - *הערה לגבי price*: מספר בלבד.
3. בצעו שיתוף לרשת: **קובץ (File) ← שיתוף (Share) ← פרסם באינטרנט (Publish to web)**.
4. בחרו לפרסם כל לשונית בנפרד כקובץ **ערכים מופרדים בפסיק (CSV)** והעתיקו את הקישור שנוצר לכל אחת.
5. הזינו את הקישורים במשתני הסביבה בלוח הבקרה של Netlify.

### התנהגות במטמון (Cache)
השרת של Netlify Functions מחזיר את הנתונים עם כותרת `Cache-Control: public, max-age=60`, מה שאומר שעדכונים מגוגל שיטס ישתקפו באתר לאחר רענון, במרווח של כדקה לכל היותר.

> [!CAUTION]
> אין לפרסם מידע רגיש או פרטי בגיליונות גוגל שיטס, כיוון שקישורי ה-CSV הללו נגישים לציבור דרך הקישור הישיר.

### בדיקות לאחר פריסה (Google Sheets)
- [ ] ודאו שפרסמתם את לשונית `posts` כ-CSV והעתקתם את הקישור.
- [ ] ודאו שפרסמתם את לשונית `products` כ-CSV והעתקתם את הקישור.
- [ ] הגדירו את `POSTS_CSV_URL` במשתני הסביבה של Netlify.
- [ ] הגדירו את `PRODUCTS_CSV_URL` במשתני הסביבה של Netlify.
- [ ] פרסו את האתר ב-Netlify.
- [ ] כנסו לכתובת `/.netlify/functions/posts` בדפדפן וודאו שמוחזר פלט JSON תקין.
- [ ] כנסו לכתובת `/.netlify/functions/products` בדפדפן וודאו שמוחזר פלט JSON תקין.
- [ ] בדקו שדף הבלוג (`blog.html`) מציג את הפוסטים מהגיליון.
- [ ] בדקו שדף הפוסט הבודד (`blog-post.html?slug=...`) עובד תקין.
- [ ] בדקו שדף תצוגה מקדימה לניוזלטר (`newsletter-preview.html`) מציג רק פוסטים שסומנו כ-`newsletter = TRUE`.
- [ ] בדקו שדף החנות (`shop.html`) מציג את המוצרים מהגיליון, והסטטוס (זמין/נמכר) מוצג נכון.


