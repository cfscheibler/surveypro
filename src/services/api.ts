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
    const url = `${API_BASE_URL}/api/responses/submit`;
    console.log('Submitting to:', url);
    console.log('API_BASE_URL:', API_BASE_URL);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if response is JSON before parsing
    const contentType = response.headers.get('content-type');
    let result;
    
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      return {
        success: false,
        message: `Server error (${response.status}): ${text.substring(0, 100)}`,
      };
    }

    if (!response.ok) {
      console.error('API error:', result);
      return {
        success: false,
        message: result.message || `Failed to submit survey (${response.status})`,
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const apiUrl = API_BASE_URL || 'not set';
    
    return {
      success: false,
      message: `Network error: ${errorMessage}. API URL: ${apiUrl}. Please check your connection and ensure VITE_API_URL is set in Vercel.`,
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

