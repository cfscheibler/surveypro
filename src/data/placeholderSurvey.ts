import { Survey } from '../types/survey';

export const placeholderSurvey: Survey = {
    id: 'sdr-enablement-v1',
    title: 'SDR Enablement Questionnaire',
    description: 'Help us understand how we can best support you in your SDR role.',
    sections: [
        {
            id: 'context',
            title: 'Role Context',
            description: 'Tell us a bit about your current setup.',
            questions: [
                {
                    id: 'role_tenure',
                    type: 'multiple-choice',
                    text: 'How long have you been in your current SDR role?',
                    options: ['Less than 6 months', '6-12 months', '1-2 years', '2+ years'],
                    required: true
                },
                {
                    id: 'primary_market',
                    type: 'multiple-choice',
                    text: 'What is your primary target market?',
                    options: ['SMB', 'Mid-Market', 'Enterprise', 'Strategic'],
                    required: true
                }
            ]
        },
        {
            id: 'pain_points',
            title: 'Pain Points',
            description: 'What are the biggest challenges you face?',
            questions: [
                {
                    id: 'biggest_challenge',
                    type: 'multiple-choice',
                    text: 'What is the single biggest blocker to hitting your quota?',
                    options: [
                        'Not enough leads',
                        'Bad data quality',
                        'Lack of response / connecting',
                        'Internal processes / admin work',
                        'Product knowledge gap'
                    ],
                    required: true
                },
                {
                    id: 'tool_frustration',
                    type: 'short-answer',
                    text: 'If you could wave a magic wand and fix one thing about your tech stack, what would it be?',
                    placeholder: 'e.g., Salesforce is too slow...',
                    required: false
                }
            ]
        }
    ]
};
