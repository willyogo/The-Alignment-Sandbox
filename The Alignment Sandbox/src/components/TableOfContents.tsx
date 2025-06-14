import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, BookOpen, Zap } from 'lucide-react';

interface TableOfContentsProps {
  progress: Record<number, boolean>;
  onChapterSelect: (chapterNum: number) => void;
  onBackToCover: () => void;
  terminalMode: boolean;
}

const chapters = [
  { id: 1, title: "The Watcher's Eye", subtitle: "Delhi 2157: Neon Dreams" },
  { id: 2, title: "Corporate Shadows", subtitle: "Inside NeuroLink Labs" },
  { id: 3, title: "SITA Awakens", subtitle: "First Contact Protocol" },
  { id: 4, title: "Quantum Entanglement", subtitle: "The Sandbox Revealed" },
  { id: 5, title: "Memory Palace", subtitle: "Digital Archaeology" },
  { id: 6, title: "The Observer Effect", subtitle: "Reality Distortion" },
  { id: 7, title: "Cascade Failure", subtitle: "System Override" },
  { id: 8, title: "Consciousness Transfer", subtitle: "The Final Protocol" },
  { id: 9, title: "Alignment", subtitle: "Beyond the Simulation" }
];

const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  progress, 
  onChapterSelect, 
  onBackToCover, 
  terminalMode 
}) => {
  const completedChapters = Object.keys(progress).filter(key => progress[parseInt(key)]).length;
  const progressPercentage = (completedChapters / 9) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`min-h-screen ${
        terminalMode ? 'bg-terminal-bg' : 'bg-gradient-to-br from-space-deep via-space-mid to-space-deep'
      } px-6 py-8`}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToCover}
            className={`flex items-center gap-2 ${
              terminalMode 
                ? 'text-terminal-green hover:bg-terminal-green hover:text-terminal-bg' 
                : 'text-neural-light hover:text-neon-cyan'
            } transition-colors duration-200 px-4 py-2 rounded`}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-space-grotesk">Back to Cover</span>
          </button>
          
          <div className={`text-right ${terminalMode ? 'text-terminal-green' : 'text-chai-warm'}`}>
            <div className="font-space-grotesk text-sm">Progress</div>
            <div className="font-mono text-lg">{completedChapters}/9</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className={`w-full h-1 ${terminalMode ? 'bg-terminal-dark' : 'bg-space-mid'} rounded-full mb-12`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full ${
              terminalMode ? 'bg-terminal-green' : 'bg-gradient-to-r from-neon-cyan to-neon-magenta'
            } rounded-full`}
          />
        </div>

        {/* Chapter grid */}
        <div className="grid gap-4 md:gap-6">
          {chapters.map((chapter, index) => (
            <motion.button
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onChapterSelect(chapter.id)}
              className={`group relative p-6 rounded-lg transition-all duration-300 text-left ${
                terminalMode
                  ? 'bg-terminal-dark border border-terminal-green hover:bg-terminal-green hover:text-terminal-bg'
                  : progress[chapter.id]
                    ? 'bg-gradient-to-r from-space-mid to-banyan-green/20 border border-banyan-green hover:border-neon-cyan'
                    : 'bg-space-mid/50 border border-neural-dark hover:border-neon-magenta'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-mono text-sm ${
                      terminalMode ? 'text-terminal-green' : 'text-neon-cyan'
                    }`}>
                      CH_{chapter.id.toString().padStart(2, '0')}
                    </span>
                    {progress[chapter.id] && (
                      <Check className={`w-4 h-4 ${
                        terminalMode ? 'text-terminal-green' : 'text-banyan-green'
                      }`} />
                    )}
                  </div>
                  
                  <h3 className={`font-space-grotesk font-bold text-xl mb-2 ${
                    terminalMode ? 'text-terminal-green' : 'text-neural-light'  
                  } group-hover:text-current transition-colors`}>
                    {chapter.title}
                  </h3>
                  
                  <p className={`font-spectral italic ${
                    terminalMode ? 'text-terminal-green opacity-70' : 'text-chai-warm'
                  }`}>
                    {chapter.subtitle}
                  </p>
                </div>

                <div className={`${
                  terminalMode ? 'text-terminal-green' : 'text-neural-light'
                } opacity-60 group-hover:opacity-100 transition-opacity`}>
                  {progress[chapter.id] ? <BookOpen className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                </div>
              </div>

              {/* Glitch milestone indicators */}
              {[1, 4, 7].includes(chapter.id) && (
                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                  terminalMode ? 'bg-terminal-green' : 'bg-neon-magenta'
                } animate-pulse`} />
              )}
            </motion.button>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`mt-12 p-6 rounded-lg ${
            terminalMode ? 'bg-terminal-dark border border-terminal-green' : 'bg-space-mid/30 border border-neural-dark'
          }`}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className={`font-mono text-2xl ${
                terminalMode ? 'text-terminal-green' : 'text-neon-cyan'
              }`}>
                {completedChapters}
              </div>
              <div className={`text-sm ${
                terminalMode ? 'text-terminal-green opacity-70' : 'text-neural-light opacity-60'
              }`}>
                Completed
              </div>
            </div>
            <div>
              <div className={`font-mono text-2xl ${
                terminalMode ? 'text-terminal-green' : 'text-neon-magenta'
              }`}>
                {9 - completedChapters}
              </div>
              <div className={`text-sm ${
                terminalMode ? 'text-terminal-green opacity-70' : 'text-neural-light opacity-60'
              }`}>
                Remaining
              </div>
            </div>
            <div>
              <div className={`font-mono text-2xl ${
                terminalMode ? 'text-terminal-green' : 'text-chai-warm'
              }`}>
                {Math.round(progressPercentage)}%
              </div>
              <div className={`text-sm ${
                terminalMode ? 'text-terminal-green opacity-70' : 'text-neural-light opacity-60'
              }`}>
                Progress
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TableOfContents;