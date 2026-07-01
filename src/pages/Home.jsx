import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollTriggerRefresh, useGsapStagger } from '../hooks/useGsap';
import { FadeUp } from '../components/GsapWrapper';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img6 from '../assets/img6.jpg';
import { useBooking } from '../contexts/BookingContext';
gsap.registerPlugin(ScrollTrigger);

const roles = ['Brand Strategist', 'Storyteller', 'Experience Curator', 'Host', 'CEO', 'Founder'];

const services = [
  { num: '01', title: 'Brand Strategy & Development', desc: 'Full brand audits, competitive analysis, positioning frameworks, and actionable growth roadmaps.' },
  { num: '02', title: 'Storytelling & Creative Direction', desc: 'Leveraging compelling narratives to position brands effectively and drive engagement.' },
  { num: '03', title: 'Experience Curation & Events', desc: 'Designing immersive brand experiences that leave lasting impressions.' },
  { num: '04', title: 'Social Media & Digital Marketing', desc: 'Growing presence by up to 200% through viral content and data-driven campaigns.' },
  { num: '05', title: 'Content Writing & Scriptwriting', desc: 'High-performing SEO content and engaging scripts for films and commercials.' },
  { num: '06', title: 'Event Hosting & Public Speaking', desc: 'Professional hosting, panel moderation, and conference facilitation.' },
  { num: '07', title: 'PR & Communications', desc: 'Media relations, reputation management, press releases, and crisis communications.' },
  { num: '08', title: 'Training & Development', desc: 'Empowering thousands in digital marketing, branding, and AI-powered tools.' },
];

const stats = [
  { num: 10, suffix: '+', label: 'Years Experience', display: '10+' },
  { num: 150, suffix: '+', label: 'High-Level Events Managed', display: '150+' },
  { num: 200, suffix: '+', label: 'Brands & Businesses Served', display: '200+' },
  { num: 1000000, suffix: '+', label: 'Revenue Generated ($)', display: '$1M+' },
];

const events = [
  'French Up Your Career — French Embassy in Nigeria (host + managed)',
  'Bilingual & Competitive Project — French Embassy (managed + media production)',
  'Respectech Conference — 1,500+ attendees (hosted + managed + creative direction)',
  'Innovate Africa Conference (managed + D-Day coordination)',
  'Dominium Blockchain Development Summit (managed + hosted)',
  'Mandela Washington Fellowship 10th Anniversary (managed)',
  'Launch of 44 Luxury, Abuja (host)',
  'Clarity Conference — Lightbulb Consults (host + experience director)',
  'Lagos Business School Sustainability Forum, Abuja Chapter (compere)',
  'E Lawyers Career Fair Day 2024 (compere + events planner)',
  'Women in Bitcoin — "Count Her In" (host)',
  'iVolunteer "Innovation for Impact" (host + organized)',
  'National Peace Accord Signing (execution support)',
  'Chef\'s Academy 10th Anniversary (host + planned + red carpet)',
  'Abuja Food and Fashion Festival (managed media + production)',
  'Aidos Creations Creative Hub Launch — 100+ HNIs (organized + hosted)',
];

const testimonials = [
  { name: 'Dr. Linus Okorie', text: 'Pamela\'s strategic approach to branding and communications is world-class. She brings a level of intentionality that transforms organizations.' },
  { name: 'Imal Silva', text: 'Working with Pamela elevated our brand visibility beyond what we imagined. Her creative direction is unparalleled.' },
  { name: 'Oyewole Joledo', text: 'Pamela doesn\'t just deliver services — she delivers transformation. Our event was seamless, powerful, and unforgettable.' },
  { name: 'Jakpo The Rayven', text: 'Her ability to craft narratives that resonate is extraordinary. Pamela gave our brand a voice that truly connects.' },
  { name: 'Ijeoma Aladesaye', text: 'From strategy to execution, Pamela is exceptional. She understands the nuances of building brands that last.' },
  { name: 'Farida Yayha', text: 'Pamela\'s training programs are transformative. She equips you with real tools and frameworks, not just theory.' },
  { name: 'Zainab Salami', text: 'The level of professionalism and excellence Pamela brings to every project is remarkable.' },
  { name: 'Sabrina Henshaw', text: 'Pamela has a rare gift — she sees the potential in every brand and knows exactly how to unlock it.' },
  { name: 'Tony Berger', text: 'Her global perspective combined with local insight makes Pamela a uniquely powerful strategist.' },
  { name: 'George Fabian', text: 'I\'ve worked with many strategists, but Pamela stands apart. Her work is thorough, creative, and results-driven.' },
  { name: 'Oliver Hack', text: 'Pamela\'s approach to digital marketing is both innovative and grounded. She delivers measurable impact.' },
  { name: 'Robin Prior', text: 'An exceptional communicator and strategist. Pamela brings clarity and direction to every engagement.' },
  { name: 'Princess Marius', text: 'Pamela hosted our conference with such grace and authority. The audience was captivated from start to finish.' },
  { name: 'Salamat Suleiman', text: 'Her personal branding session was a turning point for me. Pamela helped me see and articulate my true value.' },
  { name: 'Olise Onwuka', text: 'Pamela Williams is the definition of excellence. Every interaction reflects her commitment to impact.' },
];

const clients = [
  'Policy Innovation Center', 'Rayven Strategic Communications', 'NXT Wave Africa',
  'George Okoro Studios', 'TCN Abuja', 'Equity Circle', 'Beths Protein',
  'Daurama Foundation', 'Integrity Foundation', 'Rhema Chapel Churches',
  'Sugar Mining', 'Servelead Global', 'Servelead Humanitarian Initiative',
  'Laicos Farms', 'Timewise Logistics', 'Respectech HR', 'Bukkateria',
  'Chefs Academy', 'Abuja Food and Fashion Festival', 'Zinger Wallet',
  'Ese Tonia Foundation', 'Bon Hotel Asokoro', 'Edo State Government',
  'MWFAAN', 'Perspective with the Rayven', 'Renmoney', 'Elite Life Consulting',
];

export default function Home() {
  const heroTitleRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroCtaRef = useRef(null);
  const heroTagsRef = useRef(null);
  const servicesGridRef = useRef(null);
  const eventsListRef = useRef(null);
  const testimonialsGridRef = useRef(null);
  const clientsRef = useRef(null);
  const counterRef = useRef(null);
  const countersRef = useRef([]);
  const { openModal } = useBooking();

  useScrollTriggerRefresh();
  useGsapStagger(heroTagsRef, '.hero-tag', 0.08);
  useGsapStagger(servicesGridRef, '.service-card', 0.08);
  useGsapStagger(eventsListRef, '.event-item', 0.06);
  useGsapStagger(testimonialsGridRef, '.testimonial-card', 0.06);
  useGsapStagger(clientsRef, '.client-chip', 0.04);

  // Hero entrance
  useEffect(() => {
    if (!heroTitleRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        heroTitleRef.current.children,
        { y: 100, opacity: 0, rotateX: -15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
      )
        .fromTo(heroSubRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .fromTo(heroCtaRef.current.children, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.4');
    });
    return () => ctx.revert();
  }, []);

  // Animated counters — uses pre-defined display strings so nothing overflows
  useEffect(() => {
    const ctx = gsap.context(() => {
      stats.forEach((stat, i) => {
        const el = countersRef.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.num,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
          onUpdate: () => {
            if (obj.val >= stat.num * 0.99) {
              el.textContent = stat.display;
            } else {
              el.textContent = Math.floor(obj.val).toLocaleString() + stat.suffix;
            }
          },
        });
      });
    }, counterRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* ═══════ HERO ═══════ */}
      <section className="relative min-h-screen flex items-end overflow-hidden" aria-label="Hero">
        <div className="absolute inset-0">
          <img src={img1} alt="Pamela Williams — Award-winning Brand Strategist" className="w-full h-full object-cover object-top" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        </div>

        <div className="absolute top-32 right-10 w-px h-32 bg-gradient-to-b from-[#D4AF37]/50 to-transparent hidden lg:block" />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 md:pb-32 pt-36 w-full">
          <p className="text-[#D4AF37] text-[11px] tracking-ultrawide uppercase mb-8 font-semibold">
            Brand Strategist &middot; Storyteller &middot; Experience Curator
          </p>

          <div ref={heroTitleRef} className="mb-8" style={{ perspective: '600px' }}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-black text-white leading-[0.9] tracking-tight">
              <span className="block">I Know</span>
              <span className="block">Exactly What</span>
              <span className="block text-[#D4AF37]">You Need</span>
            </h1>
          </div>

          <p ref={heroSubRef} className="text-white/50 text-base md:text-lg max-w-xl leading-relaxed mb-10" style={{ opacity: 0 }}>
            I am on a mission to help you stand out, scale, and succeed by building your brand, telling your stories, and driving your growth through strategic marketing and communications.
          </p>

          <div ref={heroCtaRef} className="flex flex-wrap gap-4">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-[#e0bd4a] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)]"
              style={{ opacity: 0 }}
            >
              Explore Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 text-[11px] font-bold tracking-ultrawide uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 hover:translate-y-[-2px]"
              style={{ opacity: 0 }}
            >
              Get in Touch
            </Link>
          </div>

          <div ref={heroTagsRef} className="flex flex-wrap gap-2 mt-14">
            {roles.map((tag) => (
              <span
                key={tag}
                className="hero-tag px-4 py-1.5 border border-white/10 text-white/40 text-[10px] tracking-ultrawide uppercase hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all duration-300 cursor-default"
                style={{ opacity: 0 }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3">
          <span className="text-white/20 text-[9px] tracking-mega uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#D4AF37]/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════ SOLUTIONS ═══════ */}
      <section className="bg-white py-20 md:py-32" aria-label="Services overview">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Solutions</p>
          <h2 className="text-3xl md:text-5xl font-black text-black text-center mb-4">What&apos;s Included</h2>
          <p className="text-black/60 text-center max-w-xl mx-auto mb-10 text-sm leading-relaxed">
            Needing clarity and support? Here is how Pamela transforms your brand, business, and presence.
          </p>

          <div ref={servicesGridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Link
                key={s.num}
                to="/services"
                className="service-card group relative p-7 border border-black/5 hover:border-[#D4AF37]/50 transition-all duration-700 cursor-pointer overflow-hidden block"
                style={{ opacity: 0 }}
              >
                <div className="absolute inset-0 bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                <div className="relative z-10">
                  <span className="text-[#D4AF37] group-hover:text-[#D4AF37] text-4xl font-black leading-none transition-colors duration-700">{s.num}</span>
                  <h3 className="text-base font-bold text-black group-hover:text-white mt-3 mb-2 transition-colors duration-700">{s.title}</h3>
                  <p className="text-black/40 group-hover:text-white/50 text-sm leading-relaxed transition-colors duration-700">{s.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-700" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
                  <svg className="w-4 h-4 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-3 text-black text-[11px] font-bold tracking-ultrawide uppercase border-b border-black/20 pb-1 hover:border-[#D4AF37] hover:text-[#b8962e] transition-all duration-300 group"
            >
              View Full Service Details & Pricing
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ MANIFESTO REPLACEMENT ═══════ */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden" aria-label="About Pamela Williams">
        <div className="absolute inset-0">
          <img 
            src={img6} 
            alt="" 
            className="w-full h-full object-cover object-right" 
            loading="eager" 
            aria-hidden="true" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        <div className="relative z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-end max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 md:pb-24 pt-40 md:pt-56">
          <div className="max-w-2xl">
            <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-6 font-bold">What I Do</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8">
              I don&apos;t just build brands —{' '}
              <span className="text-[#D4AF37] italic">I build</span>{' '}
              <span className="text-[#D4AF37] italic">ecosystems.</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
              From hosting conferences for thousands to structuring brand strategies that transform businesses, I bring everything to the table — strategy, storytelling, experience, and execution — so you don&apos;t have to piece it together yourself. Over 200 brands have trusted me to turn their vision into results.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 text-[#D4AF37] text-[11px] font-bold tracking-ultrawide uppercase border-b border-[#D4AF37]/30 pb-1 hover:border-[#D4AF37] transition-all duration-300 group"
            >
              Learn More About Me
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ STATS ═══════ */}
      <section className="bg-[#D4AF37] py-16 md:py-20" aria-label="Key statistics" ref={counterRef}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center min-w-0">
                <span
                  ref={(el) => (countersRef.current[i] = el)}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black block mb-2"
                >
                  0{stat.suffix}
                </span>
                <p className="text-black/50 text-[10px] tracking-ultrawide uppercase font-semibold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ EXPERIENCE ═══════ */}
      <section className="bg-white py-20 md:py-32" aria-label="Experience and events">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <div className="sticky top-28">
                <div className="aspect-[3/4] overflow-hidden">
                  <img src={img3} alt="Pamela Williams hosting Respectech Conference" className="w-full h-full object-cover img-grayscale img-zoom" loading="lazy" />
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#D4AF37] flex items-center justify-center">
                    <span className="text-black text-xs font-black">150+</span>
                  </div>
                  <p className="text-black/30 text-[10px] tracking-ultrawide uppercase">Events Successfully Managed</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold">Experience</p>
              <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Signature Events & Projects</h2>
              <p className="text-black/60 mb-10 leading-relaxed">
                From diplomatic events with the French Embassy to hosting 1,500+ attendee tech conferences, managing the Mandela Washington Fellowship 10th anniversary, and building partnerships with institutions like the National Gallery of Art — Pamela brings precision, creativity, and authority to every stage and project.
              </p>
              <div ref={eventsListRef}>
                {events.map((event, i) => (
                  <div
                    key={i}
                    className="event-item flex items-start gap-5 py-4 border-b border-black/5 group cursor-default"
                  >
                    <span className="text-[#D4AF37] font-mono text-sm mt-0.5 shrink-0 group-hover:text-[#b8962e] transition-colors duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-black/60 group-hover:text-black text-sm transition-colors duration-300">{event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="bg-black py-20 md:py-32" aria-label="Client testimonials">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-4">What They Say</h2>
          <p className="text-white/50 text-center max-w-xl mx-auto mb-10 text-sm leading-relaxed">
            Don&apos;t just take our word for it — hear from the brands, executives, and organizations that have experienced the Pamela Williams difference.
          </p>

          <div ref={testimonialsGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="testimonial-card group p-7 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-700 flex flex-col"
                style={{ opacity: 0 }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3 h-3 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/40 group-hover:text-white/60 text-sm leading-relaxed flex-1 mb-5 italic transition-colors duration-500">
                  &ldquo;{t.text}&rdquo;
                </p>
                <footer className="border-t border-white/10 pt-4">
                  <cite className="not-italic">
                    <span className="font-bold text-white/80 text-sm group-hover:text-[#D4AF37] transition-colors duration-500">{t.name}</span>
                  </cite>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CLIENTS ═══════ */}
      <section className="bg-white py-16 md:p-24" aria-label="Client brands">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-3 font-bold text-center">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-black text-black text-center mb-3">These Brands Can&apos;t Get Enough</h2>
          <p className="text-black/60 text-center max-w-lg mx-auto mb-4 text-sm leading-relaxed">
            Over 200 brands and organizations have trusted Pamela to elevate their visibility, sharpen their identity, and scale their influence.
          </p>
          <p className="text-[#D4AF37] text-center mb-10 font-bold">Of Her Magic.</p>
          <div ref={clientsRef} className="flex flex-wrap justify-center gap-2.5">
            {clients.map((c) => (
              <span
                key={c}
                className="client-chip px-4 py-2 border border-black/10 text-black/40 text-xs hover:border-[#D4AF37] hover:text-[#b8962e] transition-all duration-500 cursor-default"
                style={{ opacity: 0 }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative py-24 md:py-32 bg-black overflow-hidden" aria-label="Booking call to action">
        <div className="absolute inset-0 opacity-15">
          <img src={img2} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-6 font-semibold">We&apos;re Currently Booking</p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6">
            Ready to<br /><span className="text-[#D4AF37]">Level Up?</span>
          </h2>
          <p className="text-white/40 text-lg leading-relaxed mb-10">
            Pamela didn&apos;t just step into the world of media, branding, and business — she built her own table, set the stage, and invited others to thrive alongside her. Now it&apos;s your turn.
          </p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-3 bg-[#D4AF37] text-black px-10 py-4 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-[#e0bd4a] transition-all duration-300 hover:translate-y-[-2px] hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] cursor-pointer"
          >
            Book Your Session
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </section>
    </div>
  );
}