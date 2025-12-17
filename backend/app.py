from flask import Flask
from flask_cors import CORS
from src.core.database import db
from src.modules.question_bank.routes import question_bp
from src.modules.exam_creator.routes import exam_bp
from src.modules.evaluator.routes import evaluator_bp
from src.modules.ai_tutor.routes import ai_tutor_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    CORS(app)
    db.init_app(app)
    
    # Register Blueprints
    app.register_blueprint(question_bp, url_prefix='/api/questions')
    app.register_blueprint(exam_bp, url_prefix='/api/exams')
    app.register_blueprint(evaluator_bp, url_prefix='/api/evaluator')
    app.register_blueprint(ai_tutor_bp, url_prefix='/api/ai')
    
    with app.app_context():
        db.create_all()
        
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
