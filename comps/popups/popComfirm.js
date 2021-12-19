import { Popconfirm } from "antd";

const PopConfirm = ({ title, text, action, style, icon }) => {
  return (
    <Popconfirm title={title} icon={icon} onConfirm={action}>
      <a href="#" style={style}>
        {text}
      </a>
    </Popconfirm>
  );
};

export default PopConfirm;
