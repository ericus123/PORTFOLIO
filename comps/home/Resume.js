import styles from "./index.module.scss";
import { FaArrowDown } from "react-icons/fa";
import { downloadFile } from "../../helpers";

const Resume = () => {
  return (
    <div
      className={styles.resumeContainer}
      onClick={() =>
        downloadFile(
          "https://drive.google.com/file/d/1rYyyOmR3omaAkfmTGeYfibHB-nRKFWeC/view?usp=sharing"
        )
      }
    >
      <FaArrowDown />
      <span>Resume</span>
    </div>
  );
};

export default Resume;
