
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', roi: 8.2 },
  { month: 'Feb', roi: 10.5 },
  { month: 'Mar', roi: 9.1 },
  { month: 'Apr', roi: 14.8 },
  { month: 'May', roi: 11.9 },
  { month: 'Jun', roi: 15.3 },
  { month: 'Jul', roi: 12.4 },
];

export function PortfolioChart() {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            tickFormatter={(value) => `${value}%`}
          />
          <Line 
            type="monotone" 
            dataKey="roi" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6' }}
            activeDot={{ r: 6, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
