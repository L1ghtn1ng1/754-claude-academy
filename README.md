# 754 Claude Academy

A quiz app with two quizzes on OOP concepts: **Polymorphism** and **Inheritance**.

## Stack

- **Frontend**: React + Vite (port 5173)
- **Backend**: FastAPI (port 8000)
- **Data**: `backend/data/quizzes.json`

## Running locally

**Backend**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```
