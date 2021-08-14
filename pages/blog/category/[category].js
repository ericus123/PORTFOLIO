import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Media, Alert } from "react-bootstrap";
import { getPostsByCat } from "../../../redux/actions/blog/posts";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../../../comps/sidebar/sideBar";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import Paginate from "../../../comps/Pagination";
import NotFound from "../../404";
import ScrollButton from "../../../reusables/ScrollUp";

const PostsByCategory = () => {
  const message = useSelector((state) => state.postsByCat.message);
  const isLoading = useSelector((state) => state.postsByCat.isLoading);
  const error = useSelector((state) => state.postsByCat.error);
  const catPosts = useSelector((state) => state.postsByCat.posts);
  const prevPage = useSelector((state) => state.postsByCat.prevPage);
  const nextPage = useSelector((state) => state.postsByCat.nextPage);
  const maxPages = useSelector((state) => state.postsByCat.maxPages);
  const router = useRouter();

  const dispatch = useDispatch();
  //   const { search } = useLocation();
  //   const page = new URLSearchParams(search).get("page") || 1;
  const page = 1;
  useEffect(() => {
    dispatch(getPostsByCat(router.query.category));
  }, [page, router.query.category]);

  const decodeHtml = (html) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };
  const breadCrumb = catPosts ? (
    <>
      <br />
      <div>
        <Link href={"/blog"} style={{ textDecoration: "none" }}>
          Blog
        </Link>
        &nbsp;&gt;&nbsp;
        <a style={{ textDecoration: "none" }} className="">
          Category
        </a>
        &nbsp;&gt;&nbsp;
        <a style={{ textDecoration: "none" }} className="">
          {router.query.category}
        </a>
      </div>
      <br />
    </>
  ) : null;

  const categorizedPosts =
    catPosts && catPosts.length
      ? catPosts
          .slice()
          .sort((a, b) => (b.date > a.date ? 1 : -1))
          .map((post) => {
            return (
              <>
                <Media as="li" key={post._id} className="media">
                  <div className="image_wrapper">
                    <Link
                      href={`/blog/${post._id}`}
                      className="text-decoration-none"
                    >
                      <img
                        width={384}
                        height={256}
                        className="image"
                        src={post.imageUrl}
                        dpr="auto"
                      />
                    </Link>
                  </div>
                  <br />
                  &nbsp; &nbsp;&nbsp;
                  <Media.Body className="media-body">
                    <h4 className="title">
                      <Link
                        href={`/blog/post/${post._id}/${post.slug}`}
                        className="text-decoration-none "
                        style={{ color: "#000" }}
                      >
                        {post.title}
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
                        className="text-decoration-none link"
                      >
                        Read More
                      </Link>
                    </h6>
                  </Media.Body>
                </Media>
                <br />
              </>
            );
          })
      : null;

  const err = error ? <Alert variant="danger">{error}</Alert> : null;
  return (
    <div className="Blog">
      <ScrollButton />
      <div className="blog-wrapper">
        <div className="content-wrapper col-md-auto">
          <ul className="list-unstyled">
            {isLoading ? (
              <div style={{ textAlign: "center" }}>
                <br />
                <br />
                <Spinner animation="border" size="lg" role="status" />
              </div>
            ) : null}
            {err}
            {message && !catPosts.length ? <NotFound /> : null}
            {breadCrumb}
            {categorizedPosts}
            {catPosts && catPosts.length ? console.log(categorizedPosts) : null}
          </ul>
          {catPosts ? (
            <div style={{ textAlign: "center" }}>
              <Paginate
                path={`${router.query.category}?page=`}
                items={{
                  prevPage: prevPage,
                  nextPage: nextPage,
                  maxPages: maxPages,
                  error: error,
                }}
              />
            </div>
          ) : null}
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
PostsByCategory.getInitialProps = ({ query: { category } }) => {
  return { category };
};
export default PostsByCategory;
