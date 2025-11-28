import React from 'react';
import { motion } from 'framer-motion';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedArticles = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const featured = articles.slice(0, 3);

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-mono font-bold mb-1">Latest Posts</h2>
            <p className="text-gray-400">Insights from the coding trenches.</p>
        </div>
        <Link to="/blog" className="hidden md:flex items-center gap-2 text-sm text-orange-400 hover:text-orange-300 transition-colors font-mono">
            View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {featured.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedArticles;
