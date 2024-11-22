import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { format, parseISO, startOfMonth, endOfMonth } from 'date-fns';
import { Expense } from '../types/expense';

interface Props {
  expenses: Expense[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

export const ExpenseGraphs: React.FC<Props> = ({ expenses }) => {
  const monthlyData = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);

    const monthlyExpenses = expenses.filter(expense => {
      const date = parseISO(expense.date);
      return date >= monthStart && date <= monthEnd;
    });

    const categoryTotals = monthlyExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + Math.abs(expense.amount);
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([category, total]) => ({
      category,
      total,
    }));
  }, [expenses]);

  const dailyData = useMemo(() => {
    const dailyTotals = expenses.reduce((acc, expense) => {
      const date = format(parseISO(expense.date), 'MMM dd');
      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(dailyTotals)
      .map(([date, total]) => ({
        date,
        total: Math.abs(total),
      }))
      .slice(-7);
  }, [expenses]);

  const formatTooltipValue = (value: number) => `₹${value.toFixed(2)}`;

  return (
    <div className="space-y-8">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Daily Expenses (Last 7 Days)</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(value) => `₹${value}`} />
              <Tooltip formatter={formatTooltipValue} />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" name="Amount (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Category Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={monthlyData}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ category, percent }) => 
                  `${category} ${(percent * 100).toFixed(0)}%`
                }
              >
                {monthlyData.map((entry, index) => (
                  <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};