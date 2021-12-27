import { Media } from "react-bootstrap";
import Link from "next/link";
import { decodeHtml, scrollTop } from "../../helpers";
import Image from "next/image";
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
            <div className="image_wrapper" style={{ minWidth: "40%" }}>
              <Image
                width={350}
                height={200}
                src={post.imageUrl}
                dpr="auto"
                layout="responsive"
                className={styles.post_img}
                priority
                quality={25}
              />
            </div>
            <br />
            &nbsp; &nbsp;&nbsp;
            <Media.Body className="media-body">
              <Link
                href={`/blog/${post.slug}`}
                onClick={scrollTop}
                className={styles.post_title}
              >
                <h4 className={`title ${styles.post_title}`}>{post.title}</h4>
              </Link>
              <p className="description">
                {decodeHtml(
                  post.description.replace(/(<([^>]+)>)/gi, "").substr(0, 250) +
                    "..."
                )}
              </p>
              <h6 style={{ marginTop: "10px" }}>
                <Link href={`/blog/${post.slug}`} onClick={scrollTop}>
                  <span className={styles.readmore_txt}>Read More</span>
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
