import React from "react";
import {
  Telegram,
  Whatsapp,
  Twitter,
  Github,
  Linkedin,
} from "react-bootstrap-icons";

const Footer = () => {
  return (
    <footer>
      <div className="footer-wrap">
        <div className="container first_class">
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <h3>BE THE FIRST TO KNOW</h3>
              <p>
                Get access to thousands of exclusive tech news and tutorials
                right to your inbox. Sign up for our newsletter today.
              </p>
            </div>
            <div className="col-md-4 col-sm-6">
              <form className="newsletter">
                <input type="text" placeholder="Email Address" />
                {/* <button
                  className="newsletter_submit_btn"
                  type="submit"
                ></button> */}
              </form>
            </div>
            <div className="col-md-4 col-sm-6">
              <div className="col-md-12">
                <div className="standard_social_links">
                  <div>
                    <li className="round-btn">
                      <a href="#">
                        <Linkedin
                          style={{ textAlign: "center" }}
                          color="#0e76a8"
                        />
                      </a>
                    </li>
                    <li className="round-btn">
                      <a href="#">
                        <Twitter
                          style={{ textAlign: "center" }}
                          color="#00acee"
                        />
                      </a>
                    </li>
                    <li className="round-btn btn-whatsapp">
                      <a href="#">
                        <Whatsapp
                          style={{ textAlign: "center" }}
                          color="#4FCE5D"
                        />
                      </a>
                    </li>
                    <li className="round-btn btn-envelop">
                      <a href="#">
                        <Github style={{ textAlign: "center" }} color="#000" />
                      </a>
                    </li>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="col-md-12">
                <h3 style={{ textAlign: "right" }}>Stay Connected</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="second_class">
          <div className="container second_class_bdr">
            <div className="row">
              <div className="col-md-4 col-sm-6">
                <div className="footer-logo">
                  <h1 style={{ color: "#ccc" }}>
                    <b>AMANI Eric</b>
                  </h1>
                </div>
                <p>
                  A full stack web developer focused on crafting great web
                  experiences.I'm usually writing a lot of JavaScript 🛠️ I love
                  working with Node.js,react and Figma 🎨 Ping me if you need
                  help (or just wanna' chat) 🤖
                </p>
              </div>
              <div className="col-md-4 col-sm-6">
                <h3>Quick LInks</h3>
                <ul className="footer-links">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="#about">About us</a>
                  </li>
                  <li>
                    <a href="#services">Services</a>
                  </li>
                  <li>
                    <a href="#contact">Contact Us</a>
                  </li>
                  <li>
                    <a href="#skills">Skills</a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>

                  <li>
                    <a href="/signup">Signup</a>
                  </li>
                  <li>
                    <a href="/blog">Blog</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-sm-6">
                <h3>OUR SERVICES</h3>
                <ul className="footer-category">
                  <li>
                    <a href="#">UI/UX Design</a>
                  </li>
                  <li>
                    <a href="#">SEO</a>
                  </li>
                  <li>
                    <a href="#">Backend Development</a>
                  </li>
                  <li>
                    <a href="#">Responsive Web Design</a>
                  </li>
                  <li>
                    <a href="#">Database Management</a>
                  </li>
                  <li>
                    <a href="#">Front-end Development</a>
                  </li>
                </ul>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="container-fluid">
            <div className="copyright">
              {" "}
              Copyright 2021 | All Rights Reserved by AMANI Eric. Ltd.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
