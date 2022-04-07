import Moment from "react-moment";
import TimeAgo from "react-timeago";
import styles from "./index.module.scss";

const NewBlog = ({ post, route }) => {
  const { imageUrl, title, description, createdAt } = post;
  return (
    route === "/blog" && (
      <div className={`${styles.newblog_container} ${styles.card_container}`}>
        <div className={styles.newblog_card_image}>
          <img src={imageUrl} />
        </div>
        <div className={styles.newblog_content_container}>
          <div className={styles.card_tags}>
            <span>Newest blog</span>
          </div>
          <div className={styles.card_body}>
            <h1>{title}</h1>
            <p>
              {description.replace(/(<([^>]+)>)/gi, "").substr(0, 200) + "..."}
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
      </div>
    )
  );
};

export default NewBlog;
