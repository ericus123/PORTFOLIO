import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { scrollTop } from "../../../helpers/index";
import {
  getPosts,
  searchPostsRequest,
} from "../../../redux/actions/blog/posts";
import AdBanner from "../../ads";
import styles from "../index.module.scss";
import GetCats from "./getCats";
import style from "./index.module.scss";
import RandomQuote from "./quotes";

const SideBar = () => {
  const posts = useSelector((state) => state.posts.posts);
  const error = useSelector((state) => state.posts.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);
  const router = useRouter();

  const recentPosts = posts.length
    ? posts.slice(0, 3).map((post) => {
        return (
          <div className="recent-posts" key={Math.random()}>
            <div className={styles.recent_posts_image}>
              <Image
                src={post.imageUrl}
                width={50}
                height={30}
                layout="responsive"
                priority
                quality={25}
              />
            </div>

            <div>
              <Link href={`/blog/${post.slug}`} onClick={scrollTop}>
                <h6
                  className={`recent-post-title title ${styles.post_title}`}
                  style={{
                    color: "#007bff",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {post.title}
                </h6>
              </Link>
              <i className="text-muted " style={{ fontSize: "small" }}>
                <Moment format="DD MMM YYYY" date={post?.createdAt} />
              </i>
            </div>
          </div>
        );
      })
    : null;
  const err = error ? (
    <Alert variant="danger" style={{ textAlign: "center" }}>
      {error}
    </Alert>
  ) : null;

  return (
    <div className="side-bar">
      {posts.length ? (
        <h2 className={`${style.side_panel_title} ${styles.post_title}`}>
          What&apos;s new
        </h2>
      ) : null}
      {err}
      <br />
      {recentPosts}
      <br />
      {posts.length ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            scrollTop();
            dispatch(searchPostsRequest(e.target.data.value));
            router.push(`/blog/search?term=${e.target.data.value}`);
            e.target.reset();
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            name="data"
            required
            className={styles.search_bar}
            maxLength={30}
            minLength={5}
          />

          <Button className={`submit_btn ${styles.search_btn}`} type="submit">
            <Search className="search_icon" />
          </Button>
        </form>
      ) : null}
      <br />
      <GetCats />
      <br />
      <AdBanner
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-slot="1965117589"
      />
      <br />
      {posts && <RandomQuote />}
      <br />
      {/* <AdBanner data-ad-format="autorelaxed" data-ad-slot="7206650297" /> */}
    </div>
  );
};

export default SideBar;
