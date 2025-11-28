import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { articles } from '@/data/articles';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-300 mb-4">Article Not Found</h1>
        <Link to="/" className="text-orange-400 hover:text-orange-300 transition-colors">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} - CS Journey</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>
      
      <article className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles</span>
          </Link>

          <div className="mb-8">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-orange-500/10 to-blue-500/10 text-orange-400 border border-orange-500/20 mb-4">
              {article.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
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

          <div className="mb-8 rounded-xl overflow-hidden border border-slate-800">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="prose prose-invert prose-orange max-w-none">
            <div className="text-lg text-gray-300 leading-relaxed space-y-6">
              {article.content.map((paragraph, index) => (
                <p key={index} className="text-gray-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full text-sm bg-slate-900 text-gray-400 border border-slate-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </article>
    </>
  );
};

export default ArticlePage;
