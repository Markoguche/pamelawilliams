import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Diamond } from 'lucide-react';
import {
  useGsapFadeUp,
  useGsapSlideLeft,
  useGsapSlideRight,
  useGsapScaleIn,
  useGsapRevealText,
  useGsapParallax,
} from '../hooks/useGsap';

export function FadeUp({ children, delay = 0, y = 60, className = '' }) {
  const ref = useRef(null);
  useGsapFadeUp(ref, delay, y);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

FadeUp.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  y: PropTypes.number,
  className: PropTypes.string,
};

export function SlideLeft({ children, delay = 0, x = -80, className = '' }) {
  const ref = useRef(null);
  useGsapSlideLeft(ref, delay, x);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

SlideLeft.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  x: PropTypes.number,
  className: PropTypes.string,
};

export function SlideRight({ children, delay = 0, x = 80, className = '' }) {
  const ref = useRef(null);
  useGsapSlideRight(ref, delay, x);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

SlideRight.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  x: PropTypes.number,
  className: PropTypes.string,
};

export function ScaleIn({ children, delay = 0, scale = 0.85, className = '' }) {
  const ref = useRef(null);
  useGsapScaleIn(ref, delay, scale);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

ScaleIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  scale: PropTypes.number,
  className: PropTypes.string,
};

export function RevealText({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useGsapRevealText(ref, delay);
  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}

RevealText.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string,
};

export function ParallaxImg({ src, alt, className = '', speed = -40 }) {
  const ref = useRef(null);
  useGsapParallax(ref, speed);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </div>
  );
}

ParallaxImg.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  speed: PropTypes.number,
};

export default function MarqueeStrip({ text = 'PAMELA WILLIAMS', reverse = false }) {
  const repeated = Array(8).fill(text).join('  ');
  
  return (
    <div className="py-5 border-y border-white/10 overflow-hidden bg-black">
      <div
        className="whitespace-nowrap text-white/10 text-6xl md:text-8xl font-black tracking-mega uppercase animate-marquee flex items-center gap-6"
        style={{
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: '25s',
        }}
      >
        {Array(16).fill(null).map((_, i) => (
          <span key={i} className="flex items-center gap-6 shrink-0">
            <span>{text}</span>
            <Diamond className="w-4 h-4 text-white/10" />
          </span>
        ))}
      </div>
    </div>
  );
}

MarqueeStrip.propTypes = {
  text: PropTypes.string,
  reverse: PropTypes.bool,
};