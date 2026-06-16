import { useState, useEffect, useRef, useCallback } from "react";

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
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', sans-serif",
};


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

      @media (max-width: 768px) {
        section, main { overflow-x: hidden; }
        @media (max-width: 380px) {
          .hero-grid > div:first-child { padding-top: 6rem !important; }
        }
        #experience .container > div > div[style*="paddingLeft"] {
          padding-left: 1.8rem !important;
        }
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
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [big, setBig] = useState(false);

  useEffect(() => {
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
      transform: visible ? "translateY(0)" : "translateY(20px)",
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

  const links = ["About","Experience","Ventures","Initiatives","Gallery","Contact"];

  if (isMobile) {
    return (
      <>
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:1000,
          padding: "1.2rem 1.5rem",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          background: "rgba(245,240,232,0.97)",
          backdropFilter: "blur(12px)",
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

  const linkColor = scrolled ? T.ink : T.paper;
  const logoColor = scrolled ? T.ink : T.paper;

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
      <a href="#hero" style={{ fontFamily:T.display, fontSize:"1.15rem", fontWeight:700, letterSpacing:".02em", color: logoColor, transition:"color .4s" }}>
        Ijeoma Aladesaye
      </a>
      <ul style={{ display:"flex", gap:"2.5rem", listStyle:"none" }}>
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} style={{
              fontSize:"0.8rem", letterSpacing:"0.12em", textTransform:"uppercase",
              color: linkColor, fontWeight: 500, position:"relative",
              transition:"color .4s",
            }}
              onMouseEnter={e => { e.target.style.color = T.gold; }}
              onMouseLeave={e => { e.target.style.color = linkColor; }}
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
      <div style={{
        display:"flex", flexDirection:"column", justifyContent: isMobile ? "flex-start" : "flex-end",
        padding: isMobile ? "7rem 1.5rem 4rem" : "8rem 3rem 6rem 4rem",
        position:"relative", zIndex:2,
        order: isMobile ? 2 : 1,
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

        {isMobile && (
          <div style={{
            display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem",
            marginTop:"2.5rem",
            opacity:0, animation:"fadeUp .9s 1.1s cubic-bezier(.16,1,.3,1) forwards",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                background: `linear-gradient(135deg, ${T.sage} 0%, ${T.sageDark} 100%)`,
                border:`1px solid rgba(255,255,255,0.15)`,
                padding:"1.2rem",
              }}>
                <div style={{ fontFamily:T.display, fontSize:"2rem", fontWeight:400, lineHeight:1, color:T.goldLight }}>
                  {s.num}
                </div>
                <div style={{ fontSize:"0.65rem", letterSpacing:"0.05em", textTransform:"uppercase", color:"rgba(245,240,232,0.7)", marginTop:"0.4rem", fontWeight:500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ 
        position:"relative", overflow:"hidden", 
        order: isMobile ? 1 : 2, 
        minHeight: isMobile ? "45vh" : "auto",
        display: isMobile ? "none" : "block" 
      }}>
        <div style={{
          position:"absolute", inset:0,
          background:`linear-gradient(135deg, ${T.sage} 0%, ${T.sageDark} 100%)`,
          clipPath: "polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity:0, animation:"fadeIn 1.2s .2s cubic-bezier(.16,1,.3,1) forwards",
        }} />

        <div style={{
          position:"absolute", top:"20%", right:"10%",
          width:180, height:180, borderRadius:"50%",
          border:`1px solid rgba(255,255,255,0.07)`, zIndex:1,
        }} />

        {!isMobile && (
          <div style={{
            position:"absolute",
            bottom:"4rem", left:"2rem", right:"2rem",
            display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", zIndex:2,
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
        )}
      </div>

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
  
  const aboutImageUrl = "https://z-cdn-media.chatglm.cn/files/4f61e953-c1d4-4f7d-ae02-00dca2a2825c.jpg?auth_key=1881611356-1bf8cf5dcc264a92ba4855297bf0d4c2-0-7246b2edf2c084c8c36a2d696a5d13b4";

  return (
    <section id="about" style={{ padding: isMobile ? "4rem 0" : "10rem 0", background:T.cream }}>
      <div className="container">
        <Reveal>
          <SectionLabel>About</SectionLabel>
          <h2 style={{ fontFamily:T.display, fontSize:"clamp(2rem,3.5vw,3.2rem)", fontWeight:400, lineHeight:1.15 }}>
            Building ventures that<br /><em style={{ fontStyle:"italic", color:T.rust }}>actually work.</em>
          </h2>
        </Reveal>

        <div className="grid-2" style={{ alignItems:"start", marginTop: isMobile ? "3rem" : "4rem", gap: isMobile ? "4rem" : "4rem" }}>
          <Reveal delay={0.1} style={{ position: isMobile ? "relative" : "sticky", top: isMobile ? "0" : "8rem" }}>
            <div style={{
              width:"100%", aspectRatio:"3/4",
              background: `linear-gradient(160deg, ${T.sage} 0%, ${T.sageDark} 100%)`,
              position:"relative", overflow:"hidden",
            }}>
              <img 
                src={aboutImageUrl} 
                alt="Ijeoma Aladesaye Portrait" 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  position: "absolute", 
                  top: 0, 
                  left: 0 
                }} 
              />
              
              <div style={{
                position:"absolute", inset:"1.5rem",
                border:"1px solid rgba(255,255,255,0.2)",
                display:"flex", flexDirection:"column", justifyContent:"flex-end",
                padding:"1.5rem",
                background: "linear-gradient(to top, rgba(26,48,40,0.9) 0%, rgba(26,48,40,0.4) 50%, transparent 100%)"
              }}>
                <p style={{ fontFamily:T.display, fontSize:"1.1rem", fontStyle:"italic", color:"rgba(245,240,232,0.9)", lineHeight:1.6 }}>
                  "Innovation is not an event — it is an ecosystem you deliberately build, one founder at a time."
                </p>
              </div>
              <div style={{
                position:"absolute", bottom:"-1rem", right:"-1rem",
                fontFamily:T.display, fontSize:"11rem", fontWeight:400,
                color:"rgba(255,255,255,0.05)", lineHeight:1, pointerEvents:"none",
                userSelect:"none",
              }}>IA</div>
            </div>
          </Reveal>

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
              <div style={{ marginTop:"3rem", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:"0.5rem" }}>
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

        <div style={{ position:"relative" }}>
          <div style={{
            position:"absolute", left:0, top:0, bottom:0, width:1,
            background:`linear-gradient(to bottom, ${T.gold}, transparent)`,
          }} />
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 0.08} style={{ paddingLeft:"2.5rem", paddingBottom:"3rem", position:"relative" }}>
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

// --- GALLERY CAROUSEL SECTION (Narration removed) ---
const galleryImages = [
  { src: "https://z-cdn-media.chatglm.cn/files/ddc626f0-332b-495d-b9d7-7f586d40248b.jpg?auth_key=1881610194-2e2c8ac323ba45a8b75e1d0e04fcb6b1-0-813193d87f47438be1a27a6532b84ac5", alt: "Business meeting handshake" },
  { src: "https://z-cdn-media.chatglm.cn/files/add64689-a07c-4e51-803f-ff43963969e6.jpg?auth_key=1881610194-84536edec1cd4122a0d2cc21d3c13d35-0-d33f1f9e726d3430a0ba9969bf7b4e1a", alt: "Interview on sofa" },
  { src: "https://z-cdn-media.chatglm.cn/files/285f174d-258d-4a90-a985-1e27d428fa37.jpg?auth_key=1881610194-2993632f096f4318a6fe4d6849d795e7-0-c554fb085ddb7d3e4571b6fed510126c", alt: "Speaking at ServLead Global event" },
  { src: "https://z-cdn-media.chatglm.cn/files/a0a1e9c4-3d53-4667-9d13-364d939744a3.jpg?auth_key=1881610194-5ddb5dbbafe64339a3d4f3ff7409f9a8-0-64fb462deb2d74aa4c31830e9e286699", alt: "Portrait in green top" },
  { src: "https://z-cdn-media.chatglm.cn/files/c13d838c-fc46-4e87-b4a3-ee009c436164.jpg?auth_key=1881610194-c4ad2bd3b77e410193c134fcb24f6c06-0-879f82dadfb6bf2138df9917354c168f", alt: "Public speaking volunteer event" },
  { src: "https://z-cdn-media.chatglm.cn/files/6063552b-8b40-4f6a-b554-1e090f40769f.jpg?auth_key=1881610194-99457f64e298491aac6a2091edacbc8b-0-980fd3bb5cbe68154cd27c7c567db7a2", alt: "Teaching in classroom" },
  { src: "https://z-cdn-media.chatglm.cn/files/6461f09c-b3fe-45c1-8465-cf7266032fa7.jpg?auth_key=1881610194-4127a49d3a564e3e864fec76542ad119-0-7b7b29ff657fa1c0eacdc9d6d2b37ea7", alt: "Speaking at NCC event" },
  { src: "https://z-cdn-media.chatglm.cn/files/2a3f27ae-645d-46ad-ae81-2c2cd65915df.jpg?auth_key=1881610194-f7b94a6a2f244255819aa306e4fde98c-0-60d20c797b24bce3c05f0792eb6ea429", alt: "Speaking at African University event" },
  { src: "https://z-cdn-media.chatglm.cn/files/bf5ace49-262e-4dc6-9974-a0979a412c08.jpg?auth_key=1881610194-414857b2dd084785ac7d9c74fc2568ff-0-3faaf949b5345d2269664b92a90aaf3f", alt: "Panel discussion" },
];

const Gallery = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();
  const count = galleryImages.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 4000);
    return () => clearInterval(timer);
  }, [count]);

  const goTo = (index) => setCurrent(index);
  const next = () => setCurrent((prev) => (prev + 1) % count);
  const prev = () => setCurrent((prev) => (prev - 1 + count) % count);

  return (
    <section id="gallery" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background: T.paper }}>
      <div className="container">
        <Reveal>
          <SectionLabel>Gallery</SectionLabel>
          <h2 style={{ fontFamily: T.display, fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 400, lineHeight: 1.15 }}>
            Moments in<br /><em style={{ fontStyle: "italic", color: T.rust }}>Motion.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ position: "relative", marginTop: "3rem", overflow: "hidden", maxWidth: "900px", margin: "3rem auto 0" }}>
            {/* Main Image Container */}
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: isMobile ? "4/5" : "3/2", 
              background: T.border,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
            }}>
              {galleryImages.map((img, index) => (
                <div key={index} style={{
                  position: "absolute", inset: 0,
                  transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                  opacity: index === current ? 1 : 0,
                  transform: index === current ? "scale(1)" : "scale(1.05)",
                  zIndex: index === current ? 1 : 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                   {/* Narration overlay removed as requested */}
                </div>
              ))}

              {/* Navigation Arrows */}
              <button onClick={prev} style={{
                position: "absolute", top: "50%", left: "1rem", transform: "translateY(-50%)",
                width: 48, height: 48, borderRadius: "50%", background: "rgba(245,240,232,0.9)",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.3s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={next} style={{
                position: "absolute", top: "50%", right: "1rem", transform: "translateY(-50%)",
                width: 48, height: 48, borderRadius: "50%", background: "rgba(245,240,232,0.9)",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                transition: "transform 0.3s"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(-50%) scale(1)"}
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            {/* Dots Navigation */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2rem",
            }}>
              {galleryImages.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{
                  width: i === current ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === current ? T.gold : T.border,
                  border: "none", transition: "width .3s, background .3s", cursor: "pointer",
                }} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// --- NEW AFRICAX SUMMIT CAROUSEL ---
const africaXImages = [
  { 
    src: "https://z-cdn-media.chatglm.cn/files/bb90e494-e3a5-40c9-a235-16a74a79958c.jpg?auth_key=1881611899-7c8e0bbab79947d6a06781ff0d17a05b-0-6c39e751a168b0ae6e31157f3b1a641e", 
    alt: "Speaking at AfricaX Summit 2026" 
  },
  { 
    src: "https://z-cdn-media.chatglm.cn/files/212dd450-104c-45b2-8103-513e157ebc4c.jpg?auth_key=1881611899-88d8f28afa6e4ce9a764d865167f8d2d-0-4da818df1cc51012031226171c287507", 
    alt: "Cultural exchange handshake" 
  },
  { 
    src: "https://z-cdn-media.chatglm.cn/files/deac5d69-d3d2-4bbc-9d09-288d142390e0.jpg?auth_key=1881611899-05f9c8cc5f87440e908fdacdd034f53c-0-7de06d3c29fdfa23d52fa617e4ddc7f4", 
    alt: "Partnership handshake ceremony" 
  },
  { 
    src: "https://z-cdn-media.chatglm.cn/files/376d47f8-eab4-4aeb-b32a-f132d8409c54.jpg?auth_key=1881611899-9c66959720bc4584a16043fe5b3e5227-0-95e60bb2cdc42c35e9d0ee9f4fa5a242", 
    alt: "Formal event greeting" 
  },
  { 
    src: "https://z-cdn-media.chatglm.cn/files/1895c9bf-3969-4903-bec7-df784afe004a.jpg?auth_key=1881611899-a451f3176bfe4c9cb6ec35eae92761d5-0-8ecc292ae42e0dae0ca0e33102655478", 
    alt: "Group discussion at summit" 
  },
  { 
    src: "https://z-cdn-media.chatglm.cn/files/d55c2478-1b2b-48dd-b044-3649caf0901c.jpg?auth_key=1881611899-235fd9e95a41407d9e27c7dbdf6f4ee3-0-1d13b96c60979e4e9bc4feeff2b1866d", 
    alt: "Team photo with African backdrop" 
  },
  { 
    src: "https://z-cdn-media.chatglm.cn/files/589b0bc4-1fce-4a53-a45b-af1bed852623.jpg?auth_key=1881611899-e3d5335ca0b34eb78369948a1253a6d5-0-1e1717c2b14976b9a9a2a9216c6c6d2c", 
    alt: "Keynote presentation" 
  },
];

const AfricaXSummit = () => {
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();
  const count = africaXImages.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % count);
    }, 4500);
    return () => clearInterval(timer);
  }, [count]);

  const goTo = (index) => setCurrent(index);
  const next = () => setCurrent((prev) => (prev + 1) % count);
  const prev = () => setCurrent((prev) => (prev - 1 + count) % count);

  return (
    <section id="africax" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background: T.sageDark }}>
      <div className="container">
        <Reveal>
          <SectionLabel light>AfricaX Summit 2026</SectionLabel>
          <h2 style={{ fontFamily: T.display, fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 400, lineHeight: 1.15, color: T.paper }}>
            Connecting Across<br /><em style={{ fontStyle: "italic", color: T.rust }}>Continents.</em>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ position: "relative", marginTop: "3rem", overflow: "hidden", maxWidth: "1000px", margin: "3rem auto 0" }}>
            {/* Main Image Container */}
            <div style={{
              position: "relative",
              width: "100%",
              aspectRatio: isMobile ? "4/5" : "16/9", 
              background: T.ink,
              overflow: "hidden",
              boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}>
              {africaXImages.map((img, index) => (
                <div key={index} style={{
                  position: "absolute", inset: 0,
                  transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
                  opacity: index === current ? 1 : 0,
                  transform: index === current ? "scale(1)" : "scale(1.08)",
                  zIndex: index === current ? 1 : 0,
                }}>
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                  />
                </div>
              ))}

              {/* Decorative corner elements */}
              <div style={{
                position: "absolute", top: 0, left: 0, width: 80, height: 80,
                borderLeft: "2px solid rgba(201,168,76,0.5)",
                borderTop: "2px solid rgba(201,168,76,0.5)",
                pointerEvents: "none"
              }} />
              <div style={{
                position: "absolute", bottom: 0, right: 0, width: 80, height: 80,
                borderRight: "2px solid rgba(201,168,76,0.5)",
                borderBottom: "2px solid rgba(201,168,76,0.5)",
                pointerEvents: "none"
              }} />

              {/* Navigation Arrows */}
              <button onClick={prev} style={{
                position: "absolute", top: "50%", left: "1.5rem", transform: "translateY(-50%)",
                width: 52, height: 52, borderRadius: "50%", background: "rgba(245,240,232,0.95)",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                transition: "transform 0.3s, background 0.3s"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; e.currentTarget.style.background = T.gold; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(-50%) scale(1)"; e.currentTarget.style.background = "rgba(245,240,232,0.95)"; }}
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={next} style={{
                position: "absolute", top: "50%", right: "1.5rem", transform: "translateY(-50%)",
                width: 52, height: 52, borderRadius: "50%", background: "rgba(245,240,232,0.95)",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                zIndex: 2, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                transition: "transform 0.3s, background 0.3s"
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-50%) scale(1.1)"; e.currentTarget.style.background = T.gold; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(-50%) scale(1)"; e.currentTarget.style.background = "rgba(245,240,232,0.95)"; }}
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.ink} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>

              {/* Image Counter */}
              <div style={{
                position: "absolute", top: "1.5rem", right: "1.5rem",
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(8px)",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                zIndex: 2
              }}>
                <span style={{ color: T.goldLight, fontFamily: T.body, fontSize: "0.85rem", fontWeight: 500 }}>
                  {String(current + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* Progress Bar Navigation */}
            <div style={{
              display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "2rem",
              maxWidth: "600px", margin: "2rem auto 0"
            }}>
              {africaXImages.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => goTo(i)} 
                  style={{
                    flex: 1,
                    height: 4, 
                    borderRadius: 2,
                    background: i === current ? T.gold : "rgba(201,168,76,0.2)",
                    border: "none", 
                    transition: "background .4s, transform .3s", 
                    cursor: "pointer",
                    transform: i === current ? "scaleY(1.5)" : "scaleY(1)"
                  }} 
                />
              ))}
            </div>
          </div>
        </Reveal>
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
    <section id="education" style={{ padding: isMobile ? "6rem 0" : "8rem 0", background:T.cream }}>
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
    <section id="contact" style={{ padding: isMobile ? "6rem 0" : "10rem 0", background: T.ink }}>
      <div className="container">
        <div className="grid-2" style={{ alignItems: "start", gap: isMobile ? "4rem" : "6rem" }}>
          <Reveal>
            <SectionLabel light>Contact</SectionLabel>
            <h2 style={{ fontFamily: T.display, fontSize: "clamp(2rem,3.5vw,3.2rem)", fontWeight: 400, lineHeight: 1.15, color: T.paper }}>
              Let's build<br /><em style={{ fontStyle: "italic", color: T.rust }}>something together.</em>
            </h2>
            <p style={{ fontSize: "1rem", color: "rgba(245,240,232,0.6)", marginTop: "1.5rem", lineHeight: 1.8, maxWidth: 400 }}>
              Whether you're looking to launch a venture, design a programme, or explore partnership opportunities — I'd love to hear from you.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <a href="mailto:ijeoma@serveleadglobal.com" data-hover style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1.5rem 2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "background .3s, border-color .3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = T.gold; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: "0.3rem" }}>Email</div>
                  <div style={{ color: T.paper, fontSize: "1rem" }}>ijeoma@serveleadglobal.com</div>
                </div>
              </a>

              <a href="https://linkedin.com/in/ijeomaaladesaye" target="_blank" rel="noopener noreferrer" data-hover style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1.5rem 2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "background .3s, border-color .3s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = T.gold; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: "0.3rem" }}>LinkedIn</div>
                  <div style={{ color: T.paper, fontSize: "1rem" }}>linkedin.com/in/ijeomaaladesaye</div>
                </div>
              </a>

              <div style={{
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "1.5rem 2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={T.gold} strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)", marginBottom: "0.3rem" }}>Location</div>
                  <div style={{ color: T.paper, fontSize: "1rem" }}>Abuja, Nigeria</div>
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
    <footer style={{ padding: "3rem 0", background: T.ink, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="container">
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontFamily: T.display, fontSize: "1.1rem", color: T.paper, fontWeight: 400 }}>
            Ijeoma Aladesaye
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.4)", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} Servelead Global. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- MAIN APP ---
export default function App() {
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
        <Gallery />
        <Ventures />
        <Initiatives />
        <AfricaXSummit />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}