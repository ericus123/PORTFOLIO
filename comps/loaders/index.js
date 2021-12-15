import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from "./index.module.scss";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const spiinningLoader = () => {
    return <Spin indicator={antIcon} className={styles.spinner} />
}