import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components';
import './ThankYouPage.css';

export function ThankYouPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const surveyId = location.state?.surveyId;
  const surveyTitle = location.state?.surveyTitle;

  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <div className="thank-you-icon">✓</div>
        <h1 className="thank-you-title">Thank You!</h1>
        <p className="thank-you-message">
          Your survey response has been submitted successfully.
        </p>
        {surveyTitle && (
          <p className="thank-you-survey-name">
            Survey: <span>{surveyTitle}</span>
          </p>
        )}
        {surveyId && (
          <p className="thank-you-survey-id">
            Survey ID: <span>{surveyId}</span>
          </p>
        )}
        <div className="thank-you-actions">
          <Button onClick={() => navigate('/')} variant="secondary">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

