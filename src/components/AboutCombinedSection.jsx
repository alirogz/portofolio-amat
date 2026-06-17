import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AboutCombinedSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "start 30%"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const skills = [
    "React.js", "Node.js", "Next.js", "Tailwind CSS", "Framer Motion", "Figma", 
    "UI/UX Design", "Fullstack Development"
  ];

  const education = [
    {
      year: "2022 - 2026",
      title: "Universitas Gunadarma",
      subtitle: "Teknik Informatika"
    },
    {
      year: "2019 - 2022",
      title: "SMA Taruna Terpadu 1",
      subtitle: "Jurusan IPA"
    }
  ];

  return (
    <section 
      id="about"
      ref={containerRef} 
      className="container" 
      style={{ 
        padding: '160px var(--spacing-gutter)', 
        position: 'relative', 
        zIndex: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '80px',
        alignItems: 'start'
      }}
    >
      {/* KIRI: Foto Profil dengan Sticky Asymmetric Style */}
      <div style={{ position: 'sticky', top: '120px' }}>
        <motion.div 
          style={{ 
            y: yImage,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '3/4',
            position: 'relative',
            background: 'var(--color-surface)'
          }}
        >
          <img 
            src="/profile.jpeg" 
            alt="Abimanyu Putra"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </motion.div>
      </div>

      {/* KANAN: Editorial Content (Tanpa Kotak Bento) */}
      <div style={{ paddingTop: '24px' }}>
        <div style={{ marginBottom: '80px' }}>
          <h2 className="text-display-lg" style={{ fontSize: '48px', lineHeight: '1.1', margin: '0 0 32px 0' }}>
            Halo, saya Abimanyu.
          </h2>
          <p className="text-body-lg" style={{ color: 'var(--color-text-secondary)', maxWidth: '65ch', margin: 0, fontSize: '20px', lineHeight: '1.8' }}>
            Sebagai mahasiswa IT dan seorang Creative Developer, saya menggabungkan logika pemrograman dengan estetika desain visual. Misi saya adalah membangun produk digital berskala global yang fungsional, elegan, dan berkarakter kuat untuk membantu klien mencapai tujuan bisnis mereka.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '64px' }}>
          {/* Pendidikan */}
          <div>
            <h3 className="text-headline-md" style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '32px' }}>
              Pendidikan
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {education.map((edu, idx) => (
                <div key={idx}>
                  <p style={{ color: 'var(--color-primary)', margin: '0 0 4px 0', fontSize: '14px', fontWeight: '500' }}>{edu.year}</p>
                  <h4 style={{ fontSize: '20px', margin: '0 0 4px 0', fontWeight: '600', color: 'var(--color-text-primary)' }}>{edu.title}</h4>
                  <p style={{ color: 'var(--color-text-secondary)', margin: 0, fontSize: '16px' }}>{edu.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Keahlian */}
          <div>
            <h3 className="text-headline-md" style={{ fontSize: '16px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px', marginBottom: '32px' }}>
              Keahlian & Alat
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  style={{ 
                    padding: '8px 16px', 
                    borderRadius: 'var(--radius-full)', 
                    border: '1px solid var(--color-border)', 
                    color: 'var(--color-text-primary)', 
                    fontSize: '15px',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
