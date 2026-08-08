import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Activity, Info, Cpu, Layers } from 'lucide-react';

const AGE_CLUSTERS = [
  { label: 'Under 18', freq: 45, density: 'High Pop / Gaming', color: 'bg-emerald-500' },
  { label: '18-24', freq: 85, density: 'Hip-Hop / Electronic / Indie', color: 'bg-[#1DB954]' },
  { label: '25-34', freq: 70, density: 'Indie / Pop / Rock', color: 'bg-[#1ED760]' },
  { label: '35-44', freq: 55, density: 'Alternative / Rock / Pop', color: 'bg-cyan-500' },
  { label: '45-54', freq: 40, density: 'Classic Rock / R&B / Jazz', color: 'bg-blue-500' },
  { label: '55+', freq: 30, density: 'Classical / Jazz / Country', color: 'bg-indigo-500' },
];

export default function ResearchVisualization() {
  const [activeCluster, setActiveCluster] = useState(1); // Default to 18-24

  return (
    <div className="relative rounded-2xl bg-[#141B24] border border-[#26313C] p-6 sm:p-8 shadow-2xl overflow-hidden group">
      
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#26313C]/80">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-mono text-[#6F7A87]">
              Conceptual Feature Map
            </span>
            <h4 className="text-sm font-semibold text-[#F5F7FA]">
              Music Preference vs Age Group Distribution
            </h4>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#18212B] border border-[#26313C] text-xs text-[#A7B0BC]">
          <Info className="w-3.5 h-3.5 text-[#1DB954]" />
          <span>Research visualization</span>
        </div>
      </div>

      {/* Abstract Waveform & Cluster Graphic */}
      <div className="py-8 space-y-6">
        
        {/* Animated Freq Bars Visual */}
        <div className="h-28 flex items-end justify-between gap-1.5 sm:gap-3 px-2 sm:px-4 bg-[#0E141B] rounded-xl border border-[#26313C]/60 p-4">
          {Array.from({ length: 24 }).map((_, i) => {
            const height = Math.floor(Math.sin((i / 24) * Math.PI * 2) * 35 + 50 + (i % 3) * 10);
            const isHighlight = i >= 4 && i <= 10;
            return (
              <motion.div
                key={i}
                initial={{ height: '20%' }}
                animate={{ height: `${height}%` }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 1.5 + (i % 5) * 0.3,
                  ease: 'easeInOut'
                }}
                className={`w-full rounded-t-sm transition-colors ${
                  isHighlight ? 'bg-[#1DB954]' : 'bg-[#26313C]'
                }`}
              />
            );
          })}
        </div>

        {/* Interactive Age Group Cluster Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {AGE_CLUSTERS.map((cluster, idx) => {
            const isSelected = activeCluster === idx;
            return (
              <button
                key={cluster.label}
                onClick={() => setActiveCluster(idx)}
                className={`p-3 rounded-xl border text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#1DB954] ${
                  isSelected
                    ? 'bg-[#18212B] border-[#1DB954] text-[#F5F7FA] shadow-md shadow-[#1DB954]/10'
                    : 'bg-[#0E141B] border-[#26313C] text-[#A7B0BC] hover:border-[#6F7A87]'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold mb-1">
                  <span>{cluster.label}</span>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#1DB954]' : 'bg-[#6F7A87]'}`} />
                </div>
                <div className="w-full bg-[#090D12] h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-[#1DB954] rounded-full transition-all duration-300"
                    style={{ width: `${cluster.freq}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#6F7A87] truncate">
                  {cluster.density}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Cluster Context Box */}
      <div className="bg-[#0E141B] rounded-xl border border-[#26313C] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Layers className="w-4 h-4 text-[#1DB954] shrink-0" />
          <div>
            <span className="text-[#F5F7FA] font-medium">
              Sample Feature Vector for "{AGE_CLUSTERS[activeCluster].label}" Group
            </span>
            <p className="text-[#A7B0BC]">
              Aggregated listening habits: {AGE_CLUSTERS[activeCluster].density}
            </p>
          </div>
        </div>
        <div className="text-[11px] font-mono text-[#6F7A87] bg-[#141B24] px-2.5 py-1 rounded border border-[#26313C]">
          Dataset ID: AGG_FEAT_v1.0
        </div>
      </div>

      {/* Clarification Disclaimer */}
      <p className="mt-4 text-[11px] text-[#6F7A87] text-center italic">
        * Note: This visualization illustrates theoretical feature distributions for statistical study. It does not predict or infer individual identities.
      </p>
    </div>
  );
}
