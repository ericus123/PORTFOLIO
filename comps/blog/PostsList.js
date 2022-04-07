// import { Media } from "react-bootstrap";
// import Link from "next/link";
// import { decodeHtml, scrollTop } from "../../helpers";
import styles from "./index.module.scss";
import BlogCard from "./cards/BlogCard";
import NewBlog from "./cards/NewBlogCard";
import { useRouter } from "next/router";

const PostsList = ({ posts }) => {
  const router = useRouter();
  return (
    posts.length && (
      <div>
        <NewBlog post={posts[0]} route={router.asPath} />
        <div className={styles.blog_cards}>
          {posts.map((post) => {
            return (
              // <Link
              //   key={Math.random()}
              //   href={`/blog/${post.slug}`}
              //   className="text-decoration-none"
              //   onClick={scrollTop}
              // >
              //   <Media
              //     as="li"
              //     key={post.slug}
              //     className={`media ${styles.post_container}`}
              //   >
              //     <Media.Body className="media-body">
              //       <Link
              //         href={`/blog/${post.slug}`}
              //         onClick={scrollTop}
              //         className={styles.post_title}
              //       >
              //         <h4 className={`title ${styles.post_title}`}>{post.title}</h4>
              //       </Link>
              //       <p className={styles.blog_description}>
              //         {decodeHtml(
              //           post.description.replace(/(<([^>]+)>)/gi, "").substr(0, 150) +
              //             "..."
              //         )}
              //       </p>
              //       <h6 style={{ marginTop: "10px" }}>
              //         <Link href={`/blog/${post.slug}`} onClick={scrollTop}>
              //           <span className={styles.readmore_txt}>Read More</span>
              //         </Link>
              //       </h6>
              //     </Media.Body>
              //   </Media>
              // </Link>
              <BlogCard post={post} key={Math.random()} />
            );
          })}
          {posts.map((post) => {
            return (
              // <Link
              //   key={Math.random()}
              //   href={`/blog/${post.slug}`}
              //   className="text-decoration-none"
              //   onClick={scrollTop}
              // >
              //   <Media
              //     as="li"
              //     key={post.slug}
              //     className={`media ${styles.post_container}`}
              //   >
              //     <Media.Body className="media-body">
              //       <Link
              //         href={`/blog/${post.slug}`}
              //         onClick={scrollTop}
              //         className={styles.post_title}
              //       >
              //         <h4 className={`title ${styles.post_title}`}>{post.title}</h4>
              //       </Link>
              //       <p className={styles.blog_description}>
              //         {decodeHtml(
              //           post.description.replace(/(<([^>]+)>)/gi, "").substr(0, 150) +
              //             "..."
              //         )}
              //       </p>
              //       <h6 style={{ marginTop: "10px" }}>
              //         <Link href={`/blog/${post.slug}`} onClick={scrollTop}>
              //           <span className={styles.readmore_txt}>Read More</span>
              //         </Link>
              //       </h6>
              //     </Media.Body>
              //   </Media>
              // </Link>
              <BlogCard post={post} key={Math.random()} />
            );
          })}
        </div>

        <div className={styles.view_more_container}>
          <button className={styles.more_button}>LOAD MORE</button>
        </div>
      </div>
    )
  );
};

export default PostsList;
