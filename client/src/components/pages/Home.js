import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { htmlToText } from "html-to-text";
import { fetchAllBlogs } from "../../store/asyncActions/BlogActions";
import Loader from "../pages/Loader";
import Pagination from "../pages/Pagination";

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
            blogs.map((blog) => (
              <div className="row blog-style" key={blog._id}>
                <div className="col-8 ">
                  <div className="blog">
                    <div className="blog__header">
                      <div className="blog__header__avatar">
                        {blog.userName[0]}
                      </div>
                      <div className="blog__header__user">
                        <span>{blog.userName}</span>
                        <span>
                          Posted on : {moment(blog.updatedAt).format("ll")}
                        </span>
                      </div>
                    </div>
                    <div className="blog__body">
                      <h1 className="blog__body__title">
                        <Link to={`/blogDetails/${blog.blogUrl}`}>
                          {blog.title}
                        </Link>
                      </h1>
                      <div className="blog__body__details">
                        {htmlToText(blog.value.slice(0, 300))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="blog__image">
                    <img src={`/images/${blog.image}`} alt={blog.image} />
                  </div>
                </div>
              </div>
            ))
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
