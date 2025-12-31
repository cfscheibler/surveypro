import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getSurveyById } from '../data/surveys';
import { getSurveyResponses, getResponseDetails } from '../services/api';
import { convertResponsesToCSV, downloadCSV } from '../services/csvExport';
import { Button } from '../components';
import './SurveyResults.css';

interface Answer {
  questionId: string;
  answer: string;
  createdAt: string;
}

interface Response {
  id: string;
  survey_id: string;
  completed_at: string;
  created_at: string;
  answer_count?: string;
  answers?: Answer[];
}

export function SurveyResults() {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedResponse, setExpandedResponse] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const survey = surveyId ? getSurveyById(surveyId) : undefined;

  useEffect(() => {
    if (!surveyId) return;

    const fetchResponses = async () => {
      try {
        setLoading(true);
        const result = await getSurveyResponses(surveyId);
        
        if (result.success && result.responses) {
          // Fetch detailed answers for each response
          const responsesWithAnswers = await Promise.all(
            result.responses.map(async (response: Response) => {
              try {
                const details = await getResponseDetails(response.id);
                if (details.success && details.answers) {
                  return {
                    ...response,
                    answers: details.answers,
                  };
                }
                return response;
              } catch (err) {
                console.error(`Error fetching details for response ${response.id}:`, err);
                return response;
              }
            })
          );
          setResponses(responsesWithAnswers);
        } else {
          setResponses([]);
        }
      } catch (err) {
        console.error('Error fetching responses:', err);
        setError('Failed to load survey results');
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, [surveyId]);

  const getQuestionText = (questionId: string): string => {
    if (!survey) return questionId;
    
    for (const section of survey.sections) {
      const question = section.questions.find((q) => q.id === questionId);
      if (question) return question.text;
    }
    return questionId;
  };

  const formatAnswer = (answer: string): string => {
    try {
      // Try to parse as JSON (for array answers like checkboxes)
      const parsed = JSON.parse(answer);
      if (Array.isArray(parsed)) {
        return parsed.join(', ');
      }
      return parsed;
    } catch {
      return answer;
    }
  };

  const handleDownloadCSV = () => {
    if (!survey || responses.length === 0) return;

    try {
      setDownloading(true);
      
      // Convert responses to CSV format with question text
      const csvContent = convertResponsesToCSV(
        survey,
        responses.map((r) => ({
          id: r.id,
          completed_at: r.completed_at || r.created_at,
          answers: r.answers,
        }))
      );

      const filename = `${surveyId}-results-${new Date().toISOString().split('T')[0]}.csv`;
      downloadCSV(csvContent, filename);
    } catch (err) {
      console.error('Error downloading CSV:', err);
      setError('Failed to download CSV. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (!survey) {
    return (
      <div className="survey-results">
        <div className="results-error">
          <h1>Survey Not Found</h1>
          <p>The survey you're looking for doesn't exist.</p>
          <Link to="/">Go to Home</Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="survey-results">
        <div className="results-loading">Loading results...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="survey-results">
        <div className="results-error">
          <h1>Error</h1>
          <p>{error}</p>
          <Link to="/">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="survey-results">
      <div className="results-container">
        <div className="results-header">
          <h1>{survey.title} - Results</h1>
          <p className="results-count">
            {responses.length} {responses.length === 1 ? 'response' : 'responses'}
          </p>
          <div className="results-actions">
            <Button
              onClick={handleDownloadCSV}
              disabled={downloading || responses.length === 0}
              variant="primary"
            >
              {downloading ? 'Downloading...' : '📥 Download CSV'}
            </Button>
            <Link to="/" className="back-link">← Back to Home</Link>
          </div>
        </div>

        {responses.length === 0 ? (
          <div className="no-responses">
            <p>No responses yet. Share the survey to start collecting responses!</p>
          </div>
        ) : (
          <div className="responses-list">
            {responses.map((response) => (
              <div key={response.id} className="response-card">
                <div
                  className="response-header"
                  onClick={() =>
                    setExpandedResponse(
                      expandedResponse === response.id ? null : response.id
                    )
                  }
                >
                  <div className="response-info">
                    <span className="response-date">
                      {new Date(response.completed_at || response.created_at).toLocaleString()}
                    </span>
                    <span className="response-count">
                      {response.answers?.length || response.answer_count || 0} answers
                    </span>
                  </div>
                  <button className="expand-button">
                    {expandedResponse === response.id ? '▼' : '▶'}
                  </button>
                </div>

                {expandedResponse === response.id && response.answers && (
                  <div className="response-answers">
                    {response.answers.map((answer, index) => (
                      <div key={index} className="answer-item">
                        <div className="question-text">
                          {getQuestionText(answer.questionId)}
                        </div>
                        <div className="answer-text">
                          {formatAnswer(answer.answer)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

