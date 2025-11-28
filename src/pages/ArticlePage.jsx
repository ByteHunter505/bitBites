import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Markdown from 'react-markdown';
import { articles } from '@/data/articles';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-300 mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-orange-400 hover:text-orange-300 transition-colors">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  // 1. PRE-PROCESS CONTENT:
  // Turn [[slug.md]] or [[slug]] into standard markdown link: [slug](/article/slug)
  const contentWithLinks = useMemo(() => {
    if (!article?.content) return "";
    return article.content.replace(
      /\[\[(.*?)(?:\.md)?\]\]/g,
      (match, slug) => `[${slug}](/article/${slug})`
    );
  }, [article]);

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
          {/* FIX: Changed destination from "/" to "/blog" */}
          <Link 
            to="/blog" 
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

          <div className="prose prose-invert prose-orange max-w-none text-gray-300">
            {/* 2. CUSTOM COMPONENTS for Links & Styling */}
            <Markdown
              components={{
                a: ({ node, ...props }) => {
                  const isInternal = props.href && props.href.startsWith('/');
                  
                  if (isInternal) {
                    return (
                      <Link 
                        to={props.href} 
                        className="text-orange-400 hover:text-orange-300 underline underline-offset-4 decoration-orange-400/30 transition-all font-medium"
                      >
                        {props.children}
                      </Link>
                    );
                  }
                  
                  return (
                    <a 
                      {...props} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline underline-offset-4 decoration-blue-400/30 transition-all"
                    />
                  );
                },
                p: ({node, ...props}) => <p className="mb-6 leading-7" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="pl-2" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-10 mb-4 text-white" {...props} />,
              }}
            >
              {contentWithLinks}
            </Markdown>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-800">
            <div className="flex flex-wrap gap-2">
              {article.tags && article.tags.map((tag, index) => (
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
