import TimeAgo from "react-timeago";
import styles from "./index.module.scss";

const BlogCard = ({ post }) => {
  const { imageUrl, title, description, createdAt } = post;
  return (
    <div className={styles.card_container} key={Math.random()}>
      <div className={styles.card_image}>
        <img src={imageUrl} />
      </div>
      <div className={styles.card_tags}>
        <span>arduino</span>
        <span>react</span>
      </div>
      <div className={styles.card_body}>
        <h1>{title}</h1>
        <p>{description.replace(/(<([^>]+)>)/gi, "").substr(0, 60) + "..."}</p>
      </div>
      <div className={styles.card_footer}>
        <img src="/images/avatar.png" />
        <div>
          <h1>By Amani</h1>
          <span>
            <TimeAgo date={createdAt} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
