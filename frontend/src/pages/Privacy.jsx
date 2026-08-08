import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Lock, Trash2, Mail, ArrowRight } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18212B] border border-[#26313C] text-xs font-mono text-[#1DB954]">
          <ShieldCheck className="w-4 h-4" />
          <span>RESEARCH DATA GOVERNANCE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#F5F7FA] tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-base sm:text-lg text-[#A7B0BC]">
          Transparency regarding our voluntary survey data collection, processing standards, and participant rights.
        </p>
      </div>

      {/* Main Privacy Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#141B24] border border-[#26313C] space-y-10 text-sm text-[#A7B0BC] leading-relaxed shadow-xl">
        
        {/* Section 1: Overview */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            1. Overview
          </h2>
          <p>
            Spotify Age Research is an independent exploratory research project studying whether broad statistical patterns in self-reported music listening behavior correlate with demographic age groups. This privacy policy explains what data we gather, how we handle it, and how participants retain control.
          </p>
        </section>

        {/* Section 2: Information Collected */}
        <section className="space-y-3 border-t border-[#26313C] pt-6">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            2. Information We Collect
          </h2>
          <p>We collect only information voluntarily submitted through our research survey form:</p>
          <ul className="list-disc pl-6 space-y-1.5 text-[#F5F7FA]">
            <li>Demographic age bracket (e.g. 18-24, 25-34)</li>
            <li>Country of residence</li>
            <li>Optional occupational context (e.g. Student, Professional)</li>
            <li>Primary listening scenarios (e.g. Studying, Exercising)</li>
            <li>Self-reported genre preferences and daily listening hours</li>
          </ul>
          <p className="text-xs text-amber-400 font-mono bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 mt-2">
            Notice: We do NOT request exact date of birth, real names, Spotify account passwords, or OAuth credentials.
          </p>
        </section>

        {/* Section 3: Purpose */}
        <section className="space-y-3 border-t border-[#26313C] pt-6">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            3. Purpose of Processing
          </h2>
          <p>
            The collected survey variables are transformed into anonymized feature matrices for statistical correlation testing and experimental machine learning model evaluation. Data is never used for commercial advertising, user tracking, or profiling.
          </p>
        </section>

        {/* Section 4: Storage & Security */}
        <section className="space-y-3 border-t border-[#26313C] pt-6">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            4. Storage & Data Security
          </h2>
          <p>
            All submitted responses are associated with an un-linkable, randomly generated UUID string (e.g. <code>sp-res-xxxx...</code>). Records are stored using industry-standard encrypted storage.
          </p>
        </section>

        {/* Section 5: Retention */}
        <section className="space-y-3 border-t border-[#26313C] pt-6">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            5. Data Retention
          </h2>
          <p className="italic text-[#6F7A87]">
            [Define retention period before public launch. Standard academic research retention protocol: 24 months post-study publication.]
          </p>
        </section>

        {/* Section 6: Deletion Rights */}
        <section className="space-y-3 border-t border-[#26313C] pt-6">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            6. Participant Deletion Rights
          </h2>
          <p>
            You have the right to request deletion of your survey submission at any time. Visit our dedicated <Link to="/delete-data" className="text-[#1DB954] underline font-medium">Data Deletion Request Page</Link> for instructions on submitting your participant UUID.
          </p>
        </section>

        {/* Section 7: Third-Party Disclaimers */}
        <section className="space-y-3 border-t border-[#26313C] pt-6">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            7. Third-Party Services & Independence
          </h2>
          <p>
            This project is independent and is not affiliated with, sponsored by, or endorsed by Spotify AB. We comply strictly with Spotify's Developer Policy by avoiding web scraping, password harvesting, or unauthorized API calls.
          </p>
        </section>

        {/* Section 8: Contact */}
        <section className="space-y-3 border-t border-[#26313C] pt-6">
          <h2 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1DB954]" />
            8. Research Contact Information
          </h2>
          <p>
            For questions or inquiry regarding data ethics and governance, please contact our research team at:
          </p>
          <div className="flex items-center gap-2 font-mono text-sm text-[#F5F7FA] bg-[#0E141B] p-3 rounded-xl border border-[#26313C] w-fit">
            <Mail className="w-4 h-4 text-[#1DB954]" />
            <span>research-ethics@spotify-age-research.org</span>
          </div>
        </section>

      </div>

    </div>
  );
}
