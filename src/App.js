import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MyNavBar from "./components/navBar";
import Home from "./components/home";
import Types from "./components/types";
import NotFound from "./components/notFound";

function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(
      "data.json",

      {
        headers: {
          "Content-Type": "application/json",

          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })

      .then(function (myJson) {
        setData(myJson);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <MyNavBar data={data} />
      <Routes>
        <Route path="/home" element={<Home data={data} />} />
        <Route path="/types" element={<Types />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route exact path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
