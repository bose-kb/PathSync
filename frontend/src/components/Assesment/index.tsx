import { useState, useEffect } from 'react';
import { getAssessment, submitAssessment } from '../../services/assesmentApi';
import Toast from '../Toast';
import Navbar from './Navbar'; // Navbar with countdown timer
import { Question } from '../../schema/QuestionSchema';

const Assessment = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [assessmentId, setAssessmentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [toast, setToast] = useState<{ message: string; status: 'success' | 'error' | null }>({
    message: '',
    status: null,
  });

  // Fetch assessment data
  useEffect(() => {
    getAssessment()
      .then((data) => {
        setQuestions(data.questions);
        setAssessmentId(data.id);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching assessment:', error);
        setToast({ message: 'Failed to fetch assessment. Please try again later.', status: 'error' });
      });
  }, []);

  // Countdown Timer
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else {
      handleAutoSubmit(); // Auto-submit when the timer reaches 0
    }
  }, [timeRemaining]);

  // Restrict tab switching
  useEffect(() => {
    const handleTabSwitch = () => handleAutoSubmit(); // Auto-submit on tab switch

    window.addEventListener('blur', handleTabSwitch); // Detect tab switch
    return () => {
      window.removeEventListener('blur', handleTabSwitch); // Cleanup event listener
    };
  }, []);

  // Handle answer selection
  const handleAnswerChange = (questionId: string, selectedOption: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  // Handle manual submission
  const handleSubmit = () => {
    submitAssessment(assessmentId, answers)
      .then(() => {
        setIsSubmitted(true);
        setToast({ message: 'Assessment submitted successfully.', status: 'success' });
      })
      .catch((error) => {
        console.error('Error submitting assessment:', error);
        setToast({ message: 'Failed to submit assessment. Please try again later.', status: 'error' });
      });
  };

  // Auto-submit the assessment on timeout or tab switch
  const handleAutoSubmit = () => {
    if (!isSubmitted) {
      submitAssessment(assessmentId, answers)
        .then(() => {
          setIsSubmitted(true);
          setToast({ message: 'Assessment auto-submitted due to timeout or tab switch.', status: 'success' });
        })
        .catch((error) => {
          console.error('Error submitting assessment:', error);
          setToast({ message: 'Failed to auto-submit the assessment.', status: 'error' });
        });
    }
  };

  const isAssessmentValid = questions.length > 0 && questions.every((q) => answers[q.id]);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar timeRemaining={timeRemaining} />

      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-10 w-full max-w-2xl p-6 brightness-115 backdrop-blur-3xl rounded-lg shadow-lg mx-4">
          {/* Toast Component */}
          {toast.status && (
            <Toast
              message={toast.message}
              status={toast.status}
              onClose={() => setToast({ message: '', status: null })}
            />
          )}

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : isSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-medium mb-6">Thank You!</h2>
              <p className="text-gray-800 mb-6">Your assessment has been submitted successfully.</p>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-medium mb-6">Answer the Questions</h2>
              {/* Questions */}
              {questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <h3 className="text-lg mb-3 font-medium">{question.text}</h3>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {question.options.map((option, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg border">
                        <input
                          type="radio"
                          value={index.toString()}
                          checked={answers[question.id] === index.toString()}
                          onChange={() => handleAnswerChange(question.id, index.toString())}
                          className="form-radio h-5 w-5 text-indigo-600"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!isAssessmentValid}
                className={`w-full py-3 mt-6 rounded-md transition-colors ${
                  isAssessmentValid
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Assessment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;