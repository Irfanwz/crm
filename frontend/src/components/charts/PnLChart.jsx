// Uses only 'recharts' - already in your project

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const defaultData = [
  { month: 'Jan', revenue: 420000, expenses: 310000, profit: 110000 },
  { month: 'Feb', revenue: 380000, expenses: 295000, profit: 85000 },
  { month: 'Mar', revenue: 510000, expenses: 340000, profit: 170000 },
  { month: 'Apr', revenue: 470000, expenses: 320000, profit: 150000 },
  { month: 'May', revenue: 530000, expenses: 360000, profit: 170000 },
  { month: 'Jun', revenue: 620000, expenses: 390000, profit: 230000 },
  { month: 'Jul', revenue: 580000, expenses: 370000, profit: 210000 },
  { month: 'Aug', revenue: 670000, expenses: 410000, profit: 260000 },
  { month: 'Sep', revenue: 590000, expenses: 380000, profit: 210000 },
  { month: 'Oct', revenue: 710000, expenses: 430000, profit: 280000 },
  { month: 'Nov', revenue: 760000, expenses: 460000, profit: 300000 },
  { month: 'Dec', revenue: 820000, expenses: 490000, profit: 330000 },
]

const fmt = (v) => `$${(v / 1000).toFixed(0)}k`

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-5 rounded-[1.5rem] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{label} Projection</p>
        <div className="space-y-3">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-white text-xs font-bold">{entry.name}</span>
              </div>
              <span className="text-white font-black text-xs">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-indigo-400 text-[10px] font-black uppercase">Net Margin</span>
          <span className="text-emerald-400 text-xs font-black">
            +{((payload[2]?.value / payload[0]?.value) * 100).toFixed(1)}%
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function PnLChart({ data = defaultData, height = 300 }) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
            <stop offset="50%" stopColor="#6366f1" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gExpenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.3} />
            <stop offset="50%" stopColor="#f43f5e" stopOpacity={0.05} />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.5} />
            <stop offset="50%" stopColor="#10b981" stopOpacity={0.1} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
          <filter id="shadow" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
            <feMerge>
              <feMergeNode in="offsetBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.02)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }}
          axisLine={false}
          tickLine={false}
          dy={15}
        />
        <YAxis
          tickFormatter={fmt}
          tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 2 }} />
        <Legend 
          verticalAlign="top" 
          align="right" 
          iconType="rect"
          iconSize={10}
          wrapperStyle={{ paddingBottom: '40px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }} 
        />
        <Area 
          type="monotone" 
          dataKey="revenue" 
          name="Revenue"
          stroke="#6366f1" 
          fill="url(#gRevenue)" 
          strokeWidth={4} 
          filter="url(#shadow)"
          dot={false}
          activeDot={{ r: 6, fill: '#6366f1', strokeWidth: 4, stroke: '#050505' }} 
        />
        <Area 
          type="monotone" 
          dataKey="expenses" 
          name="Expenses"
          stroke="#f43f5e" 
          fill="url(#gExpenses)" 
          strokeWidth={4} 
          filter="url(#shadow)"
          dot={false}
          activeDot={{ r: 6, fill: '#f43f5e', strokeWidth: 4, stroke: '#050505' }} 
        />
        <Area 
          type="monotone" 
          dataKey="profit" 
          name="Profit"
          stroke="#10b981" 
          fill="url(#gProfit)" 
          strokeWidth={4} 
          filter="url(#shadow)"
          dot={false}
          activeDot={{ r: 8, fill: '#10b981', strokeWidth: 4, stroke: '#050505' }} 
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}