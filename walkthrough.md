# Multi-Agent System Walkthrough

## Overview
The system has been successfully set up with a **Modular Monolith Backend** (Flask) and a **React Frontend**.
It integrates the AI logic and data from the `da-ttnt` reference project.

## Features Implemented
1.  **Question Bank**:
    - Imported **329 questions** from `da-ttnt` JSON files into SQLite.
    - "Quick Add" feature in DevTools to manually add more questions.
2.  **Exam Creator**:
    - **AI Adaptive Strategy**: Implemented the **Hill Climbing** algorithm to generate exams based on difficulty.
    - **Random Strategy**: Basic random selection.
3.  **Evaluator**:
    - **Inference Engine**: Analyzes student results and provides personalized advice using Rule-based AI.
4.  **AI Tutor**:
    - **Explain Answer**: Integrated Gemini/Groq to explain why an answer is wrong (Endpoint: `/api/ai/ask`).

## How to Run
1.  **Backend**:
    ```bash
    cd backend
    python app.py
    ```
    *Runs on http://localhost:5000*

2.  **Frontend**:
    ```bash
    cd frontend
    npm run dev
    ```
    *Runs on http://localhost:3000*

## Verification Steps
1.  **Check Data**:
    - Go to **DevTools** in the Frontend.
    - You should see the "Question Bank" populated (or use the API to check).
2.  **Generate Exam**:
    - Go to **Exam Creator**.
    - Select "AI Adaptive" strategy.
    - Click "Create Exam".
    - Verify questions are loaded.
3.  **Submit Exam**:
    - Answer questions and submit.
    - Check the **Analysis** tab for AI advice.
