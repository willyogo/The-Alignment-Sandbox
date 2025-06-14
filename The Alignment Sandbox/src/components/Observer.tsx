import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity, Users, Clock, Eye } from 'lucide-react';

interface ObserverProps {
  onBack: () => void;
}

const Observer: React.FC<ObserverProps> = ({ onBack }) => {
  const [stats, setStats] = useState({
    activeReaders: Math.floor(Math.random() * 50) + 10,
    sessionsToday: Math.floor(Math.random() * 200) + 100,
    totalProgress: Math.floor(Math.random() * 70) + 30,
    lastActivity: new Date().toISOString()
  });

  const [logs, setLogs] = useState([
    'Neural pathway scan initiated...',
    'Reader engagement: HIGH',
    'Consciousness resonance detected',
    'SITA interaction logged',
    'Reality distortion minimal',
    'Simulation stability: 98.7%'
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeReaders: Math.max(1, prev.activeReaders + (Math.random() > 0.5 ? 1 : -1)),
        lastActivity: new Date().toISOString()
      }));

      if (Math.random() < 0.3) {
        const newLogs = [
          'New reader detected...',
          'Chapter transition recorded',
          'Glitch event processed',
          'Progress checkpoint saved',
          'Neural pattern analyzed',
          'Quantum state updated'
        ];
        
        setLogs(prev => [
          newLogs[Math.floor(Math.random() * newLogs.length)],
          ...prev.slice(0, 9)
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="min-h-screen bg-gradient-to-br from-space-deep via-neural-dark to-space-deep text-neural-light p-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neural-light hover:text-neon-cyan transition-colors duration-200 px-4 py-2 rounded"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-space-grotesk">Back to Story</span>
          </button>
          
          <div className="text-right">
            <h1 className="font-space-grotesk text-2xl font-bold text-neon-cyan">LYRA MONITORING</h1>
            <p className="font-mono text-sm text-chai-warm">Observer Protocol Active</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-space-mid/50 border border-neon-cyan/30 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-neon-cyan" />
              <span className="font-mono text-2xl text-neural-light">{stats.activeReaders}</span>
            </div>
            <div className="text-sm text-chai-warm">Active Readers</div>
            <div className="text-xs text-neural-light opacity-60 mt-1">Currently engaged</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-space-mid/50 border border-neon-magenta/30 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-neon-magenta" />
              <span className="font-mono text-2xl text-neural-light">{stats.sessionsToday}</span>
            </div>
            <div className="text-sm text-chai-warm">Sessions Today</div>
            <div className="text-xs text-neural-light opacity-60 mt-1">24h period</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-space-mid/50 border border-banyan-green/30 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-banyan-green" />
              <span className="font-mono text-2xl text-neural-light">{stats.totalProgress}%</span>
            </div>
            <div className="text-sm text-chai-warm">Avg Progress</div>
            <div className="text-xs text-neural-light opacity-60 mt-1">All readers</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-space-mid/50 border border-chai-warm/30 rounded-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-chai-warm" />
              <span className="font-mono text-sm text-neural-light">
                {new Date(stats.lastActivity).toLocaleTimeString()}
              </span>
            </div>
            <div className="text-sm text-chai-warm">Last Activity</div>
            <div className="text-xs text-neural-light opacity-60 mt-1">Real-time</div>
          </motion.div>
        </div>

        {/* Activity Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-space-mid/30 border border-neural-dark rounded-lg p-6"
        >
          <h2 className="font-space-grotesk text-xl font-bold text-neon-cyan mb-4">
            System Activity Log
          </h2>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {logs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-3 py-2 border-b border-neural-dark/30"
              >
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
                <span className="font-mono text-sm text-neural-light flex-1">{log}</span>
                <span className="font-mono text-xs text-chai-warm opacity-60">
                  {new Date().toLocaleTimeString()}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Console */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-space-deep/80 border border-neon-cyan/50 rounded-lg p-6"
        >
          <div className="font-mono text-sm text-neon-cyan mb-4">LYRA_CONSOLE v2.157.3</div>
          <div className="font-mono text-sm text-neural-light space-y-1">
            <div>{'>'} Monitoring alignment_sandbox_reader.exe</div>
            <div>{'>'} Neural pathway mapping: ACTIVE</div>
            <div>{'>'} Consciousness resonance: DETECTED</div>
            <div>{'>'} Reality distortion levels: MINIMAL</div>
            <div>{'>'} Observer effect: <span className="text-neon-magenta">ACKNOWLEDGED</span></div>
            <div className="flex items-center">
              <span>{'>'} </span>
              <div className="ml-1 w-2 h-4 bg-neon-cyan animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Observer;