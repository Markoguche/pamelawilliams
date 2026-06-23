import React, { useRef } from 'react';
import PropTypes from 'prop-types';
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