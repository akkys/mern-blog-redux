import React from "react";
import { Link } from "react-router-dom";
import { BsFillCaretRightFill, BsFillCaretLeftFill } from "react-icons/bs";

const Pagination = ({ path, page, count, perPage }) => {
  let totalPages = Math.ceil(count / perPage);
  let startLoop = page;
  let diff = totalPages - page;
  if (diff <= 5) {
    startLoop = totalPages - 5;
  }
  let endLoop = startLoop + 5;
  if (startLoop <= 0) {
    startLoop = 1;
  }

  const links = () => {
    const store = [];
    for (let i = startLoop; i <= endLoop; i++) {
      store.push(
        <li key={i} className={i == page ? "active" : ""}>
          <Link to={`/${path}/${i}`}>{i}</Link>
        </li>
      );
    }
    return store;
  };

  const prev = () => {
    if (page > 1) {
      return (
        <li>
          <Link to={`/${path}/${parseInt(page) - 1}`}>
            <BsFillCaretLeftFill />
          </Link>
        </li>
      );
    }
  };

  const next = () => {
    if (page < totalPages) {
      return (
        <li>
          <Link to={`/${path}/${parseInt(page) + 1}`}>
            <BsFillCaretRightFill />
          </Link>
        </li>
      );
    }
  };
  return totalPages && count > 5 ? (
    <div className="pagination">
      {prev()}
      {links()}
      {next()}
    </div>
  ) : (
    ""
  );
};

export default Pagination;
