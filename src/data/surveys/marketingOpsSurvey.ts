import type { Survey } from '../../types/survey';

export const marketingOpsSurvey: Survey = {
    id: 'panaya-marketing-ops-survey',
    title: 'Panaya Marketing Workflow & GTM Enablement Questionnaire',
    description: 'This questionnaire is designed to understand how we can better support Marketing through automation, data infrastructure, attribution, and reporting. The goal is to remove friction, improve signal quality, and increase the impact of marketing programs across the GTM motion.',
    sections: [
        {
            id: 'role-scope',
            title: 'Your Role & Scope',
            description: '',
            questions: [
                {
                    id: 'primary-role',
                    type: 'multiple-choice',
                    text: 'What is your primary role within Marketing?',
                    options: [
                        'Demand Generation',
                        'Product Marketing',
                        'Field / Event Marketing',
                        'Marketing Operations',
                        'Content',
                        'Other'
                    ],
                    required: true
                },
                {
                    id: 'role-tenure',
                    type: 'multiple-choice',
                    text: 'How long have you been in this role at Panaya?',
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
                    text: 'Which regions or segments do you primarily support?',
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
                    id: 'most-frustrating',
                    type: 'paragraph',
                    text: 'What part of your day-to-day work feels the most frustrating or inefficient?',
                    placeholder: 'Describe what feels frustrating or inefficient...',
                    required: false
                },
                {
                    id: 'biggest-impact-automation',
                    type: 'paragraph',
                    text: 'If one thing could be fixed or automated immediately, what would have the biggest impact on your work?',
                    placeholder: 'Describe what would have the biggest impact...',
                    required: false
                }
            ]
        },
        {
            id: 'funnel-visibility',
            title: 'Funnel Visibility & Signal Quality',
            description: '',
            questions: [
                {
                    id: 'least-visible-funnel',
                    type: 'checkboxes',
                    text: 'Where do you feel the funnel is the least visible today?',
                    options: [
                        'Top-of-funnel (visits, engagement)',
                        'MQL → SQL',
                        'SQL → Opportunity',
                        'Opportunity → Revenue',
                        'Multi-touch journeys',
                        'Offline / events',
                        'Not sure'
                    ],
                    required: false
                },
                {
                    id: 'trusted-signals',
                    type: 'paragraph',
                    text: 'Which signals do you trust the most when evaluating campaign success?',
                    placeholder: 'Describe the signals you trust most...',
                    required: false,
                    hint: 'This surfaces attribution and enrichment gaps.'
                },
                {
                    id: 'missing-signals',
                    type: 'paragraph',
                    text: 'Which signals do you wish you had but don\'t today?',
                    placeholder: 'Describe signals you wish you had...',
                    required: false,
                    hint: 'This surfaces attribution and enrichment gaps.'
                }
            ]
        },
        {
            id: 'campaign-execution',
            title: 'Campaign Execution Workflow',
            description: '',
            questions: [
                {
                    id: 'campaign-launch-process',
                    type: 'paragraph',
                    text: 'Walk us through how a typical campaign is launched — from idea to execution.',
                    placeholder: 'Describe the campaign launch process...',
                    required: false
                },
                {
                    id: 'manual-steps',
                    type: 'paragraph',
                    text: 'Where are the most manual steps in campaign setup or execution?',
                    placeholder: 'Describe the manual steps...',
                    required: false
                },
                {
                    id: 'daily-tools',
                    type: 'short-answer',
                    text: 'What tools do you rely on every day to do your job?',
                    placeholder: 'List the tools you use daily...',
                    required: false
                }
            ]
        },
        {
            id: 'tools-data-trust',
            title: 'Tools, Data & Trust',
            description: '',
            questions: [
                {
                    id: 'slowest-tool',
                    type: 'short-answer',
                    text: 'Which tool slows you down the most today?',
                    placeholder: 'Enter the tool name...',
                    required: false
                },
                {
                    id: 'data-breakdown',
                    type: 'paragraph',
                    text: 'Where does data break or become unreliable across systems?',
                    placeholder: 'Describe where data breaks...',
                    required: false
                },
                {
                    id: 'csv-workflow',
                    type: 'multiple-choice',
                    text: 'Do you ever upload or download CSVs as part of your workflow?',
                    options: ['Yes', 'No'],
                    required: true,
                    logic: {
                        on: 'Yes',
                        goToQuestionId: 'csv-sources'
                    }
                },
                {
                    id: 'csv-sources',
                    type: 'short-answer',
                    text: 'Where do these CSVs usually come from or go to?',
                    placeholder: 'Describe CSV sources and destinations...',
                    required: false,
                    hint: 'CSV = shadow attribution.'
                }
            ]
        },
        {
            id: 'lead-handoff',
            title: 'Lead Handoff & Sales Alignment',
            description: '',
            questions: [
                {
                    id: 'lead-routing-confidence',
                    type: 'multiple-choice',
                    text: 'How confident are you that leads are routed and followed up on correctly?',
                    options: [
                        'Very confident',
                        'Somewhat confident',
                        'Not very confident',
                        'Not confident at all'
                    ],
                    required: true
                },
                {
                    id: 'leads-stuck',
                    type: 'paragraph',
                    text: 'Where do leads most commonly get stuck or dropped?',
                    placeholder: 'Describe where leads get stuck...',
                    required: false
                },
                {
                    id: 'sdr-ae-feedback',
                    type: 'paragraph',
                    text: 'What feedback (if any) do you get from SDRs or AEs about lead quality?',
                    placeholder: 'Describe feedback from SDRs or AEs...',
                    required: false,
                    hint: 'This maps directly to SDR questionnaire responses.'
                }
            ]
        },
        {
            id: 'attribution-reporting',
            title: 'Attribution, Reporting & ROI',
            description: '',
            questions: [
                {
                    id: 'measure-success',
                    type: 'paragraph',
                    text: 'How do you currently measure marketing success?',
                    placeholder: 'Describe how you measure success...',
                    required: false
                },
                {
                    id: 'reliable-reports',
                    type: 'short-answer',
                    text: 'Which reports or dashboards do you rely on most today?',
                    placeholder: 'List the reports or dashboards...',
                    required: false
                },
                {
                    id: 'misleading-metrics',
                    type: 'paragraph',
                    text: 'Which metrics feel misleading, incomplete, or overly manual?',
                    placeholder: 'Describe misleading metrics...',
                    required: false
                },
                {
                    id: 'one-metric',
                    type: 'short-answer',
                    text: 'If leadership asked for one number that truly reflects marketing impact, what should it be?',
                    placeholder: 'Enter the metric...',
                    required: false
                }
            ]
        },
        {
            id: 'automation-ai',
            title: 'Automation & AI Opportunities',
            description: '',
            questions: [
                {
                    id: 'automation-areas',
                    type: 'checkboxes',
                    text: 'Which areas would you most like to see automated?',
                    options: [
                        'Lead enrichment',
                        'Campaign tagging',
                        'Attribution',
                        'List cleaning',
                        'Reporting',
                        'Event follow-up',
                        'Other'
                    ],
                    required: false
                },
                {
                    id: 'ai-insights-useful',
                    type: 'multiple-choice',
                    text: 'Would AI-generated insights (e.g., campaign summaries, audience recommendations) be useful to you?',
                    options: [
                        'Very useful',
                        'Somewhat useful',
                        'Not sure',
                        'Not useful'
                    ],
                    required: true
                },
                {
                    id: 'ai-decisions',
                    type: 'paragraph',
                    text: 'What decisions would you trust AI to assist with today?',
                    placeholder: 'Describe AI-assisted decisions...',
                    required: false
                }
            ]
        },
        {
            id: 'communication-adoption',
            title: 'Communication & Adoption',
            description: '',
            questions: [
                {
                    id: 'insights-preferences',
                    type: 'checkboxes',
                    text: 'How do you prefer to receive insights or performance updates?',
                    options: [
                        'Dashboards',
                        'Slack / Microsoft Teams',
                        'Email summaries',
                        'Weekly reports',
                        'Ad-hoc analysis'
                    ],
                    required: false
                },
                {
                    id: 'adoption-barriers',
                    type: 'paragraph',
                    text: 'What usually prevents new tools or workflows from being adopted?',
                    placeholder: 'Describe adoption barriers...',
                    required: false
                },
                {
                    id: 'time-saver-delivery',
                    type: 'paragraph',
                    text: 'If something saved you several hours a week, how should it be delivered to you?',
                    placeholder: 'Describe preferred delivery method...',
                    required: false
                }
            ]
        },
        {
            id: 'partnership-feedback',
            title: 'Partnership & Feedback',
            description: '',
            questions: [
                {
                    id: 'pilot-openness',
                    type: 'multiple-choice',
                    text: 'Would you be open to piloting new workflows, dashboards, or automations?',
                    options: ['Yes', 'Maybe', 'No'],
                    required: true
                },
                {
                    id: 'additional-feedback',
                    type: 'paragraph',
                    text: 'Anything else you want us to understand about how Marketing works today?',
                    placeholder: 'Share any additional thoughts...',
                    required: false
                }
            ]
        }
    ]
};
