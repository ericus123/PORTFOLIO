import React from "react";
import {
  Envelope,
  Phone,
  Laptop,
  Github,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
} from "react-bootstrap-icons";
import NewsLetter from "./NewsLetter";
import styles from "../styles/Footer.module.scss";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_upper}>
        <div className={styles.get_in_touch}>
          <p className={styles.footer__title}>Amani</p>
          <div className={styles.footer_about}>
            <p>
              <Laptop size={24} />
              &nbsp;Fullstack web developer
            </p>
            <p>
              <a style={{ textDecoration: "none" }} href="tel: +250783343195">
                <Phone size={24} />
                &nbsp;(+250)783343195
              </a>
            </p>
            <p>
              <a
                style={{ textDecoration: "none" }}
                href="mailto:amaniericus@gmail.com"
              >
                <Envelope size={24} />
                &nbsp;amaniericus@gmail.com
              </a>
            </p>
          </div>
          <div className={styles.footer__social}>
            <a
              target="_blank"
              href="https://www.instagram.com/amaniericus/"
              className={styles.footer__icon}
            >
              <Instagram size={24} />
            </a>

            <a
              target="_blank"
              href="https://www.youtube.com/channel/UC1vRHri9_SG0aPxjahm70OA"
              className={styles.footer__icon}
            >
              <Youtube size={24} />
            </a>
            <a href="#" className={styles.footer__icon}>
              <Twitter size={24} />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/amani-eric-b45986172/"
              className={styles.footer__icon}
            >
              <Linkedin size={24} />
            </a>

            <a
              target="_blank"
              href="https://github.com/ericus123"
              className={styles.footer__icon}
            >
              <Github size={24} />
            </a>
          </div>
        </div>
        <NewsLetter />
      </div>
      <div className={styles.copyright}>
        <p>&#169; 2021 amanieric all rights reserved</p>
      </div>
    </div>
  );
};
export default Footer;
