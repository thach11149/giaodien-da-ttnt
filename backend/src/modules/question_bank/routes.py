from flask import Blueprint, request, jsonify
from src.core.database import db
from .models import Question, Chapter

question_bp = Blueprint('question', __name__)

@question_bp.route('/', methods=['GET'])
def get_questions():
    questions = Question.query.all()
    return jsonify([{
        'id': q.id,
        'content': q.content,
        'options': q.options,
        'correct_option': q.correct_option,
        'difficulty': q.difficulty,
        'chapter_id': q.chapter_id
    } for q in questions])

@question_bp.route('/', methods=['POST'])
def add_question():
    data = request.json
    new_question = Question(
        content=data['content'],
        options=data['options'],
        correct_option=data['correct_option'],
        difficulty=data['difficulty'],
        chapter_id=data['chapter_id']
    )
    db.session.add(new_question)
    db.session.commit()
    return jsonify({'message': 'Question added successfully'}), 201
