import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="p-4 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-2xl border border-orange-500/30">
          <Sparkles className="w-8 h-8 text-orange-400" />
        </div>
        
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold">
            Welcome to My{' '}
            <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              CS Journey
            </span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Documenting my path through computer science, one article at a time. 
            From algorithms to web development, join me as I explore the world of code.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
