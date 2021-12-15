import { Spinner } from "react-bootstrap";
import { simpleAlert } from "../../Alerts";

const CommentBox = ({ onSubmit, postCommentError, postCommentIsLoading }) => {
  return (
    <form className="com-form" onSubmit={onSubmit}>
      <textarea name="desc" />

      {postCommentError && simpleAlert("danger", postCommentError)}
      {!postCommentError ? (
        <button stype="submit" className="px-2">
          {postCommentIsLoading ? (
            <Spinner animation="border" size="sm" role="status" />
          ) : (
            "Comment"
          )}
        </button>
      ) : null}
    </form>
  );
};

export default CommentBox;
