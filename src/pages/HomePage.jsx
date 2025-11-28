import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import FeaturedArticles from '@/components/FeaturedArticles';
import { ArrowRight, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="py-20 md:py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-6xl font-mono font-bold mb-6 max-w-4xl mx-auto">
          Documenting my journey into{' '}
          <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Computer Science
          </span>
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
          A collection of thoughts, tutorials, and project breakdowns as I navigate the world of code.
        </p>
      </motion.div>
    </section>
  );
};

const LearningStatus = () => {
    return (
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 flex items-center justify-between">
            <div className='flex items-center gap-4'>
                <Rss className="w-6 h-6 text-blue-400" />
                <div>
                    <h3 className="font-mono text-lg font-bold text-white">Currently Learning</h3>
                    <p className="text-gray-400">Advanced React Patterns & State Management</p>
                </div>
            </div>
            <Link to="/journey" className="flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors font-mono">
                View Journey <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
    )
}

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>BitBites - A Developer's Journey</title>
        <meta name="description" content="Documenting my journey into Computer Science. A blog by a self-taught developer about coding, projects, and learning in public." />
      </Helmet>
      
      <div className="container mx-auto px-4">
        <HeroSection />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-16"
        >
          <LearningStatus />
          <FeaturedArticles />
        </motion.div>
      </div>
    </>
  );
};

export default HomePage;
