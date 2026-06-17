import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [activeProject]);

  const projects = [
    {
      id: "smpn147",
      title: "Perpustakaan Online SMPN 147 Jakarta",
      category: "UI/UX Design",
      year: "2024",
      image: "/library_mockup.png",
      description: "Sistem perpustakaan digital interaktif yang dirancang khusus untuk memfasilitasi kebutuhan siswa SMPN 147 Jakarta dalam meminjam dan membaca buku secara online.",
      techStack: ["Figma", "Prototyping", "User Research", "Wireframing"],
      features: [
        "Desain antarmuka yang ramah pengguna untuk siswa tingkat menengah",
        "Pemetaan alur pengguna (user flow) untuk peminjaman buku digital",
        "Sistem katalog pencarian visual yang intuitif"
      ]
    },
    {
      id: "fashionwear",
      title: "Fashion Wear",
      category: "Fullstack E-Commerce (Go)",
      year: "2024",
      image: "/Fashion Wear.png",
      description: "Platform e-commerce pakaian minimalis yang elegan. Mengusung tema 'The Summer Resort Issue' dengan nuansa quiet luxury, dirancang untuk memberikan pengalaman berbelanja yang estetis dan responsif.",
      techStack: ["Go (Golang)", "HTML Templates", "CSS/SCSS", "MySQL"],
      features: [
        "Katalog produk dengan desain minimalis dan elegan",
        "Sistem pencarian (Search) item fashion yang dinamis",
        "Fitur Wishlist (Favorit) dan Keranjang Belanja (Cart)",
        "Manajemen Akun dan Pesanan (Orders) pelanggan",
        "Backend tangguh dan super cepat dengan bahasa Go"
      ]
    },
    {
      id: "ademhome",
      title: "Adem Home",
      category: "Fullstack E-Commerce (Node.js)",
      year: "2024",
      image: "/adem_home.png",
      description: "Platform e-commerce spesialis furnitur dan dekorasi interior yang minimalis. Dilengkapi dengan sistem pembayaran terintegrasi penuh untuk transaksi otomatis.",
      techStack: ["Node.js", "Express.js", "MySQL", "Tailwind CSS", "Midtrans"],
      features: [
        "Desain antarmuka modern yang sepenuhnya responsif dengan Tailwind",
        "Sistem autentikasi pengguna yang dienkripsi (Bcrypt & JWT)",
        "Integrasi payment gateway Midtrans untuk pemrosesan transaksi otomatis",
        "Panel admin untuk manajemen katalog furnitur"
      ]
    }
  ];

  return (
    <section id="work" style={{ padding: 'var(--spacing-section) 0', background: 'var(--color-bg)', zIndex: 15, position: 'relative' }}>
      <div className="container" style={{ padding: '0 var(--spacing-gutter)' }}>
        
        {/* Section Intro */}
        <div style={{ marginBottom: isMobile ? '40px' : '80px', maxWidth: '600px' }}>
          <h2 className="text-headline-md" style={{ 
            fontSize: isMobile ? '28px' : '48px', 
            margin: '0 0 16px 0' 
          }}>
            Proyek Terpilih.
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Fokus pada fungsionalitas sistem dan kenyamanan pengguna.
          </p>
        </div>

        {/* Project Grid — single column on mobile */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
          gap: isMobile ? '48px' : '64px 40px' 
        }}>
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              layoutId={`project-container-${project.id}`}
              onClick={() => setActiveProject(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.6, delay: isMobile ? 0 : idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={isMobile ? undefined : "hover"}
              style={{
                display: 'block',
                cursor: 'pointer'
              }}
            >
              {/* Image Box */}
              <motion.div 
                layoutId={`project-image-container-${project.id}`}
                style={{ 
                  width: '100%', 
                  aspectRatio: isMobile ? '16/10' : '4/3', 
                  borderRadius: isMobile ? '16px' : 'var(--radius-lg)', 
                  overflow: 'hidden',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  marginBottom: isMobile ? '16px' : '24px',
                  position: 'relative'
                }}>
                <motion.img 
                  layoutId={`project-image-${project.id}`}
                  src={project.image} 
                  alt={project.title}
                  variants={{
                    hover: { scale: 1.03 }
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>

              {/* Text Info */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <motion.h3 layoutId={`project-title-${project.id}`} className="text-headline-md" style={{ fontSize: isMobile ? '18px' : '24px', margin: 0, lineHeight: '1.3' }}>{project.title}</motion.h3>
                  <span className="text-label" style={{ color: 'var(--color-text-secondary)', marginTop: '4px', flexShrink: 0, marginLeft: '12px' }}>{project.year}</span>
                </div>
                <motion.p layoutId={`project-category-${project.id}`} className="text-label" style={{ color: 'var(--color-primary)', margin: 0, fontSize: isMobile ? '11px' : '12px' }}>{project.category}</motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(8px)',
                zIndex: 9999,
                display: 'flex',
                alignItems: isMobile ? 'flex-end' : 'center',
                justifyContent: 'center',
                padding: isMobile ? '0' : '24px'
              }}
            >
              <motion.div 
                layoutId={`project-container-${activeProject.id}`}
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: 'var(--color-bg)',
                  borderRadius: isMobile ? '20px 20px 0 0' : 'var(--radius-lg)',
                  width: '100%',
                  maxWidth: isMobile ? '100%' : '800px',
                  maxHeight: isMobile ? '92vh' : '90vh',
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setActiveProject(null)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.6)',
                    border: 'none',
                    color: 'white',
                    width: isMobile ? '36px' : '32px',
                    height: isMobile ? '36px' : '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    fontSize: '16px',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  ✕
                </button>

                {/* Drag Handle for mobile */}
                {isMobile && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
                    <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: 'var(--color-border)' }} />
                  </div>
                )}

                <motion.div 
                  layoutId={`project-image-container-${activeProject.id}`}
                  style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}
                >
                  <motion.img 
                    layoutId={`project-image-${activeProject.id}`}
                    src={activeProject.image} 
                    alt={activeProject.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>

                <div style={{ padding: isMobile ? '20px 16px 32px' : '32px' }}>
                  <div style={{ marginBottom: isMobile ? '16px' : '24px' }}>
                    <motion.h3 layoutId={`project-title-${activeProject.id}`} className="text-headline-md" style={{ fontSize: isMobile ? '22px' : '32px', margin: '0 0 8px 0' }}>{activeProject.title}</motion.h3>
                    <motion.p layoutId={`project-category-${activeProject.id}`} className="text-label" style={{ color: 'var(--color-primary)', margin: 0 }}>{activeProject.category} • {activeProject.year}</motion.p>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: isMobile ? '20px' : '32px' }}>
                    {activeProject.techStack.map((tech, idx) => (
                      <span 
                        key={idx} 
                        style={{ 
                          padding: '5px 10px', 
                          borderRadius: 'var(--radius-full)', 
                          border: '1px solid var(--color-border)', 
                          color: 'var(--color-text-secondary)', 
                          fontSize: isMobile ? '11px' : '12px',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <p className="text-body-lg" style={{ color: 'var(--color-text-primary)', marginBottom: isMobile ? '20px' : '32px', lineHeight: '1.6', fontSize: isMobile ? '14px' : undefined }}>
                    {activeProject.description}
                  </p>

                  <h4 style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: '600', marginBottom: '12px', color: 'var(--color-text-primary)' }}>Fitur Utama</h4>
                  <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', margin: 0, fontSize: isMobile ? '14px' : undefined }}>
                    {activeProject.features.map((feature, idx) => (
                      <li key={idx} style={{ lineHeight: '1.5' }}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
