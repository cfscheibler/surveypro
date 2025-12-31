import type { Question } from '../../types/survey';
import './Question.css';

interface ParagraphQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function ParagraphQuestion({ question, value, onChange, error }: ParagraphQuestionProps) {
  return (
    <div className="question-container">
      <label className="question-label" htmlFor={question.id}>
        {question.text}
        {question.required && <span className="required-indicator">*</span>}
      </label>
      {question.hint && <p className="question-hint">{question.hint}</p>}
      <textarea
        id={question.id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder}
        rows={4}
        className={`text-input textarea ${error ? 'error' : ''}`}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

