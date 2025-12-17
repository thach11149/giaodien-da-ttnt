# Implementation Plan - Modular Monolith & AI Integration

## Goal
Build a scalable "Modular Monolith" system as per `faang.md`, utilizing the existing React Frontend (`algorithm-master-ai`) and implementing a new Python Flask Backend with AI capabilities.

## User Review Required
> [!IMPORTANT]
> **Architecture Decision**: The system will be split into `frontend` (React) and `backend` (Python Flask). The Backend will follow the **Modular Monolith** pattern (DDD) as requested in `faang.md`.

## Proposed Changes

### 1. Project Restructuring
#### [NEW] [backend/](file:///d:/AI/giaodien-da-ttnt/backend)
- Create the backend directory to house the Python application.
- **Structure**:
  ```
  backend/
  ├── app.py                  # Entry point
  ├── requirements.txt
  └── src/
      ├── core/               # Shared components (DB, Config)
      └── modules/            # Feature modules (Plugins)
          ├── auth/
          ├── question_bank/
          ├── exam_creator/   # AI Module
          └── evaluator/      # AI Module
  ```

#### [MODIFY] [frontend/](file:///d:/AI/giaodien-da-ttnt/frontend)
- Move contents of `algorithm-master-ai` to `frontend/` (or rename the folder) to standardize the structure.
- Update `vite.config.ts` to proxy API requests to `http://localhost:5000`.

### 2. Backend Implementation (Modular Monolith)
#### [NEW] [backend/src/core/](file:///d:/AI/giaodien-da-ttnt/backend/src/core)
- `database.py`: SQLite connection using SQLAlchemy.
- `interfaces.py`: Define abstract base classes (e.g., `ExamGenerationStrategy`).

#### [NEW] [backend/src/modules/question_bank/](file:///d:/AI/giaodien-da-ttnt/backend/src/modules/question_bank)
- Implement CRUD for Questions and Chapters.
- **API**: `GET /api/questions`, `POST /api/questions`.

#### [NEW] [backend/src/modules/exam_creator/](file:///d:/AI/giaodien-da-ttnt/backend/src/modules/exam_creator)
- **Strategies**:
  - `RandomStrategy`: Random selection.
  - `AIAdaptiveStrategy`: Implement Hill Climbing algorithm from `da-ttnt/core_ai/test_generator.py`.
- **API**: `POST /api/exams/generate`.

#### [NEW] [backend/src/modules/evaluator/](file:///d:/AI/giaodien-da-ttnt/backend/src/modules/evaluator)
- Implement `InferenceEngine` from `da-ttnt/core_ai/inference_engine.py`.
- **API**: `POST /api/exams/submit` (Calculate score and provide advice).

#### [NEW] [backend/src/core/ai_service.py](file:///d:/AI/giaodien-da-ttnt/backend/src/core/ai_service.py)
- Implement `call_ai_with_fallback` using Gemini/Groq from `da-ttnt/app.py`.

#### [NEW] [backend/scripts/import_data.py](file:///d:/AI/giaodien-da-ttnt/backend/scripts/import_data.py)
- Script to import JSON questions from `da-ttnt/data/questions` into SQLite.

### 3. Frontend Integration
#### [MODIFY] [frontend/src/services/api.ts](file:///d:/AI/giaodien-da-ttnt/frontend/src/services/api.ts)
- Create Axios instance configured to talk to the Flask backend.

#### [MODIFY] [frontend/src/components/DevTools.tsx](file:///d:/AI/giaodien-da-ttnt/frontend/src/components/DevTools.tsx)
- Connect "Quick Add" form to `POST /api/questions`.

## Verification Plan

### Automated Tests
- **Backend**: Unit tests for `RandomStrategy` to ensure it returns questions.

### Manual Verification
1.  **Setup**:
    - Run `pip install -r requirements.txt` in `backend/`.
    - Run `python app.py`.
    - Run `npm install` and `npm run dev` in `frontend/`.
2.  **Test "Quick Add"**:
    - Go to DevTools in Frontend.
    - Add a question.
    - Verify it appears in the database (or "Question Bank" list).
3.  **Test "Create Exam"**:
    - Go to Exam Creator.
    - Click "Create Exam".
    - Verify questions are loaded from the Backend.
