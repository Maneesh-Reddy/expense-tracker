import React, { useState, useEffect } from "react";
import { Plus, Filter } from "lucide-react";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { ExpenseGraphs } from "./ExpenseGraphs";
import { Expense } from "../types/expense";
import axios from "axios";

export const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [filter, setFilter] = useState({ category: "", dateRange: "all" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/expenses");
        const sampleExpenses = response.data.slice(0, 10).map((post: any) => ({
          id: `expense-${post.id}-${Date.now()}`,
          description: post.title.slice(0, 30),
          amount: -(Math.random() * 10000).toFixed(2), // Increased amount for Rupees
          category: [
            "Food",
            "Transportation",
            "Entertainment",
            "Shopping",
            "Bills",
          ][Math.floor(Math.random() * 5)],
          date: new Date(
            Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
          )
            .toISOString()
            .split("T")[0],
        }));

        const savedExpenses = localStorage.getItem("expenses");
        const existingExpenses = savedExpenses ? JSON.parse(savedExpenses) : [];

        const uniqueExistingExpenses = existingExpenses.map(
          (expense: Expense) => ({
            ...expense,
            id: expense.id.includes("expense-")
              ? expense.id
              : `expense-${expense.id}-${Date.now()}`,
          })
        );

        setExpenses([...uniqueExistingExpenses, ...sampleExpenses]);
      } catch (error) {
        console.error("Error fetching sample data:", error);
        const savedExpenses = localStorage.getItem("expenses");
        if (savedExpenses) {
          const existingExpenses = JSON.parse(savedExpenses);
          const uniqueExistingExpenses = existingExpenses.map(
            (expense: Expense) => ({
              ...expense,
              id: expense.id.includes("expense-")
                ? expense.id
                : `expense-${expense.id}-${Date.now()}`,
            })
          );
          setExpenses(uniqueExistingExpenses);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense: Expense) => {
    const newExpense = {
      ...expense,
      id: expense.id.includes("expense-")
        ? expense.id
        : `expense-${expense.id}-${Date.now()}`,
    };

    if (editingExpense) {
      setExpenses(expenses.map((e) => (e.id === expense.id ? newExpense : e)));
    } else {
      setExpenses([newExpense, ...expenses]);
    }
    setEditingExpense(null);
  };

  const handleDelete = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const handleEdit = async (expense: Expense) => {
    setEditingExpense(expense);
    // if(id === seletcedID)
    // setExpenses(expense)
    setShowAddModal(true);
    // VERY IMPORTANT NOTE
    // try{
    //   const response = await axios.put(`http://localhost:3000/expenses/${expense.id}`, expense);
    //   // if(response.status === 200){
    //   //   setExpenses(expenses.map((e) => (e.id === expense.id? expense : e)));
    //   //

    //   } catch(error:void){
    //     console.error("Error updating expense:", error.data);
    //   }
    // }
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filter.category && expense.category !== filter.category) return false;

    if (filter.dateRange === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(expense.date) >= weekAgo;
    }
    if (filter.dateRange === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return new Date(expense.date) >= monthAgo;
    }
    return true;
  });

  const totalExpenses = filteredExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-lg text-gray-600">
            Total:{" "}
            <span
              className={totalExpenses < 0 ? "text-red-600" : "text-green-600"}
            >
              ₹{Math.abs(totalExpenses).toFixed(2)}
            </span>
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="mb-6 flex gap-4">
            <div className="flex-1">
              <select
                value={filter.category}
                onChange={(e) =>
                  setFilter({ ...filter, category: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="">All Categories</option>
                <option value="Food">Food</option>
                <option value="Transportation">Transportation</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={filter.dateRange}
                onChange={(e) =>
                  setFilter({ ...filter, dateRange: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All Time</option>
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
              </select>
            </div>
          </div>

          <TransactionList
            expenses={filteredExpenses}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>

        <div>
          <ExpenseGraphs expenses={expenses} />
        </div>
      </div>

      {showAddModal && (
        <AddTransaction
          onSubmit={handleAddExpense}
          onClose={() => {
            setShowAddModal(false);
            setEditingExpense(null);
          }}
          editingExpense={editingExpense}
        />
      )}
    </div>
  );
};
