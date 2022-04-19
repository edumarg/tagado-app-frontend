import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyNavBar from "./components/navBar";
import Home from "./components/home";
import Types from "./components/types";
import NotFound from "./components/notFound";

function App() {
  return (
    <React.Fragment>
      <MyNavBar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/types" element={<Types />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" exact element={<Navigate replace to="/home" />} />
        <Route path="/" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
