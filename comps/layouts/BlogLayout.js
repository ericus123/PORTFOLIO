import ScrollButton from "../../reusables/ScrollUp";
import BlogIntro from "../blog/BlogIntro";
import styles from "./index.module.scss";

const BlogLayout = ({ children }) => {
  return (
    <div className={`Blog ${styles.blog_layout}`}>
      <br />
      <ScrollButton />
      <div className={styles.blog_wrapper}>
        <BlogIntro />
        {children}
      </div>
    </div>
  );
};
export default BlogLayout;
