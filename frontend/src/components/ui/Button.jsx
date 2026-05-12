import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary:   'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white border-white/10 shadow-[0_4px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_8px_30px_rgba(99,102,241,0.5)]',
  secondary: 'bg-white/[0.03] backdrop-blur-xl text-white border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 shadow-xl',
  cyan:      'bg-gradient-to-br from-cyan-400 to-cyan-500 text-slate-900 border-white/10 shadow-[0_4px_20px_rgba(34,211,238,0.3)] hover:shadow-[0_8px_30px_rgba(34,211,238,0.5)]',
  danger:    'bg-gradient-to-br from-rose-500 to-rose-600 text-white border-white/10 shadow-[0_4px_20px_rgba(244,63,94,0.3)] hover:shadow-[0_8px_30px_rgba(244,63,94,0.5)]',
  ghost:     'bg-transparent text-slate-400 border-transparent hover:bg-white/[0.05] hover:text-white',
  success:   'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-white/10 shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.5)]',
  warning:   'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-white/10 shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.5)]',
};

const sizes = {
  xs: 'px-3 py-1.5 text-[10px] uppercase tracking-widest',
  sm: 'px-4 py-2 text-xs font-bold',
  md: 'px-6 py-3 text-sm font-bold',
  lg: 'px-8 py-4 text-base font-bold',
};

const Button = forwardRef(({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false,
  icon, iconRight, className = '', fullWidth = false,
  ...props
}, ref) => {
  const isDisabled = disabled || loading;
  return (
    <motion.button
      ref={ref}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02, y: -1 } : {}}
      whileTap={!isDisabled ? { scale: 0.98, y: 0 } : {}}
      className={[
        'relative inline-flex items-center justify-center gap-2 rounded-xl border',
        'transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:ring-offset-2 focus:ring-offset-bg-base',
        'disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden group',
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {/* Premium Highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      
      {loading && (
        <svg className="animate-spin h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
        </svg>
      )}
      {!loading && icon && <span className="shrink-0 relative z-10 transition-transform group-hover:scale-110 duration-300">{icon}</span>}
      {children && <span className="relative z-10">{children}</span>}
      {!loading && iconRight && <span className="shrink-0 relative z-10 transition-transform group-hover:scale-110 duration-300">{iconRight}</span>}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;