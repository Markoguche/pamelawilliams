import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PropTypes from 'prop-types';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

gsap.registerPlugin(ScrollTrigger);

function PageSEO({ title, description, path }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canon = document.querySelector('link[rel="canonical"]');
    if (!canon) {
      canon = document.createElement('link');
      canon.rel = 'canonical';
      document.head.appendChild(canon);
    }
    canon.href = `https://www.pamelawilliams.com${path}`;

    const setOg = (prop, content) => {
      let el = document.querySelector(`meta[property="og:${prop}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', `og:${prop}`);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setOg('title', title);
    setOg('description', description);
    setOg('url', `https://www.pamelawilliams.com${path}`);
    setOg('type', 'website');
  }, [title, description, path]);

  return null;
}

PageSEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => ScrollTrigger.refresh(), 300);
  }, [pathname]);
  return null;
}

const seoData = {
  '/': { title: 'Pamela Williams \u2014 Global Creative Luminary | Brand Strategist & Storyteller', description: 'Award-winning Brand, Marketing & Communications Strategist helping brands stand out, scale, and succeed through strategic storytelling, experience curation, and digital marketing.' },
  '/about': { title: 'About Pamela Williams \u2014 Creative Industrialist & Brand Strategist', description: 'Learn about Pamela Williams, a Creative Industrialist and award-winning strategist whose work sits at the intersection of creativity, strategy, and global impact.' },
  '/services': { title: 'Services \u2014 Pamela Williams | Brand Strategy, Storytelling, Events & More', description: 'Explore Pamela Williams\u2019 solutions: brand strategy, storytelling, experience curation, digital marketing, event hosting, HR advisory, and professional training.' },
  '/contact': { title: 'Contact Pamela Williams \u2014 Book Your Session', description: 'Get in touch with Pamela Williams for brand strategy, event management, public speaking, or training. Book your session today.' },
};

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<><PageSEO {...seoData['/']} path="/" /><Home /></>} />
          <Route path="/about" element={<><PageSEO {...seoData['/about']} path="/about" /><About /></>} />
          <Route path="/services" element={<><PageSEO {...seoData['/services']} path="/services" /><Services /></>} />
          <Route path="/contact" element={<><PageSEO {...seoData['/contact']} path="/contact" /><Contact /></>} />
        </Routes>
      </Layout>
    </>
  );
}

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Pamela Williams",
      "jobTitle": ["Brand Strategist", "Storyteller", "Experience Curator", "CEO", "Founder"],
      "description": "Award-winning Brand, Marketing & Communications Strategist whose work sits at the intersection of creativity, strategy, and global impact.",
      "url": "https://www.pamelawilliams.com",
      "image": "/img1.jpg",
      "worksFor": [
        { "@type": "Organization", "name": "Aidos Creations" },
        { "@type": "Organization", "name": "Girlstuffng" },
        { "@type": "Organization", "name": "Allsweetnessng" },
        { "@type": "Organization", "name": "Allsweetness Events" },
        { "@type": "Organization", "name": "Starlights Africa" }
      ],
      "knowsAbout": ["Brand Strategy", "Marketing", "Communications", "Storytelling", "Event Curation", "Digital Marketing", "Public Speaking", "Creative Direction", "Project Management"],
    });
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}