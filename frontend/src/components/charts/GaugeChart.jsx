

const GaugeChart = ({ value, max = 100, title, unit = '%', color = '#6366f1', size = 180 }) => {
  const percentage = (value / max) * 100;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * percentage) / 200;

  return (
    <div className="relative flex flex-col items-center">
      {title && <h3 className="text-xs font-bold mb-6 text-center text-slate-500 uppercase tracking-[0.2em]">{title}</h3>}
      
      <div className="relative" style={{ width: size, height: size / 2 + 20 }}>
        {/* Glow Effect */}
        <div 
          className="absolute inset-0 blur-[30px] opacity-20 pointer-events-none transition-all duration-1000"
          style={{ 
            background: `conic-gradient(from 180deg at 50% 100%, transparent, ${color}, transparent)`,
            transform: `rotate(${(percentage * 1.8) - 90}deg)`
          }}
        />

        <svg viewBox="0 0 200 120" className="w-full h-full relative z-10">
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Progress Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${(circumference * 0.5 * percentage) / 100} ${circumference}`}
            style={{ 
              transition: 'stroke-dasharray 2s cubic-bezier(0.22, 1, 0.36, 1)',
              filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
            }}
          />

          {/* Value display in center */}
          <text x="100" y="90" textAnchor="middle" className="fill-white text-[32px] font-bold tracking-tighter">
            {value}{unit}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default GaugeChart;