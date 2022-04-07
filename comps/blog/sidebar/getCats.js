import React, { useEffect } from "react";
import { getPostCats } from "../../../redux/actions/blog/posts";
import { useSelector, useDispatch } from "react-redux";
import styles from "./index.module.scss";
import { LinkTo } from "../../../helpers";
import { useRouter } from "next/router";

const GetCats = () => {
  const cats = useSelector((state) => state.getPostCats.cats);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostCats());
  }, []);

  const router = useRouter();

  const allCats = cats.length
    ? cats.map((cat) => {
        return (
          <option
            selected={router.query.category == cat.name}
            key={Math.random()}
          >
            {cat.name}
          </option>
          // <ListGroup
          //   style={{ border: "none", textDecoration: "none" }}
          //   key={Math.random()}
          // >
          //   <Link
          //     style={{ textDecoration: "none", border: "none" }}
          //     href={"/blog/category/" + cat.name}
          //   >
          //     <ListGroup.Item
          //       className="text-decoration-none cat-item"
          //       style={{
          //         color: "#007bff",
          //         cursor: "pointer",
          //         fontSize: "medium",
          //         border: "none",
          //         textDecoration: "none",
          //       }}
          //       onClick={scrollTop}
          //     >
          //       &gt; {cat.name}
          //     </ListGroup.Item>
          //   </Link>
          // </ListGroup>
        );
      })
    : null;

  const handleCategory = (e) => {
    const val = e.target.value;
    console.log(val);
    if (val === "All") {
      LinkTo("/blog");
    } else {
      LinkTo(`/blog/category/${val}`);
    }
  };

  return (
    <div>
      {allCats && (
        <select className={styles.cats_select} onChange={handleCategory}>
          <option disabled>Categories</option>
          <option selected={router.asPath === "/blog"}>All</option>
          {allCats}
        </select>
      )}
    </div>
  );
};

export default GetCats;
