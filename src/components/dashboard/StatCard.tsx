import { Card } from '../ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <Card className={`p-6 relative overflow-hidden ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <div className="flex items-center space-x-3">
            <h3 className="text-2xl font-bold">{value}</h3>
            {trend && (
              <span className={`flex items-center text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {trend.isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                {trend.value}%
              </span>
            )}
          </div>
        </div>
        <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-800">{icon}</div>
      </div>
    </Card>
  );
}