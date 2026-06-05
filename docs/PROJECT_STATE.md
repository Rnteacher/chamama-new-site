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
- Frontend fetches content dynamically from `data/posts.json` and `data/products.json` on client load.
- No database, build process, or CMS dependencies have been added, retaining a 100% static HTML/CSS/JS architecture.
- Future Google Sheets integration can be implemented by pointing fetches to Netlify Functions or custom API endpoints without changing layout code.
- Shop orders are routed through Netlify Forms (gracefully simulated in local testing).

