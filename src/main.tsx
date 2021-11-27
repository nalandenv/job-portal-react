import React from "react";
import App from "./App";
import ReactDOM, { render } from "react-dom";
import { User } from "./components/User";
import { Shortlisted } from "./components/Shortlisted";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path=":userId" element={<User />} />
        <Route path="/shortlisted" element={<Shortlisted />} />
        <Route path="/rejected" element={<Shortlisted />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
