import { FaLongArrowAltRight } from "react-icons/fa";
import styles from "./index.module.scss";

const CommentsBlocked = () => {
  return (
    <div className={styles.comments_blocked}>
      <h1>
        {" "}
        <a href="/login?back=true">
          Login to comment <FaLongArrowAltRight />
        </a>
      </h1>
    </div>
  );
};

export default CommentsBlocked;
