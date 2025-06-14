import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cover from './components/Cover';
import TableOfContents from './components/TableOfContents';
import ChapterReader from './components/ChapterReader';
import ArtworkLightbox from './components/ArtworkLightbox';
import GlitchEffect from './components/GlitchEffect';
import Observer from './components/Observer';
import { useLocalStorage } from './hooks/useLocalStorage';

export interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  artwork: string;
  glitchAfter?: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<'cover' | 'contents' | 'chapter' | 'observer'>('cover');
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [showGlitch, setShowGlitch] = useState(false);
  const [readingProgress, setReadingProgress] = useLocalStorage('alignment-progress', {});
  const [konamiCode, setKonamiCode] = useState('');
  const [terminalMode, setTerminalMode] = useState(false);

  // Konami code detection
  const konamiSequence = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newCode = konamiCode + e.code;
      if (konamiSequence.startsWith(newCode)) {
        setKonamiCode(newCode);
        if (newCode === konamiSequence) {
          setTerminalMode(!terminalMode);
          setKonamiCode('');
        }
      } else {
        setKonamiCode('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiCode, terminalMode]);

  const handleChapterComplete = (chapterNum: number) => {
    const newProgress = { ...readingProgress, [chapterNum]: true };
    setReadingProgress(newProgress);
  };

  const handleNextChapter = (currentChapterNum: number) => {
    // Check if this is a glitch chapter (1, 4, 7)
    if ([1, 4, 7].includes(currentChapterNum)) {
      setShowGlitch(true);
    } else {
      // Navigate directly to next chapter
      if (currentChapterNum < 9) {
        setCurrentChapter(currentChapterNum + 1);
      } else {
        setCurrentView('contents');
      }
    }
  };

  const handleGlitchComplete = () => {
    setShowGlitch(false);
    if (currentChapter < 9) {
      setCurrentChapter(currentChapter + 1);
    } else {
      setCurrentView('contents');
    }
  };

  return (
    <div className={`min-h-screen bg-space-deep text-neural-light overflow-hidden ${terminalMode ? 'terminal-mode' : ''}`}>
      <AnimatePresence mode="wait">
        {currentView === 'cover' && (
          <Cover 
            key="cover"
            onEnter={() => setCurrentView('contents')}
            terminalMode={terminalMode}
          />
        )}
        
        {currentView === 'contents' && (
          <TableOfContents
            key="contents"
            progress={readingProgress}
            onChapterSelect={(chapterNum) => {
              setCurrentChapter(chapterNum);
              setCurrentView('chapter');
            }}
            onBackToCover={() => setCurrentView('cover')}
            terminalMode={terminalMode}
          />
        )}
        
        {currentView === 'chapter' && (
          <ChapterReader
            key={`chapter-${currentChapter}`}
            chapterNumber={currentChapter}
            onBack={() => setCurrentView('contents')}
            onChapterComplete={handleChapterComplete}
            onNextChapter={handleNextChapter}
            onImageClick={setLightboxImage}
            terminalMode={terminalMode}
          />
        )}

        {currentView === 'observer' && (
          <Observer
            key="observer"
            onBack={() => setCurrentView('contents')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {lightboxImage && (
          <ArtworkLightbox
            imageSrc={lightboxImage}
            onClose={() => setLightboxImage(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGlitch && (
          <GlitchEffect
            onComplete={handleGlitchComplete}
          />
        )}
      </AnimatePresence>

      {/* Hidden observer link */}
      <button
        onClick={() => setCurrentView('observer')}
        className="fixed bottom-2 right-2 text-xs opacity-10 hover:opacity-50 transition-opacity"
      >
        Watcher log ▸ Level complete ✔
      </button>
    </div>
  );
}

export default App;