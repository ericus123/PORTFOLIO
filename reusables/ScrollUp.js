import React, { useState } from "react";
import { ArrowUpShort } from "react-bootstrap-icons";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = process.browser
      ? document.documentElement.scrollTop
      : null;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    process.browser
      ? window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      : null;
  };

  process.browser ? window.addEventListener("scroll", toggleVisible) : null;

  return (
    <div
      className="scroll-to-top rounded"
      style={{ display: visible ? "inline" : "none", fontWeight: "bolder" }}
      onClick={scrollToTop}
    >
      <ArrowUpShort size={24} style={{ fontWeight: "bolder" }} />
    </div>
  );
};

export default ScrollButton;
