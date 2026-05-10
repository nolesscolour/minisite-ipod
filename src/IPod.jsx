import { useState, useRef, useEffect } from "react";
import "./IPod.css";

const ALBUMS = [
  {
    id: 1, artist: "Frank Ocean", title: "Blonde", year: 2016,
    art: "https://coverartarchive.org/release/b27560ea-f2b2-4c03-a8d1-24d4f8b0d3b1/front-250",
    tracks: [
      { id: 1,  title: "Nikes",        duration: 199 },
      { id: 2,  title: "Ivy",          duration: 252 },
      { id: 3,  title: "Pink + White", duration: 214 },
      { id: 4,  title: "Be Yourself",  duration: 111 },
      { id: 5,  title: "Solo",         duration: 258 },
    ],
  },
  {
    id: 2, artist: "Sade", title: "The Best of Sade", year: 1994,
    art: "https://i.scdn.co/image/ab67616d0000b273a3dc8301e273a4e35a0a0609",
    tracks: [
      { id: 6,  title: "No Ordinary Love",  duration: 404 },
      { id: 7,  title: "Is It a Crime",     duration: 390 },
      { id: 8,  title: "Smooth Operator",   duration: 282 },
      { id: 9,  title: "Your Love Is King", duration: 225 },
    ],
  },
  {
    id: 3, artist: "Gorillaz", title: "Demon Days", year: 2005,
    art: "https://coverartarchive.org/release/c5814e2a-02f3-4248-b056-a96f4fc0e5e6/front-250",
    tracks: [
      { id: 10, title: "Feel Good Inc.", duration: 221 },
      { id: 11, title: "DARE",           duration: 237 },
      { id: 12, title: "Dirty Harry",    duration: 300 },
      { id: 13, title: "El Mañana",      duration: 224 },
    ],
  },
  {
    id: 4, artist: "Daft Punk", title: "Discovery", year: 2001,
    art: "https://upload.wikimedia.org/wikipedia/en/2/27/Daft_Punk_-_Discovery.png",
    tracks: [
      { id: 14, title: "One More Time",                 duration: 320 },
      { id: 15, title: "Digital Love",                  duration: 301 },
      { id: 16, title: "Harder Better Faster Stronger", duration: 226 },
      { id: 17, title: "Voyager",                       duration: 228 },
    ],
  },
  {
    id: 5, artist: "Amy Winehouse", title: "Back to Black", year: 2006,
    art: "https://coverartarchive.org/release/2d9f7e19-1cd1-4224-9b4a-2d3fffb8ae54/front-250",
    tracks: [
      { id: 18, title: "Rehab",                  duration: 213 },
      { id: 19, title: "You Know I'm No Good",   duration: 255 },
      { id: 20, title: "Back to Black",          duration: 242 },
      { id: 21, title: "Tears Dry on Their Own", duration: 186 },
    ],
  },
];

const ALL_TRACKS = ALBUMS.flatMap((album) =>
  album.tracks.map((t) => ({
    id: t.id, title: t.title, duration: t.duration,
    artist: album.artist, album: album.title, art: album.art,
  }))
);

const MAIN_MENU = [
  { id: "nowPlaying", label: "Now Playing", hasArrow: false },
  { id: "music",      label: "Music",       hasArrow: true  },
  { id: "photos",     label: "Photos",      hasArrow: true  },
  { id: "camera",     label: "Camera",      hasArrow: false },
  { id: "games",      label: "Games",       hasArrow: true  },
  { id: "clock",      label: "Clock",       hasArrow: false },
  { id: "notes",      label: "Notes",       hasArrow: true  },
  { id: "links",      label: "Links",       hasArrow: false, hasLock: true },
  { id: "about",      label: "About",       hasArrow: false },
];

const NOTES_MENU = [
  { id: "experiences",        label: "Experiences",          hasArrow: false },
  { id: "blogs",              label: "Blogs",                hasArrow: true  },
  { id: "musicRecommendations", label: "Music Recommendations", hasArrow: false },
];

// ─── EDIT: BLOGS LIST ─────────────────────────────────────────────
// Add or edit blog entries here. Each needs: id, title, year, content.
const BLOGS_DATA = [
  {
    id: "blog1",
    title: "On Building Things That Feel Alive",
    year: "2024",
    // ─── EDIT: BLOG 1 CONTENT ──────────────────────────────────────
    content: `This is a placeholder for your first blog post.\n\nReplace this text with your actual content.\n\nYou can use line breaks by leaving a blank line between paragraphs.`,
  },
  {
    id: "blog2",
    title: "Why I Stopped Using Frameworks for Fun Projects",
    year: "2023",
    // ─── EDIT: BLOG 2 CONTENT ──────────────────────────────────────
    content: `This is a placeholder for your second blog post.\n\nReplace this text with your actual content.`,
  },
  {
    id: "blog3",
    title: "Notes on Creative Consistency",
    year: "2023",
    // ─── EDIT: BLOG 3 CONTENT ──────────────────────────────────────
    content: `This is a placeholder for your third blog post.\n\nReplace this text with your actual content.`,
  },
];
const MUSIC_MENU = [
  { id: "coverFlow", label: "Cover Flow", hasArrow: false },
  { id: "songs",     label: "Songs",      hasArrow: true  },
];
const GAMES_MENU = [
  { id: "snake", label: "Snake", hasArrow: false },
];
const EXTRAS_MENU = [];

const MUSIC_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <path d="M18 8 L18 30 Q18 34 14 34 Q10 34 10 30 Q10 26 14 26 Q16 26 18 28 L18 14 L34 10 L34 28 Q34 32 30 32 Q26 32 26 28 Q26 24 30 24 Q32 24 34 26 L34 10 Z" fill="rgba(255,255,255,0.7)" />
  </svg>
);
const PHOTO_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="4" y="10" width="36" height="24" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <circle cx="22" cy="22" r="7" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <circle cx="22" cy="22" r="2.5" fill="rgba(255,255,255,0.7)"/>
    <circle cx="34" cy="14" r="1.8" fill="rgba(255,255,255,0.7)"/>
  </svg>
);
const CAMERA_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="4" y="13" width="36" height="22" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <path d="M15 13 L18 8 L26 8 L29 13" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <circle cx="22" cy="24" r="6" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <circle cx="22" cy="24" r="2.5" fill="rgba(255,255,255,0.7)"/>
  </svg>
);
const GAMES_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="6" y="14" width="32" height="18" rx="9" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <line x1="14" y1="23" x2="20" y2="23" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="17" y1="20" x2="17" y2="26" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="28" cy="20" r="2" fill="rgba(255,255,255,0.7)"/>
    <circle cx="32" cy="25" r="2" fill="rgba(255,255,255,0.7)"/>
  </svg>
);
const CLOCK_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="16" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <line x1="22" y1="11" x2="22" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="22" y1="22" x2="29" y2="26" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="22" cy="22" r="1.8" fill="rgba(255,255,255,0.7)"/>
  </svg>
);
const ABOUT_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="16" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <line x1="22" y1="20" x2="22" y2="31" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="22" cy="14" r="2.2" fill="rgba(255,255,255,0.7)"/>
  </svg>
);
const PLAY_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <polygon points="14,10 36,22 14,34" fill="rgba(255,255,255,0.7)"/>
    <rect x="6" y="10" width="5" height="24" rx="2" fill="rgba(255,255,255,0.7)"/>
  </svg>
);

const NOTES_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="8" y="6" width="28" height="32" rx="3" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <line x1="14" y1="15" x2="30" y2="15" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="22" x2="30" y2="22" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
    <line x1="14" y1="29" x2="22" y2="29" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const LINKS_ICON = (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <rect x="14" y="20" width="16" height="14" rx="2" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none"/>
    <path d="M17 20v-5a5 5 0 0 1 10 0v5" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <circle cx="22" cy="27" r="2" fill="rgba(255,255,255,0.7)"/>
  </svg>
);

const CONTEXT_MAP = {
  music:      { icon: MUSIC_ICON,  label: "Music Library"  },
  photos:     { icon: PHOTO_ICON,  label: "Photo Library"  },
  camera:     { icon: CAMERA_ICON, label: "Take Photos"    },
  games:      { icon: GAMES_ICON,  label: "Games"          },
  clock:      { icon: CLOCK_ICON,  label: "World Clock"    },
  about:      { icon: ABOUT_ICON,  label: "About"          },
  nowPlaying: { icon: PLAY_ICON,   label: "Now Playing"    },
  notes:      { icon: NOTES_ICON,  label: "Notes"          },
  links:      { icon: LINKS_ICON,  label: "Links"          },
};

function fmt(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

// ─── AUDIO ─────────────────────────────────────────────────────────
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; }
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTick() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.025);
  if (navigator.vibrate) navigator.vibrate(1);
}

function playClick() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06);
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.08);
}

function playUnlock() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const osc = ctx.createOscillator(); const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.type = "sine";
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.18);
}

// ─── LOCK SCREEN ───────────────────────────────────────────────────
function LockScreen({ onUnlock }) {
  const canvasRef = useRef(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width; const H = canvas.height;
    const COLS = 28; const ROWS = 20;
    const cw = W / COLS; const ch = H / ROWS;
    let frame = 0; let running = true;
    const draw = () => {
      if (!running) return;
      ctx.fillStyle = "#030d1a"; ctx.fillRect(0, 0, W, H);
      for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
          const wave = Math.sin(i * 0.45 + j * 0.35 + frame * 0.025) *
                       Math.cos(i * 0.2 - j * 0.28 + frame * 0.018);
          const b = (wave + 1) / 2;
          const radius = 0.7 + b * 1.4;
          ctx.beginPath();
          ctx.arc(i * cw + cw / 2, j * ch + ch / 2, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${Math.floor(b*40)},${Math.floor(b*140)},${Math.floor(180+b*75)},${0.1+b*0.75})`;
          ctx.fill();
        }
      }
      frame++;
    };
    const id = setInterval(draw, 33);
    return () => { running = false; clearInterval(id); };
  }, []);

  return (
    <div className="lock-screen">
      <canvas ref={canvasRef} className="lock-canvas" width={320} height={220} />
      <div className="lock-content">
        <div className="lock-time">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="lock-date">
          {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
        </div>
        <div className="lock-hint">click wheel to unlock</div>
      </div>
    </div>
  );
}

// ─── MARQUEE ───────────────────────────────────────────────────────
function Marquee({ text, className }) {
  const ref = useRef(null);
  const [overflow, setOverflow] = useState(false);
  useEffect(() => {
    if (ref.current) {
      setOverflow(ref.current.scrollWidth > ref.current.parentElement.offsetWidth + 2);
    }
  }, [text]);
  if (!overflow) {
    return <span ref={ref} className={className} style={{ whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", display:"block" }}>{text}</span>;
  }
  return (
    <div className="marquee-wrap">
      <span className="marquee-text">{text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}</span>
    </div>
  );
}

// ─── HEADER ────────────────────────────────────────────────────────
function Header({ title, onBack, isRoot, isPlaying }) {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 10000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="ipod-header">
      <div className="hdr-left">
        {!isRoot && <button className="back-btn" onClick={onBack}>‹</button>}
        <span className="header-title-left">{title}</span>
      </div>
      <span className="hdr-clock">{time}</span>
      <div className="header-right">
        {isPlaying && (
          <svg width="7" height="8" viewBox="0 0 7 8">
            <polygon points="0,0 7,4 0,8" fill="#333"/>
          </svg>
        )}
        <div className="hdr-battery"><div className="battery-fill" /></div>
      </div>
    </div>
  );
}

// ─── CONTEXT PANEL ─────────────────────────────────────────────────
function ContextPanel({ itemId, nowPlayingArt, screenId, albumId }) {
  if (screenId === "albumTracks") {
    const alb = ALBUMS.find(a => a.id === albumId);
    if (alb) return (
      <div className="context-panel">
        <img src={alb.art} alt="" className="context-art" onError={e => { e.target.style.display="none"; }} />
        <div className="context-label">{alb.artist}</div>
      </div>
    );
  }
  if (screenId === "albums" && typeof itemId === "number") {
    const alb = ALBUMS.find(a => a.id === itemId);
    if (alb) return (
      <div className="context-panel">
        <img src={alb.art} alt="" className="context-art" onError={e => { e.target.style.display="none"; }} />
        <div className="context-label">{alb.artist}</div>
      </div>
    );
  }
  if (itemId === "nowPlaying" && nowPlayingArt) return (
    <div className="context-panel">
      <img src={nowPlayingArt} alt="" className="context-art" onError={e => { e.target.style.display="none"; }} />
    </div>
  );
  const c = CONTEXT_MAP[itemId];
  if (!c) return (
    <div className="context-panel">
      <div className="context-icon">{MUSIC_ICON}</div>
    </div>
  );
  return (
    <div className="context-panel">
      <div className="context-icon">{c.icon}</div>
      <div className="context-label">{c.label}</div>
    </div>
  );
}

// ─── LIST SCREEN ───────────────────────────────────────────────────
function ListScreen({ title, items, selectedIndex, onBack, isRoot, isPlaying, nowPlayingArt, screenId, albumId }) {
  const listRef = useRef(null);
  useEffect(() => {
    if (!listRef.current) return;
    const rows = listRef.current.children;
    if (rows[selectedIndex]) rows[selectedIndex].scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedIndex]);
  const highlighted = items[selectedIndex];
  const highlightedId = highlighted ? highlighted.id : null;
  return (
    <div className="screen-inner">
      <Header title={title} onBack={onBack} isRoot={isRoot} isPlaying={isPlaying} />
      <div className="list-wrap">
        <div className="list-scroll" ref={listRef}>
          {items.map((item, i) => (
            <div key={item.id || i} className={`list-row${i === selectedIndex ? " selected" : ""}`}>
              {i === selectedIndex
                ? <Marquee text={item.label} className="list-row-label" />
                : <span className="list-row-label">{item.label}</span>
              }
              {item.hasArrow && <span className="row-arrow">›</span>}
              {item.hasLock && (
                <svg width="8" height="10" viewBox="0 0 8 10" fill="none" style={{ flexShrink:0, opacity: i === selectedIndex ? 0.7 : 0.35 }}>
                  <rect x="1" y="4" width="6" height="5.5" rx="1" fill="currentColor"/>
                  <path d="M2.5 4V3a1.5 1.5 0 0 1 3 0v1" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
        <ContextPanel
          itemId={highlightedId}
          nowPlayingArt={nowPlayingArt}
          screenId={screenId}
          albumId={albumId}
        />
      </div>
    </div>
  );
}

// ─── NOW PLAYING ───────────────────────────────────────────────────
function NowPlayingScreen({ track, isPlaying, progress, onBack, trackIndex, totalTracks }) {
  const pct = track ? Math.min(100, (progress / track.duration) * 100) : 0;
  return (
    <div className="screen-inner">
      <Header title="Now Playing" onBack={onBack} isPlaying={isPlaying} />
      <div className="np-body">
        <div className="np-art-wrap">
          {track
            ? <img src={track.art} alt={track.album} className="np-art" onError={e => { e.target.style.background="#ddd"; e.target.src=""; }} />
            : <div className="np-art-placeholder">♪</div>
          }
        </div>
        <div className="np-info">
          {track ? <Marquee text={track.title} className="np-title" /> : <div className="np-title">Not Playing</div>}
          <div className="np-artist">{track ? track.artist : ""}</div>
          <div className="np-album">{track ? track.album : ""}</div>
          {track && <div className="np-counter">{trackIndex + 1} of {totalTracks}</div>}
        </div>
      </div>
      <div className="np-progress">
        <span className="np-time">{fmt(progress)}</span>
        <div className="np-bar-bg"><div className="np-bar-fill" style={{ width: `${pct}%` }} /></div>
        <span className="np-time np-time-right">-{fmt(track ? track.duration - progress : 0)}</span>
      </div>
    </div>
  );
}

// ─── COVER FLOW ────────────────────────────────────────────────────
function CoverFlowScreen({ selectedIndex, onBack, isPlaying }) {
  return (
    <div className="screen-inner cf-screen">
      <div className="cf-header">
        <button className="back-btn cf-back-btn" onClick={onBack}>‹</button>
        <span className="cf-title">Cover Flow</span>
        <div className="cf-header-right">
          {isPlaying && <svg width="7" height="8" viewBox="0 0 7 8"><polygon points="0,0 7,4 0,8" fill="#444"/></svg>}
          <div className="cf-battery"><div className="cf-battery-fill" /></div>
        </div>
      </div>
      <div className="cf-stage">
        {ALBUMS.map((album, i) => {
          const offset = i - selectedIndex;
          const abs = Math.abs(offset);
          if (abs > 2) return null;
          const isCenter = offset === 0;
          const tx = offset * 58;
          const ry = isCenter ? 0 : offset > 0 ? -62 : 62;
          const tz = isCenter ? 0 : -abs * 20;
          const op = 1 - abs * 0.15;
          const scale = isCenter ? 1 : 0.72;
          return (
            <div key={album.id}
              className={`cf-card${isCenter ? " cf-card-active" : ""}`}
              style={{
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                opacity: op,
                zIndex: 10 - abs,
              }}>
              <div className="cf-art-wrap">
                {album.art
                  ? <img src={album.art} alt="" onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                  : null
                }
                <div className="cf-art-fallback">♪</div>
              </div>
              <div></div>
            </div>
          );
        })}
      </div>
      <div className="cf-label">
        <div className="cf-label-title">{ALBUMS[selectedIndex] ? ALBUMS[selectedIndex].title : ""}</div>
        <div className="cf-label-artist">{ALBUMS[selectedIndex] ? ALBUMS[selectedIndex].artist : ""}</div>
      </div>
    </div>
  );
}

// ─── NOTES SCREENS ─────────────────────────────────────────────────
function useNoteScroll(scrollSignal) {
  const ref = useRef(null);
  useEffect(() => {
    if (!scrollSignal || !ref.current) return;
    ref.current.scrollTop += scrollSignal * 28;
  }, [scrollSignal]);
  return ref;
}
function ExperiencesScreen({ onBack, scrollSignal }) {
  const ref = useNoteScroll(scrollSignal);
  return (
    <div className="screen-inner">
      <Header title="Experiences" onBack={onBack} />
      <div className="notes-body notes-yellow" ref={ref}>
        {
// ─── EDIT: EXPERIENCES NOTE ────────────────────────────────────────
`Ashlen Singh\nCreative Developer & Generative Artist\n\n─────────────────────\n\n2024 — Present\nFreelance Creative Developer\nBuilding browser-based interactive tools, generative art systems, and portfolio experiences. Clients across design, tech, and music.\n\n2023 — 2024\nFront-End Developer\nWorked on React-based web applications with a focus on animation, canvas tooling, and performance.\n\n2022 — 2023\nUI/UX Designer\nDesigned interfaces for mobile and web products. Strong focus on interaction design and design systems.\n\n─────────────────────\n\nSkills\nReact, Canvas API, WebGL, Three.js, Generative Art, UI Design, Motion Design\n\n─────────────────────\n\nThis section is a placeholder.\nReplace with your actual experience.`
        }
      </div>
    </div>
  );
}

function MusicRecommendationsScreen({ onBack, scrollSignal }) {
  const ref = useNoteScroll(scrollSignal);
  return (
    <div className="screen-inner">
      <Header title="Music Recs" onBack={onBack} />
      <div className="notes-body notes-yellow" ref={ref}>
        {
// ─── EDIT: MUSIC RECOMMENDATIONS NOTE ─────────────────────────────
`Music Recommendations\n\nSpotify integration coming soon.\n\nThe plan is to embed a curated playlist directly inside this iPod so you can preview what's on rotation.\n\n─────────────────────\n\nGenres I live in:\nSoul, Neo-Soul, Jazz, Ambient Electronic, Lo-fi, Afrobeats, Indie R&B\n\nArtists on heavy rotation:\nSade, Frank Ocean, Khruangbin, Floating Points, Arooj Aftab, James Blake, Little Simz\n\n─────────────────────\n\nPlaylist link coming soon.`
        }
      </div>
    </div>
  );
}

function BlogListScreen({ onBack, onSelectBlog }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="screen-inner">
      <Header title="Blogs" onBack={onBack} />
      <div className="list-scroll" style={{ flex: 1 }}>
        {BLOGS_DATA.map((blog, i) => (
          <div
            key={blog.id}
            className={`list-row${i === selectedIndex ? " selected" : ""}`}
            onClick={() => onSelectBlog(blog)}
          >
            <span className="list-row-label">{blog.title}</span>
            <span style={{ fontSize: "9px", color: i === selectedIndex ? "rgba(255,255,255,0.7)" : "#aaa", marginLeft: "4px", flexShrink: 0 }}>{blog.year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogPostScreen({ onBack, blog, scrollSignal }) {
  const ref = useNoteScroll(scrollSignal);
  return (
    <div className="screen-inner">
      <Header title={blog.title} onBack={onBack} />
      <div className="blog-meta">{blog.year}</div>
      <div className="notes-body notes-yellow" ref={ref}>{blog.content}</div>
    </div>
  );
}

function NotesMenuScreen({ onBack, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="screen-inner">
      <Header title="Notes" onBack={onBack} />
      <div className="list-wrap">
        <div className="list-scroll">
          {NOTES_MENU.map((item, i) => (
            <div
              key={item.id}
              className={`list-row${i === selectedIndex ? " selected" : ""}`}
              onClick={() => onSelect(item.id)}
            >
              <span className="list-row-label">{item.label}</span>
              {item.hasArrow && <span className="row-arrow">›</span>}
            </div>
          ))}
        </div>
        <div className="context-panel">
          <div className="context-icon">{NOTES_ICON}</div>
          <div className="context-label">Notes</div>
        </div>
      </div>
    </div>
  );
}

function LinksScreen({ onBack }) {
  return (
    <div className="screen-inner">
      <Header title="Links" onBack={onBack} />
      <div className="clock-body">
        <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔒</div>
        <div style={{ fontSize: "11px", color: "#999", textAlign: "center", padding: "0 16px" }}>Coming soon</div>
      </div>
    </div>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────────────
function AboutScreen({ onBack, scrollSignal }) {
  const ref = useNoteScroll(scrollSignal);
  return (
    <div className="screen-inner">
      <Header title="About" onBack={onBack} />
      <div className="notes-body notes-yellow" ref={ref}>
        {`Hey, I'm Ashlen Singh.\n\nCreative developer building interactive and generative art for the browser.\n\nI work across canvas animation, pixel tools, interactive UI, and weird creative experiments.\n\nThis iPod is a portfolio. Poke around.`}
      </div>
    </div>
  );
}

// ─── PHOTOS ────────────────────────────────────────────────────────
function PhotosScreen({ onBack, photos, photoSignal, selectSignal, backSignal }) {
  const [selected, setSelected] = useState(0);
  const [viewing, setViewing] = useState(null);
  const [expanding, setExpanding] = useState(false);
  const allRef = useRef([]);
  const prevSelect = useRef(selectSignal);
  const prevBack = useRef(backSignal);

  const placeholders = [
    "https://picsum.photos/seed/ash1/160/160",
    "https://picsum.photos/seed/ash2/160/160",
    "https://picsum.photos/seed/ash3/160/160",
    "https://picsum.photos/seed/ash4/160/160",
  ];
  const all = [...placeholders, ...photos];
  allRef.current = all;

  useEffect(() => {
    if (!photoSignal) return;
    if (viewing !== null) {
      if (photoSignal === "next") setViewing(v => Math.min(allRef.current.length - 1, v + 1));
      if (photoSignal === "prev") setViewing(v => Math.max(0, v - 1));
    } else {
      if (photoSignal === "next") setSelected(v => Math.min(allRef.current.length - 1, v + 1));
      if (photoSignal === "prev") setSelected(v => Math.max(0, v - 1));
    }
  }, [photoSignal]);

  useEffect(() => {
    if (selectSignal === prevSelect.current) return;
    prevSelect.current = selectSignal;
    if (viewing !== null) return;
    setExpanding(true);
    setTimeout(() => { setViewing(selected); setExpanding(false); }, 180);
  }, [selectSignal]);

  useEffect(() => {
    if (backSignal === prevBack.current) return;
    prevBack.current = backSignal;
    if (viewing !== null) { setViewing(null); return; }
    onBack();
  }, [backSignal]);

  if (viewing !== null) {
    return (
      <div className="screen-inner">
        <Header title={`${viewing + 1} of ${all.length}`} onBack={() => setViewing(null)} />
        <div className="photo-viewer">
          <img
            src={all[viewing]}
            alt=""
            className="photo-viewer-img photo-viewer-img-enter"
            onError={e => { e.target.style.display="none"; }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="screen-inner">
      <Header title="Photos" onBack={onBack} />
      <div className="photos-grid">
        {all.map((src, i) => (
          <div
            key={i}
            className={`photo-thumb${i === selected ? " photo-thumb-selected" : ""}${i === selected && expanding ? " photo-thumb-expanding" : ""}`}
          >
            <img src={src} alt="" onError={e => { e.target.style.display="none"; }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CAMERA ────────────────────────────────────────────────────────
function playShutter() {
  const ctx = getAudioCtx(); if (!ctx) return;
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / ctx.sampleRate;
    data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 18) * 0.35;
  }
  const src = ctx.createBufferSource();
  const gain = ctx.createGain();
  src.buffer = buf;
  src.connect(gain); gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.7, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
  src.start(ctx.currentTime);
}

function applyVintageFilter(canvas) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width; const h = canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]; let g = data[i+1]; let b = data[i+2];
    // lift shadows
    r = r * 0.85 + 28; g = g * 0.85 + 22; b = b * 0.78 + 12;
    // warm cast — boost red/yellow, pull blue
    r = Math.min(255, r * 1.12);
    g = Math.min(255, g * 1.04);
    b = Math.max(0, b * 0.78);
    // blow highlights
    if (r > 200) r = Math.min(255, r + (r - 200) * 0.4);
    if (g > 190) g = Math.min(255, g + (g - 190) * 0.3);
    // grain
    const grain = (Math.random() - 0.5) * 18;
    data[i]   = Math.max(0, Math.min(255, r + grain));
    data[i+1] = Math.max(0, Math.min(255, g + grain * 0.8));
    data[i+2] = Math.max(0, Math.min(255, b + grain * 0.6));
  }
  ctx.putImageData(imageData, 0, 0);
  // vignette
  const vig = ctx.createRadialGradient(w/2, h/2, h*0.3, w/2, h/2, h*0.85);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.38)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}

function CameraScreen({ onBack, onCapture, captureSignal, switchSignal }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const prevCapture = useRef(captureSignal);
  const prevSwitch = useRef(switchSignal);

  useEffect(() => {
    if (captureSignal === prevCapture.current) return;
    prevCapture.current = captureSignal;
    capture();
  }, [captureSignal]);

  useEffect(() => {
    if (switchSignal === prevSwitch.current) return;
    prevSwitch.current = switchSignal;
    switchCamera();
  }, [switchSignal]);

  const startCamera = (mode) => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    const constraints = { video: { facingMode: { ideal: mode } }, audio: false };
    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; setHasPermission(true); }
      })
      .catch(() => setHasPermission(false));
  };

  useEffect(() => {
    startCamera(facingMode);
    return () => { if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop()); };
  }, [facingMode]);

  const capture = () => {
    const canvas = canvasRef.current; const video = videoRef.current;
    if (!canvas || !video || !hasPermission) return;
    const ctx = canvas.getContext("2d");
    const w = video.videoWidth || 320; const h = video.videoHeight || 240;
    canvas.width = w; canvas.height = h;
    ctx.drawImage(video, 0, 0, w, h);
    applyVintageFilter(canvas);
    onCapture(canvas.toDataURL("image/jpeg", 0.88));
    playShutter();
    setFlash(true); setTimeout(() => setFlash(false), 120);
  };

  const switchCamera = () => {
    setFacingMode(m => m === "environment" ? "user" : "environment");
  };

  return (
    <div className="screen-inner">
      <Header title="Camera" onBack={onBack} />
      <div className="camera-body">
        {hasPermission === false && <div className="camera-error">Camera access denied</div>}
        {hasPermission !== false && (
          <video
            ref={videoRef}
            autoPlay playsInline muted
            className="camera-video"
            style={{ filter: "sepia(0.3) saturate(1.3) contrast(1.08) brightness(1.12) hue-rotate(-8deg)" }}
          />
        )}
        {flash && <div className="camera-flash" />}
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className="game-hint">▶II to switch camera · center to capture</div>
    </div>
  );
}
  // ─── CLOCK ─────────────────────────────────────────────────────────
function ClockScreen({ onBack }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <div className="screen-inner">
      <Header title="Clock" onBack={onBack} />
      <div className="clock-body">
        <div className="clock-time">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        <div className="clock-date">{now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</div>
      </div>
    </div>
  );
}

// ─── SNAKE ─────────────────────────────────────────────────────────
function SnakeGame({ onBack, rotateSignal }) {
  const COLS = 20, ROWS = 14, CELL = 8;
  const canvasRef = useRef(null);
  const stateRef = useRef({ snake: [{ x: 10, y: 7 }], dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 }, food: { x: 15, y: 7 }, score: 0, alive: true });
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    if (rotateSignal === 0) return;
    const s = stateRef.current; if (!s.alive) return;
    const d = s.nextDir;
    s.nextDir = rotateSignal > 0 ? { x: -d.y, y: d.x } : { x: d.y, y: -d.x };
  }, [rotateSignal]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const placeFood = () => {
      const s = stateRef.current; let f;
      do { f = { x: Math.floor(Math.random()*COLS), y: Math.floor(Math.random()*ROWS) }; }
      while (s.snake.some(seg => seg.x===f.x && seg.y===f.y));
      s.food = f;
    };
    const tick = () => {
      const s = stateRef.current; if (!s.alive) return;
      s.dir = s.nextDir;
      const head = { x: s.snake[0].x+s.dir.x, y: s.snake[0].y+s.dir.y };
      if (head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS) { s.alive=false; setDead(true); return; }
      if (s.snake.some(seg=>seg.x===head.x&&seg.y===head.y)) { s.alive=false; setDead(true); return; }
      s.snake.unshift(head);
      if (head.x===s.food.x&&head.y===s.food.y) { s.score++; setScore(s.score); placeFood(); } else s.snake.pop();
    };
    const draw = () => {
      const s = stateRef.current;
      ctx.fillStyle="#0a0a0a"; ctx.fillRect(0,0,COLS*CELL,ROWS*CELL);
      ctx.fillStyle="#3ddc84"; s.snake.forEach(seg=>ctx.fillRect(seg.x*CELL+1,seg.y*CELL+1,CELL-2,CELL-2));
      ctx.fillStyle="#ff453a"; ctx.fillRect(s.food.x*CELL+1,s.food.y*CELL+1,CELL-2,CELL-2);
    };
    placeFood();
    const id = setInterval(()=>{tick();draw();},150);
    return ()=>clearInterval(id);
  }, []);

  const restart = () => {
    stateRef.current = { snake:[{x:10,y:7}], dir:{x:1,y:0}, nextDir:{x:1,y:0}, food:{x:15,y:7}, score:0, alive:true };
    setScore(0); setDead(false);
  };

  return (
    <div className="screen-inner">
      <Header title={`Snake   ${score}`} onBack={onBack} />
      <div className="game-body">
        <canvas ref={canvasRef} width={COLS*CELL} height={ROWS*CELL} className="game-canvas" />
        {dead && <div className="game-over" onClick={restart}>Game Over<span className="game-over-sub">tap to restart</span></div>}
      </div>
      <div className="game-hint">rotate wheel to turn</div>
    </div>
  );
}

// ─── BALL & PLATE ──────────────────────────────────────────────────
function BallGame({ onBack, rotateSignal }) {
  const W=160, H=112, R=8;
  const canvasRef = useRef(null);
  const stateRef = useRef({ bx:80, by:56, vx:1.5, vy:1, tilt:0 });

  useEffect(() => {
    if (rotateSignal===0) return;
    const s = stateRef.current;
    s.tilt = Math.max(-0.45, Math.min(0.45, s.tilt+rotateSignal*0.07));
  }, [rotateSignal]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const tick = () => {
      const s = stateRef.current;
      s.tilt*=0.98; s.vx+=s.tilt*0.25; s.vy+=0.08; s.vx*=0.992; s.vy*=0.992;
      s.bx+=s.vx; s.by+=s.vy;
      if(s.bx-R<0){s.bx=R;s.vx=Math.abs(s.vx)*0.75;} if(s.bx+R>W){s.bx=W-R;s.vx=-Math.abs(s.vx)*0.75;}
      if(s.by-R<0){s.by=R;s.vy=Math.abs(s.vy)*0.75;} if(s.by+R>H){s.by=H-R;s.vy=-Math.abs(s.vy)*0.75;}
    };
    const draw = () => {
      const s = stateRef.current;
      ctx.save(); ctx.translate(W/2,H/2); ctx.rotate(s.tilt);
      ctx.fillStyle="#1a1a1a"; ctx.fillRect(-W/2,-H/2,W,H);
      ctx.strokeStyle="#2a2a2a"; ctx.lineWidth=1;
      for(let x=-W;x<W;x+=16){ctx.beginPath();ctx.moveTo(x,-H);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=-H;y<H;y+=16){ctx.beginPath();ctx.moveTo(-W,y);ctx.lineTo(W,y);ctx.stroke();}
      ctx.restore();
      const g=ctx.createRadialGradient(s.bx-3,s.by-3,1,s.bx,s.by,R);
      g.addColorStop(0,"#ffffff"); g.addColorStop(1,"#909090");
      ctx.beginPath(); ctx.arc(s.bx,s.by,R,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
    };
    const id = setInterval(()=>{tick();draw();},16);
    return ()=>clearInterval(id);
  }, []);

  return (
    <div className="screen-inner">
      <Header title="Ball & Plate" onBack={onBack} />
      <div className="game-body"><canvas ref={canvasRef} width={W} height={H} className="game-canvas" /></div>
      <div className="game-hint">rotate wheel to tilt</div>
    </div>
  );
}

// ─── CLICK WHEEL ───────────────────────────────────────────────────
function ClickWheel({ onRotate, onMenu, onSelect, onPrev, onNext, onPlayPause }) {
  const ref = useRef(null);
  const down = useRef(null);
  const accum = useRef(0);

  const xy = (e) => {
    if (e.touches && e.touches.length>0) return { x:e.touches[0].clientX, y:e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches.length>0) return { x:e.changedTouches[0].clientX, y:e.changedTouches[0].clientY };
    return { x:e.clientX, y:e.clientY };
  };
  const center = () => {
    const r = ref.current.getBoundingClientRect();
    return { cx:r.left+r.width/2, cy:r.top+r.height/2, wr:r.width/2 };
  };
  const lastTouchEnd = useRef(0);

  const onDown = (e) => {
    e.preventDefault();
    const pt=xy(e); const c=center();
    down.current = { angle:Math.atan2(pt.y-c.cy,pt.x-c.cx), x:pt.x, y:pt.y, moved:false };
    accum.current = 0;
  };
  const onMove = (e) => {
    e.preventDefault(); if (!down.current) return;
    const pt=xy(e); const c=center();
    if (!down.current.moved && Math.hypot(pt.x-down.current.x,pt.y-down.current.y)>6) down.current.moved=true;
    if (down.current.moved) {
      const na=Math.atan2(pt.y-c.cy,pt.x-c.cx);
      let delta=na-down.current.angle;
      if (delta>Math.PI) delta-=2*Math.PI; if (delta<-Math.PI) delta+=2*Math.PI;
      accum.current+=delta;
      if (Math.abs(accum.current)>=0.35) { onRotate(accum.current>0?1:-1); accum.current=0; }
      down.current.angle=na;
    }
  };
  const onUp = (e) => {
    if (!down.current) return;
    const moved=down.current.moved; down.current=null; if (moved) return;
    const now = Date.now();
    if (now - lastTouchEnd.current < 400) return;
    lastTouchEnd.current = now;
    const pt=xy(e); const c=center();
    const dist=Math.hypot(pt.x-c.cx,pt.y-c.cy);
    if (dist<c.wr*0.3) { onSelect(); return; }
    if (dist>c.wr) return;
    const a=(Math.atan2(pt.y-c.cy,pt.x-c.cx)*180/Math.PI+360)%360;
    if (a>315||a<=45) onNext();
    else if (a>45&&a<=135) onPlayPause();
    else if (a>135&&a<=225) onPrev();
    else onMenu();
  };

  return (
    <div ref={ref} className="wheel"
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={()=>{down.current=null;}}
      onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}>
      <span className="wl wl-menu">MENU</span>
      <svg className="wl wl-prev" width="14" height="10" viewBox="0 0 14 10">
        <polygon points="6,0 0,5 6,10" fill="#6e6e6e"/>
        <polygon points="13,0 7,5 13,10" fill="#6e6e6e"/>
      </svg>
      <svg className="wl wl-next" width="14" height="10" viewBox="0 0 14 10">
        <polygon points="0,0 6,5 0,10" fill="#6e6e6e"/>
        <polygon points="7,0 13,5 7,10" fill="#6e6e6e"/>
      </svg>
      <svg className="wl wl-play" width="14" height="10" viewBox="0 0 14 10">
        <polygon points="0,0 6,5 0,10" fill="#6e6e6e"/>
        <rect x="8" y="0" width="2.5" height="10" fill="#6e6e6e"/>
        <rect x="11.5" y="0" width="2.5" height="10" fill="#6e6e6e"/>
      </svg>
      <div className="wheel-center-btn" />
    </div>
  );
}

// ─── VOLUME OVERLAY ────────────────────────────────────────────────
function VolumeOverlay({ volume }) {
  return (
    <div className="vol-overlay">
      <svg className="vol-icon" width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#ccc"/>
      </svg>
      <div className="vol-track"><div className="vol-fill" style={{ width:`${volume}%` }} /></div>
      <svg className="vol-icon" width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#ccc"/>
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="#ccc"/>
        <path d="M19 12c0 3.04-1.73 5.67-4.25 6.99l1.25 1.25C18.93 18.66 21 15.52 21 12s-2.07-6.66-5-8.24L14.75 5C17.27 6.33 19 8.96 19 12z" fill="#ccc"/>
      </svg>
    </div>
  );
}

// ─── ROOT ──────────────────────────────────────────────────────────
const LIST_SCREENS = ["mainMenu","musicMenu","gamesMenu","extrasMenu","notesMenu","albums","songs","albumTracks"];

export default function IPod() {
  const [locked, setLocked] = useState(true);
  const [navStack, setNavStack] = useState([{ id:"mainMenu", title:"iPod" }]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [showVol, setShowVol] = useState(false);
  const [rotateSignal, setRotateSignal] = useState(0);
  const [photoSignal, setPhotoSignal] = useState(null);
  const [photoSelectSignal, setPhotoSelectSignal] = useState(0);
  const [photoBackSignal, setPhotoBackSignal] = useState(0);
  const [cameraCaptureSignal, setCameraCaptureSignal] = useState(0);
  const [cameraSwitchSignal, setCameraSwitchSignal] = useState(0);
  const [noteScrollSignal, setNoteScrollSignal] = useState(0);
  const [cameraRoll, setCameraRoll] = useState([]);
  const volTimer = useRef(null);

  const screen = navStack[navStack.length - 1];
  const isRoot = navStack.length === 1;

  useEffect(() => {
    const unlock = () => {
      if (audioCtx) return;
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const buf = audioCtx.createBuffer(1,1,22050);
      const src = audioCtx.createBufferSource();
      src.buffer=buf; src.connect(audioCtx.destination); src.start(0);
    };
    document.addEventListener("touchstart", unlock, { once:true });
    document.addEventListener("mousedown", unlock, { once:true });
    return () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("mousedown", unlock);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying||!currentTrack) return;
    const t = setInterval(() => {
      setProgress(p => { if (p>=currentTrack.duration) { setIsPlaying(false); return 0; } return p+1; });
    }, 1000);
    return () => clearInterval(t);
  }, [isPlaying, currentTrack]);

  const push = (s) => { setNavStack(prev=>[...prev,s]); setSelectedIndex(0); };
  const pop  = () => { if (navStack.length>1) { playClick(); setNavStack(prev=>prev.slice(0,-1)); setSelectedIndex(0); } };

  const getItems = () => {
    if (screen.id==="mainMenu")    return MAIN_MENU;
    if (screen.id==="musicMenu")   return MUSIC_MENU;
    if (screen.id==="gamesMenu")   return GAMES_MENU;
    if (screen.id==="extrasMenu")  return EXTRAS_MENU;
    if (screen.id==="notesMenu")   return NOTES_MENU;
    if (screen.id==="albums")      return ALBUMS.map(a=>({ id:a.id, label:a.title, hasArrow:true }));
    if (screen.id==="songs")       return ALL_TRACKS.map(t=>({ id:t.id, label:t.title, hasArrow:false }));
    if (screen.id==="albumTracks") {
      const alb = ALBUMS.find(a=>a.id===screen.albumId);
      return alb ? alb.tracks.map(t=>({ id:t.id, label:t.title, hasArrow:false })) : [];
    }
    return [];
  };

  const unlock = () => { playUnlock(); setLocked(false); };

  const handleRotate = (dir) => {
    if (locked) return;
    playTick();
    if (screen.id==="nowPlaying") {
      setVolume(v=>Math.max(0,Math.min(100,v+dir*5)));
      setShowVol(true); clearTimeout(volTimer.current);
      volTimer.current = setTimeout(()=>setShowVol(false),1500); return;
    }
    const NOTE_SCREENS = ["experiences","blogPost","musicRecs","about"];
    if (NOTE_SCREENS.includes(screen.id)) {
      setNoteScrollSignal(dir); setTimeout(()=>setNoteScrollSignal(0),60); return;
    }
    if (screen.id==="snake"||screen.id==="ball") {
      setRotateSignal(dir); setTimeout(()=>setRotateSignal(0),60); return;
    }
    if (screen.id==="photos") {
      setPhotoSignal(dir > 0 ? "next" : "prev");
      setTimeout(()=>setPhotoSignal(null), 60); return;
    }
    if (screen.id==="coverFlow") {
      setSelectedIndex(i=>Math.max(0,Math.min(ALBUMS.length-1,i+dir))); return;
    }
    if (LIST_SCREENS.includes(screen.id)) {
      const items = getItems();
      setSelectedIndex(i=>Math.max(0,Math.min(items.length-1,i+dir)));
    }
  };

  const playTrack = (track) => {
    setCurrentTrack(track); setProgress(0); setIsPlaying(true);
    push({ id:"nowPlaying", title:"Now Playing" });
  };

  const handleSelect = () => {
    if (locked) return;
    playClick();
    if (screen.id === "photos") { setPhotoSelectSignal(s => s + 1); return; }
    if (screen.id === "camera") { setCameraCaptureSignal(s => s + 1); return; }
    const items = getItems(); const item = items[selectedIndex]; if (!item) return;
    if (screen.id==="mainMenu") {
      if (item.id==="music")      push({ id:"musicMenu",   title:"Music" });
      if (item.id==="photos")     push({ id:"photos",      title:"Photos" });
      if (item.id==="camera")     push({ id:"camera",      title:"Camera" });
      if (item.id==="games")      push({ id:"gamesMenu",   title:"Games" });
      if (item.id==="clock")      push({ id:"clock",       title:"Clock" });
      if (item.id==="about")      push({ id:"about",       title:"About" });
      if (item.id==="nowPlaying") push({ id:"nowPlaying",  title:"Now Playing" });
      if (item.id==="notes")      push({ id:"notesMenu",   title:"Notes" });
      if (item.id==="links")      push({ id:"links",       title:"Links" });
    } else if (screen.id==="notesMenu") {
      if (item.id==="experiences")          push({ id:"experiences",          title:"Experiences" });
      if (item.id==="blogs")                push({ id:"blogList",             title:"Blogs" });
      if (item.id==="musicRecommendations") push({ id:"musicRecs",            title:"Music Recs" });
    } else if (screen.id==="musicMenu") {
      if (item.id==="coverFlow") push({ id:"coverFlow", title:"Cover Flow" });
      if (item.id==="albums")    push({ id:"albums",    title:"Albums" });
      if (item.id==="songs")     push({ id:"songs",     title:"Songs" });
      if (item.id==="artists")   push({ id:"albums",    title:"Artists" });
      if (item.id==="playlists") push({ id:"albums",    title:"Playlists" });
    } else if (screen.id==="gamesMenu") {
      if (item.id==="snake") push({ id:"snake", title:"Snake" });
      if (item.id==="ball")  push({ id:"ball",  title:"Ball & Plate" });
    } else if (screen.id==="albums") {
      push({ id:"albumTracks", title:ALBUMS[selectedIndex].title, albumId:ALBUMS[selectedIndex].id });
    } else if (screen.id==="songs") {
      playTrack(ALL_TRACKS[selectedIndex]);
    } else if (screen.id==="albumTracks") {
      const alb = ALBUMS.find(a=>a.id===screen.albumId);
      if (alb) { const t=alb.tracks[selectedIndex]; playTrack({ id:t.id, title:t.title, duration:t.duration, artist:alb.artist, album:alb.title, art:alb.art }); }
    } else if (screen.id==="coverFlow") {
      push({ id:"albumTracks", title:ALBUMS[selectedIndex].title, albumId:ALBUMS[selectedIndex].id });
    }
  };

  const handlePrev = () => {
    if (locked) return; playClick();
    if (screen.id==="photos") { setPhotoSignal("prev"); setTimeout(()=>setPhotoSignal(null),60); return; }
    if (!currentTrack) return;
    const idx = ALL_TRACKS.findIndex(t=>t.id===currentTrack.id);
    if (idx>0) { setCurrentTrack(ALL_TRACKS[idx-1]); setProgress(0); }
  };
  const handleNext = () => {
    if (locked) return; playClick();
    if (screen.id==="photos") { setPhotoSignal("next"); setTimeout(()=>setPhotoSignal(null),60); return; }
    if (!currentTrack) return;
    const idx = ALL_TRACKS.findIndex(t=>t.id===currentTrack.id);
    if (idx<ALL_TRACKS.length-1) { setCurrentTrack(ALL_TRACKS[idx+1]); setProgress(0); }
  };
  const handlePlayPause = () => {
    if (locked) return; playClick();
    if (screen.id === "camera") { setCameraSwitchSignal(s => s + 1); return; }
    if (!currentTrack) { playTrack(ALL_TRACKS[0]); return; }
    setIsPlaying(p=>!p);
  };
  const handleMenu = () => {
    if (locked) { unlock(); return; }
    if (screen.id === "photos") { setPhotoBackSignal(s => s + 1); return; }
    pop();
  };

  const trackIndex = currentTrack ? ALL_TRACKS.findIndex(t=>t.id===currentTrack.id) : 0;

  const renderScreen = () => {
    if (locked) return <LockScreen onUnlock={unlock} />;
    if (LIST_SCREENS.includes(screen.id)) {
      return (
        <ListScreen
          title={screen.title}
          items={getItems()}
          selectedIndex={selectedIndex}
          onBack={pop}
          isRoot={isRoot}
          isPlaying={isPlaying}
          nowPlayingArt={currentTrack ? currentTrack.art : null}
          screenId={screen.id}
          albumId={screen.albumId}
        />
      );
    }
    if (screen.id==="nowPlaying") return <NowPlayingScreen track={currentTrack} isPlaying={isPlaying} progress={progress} onBack={pop} trackIndex={trackIndex} totalTracks={ALL_TRACKS.length} />;
    if (screen.id==="coverFlow")  return <CoverFlowScreen selectedIndex={selectedIndex} onBack={pop} isPlaying={isPlaying} />;
    if (screen.id==="about")        return <AboutScreen onBack={pop} scrollSignal={noteScrollSignal} />;
    if (screen.id==="experiences")  return <ExperiencesScreen onBack={pop} scrollSignal={noteScrollSignal} />;
    if (screen.id==="blogList")     return <BlogListScreen onBack={pop} onSelectBlog={blog => push({ id:"blogPost", title:blog.title, blog })} />;
    if (screen.id==="blogPost")     return <BlogPostScreen onBack={pop} blog={screen.blog} scrollSignal={noteScrollSignal} />;
    if (screen.id==="musicRecs")    return <MusicRecommendationsScreen onBack={pop} scrollSignal={noteScrollSignal} />;
    if (screen.id==="links")        return <LinksScreen onBack={pop} />;
    if (screen.id==="photos")     return <PhotosScreen onBack={pop} photos={cameraRoll} photoSignal={photoSignal} selectSignal={photoSelectSignal} backSignal={photoBackSignal} />;
    if (screen.id==="camera")     return <CameraScreen onBack={pop} onCapture={url=>setCameraRoll(prev=>[url,...prev])} captureSignal={cameraCaptureSignal} switchSignal={cameraSwitchSignal} />;
    if (screen.id==="clock")      return <ClockScreen onBack={pop} />;
    if (screen.id==="snake")      return <SnakeGame onBack={pop} rotateSignal={rotateSignal} />;
    if (screen.id==="ball")       return <BallGame onBack={pop} rotateSignal={rotateSignal} />;
    return <ListScreen title={screen.title} items={[]} selectedIndex={0} onBack={pop} isRoot={false} isPlaying={false} nowPlayingArt={null} screenId={screen.id} albumId={null} />;
  };

  return (
    <div className="ipod-outer">
      <div className="ipod-body">
        <div className="screen-bezel">
          <div className="screen">
            {renderScreen()}
            {!locked && showVol && <VolumeOverlay volume={volume} />}
          </div>
        </div>
        <ClickWheel onRotate={handleRotate} onMenu={handleMenu} onSelect={handleSelect} onPrev={handlePrev} onNext={handleNext} onPlayPause={handlePlayPause} />
        <div className="ipod-bottom-pad" />
      </div>
    </div>
  );
}