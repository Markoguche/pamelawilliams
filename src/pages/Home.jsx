import { useState, useEffect, useRef, useCallback } from "react";

// --- 1. FONT LOADER (Updated to Inter + Playfair Display) ---
const FontLoader = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  return null;
};

// --- 2. THEME & TYPOGRAPHY ---
const T = {
  ink: "#0d0d0d",
  paper: "#f5f0e8",
  cream: "#faf7f1",
  gold: "#c9a84c",
  goldLight: "#e8d08a",
  rust: "#b5441a",
  sage: "#3d5a4e",
  sageDark: "#1a3028",
  mid: "#6b6258",
  border: "rgba(13,13,13,0.1)",
  // Updated Fonts
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', sans-serif",
};

// --- 3. GLOBAL STYLES (Added Responsive CSS) ---
const GlobalStyle = () => {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
      html { scroll-behavior: smooth; }
      body {
        background: ${T.paper};
        color: ${T.ink};
        font-family: ${T.body};
        font-weight: 300;
        line-height: 1.7;
        overflow-x: hidden;
      }
      
      /* Hide custom cursor on touch devices */
      @media (hover: none) and (pointer: coarse) {
        body { cursor: auto; }
        .custom-cursor { display: none !important; }
      }

      body::before {
        content:'';
        position:fixed;
        inset:0;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
        pointer-events:none;
        z-index:9000;
        opacity:0.35;
      }
      a { text-decoration:none; color:inherit; cursor:pointer; }
      button { cursor:pointer; }
      ::selection { background:${T.gold}40; }

      /* --- Utility Classes for Responsiveness --- */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 4rem;
      }
      @media (max-width: 768px) {
        .container { padding: 0 1.5rem; }
      }

      .grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
      }
      @media (max-width: 768px) {
        .grid-2 { grid-template-columns: 1fr; gap: 3rem; }
      }

      .grid-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
      }
      @media (max-width: 768px) {
        .grid-4 { grid-template-columns: 1fr; }
      }
      
      .hero-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        min-height: 100vh;
      }
      @media (max-width: 768px) {
        .hero-grid { 
          grid-template-columns: 1fr; 
          min-height: auto;
        }
      }

      /* Animations */
      @keyframes fadeUp {
        from { opacity:0; transform:translateY(28px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity:0; }
        to   { opacity:1; }
      }
      @keyframes ticker {
        from { transform:translateX(0); }
        to   { transform:translateX(-50%); }
      }
      @keyframes scrollLine {
        0%,100% { opacity:1; transform:scaleY(1); }
        50%     { opacity:0.3; transform:scaleY(0.6); }
      }
      @keyframes pulse {
        0%,100% { box-shadow: 0 0 0 0 ${T.gold}40; }
        50%     { box-shadow: 0 0 0 10px ${T.gold}00; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

// --- 4. HOOKS ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px", ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

// --- 5. COMPONENTS ---

const Cursor = () => {
  // Disable custom cursor on mobile/touch devices logic is handled in GlobalStyle
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [big, setBig] = useState(false);

  useEffect(() => {
    // Only run logic if screen is wide enough (hover capable)
    if (window.matchMedia("(hover: hover)").matches === false) return;

    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`;
      }
      if (ringRef.current) {
        const s = big ? 28 : 18;
        ringRef.current.style.transform = `translate(${ring.current.x - s}px, ${ring.current.y - s}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const over = (e) => { if (e.target.closest("a,button,[data-hover]")) setBig(true); };
    const out  = (e) => { if (e.target.closest("a,button,[data-hover]")) setBig(false); };
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      cancelAnimationFrame(raf.current);
    };
  }, [big]);

  return (
    <>
      <div ref={dotRef} className="custom-cursor" style={{
        position:"fixed", top:0, left:0, width:12, height:12,
        background:T.gold, borderRadius:"50%", pointerEvents:"none",
        zIndex:9999, mixBlendMode:"multiply", transition:"width .2s,height .2s",
      }} />
      <div ref={ringRef} className="custom-cursor" style={{
        position:"fixed", top:0, left:0,
        width: big ? 56 : 36, height: big ? 56 : 36,
        border:`1.5px solid ${T.gold}`,
        borderRadius:"50%", pointerEvents:"none",
        zIndex:9998, opacity:0.55,
        transition:"width .3s cubic-bezier(.16,1,.3,1), height .3s cubic-bezier(.16,1,.3,1)",
      }} />
    </>
  );
};

const Reveal = ({ children, delay = 0, style = {}, as: Tag = "div", ...rest }) => {
  const [ref, visible] = useScrollReveal();
  return (
    <Tag ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s, transform .8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }} {...rest}>
      {children}
    </Tag>
  );
};

const SectionLabel = ({ children, light = false }) => (
  <div style={{
    display:"flex", alignItems:"center", gap:"1rem",
    fontSize:"0.7rem", letterSpacing:"0.22em", textTransform:"uppercase",
    color: light ? T.goldLight : T.gold, marginBottom:"1.2rem",
  }}>
    <span style={{ width:32, height:1, background: light ? T.goldLight : T.gold, flexShrink:0 }} />
    {children}
  </div>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About","Experience","Ventures","Initiatives","Contact"];

  // Mobile Menu Overlay
  if (isMobile) {
    return (
      <>
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:1000,
          padding: "1.2rem 1.5rem",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          background: "rgba(245,240,232,0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${T.border}`,
        }}>
          <a href="#hero" style={{ fontFamily:T.display, fontSize:"1.3rem", fontWeight:700, color:T.ink }}>
            Ijeoma Aladesaye
          </a>
          <button onClick={() => setMenuOpen(true)} style={{ background:"none", border:"none", padding:"0.5rem" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <div style={{
            position:"fixed", inset:0, background:T.paper, zIndex:1001,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"2rem"
          }}>
            <button onClick={() => setMenuOpen(false)} style={{
              position:"absolute", top:"1.5rem", right:"1.5rem", background:"none", border:"none"
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily:T.display, fontSize:"2rem", color:T.ink, fontWeight:400
                }}>
                {l}
              </a>
            ))}
          </div>
        )}
      </>
    );
  }

  // Desktop Nav
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:1000,
      padding: scrolled ? "1rem 4rem" : "1.6rem 4rem",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      background: scrolled ? "rgba(245,240,232,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(14px)" : "none",
      borderBottom: scrolled ? `1px solid ${T.border}` : "none",
      transition:"all .4s cubic-bezier(.16,1,.3,1)",
    }}>
      <a href="#hero" style={{ fontFamily:T.display, fontSize:"1.15rem", fontWeight:700, letterSpacing:".02em", color:T.ink }}>
        Ijeoma Aladesaye
      </a>
      <ul style={{ display:"flex", gap:"2.5rem", listStyle:"none" }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontSize:"0.8rem", letterSpacing:"0.12em", textTransform:"uppercase",
              color:T.ink, fontWeight: 500, position:"relative", // Made darker and slightly bolder
            }}
              onMouseEnter={e => { e.target.style.color = T.rust; }}
              onMouseLeave={e => { e.target.style.color = T.ink; }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Hero = () => {
  const isMobile = useIsMobile();
  const stats = [
    { num: "500+", label: "Tech Professionals Trained" },
    { num: "$500K+", label: "Funding Secured" },
    { num: "60+", label: "Venture Projects Delivered" },
    { num: "15+", label: "Startups Supported" },
  ];

  return (
    <section id="hero" className="hero-grid" style={{ position:"relative", overflow:"hidden" }}>
      {/* Left / Mobile Order 2 */}
      <div style={{
        display:"flex", flexDirection:"column", justifyContent: isMobile ? "center" : "flex-end",
        padding: isMobile ? "8rem 1.5rem 4rem" : "8rem 3rem 6rem 4rem", 
        position:"relative", zIndex:2,
        order: isMobile ? 2 : 1,
        minHeight: isMobile ? "60vh" : "auto"
      }}>
        <p style={{
          fontSize:"0.72rem", letterSpacing:"0.2em", textTransform:"uppercase",
          color:T.rust, marginBottom:"1.5rem", fontWeight:500,
          opacity:0, animation:"fadeUp .8s .3s cubic-bezier(.16,1,.3,1) forwards",
        }}>
          Innovation Ecosystem Leader · Abuja, Nigeria
        </p>
        <h1 style={{
          fontFamily:T.display, fontSize:"clamp(3rem, 8vw, 5.2rem)",
          fontWeight:400, lineHeight:1.05, letterSpacing:"-0.01em",
          opacity:0, animation:"fadeUp .9s .5s cubic-bezier(.16,1,.3,1) forwards",
        }}>
          Ijeoma<br />
          <em style={{ fontStyle:"italic", color:T.rust }}>Aladesaye</em>
        </h1>
        <p style={{
          fontSize:"1rem", color:T.mid, marginTop:"1.5rem", maxWidth:480, lineHeight:1.8,
          opacity:0, animation:"fadeUp .9s .7s cubic-bezier(.16,1,.3,1) forwards",
        }}>
          Group CEO at Servelead Global — building AI-powered ventures, scaling ecosystems, and transforming founders into market leaders across Africa and beyond.
        </p>
        <div style={{
          marginTop:"2.5rem", display:"flex", gap:"1rem", alignItems:"center",
          opacity:0, animation:"fadeUp .9s .9s cubic-bezier(.16,1,.3,1) forwards",
          flexWrap: "wrap"
        }}>
          <a href="#ventures"
            style={{
              padding:"1rem 2rem", background:T.ink, color:T.paper,
              fontFamily:T.body, fontSize:"0.8rem", fontWeight:500, letterSpacing:"0.1em", textTransform:"uppercase",
              border:"none", transition:"background .3s, transform .3s", display:"inline-block", textAlign:"center"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = T.rust; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.ink; e.currentTarget.style.transform="translateY(0)"; }}
          >Explore Work</a>
          <a href="#contact" style={{
            fontSize:"0.8rem", letterSpacing:"0.1em", textTransform:"uppercase", fontWeight:500,
            color:T.ink, borderBottom:`2px solid ${T.border}`, paddingBottom:2,
            transition:"color .3s, border-color .3s",
          }}
            onMouseEnter={e => { e.currentTarget.style.color = T.rust; e.currentTarget.style.borderColor = T.rust; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.ink; e.currentTarget.style.borderColor = T.border; }}
          >Get in Touch</a>
        </div>
      </div>

      {/* Right / Mobile Order 1 */}
      <div style={{ position:"relative", overflow:"hidden", order: isMobile ? 1 : 2, minHeight: isMobile ? "50vh" : "auto" }}>
        <div style={{
          position:"absolute", inset:0,
          background:`linear-gradient(135deg, ${T.sage} 0%, ${T.sageDark} 100%)`,
          clipPath: isMobile ? "none" : "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity:0, animation:"fadeIn 1.2s .2s cubic-bezier(.16,1,.3,1) forwards",
        }} />
        
        {/* Decorative rings */}
        <div style={{
          position:"absolute", top:"20%", right:"10%",
          width:180, height:180, borderRadius:"50%",
          border:`1px solid rgba(255,255,255,0.07)`, zIndex:1, display: isMobile ? "none" : "block"
        }} />
        
        {/* Stat cards */}
        <div style={{
          position:"absolute", bottom: isMobile ? "-2rem" : "4rem", left: isMobile ? "1.5rem" : "2rem", right: isMobile ? "1.5rem" : "2rem",
          display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr", gap:"1rem", zIndex:2,
          opacity:0, animation:"fadeUp .9s 1.1s cubic-bezier(.16,1,.3,1) forwards",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background:"rgba(255,255,255,0.08)",
              backdropFilter:"blur(10px)",
              border:"1px solid rgba(255,255,255,0.15)",
              padding:"1.2rem",
            }}>
              <div style={{ fontFamily:T.display, fontSize:"2rem", fontWeight:400, lineHeight:1, color:T.goldLight }}>
                {s.num}
              </div>
              <div style={{ fontSize:"0.65rem", letterSpacing:"0.05em", textTransform:"uppercase", color:"rgba(245,240,232,0.6)", marginTop:"0.4rem", fontWeight:500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      {!isMobile && (
        <div style={{
          position:"absolute", bottom:"2.5rem", left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem",
          opacity:0, animation:"fadeIn 1s 1.6s forwards",
        }}>
          <span style={{ fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", color:T.mid }}>Scroll</span>
          <div style={{ width:1, height:50, background:`linear-gradient(to bottom, ${T.gold}, transparent)`, animation:"scrollLine 2s infinite" }} />
        </div>
      )}
    </section>
  );
};

const competencies = [
  "Innovation Ecosystem Development","Startup Commercialisation",
  "Venture Incubation & Startup Development","Programme Design & Innovation Training",
  "AI-Enabled Venture Operations","Talent Development & Workforce Programmes",
  "Go-to-Market Strategy","Business Model Validation",
  "Strategic Partnerships & Stakeholder Engagement","Project & Portfolio Management",
];

const About = () => {
  const isMobile = useIsMobile();
  return (
    <section id="about" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background:T.cream }}>
      <div className="container">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <h2 style={{ fontFamily:T.display, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400, lineHeight:1.15 }}>
            Building ventures that<br /><em style={{ fontStyle:"italic", color:T.rust }}>actually work.</em>
          </h2>
        </Reveal>

        <div className="grid-2" style={{ alignItems:"start", marginTop:"4rem" }}>
          {/* Visual card */}
          <Reveal delay={0.1} style={{ position: isMobile ? "relative" : "sticky", top:"8rem" }}>
            <div style={{
              width:"100%", aspectRatio:"3/4",
              background:`linear-gradient(160deg, ${T.sage} 0%, ${T.sageDark} 100%)`,
              position:"relative", overflow:"hidden",
            }}>
              <div style={{
                position:"absolute", inset:"1.5rem",
                border:"1px solid rgba(255,255,255,0.1)",
                display:"flex", flexDirection:"column", justifyContent:"flex-end",
                padding:"1.5rem",
              }}>
                <p style={{ fontFamily:T.display, fontSize:"1.1rem", fontStyle:"italic", color:"rgba(245,240,232,0.8)", lineHeight:1.6 }}>
                  "Innovation is not an event — it is an ecosystem you deliberately build, one founder at a time."
                </p>
              </div>
              <div style={{
                position:"absolute", bottom:"-1rem", right:"-1rem",
                fontFamily:T.display, fontSize:"11rem", fontWeight:400,
                color:"rgba(255,255,255,0.03)", lineHeight:1, pointerEvents:"none",
                userSelect:"none",
              }}>IA</div>
            </div>
          </Reveal>

          {/* Bio */}
          <div>
            {[
              <p key={0} style={{ fontSize:"1.05rem", color:T.mid, marginBottom:"1.5rem", lineHeight:1.8 }}>
                Ijeoma Aladesaye is an <strong style={{ color:T.ink, fontWeight:600 }}>innovation ecosystem leader and venture development strategist</strong> with over eight years of experience building and scaling ventures from concept to revenue-generating operations across Nigeria and Africa.
              </p>,
              <p key={1} style={{ fontSize:"1.05rem", color:T.mid, marginBottom:"1.5rem", lineHeight:1.8 }}>
                As <strong style={{ color:T.ink, fontWeight:600 }}>Group Chief Executive Officer of Servelead Global</strong> — an AI-powered innovation hub and venture studio — she has directly led the development and growth of four ventures spanning technology, agriculture, logistics, and digital media, while providing advisory and ecosystem support to more than 15 additional startups.
              </p>,
              <p key={2} style={{ fontSize:"1.05rem", color:T.mid, lineHeight:1.8 }}>
                She is equally passionate about people development, having led programmes that trained <strong style={{ color:T.ink, fontWeight:600 }}>500+ technology professionals</strong>, facilitated <strong style={{ color:T.ink, fontWeight:600 }}>100+ talent placements</strong>, and contributed to securing over <strong style={{ color:T.ink, fontWeight:600 }}>$500,000 in funding, grants, and partnership resources</strong>.
              </p>,
            ].map((el, i) => <Reveal key={i} delay={i * 0.12}>{el}</Reveal>)}

            <Reveal delay={0.35}>
              <div style={{ marginTop:"3rem", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem" }}>
                {competencies.map((c, i) => (
                  <div key={i} style={{
                    display:"flex", alignItems:"center", gap:"0.7rem",
                    fontSize:"0.85rem", color:T.mid, padding:"0.45rem 0",
                    borderBottom:`1px solid ${T.border}`,
                  }}>
                    <span style={{ width:5, height:5, background:T.gold, borderRadius:"50%", flexShrink:0 }} />
                    {c}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const impactNums = [
  { num:"500+", label:"Technology professionals trained across cybersecurity, data analytics, software & design" },
  { num:"100+", label:"Employment placements facilitated connecting graduates to local & international employers" },
  { num:"60+",  label:"Venture development and innovation projects including incubation and feasibility studies" },
  { num:"$500K",label:"In grants, sponsorships, and partnership funding secured across ventures and ecosystem initiatives" },
];
const tickerItems = [
  "Innovation Ecosystem Leader","Venture Studio","Servelead Global","Abuja, Nigeria",
  "500+ Professionals Trained","$500K+ Secured","60+ Projects Delivered","AI-Powered Ventures",
];

const Impact = () => {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();
  
  return (
    <section id="impact" style={{ padding: isMobile ? "5rem 0" : "8rem 0", background:T.ink, overflow:"hidden" }}>
      {/* Ticker */}
      <div style={{
        whiteSpace:"nowrap", overflow:"hidden",
        borderTop:`1px solid rgba(255,255,255,0.07)`,
        borderBottom:`1px solid rgba(255,255,255,0.07)`,
        padding:"1.1rem 0", marginBottom: isMobile ? "3rem" : "6rem",
      }}>
        <div style={{ display:"inline-flex", animation:"ticker 22s linear infinite" }}>
          {[...tickerItems,...tickerItems].map((t,i) => (
            <span key={i} style={{
              fontSize:"0.68rem", letterSpacing:"0.2em", textTransform:"uppercase",
              color:"rgba(245,240,232,0.35)", padding:"0 3rem",
              borderRight:`1px solid rgba(255,255,255,0.07)`,
            }}>{t}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4,1fr)" }}>
          {impactNums.map((n, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                data-hover
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: isMobile ? "2rem 0" : "3rem 2.5rem",
                  borderRight: !isMobile && i < 3 ? `1px solid rgba(255,255,255,0.07)` : "none",
                  borderBottom: isMobile ? `1px solid rgba(255,255,255,0.07)` : "none",
                  position:"relative", overflow:"hidden",
                  background: hovered === i ? "rgba(255,255,255,0.02)" : "transparent",
                  transition:"background .4s",
                }}
              >
                <div style={{ fontFamily:T.display, fontSize:"3.5rem", fontWeight:400, color:T.goldLight, lineHeight:1, marginBottom:"0.8rem" }}>
                  {n.num}
                </div>
                <div style={{ fontSize:"0.85rem", letterSpacing:"0.02em", color:"rgba(245,240,232,0.55)", lineHeight:1.6 }}>
                  {n.label}
                </div>
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0, height:2,
                  background:`linear-gradient(to right, transparent, ${T.gold}, transparent)`,
                  transform: hovered === i ? "scaleX(1)" : "scaleX(0)",
                  transition:"transform .5s cubic-bezier(.16,1,.3,1)",
                }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const roles = [
  {
    date:"January 2023 – Present",
    role:"Group Chief Executive Officer",
    company:"Servelead Global Ltd · Abuja, Nigeria",
    bullets:[
      "Leads strategic direction of an AI-powered innovation hub and venture studio supporting startups through venture incubation, operational design, and ecosystem partnerships.",
      "Directed development and scaling of multiple ventures, supporting founders through concept validations, market entry, operational structuring, and revenue generation.",
      "Transformed Servelead Global into an AI-powered hub, integrating AI into venture diagnostics, workflows, automation, content, and advisory frameworks.",
    ],
  },
  {
    date:"September 2023 – Present",
    role:"Program Director",
    company:"Respectech HR · Abuja, Nigeria",
    bullets:[
      "Led design and scaling of a technology workforce development programme addressing Nigeria's digital skills gaps.",
      "Delivered structured training for 500+ professionals across cybersecurity, data analytics, software programming, digital marketing, and UI/UX design.",
      "Facilitated 100+ employment placements connecting trained professionals with local and international employers.",
    ],
  },
  {
    date:"September 2020 – January 2023",
    role:"General Manager",
    company:"Servelead Global Ltd · Abuja, Nigeria",
    bullets:[
      "Directed operational management across venture development programmes, innovation projects, and ecosystem initiatives.",
      "Led cross-functional teams delivering venture incubation activities including feasibility studies, business model development, and market validation.",
    ],
  },
];

const Experience = () => {
  const isMobile = useIsMobile();
  return (
    <section id="experience" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background:T.paper }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems:"end", marginBottom:"5rem", gap: "2rem" }}>
          <Reveal>
            <SectionLabel>Experience</SectionLabel>
            <h2 style={{ fontFamily:T.display, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400, lineHeight:1.15 }}>
              A career built on<br /><em style={{ fontStyle:"italic", color:T.rust }}>building others.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize:"1rem", color:T.mid, lineHeight:1.8 }}>
              From volunteer to Group CEO — over eight years of progressive leadership across venture development, programme management, and ecosystem building.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div style={{ position:"relative" }}>
          <div style={{
            position:"absolute", left:0, top:0, bottom:0, width:1,
            background:`linear-gradient(to bottom, ${T.gold}, transparent)`,
          }} />
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 0.08} style={{ paddingLeft:"2.5rem", paddingBottom:"3rem", position:"relative" }}>
              {/* dot */}
              <div style={{
                position:"absolute", left:-5, top:"0.35rem",
                width:10, height:10, background:T.gold, borderRadius:"50%",
                boxShadow:`0 0 0 4px ${T.paper}, 0 0 0 5px ${T.border}`,
                animation: i === 0 ? "pulse 2.5s infinite" : "none",
              }} />
              <div style={{ fontSize:"0.7rem", letterSpacing:"0.15em", textTransform:"uppercase", color:T.rust, marginBottom:"0.5rem", fontWeight:600 }}>
                {r.date}
              </div>
              <div style={{ fontFamily:T.display, fontSize:"1.6rem", fontWeight:400, marginBottom:"0.15rem" }}>
                {r.role}
              </div>
              <div style={{ fontSize:"0.9rem", color:T.mid, marginBottom:"1rem", letterSpacing:"0.04em", fontWeight:500 }}>
                {r.company}
              </div>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.6rem" }}>
                {r.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize:"0.95rem", color:T.mid, paddingLeft:"1.2rem", position:"relative", lineHeight:1.65 }}>
                    <span style={{ position:"absolute", left:0, color:T.gold, fontSize:"0.8rem", top:"0.15rem" }}>—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ventureData = [
  {
    num:"01", name:"Respectech HR", sector:"Technology · Workforce",
    desc:"Technology talent development and workforce placement initiative bridging Nigeria's digital skills gap through structured training and employer connections.",
  },
  {
    num:"02", name:"LAICOS Farms", sector:"Agriculture · Aquaculture",
    desc:"Agribusiness venture focused on livestock production and aquaculture, including a pilot project involving 2,000 fish stock and access to agricultural funding pathways.",
  },
  {
    num:"03", name:"AIDOS Creations", sector:"Digital Media · Creative",
    desc:"Digital media and creative services studio providing branding, digital marketing, and creative production services to businesses and organisations.",
  },
  {
    num:"04", name:"Timewise Logistics", sector:"Logistics · Operations",
    desc:"Logistics and operational support venture designed to serve growing businesses with efficient, reliable, and scalable operational infrastructure.",
  },
];

const Ventures = () => {
  const [hovered, setHovered] = useState(null);
  const isMobile = useIsMobile();
  return (
    <section id="ventures" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background:T.ink }}>
      <div className="container">
        <Reveal>
          <SectionLabel light>Venture Portfolio</SectionLabel>
          <h2 style={{ fontFamily:T.display, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400, lineHeight:1.15, color:T.paper }}>
            Four ventures.<br /><em style={{ fontStyle:"italic", color:T.rust }}>Four industries.</em>
          </h2>
        </Reveal>

        <div style={{ 
          display:"grid", 
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
          gap:"1px", 
          marginTop:"4rem", 
          background:"rgba(255,255,255,0.05)" 
        }}>
          {ventureData.map((v, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                data-hover
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: hovered === i ? "#141414" : T.ink,
                  padding: isMobile ? "2.5rem 1.5rem" : "3.5rem",
                  position:"relative", overflow:"hidden",
                  transition:"background .4s",
                }}
              >
                {/* Hover green glow */}
                <div style={{
                  position:"absolute", inset:0,
                  background:`linear-gradient(135deg, ${T.sage} 0%, transparent 60%)`,
                  opacity: hovered === i ? 0.12 : 0,
                  transition:"opacity .5s",
                }} />
                <div style={{ fontSize:"0.82rem", color:"rgba(245,240,232,0.18)", letterSpacing:"0.05em", marginBottom:"2rem", fontFamily:T.display }}>
                  {v.num}
                </div>
                <div style={{ fontFamily:T.display, fontSize:"1.6rem", fontWeight:400, color:T.paper, marginBottom:"0.8rem" }}>
                  {v.name}
                </div>
                <div style={{ fontSize:"0.9rem", color:"rgba(245,240,232,0.55)", lineHeight:1.7 }}>
                  {v.desc}
                </div>
                <div style={{
                  display:"inline-block", marginTop:"1.5rem",
                  fontSize:"0.7rem", letterSpacing:"0.1em", textTransform:"uppercase",
                  color:T.gold, border:`1px solid rgba(201,168,76,0.4)`, padding:".4rem 1rem",
                }}>
                  {v.sector}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const initiatives = [
  { title:"Global Startup Pitch Programme", body:"Organised a pitch competition featuring Nigerian startups and international judges, enabling one venture to represent Nigeria in a global competition." },
  { title:"Investment Ecosystem Dialogue", body:"Convened a national investment dialogue bringing together government and private sector leaders to discuss foreign investment opportunities." },
  { title:"Women Entrepreneurs Programme", body:"Designed a business development programme supporting 20 SME owners with training in bookkeeping, branding, and marketing. Participants received ₦500,000 in grants." },
];

const Initiatives = () => {
  const isMobile = useIsMobile();
  return (
    <section id="initiatives" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background:T.cream }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems:"end", marginBottom:"5rem", gap: "2rem" }}>
          <Reveal>
            <SectionLabel>Key Initiatives</SectionLabel>
            <h2 style={{ fontFamily:T.display, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400, lineHeight:1.15 }}>
              Programmes that<br /><em style={{ fontStyle:"italic", color:T.rust }}>moved the needle.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize:"1rem", color:T.mid, lineHeight:1.8 }}>
              A selection of landmark initiatives demonstrating capacity to convene, design, and deliver impact across Nigeria's innovation landscape.
            </p>
          </Reveal>
        </div>

        <div>
          {initiatives.map((item, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div style={{
                display:"grid", 
                gridTemplateColumns: isMobile ? "1fr" : "auto 1fr",
                gap: isMobile ? "1rem" : "2rem", 
                padding:"2rem 0",
                borderBottom:`1px solid ${T.border}`, alignItems:"start",
              }}>
                <span style={{ fontFamily:T.display, fontSize:"0.9rem", color:T.gold, minWidth:"2rem", paddingTop:"0.1rem" }}>
                  {String(i+1).padStart(2,"0")}
                </span>
                <p style={{ fontSize:"1rem", color:T.mid, lineHeight:1.75 }}>
                  <strong style={{ color:T.ink, fontWeight:600 }}>{item.title}</strong>
                  {" — "}{item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Education = () => {
  const [h1, setH1] = useState(false);
  const [h2, setH2] = useState(false);
  const [h3, setH3] = useState(false);
  const isMobile = useIsMobile();

  const card = (hovered, setH, content) => (
    <div
      data-hover
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding:"2rem", border:`1px solid ${hovered ? T.gold : T.border}`,
        marginBottom:"1rem", position:"relative", overflow:"hidden",
        transition:"border-color .3s",
      }}
    >
      <div style={{
        position:"absolute", left:0, top:0, bottom:0, width:3,
        background:T.gold,
        transform: hovered ? "scaleY(1)" : "scaleY(0)",
        transition:"transform .3s cubic-bezier(.16,1,.3,1)",
        transformOrigin:"top",
      }} />
      {content}
    </div>
  );

  return (
    <section id="education" style={{ padding: isMobile ? "6rem 0" : "8rem 0", background:T.paper }}>
      <div className="container">
        <Reveal>
          <SectionLabel>Education & Credentials</SectionLabel>
          <h2 style={{ fontFamily:T.display, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400, lineHeight:1.15 }}>
            Credentials that<br /><em style={{ fontStyle:"italic", color:T.rust }}>speak for themselves.</em>
          </h2>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"4rem", marginTop:"4rem" }}>
          <Reveal delay={0.1}>
            <div>
              <h3 style={{ fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", color:T.gold, marginBottom:"2rem", fontWeight:600 }}>Academic</h3>
              {card(h1, setH1,
                <>
                  <div style={{ fontFamily:T.display, fontSize:"1.2rem", fontWeight:400, marginBottom:"0.3rem" }}>Master of Business Administration</div>
                  <div style={{ fontSize:"0.9rem", color:T.mid, marginBottom:"0.5rem" }}>International Business · Nexford University</div>
                  <span style={{ display:"inline-block", fontSize:"0.7rem", letterSpacing:"0.12em", textTransform:"uppercase", color:T.rust, fontWeight:600 }}>In View</span>
                </>
              )}
              {card(h2, setH2,
                <>
                  <div style={{ fontFamily:T.display, fontSize:"1.2rem", fontWeight:400, marginBottom:"0.3rem" }}>Bachelor of Science</div>
                  <div style={{ fontSize:"0.9rem", color:T.mid }}>University of Nigeria, Nsukka</div>
                </>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div>
              <h3 style={{ fontSize:"0.75rem", letterSpacing:"0.2em", textTransform:"uppercase", color:T.gold, marginBottom:"2rem", fontWeight:600 }}>Certification</h3>
              {card(h3, setH3,
                <>
                  <div style={{ fontFamily:T.display, fontSize:"1.2rem", fontWeight:400, marginBottom:"0.3rem" }}>Project Management Professional (PMP)</div>
                  <div style={{ fontSize:"0.9rem", color:T.mid, marginBottom:"0.8rem" }}>Project Management Institute (PMI)</div>
                  <p style={{ fontSize:"0.9rem", color:T.mid, lineHeight:1.65 }}>
                    One of the most globally recognised project management certifications — reflecting commitment to disciplined, results-driven execution.
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const isMobile = useIsMobile();
  return (
    <section id="contact" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background:T.sage, position:"relative", overflow:"hidden" }}>
      {/* Decorative rings */}
      <div style={{ position:"absolute", top:"-6rem", right:"-6rem", width:"30rem", height:"30rem", borderRadius:"50%", border:"1px solid rgba(255,255,255,0.05)", pointerEvents:"none" }} />
      
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap:"5rem", alignItems:"center" }}>
          <Reveal>
            <SectionLabel light>Get In Touch</SectionLabel>
            <h2 style={{ fontFamily:T.display, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400, lineHeight:1.15, color:T.paper }}>
              Let's build something<br /><em style={{ fontStyle:"italic", color:T.goldLight }}>remarkable.</em>
            </h2>
            <p style={{ fontSize:"1rem", color:"rgba(245,240,232,0.7)", marginTop:"1.5rem", lineHeight:1.8 }}>
              Whether you're a founder seeking incubation, an organisation looking to build an innovation programme, or a partner exploring ecosystem opportunities — Ijeoma would love to connect.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
              {[
                { label:"Email", value:"nwabueze.ijeoma03@gmail.com", href:"mailto:nwabueze.ijeoma03@gmail.com" },
                { label:"Phone", value:"(+234) 705 339 8881", href:"tel:+2347053398881" },
                { label:"Location", value:"Abuja, FCT, Nigeria" },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ padding:"1.5rem 0" }}>
                    <div style={{ fontSize:"0.7rem", letterSpacing:"0.18em", textTransform:"uppercase", color:"rgba(245,240,232,0.4)", marginBottom:"0.35rem", fontWeight:600 }}>
                      {item.label}
                    </div>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize:"1.1rem", color:T.paper, transition:"color .3s", fontWeight:500 }}
                        onMouseEnter={e => e.currentTarget.style.color = T.goldLight}
                        onMouseLeave={e => e.currentTarget.style.color = T.paper}
                      >{item.value}</a>
                    ) : (
                      <span style={{ fontSize:"1.1rem", color:T.paper, fontWeight:500 }}>{item.value}</span>
                    )}
                  </div>
                  <div style={{ height:1, background:"rgba(255,255,255,0.08)" }} />
                </div>
              ))}

              {/* PMP badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:"1rem",
                padding:"1.2rem 1.5rem", marginTop:"2rem",
                border:`1px solid rgba(201,168,76,0.4)`,
              }}>
                <div style={{
                  width:40, height:40, background:T.gold, borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"0.7rem", fontWeight:700, color:T.ink, letterSpacing:"0.05em",
                  flexShrink:0,
                }}>PMP</div>
                <div>
                  <div style={{ fontSize:"0.8rem", color:T.goldLight, letterSpacing:"0.06em", fontWeight:600 }}>Project Management Professional</div>
                  <div style={{ fontSize:"0.75rem", color:"rgba(245,240,232,0.5)" }}>Project Management Institute · Certified</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const isMobile = useIsMobile();
  return (
    <footer style={{
      background:T.ink, padding: isMobile ? "2rem 1.5rem" : "3rem 4rem",
      display:"flex", 
      flexDirection: isMobile ? "column" : "row",
      justifyContent:"space-between", 
      alignItems: isMobile ? "center" : "center",
      gap: isMobile ? "1rem" : "0",
      textAlign: isMobile ? "center" : "left"
    }}>
      <span style={{ fontFamily:T.display, fontSize:"1.1rem", color:"rgba(245,240,232,0.6)", fontStyle:"italic" }}>
        Ijeoma Aladesaye
      </span>
      <span style={{ fontSize:"0.75rem", color:"rgba(245,240,232,0.3)", letterSpacing:"0.05em" }}>
        © 2026 · Servelead Global Ltd · Abuja, Nigeria
      </span>
    </footer>
  );
};

export default function Home() {
  return (
    <>
      <FontLoader />
      <GlobalStyle />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Impact />
        <Experience />
        <Ventures />
        <Initiatives />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}