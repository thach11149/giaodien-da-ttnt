from flask import Blueprint, request, jsonify
from src.core.ai_service import call_ai_with_fallback

ai_tutor_bp = Blueprint('ai_tutor', __name__)

@ai_tutor_bp.route('/ask', methods=['POST'])
def ask_ai():
    data = request.json
    question = data.get('question')
    user_answer = data.get('user_answer')
    correct_answer = data.get('correct_answer')
    tags = data.get('tags', [])
    
    prompt = f"""
    I am a student studying Design and Analysis of Algorithms (CS112).
    I answered a question wrong. Please act as a friendly AI Tutor and explain by Vietnamese why my answer is wrong and why the correct answer is right.
    
    Question: {question}
    My Answer: {user_answer}
    Correct Answer: {correct_answer}
    Topics: {', '.join(tags)}
    
    Keep the explanation concise (under 100 words) and easy to understand.
    """
    
    try:
        explanation = call_ai_with_fallback(prompt)
        return jsonify({"success": True, "explanation": explanation})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})
