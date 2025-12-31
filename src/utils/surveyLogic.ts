import type { Survey, Question, Section } from '../types/survey';
import type { SurveyAnswers } from '../hooks/useSurveyForm';

/**
 * Check if an answer matches a logic rule condition
 */
function matchesLogicCondition(
  answer: string | string[] | null | undefined,
  condition: string | string[]
): boolean {
  if (answer === null || answer === undefined) {
    return false;
  }

  if (Array.isArray(condition)) {
    // If condition is an array, check if answer matches any value
    if (typeof answer === 'string') {
      return condition.includes(answer);
    }
    if (Array.isArray(answer)) {
      return condition.some((c) => answer.includes(c));
    }
  } else {
    // If condition is a string, check exact match
    if (typeof answer === 'string') {
      return answer === condition;
    }
    if (Array.isArray(answer)) {
      return answer.includes(condition);
    }
  }

  return false;
}

/**
 * Get all question IDs that should be visible based on logic rules
 * Processes questions in order and applies skip logic when conditions are met
 */
export function getVisibleQuestionIds(survey: Survey, answers: SurveyAnswers): Set<string> {
  const visibleIds = new Set<string>();
  const allQuestions: Array<{ question: Question; sectionId: string }> = [];

  // Flatten all questions with their section IDs
  survey.sections.forEach((section) => {
    section.questions.forEach((question) => {
      allQuestions.push({ question, sectionId: section.id });
    });
  });

  // Track if we're currently skipping (due to a logic rule)
  let isSkipping = false;
  let skipUntilQuestionId: string | null = null;
  let skipUntilSectionId: string | null = null;

  for (let i = 0; i < allQuestions.length; i++) {
    const { question, sectionId } = allQuestions[i];
    const answer = answers[question.id];

    // Check if we should stop skipping
    if (isSkipping) {
      if (skipUntilQuestionId === question.id) {
        // Reached target question - show it and stop skipping
        isSkipping = false;
        skipUntilQuestionId = null;
        visibleIds.add(question.id);
        continue;
      } else if (skipUntilSectionId === sectionId) {
        // Reached target section - show questions from this section and stop skipping
        isSkipping = false;
        skipUntilSectionId = null;
        visibleIds.add(question.id);
        continue;
      } else {
        // Still skipping, don't show this question
        continue;
      }
    }

    // Show this question
    visibleIds.add(question.id);

    // Check if this question's logic should trigger skipping
    // (Only check if we have an answer - logic applies after answering)
    if (question.logic && answer !== undefined && answer !== null) {
      const logic = question.logic;
      if (matchesLogicCondition(answer, logic.on)) {
        // Logic rule triggered - start skipping from the NEXT question
        if (logic.goToQuestionId) {
          isSkipping = true;
          skipUntilQuestionId = logic.goToQuestionId;
          skipUntilSectionId = null;
        } else if (logic.skipToSectionId) {
          isSkipping = true;
          skipUntilSectionId = logic.skipToSectionId;
          skipUntilQuestionId = null;
        }
      }
    }
  }

  return visibleIds;
}

/**
 * Get filtered sections with only visible questions
 */
export function getFilteredSections(
  survey: Survey,
  answers: SurveyAnswers
): Section[] {
  const visibleQuestionIds = getVisibleQuestionIds(survey, answers);

  return survey.sections
    .map((section) => ({
      ...section,
      questions: section.questions.filter((q) => visibleQuestionIds.has(q.id)),
    }))
    .filter((section) => section.questions.length > 0);
}

/**
 * Check if a logic rule should trigger navigation
 */
export function shouldTriggerNavigation(
  question: Question,
  answer: string | string[] | null | undefined
): { goToQuestionId?: string; skipToSectionId?: string } | null {
  if (!question.logic || answer === null || answer === undefined) {
    return null;
  }

  const logic = question.logic;
  if (matchesLogicCondition(answer, logic.on)) {
    return {
      goToQuestionId: logic.goToQuestionId,
      skipToSectionId: logic.skipToSectionId,
    };
  }

  return null;
}

