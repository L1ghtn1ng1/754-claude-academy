const API_BASE = 'http://localhost:8000';

// Fetches all questions for a topic by walking question numbers until 404.
// Maps the API's string-options format into { id, text } objects the component needs.
export async function fetchQuizQuestions(topicId) {
  const questions = [];
  let number = 1;

  while (true) {
    const res = await fetch(`${API_BASE}/api/checkpoint/${topicId}/${number}`);
    if (!res.ok) break;
    const data = await res.json();

    const options = data.options.map((text, i) => ({
      id: String.fromCodePoint(97 + i),
      text,
    }));

    const correctOption = options.find((o) => o.text === data.answer);

    questions.push({
      _topicId: topicId,
      _number: number,
      _correctOptionId: correctOption?.id ?? null,
      question: data.question,
      options,
    });

    number++;
  }

  return questions;
}

// Submits the selected option text to the API and returns { isCorrect }.
export async function submitAnswer(topicId, questionNumber, selectedOptionText) {
  const res = await fetch(`${API_BASE}/api/checkpoint/${topicId}/${questionNumber}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ attempted_answer: selectedOptionText }),
  });
  const isCorrect = await res.json();
  return { isCorrect };
}
