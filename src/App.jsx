import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createClerkSupabaseClient } from './lib/supabaseClient'
import Framer from "./Framer.jsx";
import Dashboard from "./Dashboard.jsx";
import UserSync from "./component/UserSync.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/AiSearcho/">
      <UserSync />
      <div className="main">
        <Routes>
          <Route path="/" element={<Framer />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
