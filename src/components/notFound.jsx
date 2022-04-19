import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <div className="col-sm-6 d-flex flex-column m-auto justify-content-center align-items-center">
        <h2>Error 404</h2>
        <h3>Page not Found</h3>
        <Link to="/">Go Home</Link>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
