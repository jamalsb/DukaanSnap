# DukaanSnap

A lightweight, mobile-friendly digital catalog builder for small shops and online sellers in Pakistan.

## Features
- Shop name, description and WhatsApp contact
- Add up to 5 products in the free demo
- Product photos, names, descriptions and PKR prices
- WhatsApp order links
- Print/save catalog as PDF using the browser print dialog
- Quick invoice generator
- English / Urdu interface toggle
- Responsive layout for mobile screens
- No backend or API key required for this demo

## Run locally
Open `index.html` in a modern browser.

## Publish on GitHub Pages or Vercel
1. Create a public GitHub repository named `DukaanSnap`.
2. Upload all files from this folder, keeping `index.html`, `styles.css`, and `app.js` in the repository root.
3. For GitHub Pages: open Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.
4. For Vercel: import the GitHub repository. No build command is needed; use the repository root as the output.

## Important limitations of this first version
- Product data is saved in the current browser using localStorage. It is not synchronized across devices and customers do not receive a shared hosted catalog database yet.
- Uploaded images are stored in browser storage. Keep photos small.
- The free demo is limited to five products.
- There is no login, online payment processing, cloud database, or paid-plan enforcement yet.
- Do not enter sensitive customer information. This is a prototype, not a production commerce platform.

## Suggested next upgrades
1. Cloud database and user accounts.
2. Public shareable shop URLs.
3. Cloud image storage.
4. Payment integrations suitable for Pakistan.
5. Subscription billing and server-side plan limits.
