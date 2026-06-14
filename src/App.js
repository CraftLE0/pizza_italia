import logo from './logo.svg';
import './App.css';
import AppRouter from './components/AppRouter';
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []); 
  
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg bg-warning px-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="http://localhost:3000/">MyShop</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="http://localhost:3000/cart">Cart</a>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {user ? (
                <div className="d-flex align-items-center gap-3">
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold">{user.name}</span>
                  </div>
                  <button className="btn btn-outline-danger btn-sm px-3" onClick={logout}>Logout</button>
                </div>
              ) : (
                <a className="btn btn-primary btn-sm px-4" href="http://localhost:3000/auth">Login</a>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <AppRouter />
    </div>
  );
}

export default App;