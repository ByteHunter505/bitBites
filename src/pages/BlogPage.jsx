import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { articles } from '@/data/articles';
import ArticleCard from '@/components/ArticleCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const BlogPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = useMemo(() => {
        const allCategories = articles.reduce((acc, article) => {
            acc.add(article.category);
            return acc;
        }, new Set());
        return ['All', ...Array.from(allCategories)];
    }, []);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
            const matchesSearch = searchTerm.trim() === '' ||
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.content.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
            
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, activeCategory]);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Blog - BitBites</title>
                <meta name="description" content="A collection of articles and tutorials on web development, computer science, and career growth." />
            </Helmet>

            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">Blog & Tutorials</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A space for sharing knowledge, documenting progress, and exploring new ideas.
                    </p>
                </motion.div>

                {/* Search and Filter Controls */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-12 space-y-6"
                >
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 bg-[#1a1a1a] border-gray-800 focus:border-orange-500/50 focus:ring-orange-500/50"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map(category => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? 'default' : 'outline'}
                                onClick={() => setActiveCategory(category)}
                                className={`font-mono text-sm transition-all duration-300 ${
                                    activeCategory === category 
                                    ? 'bg-orange-500/80 hover:bg-orange-500 text-white border-orange-500'
                                    : 'bg-transparent text-gray-400 border-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-600'
                                }`}
                            >
                                #{category}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                {/* Articles Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <ArticleCard key={article.slug} article={article} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16">
                            <h3 className="text-2xl font-mono font-bold mb-2">No Articles Found</h3>
                            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export default BlogPage;
