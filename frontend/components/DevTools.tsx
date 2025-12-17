import React, { useState } from 'react';
import { Database, FileCode, Copy, Check } from 'lucide-react';

import { questionApi } from '../services/api';

const DevTools: React.FC = () => {
    return (
        <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-4 mb-6 border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-bold text-slate-800">Dev Tools</h2>
                <p className="text-slate-500 text-sm">Monitor data coverage and generate new content in one place.</p>
            </div>

            <div className="space-y-6 pb-12">
                <CoverageMatrix />

                <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Add Tool</h3>
                    <PromptGenerator />
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4">Manual Input (JSON)</h3>
                    <ManualInput />
                </div>
            </div>
        </div>
    );
};

const ManualInput = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [status, setStatus] = useState('');

    const handleSave = async () => {
        try {
            const data = JSON.parse(jsonInput);
            await questionApi.add(data);
            setStatus('Saved successfully!');
            setJsonInput('');
        } catch (error) {
            setStatus('Error: ' + (error as any).message);
        }
    };

    return (
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
            <textarea
                className="w-full h-40 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-[#4A00E0] outline-none"
                placeholder='Paste JSON here... { "content": "...", "options": [...], ... }'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
            />
            <div className="flex items-center justify-between">
                <button
                    onClick={handleSave}
                    className="bg-[#4A00E0] hover:bg-[#3600b3] text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                    Save to Database
                </button>
                <span className={`text-sm ${status.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                    {status}
                </span>
            </div>
        </div>
    );
};

const CoverageMatrix = () => {
    // Mock Data for Heatmap
    // 1-4 = Red, 5-10 = Yellow, >10 = Green
    const chapters = ['Ch1: Introduction', 'Ch2: Analysis', 'Ch3: Divide & Conquer', 'Ch4: Dynamic Prog'];
    const types = ['Concept', 'Theorem', 'Property', 'Exercise'];
    const data = [
        [12, 5, 8, 20], // Ch1
        [15, 12, 10, 25], // Ch2
        [2, 5, 1, 4],   // Ch3 (Weak!)
        [8, 6, 8, 12]   // Ch4
    ];

    const getColor = (val: number) => {
        if (val < 5) return 'bg-red-50 text-red-600 border-red-200';
        if (val <= 10) return 'bg-orange-50 text-orange-600 border-orange-200';
        return 'bg-green-50 text-green-600 border-green-200';
    };

    return (
        <div className="animate-fade-in">
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <Database className="w-5 h-5 text-[#4A00E0]" /> Question Distribution Heatmap
                    </h3>
                    <div className="flex gap-3 text-xs">
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Critical (&lt;5)</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-500 rounded-full"></div> Warning (5-10)</span>
                        <span className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Good (&gt;10)</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 text-left text-slate-500 font-medium text-sm">Chapter / Type</th>
                                {types.map(t => <th key={t} className="p-3 text-center text-slate-500 font-medium text-sm">{t}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {chapters.map((ch, rowIdx) => (
                                <tr key={ch}>
                                    <td className="p-3 text-slate-700 text-sm font-medium border-t border-slate-100">{ch}</td>
                                    {data[rowIdx].map((val, colIdx) => (
                                        <td key={colIdx} className="p-2 border-t border-slate-100">
                                            <div className={`w-full h-10 rounded-lg border flex items-center justify-center font-mono font-bold ${getColor(val)} cursor-pointer hover:shadow-md transition-all`}>
                                                {val}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded text-red-700 text-sm flex items-start gap-2">
                    <div className="mt-1 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    <div>
                        <strong>Action Required:</strong> Chapter 3 "Divide & Conquer" lacks sufficient "Property" and "Exercise" questions. Use the tool below to generate them.
                    </div>
                </div>
            </div>
        </div>
    );
};

const PromptGenerator = () => {
    const [topic, setTopic] = useState('Guess Method');
    const [chapter, setChapter] = useState('Chapter 2: Recursion Analysis');
    const [difficulty, setDifficulty] = useState('Hard');
    const [copied, setCopied] = useState(false);

    const generatedPrompt = `Role: University Professor.
Context: Algorithm Analysis & Design (CS112).
Task: Create a multiple-choice question.
Chapter: ${chapter}
Topic: ${topic}
Type: Calculation Exercise.
Difficulty: ${difficulty}.
Output Format: JSON { question, options[], correctIndex, detailedExplanation }.`;

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
            {/* Configuration */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <FileCode className="w-5 h-5 text-[#4A00E0]" /> Prompt Config
                </h3>

                <div className="space-y-2">
                    <label className="text-sm text-slate-500 font-medium">Chapter</label>
                    <select
                        value={chapter}
                        onChange={(e) => setChapter(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-[#4A00E0] outline-none"
                    >
                        <option>Chapter 1: Introduction</option>
                        <option>Chapter 2: Recursion Analysis</option>
                        <option>Chapter 3: Divide & Conquer</option>
                        <option>Chapter 4: Dynamic Programming</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-slate-500 font-medium">Topic</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-[#4A00E0] outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm text-slate-500 font-medium">Difficulty</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-3 focus:ring-2 focus:ring-[#4A00E0] outline-none"
                    >
                        <option>Hard</option>
                        <option>Medium</option>
                        <option>Easy</option>
                    </select>
                </div>
            </div>

            {/* Output */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Generated Prompt</h3>
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 text-xs bg-[#4A00E0] hover:bg-[#3600b3] text-white px-3 py-1.5 rounded transition-colors shadow-sm"
                    >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied ? 'COPIED' : 'COPY PROMPT'}
                    </button>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-200 font-mono text-sm text-slate-700 whitespace-pre-wrap shadow-inner">
                    {generatedPrompt}
                </div>
                <p className="mt-3 text-xs text-slate-400">Paste this into ChatGPT/Gemini, then copy the JSON result back into the system.</p>
            </div>
        </div>
    );
};

export default DevTools;