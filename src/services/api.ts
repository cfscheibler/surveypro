// API service for communicating with backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface SubmitResponseData {
  surveyId: string;
  answers: Record<string, string | string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: unknown;
}

/**
 * Submit a survey response to the backend
 */
export async function submitSurveyResponse(
  data: SubmitResponseData
): Promise<ApiResponse<{ responseId: string }>> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/responses/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to submit survey',
        errors: result.errors,
      };
    }

    return {
      success: true,
      data: result,
      message: result.message,
    };
  } catch (error) {
    console.error('Error submitting survey response:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    };
  }
}

/**
 * Get all responses for a survey
 */
export async function getSurveyResponses(surveyId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/responses/survey/${surveyId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching survey responses:', error);
    throw error;
  }
}

/**
 * Get detailed response with answers
 */
export async function getResponseDetails(responseId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/responses/response/${responseId}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching response details:', error);
    throw error;
  }
}

/**
 * Export survey responses as CSV
 */
export async function exportSurveyResponses(surveyId: string): Promise<Blob> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/responses/export/${surveyId}`);
    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error('Error exporting survey responses:', error);
    throw error;
  }
}

