import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import JourneyPage from '@/pages/JourneyPage';
import BlogPage from '@/pages/BlogPage';
import AboutPage from '@/pages/AboutPage';
import ArticlePage from '@/pages/ArticlePage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#111111] text-gray-300 font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
