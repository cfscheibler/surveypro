// CSV export utility that maps question IDs to question text
import type { Survey } from '../types/survey';

export interface CSVRow {
  'Response ID': string;
  'Completed At': string;
  [questionText: string]: string;
}

/**
 * Convert survey responses to CSV with question text instead of IDs
 */
export function convertResponsesToCSV(
  survey: Survey,
  responses: Array<{
    id: string;
    completed_at: string;
    answers?: Array<{ questionId: string; answer: string }>;
  }>
): string {
  // Create question ID to text mapping
  const questionMap = new Map<string, string>();
  survey.sections.forEach((section) => {
    section.questions.forEach((question) => {
      questionMap.set(question.id, question.text);
    });
  });

  // Get all question texts in order
  const questionTexts: string[] = [];
  survey.sections.forEach((section) => {
    section.questions.forEach((question) => {
      questionTexts.push(question.text);
    });
  });

  // Build CSV
  const csvRows: string[] = [];

  // Header
  const header = ['Response ID', 'Completed At', ...questionTexts];
  csvRows.push(header.map((h) => `"${escapeCSV(h)}"`).join(','));

  // Data rows
  responses.forEach((response) => {
    const row: string[] = [
      response.id,
      response.completed_at || '',
      ...questionTexts.map((questionText) => {
        // Find question ID for this text
        const questionId = Array.from(questionMap.entries()).find(
          ([, text]) => text === questionText
        )?.[0];

        if (!questionId || !response.answers) return '';

        const answer = response.answers.find((a) => a.questionId === questionId);
        if (!answer) return '';

        // Format answer
        let formattedAnswer = answer.answer;
        try {
          const parsed = JSON.parse(answer.answer);
          if (Array.isArray(parsed)) {
            formattedAnswer = parsed.join('; ');
          } else {
            formattedAnswer = String(parsed);
          }
        } catch {
          formattedAnswer = String(answer.answer);
        }

        return escapeCSV(formattedAnswer);
      }),
    ];
    csvRows.push(row.map((cell) => `"${cell}"`).join(','));
  });

  return csvRows.join('\n');
}

function escapeCSV(value: string): string {
  return value.replace(/"/g, '""').replace(/\n/g, ' ').replace(/\r/g, '');
}

/**
 * Download CSV file
 */
export function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

