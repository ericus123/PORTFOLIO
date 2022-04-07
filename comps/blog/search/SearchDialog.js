import styles from "./index.module.scss";
import { FaSearch, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

const SearchDialog = ({ open, handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    open && (
      <div className={styles.search_diallog}>
        <div className={styles.search_close}>
          <FaTimes
            size={36}
            className={styles.close_icon}
            onClick={handleSearch}
          />
        </div>
        <div className={styles.search_content}>
          <h1 className={styles.search_title}>SEARCH FOR:</h1>
          <div className={styles.search_box}>
            <input
              className={styles.search_input}
              placeholder="Enter Keyword"
              onSubmit={() => console.log("SEARCHING ......")}
              onChange={handleSearchValue}
            />
            <Link href={searchValue && `/blog/search?term=${searchValue}`}>
              <FaSearch
                size={36}
                className={styles.search_icon}
                onClick={(searchValue && handleSearch) || null}
              />
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default SearchDialog;
