import React from 'react';
import { motion } from 'framer-motion';

export default function TextReveal({ text, delay = 0, style = {} }) {
  const words = text.split(" ");

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', ...style }}>
      {words.map((word, index) => (
        <span 
          key={index} 
          style={{ 
            overflow: 'hidden', 
            display: 'inline-block',
            marginRight: '0.25em' // Standard word spacing
          }}
        >
          <motion.span
            initial={{ y: '100%', rotate: 5 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1], // Beautiful custom cubic-bezier
              delay: delay + (index * 0.03) // Stagger effect
            }}
            style={{ 
              display: 'inline-block',
              transformOrigin: 'top left'
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
