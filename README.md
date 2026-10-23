# Heaven Studio website (separated files)

## Files
- `index.html` — page shell, font/Tailwind setup, React/Babel/Three.js CDN links.
- `style.css` — original custom styling plus architectural 3D/background and button-glow refinements.
- `script.js` — original React site, with the Three.js hero background, improved animated CTAs, larger brand lockup, and API-powered social feed.
- `server.py` — tiny Python HTTP server and `/api/social-feed` API.

## Run locally
Install Python 3.10+; no third-party Python package is needed.

```bash
python server.py
```
Then open `http://127.0.0.1:8000` (do not open `index.html` as a `file://` URL, because the live feed uses `/api/social-feed`).

The YouTube feed is read from the public YouTube channel Atom feed and refreshed by the browser every 15 minutes. The API caches upstream responses for 10 minutes.

## Facebook live feed setup
Facebook does not provide reliable unauthenticated access to a Page's latest posts. To show actual latest posts, create/configure a Meta app with appropriate Page permissions and a Page access token. Copy `.env.example` to `.env` and set `FACEBOOK_PAGE_ID` and `FACEBOOK_PAGE_ACCESS_TOKEN`, then load those values into the process environment before running the server. Example in a shell:

```bash
export FACEBOOK_PAGE_ID="YOUR_PAGE_ID"
export FACEBOOK_PAGE_ACCESS_TOKEN="YOUR_PAGE_ACCESS_TOKEN"
python server.py
```

Never put the token in `script.js`, `index.html`, or any client-side code. The server endpoint returns the latest three posts when the credentials are valid. If Facebook credentials are missing, the UI keeps the supplied sample cards as a preview and the status indicates that live Facebook setup is needed. The token's exact permissions and review requirements depend on Meta's current app configuration.

## Deployment note
This project needs a Python-capable host for the `/api/social-feed` endpoint. Static-only hosting (for example, a plain GitHub Pages site) cannot run `server.py`; deploy the frontend and API together on a Python-capable service or adapt the endpoint to a serverless function. Keep secrets in your host's environment variables.

## Existing local assets
Keep `logo.jpg`, `Akash.jpg`, and the `public/images/` directory (if available) alongside the paths referenced by the original site. Fallback artwork/images are already provided by the page where applicable.
