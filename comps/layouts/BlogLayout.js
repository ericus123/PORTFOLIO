import ScrollButton from "../../reusables/ScrollUp";
import PostsSlider from "../blog/PostsSlider";
import SideBar from "../blog/sidebar/sideBar";

const BlogLayout = ({ children, showSlider }) => {
  return (
    <div className="Blog">
      <br />
      <ScrollButton />
      <div className="blog-wrapper">
        <div className="content-wrapper col-md-auto">
          {showSlider && <PostsSlider />}
          {children}
        </div>

        <div className="side-nav">
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
