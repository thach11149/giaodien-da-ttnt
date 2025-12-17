import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Clock, Settings2, Sliders, CheckCircle2, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { KnowledgeType } from '../types';
import { examApi, evaluatorApi, aiApi } from '../services/api';

interface Question {
    id: string;
    content: string;
    options: string[];
    difficulty: string;
    correct_option: string;
    tags?: string[];
}

interface ExamResult {
    score: number;
    correct_count: number;
    total: number;
    advice: string[];
    details: any[];
}

const ExamCreator: React.FC = () => {
    // State
    const [step, setStep] = useState<'config' | 'loading' | 'taking' | 'result'>('config');
    const [loadingStep, setLoadingStep] = useState(0);
    const [questionCount, setQuestionCount] = useState(10);
    const [aiAdaptive, setAiAdaptive] = useState(true);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [result, setResult] = useState<ExamResult | null>(null);
    const [aiExplanation, setAiExplanation] = useState<string | null>(null);
    const [explainingQId, setExplainingQId] = useState<string | null>(null);

    const loadingMessages = [
        "Accessing Knowledge Graph...",
        "Satisfying Constraints (CSP)...",
        "Optimizing Difficulty (Hill Climbing)...",
        "Generating Distractors...",
        "Finalizing Exam Structure..."
    ];

    // Handlers
    const handleCreate = async () => {
        setStep('loading');
        setLoadingStep(0);

        // Simulate AI Loading Steps
        const interval = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= loadingMessages.length - 1) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 800);

        try {
            const response = await examApi.generate({
                limit: questionCount,
                difficulty: aiAdaptive ? 2.5 : 2.0, // Example params
                strategy: aiAdaptive ? 'adaptive' : 'random'
            });

            // Wait for animation to finish at least a bit
            setTimeout(() => {
                clearInterval(interval);
                setQuestions(response.data);
                setStep('taking');
                setCurrentQuestionIdx(0);
                setAnswers({});
            }, 4000);

        } catch (error) {
            console.error("Failed to generate exam:", error);
            alert("Failed to generate exam. Please check backend.");
            setStep('config');
        }
    };

    const handleAnswer = (optionIdx: number) => {
        const q = questions[currentQuestionIdx];
        setAnswers(prev => ({ ...prev, [q.id]: optionIdx.toString() }));
    };

    const handleNext = () => {
        if (currentQuestionIdx < questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                questions: questions,
                answers: answers
            };
            const response = await evaluatorApi.submit(payload);
            setResult(response.data);
            setStep('result');
        } catch (error) {
            console.error("Failed to submit exam:", error);
        }
    };

    const handleAskAI = async (q: Question, userAns: string) => {
        setExplainingQId(q.id);
        setAiExplanation(null);
        try {
            const response = await aiApi.ask({
                question: q.content,
                user_answer: q.options[parseInt(userAns)],
                correct_answer: q.options[parseInt(q.correct_option)],
                tags: q.tags || []
            });
            setAiExplanation(response.data.explanation);
        } catch (error) {
            setAiExplanation("AI is currently unavailable.");
        }
    };

    // Renders
    if (step === 'loading') {
        return (
            <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="z-10 text-center w-full max-w-md">
                    <div className="relative w-24 h-24 mx-auto mb-8">
                        <div className="absolute inset-0 border-t-4 border-[#4A00E0] rounded-full animate-spin"></div>
                        <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#4A00E0] w-8 h-8 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">AI Architect Working</h3>
                    <p className="text-[#8E2DE2] font-mono text-sm animate-bounce font-medium mb-4">
                        {">"} {loadingMessages[loadingStep]}
                    </p>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-[#4A00E0] transition-all duration-300 ease-out" style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}></div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'taking' && questions.length > 0) {
        const q = questions[currentQuestionIdx];
        return (
            <div className="h-full flex flex-col p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                        <span className="w-2 h-8 bg-[#8E2DE2] rounded-full"></span>
                        Exam Session
                    </h2>
                    <button onClick={() => setStep('config')} className="text-slate-500 hover:text-[#4A00E0]">Exit Exam</button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl relative">
                        <div className="flex justify-between items-start mb-8">
                            <span className="bg-[#8E2DE2]/10 text-[#8E2DE2] px-3 py-1 rounded-full text-xs font-bold">Question {currentQuestionIdx + 1} / {questions.length}</span>
                            <div className="flex items-center gap-2 text-slate-500"><Clock className="w-4 h-4" /> <span>--:--</span></div>
                        </div>

                        <h3 className="text-xl font-medium text-slate-800 mb-6 leading-relaxed">{q.content}</h3>

                        <div className="space-y-3 mb-8">
                            {q.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(idx)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group
                                ${answers[q.id] === idx.toString() ? 'border-[#4A00E0] bg-[#4A00E0]/5' : 'border-slate-200 bg-slate-50 hover:border-[#4A00E0]'}`}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px]
                                  ${answers[q.id] === idx.toString() ? 'border-[#4A00E0] bg-[#4A00E0] text-white' : 'border-slate-300'}`}>
                                        {answers[q.id] === idx.toString() && <CheckCircle2 className="w-4 h-4" />}
                                    </div>
                                    <span className="text-slate-600 font-medium">{opt}</span>
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-end pt-6 border-t border-slate-100">
                            <button
                                onClick={handleNext}
                                className="bg-[#FF9966] hover:bg-[#ff8547] text-white px-6 py-2 rounded-lg font-bold shadow-lg transition-all flex items-center gap-2"
                            >
                                {currentQuestionIdx === questions.length - 1 ? "Submit Exam" : "Next Question"} <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'result' && result) {
        return (
            <div className="h-full p-8 overflow-y-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Exam Results</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h3 className="text-slate-500 text-sm font-bold uppercase">Score</h3>
                        <p className="text-4xl font-bold text-[#4A00E0] mt-2">{result.score.toFixed(1)}/10</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                        <h3 className="text-slate-500 text-sm font-bold uppercase">Correct</h3>
                        <p className="text-4xl font-bold text-green-500 mt-2">{result.correct_count}/{result.total}</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h3 className="text-slate-500 text-sm font-bold uppercase mb-2">AI Advice</h3>
                        <ul className="text-sm text-slate-600 space-y-1">
                            {result.advice.map((adv, i) => <li key={i}>• {adv}</li>)}
                        </ul>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-4">Detailed Review</h3>
                <div className="space-y-4">
                    {questions.map((q, idx) => {
                        const detail = result.details.find(d => d.question_id === q.id);
                        const isCorrect = detail?.is_correct;
                        const userAnsIdx = answers[q.id];

                        return (
                            <div key={q.id} className={`bg-white p-6 rounded-xl border ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <h4 className="font-medium text-slate-800"><span className="font-bold text-slate-400 mr-2">#{idx + 1}</span> {q.content}</h4>
                                    {isCorrect
                                        ? <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Correct</span>
                                        : <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Incorrect</span>
                                    }
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                    <div className={`p-3 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                                        <span className="block text-xs font-bold opacity-70 mb-1">Your Answer</span>
                                        {q.options[parseInt(userAnsIdx)] || "No Answer"}
                                    </div>
                                    {!isCorrect && (
                                        <div className="p-3 rounded-lg bg-green-50">
                                            <span className="block text-xs font-bold opacity-70 mb-1 text-green-700">Correct Answer</span>
                                            {q.options[parseInt(q.correct_option)]}
                                        </div>
                                    )}
                                </div>

                                {!isCorrect && (
                                    <div className="mt-4">
                                        <button
                                            onClick={() => handleAskAI(q, userAnsIdx)}
                                            className="text-[#4A00E0] text-sm font-bold flex items-center gap-2 hover:underline"
                                        >
                                            <Sparkles className="w-4 h-4" /> Ask AI Tutor to Explain
                                        </button>

                                        {explainingQId === q.id && (
                                            <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700 animate-fade-in">
                                                {aiExplanation ? aiExplanation : <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-[#4A00E0] border-t-transparent rounded-full animate-spin"></div> AI is analyzing...</span>}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 text-center">
                    <button onClick={() => setStep('config')} className="px-6 py-3 bg-slate-800 text-white rounded-lg font-bold hover:bg-slate-700">Start New Exam</button>
                </div>
            </div>
        );
    }

    // Config View (Default)
    return (
        <div className="p-8 h-full overflow-y-auto custom-scrollbar">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Exam Creator</h2>
                <p className="text-slate-500">Configure parameters for the CSP & Heuristic Search algorithm to generate your optimal test.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Config */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-panel p-6 rounded-2xl bg-white">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <BookOpenIcon className="w-5 h-5 text-[#4A00E0]" /> Knowledge Scope
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-slate-500 font-medium">Target Chapter</label>
                                <select className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-lg p-3 outline-none">
                                    <option>All Chapters</option>
                                    <option>Chapter 1: Introduction</option>
                                    <option>Chapter 2: Analysis Framework</option>
                                    <option>Chapter 3: Divide & Conquer</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl bg-white">
                        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                            <Sliders className="w-5 h-5 text-[#8E2DE2]" /> Knowledge Taxonomy
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.values(KnowledgeType).map((type) => (
                                <label key={type} className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-[#4A00E0]" />
                                    <span className="text-slate-700 text-sm font-medium">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Parameters */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-2xl h-full border-t-4 border-t-[#8E2DE2] bg-white">
                        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                            <Settings2 className="w-5 h-5 text-[#8E2DE2]" /> Parameters
                        </h3>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <label className="text-slate-600 font-medium">Question Volume</label>
                                    <span className="text-[#4A00E0] font-mono font-bold">{questionCount}</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    value={questionCount}
                                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#4A00E0]"
                                />
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-slate-700 font-bold flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-[#FF9966]" />
                                        AI Adaptive Mode
                                    </span>
                                    <button
                                        onClick={() => setAiAdaptive(!aiAdaptive)}
                                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${aiAdaptive ? 'bg-[#4A00E0]' : 'bg-slate-300'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 shadow-sm ${aiAdaptive ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {aiAdaptive
                                        ? "Algorithm uses Hill Climbing to adjust difficulty dynamically based on your real-time responses."
                                        : "Standard fixed difficulty mode."}
                                </p>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={handleCreate}
                                    className="w-full py-4 bg-[#FF9966] hover:bg-[#ff8547] text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 transform transition-all hover:-translate-y-1 flex items-center justify-center gap-2 tracking-wide"
                                >
                                    <Brain className="w-5 h-5" />
                                    GENERATE EXAM
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookOpenIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
)

export default ExamCreator;