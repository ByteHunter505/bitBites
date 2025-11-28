import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Code, Layers, GitBranch, Server, Rocket } from 'lucide-react';

const journeyMilestones = [
  {
    icon: BookOpen,
    title: "Started CS50",
    date: "Q1 2024",
    description: "Embarked on the foundational journey of Computer Science with Harvard's CS50. A deep dive into C, algorithms, and data structures.",
    color: "text-orange-400"
  },
  {
    icon: Code,
    title: "Learned Python",
    date: "Q2 2024",
    description: "Mastered the fundamentals of Python, focusing on its versatility for web development, scripting, and data analysis. Built several small projects to solidify concepts.",
    color: "text-blue-400"
  },
  {
    icon: Rocket,
    title: "Built First App",
    date: "Q3 2024",
    description: "Developed and deployed a complete web application from scratch. This project taught me about the full development lifecycle, from ideation to deployment.",
    color: "text-orange-400"
  },
  {
    icon: Layers,
    title: "Mastered Data Structures",
    date: "Q4 2024",
    description: "Gained a deep understanding of key data structures (Arrays, Trees, Graphs, Hash Tables) and their real-world applications in writing efficient and scalable code.",
    color: "text-blue-400"
  },
  {
    icon: GitBranch,
    title: "Contributed to Open Source",
    date: "Q1 2025",
    description: "Made my first contribution to an open-source project. Learned about collaborative workflows, code reviews, and becoming part of a developer community.",
    color: "text-orange-400"
  },
  {
    icon: Server,
    title: "Built Full Stack Project",
    date: "Q2 2025",
    description: "Created a comprehensive full-stack application, integrating a frontend framework with a backend service and database. A true test of end-to-end development skills.",
    color: "text-blue-400"
  },
];

const TimelineItem = ({ milestone, index }) => {
  const isLeft = index % 2 === 0;

  const itemVariants = {
    hidden: { opacity: 0, x: isLeft ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const IconComponent = milestone.icon;

  return (
    // FIX: Changed md:w-1/2 to md:w-full so the timeline uses the full container width
    <div className="relative w-full md:w-full md:flex md:justify-between md:items-center">
      
      {/* LEFT SIDE (Desktop only) */}
      <div className={`hidden md:block w-1/2 ${isLeft ? 'text-right pr-12' : 'pl-12'}`}>
        {isLeft && (
          <motion.div variants={itemVariants} className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800">
            <p className={`font-mono text-sm mb-1 ${milestone.color}`}>{milestone.date}</p>
            <h3 className="text-xl font-mono font-bold mb-2">{milestone.title}</h3>
            <p className="text-gray-400 text-sm">{milestone.description}</p>
          </motion.div>
        )}
      </div>

      {/* CENTER LINE (Item specific) */}
      <div className="hidden md:block absolute w-px h-full bg-gray-700 top-0 left-1/2 -ml-px"></div>

      {/* ICON */}
      <div className="absolute top-0 left-1/2 -ml-4 w-8 h-8 rounded-full bg-[#111111] border-2 border-gray-700 flex items-center justify-center z-10">
        <IconComponent className={`w-4 h-4 ${milestone.color}`} />
        <div className={`absolute w-3 h-3 rounded-full ${milestone.color === 'text-orange-400' ? 'bg-orange-400' : 'bg-blue-400'} opacity-75 animate-ping`}></div>
      </div>
      
      {/* RIGHT SIDE (Desktop) & ALL MOBILE CARD */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'pl-12 md:pl-0' : 'pl-12 md:pl-12'}`}>
         {/* FIX: Added conditional rendering.
             On Desktop (md), if isLeft is true, this block is hidden to prevent duplication.
             On Mobile, it always shows. 
         */}
         <motion.div 
            variants={itemVariants} 
            className={`bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 ${isLeft ? 'md:hidden' : ''}`}
         >
            <p className={`font-mono text-sm mb-1 ${milestone.color}`}>{milestone.date}</p>
            <h3 className="text-xl font-mono font-bold mb-2">{milestone.title}</h3>
            <p className="text-gray-400 text-sm">{milestone.description}</p>
          </motion.div>
      </div>
    </div>
  );
};

const JourneyPage = () => {
    return (
        <>
            <Helmet>
                <title>The Journey - BitBites</title>
                <meta name="description" content="Follow my developer journey through a timeline of milestones and projects." />
            </Helmet>

            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">The Journey</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                        A timeline of key milestones, projects, and learning experiences in my developer career.
                    </p>
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Main vertical line for the entire container */}
                    <div className="hidden md:block absolute w-px h-full bg-gray-700 top-0 left-1/2 -ml-px"></div>
                    <div className="absolute md:hidden w-px h-full bg-gray-700 top-0 left-[15px]"></div>
                    
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-12 md:space-y-0 flex flex-col items-center"
                    >
                        {journeyMilestones.map((milestone, index) => (
                           <TimelineItem key={index} milestone={milestone} index={index} />
                        ))}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default JourneyPage;