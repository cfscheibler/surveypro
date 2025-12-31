// Re-export survey types for backend use
export type QuestionType = 'multiple-choice' | 'checkboxes' | 'short-answer' | 'paragraph';

export interface LogicRule {
    on: string | string[];
    goToQuestionId?: string;
    skipToSectionId?: string;
}

export interface Question {
    id: string;
    type: QuestionType;
    text: string;
    options?: string[];
    placeholder?: string;
    required?: boolean;
    logic?: LogicRule;
    hint?: string;
}

export interface Section {
    id: string;
    title: string;
    description?: string;
    questions: Question[];
}

export interface Survey {
    id: string;
    title: string;
    description: string;
    sections: Section[];
}

