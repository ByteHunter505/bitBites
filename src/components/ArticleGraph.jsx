import React, { useMemo, useRef, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { useNavigate } from 'react-router-dom';
import { tagColors } from '@/utils/tagColors';
import { Plus, Minus, Settings2, X, Maximize } from 'lucide-react'; // Added Maximize icon
import { Button } from '@/components/ui/button';
import * as d3 from 'd3'; // Import d3 for custom forces

const ArticleGraph = ({ articles }) => {
  const navigate = useNavigate();
  const graphRef = useRef();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 600 });
  const [showControls, setShowControls] = useState(false);
  
  // Physics Configuration
  const [config, setConfig] = useState({
    repulsion: -100,      // Reduced repulsion so they don't fly away too fast
    linkDistance: 50,
    gravity: 0.5          // New: Strength of pull towards center
  });

  // 1. Resize Handler
  useEffect(() => {
    const handleResize = () => {
        if (containerRef.current) {
            setDimensions({
                w: containerRef.current.offsetWidth,
                h: containerRef.current.offsetHeight
            });
        }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Physics Engine Updates
  useEffect(() => {
    if (graphRef.current) {
        const fg = graphRef.current;
        
        // Apply Repulsion
        fg.d3Force('charge').strength(config.repulsion);
        
        // Apply Link Distance
        fg.d3Force('link').distance(config.linkDistance);
        
        // FIX: Apply a Center Force (Gravity) to keep isolated nodes visible
        // We use a radial force to pull everything gently to coordinate (0,0)
        fg.d3Force('radial', d3.forceRadial(0, 0, 0).strength(config.gravity * 0.1));
        
        fg.d3ReheatSimulation();
    }
  }, [config]);

  // 3. Data Processing
  const graphData = useMemo(() => {
    const nodes = [];
    const links = [];
    const mentionCounts = {};
    
    // Initialize counts
    articles.forEach(a => mentionCounts[a.slug] = 0);

    // Build Links
    articles.forEach((sourceArticle) => {
      sourceArticle.outboundLinks.forEach((targetSlug) => {
        if (mentionCounts.hasOwnProperty(targetSlug)) {
            mentionCounts[targetSlug]++;
            links.push({
                source: sourceArticle.slug,
                target: targetSlug
            });
        }
      });
    });

    // Build Nodes
    articles.forEach((article) => {
        const firstTag = article.tags && article.tags.length > 0 ? article.tags[0] : null;
        // Fallback color logic in case tagColors file is missing/incomplete
        const nodeColor = (tagColors && tagColors[firstTag]) || tagColors?.['default'] || "#f97316";
        
        // Base size 6, grows with mentions
        const size = 6 + (mentionCounts[article.slug] * 3);

        nodes.push({
            id: article.slug,
            name: article.title,
            val: size,
            color: nodeColor
        });
    });

    return { nodes, links };
  }, [articles]);

  // View Controls
  const handleZoomIn = () => graphRef.current?.zoom(graphRef.current.zoom() * 1.5, 400);
  const handleZoomOut = () => graphRef.current?.zoom(graphRef.current.zoom() / 1.5, 400);
  const handleFitView = () => graphRef.current?.zoomToFit(400, 50); // 50px padding

  return (
    <div ref={containerRef} className="relative w-full h-[600px] border border-gray-800 rounded-xl overflow-hidden bg-[#111]">
      
      <ForceGraph2D
        ref={graphRef}
        width={dimensions.w}
        height={dimensions.h}
        graphData={graphData}
        backgroundColor="#111111"
        
        // Visuals
        nodeLabel="name"
        nodeColor={node => node.color}
        linkColor={() => '#555'}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        
        // Interaction
        onNodeClick={node => navigate(`/article/${node.id}`)}
        
        // FIX: Auto-fit view when engine stops (initial load)
        cooldownTicks={100}
        onEngineStop={() => graphRef.current.zoomToFit(400, 50)}
      />

      {/* --- CONTROLS UI --- */}
      
      {/* Zoom & Fit Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-10">
        <Button variant="secondary" size="icon" onClick={handleZoomIn} className="h-8 w-8 rounded-full bg-gray-800 text-white border-gray-600">
            <Plus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleZoomOut} className="h-8 w-8 rounded-full bg-gray-800 text-white border-gray-600">
            <Minus className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={handleFitView} title="Fit View" className="h-8 w-8 rounded-full bg-gray-800 text-white border-gray-600">
            <Maximize className="h-4 w-4" />
        </Button>
      </div>

      {/* Physics Config Panel */}
      <div className="absolute top-4 right-4 z-10 flex flex-col items-end gap-2">
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowControls(!showControls)}
            className="bg-gray-800/80 backdrop-blur-sm text-gray-300 border border-gray-700 hover:bg-gray-700"
        >
            {showControls ? <X className="h-4 w-4 mr-2" /> : <Settings2 className="h-4 w-4 mr-2" />}
            {showControls ? 'Close' : 'Configure Graph'}
        </Button>

        {showControls && (
            <div className="w-64 bg-gray-900/90 backdrop-blur-md p-4 rounded-lg border border-gray-700 shadow-xl space-y-4">
                
                {/* Gravity Slider (New) */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Gravity (Center Pull)</span>
                        <span>{config.gravity}</span>
                    </div>
                    <input 
                        type="range" min="0" max="2" step="0.1"
                        value={config.gravity}
                        onChange={(e) => setConfig({ ...config, gravity: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                    />
                </div>

                {/* Repulsion Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Repulsion (Spread)</span>
                        <span>{config.repulsion}</span>
                    </div>
                    <input 
                        type="range" min="-1000" max="-10" step="10"
                        value={config.repulsion}
                        onChange={(e) => setConfig({ ...config, repulsion: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                    />
                </div>

                {/* Link Distance Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>Link Length</span>
                        <span>{config.linkDistance}</span>
                    </div>
                    <input 
                        type="range" min="10" max="200" step="5"
                        value={config.linkDistance}
                        onChange={(e) => setConfig({ ...config, linkDistance: parseInt(e.target.value) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
            </div>
        )}
      </div>

    </div>
  );
};

export default ArticleGraph;
