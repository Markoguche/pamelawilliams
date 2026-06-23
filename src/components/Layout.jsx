import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
];

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = React.useRef(null);
  const menuRef = React.useRef(null);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(navRef.current, {
        backgroundColor: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        borderBottomColor: scrolled ? 'rgba(212,168,83,0.3)' : 'rgba(255,255,255,0.05)',
        duration: 0.4,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, [scrolled]);

  useEffect(() => {
    if (!menuRef.current) return;
    const ctx = gsap.context(() => {
      if (menuOpen) {
        gsap.to(menuRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.6, ease: 'power4.inOut' });
        gsap.fromTo(
          menuRef.current.querySelectorAll('.mobile-nav-item'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, delay: 0.2, ease: 'power3.out' }
        );
      } else {
        gsap.to(menuRef.current, { clipPath: 'inset(0 100% 0 0)', duration: 0.4, ease: 'power4.in' });
      }
    });
    return () => ctx.revert();
  }, [menuOpen]);

  return (
    <>
      {/* NAVBAR */}
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] border-b border-white/5"
        style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        role="banner"
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between" aria-label="Main navigation">
          {/* Logo */}
          <Link to="/" className="relative z-[110]" aria-label="Pamela Williams Home">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 border border-gold-400 flex items-center justify-center">
                <span className="text-gold-400 text-sm font-black">PW</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-xs font-bold tracking-ultrawide uppercase leading-none">
                  Pamela Williams
                </p>
                <p className="text-gold-400 text-[9px] tracking-ultrawide uppercase mt-0.5">
                  Global Creative Luminary
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-8">
            <ul className="flex items-center gap-1" role="menubar">
              {navItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    role="menuitem"
                    className={`relative px-4 py-2 text-[11px] font-semibold tracking-ultrawide uppercase transition-colors duration-300 ${
                      location.pathname === item.path
                        ? 'text-gold-400'
                        : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <span className="absolute bottom-0 left-4 right-4 h-px bg-gold-400" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="border border-gold-400 text-gold-400 px-6 py-2.5 text-[10px] font-bold tracking-ultrawide uppercase hover:bg-gold-400 hover:text-black transition-all duration-300"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-[6px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center"
              style={{
                transform: menuOpen ? 'rotate(45deg) translate(3px, 4.5px)' : 'none',
              }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center"
              style={{
                transform: menuOpen ? 'rotate(-45deg) translate(3px, -4.5px)' : 'none',
              }}
            />
          </button>
        </nav>
      </header>

            {/* MOBILE MENU - Outside header to fix stacking context */}
      <div
        ref={menuRef}
        className="xl:hidden fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-end pb-32"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Close Button positioned exactly where hamburger was */}
        <button
          className="absolute top-4 right-6 w-12 h-12 flex items-center justify-center"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="block w-6 h-[1.5px] bg-white rotate-45 absolute" />
          <span className="block w-6 h-[1.5px] bg-white -rotate-45 absolute" />
        </button>

        <ul className="flex flex-col items-center gap-6 mb-12">
          {navItems.map((item) => (
            <li key={item.path} className="mobile-nav-item" style={{ opacity: 0 }}>
              <Link
                to={item.path}
                className={`text-3xl font-bold tracking-tight uppercase transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-gold-400'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-item" style={{ opacity: 0 }}>
          <Link
            to="/contact"
            className="border border-gold-400 text-gold-400 px-10 py-3.5 text-xs font-bold tracking-ultrawide uppercase hover:bg-gold-400 hover:text-black transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 pt-20 pb-8" role="contentinfo">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 border border-gold-400 flex items-center justify-center">
                  <span className="text-gold-400 text-sm font-black">PW</span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold tracking-ultrawide uppercase leading-none">
                    Pamela Williams
                  </p>
                  <p className="text-gold-400 text-[9px] tracking-ultrawide uppercase mt-0.5">
                    Global Creative Luminary
                  </p>
                </div>
              </div>
              <p className="text-white/30 text-sm leading-relaxed">
                Building brands that matter. Crafting stories that resonate. Designing experiences that inspire.
              </p>
            </div>

            <div>
              <h3 className="text-white text-[10px] font-bold tracking-ultrawide uppercase mb-6">Navigate</h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Services', 'Contact'].map((l) => (
                  <li key={l}>
                    <Link
                      to={`/${l === 'Home' ? '' : l.toLowerCase()}`}
                      className="text-white/30 hover:text-gold-400 text-sm transition-colors duration-300"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-[10px] font-bold tracking-ultrawide uppercase mb-6">Services</h3>
              <ul className="space-y-3">
                {['Brand Strategy', 'Storytelling', 'Event Curation', 'Digital Marketing', 'Public Speaking', 'Training'].map((s) => (
                  <li key={s}>
                    <Link to="/services" className="text-white/30 hover:text-gold-400 text-sm transition-colors duration-300">
                      {s}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-[10px] font-bold tracking-ultrawide uppercase mb-6">Connect</h3>
              <ul className="space-y-3">
                <li><span className="text-white/30 text-sm">info@pamelawilliams.com</span></li>
                <li><span className="text-white/30 text-sm">Abuja, Nigeria</span></li>
              </ul>
              <div className="flex gap-4 mt-6">
                {['LinkedIn', 'Twitter', 'Instagram', 'Facebook'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-white/20 hover:text-gold-400 text-xs tracking-widest uppercase transition-colors duration-300"
                    aria-label={s}
                  >
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} Pamela Williams. All rights reserved.
            </p>
            <p className="text-white/10 text-[10px] tracking-ultrawide uppercase">
              Designed with excellence
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};