import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <Dashboard />
      </div>
    </AppProvider>
  );
}

export default App;
