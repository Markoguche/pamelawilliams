import { useRef } from 'react';
import { useScrollTriggerRefresh, useGsapStagger } from '../hooks/useGsap';
import { FadeUp, SlideLeft, SlideRight, RevealText } from '../components/GsapWrapper';
import img2 from '../assets/img2.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const ExpertiseIcon = () => (
  <svg className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const PartnerIcon = () => (
  <svg className="w-3.5 h-3.5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9-9a9 9 0 019-9m0 18a9 9 0 01-9-9" />
  </svg>
);

const AwardIcon = ({ filled = false }) => (
  <svg className={`w-4 h-4 shrink-0 mt-0.5 ${filled ? 'text-gold-500' : 'text-gold-500/70'}`} fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14l-1.5 9H6.5L5 3zM12 12v6M9 18l3 3 3-3M9 18l-1.5 2M15 18l1.5 2" />
  </svg>
);

const TrainingIcon = () => (
  <svg className="w-3.5 h-3.5 text-gold-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 20.777 5.754 21.253 7.5 21.253h9c1.746 0 3.252-.476 4.5-1.253M13 11l-1.5 5.5M8.25 11h7.5" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 text-gold-500/50 group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all duration-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

const expertise = [
  'Brand and Marketing Strategy',
  'Storytelling',
  'Digital Marketing and Social Media Management',
  'Experience Curation and Events Management',
  'Project Management for High-Stakes Initiatives',
  'Public Speaking and Hosting',
  'Partnership Development Management and Stakeholder Relations',
  'Content Development and Creative Direction',
];

const partners = [
  'French Embassy in Nigeria',
  'U.S. Embassy in Nigeria',
  'Social Good Fund, California',
  'Community Dojo of Davis, California',
  'Social Good, Africa',
  'Plastic Planet, South Africa',
  'Servelead Global',
  'Served Humanitarian Initiative',
  'Timewise Logistics',
  'Rescuetap',
  'Respectech HR',
  'Laicos Farms',
  'Rayven Strategic Communications',
  'Roadlamp Ltd',
  'George Okoro Studios',
  'Lafeya Seniors',
];

const ventures = [
  { num: '01', name: 'Aidos Creations', role: 'CEO', desc: 'A digital media agency powering brands across Africa and the diaspora through strategy, visibility, systems, and storytelling.' },
  { num: '02', name: 'Girlstuffng', role: 'Founder', desc: 'A youth-focused fashion brand that empowers individuals to express their confidence and style.' },
  { num: '03', name: 'Allsweetnessng', role: 'Founder', desc: 'A healthy lifestyle and wellness brand dedicated to promoting wellness and mindful living.' },
  { num: '04', name: 'Allsweetness Events', role: 'Founder', desc: 'A premium events management company that curates world-class, unforgettable experiences.' },
  { num: '05', name: 'Starlights Africa', role: 'Founder', desc: 'A community for purpose-driven individuals focused on youth empowerment and purpose discovery.' },
  { num: '06', name: 'Cremetalent Africa', role: 'Founder', desc: 'A human resource management company helping businesses recruit top talent and optimize workplace culture.' },
];

const awards2024 = [
  'Most Punctual Staff — Servelead Group',
  'Most Resourceful Staff — Servelead Group',
  'Most Creative and Innovative Staff — Servelead Group',
  'Best Dressed Staff — Servelead Group',
  'Staff of the Year — Aidos Creations',
  'Award of Appreciation — Servelead Humanitarian Initiative Peace Ambassadors Program',
];

const previousAwards = [
  'Award of Recognition in Media and Communications (2023) — SME 100 Africa\'s 25 Under 25',
  'LEADERCOM Winner (2022) — Social Good Fund, California',
  'Award of Excellence (2022) — Servelead Group of Companies',
  'The Staff of the Year (2022) — Servelead Group of Companies',
  'Most Punctual Staff (2022) — Servelead Group of Companies',
  'Most Resourceful (2022) — Servelead Group of Companies',
  'Entrepreneur of the Year (2021) — Rhema Chapel Campus Fellowship',
];

const academicAwards = [
  'Best Graduating Student (2014) — Touchstone High School',
  'Best in Chemistry, Physics & Biology (2014) — Touchstone High School',
  'Most Sanitary Student (3 years in a row, 2012–2014) — Touchstone High School',
  'Best Graduating Student (2008) — Nobles International School',
];

const trainingTopics = [
  'Content Creation',
  'Social Media Management',
  'Digital Marketing',
  'Branding & Storytelling',
  'AI-Powered Website Development',
  'Product Photography',
  'Personal Branding ("Unmute Yourself" Series)',
];

export default function About() {
  const expertiseRef = useRef(null);
  const partnersRef = useRef(null);
  const venturesRef = useRef(null);
  const awards2024Ref = useRef(null);
  const previousAwardsRef = useRef(null);
  const academicRef = useRef(null);
  const trainingRef = useRef(null);

  useScrollTriggerRefresh();
  useGsapStagger(expertiseRef, '.expertise-item', 0.06);
  useGsapStagger(partnersRef, '.partner-item', 0.04);
  useGsapStagger(venturesRef, '.venture-card', 0.08);
  useGsapStagger(awards2024Ref, '.award-item', 0.04);
  useGsapStagger(previousAwardsRef, '.award-item', 0.04);
  useGsapStagger(academicRef, '.award-item', 0.04);
  useGsapStagger(trainingRef, '.training-item', 0.05);

  return (
    <div>
      {/* ═══════ ABOUT HERO ═══════ */}
      <section className="relative min-h-[80vh] md:min-h-[100vh] flex items-end bg-black overflow-hidden" aria-label="About Pamela Williams">
        <div className="absolute inset-0">
          <img 
            src={img5} 
            alt="" 
            className="w-full h-full object-cover object-top" 
            loading="eager"
            aria-hidden="true"
            style={{ objectPosition: 'center 20%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 md:pb-20 w-full">
          <FadeUp>
            <p className="text-gold-400/70 text-[10px] tracking-ultrawide uppercase mb-5 font-bold">About Me.</p>
          </FadeUp>
          <RevealText>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] max-w-3xl mb-6">
              Pamela Williams
            </h1>
          </RevealText>
          <FadeUp delay={200}>
            <p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">
              Global Creative Luminary, shaping the future of media, branding, communications, and experiences across Africa and the world.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══════ BIO ═══════ */}
     <section className="bg-white py-16 md:py-28" aria-label="Detailed biography">
  <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
    <div className="grid lg:grid-cols-5 gap-6 lg:gap-16 items-start">
      <div className="lg:col-span-2">
        <SlideLeft>
          <div className="lg:sticky lg:top-28">
            <div className="w-full">
              <img 
                src={img2} 
                alt="Pamela Williams Creative Industrialist" 
                className="w-full h-auto object-cover object-top img-grayscale img-zoom rounded-sm" 
                loading="lazy" 
                style={{ filter: 'grayscale(100%)', transition: 'filter 0.7s ease' }}
                onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
              />
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="w-10 h-px bg-gold-500" />
              <p className="text-black/25 text-[9px] tracking-ultrawide uppercase">5+ Years of Impact</p>
            </div>
          </div>
        </SlideLeft>
      </div>

      <div className="lg:col-span-3 lg:pt-8">
        <p className="text-black/55 text-base leading-relaxed mb-3 md:mb-5">
          Pamela Williams is a Creative Industrialist and award-winning Brand, Marketing, and Communications Strategist whose work sits at the intersection of creativity, strategy, and global impact.
        </p>
        <p className="text-black/55 text-base leading-relaxed mb-3 md:mb-5">
          Widely recognized for empowering brands, championing creativity, and transforming ideas into revenue, she has built an international footprint through her work with diplomatic bodies, global institutions, creative enterprises, NGOs, corporates, and high-growth startups.
        </p>
        <p className="text-black/55 text-base leading-relaxed mb-3 md:mb-5">
          A dynamic force with multidimensional expertise, Pamela helps organizations elevate their visibility, sharpen their identity, and scale their influence through a mastery of creative direction, experience curation, project management, digital marketing, brand strategy, content development, storytelling, and strategic communications.
        </p>
        <div className="border-l-2 border-gold-500 pl-5 my-5 md:my-8">
          <p className="text-black font-bold text-base md:text-lg leading-snug">
            Her commitment is simple yet powerful: help brands and individuals stand out, stay unforgettable, and achieve measurable success.
          </p>
        </div>
        <h3 className="text-[9px] tracking-ultrawide uppercase text-gold-500 font-bold mb-4 md:mb-5">Core Expertise</h3>
        <div ref={expertiseRef}>
          {expertise.map((item) => (
            <div key={item} className="expertise-item flex items-start gap-3 py-2 md:py-2.5 border-b border-black/5 group cursor-default" style={{ opacity: 0 }}>
              <ExpertiseIcon />
              <span className="text-black/55 text-sm group-hover:text-black transition-colors duration-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

      {/* ═══════ VENTURES ═══════ */}
      <section className="bg-black py-16 md:py-28" aria-label="Business ventures">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-gold-400/70 text-[10px] tracking-ultrawide uppercase mb-4 font-bold text-center">Ventures</p>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className="text-2xl md:text-4xl font-black text-white text-center mb-3">Brands I&apos;ve Built</h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-white/25 text-center max-w-lg mx-auto mb-12 text-sm">A multi-sector founder building brands that reflect passion for creativity, strategy, lifestyle, and community. Her companies have supported over 100 brands.</p>
          </FadeUp>

          <div ref={venturesRef} className="space-y-3">
            {ventures.map((v) => (
              <article
                key={v.name}
                className="venture-card group grid md:grid-cols-12 gap-3 md:gap-6 items-center p-5 md:p-7 border border-white/8 hover:border-gold-400/40 transition-all duration-600"
                style={{ opacity: 0 }}
              >
                <div className="md:col-span-1">
                  <span className="text-gold-500/70 text-xl md:text-2xl font-black group-hover:text-gold-400 transition-colors duration-600">{v.num}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-lg font-bold text-white/90 group-hover:text-gold-400 transition-colors duration-600">{v.name}</h3>
                  <p className="text-gold-400/70 text-[10px] font-bold tracking-ultrawide uppercase mt-0.5">{v.role}</p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-white/35 group-hover:text-white/55 text-sm leading-relaxed transition-colors duration-600">{v.desc}</p>
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <ArrowIcon />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TRAINING ═══════ */}
      <section className="bg-white py-16 md:py-24" aria-label="Training expertise">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-gold-500 text-[10px] tracking-ultrawide uppercase mb-4 font-bold">Training</p>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className="text-2xl md:text-3xl font-black text-black mb-3">Areas of Training</h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-black/35 text-sm mb-10 max-w-lg">Pamela has trained hundreds of emerging entrepreneurs, creators, and professionals across:</p>
          </FadeUp>
          <div ref={trainingRef} className="flex flex-wrap gap-2.5">
            {trainingTopics.map((topic) => (
              <span
                key={topic}
                className="training-item flex items-center gap-2 px-5 py-2.5 border border-black/10 text-black/45 text-sm hover:border-gold-500 hover:text-gold-600 transition-all duration-500 cursor-default"
                style={{ opacity: 0 }}
              >
                <TrainingIcon />
                {topic}
              </span>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="mt-14 p-6 bg-black rounded-sm">
              <p className="text-gold-400 text-[9px] tracking-ultrawide uppercase font-bold mb-2">Landmark Collaboration</p>
              <h3 className="text-white font-black text-xl mb-3">National Gallery of Art, Nigeria</h3>
              <p className="text-white/35 text-sm leading-relaxed mb-4">
                Leading a landmark collaboration to provide quarterly nationwide social media training, creative workshops for children across 25 centers, staff capacity building, brand repositioning, event curation and communications strategy, and funding partnership support.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Quarterly Training', '25 Centers', 'Brand Repositioning', 'Event Curation', 'Funding Support'].map((t) => (
                  <span key={t} className="px-4 py-1.5 bg-gold-500 text-black text-[9px] font-bold tracking-ultrawide uppercase">{t}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════ AWARDS ═══════ */}
      <section className="bg-black py-16 md:py-28" aria-label="Awards and recognition">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <SlideLeft>
                <div className="lg:sticky lg:top-28">
                  <div className="w-full">
                    <img 
                      src={img4} 
                      alt="Pamela Williams receiving awards" 
                      className="w-full h-auto object-cover object-top img-grayscale img-zoom rounded-sm" 
                      loading="lazy"
                      style={{ filter: 'grayscale(100%)', transition: 'filter 0.7s ease' }}
                      onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                      onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                    />
                  </div>
                  <div className="mt-5 p-5 bg-gold-500 rounded-sm">
                    <p className="text-black font-black text-2xl mb-1">20+</p>
                    <p className="text-black/45 text-[9px] tracking-ultrawide uppercase font-bold">Awards & Recognitions</p>
                  </div>
                </div>
              </SlideLeft>
            </div>
            <div className="lg:col-span-3 space-y-8 lg:pt-8">
              <SlideRight delay={80}>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Awards & Achievements</h2>
              </SlideRight>

              <div>
                <SlideRight delay={160}>
                  <h3 className="flex items-center gap-2.5 mb-4">
                    <AwardIcon filled />
                    <span className="text-sm font-black text-white">2024 Awards</span>
                  </h3>
                </SlideRight>
                <div ref={awards2024Ref}>
                  {awards2024.map((a, i) => (
                    <div key={i} className="award-item flex items-start gap-2.5 py-2 border-b border-white/5" style={{ opacity: 0 }}>
                      <AwardIcon />
                      <span className="text-white/40 text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SlideRight delay={240}>
                  <h3 className="flex items-center gap-2.5 mb-4">
                    <AwardIcon />
                    <span className="text-sm font-black text-white">Previous Awards</span>
                  </h3>
                </SlideRight>
                <div ref={previousAwardsRef}>
                  {previousAwards.map((a, i) => (
                    <div key={i} className="award-item flex items-start gap-2.5 py-2 border-b border-white/5" style={{ opacity: 0 }}>
                      <AwardIcon />
                      <span className="text-white/40 text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SlideRight delay={320}>
                  <h3 className="flex items-center gap-2.5 mb-4">
                    <TrainingIcon />
                    <span className="text-sm font-black text-white">Academic & Early</span>
                  </h3>
                </SlideRight>
                <div ref={academicRef}>
                  {academicAwards.map((a, i) => (
                    <div key={i} className="award-item flex items-start gap-2.5 py-2 border-b border-white/5" style={{ opacity: 0 }}>
                      <AwardIcon />
                      <span className="text-white/40 text-sm">{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ PARTNERS ═══════ */}
      <section className="bg-white py-14 md:py-20" aria-label="International partners">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-gold-500 text-[10px] tracking-ultrawide uppercase mb-3 font-bold text-center">Global Reach</p>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className="text-2xl md:text-3xl font-black text-black text-center mb-3">International Partners</h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-black/30 text-center max-w-lg mx-auto mb-10 text-sm">Collaborated with top-tier global institutions across diplomacy, development, and creative industries. Her international versatility has made her a trusted partner for initiatives focused on youth empowerment, digital inclusion, cultural exchange, education, social impact, and global development.</p>
          </FadeUp>
          <div ref={partnersRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {partners.map((p) => (
              <div key={p} className="partner-item flex items-center gap-2 border border-black/8 p-3.5 text-black/35 text-xs text-center hover:border-gold-500/40 hover:text-gold-600 transition-all duration-500 cursor-default" style={{ opacity: 0 }}>
                <PartnerIcon />
                <span className="text-left">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}