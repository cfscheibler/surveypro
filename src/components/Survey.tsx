import type { Survey as SurveyType } from '../types/survey';
import { QuestionRenderer } from './questions';
import { getFilteredSections } from '../utils/surveyLogic';
import './Survey.css';

interface SurveyProps {
  survey: SurveyType;
  answers: Record<string, string | string[]>;
  onAnswerChange: (questionId: string, value: string | string[]) => void;
  errors?: Record<string, string>;
}

export function Survey({ survey, answers, onAnswerChange, errors = {} }: SurveyProps) {
  const filteredSections = getFilteredSections(survey, answers);

  return (
    <div className="survey-container">
      <div className="survey-header">
        <h1 className="survey-title">{survey.title}</h1>
        {survey.description && <p className="survey-description">{survey.description}</p>}
      </div>

      <div className="survey-content">
        {filteredSections.map((section) => (
          <div key={section.id} className="survey-section">
            <div className="section-header">
              <h2 className="section-title">{section.title}</h2>
              {section.description && (
                <p className="section-description">{section.description}</p>
              )}
            </div>

            <div className="section-questions">
              {section.questions.map((question) => (
                <QuestionRenderer
                  key={question.id}
                  question={question}
                  value={answers[question.id] ?? null}
                  onChange={(value) => onAnswerChange(question.id, value)}
                  error={errors[question.id]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

