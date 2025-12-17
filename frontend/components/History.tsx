import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Check, X, AlertTriangle, Zap, Brain } from 'lucide-react';
import { ErrorType } from '../types';

const History: React.FC = () => {
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  const historyData = [
    { id: '1', date: 'Oct 24, 2023', score: 8.5, duration: '42m', topic: 'Divide & Conquer', status: 'Passed' },
    { id: '2', date: 'Oct 22, 2023', score: 6.0, duration: '35m', topic: 'Recursion Trees', status: 'Review' },
    { id: '3', date: 'Oct 20, 2023', score: 9.0, duration: '45m', topic: 'Sorting Algos', status: 'Excellent' },
  ];

  // Mock Detail Data
  const examDetail = {
    id: '2',
    questions: [
        {
            q: "Determine the complexity of T(n) = 3T(n/4) + n log n",
            userAns: "Θ(n log n)",
            correctAns: "Θ(n)",
            isCorrect: false,
            errorType: ErrorType.CALCULATION,
            explanation: "You correctly identified Case 3 of Master Theorem, but failed the regularity condition check. log_b(a) < 1."
        },
        {
            q: "Which algorithm uses the 'Decrease and Conquer' strategy?",
            userAns: "Binary Search",
            correctAns: "Binary Search",
            isCorrect: true,
            explanation: "Correct! Binary Search reduces problem size by half at each step."
        },
        {
            q: "Worst case complexity of QuickSort?",
            userAns: "O(n log n)",
            correctAns: "O(n^2)",
            isCorrect: false,
            errorType: ErrorType.KNOWLEDGE,
            explanation: "Common misconception. While average is nlogn, worst case (sorted input) triggers O(n^2)."
        }
    ]
  };

  if (selectedExamId) {
    return (
        <div className="p-6 h-full flex flex-col animate-fade-in">
            <button onClick={() => setSelectedExamId(null)} className="flex items-center text-slate-500 hover:text-[#4A00E0] mb-6 gap-2 w-fit font-medium transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to History
            </button>

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Assessment Report</h2>
                    <p className="text-slate-500 text-sm">Exam #2 - Recursion Trees</p>
                </div>
                <div className="text-right">
                    <span className="text-4xl font-bold text-[#FF9966]">6.0</span>
                    <span className="text-slate-400 text-sm block">/ 10.0</span>
                </div>
            </div>

            <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar flex-1">
                {examDetail.questions.map((q, idx) => (
                    <div key={idx} className={`p-6 rounded-xl border ${q.isCorrect ? 'bg-green-50/50 border-green-200' : 'bg-red-50/50 border-red-200'} transition-all shadow-sm`}>
                        <div className="flex gap-4">
                            <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${q.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                {q.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-slate-800 font-semibold text-lg mb-3">{q.q}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className={`p-3 rounded-lg border ${q.isCorrect ? 'bg-green-100/50 border-green-200 text-green-700' : 'bg-red-100/50 border-red-200 text-red-700'}`}>
                                        <span className={`text-xs block mb-1 font-bold uppercase ${q.isCorrect ? 'text-green-600' : 'text-red-600'}`}>Your Answer</span>
                                        <span className="font-medium">{q.userAns}</span>
                                    </div>
                                    {!q.isCorrect && (
                                        <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
                                            <span className="text-xs text-[#4A00E0] block mb-1 font-bold uppercase">Correct Answer</span>
                                            <span className="text-slate-700 font-medium">{q.correctAns}</span>
                                        </div>
                                    )}
                                </div>

                                {/* AI Diagnosis */}
                                <div className="bg-white p-4 rounded-lg border border-slate-200 relative overflow-hidden shadow-sm">
                                    <div className="absolute top-0 left-0 w-1 h-full deep-ocean-gradient"></div>
                                    <div className="flex gap-3">
                                        <Brain className="w-5 h-5 text-[#8E2DE2] flex-shrink-0" />
                                        <div>
                                            {!q.isCorrect && (
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-600 border border-orange-200 uppercase tracking-wide">
                                                        {q.errorType}
                                                    </span>
                                                </div>
                                            )}
                                            <p className="text-slate-600 text-sm leading-relaxed">
                                                <span className="text-[#4A00E0] font-bold">AI Analysis: </span>
                                                {q.explanation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
  }

  return (
    <div className="p-8 h-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">History & Results</h2>
      
      <div className="glass-panel rounded-2xl overflow-hidden bg-white shadow-xl shadow-slate-200/40">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                <tr>
                    <th className="p-4 font-medium">Exam Date</th>
                    <th className="p-4 font-medium">Topic</th>
                    <th className="p-4 font-medium">Score</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium"></th>
                </tr>
            </thead>
            <tbody className="text-slate-700">
                {historyData.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedExamId(item.id)}>
                        <td className="p-4 text-slate-500">{item.date}</td>
                        <td className="p-4 font-bold text-slate-800">{item.topic}</td>
                        <td className="p-4">
                            <span className={`font-bold ${item.score >= 8 ? 'text-green-600' : item.score >= 5 ? 'text-orange-500' : 'text-red-500'}`}>
                                {item.score}
                            </span>
                        </td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Passed' ? 'bg-green-100 text-green-700' : item.status === 'Excellent' ? 'bg-[#4A00E0]/10 text-[#4A00E0]' : 'bg-orange-100 text-orange-700'}`}>
                                {item.status}
                            </span>
                        </td>
                        <td className="p-4 text-right">
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#4A00E0] inline-block transition-colors" />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;