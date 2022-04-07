import NewsLetterCard from "./cards/NewsletterCard";
import styles from "./index.module.scss";
import ProAccounts from "./ProAccounts";

const BlogIntro = () => {
  return (
    <div className={styles.blog_intro}>
      <h1 className={styles.intro_title}>Boost Your Programming Skills</h1>
      <NewsLetterCard />
      <ProAccounts />
    </div>
  );
};

export default BlogIntro;
