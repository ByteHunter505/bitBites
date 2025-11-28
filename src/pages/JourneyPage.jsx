import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { BookOpen, Code, Layers, GitBranch, Server, Rocket, Briefcase, GraduationCap } from 'lucide-react';

// 1. CONFIGURACIÓN DE "BRANCHES" (Rieles)
// Define aquí tus ramas paralelas. El orden determina la posición de izquierda a derecha.
const tracks = [
  { id: 'foundation', label: 'CS Foundation', color: 'bg-blue-500', borderColor: 'border-blue-500', icon: GraduationCap },
  { id: 'dev', label: 'Development', color: 'bg-orange-500', borderColor: 'border-orange-500', icon: Code },
  { id: 'career', label: 'Career & Open Source', color: 'bg-purple-500', borderColor: 'border-purple-500', icon: Briefcase },
];

// 2. TUS HITOS (Ahora con la propiedad 'track')
const journeyMilestones = [
  {
    track: 'foundation', // Pertenece a la rama Foundation
    title: "Started CS50",
    date: "Q1 2024",
    description: "Embarked on the foundational journey of Computer Science with Harvard's CS50.",
    icon: BookOpen
  },
  {
    track: 'dev', // Pertenece a la rama Development
    title: "Learned Python",
    date: "Q2 2024",
    description: "Mastered the fundamentals of Python, focusing on scripting and data analysis.",
    icon: Code
  },
  {
    track: 'dev',
    title: "Built First App",
    date: "Q3 2024",
    description: "Developed and deployed a complete web application from scratch.",
    icon: Rocket
  },
  {
    track: 'foundation', // Volvemos a Foundation (paralelo a lo anterior)
    title: "Mastered Data Structures",
    date: "Q4 2024",
    description: "Deep dive into Arrays, Trees, Graphs, and Hash Tables.",
    icon: Layers
  },
  {
    track: 'career', // Nueva rama
    title: "First Open Source Contribution",
    date: "Q1 2025",
    description: "Merged my first PR. Learned collaborative workflows and code reviews.",
    icon: GitBranch
  },
  {
    track: 'dev',
    title: "Full Stack Architecture",
    date: "Q2 2025",
    description: "Integrating frontend with backend services and database.",
    icon: Server
  },
];

const JourneyPage = () => {
    // Configuración de medidas para el grafo
    const TRACK_WIDTH = 40; // Ancho entre líneas verticales
    const GRAPH_WIDTH = tracks.length * TRACK_WIDTH + 20; // Ancho total del área del grafo

    return (
        <>
            <Helmet>
                <title>The Journey - BitBites</title>
                <meta name="description" content="My developer journey visualized as a git graph." />
            </Helmet>

            <div className="container mx-auto px-4 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4">The Journey</h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                        Visualizing my path through parallel branches of learning and building.
                    </p>
                    
                    {/* Legend (Mobile & Desktop) */}
                    <div className="flex flex-wrap justify-center gap-4 text-sm font-mono">
                        {tracks.map(track => (
                            <div key={track.id} className="flex items-center gap-2">
                                <span className={`w-3 h-3 rounded-full ${track.color}`}></span>
                                <span className="text-gray-300">{track.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    
                    {/* --- BACKGROUND TRACKS (The Vertical Lines) --- */}
                    <div className="absolute top-0 bottom-0 left-0 hidden md:flex" style={{ width: GRAPH_WIDTH }}>
                        {tracks.map((track, i) => (
                            <div 
                                key={track.id}
                                className="absolute top-0 bottom-0 w-px bg-gray-800"
                                style={{ left: (i * TRACK_WIDTH) + (TRACK_WIDTH / 2) }}
                            ></div>
                        ))}
                    </div>

                    {/* --- MILESTONES --- */}
                    <div className="space-y-8 md:space-y-12">
                        {journeyMilestones.map((milestone, index) => {
                            // Encontrar índice del track para calcular posición
                            const trackIndex = tracks.findIndex(t => t.id === milestone.track);
                            const currentTrack = tracks[trackIndex];
                            
                            // Posición horizontal del nodo (punto)
                            const nodeLeftPos = (trackIndex * TRACK_WIDTH) + (TRACK_WIDTH / 2);

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative flex flex-col md:flex-row md:items-center"
                                >
                                    {/* 1. VISUAL GRAPH NODE (Desktop Only) */}
                                    <div className="hidden md:block absolute h-full" style={{ width: GRAPH_WIDTH }}>
                                        {/* Connector Line (Horizontal) */}
                                        <div 
                                            className={`absolute top-1/2 h-px bg-gray-700`}
                                            style={{ 
                                                left: nodeLeftPos, 
                                                right: 0 
                                            }}
                                        ></div>
                                        
                                        {/* The Node Dot */}
                                        <div 
                                            className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 ${currentTrack.borderColor} bg-[#111] z-10`}
                                            style={{ left: nodeLeftPos - 8 }} // -8 para centrar (w-4 / 2)
                                        >
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full ${currentTrack.color}`}></div>
                                        </div>
                                    </div>

                                    {/* 2. CONTENT CARD */}
                                    {/* En desktop, empujamos el contenido a la derecha del grafo */}
                                    <div 
                                        className="w-full md:pl-0"
                                        style={{ marginLeft: window.innerWidth >= 768 ? GRAPH_WIDTH : 0 }}
                                    >
                                        <div className={`
                                            relative bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 
                                            hover:border-gray-600 transition-colors group
                                            ${/* Mobile Indicator Strip */ ''}
                                            border-l-4 md:border-l-1
                                        `}
                                        style={{ borderLeftColor: window.innerWidth < 768 ? currentTrack.borderColor.replace('border-', 'var(--tw-colors-') : '' }}
                                        >
                                            {/* Mobile: Simple colored strip indicator (handled by border-l style above loosely or via class) */}
                                            <div className={`md:hidden absolute left-0 top-0 bottom-0 w-1 ${currentTrack.color} rounded-l-lg`}></div>

                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-md bg-gray-800 text-gray-300 group-hover:text-white transition-colors`}>
                                                        <milestone.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-opacity-10 ${currentTrack.color.replace('bg-', 'text-')} ${currentTrack.color} bg-opacity-10`}>
                                                            {tracks.find(t => t.id === milestone.track).label}
                                                        </span>
                                                        <h3 className="text-xl font-bold text-white mt-1">{milestone.title}</h3>
                                                    </div>
                                                </div>
                                                <span className="font-mono text-sm text-gray-500 whitespace-nowrap">{milestone.date}</span>
                                            </div>
                                            
                                            <p className="text-gray-400 pl-[52px]">{milestone.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default JourneyPage;
