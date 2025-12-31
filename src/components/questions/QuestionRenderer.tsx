import type { Question } from '../../types/survey';
import { MultipleChoiceQuestion } from './MultipleChoiceQuestion';
import { CheckboxesQuestion } from './CheckboxesQuestion';
import { ShortAnswerQuestion } from './ShortAnswerQuestion';
import { ParagraphQuestion } from './ParagraphQuestion';

interface QuestionRendererProps {
  question: Question;
  value: string | string[] | null;
  onChange: (value: string | string[]) => void;
  error?: string;
}

export function QuestionRenderer({ question, value, onChange, error }: QuestionRendererProps) {
  switch (question.type) {
    case 'multiple-choice':
      return (
        <MultipleChoiceQuestion
          question={question}
          value={typeof value === 'string' ? value : null}
          onChange={(v) => onChange(v)}
          error={error}
        />
      );
    case 'checkboxes':
      return (
        <CheckboxesQuestion
          question={question}
          value={Array.isArray(value) ? value : []}
          onChange={(v) => onChange(v)}
          error={error}
        />
      );
    case 'short-answer':
      return (
        <ShortAnswerQuestion
          question={question}
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => onChange(v)}
          error={error}
        />
      );
    case 'paragraph':
      return (
        <ParagraphQuestion
          question={question}
          value={typeof value === 'string' ? value : ''}
          onChange={(v) => onChange(v)}
          error={error}
        />
      );
    default:
      return null;
  }
}

