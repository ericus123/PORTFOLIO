import React from "react";
import ui_ux from "../../assets/images/ui_ux.svg";
import responsive from "../../assets/images/responsive.svg";
import frontend from "../../assets/images/frontend.svg";
import optimization from "../../assets/images/optimization.svg";
import database from "../../assets/images/database.svg";
import backend from "../../assets/images/backend.svg";

const Services = () => {
  return (
    <div className="container-fluid mb-5">
      <br />
      <h2 className="section-title">Services</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="box">
            <div className="our-services settings">
              <div className="icon">
                <img src={ui_ux} />
              </div>
              <h4>UI/UX DESIGN</h4>
              <p>
                Translating requirements into style design patterns and create
                user flows, wireframes, prototypes and mockups.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <div className="our-services speedup">
              <div className="icon">
                <img src={optimization} />
              </div>
              <h4>SEO</h4>
              <p>
                Monitoring search algorithms set by search engine and developing
                and integrating content marketing strategies.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <div className="our-services privacy">
              <div className="icon">
                <img src={backend} />
              </div>
              <h4>BACKEND DEVELOPMENT</h4>
              <p>
                Building and maintaining web applications,boosting current
                applications and managing hosting environments.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="box">
            <div className="our-services backups">
              <div className="icon">
                <img src={responsive} />
              </div>
              <h4>RESPONSIVE WEB DESIGN</h4>
              <p>
                create content that adjusts smoothly to various screen sizes to
                automatically adapt to the browser space.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <div className="our-services ssl">
              <div className="icon">
                <img src={database} />
              </div>
              <h4>DATABASE MANAGEMENT</h4>
              <p>
                Develop and maintain databases. Create data storage and
                retrieval systems, troubleshoot database issues.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box">
            <div className="our-services database">
              <div className="icon">
                <img src={frontend} />
              </div>
              <h4>FRONTEND DEVELOPMENT</h4>
              <p>
                {" "}
                Implementing visual elements and combining the art of design
                with the science of programming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
