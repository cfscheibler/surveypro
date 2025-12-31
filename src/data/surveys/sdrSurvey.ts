import type { Survey } from '../../types/survey';

export const sdrSurvey: Survey = {
    id: 'panaya-sdr-survey',
    title: 'Panaya SDR Workflow & GTM Support Questionnaire',
    description: 'This questionnaire is designed to understand how we can better support you through tooling, automation, and workflow improvements. There are no right or wrong answers — the goal is to reduce friction and help you be more effective in your role.',
    sections: [
        {
            id: 'role-context',
            title: 'Your Role & Context',
            description: '',
            questions: [
                {
                    id: 'sdr-tenure',
                    type: 'multiple-choice',
                    text: 'How long have you been an SDR at Panaya?',
                    options: [
                        'Less than 3 months',
                        '3–6 months',
                        '6–12 months',
                        '1+ year'
                    ],
                    required: true
                },
                {
                    id: 'regions-segments',
                    type: 'short-answer',
                    text: 'Which region(s) or segment(s) do you primarily cover?',
                    placeholder: 'Enter regions or segments...',
                    required: false
                }
            ]
        },
        {
            id: 'whats-hard',
            title: "What's Hard Right Now",
            description: '',
            questions: [
                {
                    id: 'frustrating-work',
                    type: 'paragraph',
                    text: 'What part of your day-to-day work feels the most frustrating or inefficient?',
                    placeholder: 'Describe what feels most frustrating...',
                    required: false
                },
                {
                    id: 'one-thing-fix',
                    type: 'paragraph',
                    text: 'If one thing could be fixed or improved immediately, what would help you the most?',
                    placeholder: 'What would help you the most?',
                    required: false
                }
            ]
        },
        {
            id: 'speed-to-lead',
            title: 'Speed-to-Lead & Signals',
            description: '',
            questions: [
                {
                    id: 'find-hot-leads',
                    type: 'checkboxes',
                    text: 'How do you usually find out that an account or lead is "hot"?',
                    options: [
                        'Salesforce',
                        'ZoomInfo / intent tools',
                        'AE or manager notification',
                        'I discover it myself',
                        'Other'
                    ],
                    required: false
                },
                {
                    id: 'signal-timeliness',
                    type: 'multiple-choice',
                    text: 'How timely do these signals feel when you receive them?',
                    options: [
                        'Too late',
                        'Sometimes on time',
                        'Usually on time',
                        'Perfect timing'
                    ],
                    required: false
                },
                {
                    id: 'signals-that-matter',
                    type: 'paragraph',
                    text: 'Which signals actually matter to you when prioritizing outreach?',
                    placeholder: 'Describe which signals matter most...',
                    required: false
                },
                {
                    id: 'time-to-first-action',
                    type: 'multiple-choice',
                    text: 'When a new lead comes in, how long does it typically take before you take first action (call, email, LinkedIn)?',
                    options: [
                        'Under 5 minutes',
                        '5–15 minutes',
                        '15–60 minutes',
                        'Same day',
                        'Next day or later'
                    ],
                    required: false
                }
            ]
        },
        {
            id: 'daily-workflow',
            title: 'Daily Workflow',
            description: '',
            questions: [
                {
                    id: 'new-lead-process',
                    type: 'paragraph',
                    text: 'Walk us through what you do with a new lead — from the moment you see it to first outreach.',
                    placeholder: 'Describe your process...',
                    required: false
                },
                {
                    id: 'copy-paste-between-tools',
                    type: 'paragraph',
                    text: 'Where do you regularly copy/paste information between tools?',
                    placeholder: 'Describe where you copy/paste...',
                    required: false
                },
                {
                    id: 'daily-tools',
                    type: 'short-answer',
                    text: 'What tools do you open every single day as part of your workflow?',
                    placeholder: 'List your daily tools...',
                    required: false
                }
            ]
        },
        {
            id: 'tools-data-trust',
            title: 'Tools & Data Trust',
            description: '',
            questions: [
                {
                    id: 'tool-slows-down',
                    type: 'short-answer',
                    text: 'Which tool slows you down the most today?',
                    placeholder: 'Enter tool name...',
                    required: false
                },
                {
                    id: 'tool-least-trust',
                    type: 'multiple-choice',
                    text: 'Which tool do you trust the least to reflect reality?',
                    options: [
                        'Salesforce',
                        'Dialer',
                        'LinkedIn',
                        'Intent tools',
                        'I trust them all'
                    ],
                    required: false
                },
                {
                    id: 'csv-workflow',
                    type: 'multiple-choice',
                    text: 'Do you ever upload or download CSVs as part of your work?',
                    options: [
                        'Yes',
                        'No'
                    ],
                    required: false,
                    logic: {
                        on: 'Yes',
                        goToQuestionId: 'csv-sources'
                    }
                },
                {
                    id: 'csv-sources',
                    type: 'short-answer',
                    text: 'Where do these CSVs usually come from or go to?',
                    placeholder: 'Describe CSV sources or destinations...',
                    required: false
                }
            ]
        },
        {
            id: 'outreach-personalization',
            title: 'Outreach & Personalization',
            description: '',
            questions: [
                {
                    id: 'personalization-level',
                    type: 'multiple-choice',
                    text: 'How much personalization do you typically do before reaching out?',
                    options: [
                        'None',
                        'Minimal',
                        'Moderate',
                        'High personalization'
                    ],
                    required: false
                },
                {
                    id: 'wish-before-outreach',
                    type: 'paragraph',
                    text: 'What information do you wish you had before calling or emailing a lead?',
                    placeholder: 'Describe what information would help...',
                    required: false
                },
                {
                    id: 'auto-talking-points',
                    type: 'multiple-choice',
                    text: 'If short, relevant talking points were automatically prepared for you, would you use them?',
                    options: [
                        'Definitely',
                        'Probably',
                        'Not sure',
                        'Probably not'
                    ],
                    required: false
                }
            ]
        },
        {
            id: 'routing-ownership',
            title: 'Routing, Ownership & Fairness',
            description: '',
            questions: [
                {
                    id: 'lead-routing-correct',
                    type: 'multiple-choice',
                    text: 'Do leads usually get routed to the correct SDR today?',
                    options: [
                        'Yes',
                        'Sometimes',
                        'Often no'
                    ],
                    required: false
                },
                {
                    id: 'routing-wrong-what-happens',
                    type: 'paragraph',
                    text: 'When routing goes wrong, what usually happens?',
                    placeholder: 'Describe what happens when routing goes wrong...',
                    required: false
                },
                {
                    id: 'automated-routing-rules',
                    type: 'paragraph',
                    text: 'If routing rules were automated, what should they always respect?',
                    placeholder: 'Describe what routing rules should respect...',
                    required: false
                }
            ]
        },
        {
            id: 'metrics-measurement',
            title: 'Metrics & Measurement',
            description: '',
            questions: [
                {
                    id: 'metric-matters-most',
                    type: 'short-answer',
                    text: 'Which metric matters most to you personally?',
                    placeholder: 'Enter the metric...',
                    required: false
                },
                {
                    id: 'metric-least-fair',
                    type: 'short-answer',
                    text: 'Which metric feels the least fair or least useful?',
                    placeholder: 'Enter the metric...',
                    required: false
                },
                {
                    id: 'metric-leadership-should-see',
                    type: 'paragraph',
                    text: 'Is there any metric you think leadership should see — but doesn't today?',
                    placeholder: 'Describe the metric...',
                    required: false
                }
            ]
        },
        {
            id: 'adoption-communication',
            title: 'Adoption & Communication',
            description: '',
            questions: [
                {
                    id: 'prefer-receive-info',
                    type: 'checkboxes',
                    text: 'How do you prefer to receive new information or alerts?',
                    options: [
                        'Microsoft Teams',
                        'Salesforce',
                        'Email',
                        'Dashboards',
                        'Other'
                    ],
                    required: false
                },
                {
                    id: 'ignore-new-tool',
                    type: 'paragraph',
                    text: 'What usually makes you ignore a new tool or process?',
                    placeholder: 'Describe what makes you ignore new tools...',
                    required: false
                },
                {
                    id: 'how-show-time-savings',
                    type: 'paragraph',
                    text: 'If something saved you 30 minutes a day, how should it show up for you?',
                    placeholder: 'Describe how it should appear...',
                    required: false
                }
            ]
        },
        {
            id: 'partnership',
            title: 'Partnership',
            description: '',
            questions: [
                {
                    id: 'open-to-feedback',
                    type: 'multiple-choice',
                    text: 'Would you be open to giving feedback on new workflows or automations as they roll out?',
                    options: [
                        'Yes',
                        'Maybe',
                        'No'
                    ],
                    required: false
                },
                {
                    id: 'anything-else',
                    type: 'paragraph',
                    text: 'Anything else you want us to understand about how you work?',
                    placeholder: 'Share anything else...',
                    required: false
                }
            ]
        }
    ]
};
