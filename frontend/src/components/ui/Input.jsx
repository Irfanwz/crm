import { forwardRef } from 'react';
import { motion } from 'framer-motion';

export const Input = forwardRef(({
  label, error, hint, prefix, suffix,
  className = '', containerClass = '',
  required = false, ...props
}, ref) => {
  const id = props.id || props.name || Math.random().toString(36).slice(2);
  return (
    <div className={`flex flex-col gap-2 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center group">
        {prefix && (
          <span className="absolute left-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300 z-10">{prefix}</span>
        )}
        <input
          ref={ref}
          id={id}
          className={[
            'w-full rounded-xl border text-sm text-white placeholder-slate-600',
            'bg-white/[0.02] backdrop-blur-xl',
            'focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            'transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
            error ? 'border-rose-500/40 focus:ring-rose-500/10' : 'border-white/[0.05] group-hover:border-white/10',
            prefix ? 'pl-12' : 'pl-4',
            suffix ? 'pr-12' : 'pr-4',
            'py-3.5',
            className,
          ].join(' ')}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-300 z-10">{suffix}</span>
        )}
      </div>
      {error && <motion.p initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-1">{error}</motion.p>}
      {hint && !error && <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-1">{hint}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export const Select = forwardRef(({
  label, error, hint, className = '', containerClass = '',
  required = false, children, ...props
}, ref) => {
  const id = props.id || props.name || Math.random().toString(36).slice(2);
  return (
    <div className={`flex flex-col gap-2 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative group">
        <select
          ref={ref}
          id={id}
          className={[
            'w-full rounded-xl border text-sm text-white appearance-none cursor-pointer',
            'bg-white/[0.02] backdrop-blur-xl',
            'focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30',
            'disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
            error ? 'border-rose-500/40 focus:ring-rose-500/10' : 'border-white/[0.05] hover:border-white/10',
            'py-3.5 pl-4 pr-10',
            className,
          ].join(' ')}
          {...props}
        >
          {children}
        </select>
      </div>
      {error && <motion.p initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-1">{error}</motion.p>}
      {hint && !error && <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-1">{hint}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export const Textarea = forwardRef(({
  label, error, hint, className = '', containerClass = '',
  required = false, rows = 4, ...props
}, ref) => {
  const id = props.id || props.name || Math.random().toString(36).slice(2);
  return (
    <div className={`flex flex-col gap-2 ${containerClass}`}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={[
          'w-full rounded-xl border text-sm text-white placeholder-slate-600 resize-none',
          'bg-white/[0.02] backdrop-blur-xl',
          'focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          'transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
          error ? 'border-rose-500/40 focus:ring-rose-500/10' : 'border-white/[0.05] hover:border-white/10',
          'py-3.5 px-4',
          className,
        ].join(' ')}
        {...props}
      />
      {error && <motion.p initial={{opacity:0, y:-5}} animate={{opacity:1, y:0}} className="text-[10px] font-bold text-rose-500 uppercase tracking-wider ml-1">{error}</motion.p>}
      {hint && !error && <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-1">{hint}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Input;