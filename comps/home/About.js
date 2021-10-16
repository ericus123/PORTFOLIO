import Head from "next/head";
import React from "react";
import about from "../../assets/images/about.jpg";

const About = () => {
  return (
    <>
      {/* <Head>
            <title>AMANI Eric | About</title>
<meta name="description" content="I'm Amani,
a full stack web developer focused on crafting great web experiences. 
I'm usually writing a lot of JavaScript 🛠️
I love working with Node.js,react and Figma 🎨
Ping me if you need help (or just wanna' chat) 🤖
"/>
    </Head> */}
      <div className="about section " id="about">
        <h2 className="section-title">About</h2>

        <div className="about__container bd-grid">
          <div className="about__img">
            <img src={about} alt="" />
          </div>

          <div>
            <h2 className="about__subtitle">I'm Amani</h2>
            <p className="about__text">
              A full stack web developer focused on crafting great web
              experiences.
              <br />
              Apart from web development I'm also an electronic hobbyist mainly
              working with electronics hardware repairs , installation and
              programming
              <br />
              I'm usually writing a lot of JavaScript 🛠️ I love working with
              Node.js,react and Figma 🎨 Ping me if you need help (or just
              wanna' chat) 🤖
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
