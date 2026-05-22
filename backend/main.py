import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = Path(__file__).resolve().parent / "data" / "quizzes.json"


def load_quiz_data():
    try:
        with DATA_FILE.open("r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Quiz data file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Quiz data file is invalid JSON")


@app.get("/api/checkpoint/{quiz_name}/{question_number}")
async def get_quiz_question(quiz_name: str, question_number: int):
    data = load_quiz_data()
    quiz_key = f"{quiz_name}"

    if quiz_key not in data:
        raise HTTPException(status_code=404, detail=f"Quiz '{quiz_name}' not found")

    quiz_items = data[quiz_key]
    for item in quiz_items:
        if item.get("number") == question_number:
            return item

    raise HTTPException(
        status_code=404,
        detail=f"Question number {question_number} not found in quiz '{quiz_name}'",
    )
