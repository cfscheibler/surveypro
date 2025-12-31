import type { Question } from '../../types/survey';
import './Question.css';

interface MultipleChoiceQuestionProps {
  question: Question;
  value: string | null;
  onChange: (value: string) => void;
  error?: string;
}

export function MultipleChoiceQuestion({ question, value, onChange, error }: MultipleChoiceQuestionProps) {
  return (
    <div className="question-container">
      <label className="question-label">
        {question.text}
        {question.required && <span className="required-indicator">*</span>}
      </label>
      {question.hint && <p className="question-hint">{question.hint}</p>}
      <div className="options-container">
        {question.options?.map((option) => (
          <label key={option} className="option-label">
            <input
              type="radio"
              name={question.id}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="option-input"
            />
            <span className="option-text">{option}</span>
          </label>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

