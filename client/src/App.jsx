import React from "react";
import {Teachers} from './pages/Teachers'
import {Topics} from './pages/Topics'

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/teachers" />} />
        <Route path="/topics" element={<Topics/>} />
        <Route path="/teachers" element={<Teachers/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
