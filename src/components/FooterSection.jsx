import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function FooterSection() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0.5, 1], [50, 0]);

  return (
    <footer 
      ref={containerRef}
      id="contact" 
      style={{ 
        position: 'relative', 
        minHeight: isMobile ? 'auto' : '80vh', 
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        zIndex: 20
      }}
    >
      <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)', opacity: 0.5 }}></div>

      {/* Massive Typography Container */}
      <div style={{ 
        flex: isMobile ? 'none' : 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        minHeight: isMobile ? '20vh' : '30vh', 
        marginTop: isMobile ? '24px' : '40px',
        overflow: 'hidden'
      }}>
        <motion.h2 
          style={{ 
            scale: isMobile ? 1 : scale, 
            fontSize: isMobile ? '32px' : 'clamp(40px, 10vw, 150px)', 
            fontWeight: '700', 
            margin: 0, 
            lineHeight: 1,
            color: 'transparent',
            WebkitTextStroke: isMobile ? '1px rgba(255,255,255,0.8)' : '2px rgba(255,255,255,0.8)',
            textTransform: 'uppercase',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            position: 'absolute',
            pointerEvents: 'none',
            width: isMobile ? '90%' : undefined
          }}
        >
          Mari Berdiskusi
        </motion.h2>
        
        <motion.h2 
          style={{ 
            scale: isMobile ? 1 : scale, 
            fontSize: isMobile ? '32px' : 'clamp(40px, 10vw, 150px)', 
            fontWeight: '700', 
            margin: 0, 
            lineHeight: 1,
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            whiteSpace: isMobile ? 'normal' : 'nowrap',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            position: 'absolute',
            pointerEvents: 'none',
            clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)',
            width: isMobile ? '90%' : undefined
          }}
        >
          Mari Berdiskusi
        </motion.h2>
      </div>

      {/* Contact Form & Links */}
      <motion.div 
        style={{ opacity: isMobile ? 1 : opacity, y: isMobile ? 0 : y }}
        className="container"
      >
        <div style={{
          padding: isMobile 
            ? '32px var(--spacing-gutter) 48px' 
            : '40px var(--spacing-gutter) 80px var(--spacing-gutter)',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '48px' : '80px',
        }}>
          
          {/* Contact Section */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
            gap: isMobile ? '48px' : '80px', 
            width: '100%', 
            maxWidth: '1200px', 
            margin: '0 auto' 
          }}>
            
            {/* Form Kontak */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-label" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: isMobile ? '20px' : '32px' }}>KIRIM PESAN (VIA EMAIL)</span>
              
              <form action="https://api.web3forms.com/submit" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '24px' : '32px' }}>
                <input type="hidden" name="access_key" value="76940eb2-2c60-4c22-bf80-262e36df4d2f" />
                <input type="hidden" name="redirect" value="https://web3forms.com/success" />
                
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Nama Anda" 
                    required
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.2)',
                      padding: isMobile ? '12px 0' : '16px 0',
                      fontSize: '16px',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>
                
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Anda" 
                    required
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.2)',
                      padding: isMobile ? '12px 0' : '16px 0',
                      fontSize: '16px',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      transition: 'border-color 0.3s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>

                <div style={{ position: 'relative', marginBottom: isMobile ? '8px' : '16px' }}>
                  <textarea 
                    name="message" 
                    placeholder="Ceritakan tentang proyek Anda..." 
                    required
                    rows="4"
                    style={{
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.2)',
                      padding: isMobile ? '12px 0' : '16px 0',
                      fontSize: '16px',
                      color: 'var(--color-text-primary)',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                      resize: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={isMobile ? undefined : { scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    alignSelf: isMobile ? 'stretch' : 'flex-start',
                    padding: isMobile ? '14px 32px' : '16px 40px',
                    borderRadius: '100px',
                    border: '1px solid var(--color-primary)',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    fontSize: isMobile ? '13px' : '14px',
                    fontFamily: 'var(--font-label)',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    transition: 'all 0.3s',
                  }}
                >
                  KIRIM PESAN ↗
                </motion.button>
              </form>
            </div>

            {/* WhatsApp & Kontak Cepat */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="text-label" style={{ color: 'var(--color-primary)', display: 'block', marginBottom: isMobile ? '20px' : '32px' }}>ATAU CHAT LANGSUNG</span>
              
              <div style={{ marginBottom: isMobile ? '32px' : '48px' }}>
                <p className="text-body-lg" style={{ color: 'var(--color-text-secondary)', marginBottom: isMobile ? '20px' : '32px', fontSize: isMobile ? '15px' : '18px' }}>
                  Lebih nyaman berdiskusi secara langsung? Silakan hubungi saya via WhatsApp untuk respons yang lebih cepat.
                </p>
                
                <a 
                  href="https://wa.me/6281818211138"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: isMobile ? '14px 32px' : '16px 40px',
                    borderRadius: '100px',
                    background: '#25D366',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: isMobile ? '13px' : '14px',
                    fontFamily: 'var(--font-label)',
                    letterSpacing: '0.05em',
                    fontWeight: 'bold',
                    transition: 'transform 0.2s',
                    display: isMobile ? 'block' : 'inline-block',
                    textAlign: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  CHAT VIA WHATSAPP ↗
                </a>
              </div>

              {/* Info Tambahan */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: isMobile ? '20px' : '32px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: isMobile ? '24px' : '40px' }}>
                <div>
                  <span className="text-label" style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px', fontSize: '11px' }}>SOSIAL MEDIA</span>
                  <a 
                    href="https://instagram.com/abimanyu_putra21" 
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: 'var(--color-text-primary)', textDecoration: 'none', transition: 'color 0.3s ease', fontSize: isMobile ? '14px' : undefined }}
                    onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--color-text-primary)'}
                  >
                    Instagram ↗
                  </a>
                </div>
                
                <div>
                  <span className="text-label" style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px', fontSize: '11px' }}>LOKASI</span>
                  <span style={{ color: 'var(--color-text-primary)', fontSize: isMobile ? '14px' : undefined }}>Indonesia</span>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <span className="text-label" style={{ color: 'var(--color-text-secondary)', display: 'block', marginBottom: '8px', fontSize: '11px' }}>EMAIL</span>
                  <span style={{ color: 'var(--color-text-primary)', fontSize: isMobile ? '13px' : undefined, wordBreak: 'break-all' }}>ahmadabimanyuputra7@gmail.com</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </motion.div>
    </footer>
  );
}
