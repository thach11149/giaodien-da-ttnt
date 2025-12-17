import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ExamCreator from './components/ExamCreator';
import ReviewMode from './components/ReviewMode';
import History from './components/History';
import Analytics from './components/Analytics';
import DevTools from './components/DevTools';
import { View } from './types';
import { Construction } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.EXAM_CREATOR);

  const renderContent = () => {
    switch (currentView) {
      case View.EXAM_CREATOR:
        return <ExamCreator />;
      case View.REVIEW:
        return <ReviewMode />;
      case View.HISTORY:
        return <History />;
      case View.ANALYTICS:
        return <Analytics />;
      case View.QUESTION_BANK:
      case View.QUICK_ADD:
        return <DevTools />;
      default:
        return (
          <div className="h-full flex flex-col items-center justify-center text-slate-400">
            <Construction className="w-16 h-16 mb-4 opacity-30 text-[#4A00E0]" />
            <p className="text-lg font-medium text-slate-600">Feature Coming Soon</p>
            <p className="text-sm">Part of the Future Expansion roadmap.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] text-slate-800 font-sans selection:bg-[#8E2DE2]/20 overflow-hidden">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="flex-1 h-full relative overflow-hidden">
        {/* Background ambient light - Adjusted for Light Mode */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4A00E0]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#8E2DE2]/5 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Content Container */}
        <div className="relative z-10 h-full">
           {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;