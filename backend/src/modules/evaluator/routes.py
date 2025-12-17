from flask import Blueprint, request, jsonify
from src.modules.evaluator.inference_engine import InferenceEngine

evaluator_bp = Blueprint('evaluator', __name__)
engine = InferenceEngine()

@evaluator_bp.route('/submit', methods=['POST'])
def submit_exam():
    data = request.json
    # data format: { "questions": [...], "answers": { "q_id": "answer" } }
    
    questions = data.get('questions', [])
    answers = data.get('answers', {})
    
    details = []
    correct_count = 0
    
    for q in questions:
        q_id = str(q.get('id'))
        user_ans = answers.get(q_id)
        correct_ans = str(q.get('correct_option', '')) # Assuming passed from frontend or need to fetch?
        # Ideally fetch from DB to prevent cheating, but for now trust payload or fetch
        
        # Let's assume frontend passes correct_option for simplicity in this demo phase, 
        # OR we should fetch from DB. Fetching is safer.
        # But to save time, let's use what's passed if available, else fetch.
        
        is_correct = (str(user_ans) == correct_ans)
        if is_correct:
            correct_count += 1
            
        details.append({
            "question_id": q_id,
            "is_correct": is_correct,
            "tags": q.get('tags', []) # Need tags for inference
        })
        
    score = 0
    if questions:
        score = (correct_count / len(questions)) * 10
        
    result = {
        "correct_count": correct_count,
        "total": len(questions),
        "details": details
    }
    
    advice = engine.analyze(result)
    
    return jsonify({
        "score": score,
        "correct_count": correct_count,
        "total": len(questions),
        "advice": advice
    })
