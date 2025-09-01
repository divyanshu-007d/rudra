// 🔔 Toast Notification Component
// Displays temporary success/error messages with smooth animations

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info, AlertTriangle } from 'lucide-react';

// 🎯 Toast types with corresponding styles and icons
const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800',
    iconColor: 'text-green-600',
    barColor: 'bg-green-500'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-800',
    iconColor: 'text-red-600',
    barColor: 'bg-red-500'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    iconColor: 'text-yellow-600',
    barColor: 'bg-yellow-500'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    iconColor: 'text-blue-600',
    barColor: 'bg-blue-500'
  }
};

// 🎬 Animation variants for smooth entrance/exit
const toastVariants = {
  initial: { 
    opacity: 0, 
    x: 300, 
    scale: 0.8 
  },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    x: 300, 
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
};

// 📱 Individual Toast Item Component
const ToastItem = ({ toast, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(toast.duration || 5000);
  const toastType = TOAST_TYPES[toast.type] || TOAST_TYPES.info;
  const Icon = toastType.icon;

  // ⏰ Auto-dismiss timer
  useEffect(() => {
    if (toast.duration !== 0) { // 0 means persistent toast
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 100) {
            onClose(toast.id);
            return 0;
          }
          return prev - 100;
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [toast.id, toast.duration, onClose]);

  // 📊 Calculate progress percentage
  const progressPercent = toast.duration ? (timeLeft / toast.duration) * 100 : 0;

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        relative overflow-hidden rounded-lg shadow-lg border max-w-sm w-full
        ${toastType.bgColor} ${toastType.borderColor}
      `}
    >
      {/* 📊 Progress bar */}
      {toast.duration !== 0 && (
        <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full">
          <motion.div
            className={`h-full ${toastType.barColor}`}
            initial={{ width: '100%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* 🎨 Icon */}
          <Icon className={`w-6 h-6 ${toastType.iconColor} flex-shrink-0 mt-0.5`} />
          
          {/* 📝 Content */}
          <div className="flex-1 min-w-0">
            {toast.title && (
              <h4 className={`text-sm font-semibold ${toastType.textColor} mb-1`}>
                {toast.title}
              </h4>
            )}
            <p className={`text-sm ${toastType.textColor} opacity-90`}>
              {toast.message}
            </p>
          </div>

          {/* ❌ Close button */}
          <button
            onClick={() => onClose(toast.id)}
            className={`
              flex-shrink-0 p-1 rounded-full hover:bg-black hover:bg-opacity-10 
              transition-colors ${toastType.textColor}
            `}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 🎯 Action button (optional) */}
        {toast.action && (
          <div className="mt-3 flex">
            <button
              onClick={toast.action.onClick}
              className={`
                text-sm font-medium px-3 py-1 rounded-md transition-colors
                ${toastType.textColor} hover:bg-black hover:bg-opacity-10
              `}
            >
              {toast.action.label}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// 🎪 Main Toast Container Component
const Toast = () => {
  const [toasts, setToasts] = useState([]);

  // 🎨 Add new toast
  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast
    };
    
    setToasts(prev => [...prev, newToast]);
    return id;
  };

  // 🗑️ Remove toast by ID
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // 🧹 Clear all toasts
  const clearAllToasts = () => {
    setToasts([]);
  };

  // 🎯 Expose toast methods globally
  React.useEffect(() => {
    // Global toast methods for easy access from anywhere in the app
    window.toast = {
      success: (message, options = {}) => addToast({ 
        ...options, 
        message, 
        type: 'success' 
      }),
      error: (message, options = {}) => addToast({ 
        ...options, 
        message, 
        type: 'error' 
      }),
      warning: (message, options = {}) => addToast({ 
        ...options, 
        message, 
        type: 'warning' 
      }),
      info: (message, options = {}) => addToast({ 
        ...options, 
        message, 
        type: 'info' 
      }),
      custom: (options) => addToast(options),
      clear: clearAllToasts
    };

    // Cleanup on unmount
    return () => {
      delete window.toast;
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={removeToast}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
