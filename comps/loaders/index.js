import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const antIcon = <LoadingOutlined className={styles.spinner} spin />;

export const SpinningLoader = ({ isLoading }) => {
  return (
    isLoading && (
      <div className={styles.spinner_container}>
        <Spin size="large" indicator={antIcon} />
      </div>
    )
  );
};



export const SearchLoader = () => {
  return (
      <div className={styles.search_spinner_container}>
        <Spin size="large" indicator={antIcon} />
      </div>
    );
};
