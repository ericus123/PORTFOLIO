import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/fontawesome-free-solid";
import styles from "./index.module.scss";

const HighLightAuthor = ({ postAuthor, dataAuthor }) => {
  return (
    postAuthor === dataAuthor && (
      <div className={styles.author_badge} title="Author of this post">
        <span> <FontAwesomeIcon icon={faCrown} className="crown_icon" /></span>
       
        <span>Author</span>
      </div>
    )
  );
};

export default HighLightAuthor;
