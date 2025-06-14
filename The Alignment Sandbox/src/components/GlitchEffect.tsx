import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SkipBack as Skip } from 'lucide-react';

interface GlitchEffectProps {
  onComplete: () => void;
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({ onComplete }) => {
  const [showSkip, setShowSkip] = useState(false);
  const [glitchText, setGlitchText] = useState('INITIALIZING...');

  const glitchMessages = [
    'INITIALIZING...',
    'SCANNING NEURAL PATHWAYS...',
    'QUANTUM ENTANGLEMENT DETECTED...',
    'REALITY LAYER SHIFT...',
    'SIMULATION PARAMETERS UPDATED...',
    'CONSCIOUSNESS TRANSFER COMPLETE...',
    'ENTERING NEXT SEQUENCE...'
  ];

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 1500); // Reduced from 3000ms
    
    const messageInterval = setInterval(() => {
      setGlitchText(glitchMessages[Math.floor(Math.random() * glitchMessages.length)]);
    }, 400); // Reduced from 800ms

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000); // Reduced from 6000ms

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(completeTimer);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-space-deep flex items-center justify-center overflow-hidden"
    >
      {/* Skip button */}
      {showSkip && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={onComplete}
          className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-space-deep transition-colors duration-200 rounded font-space-grotesk"
        >
          <Skip className="w-4 h-4" />
          Skip
        </motion.button>
      )}

      {/* Code rain background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100 }}
            animate={{ y: '100vh' }}
            transition={{
              duration: Math.random() * 1 + 0.5, // Reduced from 2 + 1
              repeat: Infinity,
              delay: Math.random() * 1, // Reduced from 2
              ease: 'linear'
            }}
            className="absolute text-neon-cyan font-mono text-sm opacity-30"
            style={{ left: `${Math.random() * 100}%` }}
          >
            {Array.from({ length: Math.floor(Math.random() * 10) + 5 }).map((_, j) => (
              <div key={j} className="mb-1">
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Central glitch effect */}
      <div className="relative z-10 text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.15, // Reduced from 0.3
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="mb-8"
        >
          <div className="text-6xl md:text-8xl font-mono font-bold text-neon-magenta mb-4">
            {'[GLITCH]'.split('').map((char, i) => (
              <motion.span
                key={i}
                animate={{
                  y: [0, -10, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 0.1, // Reduced from 0.2
                  delay: i * 0.05, // Reduced from 0.1
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 0.4, repeat: Infinity }} // Reduced from 0.8
          className="font-mono text-xl text-neon-cyan"
        >
          {glitchText}
        </motion.div>

        <div className="mt-8 w-64 h-1 bg-neural-dark rounded-full mx-auto overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'easeOut' }} // Reduced from 6
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-magenta to-neon-cyan"
          />
        </div>
      </div>

      {/* Glitch overlay effects */}
      <motion.div
        animate={{
          opacity: [0, 0.3, 0],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 0.05, // Reduced from 0.1
          repeat: Infinity,
          repeatDelay: Math.random() * 1 // Reduced from 2
        }}
        className="absolute inset-0 bg-gradient-to-r from-neon-magenta/20 via-transparent to-neon-cyan/20 pointer-events-none"
      />
    </motion.div>
  );
};

export default GlitchEffect;