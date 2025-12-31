import type { Survey } from '../../types/survey';

// TODO: Replace with actual SDR survey data
export const sdrSurvey: Survey = {
    id: 'panaya-sdr-survey',
    title: 'Panaya SDR Team Survey',
    description: 'Survey for the Panaya SDR team. Please provide your feedback.',
    sections: [
        {
            id: 'welcome',
            title: 'Welcome',
            description: 'Thank you for participating in this survey.',
            questions: [
                {
                    id: 'placeholder',
                    type: 'short-answer',
                    text: 'This is a placeholder. The actual survey questions will be added here.',
                    placeholder: 'Enter your response...',
                    required: false
                }
            ]
        }
    ]
};

