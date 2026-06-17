import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';

export default function Button({ children, onClick, icon: Icon, variant = 'primary', className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Move 20% of the distance from center
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button 
      ref={ref}
      className={`${styles.button} ${styles[variant]} ${className} interactive`}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <span className={styles.text}>{children}</span>
      {Icon && (
        <span className={styles.iconContainer}>
          <Icon size={16} />
        </span>
      )}
    </motion.button>
  );
}
