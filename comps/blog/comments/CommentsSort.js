const CommentsSort = ({ comments }) => {
  return (
    comments?.length > 1 && (
      <div className="com-sort">
        <div>
          <button
            className={sort == "top" ? "sort-on" : "sort-off"}
            onClick={() => {
              setSort("top");
            }}
          >
            Top Comments
          </button>
          <button
            className={sort == "new" ? "sort-on" : "sort-off"}
            onClick={() => {
              setSort("new");
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
