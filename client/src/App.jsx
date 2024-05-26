import React from "react";
import { Teachers } from "./pages/Teachers";
import { Topics } from "./pages/Topics";
import { Navigation } from "./components/Navigation";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <div className="bg-[#030712]">
      <BrowserRouter>
        <Navigation />
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/teachers" />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/teachers" element={<Teachers />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
