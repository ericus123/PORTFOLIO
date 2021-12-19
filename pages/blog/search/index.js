import React, { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import {
  getPosts,
  searchPostsRequest,
} from "../../../redux/actions/blog/posts";
import SideBar from "../../../comps/blog/sidebar/sideBar";
import ScrollTop from "../../../reusables/ScrollUp";
import Paginate from "../../../comps/blog/Pagination";
import PostsList from "../../../comps/blog/PostsList";
import PostsSlider from "../../../comps/blog/PostsSlider";
import BlogLayout from "../../../comps/layouts/BlogLayout";

const SearchPosts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.posts.isLoading);
  const error = useSelector((state) => state.posts.error);

  const searchPosts = useSelector((state) => state.searchPosts.posts);
  const searchTerm = useSelector((state) => state.searchPosts.term);
  const searchError = useSelector((state) => state.searchPosts.error);

  const searchIsLoading = useSelector((state) => state.searchPosts.isLoading);
  const postsPerPage = useSelector((state) => state.searchPosts.posts);
  const prevPage = useSelector((state) => state.searchPosts.prevPage);
  const nextPage = useSelector((state) => state.searchPosts.nextPage);
  const maxPages = useSelector((state) => state.searchPosts.maxPages);

  const router = useRouter();
  const term = router.query.term;
  const page = router.query.page || 1;

  useEffect(() => {
    dispatch(getPosts(page));
  }, [page]);
  useEffect(() => {
    dispatch(searchPostsRequest(term, page, 5));
  }, [term, page]);

  const loader =
    isLoading || (searchIsLoading && !searchError) ? (
      <div style={{ textAlign: "center" }}>
        <Spinner animation="border" size="lg" role="status" />
      </div>
    ) : null;

  const err = error ? (
    <Alert variant="danger" style={{ textAlign: "center" }}>
      {error}
    </Alert>
  ) : null;

  return (
    <BlogLayout showSlider>
      <ul className="list-unstyled">
        {err}
        {loader}
        <br />
        {postsPerPage.length && searchTerm && !searchIsLoading ? (
          <h2 style={{ fontWeight: "light", textAlign: "center" }}>
            Showing {searchPosts.length}{" "}
            {searchPosts.length > 1 ? "results" : "result"} for "{searchTerm}"
          </h2>
        ) : null}
        {!searchIsLoading &&
        !postsPerPage.length &&
        !searchError &&
        searchTerm ? (
          <h2
            style={{
              fontWeight: "light",
              color: "#dc3545",
              textAlign: "center",
            }}
          >
            Ooops! No results found for "{searchTerm}"
            <span style={{ fontWeight: "bold" }}></span>
          </h2>
        ) : null}

        {searchError ? (
          <Alert variant="danger" style={{ textAlign: "center" }}>
            {searchError}
          </Alert>
        ) : null}
        <br />
        {!searchIsLoading && <PostsList posts={postsPerPage} />}
        <br />
        {searchPosts.length && !searchIsLoading ? (
          <div style={{ textAlign: "center" }}>
            {postsPerPage.length ? (
              <div style={{ textAlign: "center" }}>
                <Paginate
                  path={`search?term=${router.query.term}&page=`}
                  items={{
                    prevPage: prevPage,
                    nextPage: nextPage,
                    maxPages: maxPages,
                    error: searchError,
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : null}
        <br />
      </ul>
    </BlogLayout>
  );
};

export default SearchPosts;
SearchPosts.getInitialProps = async ({ query }) => {
  const term = query.term;
  const page = query.page || 1;

  return {
    props: {
      term: term,
      page: page,
    },
  };
};
