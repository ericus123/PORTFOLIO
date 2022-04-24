import ScrollButton from "../../reusables/ScrollUp";
import AdBanner from "../ads";
import PostsSlider from "../blog/PostsSlider";
import SideBar from "../blog/sidebar/sideBar";
import styles from "./index.module.scss";

const BlogLayout = ({ children, showSlider }) => {
  return (
    <div className={styles.blog_container}>
      <AdBanner
        data-ad-slot="7105763628"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className={styles.blog_container}>
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
      </div>
      <AdBanner
        data-ad-slot="7105763628"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
export default BlogLayout;
