import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ArtworkLightboxProps {
  imageSrc: string;
  onClose: () => void;
}

const ArtworkLightbox: React.FC<ArtworkLightboxProps> = ({ imageSrc, onClose }) => {
  const [zoom, setZoom] = React.useState(1);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-space-deep/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-60 flex items-center gap-2">
        <div className="flex items-center gap-1 bg-space-mid/80 rounded-lg p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomOut();
            }}
            className="p-2 text-neural-light hover:text-neon-cyan transition-colors rounded"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleReset();
            }}
            className="px-3 py-2 text-sm font-mono text-neural-light hover:text-neon-cyan transition-colors"
          >
            {Math.round(zoom * 100)}%
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleZoomIn();
            }}
            className="p-2 text-neural-light hover:text-neon-cyan transition-colors rounded"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={onClose}
          className="p-3 bg-space-mid/80 text-neural-light hover:text-neon-magenta transition-colors rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Image container */}
      <div className="absolute inset-4 flex items-center justify-center">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          src={imageSrc}
          alt="Artwork"
          className="max-w-full max-h-full object-contain cursor-move"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            transition: 'transform 0.2s ease-out'
          }}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={handleReset}
        />
      </div>

      {/* Metadata overlay */}
      <div className="absolute bottom-4 left-4 bg-space-mid/80 rounded-lg p-4 text-neural-light">
        <div className="font-mono text-sm text-neon-cyan mb-1">NEURAL_SCAN_ANALYSIS</div>
        <div className="text-sm opacity-60">
          Resolution: 1920x1080 • Format: WEBP • Neural signature detected
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkLightbox;