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

## Contact Information
* **Phone:** 09-7884549
* **Email:** [info@chamama.org](mailto:info@chamama.org)

## Recent Updates (June 2026)

We have added dynamic-like Blog and Shop features reading from local JSON files to serve as a bridge for future CMS/Google Sheets integration.

### Files Created
* `data/posts.json` — Local JSON-based post/event database.
* `data/products.json` — Local JSON-based product database.
* `blog-shop.css` — Custom stylesheet for the new pages and overlays.
* `blog.html` — Main school blog displaying published posts.
* `blog-post.html` — Dynamic single-post page fetching content by slug.
* `newsletter-preview.html` — Admin utility page to draft, preview, and copy newsletter content.
* `shop.html` — Product catalog showing items and integrating a custom ordering modal.

### Files Modified
* `about.html`, `learning.html`, `projects.html`, `parents.html`, `team.html`, `join.html` — Added Blog and Shop links to both header and footer navigation.
* `app.jsx` — Updated React homepage main navigation array configuration.
* `README.md` — Updated project structure, forms documentation, and deploy checklist.

### Forms Added
* `product-order` — Form on `shop.html` matching Netlify Form expectations, collecting `product_id`, `product_title`, `name`, `phone`, `email`, and `message`.

### Current Architecture Status
- **Google Sheets Integration**: Google Sheets is now the primary, lightweight content source for the Blog and Shop, integrated via dependency-free Netlify Functions.
- **Local Fallback**: Local JSON files (`data/posts.json` and `data/products.json`) remain in the repository and act as an automatic fallback if the Netlify Functions fetch fails or when developing locally without Netlify CLI.
- **Netlify Functions**:
  - `posts` (`netlify/functions/posts.js`) - Fetches and parses posts CSV from `POSTS_CSV_URL`.
  - `products` (`netlify/functions/products.js`) - Fetches and parses products CSV from `PRODUCTS_CSV_URL`.
  - `_csv` (`netlify/functions/_csv.js`) - Shared utility module containing a robust, custom CSV parser.
- **Required Environment Variables**:
  - `POSTS_CSV_URL` - CSV link to the published Google Sheets `posts` tab.
  - `PRODUCTS_CSV_URL` - CSV link to the published Google Sheets `products` tab.
- **Preserved Constraints**: No database, authentication layer, build step, CMS, or heavy frameworks (such as Next.js or Vite) were added. The site remains a collection of static HTML/CSS/JS files deployable directly to Netlify from the root directory.
- **Forms**: Product orders continue to be handled through Netlify Forms (`product-order`) via POST requests (gracefully simulated as successful in local environments).


