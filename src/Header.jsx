import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Header = () => {
  const navLinkClass = ({ isActive }) =>
    `text-sm font-mono transition-colors duration-300 ${
      isActive
        ? 'text-orange-400'
        : 'text-gray-400 hover:text-orange-400'
    }`;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-gray-800/50 bg-[#111111]/80 backdrop-blur-lg"
    >
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gray-800 border border-gray-700 rounded-md group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300">
            <Terminal className="w-5 h-5 text-orange-400" />
          </div>
          <span className="text-xl font-mono font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            BitBites
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass}>
            // Home
          </NavLink>
          <NavLink to="/journey" className={navLinkClass}>
            // The Journey
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            // Blog
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            // About
          </NavLink>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
