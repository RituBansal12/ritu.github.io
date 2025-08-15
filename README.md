# ritu.github.io

Personal portfolio and career site built with plain HTML/CSS/JS, hosted on GitHub Pages. It features About, Blogs, Experience, and Education sections. Blog cards are rendered from a JSON manifest and link out to Medium and a GitHub repo. 

## Tech stack
* **HTML/CSS/JS only** — no build step
* **GitHub Pages** for hosting
* **Calendly badge widget** for scheduling

## Project structure
```
.
├── index.html                # Main page markup
├── css/
│   └── style.css             # Global styles, components, scrollbars
├── js/
│   ├── main.js               # Header nav, year, scroll restoration
│   └── blogs.js              # Renders blog cards from posts/posts.json
└── posts/
    └── posts.json            # Blog posts manifest (data source)
```

## Key features
* **Blogs section:** horizontal, snap-scrolling card rail that shows 3 cards on wide screens (responsive down to 1 per view).
* **Direct-to-Medium:** each card has a primary “Read on Medium” button (`sourceUrl`).
* **Optional repo button:** if `repoUrl` is present, a secondary “GitHub Repository” button is added.
* **Calendly badge:** quick scheduling via widget.

## Local development
This is a static site. For local testing (especially to avoid CORS issues with `fetch`), serve with a simple HTTP server from the project root:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Blogs system
Cards are rendered at runtime by `js/blogs.js` into the container `#blog-cards` inside the scroller `div.blogs-scroll > div.blogs-track` in `index.html`.

Data lives in `posts/posts.json` with the following shape:

```json
{
  "posts": [
    {
      "title": "...",
      "date": "YYYY-MM-DD",             // used for sorting (descending)
      "displayDate": "Mon DD, YYYY",    // optional, shown if present; falls back to `date`
      "excerpt": "Short summary ...",
      "sourceUrl": "https://medium.com/@your-handle/your-post",  // Medium URL (primary button)
      "repoUrl": "https://github.com/user/repo",                  // optional; shows a secondary repo button
      "tags": ["ML", "NLP"]
    }
  ]
}
```

### Template for adding a new blog post
Append a new object to the `posts` array in `posts/posts.json` following this template:

```json
{
  "title": "How I Built X with Y",
  "date": "2025-08-01",
  "displayDate": "Aug 1, 2025",
  "excerpt": "A quick walkthrough of the approach, trade-offs, and results.",
  "sourceUrl": "https://medium.com/@ritu-bansal12/how-i-built-x-with-y-abcdef",
  "repoUrl": "https://github.com/RituBansal12/project-repo",  
  "tags": ["Machine Learning", "NLP", "Python"]
}
```

After committing `posts/posts.json`, refresh the page. If you don’t see changes immediately, hard refresh or bump the cache-busting query in `index.html` for `blogs.js` (e.g., `?v=more-chip-1` → `?v=more-chip-2`).


## Accessibility and performance
* External links include `rel="noopener"`.
* Images use `loading="lazy"` and `decoding="async"`.
* Reduced DOM work by building cards in a `DocumentFragment` before attaching.

## Scheduling
Email UI was removed; a Calendly badge is used instead. Configured in `index.html` near the footer:

```html
<script type="text/javascript">
  window.onload = function() {
    Calendly.initBadgeWidget({
      url: 'https://calendly.com/ritu-bansalrb00/30min',
      text: "Let's chat!",
      color: '#0069ff',
      textColor: '#ffffff',
      branding: true
    });
  }
</script>
```

## Conventions
* Keep styles in `css/style.css` and scripts in `js/`.
* Prefer semantic HTML and accessible labels.
* Keep post data out of HTML; use `posts/posts.json` as the single source of truth.

---