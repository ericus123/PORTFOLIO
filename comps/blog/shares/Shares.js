import React from "react";
import { Facebook, Twitter, Whatsapp } from "react-bootstrap-icons";
import { Col } from "react-bootstrap";

export const PostShares = ({ id }) => {
  let url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${id}`;
  return (
    <Col>
      <a
        target="_blank"
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
      >
        <Facebook size={24} />
      </a>
      &nbsp;&nbsp;
      <a
        style={{ cursor: "pointer" }}
        onClick={() => {
          window.open("whatsapp://send?text=" + url, "_blank");
        }}
      >
        <Whatsapp size={24} color="#25d366" />
      </a>
      &nbsp;&nbsp;
      <a href={`https://twitter.com/intent/tweet?text=${url}`} target="_blank">
        <Twitter size={24} />
      </a>
    </Col>
  );
};
