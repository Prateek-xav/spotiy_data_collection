import { Music2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-border-dark sticky top-0 z-50 bg-bg-primary/90 backdrop-blur">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center shrink-0">
          <Music2 size={16} className="text-black" fill="black" />
        </div>
        <span className="font-mono font-bold tracking-widest text-sm">
          SPOTIFY<span className="text-spotify-green">AGE</span> RESEARCH
        </span>
      </Link>
      
      <a
        href="#how-it-works"
        className="font-mono text-xs tracking-widest text-text-muted hover:text-white transition-colors"
      >
        HOW IT WORKS
      </a>
    </nav>
  );
}