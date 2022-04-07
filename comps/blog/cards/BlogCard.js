import TimeAgo from "react-timeago";
import styles from "./index.module.scss";
import Moment from "react-moment";
import Link from "next/link";

const BlogCard = ({ post }) => {
  const { imageUrl, title, description, createdAt } = post;
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className={styles.card_container} key={Math.random()}>
        <div className={styles.card_image}>
          <img src={imageUrl} />
        </div>
        {/* <div className={styles.card_tags}>
        <span>arduino</span>
        <span>react</span>
      </div> */}
        <div className={styles.card_body}>
          <h1>{title}</h1>
          <p>
            {description.replace(/(<([^>]+)>)/gi, "").substr(0, 100) + "..."}
          </p>
        </div>
        <div className={styles.card_footer}>
          <div>
            <span>
              <Moment format="MMM DD YYYY" date={createdAt} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
