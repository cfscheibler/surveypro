import type { Question } from '../../types/survey';
import './Question.css';

interface ShortAnswerQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ShortAnswerQuestion({ question, value, onChange, error }: ShortAnswerQuestionProps) {
  return (
    <div className="question-container">
      <label className="question-label" htmlFor={question.id}>
        {question.text}
        {question.required && <span className="required-indicator">*</span>}
      </label>
      {question.hint && <p className="question-hint">{question.hint}</p>}
      <input
        id={question.id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        className={`text-input ${error ? 'error' : ''}`}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

