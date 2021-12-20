import styles from "./index.module.scss";
import { FaArrowDown } from "react-icons/fa";
import { downloadFile } from "../../helpers";

const Resume = () => {
  const resume_url = process.env.NEXT_PUBLIC_RESUME_URL;
  return (
    <div
      className={styles.resumeContainer}
      onClick={() => downloadFile(resume_url)}
    >
      <FaArrowDown />
      <span>Resume</span>
    </div>
  );
};

export default Resume;
