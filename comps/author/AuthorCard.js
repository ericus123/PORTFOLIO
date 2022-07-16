import Image from "next/image";
import { FaTwitter } from "react-icons/fa";
import { slicedString } from "../../helpers";
import styles from "./index.module.scss";

const AuthorCard = ({ image, bio, first_name, last_name }) => {
  return (
    <div className={styles.author_card_container}>
      <div className={styles.author_card}>
        <div className={styles.author_left}>
          <Image
            src={image}
            alt="Author image"
            height={200}
            width={200}
            quality={25}
            priority
            className={styles.author_image}
          />
        </div>
        <div className={styles.author_right}>
          <h1>{`${first_name} ${last_name}`}</h1>
          <p>{slicedString(bio || "Content writter | Blogger", 100, true)}</p>
          <button className={styles.follow_btn}>
            <a
              href={"https://twitter.com/amaniericus"}
              target="_blank"
              rel="noreferrer"
              className={styles.follow_btn_link}
            >
              <FaTwitter /> follow
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
