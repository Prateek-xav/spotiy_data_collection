import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, ShieldAlert, FileText, Trash2, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0E141B] border-t border-[#26313C] text-[#A7B0BC] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#141B24] border border-[#26313C] flex items-center justify-center text-[#1DB954]">
                <Headphones className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-[#F5F7FA]">
                Spotify Age Research
              </span>
            </div>
            
            <p className="text-sm text-[#A7B0BC] max-w-md leading-relaxed">
              Exploring the relationship between music listening behavior and broad demographic age groups through voluntary survey research.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141B24] border border-[#26313C] text-xs text-[#6F7A87]">
              <ShieldAlert className="w-4 h-4 text-[#1DB954]" />
              <span>Independent academic project. Not affiliated with or endorsed by Spotify AB.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider font-mono">
              Research & Study
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-[#1DB954] transition-colors inline-flex items-center gap-1">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link to="/research" className="hover:text-[#1DB954] transition-colors inline-flex items-center gap-1">
                  Methodology & Pipeline
                </Link>
              </li>
              <li>
                <Link to="/consent" className="hover:text-[#1DB954] transition-colors inline-flex items-center gap-1">
                  Voluntary Consent
                </Link>
              </li>
              <li>
                <Link to="/survey" className="hover:text-[#1DB954] transition-colors inline-flex items-center gap-1">
                  Take Research Survey
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Governance */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider font-mono">
              Data & Governance
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-[#1DB954] transition-colors inline-flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/delete-data" className="hover:text-[#1DB954] transition-colors inline-flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" />
                  Data Deletion Policy
                </Link>
              </li>
              <li>
                <a 
                  href="https://developer.spotify.com/policy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-[#1DB954] transition-colors inline-flex items-center gap-1 text-xs text-[#6F7A87]"
                >
                  Spotify Developer Policy Compliance
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Sub-footer */}
        <div className="mt-12 pt-8 border-t border-[#26313C]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F7A87]">
          <p>© {new Date().getFullYear()} Spotify Age Research. All voluntary contributions protected.</p>
          <div className="flex items-center gap-6">
            <span>Demographic Research Standard</span>
            <span>WCAG 2.1 Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
