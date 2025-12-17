from flask import Blueprint, request, jsonify
from .strategies import RandomStrategy, AIAdaptiveStrategy

exam_bp = Blueprint('exam', __name__)

@exam_bp.route('/generate', methods=['POST'])
def generate_exam():
    data = request.json
    strategy_type = data.get('strategy', 'RANDOM')
    
    if strategy_type == 'AI' or strategy_type == 'adaptive':
        strategy = AIAdaptiveStrategy()
    else:
        strategy = RandomStrategy()
        
    questions = strategy.generate(data)
    
    return jsonify([{
        'id': q.id,
        'content': q.content,
        'options': q.options,
        'difficulty': q.difficulty,
        'correct_option': q.correct_option,
        'tags': q.tags
    } for q in questions])
