
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className, glow = false, delay = 0, hoverable = true, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={hoverable ? { y: -5, scale: 1.01 } : undefined}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "glass-card rounded-[2rem] p-8 relative overflow-hidden transition-all duration-500",
        glow && "hover:shadow-[0_20px_60px_rgba(99,102,241,0.15)] border-indigo-500/10 hover:border-indigo-500/30",
        className
      )}
      {...props}
    >
      {/* Premium Highlight Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none" />
      
      {/* Animated Glow Effect (Subtle) */}
      {glow && (
        <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent,rgba(99,102,241,0.05),transparent)] animate-[spin_10s_linear_infinite] pointer-events-none" />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/5 blur-[50px] pointer-events-none" />
    </motion.div>
  );
}
