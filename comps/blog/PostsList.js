import Link from "next/link";
import { Media } from "react-bootstrap";
import { decodeHtml, scrollTop } from "../../helpers";
import styles from "./index.module.scss";

const PostsList = ({ posts }) => {
  return (
    posts &&
    posts.map((post) => {
      return (
        <Link
          key={Math.random()}
          href={`/blog/${post.slug}`}
          className="text-decoration-none"
          onClick={scrollTop}
        >
          <Media
            as="li"
            key={post.slug}
            className={`media ${styles.post_container}`}
          >
            <Media.Body className="media-body">
              <Link
                href={`/blog/${post.slug}`}
                onClick={scrollTop}
                className={styles.post_title}
              >
                <h4 className={`title ${styles.post_title}`}>{post.title}</h4>
              </Link>
              <p className={styles.blog_description}>
                {decodeHtml(
                  post.description.replace(/(<([^>]+)>)/gi, "").substr(0, 150) +
                    "..."
                )}
              </p>
              <h6 style={{ marginTop: "10px" }}>
                <Link href={`/blog/${post.slug}`} onClick={scrollTop}>
                  <div>
                    <span className={styles.readmore_txt}>Read More</span>
                  </div>
                </Link>
              </h6>
            </Media.Body>
          </Media>
        </Link>
      );
    })
  );
};

export default PostsList;
