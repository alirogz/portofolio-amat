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
  const [isMobile, setIsMobile] = useState(false);
  const spotlightRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    // Detect mobile
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div style={{ position: 'relative', overflow: 'clip' }}>
        {/* Background Spotlight — hidden on mobile for performance */}
        {!isMobile && (
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
        )}

        {/* Header Navigation */}
        <header style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: isMobile ? '20px var(--spacing-gutter)' : '40px var(--spacing-gutter)',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-end',
          alignItems: 'center',
          zIndex: 50
        }}>
          <nav style={{ 
            display: 'flex', 
            gap: isMobile ? '20px' : '32px',
            background: 'rgba(26, 26, 26, 0.7)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-full)',
            padding: isMobile ? '10px 20px' : '12px 24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <a href="#work" className="text-label" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: isMobile ? '11px' : undefined }}>Portfolio</a>
            <a href="#about" className="text-label" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: isMobile ? '11px' : undefined }}>Tentang</a>
            <a href="#contact" className="text-label" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: isMobile ? '11px' : undefined }}>Kontak</a>
          </nav>
        </header>

        {/* Hero Section */}
        <motion.section 
          className="container"
          style={{ 
            minHeight: '100vh', 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: isMobile ? '100px' : '80px',
            paddingBottom: isMobile ? '40px' : '0',
            position: 'relative',
            zIndex: 10,
            gap: isMobile ? '32px' : '40px'
          }}
        >
          {/* Left Column: Text */}
          <motion.div 
            style={{ 
              y: isMobile ? 0 : yHero, 
              opacity: isMobile ? 1 : opacityHero,
              flex: isMobile ? 'none' : 1,
              width: '100%',
              textAlign: isMobile ? 'center' : 'left'
            }}
          >
            <div style={{ marginBottom: '12px' }}>
              <TextReveal 
                text="Creative Developer & UI/UX Designer" 
                style={{ 
                  color: 'var(--color-text-secondary)', 
                  fontFamily: 'var(--font-display)', 
                  fontSize: isMobile ? '14px' : 'clamp(24px, 4vw, 32px)', 
                  fontWeight: '600',
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }} 
              />
            </div>
            
            <h1 className="text-display-lg" style={{ marginBottom: isMobile ? '20px' : '32px' }}>
              <TextReveal text="Membangun platform digital" delay={0.2} />
              <br />
              <TextReveal text="untuk bisnis Anda." style={{ color: 'var(--color-primary)', fontStyle: 'italic' }} delay={0.4} />
            </h1>
            
            <motion.p 
              className="text-body-lg" 
              style={{ 
                color: 'var(--color-text-secondary)', 
                maxWidth: isMobile ? '100%' : '500px', 
                marginBottom: isMobile ? '32px' : '48px',
                margin: isMobile ? '0 auto 32px' : undefined
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Saya ahli merancang dan membangun website premium yang tidak hanya menarik secara visual, namun juga mulus dan fungsional.
            </motion.p>
            
            <motion.div 
              style={{ 
                display: 'flex', 
                gap: isMobile ? '12px' : '24px', 
                flexWrap: 'wrap',
                justifyContent: isMobile ? 'center' : 'flex-start'
              }}
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
            style={{ 
              y: isMobile ? 0 : yHero, 
              opacity: isMobile ? 1 : opacityHero, 
              height: isMobile ? '300px' : '600px', 
              width: isMobile ? '100%' : undefined,
              flex: isMobile ? 'none' : 1,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
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
