import React, { useEffect } from "react";
import { Media, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Link from "next/link";
import { getPosts } from "../../redux/actions/blog/posts";
import ScrollButton from "../../reusables/ScrollUp";
import SideBar from "../../comps/sidebar/sideBar";
import Paginate from "../../comps/Pagination";
import { simpleAlert } from "../../comps/Alerts";
import { scrollTop } from "../../utils/functions";
import PostsSlider from "../../comps/PostsSlider";

const Blog = () => {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.posts.message);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);
  const postsPerPage = useSelector((state) => state.posts.postsPerPage);
  const prevPage = useSelector((state) => state.posts.prevPage);
  const nextPage = useSelector((state) => state.posts.nextPage);

  // // //   let { search } = useLocation();
  //   const page = new URLSearchParams(search).get("page") || 1;
  const page = 1;

  useEffect(() => {
    dispatch(getPosts(page, 10));
  }, [page]);

  const loader = isLoading ? (
    <div style={{ textAlign: "center" }}>
      <br />
      <Spinner animation="border" size="lg" role="status" />
    </div>
  ) : null;
  const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const postsList = postsPerPage.length
    ? postsPerPage.map((post) => {
        return (
          <>
            <Media as="li" key={post._id} className="media">
              <div className="image_wrapper">
                <Link
                  href={`/blog/post/${post._id}/${post.slug}`}
                  className="text-decoration-none"
                  onClick={scrollTop}
                >
                  <a className="text-decoration-none">
                    <img
                      width={384}
                      height={256}
                      className="image"
                      src={post.imageUrl}
                      dpr="auto"
                    />
                  </a>
                </Link>
              </div>
              <br />
              &nbsp; &nbsp;&nbsp;
              <Media.Body className="media-body">
                <h4 className="title">
                  <Link
                    href={`/blog/post/${post._id}/${post.slug}`}
                    onClick={scrollTop}
                  >
                    <a
                      className="text-decoration-none "
                      style={{ color: "#000" }}
                    >
                      {post.title}
                    </a>
                  </Link>
                </h4>
                <p className="description">
                  {decodeHtml(
                    post.description
                      .replace(/(<([^>]+)>)/gi, "")
                      .substr(0, 250) + "..."
                  )}
                </p>
                <h6 style={{ marginTop: "10px" }}>
                  <Link
                    href={`/blog/post/${post._id}/${post.slug}`}
                    onClick={scrollTop}
                  >
                    <a className="text-decoration-none link">Read More</a>
                  </Link>
                </h6>
              </Media.Body>
            </Media>
            <br />
          </>
        );
      })
    : null;
  const err = error ? <>{simpleAlert("danger", error)}</> : null;

  return (
    <div className="Blog">
      <br />
      <ScrollButton />
      <div className="blog-wrapper">
        <div className="content-wrapper col-md-auto">
          <ul className="list-unstyled">
            {loader}
            {err}
            <PostsSlider />
            {message && !postsPerPage.length && !error ? (
              <>
                <div>No results found</div>
              </>
            ) : null}
            <br />

            {postsList}
            <br />
            {postsPerPage.length ? (
              <div style={{ textAlign: "center" }}>
                <Paginate
                  path="blog?page="
                  items={{
                    prevPage: prevPage,
                    nextPage: nextPage,
                    error: error,
                  }}
                />
              </div>
            ) : null}
            <br />
          </ul>
        </div>

        <div className="side-nav">
          <ul className="list-unstyled">
            <br />

            <SideBar />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Blog;
