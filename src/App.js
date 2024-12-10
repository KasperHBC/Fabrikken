import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import About from './About.js';
import Arbejdsgange from './Arbejdsgange.js';
import VRApp from './VRApp.js';
import Employees from './Employees.js';
import SalesPage from './SalesPage.js';
import AdminPanel from './AdminPanel.js'; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/vr-app" element={<VRApp />} />
      <Route path="/sales" element={<SalesPage />} />
    </Routes>
    <ToastContainer />
  </Router>
);

export default App;
