import { Routes, Route } from 'react-router-dom';
import { HomePage, SurveyPage, ThankYouPage, SurveyImporter } from './pages';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey/:surveyId" element={<SurveyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/import" element={<SurveyImporter />} />
      </Routes>
    </div>
  );
}

export default App;
