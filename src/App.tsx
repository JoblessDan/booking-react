import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router';
import SignIn from './components/login/signIn';
import SignUp from './components/login/signUp';


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check localStorage 
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      setUser(null);
    }
  }, []);

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    return <>{children}</>;
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

 const handleAuthChange = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      setUser(null);
    }
  };

  const Dashboard = () => (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
          <p className="text-gray-600">You're successfully logged in!</p>
        </div>
      </div>
    </div>
  );
return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            !user ?
              <SignIn onSignIn={handleAuthChange} /> :
              <Navigate to="/" replace />
          }
        />
        <Route
          path="/signup"
          element={
            !user ?
              <SignUp onSignUp={handleAuthChange} /> :
              <Navigate to="/" replace />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
