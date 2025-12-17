export enum View {
    // Core
    REVIEW = 'REVIEW',
    EXAM_CREATOR = 'EXAM_CREATOR',
    HISTORY = 'HISTORY',
    ANALYTICS = 'ANALYTICS',
    
    // Future
    AI_TUTOR = 'AI_TUTOR',
    ARENA = 'ARENA',
    SMART_PLANNER = 'SMART_PLANNER',
  
    // Dev Tools
    QUESTION_BANK = 'QUESTION_BANK',
    QUICK_ADD = 'QUICK_ADD'
  }
  
  export interface Chapter {
    id: string;
    name: string;
  }
  
  export interface Lesson {
    id: string;
    chapterId: string;
    name: string;
  }
  
  export enum KnowledgeType {
    CONCEPT = 'Concept',
    THEOREM = 'Theorem',
    PROPERTY = 'Property',
    EXERCISE = 'Exercise'
  }
  
  export enum ErrorType {
    KNOWLEDGE = 'Knowledge Gap',
    CALCULATION = 'Calculation Error',
    LOGIC = 'Logical Fallacy'
  }