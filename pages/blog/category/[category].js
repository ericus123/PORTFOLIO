import { useEffect } from "react";
import { useRouter } from "next/router";
import { Media, Alert } from "react-bootstrap";
import { getPostsByCat } from "../../../redux/actions/blog/posts";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../../../comps/blog/sidebar/sideBar";
import Link from "next/link";
import { Spinner } from "react-bootstrap";
import Paginate from "../../../comps/blog/Pagination";
import NotFound from "../../404";
import ScrollButton from "../../../reusables/ScrollUp";
import PostsList from "../../../comps/blog/PostsList";

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
  const breadCrumb =
    catPosts && !isLoading ? (
      <>
        <br />
        <div>
          <Link href={"/blog"}>Blog</Link>
          &nbsp;&gt;&nbsp; Category &nbsp;&gt;&nbsp;
          {router.query.category}
        </div>
        <br />
      </>
    ) : null;

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
            {
              <PostsList
                posts={catPosts
                  .slice()
                  .sort((a, b) => (b.date > a.date ? 1 : -1))}
              />
            }
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6149905527184076"
              crossorigin="anonymous"
            ></script>
            <ins
              class="adsbygoogle"
              style={{ display: "block" }}
              data-ad-format="fluid"
              data-ad-layout-key="-i8+a-18-47+ce"
              data-ad-client="ca-pub-6149905527184076"
              data-ad-slot="1682703097"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
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
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6149905527184076"
              crossorigin="anonymous"
            ></script>
            <ins
              class="adsbygoogle"
              style={{ display: "block" }}
              data-ad-format="fluid"
              data-ad-layout-key="-i8+a-18-47+ce"
              data-ad-client="ca-pub-6149905527184076"
              data-ad-slot="1682703097"
            ></ins>
            <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
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
