import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import MyNavBar from "./components/navBar";
import Home from "./components/home";
import Types from "./components/types";
import NotFound from "./components/notFound";
import http from "./services/httpServices";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await http.get("/home");
      const data = await response.data;
      setData(data);
    } catch (exception) {
      if (exception.response)
        toast.error("There was an issue getting the information");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MyNavBar data={data} />
      <Routes>
        <Route path="/home" element={<Home data={data} />} />
        <Route
          path="/types"
          element={<Types data={data} setData={setData} />}
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route exact path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
