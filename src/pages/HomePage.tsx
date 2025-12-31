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
            <Link
              key={survey.id}
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
          ))}
        </div>
      </div>
    </div>
  );
}

