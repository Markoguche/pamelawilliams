import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Continuous fade-up that replays every scroll pass
export function useGsapFadeUp(ref, delay = 0, y = 60) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, delay, y]);
}

// Continuous slide from left
export function useGsapSlideLeft(ref, delay = 0, x = -80) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, delay, x]);
}

// Continuous slide from right
export function useGsapSlideRight(ref, delay = 0, x = 80) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { x, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, delay, x]);
}

// Continuous scale in
export function useGsapScaleIn(ref, delay = 0, scale = 0.85) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, delay, scale]);
}

// Continuous text reveal (clip-path)
export function useGsapRevealText(ref, delay = 0) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          delay,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, delay]);
}

// Continuous stagger children
export function useGsapStagger(ref, selector, stagger = 0.08) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current.querySelectorAll(selector),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, [ref, selector, stagger]);
}

// Parallax on image
export function useGsapParallax(ref, speed = -40) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: speed,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, [ref, speed]);
}

// Refresh ScrollTrigger on mount (for route changes)
export function useScrollTriggerRefresh() {
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
}

// Animate page entrance
export function useGsapPageEnter(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    });
    return () => ctx.revert();
  }, [ref]);
}