import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Clock,
  Shield,
  BookOpen,
  CheckCircle2,
  FileCheck2,
  ArrowRight,
  Sliders,
  Database,
  Lock,
  Sparkles,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import ResearchVisualization from '../components/landing/ResearchVisualization';

export default function Home() {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18212B] border border-[#26313C] text-xs font-medium text-[#1DB954]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Research Project</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F7FA] tracking-tight leading-[1.1]">
              Can music listening patterns reveal your <span className="text-[#1DB954]">age group?</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#A7B0BC] leading-relaxed max-w-2xl font-normal">
              We're studying whether broad patterns in music preferences and listening behavior are associated with different age groups through voluntary survey responses.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/consent"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-semibold text-base transition-all duration-150 shadow-lg shadow-[#1DB954]/20 hover:shadow-[#1DB954]/30 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              >
                <span>Take the survey</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#141B24] hover:bg-[#18212B] text-[#F5F7FA] border border-[#26313C] hover:border-[#6F7A87] font-medium text-base transition-all focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
              >
                <span>How it works</span>
              </a>
            </div>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-medium text-[#6F7A87]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#1DB954]" />
                <span>2-3 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#1DB954]" />
                <span>100% Voluntary</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1DB954]" />
                <span>Academic Study</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visualization */}
          <div className="lg:col-span-6">
            <ResearchVisualization />
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Trust Card 1 */}
          <div className="p-6 rounded-2xl bg-[#141B24] border border-[#26313C] card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Voluntary</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              You choose whether to participate. You can decline or exit the survey at any point without obligation.
            </p>
          </div>

          {/* Trust Card 2 */}
          <div className="p-6 rounded-2xl bg-[#141B24] border border-[#26313C] card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Transparent</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              We clearly explain what information is collected, how features are engineered, and how the data is used.
            </p>
          </div>

          {/* Trust Card 3 */}
          <div className="p-6 rounded-2xl bg-[#141B24] border border-[#26313C] card-hover space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Research-Focused</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              Responses are collected purely for stated statistical analysis and age group modeling research.
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest font-mono text-[#1DB954]">
            Methodology Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA]">
            How the research process works
          </h2>
          <p className="text-base sm:text-lg text-[#A7B0BC]">
            A simple, four-step transparent procedure designed to safeguard participant privacy while gathering statistical insight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 01 */}
          <div className="relative p-6 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-4">
            <span className="text-4xl font-extrabold font-mono text-[#1DB954]/40">
              01
            </span>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Read</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              Review what the study collects and why, including privacy terms and data deletion options.
            </p>
          </div>

          {/* Step 02 */}
          <div className="relative p-6 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-4">
            <span className="text-4xl font-extrabold font-mono text-[#1DB954]/40">
              02
            </span>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Answer</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              Complete a short survey about your age group, region, listening contexts, and preferred genres.
            </p>
          </div>

          {/* Step 03 */}
          <div className="relative p-6 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-4">
            <span className="text-4xl font-extrabold font-mono text-[#1DB954]/40">
              03
            </span>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Contribute</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              Submit your responses voluntarily. No passwords or account credentials are ever requested.
            </p>
          </div>

          {/* Step 04 */}
          <div className="relative p-6 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-4">
            <span className="text-4xl font-extrabold font-mono text-[#1DB954]/40">
              04
            </span>
            <h3 className="text-xl font-bold text-[#F5F7FA]">Analyze</h3>
            <p className="text-sm text-[#A7B0BC] leading-relaxed">
              Researchers analyze permitted, aggregated datasets to evaluate pattern correlation across age groups.
            </p>
          </div>

        </div>
      </section>

      {/* DATA TRANSPARENCY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0E141B] rounded-3xl border border-[#26313C] p-8 sm:p-12 space-y-10">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-widest font-mono text-[#1DB954]">
              Data Transparency
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA]">
              What information do we collect?
            </h2>
            <p className="text-base text-[#A7B0BC]">
              We limit data collection exclusively to variables required for demographic pattern research.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: Survey Info */}
            <div className="p-6 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#F5F7FA]">Survey Information</h3>
              </div>
              <p className="text-sm text-[#A7B0BC]">
                Directly collected via voluntary form fields:
              </p>
              <ul className="space-y-2 text-sm text-[#F5F7FA]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  <span>Demographic age group (e.g. 18-24, 25-34)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  <span>Country of residence</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  <span>Occupation status (optional)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  <span>Primary listening context (Studying, Work, Gym, etc.)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  <span>Top music genre preferences</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  <span>Approximate daily listening duration</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Optional Music Info */}
            <div className="p-6 rounded-2xl bg-[#141B24] border border-[#26313C] space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#18212B] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#F5F7FA]">Policy & Privacy Controls</h3>
              </div>
              <p className="text-sm text-[#A7B0BC]">
                Information we strictly <strong>DO NOT</strong> collect or scrape:
              </p>
              <ul className="space-y-2 text-sm text-[#F5F7FA]">
                <li className="flex items-center gap-2 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>NO exact age or date of birth</span>
                </li>
                <li className="flex items-center gap-2 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>NO Spotify passwords or tokens</span>
                </li>
                <li className="flex items-center gap-2 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>NO web scraping of streaming accounts</span>
                </li>
                <li className="flex items-center gap-2 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  <span>NO selling or commercial monetization</span>
                </li>
                <li className="flex items-center gap-2 text-[#1DB954]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
                  <span>Full compliance with Spotify Developer Terms</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* PRIVACY HIGHLIGHT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#141B24] border border-[#26313C] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18212B] border border-[#26313C] text-xs font-medium text-[#1DB954]">
              <Lock className="w-3.5 h-3.5" />
              <span>Participant Governance</span>
            </div>
            <h2 className="text-3xl font-bold text-[#F5F7FA]">
              Know what you're contributing.
            </h2>
            <p className="text-base text-[#A7B0BC] leading-relaxed">
              We want participants to understand what information is collected before they decide to participate. Learn about our data storage, retention rules, and how to request instant deletion.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/privacy"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#18212B] hover:bg-[#26313C] text-[#F5F7FA] border border-[#26313C] hover:border-[#6F7A87] font-semibold text-base transition-all focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            >
              <span>Read Privacy Policy</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA]">
          Ready to contribute to music demographic research?
        </h2>
        <p className="text-base sm:text-lg text-[#A7B0BC]">
          The survey takes less than 3 minutes to complete and requires no logins or credentials.
        </p>
        <div className="pt-2">
          <Link
            to="/consent"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#1DB954] hover:bg-[#1ED760] text-[#090D12] font-bold text-lg transition-all duration-150 shadow-xl shadow-[#1DB954]/25 hover:shadow-[#1DB954]/35 active:scale-[0.98]"
          >
            <span>Start Voluntary Survey</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}