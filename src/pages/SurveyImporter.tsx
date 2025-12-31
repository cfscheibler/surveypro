import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import './SurveyImporter.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export function SurveyImporter() {
  const [surveyText, setSurveyText] = useState('');
  const [surveyId, setSurveyId] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [convertedSurvey, setConvertedSurvey] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setSurveyText(content);
    };
    reader.readAsText(uploadedFile);
  };

  const handleConvert = async () => {
    if (!surveyText.trim()) {
      setError('Please provide survey text');
      return;
    }

    setIsConverting(true);
    setError(null);
    setConvertedSurvey(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/surveys/convert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyText,
          surveyId: surveyId || undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to convert survey');
      }

      setConvertedSurvey(result.survey);
    } catch (err) {
      console.error('Error converting survey:', err);
      setError(err instanceof Error ? err.message : 'Failed to convert survey');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedSurvey) return;

    const content = `import type { Survey } from '../../types/survey';

export const ${convertedSurvey.id.replace(/-/g, '_')}Survey: Survey = ${JSON.stringify(convertedSurvey, null, 2)};
`;

    const blob = new Blob([content], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${convertedSurvey.id}.ts`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = () => {
    if (!convertedSurvey) return;

    const content = `import type { Survey } from '../../types/survey';

export const ${convertedSurvey.id.replace(/-/g, '_')}Survey: Survey = ${JSON.stringify(convertedSurvey, null, 2)};
`;

    navigator.clipboard.writeText(content);
    alert('Survey code copied to clipboard!');
  };

  return (
    <div className="survey-importer">
      <div className="importer-container">
        <div className="importer-header">
          <h1>Survey Importer</h1>
          <p>Upload a text file or paste survey text to automatically convert it to the proper format</p>
        </div>

        <div className="importer-content">
          <div className="input-section">
            <div className="file-upload-area">
              <input
                type="file"
                id="file-upload"
                accept=".txt,.md"
                onChange={handleFileUpload}
                className="file-input"
              />
              <label htmlFor="file-upload" className="file-label">
                📁 Upload Text File
              </label>
              {file && <span className="file-name">{file.name}</span>}
            </div>

            <div className="text-input-section">
              <label htmlFor="survey-id">Survey ID (optional):</label>
              <input
                id="survey-id"
                type="text"
                value={surveyId}
                onChange={(e) => setSurveyId(e.target.value)}
                placeholder="e.g., panaya-sdr-survey"
                className="survey-id-input"
              />
            </div>

            <div className="text-input-section">
              <label htmlFor="survey-text">Or Paste Survey Text:</label>
              <textarea
                id="survey-text"
                value={surveyText}
                onChange={(e) => setSurveyText(e.target.value)}
                placeholder="Paste your survey text here...&#10;&#10;Example:&#10;Survey Title&#10;&#10;Section 1: Section Name&#10;1. Question text?&#10;Multiple choice&#10;  • Option 1&#10;  • Option 2"
                rows={15}
                className="survey-text-input"
              />
            </div>

            <Button
              onClick={handleConvert}
              disabled={isConverting || !surveyText.trim()}
              fullWidth
            >
              {isConverting ? 'Converting...' : 'Convert Survey'}
            </Button>

            {error && (
              <div className="error-message">
                <p>❌ {error}</p>
              </div>
            )}
          </div>

          {convertedSurvey && (
            <div className="output-section">
              <div className="output-header">
                <h2>✅ Converted Survey</h2>
                <div className="output-actions">
                  <Button onClick={handleCopyToClipboard} variant="secondary">
                    Copy Code
                  </Button>
                  <Button onClick={handleDownload} variant="secondary">
                    Download File
                  </Button>
                </div>
              </div>

              <div className="survey-preview">
                <h3>{convertedSurvey.title}</h3>
                <p>{convertedSurvey.description}</p>
                <p><strong>Survey ID:</strong> {convertedSurvey.id}</p>
                <p><strong>Sections:</strong> {convertedSurvey.sections?.length || 0}</p>
                <p>
                  <strong>Total Questions:</strong>{' '}
                  {convertedSurvey.sections?.reduce(
                    (sum: number, section: any) => sum + (section.questions?.length || 0),
                    0
                  ) || 0}
                </p>
              </div>

              <details className="code-preview">
                <summary>View Generated Code</summary>
                <pre>
                  <code>
                    {JSON.stringify(convertedSurvey, null, 2)}
                  </code>
                </pre>
              </details>
            </div>
          )}
        </div>

        <div className="importer-footer">
          <Button onClick={() => navigate('/')} variant="secondary">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}

