import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineBookmark } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getPostCats } from "../../../redux/actions/blog/posts";
import styles from "../index.module.scss";
import style from "./index.module.scss";
import TopicTag from "./TopicTag";

const GetCats = () => {
  const cats = useSelector((state) => state.getPostCats.cats);
  const [active, setActive] = useState(-1);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostCats());
  }, []);

  const highlight = (id) => {
    console.log(id);
    setActive(id);
    console.log(active);
  };

  const router = useRouter();

  return (
    <div>
      <br />
      {cats && (
        <h2 className={`${style.side_panel_title} ${styles.post_title}`}>
          <MdOutlineBookmark />
          Topics for you
        </h2>
      )}

      <div className={style.topics_container}>
        {cats &&
          cats.map((cat, i) => (
            <TopicTag
              text={cat?.name}
              isActive={active === i || cat.name == router?.query?.category}
              key={Math.random}
              onClick={() => highlight(i)}
            />
          ))}
      </div>
    </div>
  );
};

export default GetCats;
