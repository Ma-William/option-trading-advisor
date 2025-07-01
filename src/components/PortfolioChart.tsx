
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', pnl: 1200 },
  { month: 'Feb', pnl: 2100 },
  { month: 'Mar', pnl: 1800 },
  { month: 'Apr', pnl: 3200 },
  { month: 'May', pnl: 2800 },
  { month: 'Jun', pnl: 4100 },
  { month: 'Jul', pnl: 5200 },
];

export function PortfolioChart() {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={(value) => `$${value}`}
          />
          <Line 
            type="monotone" 
            dataKey="pnl" 
            stroke="#1e40af" 
            strokeWidth={3}
            dot={{ r: 4, fill: '#1e40af' }}
            activeDot={{ r: 6, fill: '#1d4ed8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
