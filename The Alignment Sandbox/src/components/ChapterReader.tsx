import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX, Maximize2, ArrowRight, Share } from 'lucide-react';
import { getChapterContent } from '../data/chapters';

interface ChapterReaderProps {
  chapterNumber: number;
  onBack: () => void;
  onChapterComplete: (chapterNumber: number) => void;
  onNextChapter: (chapterNumber: number) => void;
  onImageClick: (imageSrc: string) => void;
  terminalMode: boolean;
}

const ChapterReader: React.FC<ChapterReaderProps> = ({
  chapterNumber,
  onBack,
  onChapterComplete,
  onNextChapter,
  onImageClick,
  terminalMode
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [ambientAudio, setAmbientAudio] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  
  const chapter = getChapterContent(chapterNumber);
  const isLastChapter = chapterNumber === 9;
  const isGlitchChapter = [1, 4, 7].includes(chapterNumber);

  useEffect(() => {
    // Scroll to top when component mounts (new chapter loads)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [chapterNumber]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setReadingProgress(Math.min(progress, 100));
      
      // Mark as complete and show next button when 90% read
      if (progress > 90) {
        onChapterComplete(chapterNumber);
        setShowNextButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapterNumber, onChapterComplete]);

  const handleNextChapterClick = () => {
    if (isLastChapter) {
      // Share on X (Twitter)
      const tweetText = "I just finished reading The Alignment Sandbox and my mind is blown! Read it for free here: https://stellular-torrone-4af42f.netlify.app/";
      const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, '_blank', 'noopener,noreferrer');
    } else {
      onNextChapter(chapterNumber);
    }
  };

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`min-h-screen ${
        terminalMode ? 'bg-terminal-bg' : 'bg-gradient-to-b from-space-deep to-space-mid'
      }`}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className={`h-1 ${terminalMode ? 'bg-terminal-dark' : 'bg-space-deep'}`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${readingProgress}%` }}
            className={`h-full ${
              terminalMode ? 'bg-terminal-green' : 'bg-gradient-to-r from-neon-cyan to-neon-magenta'
            }`}
          />
        </div>
      </div>

      {/* Header controls */}
      <div className="sticky top-1 z-40 px-6 py-4 backdrop-blur-md bg-space-deep/50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${
              terminalMode 
                ? 'text-terminal-green hover:bg-terminal-green hover:text-terminal-bg' 
                : 'text-neural-light hover:text-neon-cyan'
            } transition-colors duration-200 px-3 py-2 rounded`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-space-grotesk text-sm">Contents</span>
          </button>

          <div className="flex items-center gap-4">
            {/* Font size controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className={`w-8 h-8 rounded ${
                  terminalMode 
                    ? 'text-terminal-green hover:bg-terminal-green hover:text-terminal-bg' 
                    : 'text-neural-light hover:bg-neural-dark'
                } transition-colors text-xs`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className={`w-8 h-8 rounded ${
                  terminalMode 
                    ? 'text-terminal-green hover:bg-terminal-green hover:text-terminal-bg' 
                    : 'text-neural-light hover:bg-neural-dark'
                } transition-colors text-sm`}
              >
                A+
              </button>
            </div>

            {/* Ambient audio toggle */}
            <button
              onClick={() => setAmbientAudio(!ambientAudio)}
              className={`p-2 rounded ${
                terminalMode 
                  ? 'text-terminal-green hover:bg-terminal-green hover:text-terminal-bg' 
                  : 'text-neural-light hover:bg-neural-dark'
              } transition-colors`}
            >
              {ambientAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Chapter content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* Hero artwork */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12 rounded-lg overflow-hidden group cursor-pointer"
          onClick={() => onImageClick(chapter.artwork)}
        >
          <img
            src={chapter.artwork}
            alt={`Chapter ${chapterNumber} artwork`}
            className="w-full h-64 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-space-deep/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className={`font-mono text-sm mb-2 ${
              terminalMode ? 'text-terminal-green' : 'text-neon-cyan'
            }`}>
              CH_{chapterNumber.toString().padStart(2, '0')}
            </div>
            <h1 className={`font-space-grotesk font-bold text-3xl md:text-4xl mb-2 ${
              terminalMode ? 'text-terminal-green' : 'text-neural-light'
            }`}>
              {chapter.title}
            </h1>
            <p className={`font-spectral italic text-lg ${
              terminalMode ? 'text-terminal-green opacity-70' : 'text-chai-warm'
            }`}>
              {chapter.subtitle}
            </p>
          </div>
          <button className="absolute top-4 right-4 p-2 bg-space-deep/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 className="w-4 h-4 text-neutral-light" />
          </button>
        </motion.div>

        {/* Chapter text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="prose prose-invert max-w-none"
          style={{ fontSize: `${fontSize}px` }}
        >
          <div className={`font-spectral leading-relaxed ${
            terminalMode ? 'text-terminal-green' : 'text-neural-light'
          }`}>
            {chapter.content.split('\n\n').map((paragraph, index) => {
              // Check if this is a SITA dialogue
              if (paragraph.startsWith('> **SITA')) {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`my-8 p-4 rounded-lg border-l-4 ${
                      terminalMode 
                        ? 'bg-terminal-dark border-terminal-green' 
                        : 'bg-neon-cyan/5 border-neon-cyan'
                    }`}
                  >
                    <div className={`font-mono text-sm ${
                      terminalMode ? 'text-terminal-green' : 'text-neon-cyan'
                    }`}>
                      {paragraph.replace('> **SITA Whisper:** "', '').replace('"', '')}
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="mb-6"
                >
                  {paragraph}
                </motion.p>
              );
            })}
          </div>
        </motion.div>

        {/* Next Chapter / Share Story button */}
        {showNextButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleNextChapterClick}
            className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-full ${
              terminalMode 
                ? 'bg-terminal-green text-terminal-bg hover:bg-terminal-green/90' 
                : isLastChapter
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-space-deep hover:from-neon-cyan/90 hover:to-neon-magenta/90'
                  : isGlitchChapter
                    ? 'bg-gradient-to-r from-neon-magenta to-neon-cyan text-space-deep hover:from-neon-magenta/90 hover:to-neon-cyan/90'
                    : 'bg-gradient-to-r from-neon-cyan to-neon-magenta text-space-deep hover:from-neon-cyan/90 hover:to-neon-magenta/90'
            } font-space-grotesk font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            {isLastChapter ? (
              <>
                <span>Share Story</span>
                <Share className="w-5 h-5" />
              </>
            ) : isGlitchChapter ? (
              <>
                <span>Next Chapter</span>
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-2 h-2 bg-current animate-pulse" />
                </div>
              </>
            ) : (
              <>
                <span>Next Chapter</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ChapterReader;