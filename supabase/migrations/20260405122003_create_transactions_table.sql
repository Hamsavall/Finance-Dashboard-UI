/*
  # Create Transactions Table for Financial Dashboard

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key) - Unique identifier for each transaction
      - `date` (date) - Transaction date
      - `amount` (numeric) - Transaction amount
      - `category` (text) - Category of transaction (e.g., Food, Salary, Transport)
      - `type` (text) - Type of transaction (Income or Expense)
      - `description` (text) - Optional description of the transaction
      - `created_at` (timestamptz) - Timestamp when record was created
      - `updated_at` (timestamptz) - Timestamp when record was last updated

  2. Security
    - Enable RLS on `transactions` table
    - Add policies for public access (since this is a demo app without auth)
    
  3. Sample Data
    - Insert sample transactions for demonstration purposes
*/

CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL DEFAULT CURRENT_DATE,
  amount numeric(10, 2) NOT NULL,
  category text NOT NULL,
  type text NOT NULL CHECK (type IN ('Income', 'Expense')),
  description text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
  ON transactions
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access"
  ON transactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access"
  ON transactions
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access"
  ON transactions
  FOR DELETE
  TO anon
  USING (true);

INSERT INTO transactions (date, amount, category, type, description) VALUES
  ('2026-01-15', 5000.00, 'Salary', 'Income', 'Monthly salary payment'),
  ('2026-01-16', 850.00, 'Rent', 'Expense', 'Monthly rent payment'),
  ('2026-01-17', 120.50, 'Groceries', 'Expense', 'Weekly grocery shopping'),
  ('2026-01-18', 45.00, 'Transportation', 'Expense', 'Metro card recharge'),
  ('2026-01-20', 200.00, 'Entertainment', 'Expense', 'Concert tickets'),
  ('2026-01-22', 1500.00, 'Freelance', 'Income', 'Web design project'),
  ('2026-01-25', 85.00, 'Dining', 'Expense', 'Restaurant dinner'),
  ('2026-01-28', 300.00, 'Shopping', 'Expense', 'Clothing'),
  ('2026-02-01', 5000.00, 'Salary', 'Income', 'Monthly salary payment'),
  ('2026-02-02', 850.00, 'Rent', 'Expense', 'Monthly rent payment'),
  ('2026-02-05', 150.00, 'Groceries', 'Expense', 'Weekly grocery shopping'),
  ('2026-02-08', 60.00, 'Utilities', 'Expense', 'Electricity bill'),
  ('2026-02-10', 500.00, 'Freelance', 'Income', 'Logo design'),
  ('2026-02-12', 95.00, 'Dining', 'Expense', 'Lunch with friends'),
  ('2026-02-15', 200.00, 'Healthcare', 'Expense', 'Doctor visit'),
  ('2026-02-18', 40.00, 'Transportation', 'Expense', 'Taxi rides'),
  ('2026-02-20', 180.00, 'Entertainment', 'Expense', 'Movie and snacks'),
  ('2026-03-01', 5000.00, 'Salary', 'Income', 'Monthly salary payment'),
  ('2026-03-03', 850.00, 'Rent', 'Expense', 'Monthly rent payment'),
  ('2026-03-05', 130.00, 'Groceries', 'Expense', 'Weekly grocery shopping'),
  ('2026-03-08', 250.00, 'Shopping', 'Expense', 'Electronics accessories'),
  ('2026-03-10', 1000.00, 'Freelance', 'Income', 'Consulting work'),
  ('2026-03-12', 70.00, 'Dining', 'Expense', 'Restaurant'),
  ('2026-03-15', 45.00, 'Transportation', 'Expense', 'Gas'),
  ('2026-03-18', 400.00, 'Education', 'Expense', 'Online course'),
  ('2026-03-22', 110.00, 'Entertainment', 'Expense', 'Gaming subscription'),
  ('2026-03-25', 80.00, 'Utilities', 'Expense', 'Internet bill'),
  ('2026-04-01', 5000.00, 'Salary', 'Income', 'Monthly salary payment'),
  ('2026-04-02', 850.00, 'Rent', 'Expense', 'Monthly rent payment'),
  ('2026-04-04', 140.00, 'Groceries', 'Expense', 'Weekly grocery shopping');

CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);