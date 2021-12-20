import React from "react";
import about from "../../public/images/about.jpg";
import Image from "next/image";
import styles from "./index.module.scss";
import Resume from "./Resume";

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
          <div className={styles.about_img}>
            <Image src={about} priority quality={25} />
          </div>

          <div>
            <h2 className="about__subtitle">I&apos;m Amani</h2>
            <p className="about__text">
              A full stack web developer focused on crafting great web
              experiences.
              <br />
              Apart from web development I&apos;m also an electronic hobbyist
              mainly working with electronics hardware repairs , installation
              and programming
              <br />
              I&apos;m usually writing a lot of JavaScript 🛠️ I love working
              with Node.js,react and Figma 🎨 Ping me if you need help (or just
              wanna&apos; chat) 🤖
            </p>
            <Resume />
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
