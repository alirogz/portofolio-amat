import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 400); // Tunggu sebentar di 100% sebelum animasi menghilang
          return 100;
        }
        // Naikkan angka secara acak untuk kesan natural, dipercepat
        return prev + Math.floor(Math.random() * 25) + 5;
      });
    }, 20); // Interval lebih cepat

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0a0a',
        zIndex: 99999, // Harus paling atas
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '40px 80px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <p className="text-label" style={{ color: 'var(--color-primary)', fontSize: '24px', letterSpacing: '0.2em' }}>
          ABIMANYU
        </p>
        <h1 
          className="text-display-lg" 
          style={{ 
            fontSize: '12vw', 
            lineHeight: 1, 
            margin: 0, 
            color: 'white' 
          }}
        >
          {counter}%
        </h1>
      </div>
    </motion.div>
  );
}
