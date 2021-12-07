import { Row, Col } from "react-bootstrap";
import styles from "./index.module.scss";
import Link from "next/link";

const AuthLinks = ({ type }) => {
  return (
    <div className={styles.authLinksContainer}>
      <div className={`${styles.authLinks} ${styles.authLinksLeft}`}>
        <Link href="/signup" shallow={true}>
          <a>
            {(type === "login" && "Don't have account ?") ||
              "Already have an account?"}
          </a>
        </Link>
      </div>
      <div className={`${styles.authLinks} ${styles.authLinksRight}`}>
        <Link href="/password/reset" shallow={true}>
          <a>Forgot password?</a>
        </Link>
      </div>
    </div>
  );
};

export default AuthLinks;
