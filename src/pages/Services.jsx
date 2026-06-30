import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useScrollTriggerRefresh, useGsapStagger } from '../hooks/useGsap';
import { FadeUp, RevealText } from '../components/GsapWrapper';
import { useBooking } from '../contexts/BookingContext';
import img3 from '../assets/img3.jpg';
import brandStrategyRateCard from '../assets/Pamela Williams Rate Card - Brand strategy.pdf';
import eventHostingRateCard from '../assets/Pamela Williams Rate Card Event Hosting.pdf';

const services1on1 = [
  {
    title: 'Personal Branding Session',
    price: '300,000 / $200',
    duration: '2 hours',
    what: 'For entrepreneurs, creatives, professionals, or thought leaders looking to establish a powerful personal brand.',
    getting: ['Brand Discovery & Identity Alignment', 'Personal Brand Storytelling', 'Social Media Positioning', 'Content Strategy Framework'],
    deliverables: ['Personal Brand Identity Guide', 'Content Strategy Framework', 'Personal Brand Growth Plan'],
  },
  {
    title: 'Brand Strategy & Development Consultation',
    price: '600,000 / $400',
    duration: '2 hours',
    featured: true,
    what: 'For launching a business, scaling an existing brand, or repositioning in a crowded market.',
    getting: ['Full Brand Audit & Competitive Analysis', 'Brand Positioning & Messaging Framework', 'Content & Marketing Strategy', 'Actionable Roadmap for Growth'],
    deliverables: ['Brand Audit Report', 'Brand Positioning & Messaging Guide', 'Marketing & Content Strategy Plan', '30-Day Brand Growth Plan'],
  },
  {
    title: 'Personal Development Guide & Coaching',
    price: '150,000 / $100',
    duration: 'Custom',
    what: 'If you struggle with confidence, visibility, communication, or positioning yourself as an authority.',
    getting: ['One-on-One Coaching on Self-Branding', 'Communication & Visibility Coaching', 'Professional Growth Roadmap'],
    deliverables: ['Self-Branding & Confidence Blueprint', 'Visibility & Influence Strategy Guide', 'Personal Growth Action Plan'],
  },
  {
    title: 'Business Systems & Structure Consultation',
    price: 'From 1,500,000 / $2,000',
    duration: '4 sessions (2 hours weekly)',
    what: 'If you want to scale efficiently, reduce operational stress, and ensure long-term sustainability.',
    getting: ['Business Model Structuring', 'Operational Workflow Optimization', 'Scaling Strategies for Growth'],
    deliverables: ['Business Structure & Operations Guide', 'Revenue Model & Scalability Plan', 'Business Growth & Efficiency Playbook'],
  },
];

const eventsManagement = [
  { title: 'Full Event Planning & Execution', desc: 'End-to-end event planning from concept to execution for individuals, brands, and corporate organizations.' },
  { title: 'Event Management (Execution Only)', desc: 'Professional oversight to execute your planned event seamlessly.' },
  { title: 'D-Day Coordination', desc: 'A professional team to coordinate the event on the actual day.' },
  { title: 'Event Consultation', desc: 'Expert guidance to plan your event while you execute it yourself. From 300,000 (SMEs) / 1,000,000 (Corporate)' },
];

const specializedEvents = [
  { title: 'Weddings', desc: 'Full-service wedding planning, coordination, and execution.' },
  { title: 'Anniversaries', desc: 'Elegant and memorable milestone celebrations.' },
  { title: 'Birthdays & Private Celebrations', desc: 'Customized parties from intimate gatherings to grand celebrations.' },
];

const brandStrategyDetails = [
  { title: 'Full Brand Audit & Competitive Analysis', desc: 'Comprehensive review of your brand\'s current positioning, market landscape, and competitive environment.' },
  { title: 'Brand Positioning & Messaging Framework', desc: 'Develop a clear, compelling brand position and messaging that resonates with your target audience.' },
  { title: 'Content & Marketing Strategy', desc: 'Data-driven content and marketing plans that align with your brand goals and drive measurable results.' },
  { title: 'Integrated Communications Approach', desc: 'Cohesive communication strategies across all channels — digital, traditional, and experiential.' },
  { title: 'Personal Branding Strategy & Thought Leadership', desc: 'Position key individuals as industry authorities through strategic content and media placement.' },
  { title: 'Narrative-Driven Communication', desc: 'Craft emotionally compelling brand stories that build trust, loyalty, and long-term connection.' },
];

const prServices = [
  { title: 'Media Relations & Press Coverage', desc: 'Secure coverage in top-tier publications, blogs, and broadcast media to amplify your brand\'s reach.' },
  { title: 'Reputation Management', desc: 'Build, protect, and manage your brand\'s public perception through proactive strategies.' },
  { title: 'Press Release Writing & Distribution', desc: 'Professional press releases crafted for impact and distributed to relevant media channels.' },
  { title: 'Crisis Communications Strategy', desc: 'Prepare for and navigate reputational challenges with clear, effective communication plans.' },
  { title: 'Media Training & Coaching', desc: 'Equip your team with the skills to handle interviews, press interactions, and public speaking.' },
];

const hostingServices = [
  { title: 'Conference Hosting', desc: 'Professional compere services for corporate conferences, summits, and tech events.' },
  { title: 'Panel Moderation', desc: 'Expert moderation that keeps discussions engaging, balanced, and impactful.' },
  { title: 'Keynote Speaking', desc: 'Inspiring keynotes on branding, business growth, digital strategy, and personal development.' },
  { title: 'Awards Night Hosting', desc: 'Elegant and engaging hosting for award ceremonies and gala nights.' },
  { title: 'Brand Launch Events', desc: 'Hosting and creative direction for product and brand launch events.' },
];

const scriptwritingTiers = [
  { duration: '1-minute', price: '250,000' },
  { duration: '5-minute', price: '800,000' },
  { duration: '10-minute', price: '1,500,000' },
  { duration: '30-minute', price: '4,000,000' },
];

const hrServices = [
  { title: 'HR Strategy Development', price: '1,000,000', desc: 'Comprehensive HR strategy aligned with your business goals and culture.' },
  { title: 'Employee Handbook Creation', price: '500,000', desc: 'Professional handbook covering policies, culture, and operational guidelines.' },
  { title: 'Recruitment Setup & Process Design', price: '1,500,000', desc: 'End-to-end recruitment system design from job descriptions to onboarding.' },
  { title: 'Per Hire Recruitment', price: '10\u201320% of annual salary', desc: 'Targeted talent acquisition for specific roles across industries.' },
];

const trainingTopics = [
  { title: 'Content Creation', desc: 'Learn to create compelling content that drives engagement and conversions.' },
  { title: 'Social Media Management', desc: 'Master platform-specific strategies for growth and community building.' },
  { title: 'Digital Marketing', desc: 'Data-driven marketing strategies across SEO, paid ads, and organic channels.' },
  { title: 'Branding & Storytelling', desc: 'Build brands that connect emotionally and stand out in crowded markets.' },
  { title: 'AI-Powered Website Development', desc: 'Leverage AI tools to build professional websites quickly and efficiently.' },
  { title: 'Product Photography', desc: 'Capture product images that sell — from setup to post-production.' },
  { title: 'Personal Branding ("Unmute Yourself" Series)', desc: 'A deep-dive series on building a bold, authentic, unapologetic personal brand.' },
];

function BookNowBtn({ variant = 'filled', className = '' }) {
  const { openModal } = useBooking();

  const styles = {
    filled: 'bg-black text-white hover:bg-[#D4AF37] hover:text-black',
    outline: 'bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black',
    gold: 'bg-[#D4AF37] text-black hover:bg-[#e0bd4a]',
    'filled-light': 'bg-white text-black hover:bg-[#D4AF37] hover:text-black',
  };

  return (
    <button
      onClick={(e) => { e.preventDefault(); openModal(); }}
      className={`w-full block text-center py-2.5 text-[9px] font-bold tracking-ultrawide uppercase transition-all duration-300 hover:translate-y-[-1px] cursor-pointer ${styles[variant] || styles.filled} ${className}`}
    >
      Book Now
    </button>
  );
}

function RateCardBtn({ fileUrl, fileName, label = 'Download Rate Card' }) {
  const handleDownload = useCallback(() => {
    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => document.body.removeChild(link), 200);
    } catch {
      window.open(fileUrl, '_blank');
    }
  }, [fileUrl, fileName]);

  return (
    <button
      onClick={handleDownload}
      type="button"
      className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#D4AF37] text-black text-[9px] font-bold tracking-ultrawide uppercase hover:bg-[#e0bd4a] transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)] cursor-pointer"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      {label}
    </button>
  );
}

export default function Services() {
  const gridRef = useRef(null);
  const eventsGridRef = useRef(null);
  const specializedRef = useRef(null);
  const brandGridRef = useRef(null);
  const prGridRef = useRef(null);
  const hostingGridRef = useRef(null);
  const scriptGridRef = useRef(null);
  const hrGridRef = useRef(null);
  const trainingGridRef = useRef(null);

  useScrollTriggerRefresh();
  useGsapStagger(gridRef, '.pricing-card', 0.08);
  useGsapStagger(eventsGridRef, '.event-card', 0.08);
  useGsapStagger(specializedRef, '.specialized-card', 0.08);
  useGsapStagger(brandGridRef, '.brand-item', 0.06);
  useGsapStagger(prGridRef, '.pr-item', 0.06);
  useGsapStagger(hostingGridRef, '.hosting-item', 0.06);
  useGsapStagger(scriptGridRef, '.script-item', 0.06);
  useGsapStagger(hrGridRef, '.hr-item', 0.06);
  useGsapStagger(trainingGridRef, '.training-item', 0.05);

  return (
    <div>
      {/* HERO */}
      <section className="relative py-28 md:py-40 bg-black overflow-hidden" aria-label="Services overview">
        <div className="absolute inset-0 opacity-8">
          <img src={img3} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-[#D4AF37]/70 text-[10px] tracking-ultrawide uppercase mb-5 font-bold">Solutions & Pricing</p>
          </FadeUp>
          <RevealText>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] max-w-3xl">
              Let&apos;s Take Your Brand to the Next Level
            </h1>
          </RevealText>
          <FadeUp delay={250}>
            <p className="text-white/35 text-base max-w-lg mt-6 leading-relaxed">
              Whether you&apos;re an individual or entrepreneur needing personal branding, an SME requiring strategic differentiation, or a large corporation needing operational structure — there&apos;s a solution here for you.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 1:1 SESSIONS */}
      <section className="bg-white py-16 md:py-28" aria-label="1:1 sessions">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-black text-center mb-4">1:1 With Pamela Williams</h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="text-black/50 text-sm text-center max-w-xl mx-auto mb-12">Intensive, results-driven sessions tailored to your specific needs and goals.</p>
          </FadeUp>

          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services1on1.map((s) => (
              <article
                key={s.title}
                className={`pricing-card group relative p-6 border h-full flex flex-col transition-all duration-600 ${
                  s.featured ? 'border-[#D4AF37] bg-black text-white' : 'border-black/5 bg-white text-black hover:border-[#D4AF37]/40'
                }`}
                style={{ opacity: 0 }}
              >
                {s.featured && (
                  <div className="absolute top-0 right-0 bg-[#D4AF37] text-black text-[8px] font-bold tracking-ultrawide uppercase px-3 py-1">Popular</div>
                )}
                <h3 className={`text-sm font-bold mb-1.5 ${s.featured ? 'text-white' : 'text-black'}`}>{s.title}</h3>
                <div className="text-xl font-black mb-0.5 text-[#D4AF37]">{s.price}</div>
                {s.duration && <p className={`text-xs mb-4 ${s.featured ? 'text-white/30' : 'text-black/25'}`}>{s.duration}</p>}
                <p className={`text-xs mb-4 leading-relaxed ${s.featured ? 'text-white/50' : 'text-black/50'}`}>{s.what}</p>
                <ul className="space-y-1.5 mb-4 flex-1">
                  {s.getting.map((g, j) => (
                    <li key={j} className={`flex items-start gap-2 text-xs ${s.featured ? 'text-white/50' : 'text-black/50'}`}>
                      <span className="shrink-0 mt-0.5 text-[#D4AF37]">&#10003;</span>
                      {g}
                    </li>
                  ))}
                </ul>
                <div className={`border-t pt-3 mb-4 ${s.featured ? 'border-white/10' : 'border-black/5'}`}>
                  <p className={`text-[8px] font-bold tracking-ultrawide uppercase mb-1.5 ${s.featured ? 'text-white/25' : 'text-black/20'}`}>Deliverables</p>
                  <ul className="space-y-1">
                    {s.deliverables.map((d, j) => (
                      <li key={j} className={`text-[10px] flex items-start gap-1.5 ${s.featured ? 'text-white/30' : 'text-black/30'}`}>
                        <span className="shrink-0">&#128196;</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <BookNowBtn variant={s.featured ? 'gold' : 'filled'} />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS MANAGEMENT */}
      <section className="bg-black py-16 md:py-28" aria-label="Events management">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4">Events Management</h2>
          </FadeUp>
          <FadeUp delay={80}>
            <p className="text-white/40 text-sm text-center max-w-lg mx-auto mb-12">With the A-team at Allsweetness Events, you are in for the time of your life!</p>
          </FadeUp>

          <div ref={eventsGridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {eventsManagement.map((e) => (
              <article key={e.title} className="event-card group p-5 border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-600 flex flex-col" style={{ opacity: 0 }}>
                <h3 className="text-sm font-bold text-white/85 group-hover:text-[#D4AF37] transition-colors duration-600 mb-2">{e.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4 flex-1">{e.desc}</p>
                <BookNowBtn variant="outline" />
              </article>
            ))}
          </div>

          <p className="text-[#D4AF37]/60 text-[10px] tracking-ultrawide uppercase mb-6 font-bold text-center">Specialized Categories</p>
          <div ref={specializedRef} className="grid sm:grid-cols-3 gap-4">
            {specializedEvents.map((e) => (
              <article key={e.title} className="specialized-card group p-5 border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-600 flex flex-col" style={{ opacity: 0 }}>
                <h4 className="text-sm font-bold text-white/80 group-hover:text-[#D4AF37] transition-colors duration-600 mb-2">{e.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed flex-1">{e.desc}</p>
                <BookNowBtn variant="outline" className="mt-4" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STRATEGY & COMMUNICATIONS */}
      <section className="bg-white py-16 md:py-28" aria-label="Brand strategy and communications">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            <div>
              <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold">Strategy</p>
              <h2 className="text-2xl md:text-3xl font-black text-black mb-6">Brand Strategy & Communications</h2>
              <p className="text-black/60 text-sm leading-relaxed mb-6">
                Comprehensive brand strategy services for organizations looking to launch, scale, or reposition. From full audits to narrative-driven communication — every framework is tailored to your unique goals and market.
              </p>
              <RateCardBtn fileUrl={brandStrategyRateCard} fileName="Pamela Williams Rate Card - Brand Strategy.pdf" label="Download Brand Strategy Rate Card" />
            </div>
            <div>
              <div className="p-6 bg-black">
                <p className="text-[#D4AF37] text-[9px] tracking-ultrawide uppercase font-bold mb-3">Trusted By</p>
                <p className="text-white text-sm leading-relaxed mb-4">
                  Pamela has developed brand strategies for executives, founders, and organizations including:
                </p>
                <ul className="space-y-2">
                  {['Oyewole Joledo — Country Director, Social Good Fund Africa', 'Serah Makka — Executive Director, One Africa', 'Jakpo Ukueku — CEO, Rayven Strategic Communications', 'Ijeoma Aladesaye — GCEO, Servelead Group', 'George Okoro — CEO, George Okoro Studios', 'Lady George Okoro — CEO, Mind and Mother Africa', 'Alex Ogbe — Founder, Atilary Studios'].map((name) => (
                    <li key={name} className="flex items-start gap-2 text-white/50 text-xs">
                      <span className="text-[#D4AF37] shrink-0 mt-0.5">&#9670;</span>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div ref={brandGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brandStrategyDetails.map((item) => (
              <article key={item.title} className="brand-item group p-5 border border-black/5 hover:border-[#D4AF37]/40 transition-all duration-600" style={{ opacity: 0 }}>
                <h4 className="text-sm font-bold text-black mb-2 group-hover:text-[#b8962e] transition-colors duration-300">{item.title}</h4>
                <p className="text-black/50 text-xs leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BookNowBtn variant="filled" className="!w-auto !px-8" />
            <span className="text-black/30 text-[10px] tracking-ultrawide uppercase">Training available for this service</span>
          </div>
        </div>
      </section>

      {/* PR SERVICES */}
      <section className="bg-black py-16 md:py-28" aria-label="PR services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37]/70 text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Public Relations</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4">PR Services</h2>
          <p className="text-white/40 text-sm text-center max-w-lg mx-auto mb-12">
            Strategic public relations to amplify your brand&apos;s voice, manage your reputation, and secure meaningful media coverage.
          </p>

          <div ref={prGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prServices.map((item) => (
              <article key={item.title} className="pr-item group p-5 border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-600" style={{ opacity: 0 }}>
                <h4 className="text-sm font-bold text-white/85 group-hover:text-[#D4AF37] transition-colors duration-600 mb-2">{item.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <BookNowBtn variant="outline" className="!w-auto !px-8" />
            <span className="text-white/30 text-[10px] tracking-ultrawide uppercase">Training available for this service</span>
          </div>
        </div>
      </section>

      {/* EVENT HOSTING & PUBLIC SPEAKING */}
      <section className="bg-white py-16 md:py-28" aria-label="Event hosting and public speaking">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            <div>
              <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold">The Stage</p>
              <h2 className="text-2xl md:text-3xl font-black text-black mb-6">Event Hosting & Public Speaking</h2>
              <p className="text-black/60 text-sm leading-relaxed mb-4">
                A highly sought-after host and speaker with experience across diplomatic events, tech conferences, awards ceremonies, and corporate gatherings. Pamela brings grace, authority, and an unforgettable presence to every stage.
              </p>
              <p className="text-black/50 text-xs leading-relaxed mb-8">
                Has hosted for the French Embassy in Nigeria, Respectech Conference (1,500+ attendees), Innovate Africa, Clarity Conference, Lagos Business School Sustainability Forum, Women in Bitcoin, and many more.
              </p>
              <RateCardBtn fileUrl={eventHostingRateCard} fileName="Pamela Williams Rate Card - Event Hosting.pdf" label="Download Event Hosting Rate Card" />
            </div>
            <div>
              <div className="p-6 bg-[#D4AF37]">
                <p className="text-black text-[9px] tracking-ultrawide uppercase font-bold mb-3">Speaking Topics</p>
                <ul className="space-y-2.5">
                  {['Building Brands That Last', 'The Power of Personal Branding', 'Digital Marketing Masterclass', 'From Plans to Impact: Delivering Results', 'Mindset: Reframing Failure & Building Resilience', 'The Art of Networking', 'Your Personal Brand: The Story You Tell Without Speaking'].map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-black/70 text-xs">
                      <span className="text-black shrink-0 mt-0.5">&#9670;</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div ref={hostingGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hostingServices.map((item) => (
              <article key={item.title} className="hosting-item group p-5 border border-black/5 hover:border-[#D4AF37]/40 transition-all duration-600" style={{ opacity: 0 }}>
                <h4 className="text-sm font-bold text-black mb-2 group-hover:text-[#b8962e] transition-colors duration-300">{item.title}</h4>
                <p className="text-black/50 text-xs leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <BookNowBtn variant="filled" className="!w-auto !px-8" />
            <span className="text-black/30 text-[10px] tracking-ultrawide uppercase">Training available for this service</span>
          </div>
        </div>
      </section>

      {/* SCRIPTWRITING */}
      <section className="bg-black py-16 md:py-28" aria-label="Scriptwriting services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37]/70 text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Creative Writing</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4">Scriptwriting</h2>
          <p className="text-white/40 text-sm text-center max-w-lg mx-auto mb-12">
            Custom scriptwriting for commercials, digital media, documentaries, brand storytelling, and film content.
          </p>

          <div ref={scriptGridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scriptwritingTiers.map((tier) => (
              <article key={tier.duration} className="script-item group p-5 border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-600 text-center" style={{ opacity: 0 }}>
                <p className="text-white/40 text-[10px] tracking-ultrawide uppercase mb-2">{tier.duration}</p>
                <p className="text-[#D4AF37] text-xl font-black mb-4">{tier.price}</p>
                <BookNowBtn variant="outline" />
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-white/30 text-[10px] tracking-ultrawide uppercase">Training available for this service</span>
          </div>
        </div>
      </section>

      {/* HR & RECRUITMENT */}
      <section className="bg-white py-16 md:py-28" aria-label="HR and recruitment services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Human Resources</p>
          <h2 className="text-2xl md:text-3xl font-black text-black text-center mb-4">HR & Recruitment</h2>
          <p className="text-black/50 text-sm text-center max-w-lg mx-auto mb-12">
            Building strong workplace cultures, implementing efficient operations, and finding the right talent for your organization.
          </p>

          <div ref={hrGridRef} className="grid sm:grid-cols-2 gap-4">
            {hrServices.map((item) => (
              <article key={item.title} className="hr-item group p-6 border border-black/5 hover:border-[#D4AF37]/40 transition-all duration-600" style={{ opacity: 0 }}>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="text-sm font-bold text-black group-hover:text-[#b8962e] transition-colors duration-300">{item.title}</h4>
                  <span className="text-[#D4AF37] font-bold text-xs shrink-0">{item.price}</span>
                </div>
                <p className="text-black/50 text-xs leading-relaxed mb-4">{item.desc}</p>
                <BookNowBtn variant="filled" />
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="text-black/30 text-[10px] tracking-ultrawide uppercase">Training available for this service</span>
          </div>
        </div>
      </section>

      {/* TRAINING & DEVELOPMENT */}
      <section className="bg-black py-16 md:py-28" aria-label="Training and development">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37]/70 text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Capacity Building</p>
          <h2 className="text-2xl md:text-3xl font-black text-white text-center mb-4">Training & Development</h2>
          <p className="text-white/40 text-sm text-center max-w-xl mx-auto mb-4">
            Available as a standalone service or as an add-on to ANY of the services listed above. Pamela has trained hundreds of emerging entrepreneurs, creatives, and professionals across these areas:
          </p>
          <div className="flex justify-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] tracking-ultrawide uppercase font-bold">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Available for all services
            </span>
          </div>

          <div ref={trainingGridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {trainingTopics.map((topic) => (
              <article key={topic.title} className="training-item group p-5 border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-600" style={{ opacity: 0 }}>
                <h4 className="text-sm font-bold text-white/85 group-hover:text-[#D4AF37] transition-colors duration-600 mb-2">{topic.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{topic.desc}</p>
              </article>
            ))}
          </div>

          <div className="p-6 border border-[#D4AF37]/20 bg-[#D4AF37]/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-white font-bold text-sm mb-1">Landmark Collaboration</h3>
                <p className="text-white/40 text-xs">National Gallery of Art, Nigeria — Quarterly nationwide training across 25 centers, staff capacity building, and creative workshops for children.</p>
              </div>
              <BookNowBtn variant="gold" className="!w-auto !px-8 shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D4AF37] py-16 md:py-20" aria-label="Services call to action">
        <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-black mb-4">Ready to get started?</h2>
          <p className="text-black/60 text-sm mb-6">Not sure which service fits? Book a session and let&apos;s figure it out together.</p>
          <BookNowBtn variant="filled-light" className="!w-auto !inline-flex !px-10 !py-3.5" />
        </div>
      </section>
    </div>
  );
}