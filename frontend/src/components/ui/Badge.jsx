const variants = {
  blue:    'bg-blue-100 text-blue-700',
  green:   'bg-green-100 text-green-700',
  red:     'bg-red-100 text-red-700',
  amber:   'bg-amber-100 text-amber-700',
  gray:    'bg-gray-100 text-gray-600',
  purple:  'bg-purple-100 text-purple-700',
  pink:    'bg-pink-100 text-pink-700',
  teal:    'bg-teal-100 text-teal-700',
  orange:  'bg-orange-100 text-orange-700',
};

// Map common status strings to colors
const statusMap = {
  active: 'green', open: 'green', approved: 'green', won: 'green',
  completed: 'teal', done: 'teal', paid: 'teal', hired: 'teal',
  pending: 'amber', in_progress: 'blue', submitted: 'blue', sent: 'blue',
  draft: 'gray', on_hold: 'gray',
  rejected: 'red', lost: 'red', overdue: 'red', cancelled: 'red',
  lead: 'purple', qualified: 'blue', proposal: 'amber', negotiation: 'orange',
};

export default function Badge({
  children, color, status, dot = false, size = 'sm', className = ''
}) {
  const resolvedColor = color || (status && statusMap[status?.toLowerCase()]) || 'gray';
  const colorClass = variants[resolvedColor] || variants.gray;
  const sizeClass = size === 'xs' ? 'text-xs px-1.5 py-0.5' : 'text-xs px-2 py-1';

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full ${sizeClass} ${colorClass} ${className}`}>
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
      )}
      {children || (status ? status.replace(/_/g, ' ') : '')}
    </span>
  );
}