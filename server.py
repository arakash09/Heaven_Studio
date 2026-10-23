"""Small Python API for Heaven Studio's live social feed.

YouTube is read from its public channel Atom feed. Facebook requires a valid
Meta Graph API page access token and page ID in environment variables.
"""
from __future__ import annotations
import json
import os
import time
import urllib.parse
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
HOST = os.getenv("HOST", "127.0.0.1")
PORT = int(os.getenv("PORT", "8000"))
YT_CHANNEL_ID = os.getenv("YOUTUBE_CHANNEL_ID", "UCpnU9f5UwOw8Jfa9iEKlqBQ")
FB_PAGE_ID = os.getenv("FACEBOOK_PAGE_ID", "")
FB_PAGE_ACCESS_TOKEN = os.getenv("FACEBOOK_PAGE_ACCESS_TOKEN", "")
CACHE_SECONDS = 600
_cache = {"at": 0, "payload": None}

ATOM = "http://www.w3.org/2005/Atom"
YT = "http://www.youtube.com/xml/schemas/2015"
MEDIA = "http://search.yahoo.com/mrss/"


def fetch_url(url: str, timeout: int = 12) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "HeavenStudioWebsite/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read()


def latest_youtube() -> list[dict]:
    url = "https://www.youtube.com/feeds/videos.xml?channel_id=" + urllib.parse.quote(YT_CHANNEL_ID)
    root = ET.fromstring(fetch_url(url))
    videos = []
    for entry in root.findall(f"{{{ATOM}}}entry")[:3]:
        def child_text(namespace: str, name: str) -> str:
            node = entry.find(f"{{{namespace}}}{name}")
            return (node.text or "").strip() if node is not None else ""
        vid = child_text(YT, "videoId")
        title = child_text(ATOM, "title")
        published = child_text(ATOM, "published")
        if vid:
            videos.append({"id": vid, "title": title, "date": published,
                           "url": f"https://www.youtube.com/watch?v={vid}", "views": None})
    return videos


def latest_facebook() -> list[dict]:
    if not FB_PAGE_ID or not FB_PAGE_ACCESS_TOKEN:
        return []
    fields = "id,message,created_time,full_picture,permalink_url,attachments{media,type,url},likes.summary(true),comments.summary(true)"
    params = urllib.parse.urlencode({"fields": fields, "limit": 3, "access_token": FB_PAGE_ACCESS_TOKEN})
    url = f"https://graph.facebook.com/v21.0/{urllib.parse.quote(FB_PAGE_ID)}/posts?{params}"
    data = json.loads(fetch_url(url).decode("utf-8"))
    posts = []
    for item in data.get("data", [])[:3]:
        attachments = item.get("attachments", {}).get("data", [])
        first = attachments[0] if attachments else {}
        media = first.get("media", {}) if isinstance(first.get("media"), dict) else {}
        posts.append({
            "id": item.get("id", ""),
            "title": (item.get("message") or "Heaven Studio update").splitlines()[0][:120],
            "message": item.get("message", ""),
            "date": item.get("created_time", ""),
            "image": item.get("full_picture") or media.get("image", {}).get("src") or "",
            "url": item.get("permalink_url", "https://www.facebook.com/heavenarchitectsstudio"),
            "likes": str(item.get("likes", {}).get("summary", {}).get("total_count", "—")),
            "comments": str(item.get("comments", {}).get("summary", {}).get("total_count", "—")),
        })
    return posts


def get_payload(force: bool = False) -> dict:
    now = time.time()
    if not force and _cache["payload"] is not None and now - _cache["at"] < CACHE_SECONDS:
        return _cache["payload"]
    try:
        youtube = latest_youtube()
    except Exception as exc:
        print(f"YouTube feed error: {exc}")
        youtube = []
    try:
        facebook = latest_facebook()
    except Exception as exc:
        print(f"Facebook Graph API error: {exc}")
        facebook = []
    payload = {"youtube": youtube, "facebook": facebook,
               "facebook_live": bool(FB_PAGE_ID and FB_PAGE_ACCESS_TOKEN and facebook),
               "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
               "facebook_configured": bool(FB_PAGE_ID and FB_PAGE_ACCESS_TOKEN)}
    _cache.update(at=now, payload=payload)
    return payload


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        if self.path.split("?", 1)[0] == "/api/social-feed":
            force = "refresh=1" in self.path
            body = json.dumps(get_payload(force), ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        return super().do_GET()

    def log_message(self, fmt, *args):
        print("[%s] %s" % (self.log_date_time_string(), fmt % args))


if __name__ == "__main__":
    print(f"Heaven Studio site: http://{HOST}:{PORT}")
    print("Facebook live feed: " + ("configured" if FB_PAGE_ID and FB_PAGE_ACCESS_TOKEN else "not configured (see README.md)"))
    ThreadingHTTPServer((HOST, PORT), Handler).serve_forever()
