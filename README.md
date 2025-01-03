# Expense Tracker

A modern expense tracking application built with React.js and TypeScript, featuring a beautiful UI and complete CRUD functionality.

![Expense Tracker Screenshot](https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200)

## Features

- 🔐 **User Authentication**

  - Login system with demo credential
  - Protected route
  - Session management

- 💰 **Expense Management (CRUD)**

  - Create new expenses
  - Read and view all expenses
  - Update existing expenses
  - Delete unwanted expenses

- 🎨 **Modern UI/UX**

  - Clean, minimalist design
  - Responsive layout
  - Interactive components
  - Beautiful transitions
  - Form validation

- 📊 **Advanced Features**
  - Category-based filtering
  - Date range filtering
  - Total expense calculation
  - Real-time updates

## Tech Stack

- React.js
- TypeScript
- Tailwind CSS
- React Router
- Lucide Icons
- Local Storage for data persistence

## Project Structure

```
src/
├── components/
│   ├── AddTransaction.tsx    # Form for adding/editing expenses
│   ├── ExpenseTracker.tsx    # Main expense management component
│   ├── Login.tsx            # Authentication component
│   ├── TransactionItem.tsx  # Individual expense item component
│   └── TransactionList.tsx  # List of all expenses
├── types/
│   └── expense.ts           # TypeScript interfaces
├── App.tsx                  # Main application component
├── index.css               # Global styles
└── main.tsx               # Application entry point
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Login**

   - Use demo credentials:
     - Email: demo@example.com
     - Password: password

2. **Managing Expenses**

   - Click "Add Transaction" to create new expenses
   - View all expenses in the main dashboard
   - Use filters to sort by category or date range
   - Click edit/delete icons on each expense for modifications

3. **Filtering**
   - Use the category dropdown to filter by expense type
   - Use the date range dropdown to filter by time period

## CRUD Operations

### Create

- Click "Add Transaction" button
- Fill in expense details
- Submit the form

### Read

- View all expenses in the main dashboard
- Use filters to sort and find specific expenses
- See total expenses calculation

### Update

- Click the edit (pencil) icon on any expense
- Modify details in the form
- Save changes

### Delete

- Click the delete (trash) icon on any expense
- Confirm deletion

## Component Details

### `Login.tsx`

- Handles user authentication
- Manages login form state
- Redirects to main dashboard

### `ExpenseTracker.tsx`

- Main dashboard component
- Manages expense state
- Handles filtering logic
- Displays total expenses

### `AddTransaction.tsx`

- Reusable form component
- Handles both adding and editing
- Form validation
- Dynamic state management

### `TransactionList.tsx`

- Displays all expenses
- Handles empty states
- Maps through expense data

### `TransactionItem.tsx`

- Individual expense display
- Edit/Delete functionality
- Beautiful UI formatting

## Data Management

- Uses localStorage for data persistence
- Implements TypeScript interfaces for type safety
- Real-time updates with React state management
- Efficient filtering algorithms

## Styling

- Utilizes Tailwind CSS for responsive design
- Custom animations and transitions
- Consistent color scheme
- Mobile-first approach

## Future Enhancements

1. Backend Integration

   - Replace localStorage with API calls
   - Implement real authentication

2. Additional Features

   - Export expenses to CSV
   - Monthly/yearly reports
   - Budget tracking
   - Charts and analytics

3. UI Improvements
   - Dark mode
   - Custom themes
   - More animation effects
   - Advanced filtering options#
