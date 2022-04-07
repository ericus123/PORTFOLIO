import styles from "./index.module.scss";
import { FaSearch } from "react-icons/fa";
import GetCats from "./sidebar/getCats";

const BlogHeader = ({ onSearchClick }) => {
  return (
    <div className={styles.blog_header}>
      <div className={styles.category_container}>
        <GetCats />
      </div>
      <div className={styles.search_container} onClick={onSearchClick}>
        <FaSearch size={24} className={styles.search_icon} />
      </div>
    </div>
  );
};

export default BlogHeader;
