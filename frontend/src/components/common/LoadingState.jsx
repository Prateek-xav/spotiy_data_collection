import { CheckCircle2, Loader2, Circle, Activity } from 'lucide-react';

export default function LoadingState({
  title = 'Processing Spotify Data',
  subtitle = 'Analyzing listening patterns and generating ML feature vector...',
  steps = [],
  progressPercent = 0
}) {
  return (
    <div className="max-w-xl mx-auto px-4 py-12 sm:py-16 space-y-8 text-center animate-in fade-in duration-300">
      
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-3xl bg-[#141B24] border border-[#26313C] flex items-center justify-center text-[#1DB954] mx-auto shadow-2xl relative">
        <Activity className="w-8 h-8 animate-pulse" />
        <div className="absolute -inset-1 rounded-3xl bg-[#1DB954]/10 blur-sm -z-10 animate-pulse" />
      </div>

      {/* Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-[#1DB954] font-semibold">
          SPOTIFY AUTOMATED FEATURE PIPELINE
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F5F7FA]">
          {title}
        </h1>
        <p className="text-sm text-[#A7B0BC]">
          {subtitle}
        </p>
      </div>

      {/* Overall Progress Bar */}
      <div className="w-full bg-[#0E141B] h-2.5 rounded-full overflow-hidden border border-[#26313C]">
        <div
          className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ED760] transition-all duration-300 rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
      </div>

      {/* Step Progress List */}
      <div className="p-6 rounded-3xl bg-[#141B24] border border-[#26313C] text-left space-y-3.5 shadow-xl">
        {steps.map((step) => {
          const isDone = step.status === 'done';
          const isActive = step.status === 'active';

          return (
            <div
              key={step.id || step.label}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-200 ${
                isDone
                  ? 'bg-[#18212B] border-[#1DB954]/40 text-[#F5F7FA]'
                  : isActive
                  ? 'bg-[#0E141B] border-[#1DB954] text-[#1DB954] shadow-md shadow-[#1DB954]/10'
                  : 'bg-[#0E141B]/50 border-transparent text-[#6F7A87]'
              }`}
            >
              {isDone && <CheckCircle2 className="w-5 h-5 text-[#1DB954] shrink-0 stroke-[2.5]" />}
              {isActive && <Loader2 className="w-5 h-5 text-[#1DB954] animate-spin shrink-0" />}
              {!isDone && !isActive && <Circle className="w-5 h-5 text-[#6F7A87] shrink-0" />}
              <span className="text-sm font-medium">{step.label}</span>
            </div>
          );
        })}
      </div>

    </div>
  );
}
