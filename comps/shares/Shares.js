import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faWhatsapp,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { Row } from "react-bootstrap";

export const PostShares = ({ id }) => {
  let url = `${process.env.REACT_APP_BASE_URL}/${id}`;
  return (
    <Row style={{ marginTop: "5px" }} className="social-shares">
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FontAwesomeIcon
            icon={faShareAlt}
            style={{
              fontSize: "small",
              marginLeft: "2px",
              textAlign: "center",
            }}
          />
          <i style={{ fontSize: "small", textAlign: "center" }}>share</i>
        </div>
      </div>
      &nbsp; &nbsp;
      <div
        className="fb-share-button socials"
        data-href={process.env.REACT_APP_BASE_URL}
        data-layout="button_count"
        data-size="small"
      >
        <a
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          class="fb-xfbml-parse-ignore"
          class="fb-xfbml-parse-ignore"
        >
          <button
            style={{
              background: "#4267B2",
              color: "white",
              borderRadius: "5%",
              border: "none",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "white", fontSize: "small" }}
              icon={faFacebook}
            />
            &nbsp;<span style={{ fontSize: "small" }}>Facebook</span>
          </button>
        </a>
      </div>
      &nbsp;
      <div className="socials">
        <button
          onClick={() => {
            window.open("whatsapp://send?text=" + url, "_blank");
          }}
          style={{
            background: "#25D366",
            color: "white",
            borderRadius: "5%",
            border: "none",
          }}
        >
          <FontAwesomeIcon
            style={{ color: "white", fontSize: "small" }}
            icon={faWhatsapp}
          />
          &nbsp;<span style={{ fontSize: "small" }}> Whatsapp</span>
        </button>
      </div>
      &nbsp;
      <div className="socials">
        <a
          href={`https://twitter.com/intent/tweet?text=${process.env.REACT_APP_BASE_URL}/${id}`}
        >
          <button
            class="twitter-share-button"
            data-size="large"
            style={{
              background: "#00acee",
              color: "white",
              borderRadius: "5%",
              border: "none",
            }}
          >
            <FontAwesomeIcon
              style={{ color: "white", fontSize: "small" }}
              icon={faTwitter}
            />
            &nbsp;<span style={{ fontSize: "small" }}> Twitter</span>
          </button>
        </a>
      </div>
    </Row>
  );
};
