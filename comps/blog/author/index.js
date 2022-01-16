import styles from "./author.module.scss";
import Image from "next/image";

const AuthorDetails = ({ author }) => {
  return (
    <div className={styles.author_container}>
      <div className={styles.left_side}>
        <Image
          src={author.avatar}
          height={100}
          width={100}
          layout="responsive"
        />
      </div>
      <div className={styles.right_side}>
        <h1>{`${author.firstName} ${author.lastName}`} | Author</h1>
        <p>{author.bio}</p>
      </div>
    </div>
  );
};

export default AuthorDetails;
