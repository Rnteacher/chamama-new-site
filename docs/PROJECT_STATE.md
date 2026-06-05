# Project State — Tichon HaChamama Static Site

This document outlines the current state and structure of the Tichon HaChamama static website.

## General Information

* **Project Type:** Temporary static website for Tichon HaChamama.
* **Language & Layout:** Hebrew-first, right-to-left (RTL).
* **Technology Stack:** Static HTML/CSS/JS (vanilla CSS, native JS), and a split-screen React SPA for the home page.
* **Build Process:** None. The site is a collection of static files.
* **Deployment Target:** Netlify (Publish directory: `.`, no build command required).
* **Backend:** None.
* **Database:** None.
* **Authentication:** None.

## Forms Integration
The site uses **Netlify Forms** for existing interactive forms. Forms are defined in static HTML and processed automatically by Netlify upon deployment.
* Form names:
  * `open-day` (on `index.html` React application)
  * `contact` (on `join.html` static HTML page)
  * `product-order` (on `shop.html` static HTML page)
  * `newsletter-signup` (on `blog.html` static HTML page)

## Newsletter Flow
A basic manual newsletter system is configured:
1. **Signup**: Subscribers are collected through the `newsletter-signup` Netlify form on `blog.html`. Fields collected are: `name`, `email`, `consent`, and `source` (to track where they signed up).
2. **Builder**: Staff can navigate to the internal utility page `newsletter-preview.html` (which is configured with `noindex,nofollow` to prevent search engine indexing) to compose newsletters. The builder loads all published posts marked with `newsletter === true`, offers filters (type, start date, end date), custom title, and custom intro text.
3. **Copy/Paste**: Clicking **העתק ניוזלטר** copies a richly formatted HTML text (with inline styles) to the clipboard, allowing staff to paste it directly into their email client (Gmail, Outlook) to send manually. Email sending is currently a manual copy-paste process.
4. **Future Integrations**: 
   - No external ESP (Email Service Provider) such as Brevo or Mailchimp is connected yet.
   - For automation, a Netlify Form Webhook can be configured to trigger on form submission and forward data to a Brevo or Mailchimp API.

## Contact Information
* **Phone:** 09-7884549
* **Email:** [info@chamama.org](mailto:info@chamama.org)

## Recent Updates (June 2026)

We have added dynamic-like Blog and Shop features reading from local JSON files, and fully integrated dynamic, saved newsletter issues using Google Sheets.

### Files Created
* `data/posts.json` — Local JSON-based post/event database.
* `data/products.json` — Local JSON-based product database.
* `data/newsletters.json` — Local JSON-based newsletters database.
* `newsletter.html` — Public standalone newsletter viewer page supporting multiple templates and print optimization.
* `netlify/functions/newsletters.js` — Netlify Function fetching and normalizing newsletters from Google Sheets.
* `blog-shop.css` — Custom stylesheet for the new pages and overlays.
* `blog.html` — Main school blog displaying published posts.
* `blog-post.html` — Dynamic single-post page fetching content by slug.
* `shop.html` — Product catalog showing items and integrating a custom ordering modal.

### Files Modified
* `newsletter.html` — Redesigned the public newsletter page: four polished, distinct templates, public copy actions removed, single print/Save-as-PDF button moved to the bottom, and improved print CSS.
* `newsletter-preview.html` — Refactored from a preview utility to an internal staff builder tool to generate sheet rows and test links; template selector now uses the new Hebrew template names.
* `about.html`, `learning.html`, `projects.html`, `parents.html`, `team.html`, `join.html` — Added Blog and Shop links to both header and footer navigation.
* `app.jsx` — Updated React homepage main navigation array configuration.
* `README.md` — Updated project structure, newsletters workflow, forms documentation, and deploy checklist.

### Forms Added
* `product-order` — Form on `shop.html` matching Netlify Form expectations, collecting `product_id`, `product_title`, `name`, `phone`, `email`, and `message`.

### Current Architecture Status
- **Google Sheets Integration**: Google Sheets is the primary, lightweight content source for the Blog, Shop, and Newsletters, integrated via dependency-free Netlify Functions.
- **Local Fallback**: Local JSON files (`data/posts.json`, `data/products.json`, and `data/newsletters.json`) remain in the repository and act as an automatic fallback if the Netlify Functions fetch fails or when developing locally without Netlify CLI.
- **Netlify Functions**:
  - `posts` (`netlify/functions/posts.js`) - Fetches and parses posts CSV from `POSTS_CSV_URL`.
  - `products` (`netlify/functions/products.js`) - Fetches and parses products CSV from `PRODUCTS_CSV_URL`.
  - `newsletters` (`netlify/functions/newsletters.js`) - Fetches and parses newsletters CSV from `NEWSLETTERS_CSV_URL`.
  - `_csv` (`netlify/functions/_csv.js`) - Shared utility module containing a robust, custom CSV parser.
- **Required Environment Variables**:
  - `POSTS_CSV_URL` - CSV link to the published Google Sheets `posts` tab.
  - `PRODUCTS_CSV_URL` - CSV link to the published Google Sheets `products` tab.
  - `NEWSLETTERS_CSV_URL` - CSV link to the published Google Sheets `newsletters` tab.
- **Saved Newsletters & Templates**:
  - Stable URLs: Newsletters are loaded via `newsletter.html?id=[id]` (URL format unchanged).
  - The public `newsletter.html` is presented as a polished, RTL-first digital magazine/newsletter page (not a utility page). All content is escaped via `escapeHTML()` / `safeURL()` so Google Sheets content can never inject raw HTML, and missing/broken images degrade gracefully to a text-only layout instead of broken-image icons.
  - Four redesigned templates, each with a distinct visual identity. Data keys are unchanged for backward compatibility:
    - `classic` → **editorial** (קלאסי־מערכתי): calm education magazine — serif headline, editor's-note pull-quote intro, article rows with alternating images and dividers.
    - `magazine` → **magazine** (מגזיני): visual digital issue — hero feature with overlay headline + editorial card grid; gracefully falls back when only one post exists.
    - `poster` → **chamama/zine** (חממתי): warm CSS-only "paper" zine — bold blocks, section numbers, stickers/tags, hard offset shadows in green/cream/ink + neon.
    - `compact` → **print edition** (גרסת הדפסה): A4-like single column, compact readable type, controlled image sizes, clean page breaks, minimal decoration.
  - Print optimization: `@media print` hides the back-link and the print button, prints only the newsletter content, uses `break-inside/page-break-inside: avoid` and `print-color-adjust: exact`, keeps titles attached to bodies and footer logos intact, sets page margins, and prevents image overflow. The `compact` template is tuned to print best, but all four print decently (including black/white).
  - Public actions: The public page no longer offers "copy link" or "copy email text". It keeps only a **הדפסה / שמירה כ־PDF** button, placed at the **bottom** of the content (after the posts, before the footer); the button calls `window.print()` and is hidden in print view.
  - Email sending: Done manually — staff write a short message in their mail client and include the newsletter URL (`newsletter.html?id=[id]`). Server-side PDF generation is **not** implemented; saving as PDF relies on the browser's built-in print/save dialog.
  - Staff builder: `newsletter-preview.html` still offers template selection, now labeled in Hebrew (קלאסי־מערכתי / מגזיני / חממתי / גרסת הדפסה) while writing the unchanged data keys.
- **Preserved Constraints**: No database, authentication layer, build step, CMS, or heavy frameworks (such as Next.js or Vite) were added. The site remains a collection of static HTML/CSS/JS files deployable directly to Netlify from the root directory.
- **Forms**: Product orders continue to be handled through Netlify Forms (`product-order`) via POST requests (gracefully simulated as successful in local environments).



