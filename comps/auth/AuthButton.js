import styles from "./index.module.scss";
import { FaLongArrowAltRight } from "react-icons/fa";

const AuthButton = ({ text, type }) => {
  return (
    <button type={type} className={`${styles.authBtn} button`}>
      {text}&nbsp;&nbsp;
      <FaLongArrowAltRight />
    </button>
  );
};

export default AuthButton;
