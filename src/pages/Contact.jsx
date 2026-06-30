import { useScrollTriggerRefresh } from '../hooks/useGsap';
import { FadeUp, SlideLeft, SlideRight, RevealText } from '../components/GsapWrapper';
import img1 from '../assets/img1.jpg';

const contactInfo = [
  { icon: '\u2709', label: 'Email', value: 'thepamelawilliams@gmail.com' },
  { icon: '\u25CE', label: 'Phone', value: '+2349077937879' },
  { icon: '\u25C8', label: 'Location', value: 'Abuja, Nigeria' },
  { icon: '\u260E', label: 'Response Time', value: 'Within 24 hours' },
];

export default function Contact() {
  useScrollTriggerRefresh();

  return (
    <div>
      {/* HERO */}
      <section className="relative py-32 md:py-44 bg-black overflow-hidden" aria-label="Contact overview">
        <div className="absolute inset-0 opacity-10">
          <img src={img1} alt="" className="w-full h-full object-cover" loading="lazy" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10">
          <FadeUp>
            <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase mb-6 font-bold">Contact</p>
          </FadeUp>
          <RevealText>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95]">
              Let&apos;s Build<br />Something Great
            </h1>
          </RevealText>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-white py-20 md:py-32" aria-label="Contact form">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
            <div className="lg:col-span-2">
              <SlideLeft>
                <p className="text-black font-bold text-lg leading-relaxed mb-8">
                  Every stage she stands on, every brand she touches, and every project she curates reflects her signature: <span className="text-[#D4AF37]">excellence, creativity, impact, and unforgettable presence.</span>
                </p>
              </SlideLeft>
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <SlideLeft key={info.label} delay={i * 100}>
                    <div className="flex items-center gap-4 p-5 border border-black/5 hover:border-[#D4AF37]/50 transition-all duration-500">
                      <span className="text-[#D4AF37] text-xl">{info.icon}</span>
                      <div>
                        <p className="text-black/30 text-[10px] tracking-ultrawide uppercase font-bold">{info.label}</p>
                        <p className="text-black font-semibold text-sm mt-0.5">{info.value}</p>
                      </div>
                    </div>
                  </SlideLeft>
                ))}
              </div>
              <SlideLeft delay={400}>
                <div className="mt-10 p-6 bg-black">
                  <p className="text-[#D4AF37] text-[10px] tracking-ultrawide uppercase font-bold mb-2">Currently Booking</p>
                  <p className="text-white text-2xl font-black leading-tight">
                    Ready to<br />Level Up?
                  </p>
                </div>
              </SlideLeft>
            </div>

            <div className="lg:col-span-3">
              <SlideRight>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6" aria-label="Contact form">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="c-name" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-2">Name *</label>
                      <input id="c-name" type="text" required className="w-full px-4 py-3.5 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent" placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-2">Email *</label>
                      <input id="c-email" type="email" required className="w-full px-4 py-3.5 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="c-service" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-2">Service Interest</label>
                    <select id="c-service" className="w-full px-4 py-3.5 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent">
                      <option value="">Select a service</option>
                      <option>Personal Branding Session</option>
                      <option>Brand Strategy & Development</option>
                      <option>Personal Development Coaching</option>
                      <option>Business Systems & Structure</option>
                      <option>Full Event Planning & Execution</option>
                      <option>Event Management (Execution Only)</option>
                      <option>D-Day Coordination</option>
                      <option>Event Consultation</option>
                      <option>Scriptwriting</option>
                      <option>HR & Recruitment</option>
                      <option>Event Hosting & Public Speaking</option>
                      <option>PR Services</option>
                      <option>Training & Development</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="c-budget" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-2">Budget Range</label>
                    <select id="c-budget" className="w-full px-4 py-3.5 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent">
                      <option value="">Select budget range</option>
                      <option>Under \u20A6500,000</option>
                      <option>\u20A6500,000 \u2014 \u20A61,000,000</option>
                      <option>\u20A61,000,000 \u2014 \u20A62,000,000</option>
                      <option>\u20A62,000,000 \u2014 \u20A65,000,000</option>
                      <option>Above \u20A65,000,000</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="c-message" className="block text-[10px] tracking-ultrawide uppercase text-black/40 font-bold mb-2">Message *</label>
                    <textarea id="c-message" rows={6} required className="w-full px-4 py-3.5 border border-black/10 focus:border-[#D4AF37] focus:ring-0 outline-none transition-all duration-300 text-black text-sm bg-transparent resize-none" placeholder="Tell me about your project, goals, and timeline..." />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 hover:shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:translate-y-[-2px]"
                  >
                    Send Message
                  </button>
                  <p className="text-black/20 text-[10px] text-center tracking-wider">
                    By submitting, you agree to be contacted regarding your inquiry.
                  </p>
                </form>
              </SlideRight>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}