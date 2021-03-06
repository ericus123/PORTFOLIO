import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "react-bootstrap-icons";
import ScrolButton from "../reusables/ScrollUp";
import About from "../comps/home/About";
import Skills from "../comps/home/Skills";
import Contact from "../comps/home/Contact";
import Services from "../comps/home/Services";
import Head from "next/head";
import HomeImage from "../comps/home/HomeImage";

const Home = () => {
  const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const pro_image = "https://res.cloudinary.com/amanis/image/upload/v1654693153/SEO/IMG_9592-2-min_6_1_zkyl9e.jpg";
  const scrolToSection = (id) => {
    const anchor = process.browser ? document.querySelector(id) : null;
    anchor.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>AMANI Eric | Home</title>

        <meta
          name="description"
          content="Home for programming tutorials and tech trends."
        />

        {/* Open Graph / Facebook  */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={frontendURL} />
        <meta property="og:title" content="AMANI Eric" />
        <meta
          property="og:description"
          content="Home for programming tutorials and trends."
        />
        <meta property="og:image" content={pro_image} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={frontendURL} />
        <meta property="twitter:title" content="AMANI Eric" />
        <meta
          property="twitter:description"
          content="Home for programming tutorials and trends."
        />
        <meta property="twitter:image" content={pro_image}></meta>
      </Head>
      <div className="home bd-grid" id="home">
        <ScrolButton />
        <div className="home__data">
          <h1 className="home__title">
            Hi,
            <br />
            I&apos;m <span className="home__title-color">Amani</span>
            <br />
            Web Developer
          </h1>
          <Link
            href="#contact"
            onClick={() => {
              scrolToSection("#contact");
            }}
          >
            <div
              style={{ textDecoration: "none", cursor: "pointer" }}
              className="button"
            >
              Contact
            </div>
          </Link>
        </div>

        <div className="home__social">
          <a href="https://twitter.com/amaniericus" className="footer__icon">
            <i>
              <Twitter color="#000" />
            </i>
          </a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/amani-eric-b45986172/"
            className="footer__icon"
            rel="noreferrer"
          >
            <i>
              <Linkedin color="#000" />
            </i>
          </a>

          <a
            target="_blank"
            href="https://github.com/ericus123"
            className="footer__icon"
            rel="noreferrer"
          >
            <i>
              <Github color="#000" />
            </i>
          </a>
        </div>
        <div className="home__img">
          <HomeImage />
        </div>
      </div>
      <About />
      <Skills />
      <Services />
      <Contact />
      <br />
    </>
  );
};
export default Home;
