import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsuarioDataGrid from './components/UsuarioGrid';
import UsuarioEdit from './components/UsuarioEdit';
import UsuarioAdd from './components/UsuarioAdd';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsuarioDataGrid />} />
        <Route path="/edit/:id" element={<UsuarioEdit />} />
        <Route path="/add" element={<UsuarioAdd />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;