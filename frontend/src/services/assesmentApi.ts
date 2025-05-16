import axiosInstance from './api'; // Import the pre-configured Axios instance

/**
 * Fetch the assessment from the backend.
 */
export async function getAssessment() {
  try {
    const response = await axiosInstance.post('/assessments/generate'); // Use `POST` method for `/assessments/generate`
    return response.data; // Extract and return the data from the response
  } catch (error: any) {
    console.error('Error fetching assessment:', error);
    throw new Error(error?.response?.data?.message || 'Failed to fetch assessment.');
  }
}

/**
 * Submit the completed assessment to the backend.
 */
export async function submitAssessment(assessmentId: string, answers: Record<string, string>) {
  try {
    const response = await axiosInstance.post(`/assessments/${assessmentId}/complete`, { answers }); // Use `POST` method with the payload
    return response.data; // Extract and return the data from the response
  } catch (error: any) {
    console.error('Error submitting assessment:', error);
    throw new Error(error?.response?.data?.message || 'Failed to submit assessment.');
  }
}