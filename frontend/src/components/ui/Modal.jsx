import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Button from './Button';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl',
};

export default function Modal({
  open = false, onClose, title, children, footer,
  size = 'md', closeOnOverlay = true, showClose = true,
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => { if (closeOnOverlay && e.target === overlayRef.current) onClose?.(); }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className={`w-full ${sizes[size]} glass-card rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.6)] flex flex-col max-h-[90vh] border border-white/[0.08] overflow-hidden`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-10 py-8 border-b border-white/[0.05] shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            <div className="h-1 w-12 bg-indigo-500 rounded-full mt-2 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </div>
          {showClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-10 py-8 scrollbar-hide">
          {children}
        </div>
        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-4 px-10 py-8 border-t border-white/[0.05] bg-white/[0.01] shrink-0">
            {footer}
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
}

// Convenience: ConfirmModal
export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmText = 'Confirm', loading }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="danger" onClick={onConfirm} loading={loading}>{confirmText}</Button>
        </>
      }
    >
      <div className="flex flex-col items-center text-center gap-6 py-4">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <svg className="w-10 h-10 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
          </svg>
        </div>
        <p className="text-slate-400 font-medium leading-relaxed">{message}</p>
      </div>
    </Modal>
  );
}