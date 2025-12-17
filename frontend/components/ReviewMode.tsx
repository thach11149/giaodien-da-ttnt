import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { List, Share2, Search, Filter } from 'lucide-react';
import { questionApi } from '../services/api';

const ReviewMode: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'graph'>('graph');
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [nodes, setNodes] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await questionApi.getAll();
        const questions = response.data;

        // Process data into graph
        const graphNodes: any[] = [];
        const graphLinks: any[] = [];
        const chapters = new Set<string>();
        const tags = new Set<string>();

        // Create Root Node
        graphNodes.push({ id: "ROOT", group: 1, label: "Course: CS112", r: 35 });

        questions.forEach((q: any) => {
          // Chapter Nodes
          const chap = q.chapter_id ? `Chapter ${q.chapter_id}` : "General"; // Simplified mapping
          if (!chapters.has(chap)) {
            chapters.add(chap);
            graphNodes.push({ id: chap, group: 2, label: chap, r: 25 });
            graphLinks.push({ source: "ROOT", target: chap });
          }

          // Tag Nodes
          if (q.tags && Array.isArray(q.tags)) {
            q.tags.forEach((tag: string) => {
              if (!tags.has(tag)) {
                tags.add(tag);
                graphNodes.push({ id: tag, group: 3, label: tag, r: 15 });
                // Link tag to chapter
                graphLinks.push({ source: chap, target: tag });
              }
            });
          }
        });

        setNodes(graphNodes);
        setLinks(graphLinks);
      } catch (error) {
        console.error("Failed to fetch knowledge graph data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (viewMode === 'graph' && svgRef.current && containerRef.current && !loading && nodes.length > 0) {
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove(); // Clear previous

      const simulation = d3.forceSimulation(nodes as any)
        .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

      const link = svg.append("g")
        .attr("stroke", "#cbd5e1") // Light gray slate-300
        .attr("stroke-opacity", 0.8)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", 2);

      const node = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .selectAll("g")
        .data(nodes)
        .join("g");

      // Node circles
      node.append("circle")
        .attr("r", (d: any) => d.r)
        .attr("fill", (d: any) => {
          if (d.group === 1) return "#FF9966"; // Root
          if (d.group === 2) return "#4A00E0"; // Chapter
          return "#8E2DE2"; // Tag
        })
        .attr("class", "cursor-pointer transition-all hover:brightness-110 shadow-sm");

      // Node Labels
      node.append("text")
        .text((d: any) => d.label)
        .attr("x", (d: any) => d.r + 5)
        .attr("y", 5)
        .attr("fill", "#334155") // slate-700
        .attr("font-size", "10px")
        .attr("font-weight", "600")
        .attr("stroke", "none")
        .style("pointer-events", "none");

      // Hover Interaction simulation (Simple tooltip logic via title)
      node.append("title")
        .text((d: any) => d.label);

      simulation.on("tick", () => {
        link
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y);

        node
          .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
      });

      // Simple Drag
      const drag = (simulation: any) => {
        function dragstarted(event: any) {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          event.subject.fx = event.subject.x;
          event.subject.fy = event.subject.y;
        }
        function dragged(event: any) {
          event.subject.fx = event.x;
          event.subject.fy = event.y;
        }
        function dragended(event: any) {
          if (!event.active) simulation.alphaTarget(0);
          event.subject.fx = null;
          event.subject.fy = null;
        }
        return d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended);
      }

      node.call(drag(simulation) as any);
    }
  }, [viewMode, loading, nodes, links]);

  return (
    <div className="flex flex-col h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Review Knowledge</h2>
          <p className="text-slate-500 text-sm">Chapter 3: Divide & Conquer Visualization</p>
        </div>

        <div className="flex items-center bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-[#4A00E0] text-white shadow' : 'text-slate-500 hover:text-[#4A00E0]'}`}
          >
            <List className="w-4 h-4" /> List
          </button>
          <button
            onClick={() => setViewMode('graph')}
            className={`px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 transition-all ${viewMode === 'graph' ? 'bg-[#4A00E0] text-white shadow' : 'text-slate-500 hover:text-[#4A00E0]'}`}
          >
            <Share2 className="w-4 h-4" /> Graph
          </button>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-2xl border border-slate-200 overflow-hidden relative flex flex-col bg-white/50">
        {/* Toolbar */}
        <div className="h-14 border-b border-slate-200 bg-white/60 flex items-center px-4 justify-between">
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-slate-200 w-64 shadow-sm">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search node..." className="bg-transparent outline-none text-sm text-slate-800 w-full placeholder:text-slate-400" />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded text-slate-500"><Filter className="w-4 h-4" /></button>
            <div className="flex items-center gap-2 text-xs text-slate-500 border-l border-slate-200 pl-4 ml-2">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#4A00E0]"></span> Concept</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Weakness</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 relative bg-white" ref={containerRef}>
          {viewMode === 'graph' ? (
            <>
              <div className="absolute top-4 left-4 z-10 bg-white/90 p-3 rounded-lg border border-slate-200 backdrop-blur-sm max-w-xs shadow-lg">
                <h4 className="text-xs font-bold text-[#4A00E0] uppercase mb-1">Semantic Relationships</h4>
                <p className="text-[10px] text-slate-500">
                  Visualizing IS-A, REQUIRES, and PART-OF relationships.
                  <span className="text-red-500 font-bold"> Red nodes</span> indicate high error rate.
                </p>
              </div>
              <svg ref={svgRef} className="w-full h-full cursor-move bg-slate-50/50"></svg>
            </>
          ) : (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto h-full bg-slate-50">
              {nodes.map(node => (
                <div key={node.id} className="bg-white p-4 rounded-xl border border-slate-200 hover:border-[#4A00E0] hover:shadow-lg transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${node.id === 'MST' ? 'bg-red-50 text-red-500' : 'bg-indigo-50 text-[#4A00E0]'}`}>
                      {node.id === 'MST' ? 'WEAK' : 'MASTERED'}
                    </span>
                  </div>
                  <h3 className="text-slate-800 font-bold group-hover:text-[#4A00E0]">{node.label}</h3>
                  <p className="text-slate-500 text-xs mt-2">Related to: Divide & Conquer</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewMode;