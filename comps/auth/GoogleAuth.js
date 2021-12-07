import { Row, Col, Layout, Button } from "antd";
import styles from "./index.module.scss";
import { GoogleIcon } from "../icons";

const { Content } = Layout;

const GoogleAuth = () => {
  return (
    <div>
      <h1 className={styles.orText}>Or</h1>
      <button className={styles.googleAuthBtn} type="button">
        <GoogleIcon className={styles.googleIcon} />
        Sign in with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
