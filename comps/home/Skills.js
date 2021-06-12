import React from "react";
import skills_image from "../../assets/images/skills.webp";

const Skills = () => {
  return (
    <div className="skills section" id="skills">
      <h2 className="section-title">Skills</h2>

      <div className="skills__container bd-grid">
        <div>
          <h2 className="skills__subtitle">Technical Skills</h2>
          <div>
            <h4>Web Development</h4>
            <p>
              <i>
                PostgreSQL • Mongo DB • Express JS • Node JS • HTML • CSS •
                Vanilla JS • REACT/REDUX • CI & CD • TDD • BOOTSTRAP • MATERIAL
                UI • FIREBASE • SOCKETS.IO • Agile/Scrum methodology •
                Performance and scalability • Optimization • API design •
                Responsive design • Debugging • Server-side scripting • OOP
              </i>
            </p>
            <br />
            <h4>Electronics</h4>
            <p>
              <i>
                &nbsp;pcb design&nbsp; |&nbsp;microcontroler programming&nbsp;
                |&nbsp;hardware programming with arduino&nbsp; | &nbsp;install &
                repair fire detector system &nbsp; | &nbsp;circuit design&nbsp;
                | &nbsp;cctv camera system installation & repair&nbsp; |
                &nbsp;electronics repair&nbsp;{" "}
              </i>
            </p>
          </div>
        </div>

        <div>
          <img src={skills_image} alt="" className="skills__img" />
        </div>
      </div>
    </div>
  );
};

export default Skills;
