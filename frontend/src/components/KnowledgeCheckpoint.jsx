import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { fetchQuizQuestions, submitAnswer } from '../services/quizService';

export default function KnowledgeCheckpoint({ topicId, nextPath, nextLabel }) {
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [phase, setPhase] = useState('idle'); // idle | loading | quiz | done
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const handleCancel = () => setPhase('idle');
    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, []);

  async function openQuiz() {
    setPhase('loading');
    setCurrentIndex(0);
    setAnswers([]);
    setCurrentAnswer(null);
    dialogRef.current.showModal();
    const qs = await fetchQuizQuestions(topicId);
    setQuestions(qs);
    setPhase('quiz');
  }

  function closeModal() {
    dialogRef.current.close();
    setPhase('idle');
  }

  async function handleOptionSelect(option) {
    if (currentAnswer || isSubmitting) return;
    setIsSubmitting(true);
    const q = questions[currentIndex];
    const { isCorrect } = await submitAnswer(q._topicId, q._number, option.text);
    setCurrentAnswer({
      selectedId: option.id,
      isCorrect,
      correctOptionId: q._correctOptionId,
    });
    setIsSubmitting(false);
  }

  function handleNext() {
    const updatedAnswers = [...answers, currentAnswer];
    setAnswers(updatedAnswers);
    setCurrentAnswer(null);
    if (currentIndex + 1 >= questions.length) {
      setPhase('done');
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }

  const correctCount = answers.filter((a) => a.isCorrect).length;

  return (
    <>
      <div className="checkpoint-trigger">
        <div className="checkpoint-trigger-text">
          <h2 className="checkpoint-trigger-heading">Knowledge Checkpoint</h2>
          <p>Five questions to verify your understanding before moving on.</p>
        </div>
        <button className="btn-primary" onClick={openQuiz}>
          Begin Quiz
        </button>
      </div>

      <dialog ref={dialogRef} className="quiz-dialog">
        <div className="quiz-dialog-inner">
          <div className="modal-header">
            <span className="modal-title">Knowledge Checkpoint</span>
            <button className="modal-close" onClick={closeModal} aria-label="Close quiz">
              ✕
            </button>
          </div>

          <div className="modal-body">
            {phase === 'loading' && (
              <div className="quiz-loading">
                <div className="loading-spinner" />
                <span>Loading questions…</span>
              </div>
            )}

            {phase === 'quiz' && (() => {
              const question = questions[currentIndex];
              const total = questions.length;
              const progressPct = (currentIndex / total) * 100;
              return (
                <>
                  <div className="quiz-meta">
                    <span className="quiz-counter">Question {currentIndex + 1} of {total}</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                  </div>

                  <p className="question-text">{question.question}</p>

                  <div className="options-list">
                    {question.options.map((option) => {
                      let cls = 'option-btn';
                      if (currentAnswer) {
                        if (option.id === currentAnswer.correctOptionId) cls += ' option-correct';
                        else if (option.id === currentAnswer.selectedId) cls += ' option-incorrect';
                        else cls += ' option-dimmed';
                      }
                      return (
                        <button
                          key={option.id}
                          className={cls}
                          onClick={() => handleOptionSelect(option)}
                          disabled={!!currentAnswer || isSubmitting}
                        >
                          <span className="option-key">{option.id.toUpperCase()}</span>
                          <span className="option-text">{option.text}</span>
                        </button>
                      );
                    })}
                  </div>

                  {currentAnswer && (
                    <div className={`answer-feedback ${currentAnswer.isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
                      <p className="feedback-verdict">
                        {currentAnswer.isCorrect ? 'Correct.' : 'Incorrect.'}
                      </p>
                    </div>
                  )}

                  {currentAnswer && (
                    <div className="quiz-nav">
                      <button className="btn-secondary" onClick={handleNext}>
                        {currentIndex + 1 < total ? 'Next Question →' : 'See Results'}
                      </button>
                    </div>
                  )}
                </>
              );
            })()}

            {phase === 'done' && (() => {
              const total = questions.length;
              const pct = Math.round((correctCount / total) * 100);
              let message;
              if (pct === 100) {
                message = 'Perfect score. You have a solid command of this material.';
              } else if (pct >= 60) {
                message = 'Good work. Review any questions you missed, then continue.';
              } else {
                message = 'Consider rereading the lesson above before moving on — it will help the next section click.';
              }
              return (
                <div className="quiz-complete">
                  <div className="score-display">
                    <span className="score-fraction">{correctCount}/{total}</span>
                    <span className="score-pct">{pct}%</span>
                  </div>
                  <p className="score-message">{message}</p>
                  <div className="quiz-complete-actions">
                    <button className="btn-secondary" onClick={closeModal}>
                      Back to Lesson
                    </button>
                    {nextPath && (
                      <button
                        className="btn-primary"
                        onClick={() => { closeModal(); navigate(nextPath); }}
                      >
                        Continue: {nextLabel} →
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </dialog>
    </>
  );
}

KnowledgeCheckpoint.propTypes = {
  topicId: PropTypes.string.isRequired,
  nextPath: PropTypes.string,
  nextLabel: PropTypes.string,
};

KnowledgeCheckpoint.defaultProps = {
  nextPath: null,
  nextLabel: null,
};
