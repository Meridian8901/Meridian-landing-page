# Meridian Landing Page

Marketing landing page for **Meridian** — Africa's AI procurement platform.

## Structure

```
├── index.html          # Main landing page
├── assets/
│   ├── css/
│   │   ├── design-tokens.css   # Design system variables
│   │   └── meridian.css        # Main stylesheet
│   ├── js/
│   │   └── main.js             # Tab switcher + scroll reveal
│   └── images/                 # Static image assets
└── archive/                    # Old/compiled versions (not deployed)
```

## Running locally

Open `index.html` in a browser, or serve with Python:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.

## Dependencies

- [Lucide Icons](https://lucide.dev) — loaded via CDN
- [Google Fonts](https://fonts.google.com) — Outfit, Figtree, JetBrains Mono

## Contact

mohit@meridianprocurements.com
