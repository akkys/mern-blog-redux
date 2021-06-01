import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllBlogs } from "../../../store/asyncActions/BlogActions";
import Loader from "../Loader";
import Pagination from "../Pagination";
import HomeContent from "./HomeContent";

const Home = () => {
  const { loading } = useSelector((state) => state.blog);
  const { blogs, count, perPage } = useSelector((state) => state.fetchBlog);
  const dispatch = useDispatch();
  let { page } = useParams();
  if (page === undefined) {
    page = 1;
  }

  useEffect(() => {
    document.title = "Home | Blogs";
    dispatch(fetchAllBlogs(page));
  }, [page]);

  return (
    <div className="container mt-100">
      <div className="row" style={{ marginBottom: "3rem" }}>
        <div className="col-9 home">
          {loading ? (
            <Loader />
          ) : blogs.length > 0 ? (
            blogs.map((blog) => <HomeContent blog={blog} />)
          ) : (
            ""
          )}
        </div>
      </div>
      <Pagination path="home" page={page} count={count} perPage={perPage} />
    </div>
  );
};

export default Home;
