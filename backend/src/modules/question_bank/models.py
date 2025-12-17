from src.core.database import db

class Chapter(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    questions = db.relationship('Question', backref='chapter', lazy=True)

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    options = db.Column(db.JSON, nullable=False)  # Stores options as JSON
    correct_option = db.Column(db.String(10), nullable=False)
    difficulty = db.Column(db.String(20), nullable=False)
    chapter_id = db.Column(db.Integer, db.ForeignKey('chapter.id'), nullable=False)
    tags = db.Column(db.JSON, nullable=True) # List of strings
    explanation = db.Column(db.Text, nullable=True)
