import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Expense } from '../types/expense';

interface Props {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export const TransactionItem: React.FC<Props> = ({ expense, onDelete, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{expense.description}</h3>
        <div className="flex gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
            {expense.category}
          </span>
          <span>{format(new Date(expense.date), 'MMM d, yyyy')}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`text-lg font-bold ${expense.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
          ₹{Math.abs(expense.amount).toFixed(2)}
        </span>
        <button
          onClick={() => onEdit(expense)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};