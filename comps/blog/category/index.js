import Link from "next/link";
import style from "./index.module.scss";

export const CategoryHeader = ({ category }) => {
  return (
    <div className={style.category_header}>
      <span className={style.highlight}>
        <Link href={"/blog"}>Blog</Link>
      </span>
      &nbsp;&gt;&nbsp; <span>Category</span> &nbsp;&gt;&nbsp;
      <span> {category}</span>
    </div>
  );
};
