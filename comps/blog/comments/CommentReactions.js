import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/fontawesome-free-solid";
import styles from "./index.module.scss";
import BounceLoader from "../../loaders/BounceLoader";
import { css } from "@emotion/react";

const CommentReactions = ({ data, onClick, user }) => {
  return (
    user && (
      <span className={styles.com_reactions}>
        {data.likes.some((like) => like.user && like.user._id == user._id) ? (
          <span>
            <FontAwesomeIcon
              className={styles.com_liked}
              icon={faHeart}
              size={30}
              onClick={onClick}
            />{" "}
            {data.likes.length ? (
              <span class={styles.com_reactions_num}>{data.likes.length}</span>
            ) : null}
          </span>
        ) : (
          <span>
            <FontAwesomeIcon
              onClick={onClick}
              className={styles.com_unliked}
              icon={faHeart}
              size={30}
            />
            &nbsp;
            {data.likes.length ? (
              <span class="n">{data.likes.length}</span>
            ) : null}
          </span>
        )}
      </span>
    )
  );
};

export default CommentReactions;
