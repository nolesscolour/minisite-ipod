import { useState, useRef, useEffect } from "react";
import "./IPod.css";

// ─── DATA ──────────────────────────────────────────────────────────
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
    art: "https://coverartarchive.org/release/82db5a1c-30a1-4619-9b01-9fa5b3a1b448/front-250",
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
      { id: 14, title: "One More Time",                    duration: 320 },
      { id: 15, title: "Digital Love",                     duration: 301 },
      { id: 16, title: "Harder Better Faster Stronger",    duration: 226 },
      { id: 17, title: "Voyager",                          duration: 228 },
    ],
  },
  {
    id: 5, artist: "Amy Winehouse", title: "Back to Black", year: 2006,
    art: "https://coverartarchive.org/release/2d9f7e19-1cd1-4224-9b4a-2d3fffb8ae54/front-250",
    tracks: [
      { id: 18, title: "Rehab",                   duration: 213 },
      { id: 19, title: "You Know I'm No Good",    duration: 255 },
      { id: 20, title: "Back to Black",           duration: 242 },
      { id: 21, title: "Tears Dry on Their Own",  duration: 186 },
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
  { id: "music",      label: "Music",         hasArrow: true  },
  { id: "photos",     label: "Photos",        hasArrow: true  },
  { id: "games",      label: "Games",         hasArrow: true  },
  { id: "clock",      label: "Clock",         hasArrow: false },
  { id: "about",      label: "About",         hasArrow: false },
  { id: "nowPlaying", label: "Now Playing",   hasArrow: false },
];
const MUSIC_MENU = [
  { id: "coverFlow", label: "Cover Flow", hasArrow: false },
  { id: "artists",   label: "Artists",   hasArrow: true  },
  { id: "albums",    label: "Albums",    hasArrow: true  },
  { id: "songs",     label: "Songs",     hasArrow: true  },
  { id: "playlists", label: "Playlists", hasArrow: true  },
];
const GAMES_MENU = [
  { id: "snake", label: "Snake",        hasArrow: false },
  { id: "ball",  label: "Ball & Plate", hasArrow: false },
];
const EXTRAS_MENU = [];

function fmt(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
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
        {!isRoot && (
          <button className="back-btn" onClick={onBack}>‹</button>
        )}
        <span className="header-title-left">{title}</span>
      </div>
      <span className="hdr-clock">{time}</span>
      <div className="header-right">
        {isPlaying && <span className="hdr-play">▶</span>}
        <div className="hdr-battery">
          <div className="battery-fill" />
        </div>
      </div>
    </div>
  );
}

// ─── LIST SCREEN ───────────────────────────────────────────────────
function ListScreen({ title, items, selectedIndex, onBack, isRoot, isPlaying, nowPlayingArt }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    const rows = listRef.current.children;
    if (rows[selectedIndex]) {
      rows[selectedIndex].scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  return (
    <div className="screen-inner">
      <Header title={title} onBack={onBack} isRoot={isRoot} isPlaying={isPlaying} />
      <div className="list-wrap">
        <div className="list-scroll" ref={listRef}>
          {items.map((item, i) => (
            <div
              key={item.id || i}
              className={`list-row${i === selectedIndex ? " selected" : ""}`}
            >
              <span className="list-row-label">{item.label}</span>
              {item.hasArrow && <span className="row-arrow">›</span>}
            </div>
          ))}
        </div>
        {isRoot && nowPlayingArt && (
          <div className="sidebar-art">
            <img src={nowPlayingArt} alt="" onError={e => { e.target.style.display = 'none'; }} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── NOW PLAYING ───────────────────────────────────────────────────
function NowPlayingScreen({ track, isPlaying, progress, onBack }) {
  const pct = track ? Math.min(100, (progress / track.duration) * 100) : 0;
  return (
    <div className="screen-inner">
      <Header title="Now Playing" onBack={onBack} isPlaying={isPlaying} />
      <div className="np-body">
        <div className="np-art-wrap">
          {track
            ? <img src={track.art} alt={track.album} className="np-art" onError={e => { e.target.style.background = '#333'; e.target.src = ''; }} />
            : <div className="np-art-placeholder">♪</div>
          }
        </div>
        <div className="np-info">
          <div className="np-title">{track ? track.title : "Not Playing"}</div>
          <div className="np-artist">{track ? track.artist : ""}</div>
          <div className="np-album">{track ? track.album : ""}</div>
        </div>
      </div>
      <div className="np-progress">
        <span className="np-time">{fmt(progress)}</span>
        <div className="np-bar-bg">
          <div className="np-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <span className="np-time np-time-right">
          -{fmt(track ? track.duration - progress : 0)}
        </span>
      </div>
    </div>
  );
}

// ─── COVER FLOW ────────────────────────────────────────────────────
function CoverFlowScreen({ selectedIndex, onBack }) {
  return (
    <div className="screen-inner cf-screen">
      <div className="cf-header">
        <button className="back-btn cf-back-btn" onClick={onBack}>‹</button>
        <span className="cf-title">Cover Flow</span>
      </div>
      <div className="cf-stage">
        {ALBUMS.map((album, i) => {
          const offset = i - selectedIndex;
          const abs = Math.abs(offset);
          if (abs > 2) return null;
          const tx = offset * 68;
          const ry = offset === 0 ? 0 : offset > 0 ? -55 : 55;
          const tz = -abs * 35;
          const op = 1 - abs * 0.25;
          return (
            <div
              key={album.id}
              className={`cf-card${offset === 0 ? " cf-card-active" : ""}`}
              style={{
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg)`,
                opacity: op,
                zIndex: 10 - abs,
              }}
            >
              <img src={album.art} alt={album.title} onError={e => { e.target.style.background = '#222'; e.target.src = ''; }} />
              <div className="cf-reflect">
                <img src={album.art} alt="" />
              </div>
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

// ─── NOTES ─────────────────────────────────────────────────────────
function NotesScreen({ onBack }) {
  return (
    <div className="screen-inner">
      <Header title="Notes" onBack={onBack} />
      <div className="notes-body">
        {`Hey, I'm Ashlen Singh.\n\nCreative developer building interactive and generative art for the browser.\n\nI work across canvas animation, pixel tools, interactive UI, and weird creative experiments.\n\nThis iPod is a portfolio. Poke around.`}
      </div>
    </div>
  );
}

// ─── PHOTOS ────────────────────────────────────────────────────────
function PhotosScreen({ onBack }) {
  const swatches = ["#b8d4e8","#e8c8b0","#c8e8c0","#e8b8c8","#d8c8e8","#e8e0b0"];
  return (
    <div className="screen-inner">
      <Header title="Photos" onBack={onBack} />
      <div className="photos-grid">
        {swatches.map((c, i) => (
          <div key={i} className="photo-thumb" style={{ background: c }}>📷</div>
        ))}
      </div>
    </div>
  );
}

// ─── CLOCK ─────────────────────────────────────────────────────────
function ClockScreen({ onBack }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="screen-inner">
      <Header title="Clock" onBack={onBack} />
      <div className="clock-body">
        <div className="clock-time">
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className="clock-date">
          {now.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>
    </div>
  );
}

// ─── SNAKE ─────────────────────────────────────────────────────────
function SnakeGame({ onBack, rotateSignal }) {
  const COLS = 20, ROWS = 14, CELL = 8;
  const canvasRef = useRef(null);
  const stateRef = useRef({
    snake: [{ x: 10, y: 7 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 15, y: 7 },
    score: 0,
    alive: true,
  });
  const [score, setScore] = useState(0);
  const [dead, setDead] = useState(false);

  useEffect(() => {
    if (rotateSignal === 0) return;
    const s = stateRef.current;
    if (!s.alive) return;
    const d = s.nextDir;
    if (rotateSignal > 0) {
      s.nextDir = { x: -d.y, y: d.x };
    } else {
      s.nextDir = { x: d.y, y: -d.x };
    }
  }, [rotateSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const placeFood = () => {
      const s = stateRef.current;
      let f;
      do {
        f = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
      } while (s.snake.some((seg) => seg.x === f.x && seg.y === f.y));
      s.food = f;
    };

    const tick = () => {
      const s = stateRef.current;
      if (!s.alive) return;
      s.dir = s.nextDir;
      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };
      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        s.alive = false; setDead(true); return;
      }
      if (s.snake.some((seg) => seg.x === head.x && seg.y === head.y)) {
        s.alive = false; setDead(true); return;
      }
      s.snake.unshift(head);
      if (head.x === s.food.x && head.y === s.food.y) {
        s.score++; setScore(s.score); placeFood();
      } else {
        s.snake.pop();
      }
    };

    const draw = () => {
      const s = stateRef.current;
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.fillStyle = "#3ddc84";
      s.snake.forEach((seg) => {
        ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      });
      ctx.fillStyle = "#ff453a";
      ctx.fillRect(s.food.x * CELL + 1, s.food.y * CELL + 1, CELL - 2, CELL - 2);
    };

    placeFood();
    const id = setInterval(() => { tick(); draw(); }, 150);
    return () => clearInterval(id);
  }, []);

  const restart = () => {
    stateRef.current = {
      snake: [{ x: 10, y: 7 }], dir: { x: 1, y: 0 }, nextDir: { x: 1, y: 0 },
      food: { x: 15, y: 7 }, score: 0, alive: true,
    };
    setScore(0); setDead(false);
  };

  return (
    <div className="screen-inner">
      <Header title={`Snake   ${score}`} onBack={onBack} />
      <div className="game-body">
        <canvas ref={canvasRef} width={COLS * CELL} height={ROWS * CELL} className="game-canvas" />
        {dead && (
          <div className="game-over" onClick={restart}>
            Game Over
            <span className="game-over-sub">tap to restart</span>
          </div>
        )}
      </div>
      <div className="game-hint">rotate wheel to turn</div>
    </div>
  );
}

// ─── BALL & PLATE ──────────────────────────────────────────────────
function BallGame({ onBack, rotateSignal }) {
  const W = 160, H = 112, R = 8;
  const canvasRef = useRef(null);
  const stateRef = useRef({ bx: 80, by: 56, vx: 1.5, vy: 1, tilt: 0 });

  useEffect(() => {
    if (rotateSignal === 0) return;
    const s = stateRef.current;
    s.tilt = Math.max(-0.45, Math.min(0.45, s.tilt + rotateSignal * 0.07));
  }, [rotateSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const tick = () => {
      const s = stateRef.current;
      s.tilt *= 0.98;
      s.vx += s.tilt * 0.25;
      s.vy += 0.08;
      s.vx *= 0.992;
      s.vy *= 0.992;
      s.bx += s.vx;
      s.by += s.vy;
      if (s.bx - R < 0)  { s.bx = R;     s.vx =  Math.abs(s.vx) * 0.75; }
      if (s.bx + R > W)  { s.bx = W - R; s.vx = -Math.abs(s.vx) * 0.75; }
      if (s.by - R < 0)  { s.by = R;     s.vy =  Math.abs(s.vy) * 0.75; }
      if (s.by + R > H)  { s.by = H - R; s.vy = -Math.abs(s.vy) * 0.75; }
    };

    const draw = () => {
      const s = stateRef.current;
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(s.tilt);
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(-W / 2, -H / 2, W, H);
      ctx.strokeStyle = "#2a2a2a";
      ctx.lineWidth = 1;
      for (let x = -W; x < W; x += 16) {
        ctx.beginPath(); ctx.moveTo(x, -H); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = -H; y < H; y += 16) {
        ctx.beginPath(); ctx.moveTo(-W, y); ctx.lineTo(W, y); ctx.stroke();
      }
      ctx.restore();
      const g = ctx.createRadialGradient(s.bx - 3, s.by - 3, 1, s.bx, s.by, R);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(1, "#909090");
      ctx.beginPath();
      ctx.arc(s.bx, s.by, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    };

    const id = setInterval(() => { tick(); draw(); }, 16);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="screen-inner">
      <Header title="Ball & Plate" onBack={onBack} />
      <div className="game-body">
        <canvas ref={canvasRef} width={W} height={H} className="game-canvas" />
      </div>
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
    if (e.touches && e.touches.length > 0) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches.length > 0) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  };

  const center = () => {
    const r = ref.current.getBoundingClientRect();
    return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, wr: r.width / 2 };
  };

  const onDown = (e) => {
    e.preventDefault();
    const pt = xy(e);
    const c = center();
    down.current = { angle: Math.atan2(pt.y - c.cy, pt.x - c.cx), x: pt.x, y: pt.y, moved: false };
    accum.current = 0;
  };

  const onMove = (e) => {
    e.preventDefault();
    if (!down.current) return;
    const pt = xy(e);
    const c = center();
    const dx = pt.x - down.current.x;
    const dy = pt.y - down.current.y;
    if (!down.current.moved && Math.hypot(dx, dy) > 6) down.current.moved = true;
    if (down.current.moved) {
      const na = Math.atan2(pt.y - c.cy, pt.x - c.cx);
      let delta = na - down.current.angle;
      if (delta > Math.PI)  delta -= 2 * Math.PI;
      if (delta < -Math.PI) delta += 2 * Math.PI;
      accum.current += delta;
      if (Math.abs(accum.current) >= 0.35) {
        onRotate(accum.current > 0 ? 1 : -1);
        accum.current = 0;
      }
      down.current.angle = na;
    }
  };

  const onUp = (e) => {
    if (!down.current) return;
    const moved = down.current.moved;
    down.current = null;
    if (moved) return;
    const pt = xy(e);
    const c = center();
    const dist = Math.hypot(pt.x - c.cx, pt.y - c.cy);
    if (dist < c.wr * 0.3) { onSelect(); return; }
    if (dist > c.wr) return;
    const a = (Math.atan2(pt.y - c.cy, pt.x - c.cx) * 180 / Math.PI + 360) % 360;
    if (a > 315 || a <= 45)         onNext();
    else if (a > 45  && a <= 135)   onPlayPause();
    else if (a > 135 && a <= 225)   onPrev();
    else                            onMenu();
  };

  return (
    <div
      ref={ref}
      className="wheel"
      onMouseDown={onDown}
      onMouseMove={onMove}
      onMouseUp={onUp}
      onMouseLeave={() => { down.current = null; }}
      onTouchStart={onDown}
      onTouchMove={onMove}
      onTouchEnd={onUp}
    >
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
      <div className="vol-track">
        <div className="vol-fill" style={{ width: `${volume}%` }} />
      </div>
      <svg className="vol-icon" width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M3 9v6h4l5 5V4L7 9H3z" fill="#ccc"/>
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" fill="#ccc"/>
        <path d="M19 12c0 3.04-1.73 5.67-4.25 6.99l1.25 1.25C18.93 18.66 21 15.52 21 12s-2.07-6.66-5-8.24L14.75 5C17.27 6.33 19 8.96 19 12z" fill="#ccc"/>
      </svg>
    </div>
  );
}

// ─── ROOT COMPONENT ────────────────────────────────────────────────
const LIST_SCREENS = ["mainMenu","musicMenu","gamesMenu","extrasMenu","albums","songs","albumTracks"];

let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playTick() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.025);
  if (navigator.vibrate) navigator.vibrate(1);
}

export default function IPod() {
  const [navStack, setNavStack] = useState([{ id: "mainMenu", title: "iPod" }]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [showVol, setShowVol] = useState(false);
  const [rotateSignal, setRotateSignal] = useState(0);
  const volTimer = useRef(null);

  const screen = navStack[navStack.length - 1];
  const isRoot = navStack.length === 1;

  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= currentTrack.duration) { setIsPlaying(false); return 0; }
        return p + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [isPlaying, currentTrack]);

  const push = (s) => { setNavStack((prev) => [...prev, s]); setSelectedIndex(0); };
  const pop  = () => { if (navStack.length > 1) { setNavStack((prev) => prev.slice(0, -1)); setSelectedIndex(0); } };

  const getItems = () => {
    if (screen.id === "mainMenu")    return MAIN_MENU;
    if (screen.id === "musicMenu")   return MUSIC_MENU;
    if (screen.id === "gamesMenu")   return GAMES_MENU;
    if (screen.id === "extrasMenu")  return EXTRAS_MENU;
    if (screen.id === "albums")      return ALBUMS.map((a) => ({ id: a.id, label: a.title, hasArrow: true }));
    if (screen.id === "songs")       return ALL_TRACKS.map((t) => ({ id: t.id, label: t.title, hasArrow: false }));
    if (screen.id === "albumTracks") {
      const alb = ALBUMS.find((a) => a.id === screen.albumId);
      return alb ? alb.tracks.map((t) => ({ id: t.id, label: t.title, hasArrow: false })) : [];
    }
    return [];
  };

  const handleRotate = (dir) => {
    playTick();
    if (screen.id === "nowPlaying") {
      setVolume((v) => Math.max(0, Math.min(100, v + dir * 5)));
      setShowVol(true);
      clearTimeout(volTimer.current);
      volTimer.current = setTimeout(() => setShowVol(false), 1500);
      return;
    }
    if (screen.id === "snake" || screen.id === "ball") {
      setRotateSignal(dir);
      setTimeout(() => setRotateSignal(0), 60);
      return;
    }
    if (screen.id === "coverFlow") {
      setSelectedIndex((i) => Math.max(0, Math.min(ALBUMS.length - 1, i + dir)));
      return;
    }
    if (LIST_SCREENS.includes(screen.id)) {
      const items = getItems();
      setSelectedIndex((i) => Math.max(0, Math.min(items.length - 1, i + dir)));
    }
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    setProgress(0);
    setIsPlaying(true);
    push({ id: "nowPlaying", title: "Now Playing" });
  };

  const handleSelect = () => {
    const items = getItems();
    const item = items[selectedIndex];
    if (!item) return;

    if (screen.id === "mainMenu") {
      if (item.id === "music")      push({ id: "musicMenu",  title: "Music" });
      if (item.id === "photos")     push({ id: "photos",     title: "Photos" });
      if (item.id === "games")      push({ id: "gamesMenu",  title: "Games" });
      if (item.id === "extras")     push({ id: "extrasMenu", title: "Extras" });
      if (item.id === "clock")      push({ id: "clock",      title: "Clock" });
      if (item.id === "nowPlaying") push({ id: "nowPlaying", title: "Now Playing" });
      if (item.id === "about") push({ id: "notes", title: "About" });
    } else if (screen.id === "musicMenu") {
      if (item.id === "coverFlow") push({ id: "coverFlow",  title: "Cover Flow" });
      if (item.id === "albums")    push({ id: "albums",     title: "Albums" });
      if (item.id === "songs")     push({ id: "songs",      title: "Songs" });
      if (item.id === "artists")   push({ id: "albums",     title: "Artists" });
      if (item.id === "playlists") push({ id: "albums",     title: "Playlists" });
    } else if (screen.id === "gamesMenu") {
      if (item.id === "snake") push({ id: "snake", title: "Snake" });
      if (item.id === "ball")  push({ id: "ball",  title: "Ball & Plate" });
    } else if (screen.id === "albums") {
      push({ id: "albumTracks", title: ALBUMS[selectedIndex].title, albumId: ALBUMS[selectedIndex].id });
    } else if (screen.id === "songs") {
      playTrack(ALL_TRACKS[selectedIndex]);
    } else if (screen.id === "albumTracks") {
      const alb = ALBUMS.find((a) => a.id === screen.albumId);
      if (alb) {
        const t = alb.tracks[selectedIndex];
        playTrack({ id: t.id, title: t.title, duration: t.duration, artist: alb.artist, album: alb.title, art: alb.art });
      }
    } else if (screen.id === "coverFlow") {
      push({ id: "albumTracks", title: ALBUMS[selectedIndex].title, albumId: ALBUMS[selectedIndex].id });
    }
  };

  const handlePrev = () => {
    if (!currentTrack) return;
    const idx = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    if (idx > 0) { setCurrentTrack(ALL_TRACKS[idx - 1]); setProgress(0); }
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const idx = ALL_TRACKS.findIndex((t) => t.id === currentTrack.id);
    if (idx < ALL_TRACKS.length - 1) { setCurrentTrack(ALL_TRACKS[idx + 1]); setProgress(0); }
  };

  const handlePlayPause = () => {
    if (!currentTrack) { playTrack(ALL_TRACKS[0]); return; }
    setIsPlaying((p) => !p);
  };

  const renderScreen = () => {
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
        />
      );
    }
    if (screen.id === "nowPlaying") return <NowPlayingScreen track={currentTrack} isPlaying={isPlaying} progress={progress} onBack={pop} />;
    if (screen.id === "coverFlow")  return <CoverFlowScreen selectedIndex={selectedIndex} onBack={pop} />;
    if (screen.id === "notes")      return <NotesScreen onBack={pop} />;
    if (screen.id === "photos")     return <PhotosScreen onBack={pop} />;
    if (screen.id === "clock")      return <ClockScreen onBack={pop} />;
    if (screen.id === "snake")      return <SnakeGame onBack={pop} rotateSignal={rotateSignal} />;
    if (screen.id === "ball")       return <BallGame onBack={pop} rotateSignal={rotateSignal} />;
    return <ListScreen title={screen.title} items={[]} selectedIndex={0} onBack={pop} isRoot={false} isPlaying={false} nowPlayingArt={null} />;
  };

  return (
    <div className="ipod-outer">
      <div className="ipod-body">
        <div className="screen-bezel">
          <div className="screen">
            {renderScreen()}
            {showVol && <VolumeOverlay volume={volume} />}
          </div>
        </div>
        <ClickWheel
          onRotate={handleRotate}
          onMenu={pop}
          onSelect={handleSelect}
          onPrev={handlePrev}
          onNext={handleNext}
          onPlayPause={handlePlayPause}
        />
        <div className="ipod-bottom-pad" />
      </div>
    </div>
  );
}