# 754 Claude Academy

**Feature: Knowledge Checkpoints.** A minimal learning-app feature: students read a short topic page (Inheritance or Polymorphism), then attempt a multiple-choice quiz. Questions come from a FastAPI backend; the selected answer is POSTed back and validated server-side.

**Endpoints**
- `GET  /api/checkpoint/{quiz_name}/{question_number}` — fetch question.
- `POST /api/checkpoint/{quiz_name}/{question_number}` — body `{"attempted_answer": "..."}`; returns `true`/`false`.

**Run locally**

Backend (port 8000):
```
cd backend && pip install -r requirements.txt && uvicorn main:app --reload
```

Frontend (port 5173):
```
cd frontend && npm install && npm run dev
```

Open http://localhost:5173.
