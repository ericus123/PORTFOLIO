import ScrollButton from "../../reusables/ScrollUp";
import PostsSlider from "../blog/PostsSlider";
import SideBar from "../blog/sidebar/sideBar";
import styles from "./index.module.scss";

const BlogLayout = ({ children, showSlider, isLoading }) => {
  return (
    <div className={styles.blog_wrapper}>
      <div className={styles.blog_container}>
        <div className={styles.blog_layout_left}>
          {/* <AdBanner
            data-ad-slot="1476080968"
            data-ad-format="auto"
            data-full-width-responsive="true"
          /> */}
        </div>
        <div className={styles.blog_container}>
          <div className={`Blog ${styles.blog_layout}`}>
            <br />
            <ScrollButton />
            <div className="blog-wrapper">
              <div className="content-wrapper col-md-auto">
                {showSlider && <PostsSlider />}
                {children}
              </div>
              {!isLoading && (
                <div className={styles.side_nav}>
                  <ul className="list-unstyled">
                    <br />

                    <SideBar />
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.blog_layout_right}>
          {/* <AdBanner
            data-ad-slot="1476080968"
            data-ad-format="auto"
            data-full-width-responsive="true"
          /> */}
        </div>
      </div>
    </div>
  );
};
export default BlogLayout;
