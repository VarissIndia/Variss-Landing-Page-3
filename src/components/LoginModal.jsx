// LoginModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Mail, Shield, Sparkles, CheckCircle } from "lucide-react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import { sendWelcomeEmail } from "../utils/emailService";

const LoginModal = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState(null);

  // Save user to database
  const saveUserToDatabase = async (userData) => {
    try {
      // Option 1: Your API endpoint
      // await axios.post('/api/trial-signup', userData);

      // Option 2: Firebase Firestore
      // await db.collection('trial-users').add(userData);

      // For demo - save to sessionStorage
      sessionStorage.setItem("trialUser", JSON.stringify(userData));
      console.log("User saved:", userData);
    } catch (error) {
      console.error("Error saving user:", error);
      throw error;
    }
  };

  // Google OAuth login handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError(null);
      try {
        // Get user info from Google
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        // Structure user data
        const userData = {
          name: userInfo.data.name,
          email: userInfo.data.email,
          picture: userInfo.data.picture,
          timestamp: new Date().toISOString(),
          trialStartDate: new Date().toISOString(),
          trialEndDate: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
          ).toISOString(),
        };

        // Save to database
        await saveUserToDatabase(userData);

        // Send welcome email
        await sendWelcomeEmail(userData);

        // Update state
        setUserData(userData);
        
        // Close login modal and show success modal
        onClose();
        setShowSuccessModal(true);
      } catch (error) {
        console.error("Error during Google login:", error);
        setError("Failed to complete login. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      setError("Login failed. Please try again.");
      setIsLoading(false);
    },
  });

  // Reset error when modal closes
  const handleClose = () => {
    setError(null);
    onClose();
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                {/* Animated background effects */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1.2, 1, 1.2],
                      rotate: [90, 0, 90],
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"
                  />
                </div>

                {/* Close button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </motion.button>

                {/* Content */}
                <div className="relative p-8">
                  {/* Header */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-8"
                  >
                    {/* Logo/Icon */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/50"
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>

                    <h2 className="text-3xl font-bold text-white mb-2">
                      Welcome to Variss
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Start your free 30-day trial today
                    </p>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-3 mb-6"
                  >
                    {[
                      {
                        icon: CheckCircle,
                        text: "No credit card required",
                      },
                      {
                        icon: Shield,
                        text: "Secure authentication via Google",
                      },
                      {
                        icon: Mail,
                        text: "Instant access & welcome email",
                      },
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <feature.icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-sm">{feature.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Error message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg"
                    >
                      <p className="text-red-400 text-sm text-center">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  {/* Google Login Button */}
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full relative overflow-hidden group"
                  >
                    {/* Button background with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl" />
                    
                    {/* Hover effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    />

                    {/* Button content */}
                    <div className="relative flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Connecting to Google...</span>
                        </>
                      ) : (
                        <>
                          {/* Google Icon */}
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          <span>Continue with Google</span>
                        </>
                      )}
                    </div>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                  </motion.button>

                  {/* Footer text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs text-gray-500 mt-6"
                  >
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                      Privacy Policy
                    </a>
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        userName={userData?.name}
      />
    </>
  );
};

export default LoginModal;