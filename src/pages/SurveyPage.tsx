import { useState } from 'react';
import { SurveyForm } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import { getSurveyById } from '../data/surveys';
import { submitSurveyResponse } from '../services/api';
import './SurveyPage.css';

export function SurveyPage() {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const survey = surveyId ? getSurveyById(surveyId) : undefined;

  const handleSubmit = async (data: { surveyId: string; answers: Record<string, string | string[]> }) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await submitSurveyResponse(data);

      if (result.success) {
        // Navigate to thank you page after successful submission
        navigate('/thank-you', { 
          state: { 
            surveyId: data.surveyId,
            surveyTitle: survey?.title,
            responseId: result.data?.responseId
          } 
        });
      } else {
        setSubmitError(result.message || 'Failed to submit survey. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting survey:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (!survey) {
    return (
      <div className="survey-page">
        <div className="survey-error">
          <h1>Survey Not Found</h1>
          <p>The survey you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/')} className="back-button">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-page">
      {submitError && (
        <div className="submit-error">
          <p>{submitError}</p>
          <button onClick={() => setSubmitError(null)}>Dismiss</button>
        </div>
      )}
      <SurveyForm 
        survey={survey} 
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

