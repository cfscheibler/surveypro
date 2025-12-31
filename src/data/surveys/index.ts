import type { Survey } from '../../types/survey';
import { sdrSurvey } from './sdrSurvey';
import { marketingOpsSurvey } from './marketingOpsSurvey';

// Survey registry - maps survey IDs to survey data
export const surveys: Record<string, Survey> = {
    'panaya-sdr-survey': sdrSurvey,
    'panaya-marketing-ops-survey': marketingOpsSurvey,
};

// Helper function to get a survey by ID
export function getSurveyById(id: string): Survey | undefined {
    return surveys[id];
}

// Get all survey IDs
export function getAllSurveyIds(): string[] {
    return Object.keys(surveys);
}

// Get survey metadata (for listing)
export function getSurveyMetadata() {
    return Object.values(surveys).map((survey) => ({
        id: survey.id,
        title: survey.title,
        description: survey.description,
    }));
}

