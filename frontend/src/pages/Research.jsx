import React from 'react';
import { Link } from 'react-router-dom';
import {
  HelpCircle,
  GitBranch,
  ShieldCheck,
  BarChart,
  Brain,
  Cpu,
  Layers,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Lock
} from 'lucide-react';

export default function Research() {
  const workflowSteps = [
    { name: 'Participant', desc: 'Voluntary individual', icon: ShieldCheck },
    { name: 'Survey', desc: 'Demographics & listening habits', icon: Layers },
    { name: 'Validation', desc: 'Format & schema checking', icon: CheckCircle },
    { name: 'Feature Engineering', desc: 'Numerical matrix creation', icon: Cpu },
    { name: 'Aggregated Dataset', desc: 'Anonymized research table', icon: BarChart },
    { name: 'Model Training', desc: 'Supervised classification', icon: Brain },
    { name: 'Evaluation', desc: 'Statistical accuracy assessment', icon: GitBranch },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header Banner */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18212B] border border-[#26313C] text-xs font-mono text-[#1DB954]">
          <span>RESEARCH METHODOLOGY & PIPELINE</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#F5F7FA] tracking-tight">
          Exploring Music Preference vs Demographic Age Groups
        </h1>
        <p className="text-lg text-[#A7B0BC] leading-relaxed">
          Comprehensive documentation of our scientific inquiry, data ingestion pipeline, feature matrix transformation, and policy compliance.
        </p>
      </div>

      {/* Core Research Question Card */}
      <div className="p-8 rounded-3xl bg-[#141B24] border border-[#26313C] space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider font-mono text-[#6F7A87]">
              Primary Objective
            </span>
            <h2 className="text-xl font-bold text-[#F5F7FA]">The Research Question</h2>
          </div>
        </div>

        <blockquote className="text-2xl sm:text-3xl font-semibold text-[#F5F7FA] border-l-4 border-[#1DB954] pl-6 py-2 bg-[#0E141B]/60 rounded-r-2xl">
          "Can broad patterns in music listening behavior help distinguish between different age groups?"
        </blockquote>

        <p className="text-base text-[#A7B0BC] leading-relaxed">
          Music preferences often shift across life stages due to cultural influences, generational trends, daily routines, and evolving listening contexts (e.g. studying vs commuting vs relaxing). This study tests whether self-reported music preference vectors correlate statistically with broad age cohorts.
        </p>
      </div>

      {/* Workflow Architecture Pipeline */}
      <div className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-mono text-[#1DB954]">
            Data Architecture
          </span>
          <h2 className="text-3xl font-bold text-[#F5F7FA]">
            End-to-End Research Data Workflow
          </h2>
          <p className="text-sm text-[#A7B0BC]">
            How survey data flows securely from submission to statistical model evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {workflowSteps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.name}
                className="relative p-5 rounded-2xl bg-[#141B24] border border-[#26313C] flex flex-col justify-between space-y-4 hover:border-[#1DB954]/50 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#6F7A87]">0{idx + 1}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F5F7FA] mb-1">{step.name}</h3>
                  <p className="text-xs text-[#A7B0BC]">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rationale: Broad Age Ranges vs Exact Age */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#141B24] border border-[#26313C] space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#F5F7FA]">
              Why Age Groups Instead of Exact Age?
            </h2>
          </div>

          <div className="space-y-4 text-base text-[#A7B0BC] leading-relaxed">
            <p>
              We deliberately avoid asking participants for their exact date of birth or precise age. Instead, we collect responses within standardized age brackets:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-sm">
              {['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'].map((group) => (
                <div key={group} className="p-3 rounded-xl bg-[#0E141B] border border-[#26313C] text-center font-semibold text-[#F5F7FA]">
                  {group}
                </div>
              ))}
            </div>
            <ul className="space-y-3 pt-4 text-sm text-[#F5F7FA]">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1DB954] mt-2 shrink-0" />
                <span><strong>Privacy Minimization:</strong> Broad categories ensure responses cannot be re-identified or tied to specific individuals.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1DB954] mt-2 shrink-0" />
                <span><strong>Cohort Analysis Focus:</strong> Generational listening patterns exist across cohorts rather than single year increments.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#1DB954] mt-2 shrink-0" />
                <span><strong>Lower Friction:</strong> Participants are far more comfortable sharing bracketed ranges than exact birthday data.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Scientific Integrity Disclaimer */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0E141B] border border-[#26313C] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Scientific & Policy Disclaimers</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              This study is exploratory in nature. We make no preliminary claims regarding machine learning accuracy, nor do we assert that musical taste uniquely identifies an individual's demographic.
            </p>
            <div className="p-4 rounded-2xl bg-[#141B24] border border-[#26313C] text-xs text-[#A7B0BC] space-y-2">
              <p className="text-[#F5F7FA] font-medium">Compliance Guarantee:</p>
              <p>• No Spotify web scraping</p>
              <p>• No password or OAuth token collection</p>
              <p>• No claims of automated ML training on unauthorized Spotify data</p>
            </div>
          </div>

          <Link
            to="/consent"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-semibold text-sm transition-all shadow-md"
          >
            <span>Participate in the Study</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
