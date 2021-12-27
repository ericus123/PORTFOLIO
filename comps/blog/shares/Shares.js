import { Facebook, Twitter, Whatsapp } from "react-bootstrap-icons";
import { Col } from "react-bootstrap";

export const PostShares = ({ slug }) => {
  let url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${slug}`;
  return (
    <Col>
      <a
        style={{ cursor: "pointer" }}
        onClick={() => {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}` , "_blank");
        }}
      >
        <Facebook size={24} color="#4267B2"/>
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
      <a 
        style={{ cursor: "pointer" }}
        onClick={() => {
          window.open(`https://twitter.com/intent/tweet?text=${url}` , "_blank");
        }}
      >
        <Twitter size={24} color="#00acee"/>
      </a>
    </Col>
  );
};
