import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookingProvider, useBooking } from '../contexts/BookingContext';
import PropTypes from 'prop-types';
import logo from '../assets/logo.png';
gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
];

const socialLinks = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/thepamelawilliams?igsh=ZmVud2Rkc2ZqaGsy&utm_source=qr',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@thepamelawilliams?_r=1&_t=ZS-97ZGNG6M4u4',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    url: 'https://x.com/pamelawilliams_?s=11',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/thepamelawilliams?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

function BookingModal() {
  const { isOpen, closeModal } = useBooking();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-black/50 hover:text-black transition-colors cursor-pointer"
          aria-label="Close booking form"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-black text-black mb-2">Book Your Session</h2>
        <p className="text-black/50 text-sm mb-6">Fill in the details below and we&apos;ll get back to you within 24 hours.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            closeModal();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="booking-name" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-1.5">
              Name *
            </label>
            <input
              id="booking-name"
              type="text"
              required
              className="w-full px-4 py-3 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="booking-email" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-1.5">
              Email *
            </label>
            <input
              id="booking-email"
              type="email"
              required
              className="w-full px-4 py-3 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="booking-number" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-1.5">
              Phone Number *
            </label>
            <input
              id="booking-number"
              type="tel"
              required
              className="w-full px-4 py-3 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent"
              placeholder="+234..."
            />
          </div>

          <div>
            <label htmlFor="booking-service" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-1.5">
              Booking Option *
            </label>
            <select
              id="booking-service"
              required
              className="w-full px-4 py-3 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent"
            >
              <option value="">Select a service</option>
              <option>Personal Branding Session</option>
              <option>Brand Strategy &amp; Development</option>
              <option>Personal Development Coaching</option>
              <option>Business Systems &amp; Structure</option>
              <option>Full Event Planning &amp; Execution</option>
              <option>Event Management (Execution Only)</option>
              <option>D-Day Coordination</option>
              <option>Event Consultation</option>
              <option>Scriptwriting</option>
              <option>HR &amp; Recruitment</option>
              <option>Event Hosting &amp; Public Speaking</option>
              <option>PR Services</option>
              <option>Training &amp; Development</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="booking-about" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-1.5">
              About You / Your Business *
            </label>
            <textarea
              id="booking-about"
              rows={3}
              required
              className="w-full px-4 py-3 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent resize-none"
              placeholder="Tell us briefly about yourself or your business..."
            />
          </div>

          <div>
            <label htmlFor="booking-why" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-1.5">
              Why Do You Want to Work With Me? *
            </label>
            <textarea
              id="booking-why"
              rows={3}
              required
              className="w-full px-4 py-3 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent resize-none"
              placeholder="What are you hoping to achieve?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:translate-y-[-2px] mt-2 cursor-pointer"
          >
            Submit Booking Request
          </button>
        </form>
      </div>
    </div>
  );
}

function LayoutInner({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useBooking();
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
        borderBottomColor: scrolled ? 'rgba(212,175,55,0.3)' : 'rgba(255,255,255,0.05)',
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
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] border-b border-white/5"
        style={{ backgroundColor: 'rgba(0,0,0,0)' }}
        role="banner"
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between" aria-label="Main navigation">
          <Link to="/" className="relative z-[110]" aria-label="Pamela Williams Home">
            <div className="flex items-center gap-3">
             <img src={logo} alt="Pamela Williams Logo" className="h-9 w-auto" />
              
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-8">
            <ul className="flex items-center gap-1" role="menubar">
              {navItems.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    role="menuitem"
                    className={`relative px-4 py-2 text-[11px] font-semibold tracking-ultrawide uppercase transition-colors duration-300 ${
                      location.pathname === item.path ? 'text-[#D4AF37]' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <span className="absolute bottom-0 left-4 right-4 h-px bg-[#D4AF37]" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={openModal}
              className="border border-[#D4AF37] text-[#D4AF37] px-6 py-2.5 text-[10px] font-bold tracking-ultrawide uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer"
            >
              Book Now
            </button>
          </div>

          <button
            className="xl:hidden relative z-[110] w-12 h-12 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'rotate(45deg) translate(3px, 4.5px)' : 'none' }} />
            <span className="block w-6 h-[1.5px] bg-white transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-[1.5px] bg-white transition-all duration-300 origin-center" style={{ transform: menuOpen ? 'rotate(-45deg) translate(3px, -4.5px)' : 'none' }} />
          </button>
        </nav>
      </header>

      <div
        ref={menuRef}
        className="xl:hidden fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-end pb-32"
        style={{ clipPath: 'inset(0 100% 0 0)' }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <button
          className="absolute top-4 right-6 w-12 h-12 flex items-center justify-center cursor-pointer"
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
                  location.pathname === item.path ? 'text-[#D4AF37]' : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mobile-nav-item" style={{ opacity: 0 }}>
          <button
            onClick={() => { setMenuOpen(false); openModal(); }}
            className="border border-[#D4AF37] text-[#D4AF37] px-10 py-3.5 text-xs font-bold tracking-ultrawide uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>

      <BookingModal />

      <main>{children}</main>

      <footer className="bg-black border-t border-white/10 pt-20 pb-8" role="contentinfo">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src={logo} alt="Pamela Williams Logo" className="h-10 w-auto" />
                <div>
                  <p className="text-white text-sm font-bold tracking-ultrawide uppercase leading-none">Pamela Williams</p>
                  <p className="text-[#D4AF37] text-[9px] tracking-ultrawide uppercase mt-0.5">Global Creative Luminary</p>
                </div>
              </div>
              <p className="text-white/30 text-sm leading-relaxed">Building brands that matter. Crafting stories that resonate. Designing experiences that inspire.</p>
            </div>
            <div>
              <h3 className="text-white text-[10px] font-bold tracking-ultrawide uppercase mb-6">Navigate</h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Services', 'Contact'].map((l) => (
                  <li key={l}>
                    <Link to={`/${l === 'Home' ? '' : l.toLowerCase()}`} className="text-white/30 hover:text-[#D4AF37] text-sm transition-colors duration-300">{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-[10px] font-bold tracking-ultrawide uppercase mb-6">Services</h3>
              <ul className="space-y-3">
                {['Brand Strategy', 'Storytelling', 'Event Curation', 'Digital Marketing', 'Public Speaking', 'Training', 'PR Services'].map((s) => (
                  <li key={s}>
                    <Link to="/services" className="text-white/30 hover:text-[#D4AF37] text-sm transition-colors duration-300">{s}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-[10px] font-bold tracking-ultrawide uppercase mb-6">Connect</h3>
              <ul className="space-y-3">
                <li><span className="text-white/30 text-sm">thepamelawilliams@gmail.com</span></li>
                <li><span className="text-white/30 text-sm">+2349077937879</span></li>
                <li><span className="text-white/30 text-sm">Abuja, Nigeria</span></li>
              </ul>
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#D4AF37] transition-colors duration-300" aria-label={social.name}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs tracking-wider">&copy; {new Date().getFullYear()} Pamela Williams. All rights reserved.</p>
            <p className="text-white/10 text-[10px] tracking-ultrawide uppercase">Designed with excellence</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function Layout({ children }) {
  return (
    <BookingProvider>
      <LayoutInner>{children}</LayoutInner>
    </BookingProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};