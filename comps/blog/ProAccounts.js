import { FaLinkedinIn, FaTwitter, FaGitlab, FaGithub } from "react-icons/fa";
import { LinkTo } from "../../helpers";
import styles from "./index.module.scss";

const ProAccounts = () => {
  //   const {
  //     NEXT_PUBLIC_TWITTER_URL,
  //     NEXT_PUBLIC_GITHUB_URL,
  //     NEXT_PUBLIC_LINKEDIN_URL,
  //     NEXT_PUBLIC_GITLAB_URL,
  //   } = process.env;
  return (
    <div className={styles.accounts_container}>
      <h1>Let's Connect</h1>
      <div className={styles.social_accounts}>
        <div onClick={LinkTo("")}>
          <FaLinkedinIn />
        </div>
        <div onClick={LinkTo("")}>
          <FaGitlab />
        </div>
        <div onClick={LinkTo("")}>
          <FaTwitter />
        </div>
        <div onClick={LinkTo("")}>
          <FaGithub />
        </div>
      </div>
    </div>
  );
};

export default ProAccounts;
