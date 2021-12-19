import { Spinner } from "react-bootstrap";
import styles from "./index.module.scss";

const NewsLetter = ({ isLoading, handleSubmit }) => {
  return (
    <div className="col-md-4 col-sm-4">
      <form className={styles.newsletter} onSubmit={handleSubmit}>
        <div className={styles.input_container}>
          <input
            disabled={isLoading}
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div className={styles.btn_container}>
          <button disabled={isLoading} type="submit">
            {(isLoading && (
              <Spinner animation="border" size="sm" role="status" />
            )) ||
              "SUBSCRIBE"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsLetter;
