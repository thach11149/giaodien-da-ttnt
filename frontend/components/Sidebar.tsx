import React from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  History, 
  BarChart2, 
  Bot, 
  Swords, 
  Calendar, 
  Database, 
  FilePlus2,
  Cpu
} from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  onChangeView: (view: View) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  
  const NavItem = ({ view, icon: Icon, label, disabled = false }: { view: View; icon: any; label: string; disabled?: boolean }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => !disabled && onChangeView(view)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
          ${isActive 
            ? 'deep-ocean-gradient text-white shadow-lg shadow-[#4A00E0]/20' 
            : 'text-slate-500 hover:bg-white hover:text-[#4A00E0] hover:shadow-sm'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#4A00E0]'}`} />
        <span className="font-medium text-sm">{label}</span>
        {disabled && <span className="ml-auto text-[10px] bg-slate-100 px-1 rounded text-slate-400">SOON</span>}
      </button>
    );
  };

  return (
    <div className="w-72 h-screen bg-slate-50/80 backdrop-blur-xl border-r border-slate-200 flex flex-col flex-shrink-0 relative overflow-y-auto">
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-lg deep-ocean-gradient flex items-center justify-center shadow-lg shadow-[#4A00E0]/20">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-800 tracking-wide">AlgoMaster <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0]">AI</span></h1>
            <p className="text-xs text-slate-500">CS112 Training System</p>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-8">
        
        {/* Core Features */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Core Features</p>
          <NavItem view={View.EXAM_CREATOR} icon={BrainCircuit} label="Exam Creator" />
          <NavItem view={View.REVIEW} icon={BookOpen} label="Review Mode" />
          <NavItem view={View.HISTORY} icon={History} label="History & Feedback" />
          <NavItem view={View.ANALYTICS} icon={BarChart2} label="Analytics" />
        </div>

        {/* Future Expansion */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Future Expansion</p>
          <NavItem view={View.AI_TUTOR} icon={Bot} label="AI Tutor" disabled />
          <NavItem view={View.ARENA} icon={Swords} label="Arena" disabled />
          <NavItem view={View.SMART_PLANNER} icon={Calendar} label="Smart Planner" disabled />
        </div>

        {/* Dev Tools */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Dev Tools</p>
          <NavItem view={View.QUESTION_BANK} icon={Database} label="Question Bank" />
          <NavItem view={View.QUICK_ADD} icon={FilePlus2} label="Quick Add (Prompt)" />
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="w-8 h-8 rounded-full bg-[#4A00E0] text-white flex items-center justify-center text-xs font-bold">
            SV
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-slate-700 truncate">Student User</p>
            <p className="text-xs text-green-600 font-medium">Online • Level 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;