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
import UserPage from "../../comps/layouts/UserPage";
import Head from "next/head";

const Blog = () => {
  const dispatch = useDispatch();
  const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const message = useSelector((state) => state.posts.message);
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);
  const postsPerPage = useSelector((state) => state.posts.postsPerPage);
  const prevPage = useSelector((state) => state.posts.prevPage);
  const nextPage = useSelector((state) => state.posts.nextPage);
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
                  href={`/blog/${post._id}`}
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
                  <Link href={`/blog/${post._id}`} onClick={scrollTop}>
                    <a className="text-decoration-none title ">{post.title}</a>
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
                  <Link href={`/blog/${post._id}`} onClick={scrollTop}>
                    <a className="text-decoration-none read-more">Read More</a>
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
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>AMANI Eric | Blog</title>
        <meta
          name="description"
          content="Home for programming tutorials and trends."
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${frontendURL}/blog`} />
        <meta property="og:title" content="AMANI Eric" />
        <meta
          property="og:description"
          content="Home for programming tutorials and trends."
        />
        {/* <meta property="og:image" content={pro_image}/> */}

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${frontendURL}/blog`} />
        <meta property="twitter:title" content="AMANI Eric" />
        <meta
          property="twitter:description"
          content="Home for programming tutorials and trends."
        />
        {/* <meta property="twitter:image" content={pro_image}></meta> */}
      </Head>
      <div className="Blog">
        <br />
        <ScrollButton />
        <div className="blog-wrapper">
          <div className="content-wrapper col-md-auto">
            <ul className="list-unstyled">
              {loader}
              {err}
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6149905527184076"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style={{display:"block", textAlign:"center"}}
     data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-client="ca-pub-6149905527184076"
     data-ad-slot="1965117589"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
              <PostsSlider />
              {message && !postsPerPage.length && !error ? (
                <>
                  <div>No results found</div>
                </>
              ) : null}
              <br />
              <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6149905527184076"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style={{display:"block"}}
     data-ad-format="fluid"
     data-ad-layout-key="-i8+a-18-47+ce"
     data-ad-client="ca-pub-6149905527184076"
     data-ad-slot="1682703097"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
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
    </>
  );
};
export default Blog;
