import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Code, GitBranch, Database, Server, Wind, Feather, BrainCircuit } from 'lucide-react';
import { Button } from "@/components/ui/button";

const techStack = [
    { name: 'JavaScript (ES6+)', icon: Code, color: 'text-yellow-400' },
    { name: 'React', icon: Code, color: 'text-blue-400' },
    { name: 'Python', icon: Code, color: 'text-green-400' },
    { name: 'TailwindCSS', icon: Wind, color: 'text-cyan-400' },
    { name: 'SQL', icon: Database, color: 'text-orange-400' },
    { name: 'Git', icon: GitBranch, color: 'text-red-400' },
    { name: 'Vite', icon: Feather, color: 'text-purple-400' },
    { name: 'Supabase', icon: Server, color: 'text-green-500' },
];

const skills = [
    'Frontend Development (React)',
    'UI/UX Design Principles',
    'Responsive Web Design',
    'State Management',
    'API Integration',
    'Problem Solving',
    'Agile Methodologies',
    'Version Control (Git)',
];

const currentlyLearning = [
    { name: 'Advanced Algorithms', icon: BrainCircuit, color: 'text-orange-400' },
    { name: 'Full-Stack Architecture', icon: Server, color: 'text-blue-400' },
];

const AboutPage = () => {
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Helmet>
                <title>About Me - BitBites</title>
                <meta name="description" content="Learn more about my background, skills, and the tech I use on my self-taught developer journey." />
            </Helmet>

            <div className="container mx-auto px-4 py-16">
                {/* Profile Section */}
                <motion.section
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20"
                >
                    <motion.div variants={itemVariants} className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0">
                        <img
                            alt="A placeholder portrait of a developer"
                            class="w-full h-full rounded-full object-cover border-4 border-gray-800 shadow-lg"
                         src="https://images.unsplash.com/photo-1689608171753-44c0d5ee63d6" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 text-white">About Me</h1>
                        <p className="text-lg text-gray-400 mb-4 max-w-2xl">
                            I'm a passionate and self-motivated developer on a self-taught journey through the world of computer science. My fascination with technology began with a single line of code and has since evolved into a deep-seated love for building elegant, efficient, and user-friendly applications.
                        </p>
                        <p className="text-gray-400 max-w-2xl">
                            This website serves as my digital workshop—a place to document my progress, share what I've learned, and showcase the projects that mark my path.
                        </p>
                    </motion.div>
                </motion.section>

                {/* Tech Stack Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={sectionVariants}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-mono font-bold text-center mb-10">
                        My <span className="text-orange-400">Tech Stack</span>
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
                        {techStack.map((tech) => (
                            <motion.div
                                key={tech.name}
                                variants={itemVariants}
                                className="flex flex-col items-center justify-center p-4 bg-[#1a1a1a] rounded-lg border border-gray-800 hover:border-orange-500/50 hover:bg-gray-900 transition-all duration-300"
                            >
                                <tech.icon className={`w-10 h-10 mb-2 ${tech.color}`} />
                                <span className="text-sm font-mono text-gray-300">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Skills Section */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionVariants}
                    >
                        <h2 className="text-3xl font-mono font-bold mb-8">
                            Key <span className="text-blue-400">Skills</span>
                        </h2>
                        <ul className="space-y-3">
                            {skills.map((skill, index) => (
                                <motion.li key={index} variants={itemVariants} className="flex items-center">
                                    <Feather className="w-4 h-4 mr-3 text-blue-400 flex-shrink-0" />
                                    <span className="text-gray-300">{skill}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.section>

                    {/* Currently Learning Section */}
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={sectionVariants}
                    >
                        <h2 className="text-3xl font-mono font-bold mb-8">
                            Currently <span className="text-orange-400">Learning</span>
                        </h2>
                        <ul className="space-y-4">
                            {currentlyLearning.map((item, index) => (
                                <motion.li key={index} variants={itemVariants} className="flex items-center bg-[#1a1a1a] p-4 rounded-lg border border-gray-800">
                                    <item.icon className={`w-6 h-6 mr-4 flex-shrink-0 ${item.color}`} />
                                    <span className="font-semibold text-gray-200">{item.name}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.section>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
