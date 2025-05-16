import React, { useState } from "react";
import AuthBackground from "../components/AuthBackground";
import AuthButton from "../components/AuthButton";
import { Input } from "../components/Input"; // Updated Input component
import axiosInstance from "../services/api";
import Toast from "../components/Toast"; // Import Toast component

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Manage errors for input fields
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false); // Tracks form submission state
  const [toast, setToast] = useState<{ message: string; status: 'success' | 'error' | null }>({
    message: '',
    status: null,
  }); // Tracks toast messages and status

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: undefined }); // Clear individual field error as user updates it
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous errors and mark form as submitted
    setErrors({});
    setFormSubmitted(true);

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      const { accessToken } = response.data;

      // Store JWT token in localStorage
      localStorage.setItem("accessToken", accessToken);

      // Show success toast
      setToast({ message: "Logged in successfully.", status: "success" });

      console.log("Login successful:", response.data);

      // Redirect to /survey after toast
      setTimeout(() => {
        window.location.href = "/survey";
      }, 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Login failed:", error);

      // Backend-specific error handling
      if (error.response?.data?.message) {
        let errorMessage = "";
        switch (error.response.data.message) {
          case "User not found":
            errorMessage = "User does not exist."; // Display error for the email field
            setErrors({
              email: "User does not exist.",
              password: "",
            });
            break;
          case "Unauthorized request. Please verify credentials and try again.":
            errorMessage = "Invalid credentials.";
            setErrors({
              email: "Invalid credentials.",
              password: "Invalid credentials.",
            });
            break;
          default:
            errorMessage = "Unexpected error. Please try again.";
            setErrors({
              email: "Unexpected error. Please try again.",
              password: "Unexpected error. Please try again.",
            });
        }

        // Show error toast
        setToast({ message: errorMessage, status: "error" });
      } else {
        setErrors({
          email: "An unexpected error occurred.",
          password: "An unexpected error occurred.",
        });

        // Show general error toast
        setToast({ message: "An unexpected error occurred. Please try again.", status: "error" });
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - colorful background */}
      <div className="hidden md:block md:w-1/2">
        <AuthBackground />
      </div>

      {/* Right side - Login form and Toast */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Toast Component */}
          {toast.status && (
            <Toast
              message={toast.message}
              status={toast.status}
              onClose={() => setToast({ message: '', status: null })}
            />
          )}

          <div className="flex justify-end mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>

          <h1 className="text-3xl font-bold mb-4">Log in</h1>

          <form onSubmit={handleSubmit}>
            {/* Email field */}
            <Input
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              helperText="Use your registered email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={formSubmitted && !!errors.email} // Highlight error if present
              errorText={errors.email}
              required
            />

            {/* Password field */}
            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              helperText="Your secret password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={formSubmitted && !!errors.password} // Highlight error if present
              errorText={errors.password}
              showPasswordToggle={true} // Password visibility toggle
              required
            />

            <p className="mb-8">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline">
                Create an account
              </a>
            </p>

            <div className="mt-10">
              <AuthButton type="submit">Log in</AuthButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;