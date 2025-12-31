import { Routes, Route } from 'react-router-dom';
import { HomePage, SurveyPage, ThankYouPage, SurveyImporter, SurveyResults } from './pages';
import { PanayaHeader } from './components';
import './App.css';

function App() {
  return (
    <div className="app">
      <PanayaHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey/:surveyId" element={<SurveyPage />} />
        <Route path="/survey/:surveyId/results" element={<SurveyResults />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/import" element={<SurveyImporter />} />
      </Routes>
    </div>
  );
}

export default App;
