import styles from "./index.module.scss";
import Link from "next/link";

const AuthLinks = ({ type }) => {
  return (
    <div className={styles.authLinksContainer}>
      <div className={`${styles.authLinks} ${styles.authLinksLeft}`}>
        <Link href="/signup" shallow={true}>
          {(type === "login" && "Don't have account ?") ||
            "Already have an account?"}
        </Link>
      </div>
      <div className={`${styles.authLinks} ${styles.authLinksRight}`}>
        <Link href="/password/reset" shallow={true}>
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default AuthLinks;
