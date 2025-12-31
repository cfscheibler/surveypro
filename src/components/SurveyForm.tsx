import type { Survey } from '../types/survey';
import { useSurveyForm } from '../hooks/useSurveyForm';
import { Survey as SurveyComponent } from './Survey';
import { Button } from './ui';
import './SurveyForm.css';

interface SurveyFormProps {
  survey: Survey;
  onSubmit?: (data: { surveyId: string; answers: Record<string, string | string[]> }) => void;
  isSubmitting?: boolean;
}

export function SurveyForm({ survey, onSubmit, isSubmitting = false }: SurveyFormProps) {
  const { answers, errors, handleAnswerChange, validateAll, getFormData } = useSurveyForm(survey);

  const handleSubmit = () => {
    if (validateAll() && !isSubmitting) {
      const formData = getFormData();
      onSubmit?.(formData);
    }
  };

  return (
    <div className="survey-form">
      <SurveyComponent
        survey={survey}
        answers={answers}
        onAnswerChange={handleAnswerChange}
        errors={errors}
      />
      <div className="survey-form-actions">
        <Button
          onClick={handleSubmit}
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Survey'}
        </Button>
      </div>
    </div>
  );
}

