// Pure CSS/SVG Funnel Chart - zero extra dependencies

const defaultData = [
  { id: 'leads', value: 500, label: 'Leads' },
  { id: 'qualified', value: 320, label: 'Qualified' },
  { id: 'proposal', value: 180, label: 'Proposal' },
  { id: 'negotiation', value: 90, label: 'Negotiation' },
  { id: 'won', value: 42, label: 'Closed Won' },
]

const COLORS = ['#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#10b981']

export default function FunnelChart({ data = defaultData, height = 300 }) {
  const max = data[0]?.value || 1

  return (
    <div style={{ height }} className="flex flex-col justify-between py-2">
      {data.map((item, i) => {
        const pct = (item.value / max) * 100
        const width = 40 + pct * 0.6 // min 40%, max 100%
        return (
          <div key={item.id} className="flex items-center gap-4 group">
            {/* Bar */}
            <div className="flex-1 flex justify-center">
              <div 
                style={{ width: `${width}%`, background: COLORS[i] }}
                className="h-10 rounded-xl flex items-center justify-center transition-all duration-500 relative overflow-hidden group-hover:scale-[1.02] shadow-lg group-hover:shadow-indigo-500/20"
              >
                {/* Glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50" />
                <span className="text-white text-[10px] font-black uppercase tracking-widest relative z-10 drop-shadow-md">
                  {item.label}
                </span>
              </div>
            </div>
            {/* Value */}
            <div className="w-12 text-right">
              <p className="text-white font-bold text-sm">{item.value}</p>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-tighter">{Math.round(pct)}%</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}