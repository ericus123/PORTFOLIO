import { useState } from "react";

const CommentsSort = ({ comments }) => {
  const [sort, setSort] = useState("new");

  const handleSort = (type) => {
    setSort(type);
  };
  return (
    comments?.length > 1 && (
      <div className="com-sort">
        <div>
          <button
            className={sort == "top" ? "sort-on" : "sort-off"}
            onClick={() => {
              handleSort("top");
            }}
          >
            Top Comments
          </button>
          <button
            className={sort == "new" ? "sort-on" : "sort-off"}
            onClick={() => {
              handleSort("new");
            }}
          >
            Newest First
          </button>
        </div>
      </div>
    )
  );
};

export default CommentsSort;
