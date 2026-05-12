import { motion } from 'framer-motion';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
    xl: 'h-16 w-16 border-4',
  };

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className={`rounded-full border-cyan-500/30 border-t-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)] ${sizes[size]}`}
      />
    </div>
  );
};

export default Spinner;