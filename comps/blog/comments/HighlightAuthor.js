import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/fontawesome-free-solid";
const HighLightAuthor = ({ postAuthor, dataAuthor }) => {
  return (
    postAuthor === dataAuthor && (
      <div className="author-badge" title="Author of this post">
        <FontAwesomeIcon icon={faCrown} className="crown_icon" />
        <span>Author</span>
      </div>
    )
  );
};

export default HighLightAuthor;
