import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';
import { Zap, TrendingUp, Award } from 'lucide-react';

const Analytics: React.FC = () => {
  
  const radarData = [
    { subject: 'Concepts', A: 95, fullMark: 100 },
    { subject: 'Theorems', A: 80, fullMark: 100 },
    { subject: 'Properties', A: 90, fullMark: 100 },
    { subject: 'Exercises', A: 45, fullMark: 100 }, // Weakness
  ];

  const forecastData = [
    { name: 'Test 1', score: 6.0 },
    { name: 'Test 2', score: 6.5 },
    { name: 'Test 3', score: 7.2 },
    { name: 'Test 4', score: 7.0 },
    { name: 'Test 5', score: 7.8 },
    { name: 'Forecast', score: 7.8, forecast: 7.8 },
    { name: 'Next', score: null, forecast: 8.5 },
    { name: 'Final', score: null, forecast: 9.2 },
  ];

  return (
    <div className="p-8 h-full overflow-y-auto custom-scrollbar">
       <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">The Mentor Analytics</h2>
            <p className="text-slate-500">Deep learning analysis of your performance across 4 dimensions.</p>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Radar Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8E2DE2]" /> Knowledge Radar
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                            <PolarGrid stroke="#e2e8f0" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                            <Radar
                                name="Student"
                                dataKey="A"
                                stroke="#4A00E0"
                                strokeWidth={2}
                                fill="#4A00E0"
                                fillOpacity={0.2}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-xs text-red-500 mt-2 font-medium">Visible weakness in "Exercises"</p>
            </div>

            {/* Forecast Chart */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
                 <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" /> Progression Forecast
                </h3>
                <div className="h-64 w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={forecastData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis domain={[0, 10]} stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', color: '#1e293b', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#4A00E0' }}
                            />
                            <Line type="monotone" dataKey="score" stroke="#4A00E0" strokeWidth={3} dot={{ r: 4, fill: '#4A00E0' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="forecast" stroke="#10b981" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                        </LineChart>
                     </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-2 text-xs">
                     <span className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 bg-[#4A00E0] rounded-full"></div> Actual</span>
                     <span className="flex items-center gap-2 text-slate-600"><div className="w-2 h-2 bg-emerald-500 rounded-full"></div> Linear Regression Forecast</span>
                </div>
            </div>
       </div>

       {/* NLG Advice Section */}
       <div className="deep-ocean-gradient p-6 rounded-2xl shadow-lg shadow-[#4A00E0]/20 flex gap-4 items-start text-white">
            <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <Zap className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
                <h4 className="text-white font-bold mb-2 text-lg">AI Mentor Assessment</h4>
                <p className="text-white/90 leading-relaxed font-light">
                    "Hello <span className="font-semibold text-white">Student</span>, based on your last 5 attempts, you have mastered <span className="text-green-300 font-medium">Concepts</span> and <span className="text-green-300 font-medium">Properties</span> (&gt;90%). However, your ability to solve <span className="text-red-300 font-medium">Recursive Complexity Exercises</span> is the main bottleneck. I recommend starting the 'Recursion Master' module immediately."
                </p>
                <button className="mt-4 px-4 py-2 bg-white text-[#4A00E0] hover:bg-slate-100 text-sm font-bold rounded-lg transition-colors shadow-sm">
                    Start Recommended Module
                </button>
            </div>
       </div>
    </div>
  );
};

export default Analytics;