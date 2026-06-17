import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import { ArrowRight, Mail } from 'lucide-react';
import Button from './components/Button';
import WorkSection from './components/WorkSection';
import AboutCombinedSection from './components/AboutCombinedSection';
import FooterSection from './components/FooterSection';
import Preloader from './components/Preloader';
import TextReveal from './components/TextReveal';
import Robot3D from './components/Robot3D';

function App() {
  const [loading, setLoading] = useState(true);
  const spotlightRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
    
    // Expose lenis globally for modal locking
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(255, 95, 46, 0.05), transparent 40%)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div style={{ position: 'relative', overflow: 'clip' }}>
        {/* Background Spotlight */}
        <div 
          ref={spotlightRef}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: 'none',
            background: `radial-gradient(600px circle at -100px -100px, rgba(255, 95, 46, 0.05), transparent 40%)`,
            zIndex: 0
          }}
        />

        {/* Static Header Navigation */}
        <header style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '40px var(--spacing-gutter)',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          zIndex: 50
        }}>
          <nav style={{ 
            display: 'flex', 
            gap: '32px',
            background: 'rgba(26, 26, 26, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-full)',
            padding: '12px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <a href="#work" className="text-label" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>Portfolio</a>
            <a href="#about" className="text-label" style={{ color: 'var(--color-text-primary)', textDecoration: 'none' }}>Tentang</a>
            <a href="#contact" className="text-label" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>Kontak</a>
          </nav>
        </header>

        {/* Hero Section with 2-Column Layout */}
        <motion.section 
          className="container"
          style={{ 
            minHeight: '100vh', 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
            paddingTop: '80px',
            position: 'relative',
            zIndex: 10,
            gap: '40px'
          }}
        >
          {/* Left Column: Text */}
          <motion.div style={{ y: yHero, opacity: opacityHero }}>
            <div style={{ marginBottom: '16px' }}>
              <TextReveal text="Creative Developer & UI/UX Designer" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '600' }} />
            </div>
            
            <h1 className="text-display-lg" style={{ marginBottom: '32px' }}>
              <TextReveal text="Membangun platform digital" delay={0.2} />
              <br />
              <TextReveal text="untuk bisnis Anda." style={{ color: 'var(--color-primary)', fontStyle: 'italic' }} delay={0.4} />
            </h1>
            
            <motion.p 
              className="text-body-lg" 
              style={{ color: 'var(--color-text-secondary)', maxWidth: '500px', marginBottom: '48px' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Saya ahli merancang dan membangun website premium yang tidak hanya menarik secara visual, namun juga mulus dan fungsional.
            </motion.p>
            
            <motion.div 
              style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <Button icon={ArrowRight} onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })}>
                Lihat Portfolio
              </Button>
              <Button variant="secondary" icon={Mail} onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Hubungi Saya
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: 3D Robot */}
          <motion.div 
            style={{ y: yHero, opacity: opacityHero, height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <Robot3D />
          </motion.div>

        </motion.section>

        {/* Combined About & Skills Section */}
        <AboutCombinedSection />

        {/* Selected Works (Grid) */}
        <WorkSection />

        {/* Grand Footer Section */}
        <FooterSection />

      </div>
    </>
  );
}

export default App;
