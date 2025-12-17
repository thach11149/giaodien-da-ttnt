from src.core.interfaces import ExamGenerationStrategy
from src.modules.question_bank.models import Question
import random

class RandomStrategy(ExamGenerationStrategy):
    def generate(self, params):
        # Basic random selection
        limit = params.get('limit', 10)
        questions = Question.query.all()
        return random.sample(questions, min(len(questions), limit))

class AIAdaptiveStrategy(ExamGenerationStrategy):
    def generate(self, params):
        """
        Hill Climbing Algorithm to optimize question selection based on user constraints.
        """
        print("AI LOG: Calculating optimal question set based on user profile...")
        limit = params.get('limit', 10)
        target_diff = params.get('difficulty', 2.0) # Default medium difficulty
        
        all_questions = Question.query.all()
        if len(all_questions) < limit:
            return all_questions
            
        # 1. Initial Solution: Random
        current_selection = random.sample(all_questions, limit)
        
        # 2. Optimization: Hill Climbing for Average Difficulty
        max_iterations = 50
        current_diff = self._calculate_avg_difficulty(current_selection)
        
        for i in range(max_iterations):
            if abs(current_diff - target_diff) < 0.1:
                print(f"AI LOG: Optimization converged at iteration {i}")
                break
                
            # Pick a random question to remove
            idx_to_remove = random.randint(0, len(current_selection) - 1)
            
            # Find better replacement
            best_replacement = None
            min_cost = abs(current_diff - target_diff)
            
            # Try 10 random candidates
            candidates = random.sample(all_questions, min(len(all_questions), 10))
            for q_cand in candidates:
                if q_cand in current_selection:
                    continue
                    
                # Calculate new diff if we swap
                temp_selection = current_selection.copy()
                temp_selection[idx_to_remove] = q_cand
                new_diff = self._calculate_avg_difficulty(temp_selection)
                new_cost = abs(new_diff - target_diff)
                
                if new_cost < min_cost:
                    min_cost = new_cost
                    best_replacement = q_cand
            
            # Perform swap if better
            if best_replacement:
                current_selection[idx_to_remove] = best_replacement
                current_diff = self._calculate_avg_difficulty(current_selection)
                
        return current_selection

    def _calculate_avg_difficulty(self, questions):
        if not questions: return 0.0
        # Map difficulty string to float if needed. Assuming stored as "1", "2", "3" or "Easy", "Medium", "Hard"
        # Let's handle both
        total = 0
        for q in questions:
            try:
                val = float(q.difficulty)
            except:
                val = 2.0 # Default
            total += val
        return total / len(questions)
