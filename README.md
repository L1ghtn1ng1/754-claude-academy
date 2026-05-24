# 754 Claude Academy

**Feature: Knowledge Checkpoints.** A minimal learning-app feature where students read a short topic page (Inheritance or Polymorphism) and then attempt a multiple-choice quiz. Questions are fetched from a FastAPI backend; the selected answer is POSTed back and validated server-side.

**Endpoints**
- `GET  /api/checkpoint/{quiz_name}/{question_number}` — fetch a question.
- `POST /api/checkpoint/{quiz_name}/{question_number}` — submit `{"attempted_answer": "..."}`; returns `true` / `false`.

**Run locally**

Backend (FastAPI, port 8000):
```bash
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
```

Frontend (React + Vite, port 5173):
```bash
cd frontend && npm install && npm run dev
```

Open http://localhost:5173 and pick a topic.
