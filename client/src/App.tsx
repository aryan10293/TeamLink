import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
// import { Navigate } from 'react-router-dom';
import RegisterDisplay from './pages/RegisterDisplay';
import LoginDisplay from './pages/LoginDisplay';
function App() {
  return (
      <Routes>       
          <Route 
          path="/register"
          element={  <RegisterDisplay /> } />
          <Route 
          path="/"
          element={  <LoginDisplay /> } />
          {/* element={ userLogin ? <Dashboard state={user} user={userId}/> : <Navigate  to='/'/>} */}
    </Routes>
  );
}

export default App;
