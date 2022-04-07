import { useState } from "react";
import ScrollButton from "../../reusables/ScrollUp";
import BlogHeader from "../blog/BlogHeader";
import SearchDialog from "../blog/search/SearchDialog";
import styles from "./index.module.scss";

const BlogLayout = ({ children, showHeader }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className={`Blog ${styles.blog_layout} container`}>
      <br />
      <ScrollButton />
      {showHeader && <BlogHeader onSearchClick={handleSearch} />}
      <SearchDialog open={isSearchOpen} handleSearch={handleSearch} />
      <div className={styles.blog_wrapper}>
        {/* <BlogIntro /> */}
        {children}
      </div>
    </div>
  );
};
export default BlogLayout;
