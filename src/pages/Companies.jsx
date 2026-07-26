import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useScrollTriggerRefresh, useGsapStagger } from '../hooks/useGsap';
import { FadeUp, RevealText } from '../components/GsapWrapper';
import { getCompaniesByType } from '../data/companies';
import img3 from '../assets/img3.jpg';

export default function Companies() {
  const companiesGridRef = useRef(null);
  const communitiesGridRef = useRef(null);

  useScrollTriggerRefresh();
  useGsapStagger(companiesGridRef, '.company-card', 0.08);
  useGsapStagger(communitiesGridRef, '.community-card', 0.08);

  const companyList = getCompaniesByType('company');
  const communityList = getCompaniesByType('community');

  return (
    <div>
      {/* HERO */}
      <section className="relative py-32 md:py-44 bg-black overflow-hidden" aria-label="Companies overview">
        <div className="absolute inset-0">
          <img src={img3} alt="" className="w-full h-full object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-6 font-bold">Portfolio</p>
          </FadeUp>
          <RevealText>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95]">
              Our Companies<br />& Communities
            </h1>
          </RevealText>
          <FadeUp delay={250}>
            <p className="text-white/40 text-lg max-w-2xl mt-6 leading-relaxed">
              A multi-sector ecosystem of brands and communities built to create impact, inspire growth, and drive meaningful change.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* COMPANIES */}
      <section className="bg-white py-16 md:py-28" aria-label="Companies">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-4 font-bold">Companies</p>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className="text-3xl md:text-4xl font-black text-black mb-4">Brands We've Built</h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-black/50 text-sm max-w-xl mb-12 leading-relaxed">
              Each company reflects our passion for creativity, strategy, lifestyle, and community. Together, they've supported over 200 brands.
            </p>
          </FadeUp>

          <div ref={companiesGridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyList.map((company) => (
              <Link
                key={company.id}
                to={`/companies/${company.id}`}
                className="company-card group block border border-black/5 hover:border-[#D4AF37]/40 transition-all duration-700 overflow-hidden"
                style={{ opacity: 0 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                  {company.logo ? (
                    <img
                      src={company.previewImage}
                      alt={company.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-black flex items-center justify-center">
                      <span className="text-white font-black text-3xl md:text-4xl tracking-tighter">{company.shortName}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {company.logo && <img src={company.logo} alt="" className="h-8 w-auto" />}
                    <h3 className="text-lg font-bold text-black group-hover:text-[#D4AF37] transition-colors duration-500">
                      {company.name}
                    </h3>
                  </div>
                  <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase font-bold mb-3">{company.tagline}</p>
                  <p className="text-black/50 text-sm leading-relaxed mb-4">{company.previewText}</p>
                  <div className="flex items-center gap-2 text-black/40 group-hover:text-[#D4AF37] transition-colors duration-300">
                    <span className="text-[10px] font-bold tracking-ultrawide uppercase">View More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="bg-black py-16 md:py-28" aria-label="Communities">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-[#D4AF37]/70 text-[10px] tracking-ultrawide uppercase mb-4 font-bold">Communities</p>
          </FadeUp>
          <FadeUp delay={80}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Where People Shine</h2>
          </FadeUp>
          <FadeUp delay={160}>
            <p className="text-white/40 text-sm max-w-xl mb-12 leading-relaxed">
              Safe, inspiring spaces designed to help individuals connect, grow, and make a lasting impact.
            </p>
          </FadeUp>

          <div ref={communitiesGridRef} className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {communityList.map((community) => (
              <Link
                key={community.id}
                to={`/companies/${community.id}`}
                className="community-card group block border border-white/8 hover:border-[#D4AF37]/40 transition-all duration-700 overflow-hidden"
                style={{ opacity: 0 }}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                  {community.logo ? (
                    <img
                      src={community.previewImage}
                      alt={community.name}
                      className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-black flex items-center justify-center">
                      <span className="text-white font-black text-3xl md:text-4xl tracking-tighter">{community.shortName}</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {community.logo && <img src={community.logo} alt="" className="h-8 w-auto" />}
                    <h3 className="text-lg font-bold text-white group-hover:text-[#D4AF37] transition-colors duration-500">
                      {community.name}
                    </h3>
                  </div>
                  <p className="text-[#D4AF37]/70 text-[10px] tracking-ultrawide uppercase font-bold mb-3">{community.tagline}</p>
                  <p className="text-white/40 text-sm leading-relaxed mb-4">{community.previewText}</p>
                  <div className="flex items-center gap-2 text-white/30 group-hover:text-[#D4AF37] transition-colors duration-300">
                    <span className="text-[10px] font-bold tracking-ultrawide uppercase">Join Community</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}