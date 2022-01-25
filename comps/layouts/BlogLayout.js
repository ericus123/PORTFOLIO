import ScrollButton from "../../reusables/ScrollUp";
import PostsSlider from "../blog/PostsSlider";
import SideBar from "../blog/sidebar/sideBar";
import styles from "./index.module.scss";

const BlogLayout = ({ children, showSlider }) => {
  return (
    <div className={`Blog ${styles.blog_layout}`}>
      <br />
      <ScrollButton />
      <div className="blog-wrapper">
        <div className="content-wrapper col-md-auto">
          {showSlider && <PostsSlider />}
          {children}
        </div>

        <div className={styles.side_nav}>
          <ul className="list-unstyled">
            <br />

            <SideBar />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default BlogLayout;
