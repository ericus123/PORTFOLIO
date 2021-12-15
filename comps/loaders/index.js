import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

const antIcon = <LoadingOutlined className={styles.spinner} spin />;

export const SpinningLoader = () => {
  return (
    <div className={styles.spinner_container}>
      <Spin size="large" indicator={antIcon} />
    </div>
  );
};
