import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/blog/posts";
import Paginate from "../../comps/blog/Pagination";
import { simpleAlert } from "../../comps/Alerts";
import Head from "next/head";
import PostsList from "../../comps/blog/PostsList";
import BlogLayout from "../../comps/layouts/BlogLayout";
import AdBanner from "../../comps/ads";
import { SpinningLoader } from "../../comps/loaders";

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
      <BlogLayout showSlider isLoading={!postsPerPage.length}>
        <div className="single-post">
          <SpinningLoader isLoading={isLoading} />
          {err}
          {message && !postsPerPage.length && !error ? (
            <>
              <div>No results found</div>
            </>
          ) : null}
          <br />
          <PostsList posts={postsPerPage} />
          <AdBanner
            data-ad-layout="in-article"
            data-ad-format="fluid"
            data-ad-slot="1965117589"
          />
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
        </div>
      </BlogLayout>
    </>
  );
};
export default Blog;
