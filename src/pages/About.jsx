import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, Globe, Award, BookOpen } from 'lucide-react';
import { useScrollTriggerRefresh, useGsapStagger } from '../hooks/useGsap';
import { FadeUp, SlideLeft, RevealText } from '../components/GsapWrapper';
import img2 from '../assets/img2.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const expertise = [
  'Brand and Marketing Strategy', 'Storytelling', 'Digital Marketing and Social Media Management',
  'Experience Curation and Events Management', 'Project Management for High-Stakes Initiatives',
  'Public Speaking and Hosting', 'Partnership Development Management and Stakeholder Relations', 'Content Development and Creative Direction',
];

const partners = ['French Embassy in Nigeria', 'U.S. Embassy in Nigeria', 'Social Good Fund, California', 'Community Dojo of Davis, California', 'Social Good, Africa', 'Plastic Planet, South Africa', 'Servelead Global', 'Served Humanitarian Initiative', 'Timewise Logistics', 'Rescuetap', 'Respectech HR', 'Laicos Farms', 'Rayven Strategic Communications', 'Roadlamp Ltd', 'George Okoro Studios', 'Lafeya Seniors'];

const awards2025 = ['Recognition of Excellence — Keynote Speaker at The High Value Woman: The Awakening', 'Company of the Year — Aidos Creations (Servelead Group)', 'Staff of the Year — Servelead Group of Companies', 'Staff of the Year — Aidos Creations (Servelead Group)', 'Sales Achievement Award — Servelead Group of Companies', 'Most Punctual (Female) — Servelead Group of Companies', 'Most Resourceful Staff — Servelead Group of Companies', 'Award of Excellence in AI Content Creation Training — Dinovate Creative Academy'];

const awards2024 = ['Most Punctual (Female) — Servelead Group of Companies', 'Most Resourceful (Female) — Servelead Group of Companies', 'Most Creative and Innovative — Servelead Group of Companies', 'Staff of the Year (Aidos Creations) — Servelead Group of Companies', 'Award of Appreciation — Servelead Humanitarian Initiative Peace Ambassadors Program'];

const previousAwards = ["Award of Recognition in Media and Communications (2023) — SME 100 Africa's 25 Under 25", 'LEADERCOM Winner (2022) — Social Good Fund, California', 'Award of Excellence (2022) — Servelead Group of Companies', 'The Staff of the Year (2022) — Servelead Group of Companies', 'Most Punctual Staff (2022) — Servelead Group of Companies', 'Most Resourceful (2022) — Servelead Group of Companies', 'Entrepreneur of the Year (2021) — Rhema Chapel Campus Fellowship'];

const academicAwards = ['Best in Chemistry/Physics/Biology — Touchstone High School (2014)', 'Best Graduating Student — Touchstone High School (2014)', 'Most Sanitary Student (3 years in a row, 2012–2014) — Touchstone High School', 'Best Graduating Student — Nobles International School (2008)'];

const trainingTopics = ['Content Creation', 'Social Media Management', 'Digital Marketing', 'Branding & Storytelling', 'AI-Powered Website Development', 'Product Photography', 'Personal Branding ("Unmute Yourself" Series)'];

export default function About() {
  const expertiseRef = useRef(null);
  const partnersRef = useRef(null);
  const awards2025Ref = useRef(null);
  const awards2024Ref = useRef(null);
  const previousAwardsRef = useRef(null);
  const academicRef = useRef(null);
  const trainingRef = useRef(null);

  useScrollTriggerRefresh();
  useGsapStagger(expertiseRef, '.expertise-item', 0.06);
  useGsapStagger(partnersRef, '.partner-item', 0.04);
  useGsapStagger(awards2025Ref, '.award-item', 0.04);
  useGsapStagger(awards2024Ref, '.award-item', 0.04);
  useGsapStagger(previousAwardsRef, '.award-item', 0.04);
  useGsapStagger(academicRef, '.award-item', 0.04);
  useGsapStagger(trainingRef, '.training-item', 0.05);

  return (
    <div>
      <section className="relative min-h-[80vh] md:min-h-[100vh] flex items-end bg-black overflow-hidden" aria-label="About Pamela Williams">
        <div className="absolute inset-0">
          <img src={img5} alt="" className="w-full h-full object-cover object-top" loading="eager" aria-hidden="true" style={{ objectPosition: 'center 20%' }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 md:pb-20 w-full">
          <FadeUp><p className="text-[#D4AF37]/70 text-[10px] tracking-ultrawide uppercase mb-5 font-bold">About Me.</p></FadeUp>
          <RevealText><h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] max-w-3xl mb-6">Pamela Williams</h1></RevealText>
          <FadeUp delay={200}><p className="text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">Global Creative Luminary, shaping the future of media, branding, communications, and experiences across Africa and the world.</p></FadeUp>
        </div>
      </section>

      <section className="bg-white py-16 md:py-28" aria-label="Detailed biography">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <SlideLeft>
                <div className="lg:sticky lg:top-28">
                  <div className="w-full">
                    <img src={img2} alt="Pamela Williams Creative Industrialist" className="w-full h-auto object-cover object-top rounded-sm" loading="lazy" style={{ filter: 'grayscale(100%)', transition: 'filter 0.7s ease' }} onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'} onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'} />
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="w-10 h-px bg-[#D4AF37]" />
                    <p className="text-black/25 text-[9px] tracking-ultrawide uppercase">10+ Years of Impact</p>
                  </div>
                </div>
              </SlideLeft>
            </div>
            <div className="lg:col-span-3 lg:pt-8">
              <p className="text-black/60 text-base leading-relaxed mb-3 md:mb-5">Pamela Williams is a Creative Industrialist and award-winning Brand, Marketing, and Communications Strategist whose work sits at the intersection of creativity, strategy, and global impact.</p>
              <p className="text-black/60 text-base leading-relaxed mb-3 md:mb-5">Widely recognized for empowering brands, championing creativity, and transforming ideas into revenue, she has built an international footprint through her work with diplomatic bodies, global institutions, creative enterprises, NGOs, corporates, and high-growth startups.</p>
              <p className="text-black/60 text-base leading-relaxed mb-3 md:mb-5">A dynamic force with multidimensional expertise, Pamela helps organizations elevate their visibility, sharpen their identity, and scale their influence through a mastery of creative direction, experience curation, project management, digital marketing, brand strategy, content development, storytelling, and strategic communications.</p>
              <div className="border-l-2 border-[#D4AF37] pl-5 my-5 md:my-8">
                <p className="text-black font-bold text-base md:text-lg leading-snug">Her commitment is simple yet powerful: help brands and individuals stand out, stay unforgettable, and achieve measurable success.</p>
              </div>
              <h3 className="text-[9px] tracking-ultrawide uppercase text-[#D4AF37] font-bold mb-4 md:mb-5">Core Expertise</h3>
              <div ref={expertiseRef}>
                {expertise.map((item) => (
                  <div key={item} className="expertise-item flex items-start gap-3 py-2 md:py-2.5 border-b border-black/5 group cursor-default" style={{ opacity: 0 }}>
                    <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="text-black/60 text-sm group-hover:text-black transition-colors duration-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" aria-label="Training expertise">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold">Training</p>
          <h2 className="text-2xl md:text-3xl font-black text-black mb-3">Areas of Training</h2>
          <p className="text-black/50 text-sm mb-10 max-w-lg leading-relaxed">Pamela has trained hundreds of emerging entrepreneurs, creators, and professionals across these areas:</p>
          <div ref={trainingRef} className="flex flex-wrap gap-2.5">
            {trainingTopics.map((topic) => (
              <span key={topic} className="training-item flex items-center gap-2 px-5 py-2.5 border border-black/10 text-black/50 text-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 cursor-default" style={{ opacity: 0 }}>
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" /> {topic}
              </span>
            ))}
          </div>
          <FadeUp delay={200}>
            <div className="mt-14 p-6 bg-black rounded-sm">
              <p className="text-[#D4AF37] text-[9px] tracking-ultrawide uppercase font-bold mb-2">Landmark Collaboration</p>
              <h3 className="text-white font-black text-xl mb-3">National Gallery of Art, Nigeria</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">Leading a landmark collaboration to provide quarterly nationwide social media training, creative workshops for children across 25 centers, staff capacity building, brand repositioning, event curation and communications strategy, and funding partnership support.</p>
              <div className="flex flex-wrap gap-2">
                {['Quarterly Training', '25 Centers', 'Brand Repositioning', 'Event Curation', 'Funding Support'].map((t) => (
                  <span key={t} className="px-4 py-1.5 bg-[#D4AF37] text-white text-[9px] font-bold tracking-ultrawide uppercase">{t}</span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="bg-black py-16 md:py-28" aria-label="Awards and recognition">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <SlideLeft>
                <div className="lg:sticky lg:top-28">
                  <div className="w-full">
                    <img src={img4} alt="Pamela Williams receiving awards" className="w-full h-auto object-cover object-top rounded-sm" loading="lazy" style={{ filter: 'grayscale(100%)', transition: 'filter 0.7s ease' }} onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'} onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'} />
                  </div>
                  <div className="mt-5 p-5 bg-[#D4AF37] rounded-sm">
                    <p className="text-white font-black text-2xl mb-1">25+</p>
                    <p className="text-white/45 text-[9px] tracking-ultrawide uppercase font-bold">Awards & Recognitions</p>
                  </div>
                </div>
              </SlideLeft>
            </div>
            <div className="lg:col-span-3 space-y-8 lg:pt-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-8">Awards & Achievements</h2>
              <div><h3 className="flex items-center gap-2.5 mb-4"><Award className="w-4 h-4 text-[#D4AF37] shrink-0" /><span className="text-sm font-black text-white">2025 Awards</span></h3><div ref={awards2025Ref}>{awards2025.map((a, i) => (<div key={i} className="award-item flex items-start gap-2.5 py-2 border-b border-white/5" style={{ opacity: 0 }}><Award className="w-4 h-4 text-[#D4AF37]/70 shrink-0 mt-0.5" /><span className="text-white/40 text-sm">{a}</span></div>))}</div></div>
              <div><h3 className="flex items-center gap-2.5 mb-4"><Award className="w-4 h-4 text-[#D4AF37]/70 shrink-0" /><span className="text-sm font-black text-white">2024 Awards</span></h3><div ref={awards2024Ref}>{awards2024.map((a, i) => (<div key={i} className="award-item flex items-start gap-2.5 py-2 border-b border-white/5" style={{ opacity: 0 }}><Award className="w-4 h-4 text-[#D4AF37]/70 shrink-0 mt-0.5" /><span className="text-white/40 text-sm">{a}</span></div>))}</div></div>
              <div><h3 className="flex items-center gap-2.5 mb-4"><Award className="w-4 h-4 text-[#D4AF37]/70 shrink-0" /><span className="text-sm font-black text-white">Previous Awards</span></h3><div ref={previousAwardsRef}>{previousAwards.map((a, i) => (<div key={i} className="award-item flex items-start gap-2.5 py-2 border-b border-white/5" style={{ opacity: 0 }}><Award className="w-4 h-4 text-[#D4AF37]/70 shrink-0 mt-0.5" /><span className="text-white/40 text-sm">{a}</span></div>))}</div></div>
              <div><h3 className="flex items-center gap-2.5 mb-4"><BookOpen className="w-4 h-4 text-[#D4AF37]/70 shrink-0" /><span className="text-sm font-black text-white">Academic & Early</span></h3><div ref={academicRef}>{academicAwards.map((a, i) => (<div key={i} className="award-item flex items-start gap-2.5 py-2 border-b border-white/5" style={{ opacity: 0 }}><Award className="w-4 h-4 text-[#D4AF37]/70 shrink-0 mt-0.5" /><span className="text-white/40 text-sm">{a}</span></div>))}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20" aria-label="International partners">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp><p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-3 font-bold text-center">Global Reach</p></FadeUp>
          <FadeUp delay={80}><h2 className="text-2xl md:text-3xl font-black text-black text-center mb-3">International Partners</h2></FadeUp>
          <p className="text-black/50 text-center max-w-lg mx-auto mb-10 text-sm leading-relaxed">Collaborated with top-tier global institutions across diplomacy, development, and creative industries. Her international versatility has made her a trusted partner for initiatives focused on youth empowerment, digital inclusion, cultural exchange, education, social impact, and global development.</p>
          <div ref={partnersRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {partners.map((p) => (
              <div key={p} className="partner-item flex items-center gap-2 border border-black/8 p-3.5 text-black/50 text-xs text-center hover:border-[#D4AF37]/40 hover:text-[#D4AF37] transition-all duration-500 cursor-default" style={{ opacity: 0 }}>
                <Globe className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="text-left">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}