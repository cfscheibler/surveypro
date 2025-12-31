import { Routes, Route } from 'react-router-dom';
import { HomePage, SurveyPage, ThankYouPage } from './pages';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/survey/:surveyId" element={<SurveyPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </div>
  );
}

export default App;
