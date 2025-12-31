import { Link } from 'react-router-dom';
import { getSurveyMetadata } from '../data/surveys';
import './HomePage.css';

export function HomePage() {
  const surveys = getSurveyMetadata();

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="home-header">
          <h1 className="home-title">Panaya Surveys</h1>
          <p className="home-subtitle">Select a survey to begin</p>
        </div>

        <div className="surveys-grid">
          {surveys.map((survey) => (
            <div key={survey.id} className="survey-card-wrapper">
              <Link
                to={`/survey/${survey.id}`}
                className="survey-card"
              >
                <h2 className="survey-card-title">{survey.title}</h2>
                {survey.description && (
                  <p className="survey-card-description">{survey.description}</p>
                )}
                <div className="survey-card-action">
                  Start Survey →
                </div>
              </Link>
              <Link
                to={`/survey/${survey.id}/results`}
                className="survey-results-link"
              >
                View Results
              </Link>
            </div>
          ))}
        </div>

        <div className="import-section">
          <Link to="/import" className="import-card">
            <h2 className="import-card-title">➕ Import New Survey</h2>
            <p className="import-card-description">
              Upload a text file or paste survey text to automatically convert it to the proper format
            </p>
            <div className="import-card-action">
              Import Survey →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

