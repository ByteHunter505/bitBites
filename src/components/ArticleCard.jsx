import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';

const ArticleCard = ({ article }) => {
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group"
    >
      <Link to={`/article/${article.slug}`} className="block h-full">
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-300 h-full flex flex-col">
          <div className="relative overflow-hidden h-48">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4">
              {article.tags.slice(0, 2).map(tag => (
                <span key={tag} className="inline-block mr-2 mb-2 px-3 py-1 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  #{tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-mono font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
              {article.title}
            </h3>
            
            <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
              {article.excerpt}
            </p>
            
            <div className="flex items-center gap-4 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-800/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ArticleCard;
