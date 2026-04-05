# Financial Activity Dashboard

A modern, responsive web application for tracking and visualizing personal financial activities. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Core Features

#### 1. Dashboard Overview with Summary Cards
- **Total Balance**: Real-time calculation of current financial position
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions
- Beautiful card design with color-coded icons and smooth animations

#### 2. Time-Based Visualization (Balance Trend Chart)
- Track balance changes over time (month-by-month)
- Visual representation of financial growth or decline
- Color-coded bars (green for positive balance, red for negative)
- Responsive horizontal bar chart with percentage indicators

#### 3. Categorical Visualization (Spending Breakdown)
- Pie-chart style visualization showing expenses by category
- Percentage calculation for each spending category
- Color-coded categories for easy identification
- Total expenses summary at the bottom

#### 4. Transaction List with Full Details
- Comprehensive table showing all transactions
- Displays: Date, Description, Category, Type, and Amount
- Color-coded transaction types (green for income, red for expenses)
- Responsive table design that works on all devices
- Empty state handling with helpful messages

#### 5. Transaction Filtering
- **Search**: Filter by description or category
- **Type Filter**: View all, income only, or expenses only
- **Category Filter**: Filter transactions by specific categories
- Real-time filtering with instant results

#### 6. Transaction Sorting
- Sort by Date (ascending/descending)
- Sort by Amount (ascending/descending)
- Toggle sort direction with visual indicators

#### 7. Role-Based UI (Viewer and Admin)
- **Viewer Role**: Read-only access to all data and visualizations
- **Admin Role**: Full CRUD capabilities (Create, Read, Update, Delete transactions)
- Easy role switching via toggle in header
- Actions column only visible to admins

#### 8. Insights Section
- **Top Spending Category**: Identifies highest expense category
- **Monthly Net Change**: Compares current vs previous month performance
- **Expense Trend**: Tracks spending increases or decreases
- Color-coded insights with intuitive icons

#### 9. State Management
- Context API for global state management
- Efficient data flow between components
- Real-time updates across all visualizations
- Local storage for theme persistence

#### 10. Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Optimized layouts for all screen sizes
- Touch-friendly interface elements

### Additional Features

#### 11. Dark Mode Toggle
- System-level dark mode support
- Smooth transitions between themes
- Persisted theme preference using localStorage
- Carefully chosen color schemes for both modes

#### 12. Database Integration
- Supabase PostgreSQL database for data persistence
- Real-time data synchronization
- Row Level Security (RLS) policies for data protection
- Sample data pre-loaded for demonstration

#### 13. CRUD Operations (Admin Only)
- **Create**: Add new transactions via modal form
- **Read**: View all transaction details
- **Update**: Edit existing transactions
- **Delete**: Remove transactions with confirmation
- Form validation and error handling

#### 14. Beautiful UI/UX
- Clean, modern design with attention to detail
- Smooth animations and transitions
- Intuitive user interactions
- Accessible color contrasts
- Professional gradient accents

## Technology Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Header with role toggle and theme switcher
│   ├── Dashboard.tsx           # Main dashboard container
│   ├── SummaryCards.tsx        # Financial summary cards
│   ├── BalanceTrendChart.tsx   # Time-based balance visualization
│   ├── SpendingByCategory.tsx  # Category-based spending chart
│   ├── Insights.tsx            # Financial insights and observations
│   └── TransactionList.tsx     # Transaction table with CRUD operations
├── context/
│   └── AppContext.tsx          # Global state management
├── lib/
│   ├── supabase.ts            # Supabase client configuration
│   └── database.types.ts      # TypeScript database types
├── utils/
│   └── calculations.ts         # Financial calculations and formatting
├── App.tsx                     # Main app component
├── main.tsx                    # App entry point
└── index.css                   # Global styles and Tailwind imports
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd financial-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
The `.env` file is already configured with Supabase credentials.

4. Run the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

6. Preview production build
```bash
npm run preview
```

## Database Schema

The application uses a single `transactions` table with the following structure:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| date | date | Transaction date |
| amount | numeric(10,2) | Transaction amount |
| category | text | Category (e.g., Groceries, Salary) |
| type | text | Type (Income or Expense) |
| description | text | Optional description |
| created_at | timestamptz | Creation timestamp |
| updated_at | timestamptz | Last update timestamp |

## Approach & Design Decisions

### Architecture
- **Component-Based Design**: Modular components for reusability and maintainability
- **Separation of Concerns**: Business logic separated from UI components
- **Type Safety**: Full TypeScript implementation for better code quality
- **Performance**: Efficient calculations using memoization and optimized renders

### State Management
- **Context API**: Chosen for its simplicity and sufficient for app requirements
- **Local State**: Component-level state for UI-specific data
- **Persistent Storage**: localStorage for theme preference

### Data Flow
1. Supabase database stores all transaction data
2. AppContext fetches and manages global state
3. Components consume context for read operations
4. Admin actions trigger CRUD operations via context methods
5. UI updates automatically after database changes

### UI/UX Design
- **Color System**: Semantic colors (green for income/positive, red for expenses/negative, blue for neutral)
- **Spacing**: Consistent 8px spacing system
- **Typography**: Clear hierarchy with appropriate font sizes and weights
- **Accessibility**: Proper contrast ratios and semantic HTML
- **Responsive**: Mobile-first design with progressive enhancement

### Security Considerations
- Row Level Security (RLS) enabled on database
- Input validation on all forms
- Confirmation dialogs for destructive actions
- Type checking to prevent data inconsistencies

## Features Checklist

- [x] Dashboard Overview with Summary Cards
- [x] Time-Based Visualization (Balance Trend)
- [x] Categorical Visualization (Spending Breakdown)
- [x] Transaction List with Details
- [x] Transaction Filtering
- [x] Transaction Sorting and Search
- [x] Role-Based UI (Viewer and Admin)
- [x] Insights Section
- [x] State Management (Context API)
- [x] Responsive Design
- [x] Dark Mode Toggle
- [x] Database Integration (Supabase)
- [x] CRUD Operations
- [x] Empty States Handling
- [x] Form Validation
- [x] Smooth Animations

## Future Enhancements

- Export transactions to CSV/JSON
- Advanced filtering with date ranges
- Multi-currency support
- Budget goals and tracking
- Recurring transactions
- Receipt image uploads
- Email notifications
- Mobile app version

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License
