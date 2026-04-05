export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          date: string;
          amount: number;
          category: string;
          type: 'Income' | 'Expense';
          description: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date?: string;
          amount: number;
          category: string;
          type: 'Income' | 'Expense';
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          amount?: number;
          category?: string;
          type?: 'Income' | 'Expense';
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
export type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];
