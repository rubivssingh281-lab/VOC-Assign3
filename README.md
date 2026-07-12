# VaultofCodes Internships – Interactive Internship Listing

A modern, fully responsive internship listing page built for VaultofCodes. It displays available internships with rich interactivity: real‑time filtering, search, smooth 3D card tilt, parallax banners, and a live count badge – all wrapped in a sleek dark theme.

## 🌟 Features

* **Live Filtering** – Filter internships by provider, fee, mode, duration, and sector. Updates instantly.
* **Live Search** – Type to filter by internship title.
* **3D Card Tilt** – Cards tilt toward your mouse with a smooth, spring‑back effect.
* **Parallax Banner** – The card’s background image shifts subtly as you move the mouse.
* **Glare Overlay** – A soft light reflection follows your cursor over each card.
* **Scroll‑Triggered Reveal** – Cards animate into view as you scroll.
* **Live Count Badge** – Shows the number of matching internships, with a pulse animation on update.
* **Accessible** – Full keyboard support, screen‑reader announcements, and respects `prefers-reduced-motion`.
* **Pure‑CSS Filter Toggles** – Filter groups use `<details>` elements for native accordion behaviour (no JS needed for open/close).
* **Responsive** – Works seamlessly on desktop, tablet, and mobile.

---

## 🛠️ Technologies Used

* **HTML5** – Semantic structure.
* **CSS3** – Flexbox, Grid, custom properties, keyframe animations, backdrop filters, and advanced pseudo‑classes.
* **JavaScript (ES6)** – Minimal, modular JS for:
    * Filtering logic (multi‑group AND/OR)
    * Search functionality
    * Live count updates
    * Intersection Observer for scroll reveals
    * Card tilt and parallax (with `requestAnimationFrame` for smoothness)
    * Custom cursor and ambient glow
    * Accessibility enhancements (live regions)
* **Font Awesome 6** – Icons.
* **Google Fonts** – Inter, JetBrains Mono.

---

## 🚀 Getting Started

**1. Clone or download the project**
```bash
git clone [https://github.com/your-username/vaultofcodes-internships.git](https://github.com/your-username/vaultofcodes-internships.git)
cd vaultofcodes-internships
```

2. Open the fileSimply open index.html in your browser – everything is self‑contained (no build tools required).3. (Optional) Add your own imagesReplace the image URLs in the internships array inside the <script> tag with your own course images.📝 How It WorksDataAll internship data is stored in a JavaScript array:JavaScriptconst internships = [
  {
    title: "...",
    provider: "VaultofCodes",
    sector: "IT-ITeS",
    fee: "free",
    mode: "virtual",
    duration: ["1m", "2m"],
    desc: "...",
    link: "...",
    image: "..."
  }
];
FilteringEach filter group (e.g., fee) is a set of <input type="radio"> or <input type="checkbox"> elements.When a user changes a filter, a change event triggers applyFilters().The function checks each card against all selected criteria (AND logic) and shows/hides accordingly.The count badge updates and an ARIA live region announces the new count.SearchThe search input performs a case‑insensitive match against the card’s data-title attribute.Debounced for performance (200ms delay).3D Tilt & ParallaxOn desktop, a mousemove listener calculates the cursor position relative to each card.The card’s transform is updated with rotateX, rotateY, translateY, and scale – all smoothly interpolated using requestAnimationFrame.The banner’s background-position shifts in the opposite direction for a layered depth effect.AccessibilityAll interactive elements are keyboard accessible (native button, input, a).Filter headers use aria-expanded to indicate open/closed state.Results count is announced via aria-live="polite".prefers-reduced-motion disables all non‑essential animations.❓ Why JavaScript Is NecessaryWe often get asked: “Can this work with CSS only?”While CSS is incredibly powerful for styling and simple interactions, the following features require JavaScript – and here’s why:FeatureWhy JS is essentialMulti‑group AND filteringCSS can only style elements based on a single state (e.g., :checked). It cannot combine multiple unrelated inputs to show/hide cards unless you write hundreds of combinators – which is impractical and impossible to maintain dynamically.Search (text input)CSS has no way to read what a user types and compare it against element content. Even :has() only works with selectors, not arbitrary string matching.Live count badgeCounting visible elements dynamically requires querying the DOM after filtering – something CSS cannot do.Real‑time updatesReacting to user input (keyboard, mouse, touch) in a stateful manner is the domain of imperative programming.Debouncing & performanceControlling how often expensive operations run (e.g., filtering on every keystroke) needs a timer – purely CSS cannot delay or throttle actions.Screen‑reader announcementsUpdating ARIA live regions with dynamic content requires scripting.Intersection Observer for scroll revealsWhile CSS has scroll-timeline (experimental), it’s not yet widely supported and lacks the fine‑grained control of the Intersection Observer API.3D tilt with mouse followingThe tilt angle depends on the mouse position relative to each card – this requires real‑time arithmetic and DOM updates, which CSS alone cannot perform.In short: CSS is for presentation; JavaScript is for behaviour. We use JS only where needed (filtering, search, interactivity), and keep all visual polish (animations, transitions, hover effects) in CSS – following the principle of progressive enhancement.🧪 Browser SupportChrome 90+Edge 90+Firefox 88+Safari 15+Works on all modern desktop and mobile browsers.📁 Project StructurePlaintextvaultofcodes-internships/
├── index.html          # Single HTML file (all CSS + JS embedded)
├── README.md           # This file
└── assets/             # (optional) – images, videos
🔮 Future EnhancementsPagination – Load more internships on demand.Saved filters – Persist selections in localStorage.Dark/Light mode toggle – Already prepared with CSS custom properties.Video previews on hover – Currently off, but ready to be enabled.Backend integration – Fetch internships from a JSON API.🙌 CreditsDesigned and developed by [Your Name]Icons by Font AwesomeFonts by Google Fonts📄 LicenseMIT – feel free to use, modify, and distribute for any purpose.Built with ❤️ for the VaultofCodes community.
