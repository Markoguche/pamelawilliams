import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Instagram, Linkedin, Twitter, Music, Globe, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollTriggerRefresh, useGsapStagger } from '../hooks/useGsap';
import { FadeUp, SlideLeft, RevealText } from '../components/GsapWrapper';
import { getCompanyById } from '../data/companies';

export default function CompanyProfile() {
  const { id } = useParams();
  const company = getCompanyById(id);
  const [currentSlide, setCurrentSlide] = useState(0);
  const servicesRef = useRef(null);

  useScrollTriggerRefresh();
  useGsapStagger(servicesRef, '.service-group', 0.1);

  useEffect(() => {
    if (!company?.carouselImages) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % company.carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [company?.carouselImages]);

  if (!company) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg mb-4">Company not found</p>
          <Link to="/companies" className="text-[#D4AF37] hover:underline">
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  const isDark = company.type === 'community';

  return (
    <div>
      {/* HERO */}
      <section className={`relative min-h-[70vh] md:min-h-[80vh] flex items-end overflow-hidden ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="absolute inset-0">
          {company.logo ? (
            <div className="absolute inset-0 bg-black">
              <img src={company.logo} alt="" className="w-full h-full object-contain p-20 opacity-20" aria-hidden="true" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>
          ) : (
            <img src={company.previewImage} alt="" className="w-full h-full object-cover" loading="eager" aria-hidden="true" />
          )}
          <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-t from-black via-black/60 to-black/30' : 'bg-gradient-to-t from-white via-white/60 to-white/30'}`} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 md:pb-24 w-full">
          <FadeUp>
            <Link
              to="/companies"
              className={`inline-flex items-center gap-2 text-[10px] tracking-ultrawide uppercase font-bold mb-6 transition-colors duration-300 ${isDark ? 'text-white/50 hover:text-[#D4AF37]' : 'text-black/50 hover:text-[#D4AF37]'}`}
            >
              <ArrowLeft className="w-3 h-3" />
              All Companies
            </Link>
          </FadeUp>

          <div className="flex items-center gap-4 mb-6">
            {company.logo && (
              <FadeUp>
                <img src={company.logo} alt={`${company.name} logo`} className="h-12 md:h-16 w-auto" />
              </FadeUp>
            )}
            <FadeUp delay={100}>
              <span className="text-[10px] tracking-ultrawide uppercase font-bold px-3 py-1.5 border border-[#D4AF37]/30 text-[#D4AF37]">
                {company.type === 'community' ? 'Community' : 'Company'}
              </span>
            </FadeUp>
          </div>

          <RevealText>
            <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
              {company.name}
            </h1>
          </RevealText>

          <FadeUp delay={200}>
            <p className="text-lg md:text-xl max-w-2xl text-[#D4AF37]">{company.tagline}</p>
          </FadeUp>
        </div>
      </section>

      {/* OVERVIEW & DESCRIPTION */}
      <section className={`${isDark ? 'bg-black' : 'bg-white'} py-16 md:py-28`} aria-label="About">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <SlideLeft>
                <div className="lg:sticky lg:top-28">
                  <h2 className={`text-[10px] tracking-ultrawide uppercase font-bold mb-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Overview</h2>
                  <p className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>{company.overview}</p>

                  {company.mission && (
                    <div className={`mt-8 p-6 border-l-2 border-[#D4AF37] ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                      <p className="text-[9px] tracking-ultrawide uppercase font-bold mb-2 text-[#D4AF37]">Our Mission</p>
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-white/50' : 'text-black/50'}`}>{company.mission}</p>
                    </div>
                  )}

                  {company.philosophy && (
                    <div className="mt-6">
                      <p className={`text-[9px] tracking-ultrawide uppercase font-bold mb-2 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]/70'}`}>Philosophy</p>
                      <p className={`text-sm leading-relaxed italic ${isDark ? 'text-white/40' : 'text-black/40'}`}>&ldquo;{company.philosophy}&rdquo;</p>
                    </div>
                  )}
                </div>
              </SlideLeft>
            </div>

            <div className="lg:col-span-3">
              <h2 className={`text-[10px] tracking-ultrawide uppercase font-bold mb-6 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Our Story</h2>
              <div className={`space-y-4 ${isDark ? 'text-white/50' : 'text-black/50'} text-sm leading-relaxed`}>
                {company.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* CAROUSEL SECTION */}
      {company.carouselImages && company.id === 'creme-talent-africa' && (
        <section className={`${isDark ? 'bg-black' : 'bg-white'} py-16 md:py-28 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} aria-label="Creative Portfolio">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
            <FadeUp>
              <p className={`text-[10px] tracking-ultrawide uppercase font-bold mb-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Creative Portfolio</p>
            </FadeUp>
            <FadeUp delay={80}>
              <h2 className={`text-2xl md:text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-black'}`}>The Faces of Creativity</h2>
            </FadeUp>

            <div className="relative overflow-hidden rounded-sm border border-white/10">
              <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {company.carouselImages.map((img, i) => (
                  <div key={i} className="w-full shrink-0 flex items-center justify-center bg-neutral-950 min-h-[300px] md:min-h-[650px]">
                    <img 
                      src={img} 
                      alt="Creative portfolio" 
                      className="max-w-full max-h-[60vh] md:max-h-[75vh] w-auto h-auto object-contain p-4" 
                      loading="lazy" 
                    />
                  </div>
                ))}
              </div>
              
              {/* Desktop: Side arrows only */}
              <div className="absolute inset-0 hidden md:flex items-center justify-between px-4 pointer-events-none">
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev === 0 ? company.carouselImages.length - 1 : prev - 1))} 
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-300 cursor-pointer pointer-events-auto"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setCurrentSlide((prev) => (prev === company.carouselImages.length - 1 ? 0 : prev + 1))} 
                  className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-colors duration-300 cursor-pointer pointer-events-auto"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom navigation — all screens */}
            <div className="flex items-center justify-center gap-5 pt-6">
              {/* Mobile circle arrows */}
              <button 
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? company.carouselImages.length - 1 : prev - 1))} 
                className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {company.carouselImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide ? 'bg-[#D4AF37] w-6' : 'bg-white/30 hover:bg-white/50'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Mobile circle arrow */}
              <button 
                onClick={() => setCurrentSlide((prev) => (prev === company.carouselImages.length - 1 ? 0 : prev + 1))} 
                className="md:hidden w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Desktop text buttons */}
            <div className="mt-4 hidden md:flex justify-center gap-4">
              <button 
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? company.carouselImages.length - 1 : prev - 1))} 
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/50 text-xs font-bold tracking-ultrawide uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button 
                onClick={() => setCurrentSlide((prev) => (prev === company.carouselImages.length - 1 ? 0 : prev + 1))} 
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/50 text-xs font-bold tracking-ultrawide uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* SERVICES */}
      <section className={`${isDark ? 'bg-black' : 'bg-white'} py-16 md:py-28 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} aria-label="Services">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className={`text-[10px] tracking-ultrawide uppercase font-bold mb-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>What We Offer</p>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className={`text-2xl md:text-4xl font-black mb-12 ${isDark ? 'text-white' : 'text-black'}`}>Services & Programs</h2>
          </FadeUp>

          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.services.map((service, i) => (
              <div
                key={i}
                className={`service-group p-6 border transition-all duration-600 ${isDark ? 'border-white/8 hover:border-[#D4AF37]/40' : 'border-black/5 hover:border-[#D4AF37]/40'}`}
                style={{ opacity: 0 }}
              >
                <h3 className={`text-sm font-bold mb-4 ${isDark ? 'text-white/90' : 'text-black'}`}>{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className={`flex items-start gap-2 text-sm ${isDark ? 'text-white/40' : 'text-black/50'}`}>
                      <span className="shrink-0 mt-0.5 text-[#D4AF37]">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & SOCIAL */}
      <section className={`${isDark ? 'bg-black' : 'bg-white'} py-16 md:py-28 border-t ${isDark ? 'border-white/10' : 'border-black/10'}`} aria-label="Contact">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {company.website && (
              <div className={`p-6 border ${isDark ? 'border-white/8' : 'border-black/5'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Globe className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`} />
                  <p className={`text-[9px] tracking-ultrawide uppercase font-bold ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Website</p>
                </div>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold hover:text-[#D4AF37] transition-colors duration-300 break-all ${isDark ? 'text-white/80' : 'text-black'}`}>
                  {company.website.replace('https://', '')}
                </a>
              </div>
            )}

            <div className={`p-6 border ${isDark ? 'border-white/8' : 'border-black/5'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Mail className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`} />
                <p className={`text-[9px] tracking-ultrawide uppercase font-bold ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Email</p>
              </div>
              <a href={`mailto:${company.email}`} className={`text-sm font-semibold hover:text-[#D4AF37] transition-colors duration-300 break-all ${isDark ? 'text-white/80' : 'text-black'}`}>
                {company.email}
              </a>
            </div>

            <div className={`p-6 border ${isDark ? 'border-white/8' : 'border-black/5'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Phone className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`} />
                <p className={`text-[9px] tracking-ultrawide uppercase font-bold ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Phone</p>
              </div>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className={`text-sm font-semibold hover:text-[#D4AF37] transition-colors duration-300 ${isDark ? 'text-white/80' : 'text-black'}`}>
                {company.phone}
              </a>
            </div>

            <div className={`p-6 border ${isDark ? 'border-white/8' : 'border-black/5'}`}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className={`w-4 h-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`} />
                <p className={`text-[9px] tracking-ultrawide uppercase font-bold ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Location</p>
              </div>
              <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>{company.locations.join(', ')}</p>
            </div>
          </div>

          {Object.keys(company.social).length > 0 && (
            <div className="mt-8">
              <p className={`text-[9px] tracking-ultrawide uppercase font-bold mb-4 ${isDark ? 'text-[#D4AF37]/70' : 'text-[#D4AF37]'}`}>Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {company.social.instagram && (
                  <a href={company.social.instagram} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 border text-xs font-bold tracking-ultrawide uppercase transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] ${isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'}`}>
                    <Instagram className="w-3.5 h-3.5" /> Instagram
                  </a>
                )}
                {company.social.linkedin && (
                  <a href={company.social.linkedin} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 border text-xs font-bold tracking-ultrawide uppercase transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] ${isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'}`}>
                    <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                  </a>
                )}
                {company.social.twitter && (
                  <a href={company.social.twitter} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 border text-xs font-bold tracking-ultrawide uppercase transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] ${isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'}`}>
                    <Twitter className="w-3.5 h-3.5" /> X
                  </a>
                )}
                {company.social.tiktok && (
                  <a href={company.social.tiktok} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-4 py-2.5 border text-xs font-bold tracking-ultrawide uppercase transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] ${isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'}`}>
                    <Music className="w-3.5 h-3.5" /> TikTok
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA for Allsweetness Events */}
      {company.id === 'allsweetness-events' && (
        <section className="bg-[#D4AF37] py-16 md:py-20" aria-label="Book event">
          <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Ready to Plan Your Event?</h2>
            <p className="text-white/60 text-sm mb-6">Let Allsweetness Events bring your vision to life with bespoke luxury experiences.</p>
            <a href="mailto:thepamelawilliams@gmail.com" className="inline-flex items-center gap-3 bg-white text-[#D4AF37] px-10 py-4 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-white/90 transition-all duration-300 hover:translate-y-[-2px]">
              Contact Allsweetness Events
            </a>
          </div>
        </section>
      )}

      {/* CTA for PWM */}
      {company.id === 'pamela-williams-media' && (
        <section className="bg-[#D4AF37] py-16 md:py-20" aria-label="Get in touch">
          <div className="max-w-2xl mx-auto px-6 lg:px-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Let us Build Influence Together</h2>
            <p className="text-white/60 text-sm mb-6">Ready to transform your communication and drive meaningful growth?</p>
            <a href="https://PWMAfrica.vercel.app/contact" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-white text-[#D4AF37] px-10 py-4 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-white/90 transition-all duration-300 hover:translate-y-[-2px]">
              Contact PWM
            </a>
          </div>
        </section>
      )}
    </div>
  );
}