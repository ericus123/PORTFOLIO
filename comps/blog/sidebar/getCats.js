import React, { useEffect } from "react";
import { getPostCats } from "../../../redux/actions/blog/posts";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup } from "react-bootstrap";
import Link from "next/link";
import { scrollTop } from "../../../helpers/index";

const GetCats = () => {
  const cats = useSelector((state) => state.getPostCats.cats);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostCats());
  }, []);

  const allCats = cats.length
    ? cats.map((cat) => {
        return (
          <ListGroup style={{ border: "none", textDecoration: "none" }}>
            <Link
              style={{ textDecoration: "none", border: "none" }}
              href={"/blog/category/" + cat.name}
            >
              <ListGroup.Item
                className="text-decoration-none cat-item"
                style={{
                  color: "#007bff",
                  cursor: "pointer",
                  fontSize: "medium",
                  border: "none",
                  textDecoration: "none",
                }}
                onClick={scrollTop}
              >
                &gt; {cat.name}
              </ListGroup.Item>
            </Link>
          </ListGroup>
        );
      })
    : null;
  return (
    <div>
      <br />
      {cats.length ? <h2 className="cat-title">Categories</h2> : null}
      {allCats}
    </div>
  );
};

export default GetCats;
