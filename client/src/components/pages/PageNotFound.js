import React, { useEffect } from "react";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found";
  });
  return (
    <div className="notFound">
      <div className="notFound__container">
        <h1 className="notFound__container__h1">404</h1>
        <p className="notFound__container__p">
          Oops! That page could not found.
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
