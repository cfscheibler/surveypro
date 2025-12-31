import { useState, useCallback } from 'react';
import type { Survey, Question } from '../types/survey';

export interface SurveyAnswers {
  [questionId: string]: string | string[];
}

export interface SurveyErrors {
  [questionId: string]: string;
}

export function useSurveyForm(survey: Survey) {
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [errors, setErrors] = useState<SurveyErrors>({});

  // Get all questions from all sections
  const getAllQuestions = useCallback((): Question[] => {
    return survey.sections.flatMap((section) => section.questions);
  }, [survey]);

  // Validate a single question
  const validateQuestion = useCallback(
    (question: Question, value: string | string[] | null | undefined): string | null => {
      if (question.required) {
        if (value === null || value === undefined) {
          return 'This field is required';
        }
        if (typeof value === 'string' && value.trim() === '') {
          return 'This field is required';
        }
        if (Array.isArray(value) && value.length === 0) {
          return 'Please select at least one option';
        }
      }
      return null;
    },
    []
  );

  // Validate all questions
  const validateAll = useCallback((): boolean => {
    const questions = getAllQuestions();
    const newErrors: SurveyErrors = {};

    questions.forEach((question) => {
      const answer = answers[question.id];
      const error = validateQuestion(question, answer);
      if (error) {
        newErrors[question.id] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [answers, getAllQuestions, validateQuestion]);

  // Handle answer change
  const handleAnswerChange = useCallback(
    (questionId: string, value: string | string[]) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: value,
      }));

      // Clear error for this question when user starts typing/selecting
      if (errors[questionId]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[questionId];
          return newErrors;
        });
      }

      // Validate this question immediately
      const question = getAllQuestions().find((q) => q.id === questionId);
      if (question) {
        const error = validateQuestion(question, value);
        if (error) {
          setErrors((prev) => ({
            ...prev,
            [questionId]: error,
          }));
        }
      }
    },
    [errors, getAllQuestions, validateQuestion]
  );

  // Reset form
  const resetForm = useCallback(() => {
    setAnswers({});
    setErrors({});
  }, []);

  // Get form data for submission
  const getFormData = useCallback(() => {
    return {
      surveyId: survey.id,
      answers,
      isValid: validateAll(),
    };
  }, [survey.id, answers, validateAll]);

  return {
    answers,
    errors,
    handleAnswerChange,
    validateAll,
    resetForm,
    getFormData,
  };
}

