import json
import os
import sys

# Add backend to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import create_app
from src.core.database import db
from src.modules.question_bank.models import Question, Chapter

DATA_DIR = r'd:\AI\giaodien-da-ttnt\da-ttnt\data\questions'

def import_data():
    app = create_app()
    with app.app_context():
        # Create Tables
        db.create_all()
        
        # Clear existing data (optional, for clean slate)
        # db.session.query(Question).delete()
        # db.session.query(Chapter).delete()
        # db.session.commit()

        print("Importing data...")
        
        # Helper to get or create chapter
        chapters_cache = {}
        def get_chapter_id(chapter_name):
            if chapter_name not in chapters_cache:
                chapter = Chapter.query.filter_by(name=chapter_name).first()
                if not chapter:
                    chapter = Chapter(name=chapter_name)
                    db.session.add(chapter)
                    db.session.commit()
                chapters_cache[chapter_name] = chapter.id
            return chapters_cache[chapter_name]

        count = 0
        for filename in os.listdir(DATA_DIR):
            if filename.endswith('.json'):
                filepath = os.path.join(DATA_DIR, filename)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        
                    for item in data:
                        # Normalize fields based on da-ttnt structure
                        content = item.get('content')
                        options = item.get('options', [])
                        correct_idx = item.get('correct_answer')
                        
                        metadata = item.get('metadata', {})
                        chapter_name = metadata.get('chapter', 'General')
                        difficulty = str(metadata.get('difficulty', 'Medium'))
                        tags = metadata.get('tags', [])
                        explanation = metadata.get('explanation', '')
                        
                        if not content or not options:
                            continue
                            
                        # Convert options list to dict for consistency with frontend if needed, 
                        # OR just store as list. Let's store as list but ensure correct_option is string index.
                        # Actually, let's convert to dict {"A": ..., "B": ...} to be safe/standard?
                        # No, let's keep it simple: List in JSON, correct_option = "0", "1", etc.
                        
                        correct_option = str(correct_idx) if correct_idx is not None else "0"
                        
                        chapter_id = get_chapter_id(chapter_name)
                        
                        # Check duplicates
                        exists = Question.query.filter_by(content=content).first()
                        if not exists:
                            q = Question(
                                content=content,
                                options=options, # List of strings
                                correct_option=correct_option, # "0", "1", ...
                                difficulty=difficulty,
                                chapter_id=chapter_id,
                                tags=tags,
                                explanation=explanation
                            )
                            db.session.add(q)
                            count += 1
                        else:
                            # Update existing if needed (optional, but good for dev)
                            exists.tags = tags
                            exists.explanation = explanation
                            exists.options = options # Update options just in case
                            exists.correct_option = correct_option
                    
                    db.session.commit()
                    print(f"Processed {filename}")
                    
                except Exception as e:
                    print(f"Error processing {filename}: {e}")

        print(f"Successfully imported {count} questions.")

if __name__ == '__main__':
    import_data()
