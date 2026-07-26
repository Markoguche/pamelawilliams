import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ComingSoon() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37]/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Coming Soon</h1>

        <p className="text-white/40 text-lg leading-relaxed mb-8">We're working on something amazing. This page will be available shortly.</p>

        <div className="flex flex-col gap-4">
          <a
            href="https://PWMAfrica.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-black px-8 py-3.5 text-[11px] font-bold tracking-ultrawide uppercase hover:bg-[#e0bd4a] transition-all duration-300"
          >
            Visit PWM Homepage
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <a
            href="mailto:hello@pwmafrica.com"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/60 px-8 py-3.5 text-[11px] font-bold tracking-ultrawide uppercase hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
          >
            hello@pwmafrica.com
          </a>
        </div>

        <p className="text-white/20 text-xs mt-12 tracking-wider">Pamela Williams Media</p>
      </div>
    </div>
  );
}