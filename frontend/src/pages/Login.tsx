import React, { useState } from "react";
import AuthBackground from "../components/AuthBackground";
import AuthButton from "../components/AuthButton";
import { Input } from "../components/Input";
import axiosInstance from "../services/api";
import Toast from "../components/Toast";
import Popup from "../components/Popup"; // Import Popup Component

const Login: React.FC = () => {
  // localStorage.clear();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Manage errors for input fields
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; status: "success" | "error" | null }>({
    message: "",
    status: null,
  });

  // Added popup state to trigger visibility
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: undefined }); // Clear individual field error as user updates it
  };

  const handleSubmit = async (e: React.FormEvent) => {
    localStorage.clear();

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

      // Show popup instead of immediate redirection
      setIsPopupVisible(true);
    } catch (error: any) {
      console.error("Login failed:", error);

      // Backend-specific error handling
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      setErrors({
        email: errorMessage,
        password: errorMessage,
      });

      setToast({ message: errorMessage, status: "error" });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side remains unchanged */}
      <div className="hidden md:block md:w-1/2">
        <AuthBackground />
      </div>

      {/* Right side remains unchanged */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Toast Component */}
          {toast.status && (
            <Toast
              message={toast.message}
              status={toast.status}
              onClose={() => setToast({ message: "", status: null })}
            />
          )}

          {/* Logo -- Keeps the existing design */}
          <div className="flex justify-end mb-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>

          {/* Title and Form */}
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

      {/* Popup Component shown after successful login */}
      {isPopupVisible && <Popup onClose={() => setIsPopupVisible(false)} />}
    </div>
  );
};

export default Login;