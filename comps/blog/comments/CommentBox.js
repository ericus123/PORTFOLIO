import { Spinner } from "react-bootstrap";
import { simpleAlert } from "../../Alerts";
import styles from "./index.module.scss";

const CommentBox = ({
  onSubmit,
  error,
  isLoading,
  content,
  show,
  button,
  onCancel,
}) => {
  return (
    show && (
      <form className="com-form" onSubmit={onSubmit}>
        <textarea name="desc" defaultValue={(content && content) || null} />

        {error && simpleAlert("danger", error)}
        {!error ? (
          <div className={styles.comment_box_btns}>
            {onCancel && (
              <button
                onClick={onCancel}
                className={`px-2 py-1 ${styles.cancel_btn}`}
                disabled={isLoading}
              >
                Cancel
              </button>
            )}
            <button stype="submit" className="px-2 py-1" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" size="sm" role="status" />
              ) : (
                button || "Comment"
              )}
            </button>
          </div>
        ) : null}
      </form>
    )
  );
};

export default CommentBox;