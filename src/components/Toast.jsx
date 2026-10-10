import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Toast = () => {
  const { toasts, dismissToast } = useShop();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => {
          const isError = toast.type === 'error';
          const isInfo = toast.type === 'info';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md ${
                isError
                  ? 'bg-rose-950/90 text-rose-100 border-rose-800'
                  : isInfo
                  ? 'bg-slate-900/90 text-slate-100 border-slate-800'
                  : 'bg-emerald-950/90 text-emerald-100 border-emerald-800'
              }`}
            >
              <div className="flex items-center gap-3">
                {isError ? (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                ) : isInfo ? (
                  <Info className="w-5 h-5 text-sky-400 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                <p className="text-sm font-medium">{toast.message}</p>
              </div>

              <button
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Close notification"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
