import styles from "./index.module.scss";

export const SupportBlog = () => {
  return (
    <div className={styles.support_container}>
      <div className={styles.support_text}>
        <span className={styles.highlight_text}>
          Did you find this article helpful?
        </span>{" "}
        Help keep this blog running. Thanks
      </div>
      <div className={styles.line_separator}></div>

      <div className={styles.support_img}>
        {" "}
        <a href="https://ko-fi.com/Z8Z47VXES" target="_blank" rel="noreferrer">
          <img
            className={styles.coffee_img}
            src="https://cdn.ko-fi.com/cdn/kofi5.png?v=3"
            alt="Buy Amani a cup of Coffe"
          />
        </a>
      </div>
    </div>
  );
};
