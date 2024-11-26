import { Card } from '../ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const chartData = [
  { name: 'Jan', participants: 400 },
  { name: 'Feb', participants: 600 },
  { name: 'Mar', participants: 800 },
  { name: 'Apr', participants: 1000 },
  { name: 'May', participants: 1200 },
  { name: 'Jun', participants: 1500 },
];

export function ParticipantChart() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Participant Growth</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="participants"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}