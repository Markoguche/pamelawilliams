import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollTriggerRefresh, useGsapStagger } from '../hooks/useGsap';
import { FadeUp, RevealText } from '../components/GsapWrapper';
import img3 from '../assets/img3.jpg';

const services1on1 = [
  {
    title: 'Personal Branding Session',
    price: '\u20A6300,000 / $200',
    duration: '2 hours',
    what: 'For entrepreneurs, creatives, professionals, or thought leaders looking to establish a powerful personal brand.',
    getting: ['Brand Discovery & Identity Alignment', 'Personal Brand Storytelling', 'Social Media Positioning', 'Content Strategy Framework'],
    outcomes: ['Clear personal brand identity', 'Increased online visibility', 'Structured approach to content creation', 'Confidence in brand storytelling'],
    deliverables: ['Personal Brand Identity Guide', 'Content Strategy Framework', 'Personal Brand Growth Plan'],
  },
  {
    title: 'Brand Strategy & Development Consultation',
    price: '\u20A6600,000 / $400',
    duration: '2 hours',
    featured: true,
    what: 'For launching a business, scaling an existing brand, or repositioning in a crowded market.',
    getting: ['Full Brand Audit & Competitive Analysis', 'Brand Positioning & Messaging Framework', 'Content & Marketing Strategy', 'Actionable Roadmap for Growth'],
    outcomes: ['Solidified brand identity', 'Well-defined marketing strategy', 'Increased brand awareness', 'Strategic roadmap for growth'],
    deliverables: ['Brand Audit Report', 'Brand Positioning & Messaging Guide', 'Marketing & Content Strategy Plan', '30-Day Brand Growth Plan'],
  },
  {
    title: 'Personal Development Guide & Coaching',
    price: '\u20A6150,000 / $100',
    duration: 'Custom',
    what: 'If you struggle with confidence, visibility, communication, or positioning yourself as an authority.',
    getting: ['One-on-One Coaching on Self-Branding', 'Communication & Visibility Coaching', 'Professional Growth Roadmap'],
    outcomes: ['Improved confidence in professional engagement', 'Stronger communication skills', 'Structured personal development roadmap'],
    deliverables: ['Self-Branding & Confidence Blueprint', 'Visibility & Influence Strategy Guide', 'Personal Growth Action Plan'],
  },
  {
    title: 'Business Systems & Structure Consultation',
    price: 'From \u20A61,500,000 / $1,500',
    duration: 'Custom',
    what: 'If you want to scale efficiently, reduce operational stress, and ensure long-term sustainability.',
    getting: ['Business Model Structuring', 'Operational Workflow Optimization', 'Scaling Strategies for Growth'],
    outcomes: ['Well-organized business model', 'Reduced operational inefficiencies', 'Clear business processes and automation'],
    deliverables: ['Business Structure & Operations Guide', 'Revenue Model & Scalability Plan', 'Business Growth & Efficiency Playbook'],
  },
];

const eventsManagement = [
  { title: 'Full Event Planning & Execution', desc: 'End-to-end event planning from concept to execution for individuals, brands, and corporate organizations.', price: 'Custom' },
  { title: 'Event Management (Execution Only)', desc: 'Professional oversight to execute your planned event seamlessly.', price: 'Custom' },
  { title: 'D-Day Coordination', desc: 'A professional team to coordinate the event on the actual day.', price: 'Custom' },
  { title: 'Event Consultation', desc: 'Expert guidance to plan your event while you execute it yourself.', price: 'From \u20A6300,000 (SMEs) / \u20A61,000,000 (Corporate)' },
];

const specializedEvents = [
  { title: 'Weddings', desc: 'Full-service wedding planning, coordination, and execution.' },
  { title: 'Anniversaries', desc: 'Elegant and memorable milestone celebrations.' },
  { title: 'Birthdays & Private Celebrations', desc: 'Customized parties from intimate gatherings to grand celebrations.' },
];

const otherServices = [
  { title: 'Scriptwriting', desc: 'Custom scriptwriting for commercials, digital media, or brand storytelling. 1-min: \u20A6250,000 | 5-min: \u20A6800,000 | 10-min: \u20A61,500,000 | 30-min: \u20A64,000,000' },
  { title: 'HR & Recruitment', desc: 'HR strategy (\u20A61M), Employee Handbook (\u20A6500K), Recruitment Setup (\u20A61.5M), Per Hire: 10-20% of annual salary.' },
  { title: 'Event Hosting & Speaking', desc: 'Per Hour: \u20A6200,000 | Full-Day: \u20A61,000,000 | Panel Moderation: From \u20A6300,000' },
];

export default function Services() {
  const gridRef = useRef(null);
  const eventsGridRef = useRef(null);
  const otherGridRef = useRef(null);
  useScrollTriggerRefresh();
  useGsapStagger(gridRef, '.pricing-card', 0.08);
  useGsapStagger(eventsGridRef, '.event-card', 0.08);
  useGsapStagger(otherGridRef, '.other-card', 0.08);

  return (
    <div>
      {/* HERO */}
      <section className="relative py-28 md:py-40 bg-black overflow-hidden" aria-label="Services overview">
        <div className="absolute inset-0 opacity-8">
          <img src={img3} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-gold-400/70 text-[10px] tracking-ultrawide uppercase mb-5 font-bold">Solutions & Pricing</p>
          </FadeUp>
          <RevealText>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] max-w-3xl">
              Let&apos;s Take Your Brand to the Next Level
            </h1>
          </RevealText>
          <FadeUp delay={250}>
            <p className="text-white/35 text-base max-w-lg mt-6 leading-relaxed">
              Whether you&apos;re an individual or entrepreneur needing personal branding, an SME requiring strategic differentiation, or a large corporation needing operational structure \u2014 there&apos;s a solution here for you.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 1:1 SESSIONS */}
      <section className="bg-white py-16 md:py-28" aria-label="1:1 sessions">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-black text-center mb-12">1:1 With Pamela Williams</h2>
          </FadeUp>

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services1on1.map((s) => (
              <article
                key={s.title}
                className={`pricing-card group relative p-6 border h-full flex flex-col transition-all duration-600 ${
                  s.featured ? 'border-gold-500 bg-black text-white' : 'border-black/5 bg-white text-black hover:border-gold-500/40'
                }`}
                style={{ opacity: 0 }}
              >
                {s.featured && (
                  <div className="absolute top-0 right-0 bg-gold-500 text-black text-[8px] font-bold tracking-ultrawide uppercase px-3 py-1">Popular</div>
                )}
                <h3 className={`text-sm font-bold mb-1.5 ${s.featured ? 'text-white' : 'text-black'}`}>{s.title}</h3>
                <div className={`text-xl font-black mb-0.5 ${s.featured ? 'text-gold-400' : 'text-gold-500'}`}>{s.price}</div>
                {s.duration && <p className={`text-xs mb-4 ${s.featured ? 'text-white/30' : 'text-black/25'}`}>{s.duration}</p>}
                <p className={`text-xs mb-4 leading-relaxed ${s.featured ? 'text-white/40' : 'text-black/35'}`}>{s.what}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {s.getting.map((g, j) => (
                    <li key={j} className={`flex items-start gap-2 text-xs ${s.featured ? 'text-white/50' : 'text-black/40'}`}>
                      <span className={`shrink-0 mt-0.5 ${s.featured ? 'text-gold-400' : 'text-gold-500'}`}>&#10003;</span>
                      {g}
                    </li>
                  ))}
                </ul>
                <div className={`border-t pt-3 mb-4 ${s.featured ? 'border-white/10' : 'border-black/5'}`}>
                  <p className={`text-[8px] font-bold tracking-ultrawide uppercase mb-1.5 ${s.featured ? 'text-white/25' : 'text-black/20'}`}>Deliverables</p>
                  <ul className="space-y-1">
                    {s.deliverables.map((d, j) => (
                      <li key={j} className={`text-[10px] flex items-start gap-1.5 ${s.featured ? 'text-white/30' : 'text-black/25'}`}>
                        <span className="shrink-0">&#128196;</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/contact"
                  className={`block text-center py-2.5 text-[9px] font-bold tracking-ultrawide uppercase transition-all duration-300 hover:translate-y-[-1px] ${
                    s.featured ? 'bg-gold-500 text-black hover:bg-gold-400' : 'bg-black text-white hover:bg-gold-500 hover:text-black'
                  }`}
                >
                  Book Now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="bg-black py-16 md:py-28" aria-label="Events management">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-3">Events Management</h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="text-white/25 text-center max-w-lg mx-auto mb-12 text-sm">With the A-team at Allsweetness Events, you are in for the time of your life!</p>
          </FadeUp>

          <div ref={eventsGridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {eventsManagement.map((e) => (
              <article key={e.title} className="event-card group p-5 border border-white/8 hover:border-gold-400/40 transition-all duration-600" style={{ opacity: 0 }}>
                <h3 className="text-sm font-bold text-white/85 group-hover:text-gold-400 transition-colors duration-600 mb-2">{e.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed mb-3">{e.desc}</p>
                <p className="text-gold-400 font-bold text-xs">{e.price}</p>
              </article>
            ))}
          </div>

          <FadeUp delay={100}>
            <p className="text-gold-400/60 text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Specialized Categories</p>
          </FadeUp>
          <div className="grid sm:grid-cols-3 gap-4">
            {specializedEvents.map((e) => (
              <FadeUp key={e.title} delay={150}>
                <div className="p-5 border border-white/8">
                  <h4 className="text-sm font-bold text-white/80 mb-2">{e.title}</h4>
                  <p className="text-white/30 text-xs leading-relaxed">{e.desc}</p>
                  <p className="text-gold-400 font-bold text-xs mt-3">Custom Pricing</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER SERVICES */}
      <section className="bg-white py-16 md:py-28" aria-label="Other services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-black text-center mb-12">Other Services</h2>
          </FadeUp>

          <div ref={otherGridRef} className="grid md:grid-cols-3 gap-5">
            {otherServices.map((s) => (
              <article key={s.title} className="other-card group p-6 border border-black/5 hover:border-gold-500/40 transition-all duration-600" style={{ opacity: 0 }}>
                <h3 className="text-sm font-bold text-black mb-2">{s.title}</h3>
                <p className="text-black/35 text-xs leading-relaxed mb-4">{s.desc}</p>
                <Link
                  to="/contact"
                  className="inline-block mt-auto text-center w-full py-2.5 bg-black text-white text-[9px] font-bold tracking-ultrawide uppercase hover:bg-gold-500 hover:text-black transition-all duration-300"
                >
                  Get Quote
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

   {/* CTA */}
<section className="bg-gold-500 py-16 md:py-20" aria-label="Services call to action">
  <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
    <h2 className="text-2xl md:text-3xl font-black text-black mb-4">Ready to get started?</h2>
    <p className="text-black/60 text-sm mb-6">PR and Training services coming soon. Reach out to discuss your specific needs.</p>
    <Link
      to="/contact"
      className="inline-flex items-center gap-2 bg-black text-white px-8 py-3.5 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-black/80 transition-all duration-300"
    >
      Get in Touch
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
    </Link>
  </div>
</section>
    </div>
  );
}