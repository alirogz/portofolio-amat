import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkSection() {
  const [activeProject, setActiveProject] = useState(null);

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
    <section id="work" style={{ padding: '120px 0', background: 'var(--color-bg)', zIndex: 15, position: 'relative' }}>
      <div className="container" style={{ padding: '0 var(--spacing-gutter)' }}>
        
        {/* Section Intro */}
        <div style={{ marginBottom: '80px', maxWidth: '600px' }}>
          <h2 className="text-headline-md" style={{ fontSize: '48px', margin: '0 0 24px 0' }}>Proyek Terpilih.</h2>
          <p className="text-body-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Fokus pada fungsionalitas sistem dan kenyamanan pengguna.
          </p>
        </div>

        {/* Standard Grid Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '64px 40px' 
        }}>
          {projects.map((project, idx) => (
            <motion.div 
              key={project.id}
              layoutId={`project-container-${project.id}`}
              onClick={() => setActiveProject(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover="hover"
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
                  aspectRatio: '4/3', 
                  borderRadius: 'var(--radius-lg)', 
                  overflow: 'hidden',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  marginBottom: '24px',
                  position: 'relative'
                }}>
                <motion.img 
                  layoutId={`project-image-${project.id}`}
                  src={project.image} 
                  alt={project.title}
                  variants={{
                    hover: { scale: 1.03 } // Subtle zoom on hover
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>

              {/* Text Info */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <motion.h3 layoutId={`project-title-${project.id}`} className="text-headline-md" style={{ fontSize: '24px', margin: 0 }}>{project.title}</motion.h3>
                  <span className="text-label" style={{ color: 'var(--color-text-secondary)', marginTop: '6px' }}>{project.year}</span>
                </div>
                <motion.p layoutId={`project-category-${project.id}`} className="text-label" style={{ color: 'var(--color-primary)', margin: 0 }}>{project.category}</motion.p>
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
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
          >
            <motion.div 
              layoutId={`project-container-${activeProject.id}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'var(--color-bg)',
                borderRadius: 'var(--radius-lg)',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
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
                  top: '16px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.5)',
                  border: 'none',
                  color: 'white',
                  width: '32px',
                  height: '32px',
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

              <div style={{ padding: '32px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <motion.h3 layoutId={`project-title-${activeProject.id}`} className="text-headline-md" style={{ fontSize: '32px', margin: '0 0 8px 0' }}>{activeProject.title}</motion.h3>
                  <motion.p layoutId={`project-category-${activeProject.id}`} className="text-label" style={{ color: 'var(--color-primary)', margin: 0 }}>{activeProject.category} • {activeProject.year}</motion.p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                  {activeProject.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      style={{ 
                        padding: '6px 12px', 
                        borderRadius: 'var(--radius-full)', 
                        border: '1px solid var(--color-border)', 
                        color: 'var(--color-text-secondary)', 
                        fontSize: '12px',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-body-lg" style={{ color: 'var(--color-text-primary)', marginBottom: '32px', lineHeight: '1.6' }}>
                  {activeProject.description}
                </p>

                <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: 'var(--color-text-primary)' }}>Fitur Utama</h4>
                <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
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
