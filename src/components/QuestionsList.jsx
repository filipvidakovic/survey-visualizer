import React, { useState } from 'react';

const QuestionsList = ({ questions }) => {
  const [showQuestions, setShowQuestions] = useState(false);

  if (questions.length === 0) return null;

  return (
    <div className="questions-section">
      <div className="questions-header">
        <h3>Actual Questions ({questions.length})</h3>
        <button 
          className="toggle-questions-btn"
          onClick={() => setShowQuestions(!showQuestions)}
        >
          {showQuestions ? 'Hide Questions' : 'Show Questions'}
        </button>
      </div>
      
      {showQuestions && (
        <div className="questions-list">
          {questions.map((question, index) => (
            <div key={index} className="question-card">
              <div className="question-meta">
                <span className="difficulty-badge difficulty-{question.difficulty}">
                  {question.difficulty}
                </span>
                <span className="type-badge">
                  {question.type === 'multiple' ? 'Multiple Choice' : 'True/False'}
                </span>
              </div>
              
              <h4 className="question-text">
                {decodeHTML(question.question)}
              </h4>
              
              {question.type === 'multiple' ? (
                <div className="options-list">
                  {shuffleArray([
                    ...question.incorrect_answers,
                    question.correct_answer
                  ]).map((option, optIndex) => (
                    <div 
                      key={optIndex}
                      className={`option ${option === question.correct_answer ? 'correct' : ''}`}
                    >
                      {decodeHTML(option)}
                      {option === question.correct_answer && (
                        <span className="correct-indicator"> ✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="options-list">
                  <div className={`option ${question.correct_answer === 'True' ? 'correct' : ''}`}>
                    True
                    {question.correct_answer === 'True' && (
                      <span className="correct-indicator"> ✓ Correct</span>
                    )}
                  </div>
                  <div className={`option ${question.correct_answer === 'False' ? 'correct' : ''}`}>
                    False
                    {question.correct_answer === 'False' && (
                      <span className="correct-indicator"> ✓ Correct</span>
                    )}
                  </div>
                </div>
              )}
              
              <div className="question-category">
                Category: {question.category}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to decode HTML entities
const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Helper function to shuffle array (for multiple choice options)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default QuestionsList;