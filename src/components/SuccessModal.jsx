import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

// Success Modal Component
const SuccessModal = ({ isOpen, onClose, userName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-slate-900/95 backdrop-blur-xl rounded-2xl p-8 max-w-md w-full border border-white/10 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center space-y-3"
          >
            <h3 className="text-2xl font-bold text-white">
              🎉 Congratulations{userName ? `, ${userName}` : ''}!
            </h3>
            <p className="text-gray-300 leading-relaxed">
              You've secured <span className="text-cyan-400 font-semibold">1 month of free trial</span>. 
              We'll notify you as soon as the app is live.
            </p>
            <p className="text-sm text-gray-400">
              Check your email for confirmation details.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
          >
            <span>Got it!</span>
            <Sparkles className="w-4 h-4 animate-pulse" />
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SuccessModal;