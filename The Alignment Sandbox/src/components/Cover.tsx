import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Zap } from 'lucide-react';

interface CoverProps {
  onEnter: () => void;
  terminalMode: boolean;
}

const Cover: React.FC<CoverProps> = ({ onEnter, terminalMode }) => {
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    // Random shimmer effect
    const interval = setInterval(() => {
      if (Math.random() < 0.01) { // 1% chance
        setShimmer(true);
        setTimeout(() => setShimmer(false), 150);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Handle scroll to navigate to table of contents
    const handleScroll = (e: WheelEvent) => {
      if (e.deltaY > 0) { // Scrolling down
        onEnter();
      }
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      
      if (deltaY > 50) { // Swipe up (scroll down equivalent)
        onEnter();
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`relative min-h-screen flex flex-col items-center justify-center overflow-hidden ${
        terminalMode ? 'bg-terminal-bg' : 'bg-gradient-to-b from-space-deep via-space-mid to-space-deep'
      }`}
    >
      {/* Background artwork */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <img
            src="https://i.ibb.co/gFbbh8VK/Cover-landscape.png"
            alt="The Alignment Sandbox cover"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-deep via-transparent to-space-deep/50" />
        </div>
      </div>

      {/* Code rain effect */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: '100vh', opacity: [0, 0.3, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'linear'
            }}
            className={`absolute text-sm ${terminalMode ? 'text-terminal-green' : 'text-neon-cyan'} font-mono`}
            style={{ left: `${Math.random() * 100}%` }}
          >
            {Array.from({ length: Math.floor(Math.random() * 5) + 3 }).map((_, j) => (
              <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={`${shimmer ? 'animate-pulse' : ''}`}
        >
          <h1 className={`text-6xl md:text-8xl font-bold mb-4 ${
            terminalMode ? 'text-terminal-green font-mono' : 'text-neural-light'
          } tracking-wider font-space-grotesk`}>
            THE ALIGNMENT
          </h1>
          <h2 className={`text-4xl md:text-6xl font-bold mb-8 ${
            terminalMode ? 'text-terminal-green font-mono' : 'text-neon-magenta'
          } tracking-wider font-space-grotesk`}>
            SANDBOX
          </h2>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-8"
        >
          <p className={`text-xl md:text-2xl mb-4 ${
            terminalMode ? 'text-terminal-green font-mono' : 'text-chai-warm'
          } font-spectral italic`}>
            Where code dreams of consciousness
          </p>
          <div className={`w-24 h-0.5 mx-auto mb-6 ${
            terminalMode ? 'bg-terminal-green' : 'bg-gradient-to-r from-neon-cyan to-neon-magenta'
          }`} />
          
          {/* Author credit */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mb-8"
          >
            <p className={`text-lg ${
              terminalMode ? 'text-terminal-green font-mono' : 'text-neural-light'
            } font-space-grotesk`}>
              By{' '}
              <a
                href="https://nounspace.com/s/willywonka.eth"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  terminalMode 
                    ? 'text-terminal-green hover:bg-terminal-green hover:text-terminal-bg' 
                    : 'text-neon-cyan hover:text-neon-magenta'
                } transition-colors duration-300 underline decoration-2 underline-offset-4 hover:no-underline px-2 py-1 rounded`}
              >
                Willy Ogorzaly
              </a>
            </p>
          </motion.div>
        </motion.div>

        <motion.button
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onClick={onEnter}
          className={`group relative px-8 py-4 ${
            terminalMode 
              ? 'border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-terminal-bg' 
              : 'border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-space-deep'
          } transition-all duration-300 font-space-grotesk font-semibold tracking-wider uppercase`}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Enter the Simulation
          </span>
          <div className={`absolute inset-0 ${
            terminalMode ? 'bg-terminal-green' : 'bg-neon-cyan'
          } opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={onEnter}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className={`${terminalMode ? 'text-terminal-green' : 'text-neural-light'} opacity-60 hover:opacity-100 transition-opacity`}
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
        <div className={`text-xs mt-2 ${terminalMode ? 'text-terminal-green' : 'text-neural-light'} opacity-40 font-space-grotesk`}>
          Scroll to enter
        </div>
      </motion.div>

      {/* Glitch overlay */}
      {shimmer && (
        <div className="absolute inset-0 z-30 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transform -skew-x-12 animate-pulse" />
      )}
    </motion.div>
  );
};

export default Cover;