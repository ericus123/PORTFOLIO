import React from "react";
import Navbar from "../navigation/Navbar";

const UserPage = ({ children }) => {
  return (
    <div className="user_page_layout">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
export default UserPage;
