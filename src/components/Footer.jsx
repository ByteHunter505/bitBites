import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/50 bg-[#111111] mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} BitBites. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="p-2 rounded-md text-gray-500 hover:text-orange-400 hover:bg-gray-800 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-md text-gray-500 hover:text-blue-400 hover:bg-gray-800 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="p-2 rounded-md text-gray-500 hover:text-white hover:bg-gray-800 transition-all"
              aria-label="X / Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
