import type { Question } from '../../types/survey';
import './Question.css';

interface CheckboxesQuestionProps {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export function CheckboxesQuestion({ question, value, onChange, error }: CheckboxesQuestionProps) {
  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

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
              type="checkbox"
              checked={value.includes(option)}
              onChange={() => handleToggle(option)}
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

