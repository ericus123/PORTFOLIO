import Link from "next/link";
import styles from "./index.module.scss";

const TopicTag = ({ text, isActive, onClick }) => {
  return (
    <div
      className={`${styles.topic_tag} ${isActive && styles.active_topic_tag}`}
      onClick={onClick}
    >
      <Link
        style={{ textDecoration: "none", border: "none" }}
        href={"/blog/category/" + text}
      >
        <span>{text}</span>
      </Link>
    </div>
  );
};

export default TopicTag;
