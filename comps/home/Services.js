import React from "react";
import ui_ux from "../../public/images/ui_ux.svg";
import responsive from "../../public/images/responsive.svg";
import frontend from "../../public/images/frontend.svg";
import optimization from "../../public/images/optimization.svg";
import database from "../../public/images/database.svg";
import backend from "../../public/images/backend.svg";
import Image from "next/image";
import styles from "./index.module.scss";

const Services = () => {
  return (
    <div className="services__container" id="services">
      <br />
      <h2 className="section-title">Services</h2>

      <div className="row">
        <div className="col-md-6 col-lg-4">
          <div className={styles.box}>
            <div className={`${styles.our_services} ${styles.settings}`}>
              <div className={styles.icon}>
                <Image src={ui_ux} priority quality={25} />
              </div>
              <h6>UI/UX DESIGN</h6>
              <p>
                Translating requirements into style design patterns and create
                user flows, wireframes, prototypes and mockups.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className={styles.box}>
            <div className={`${styles.our_services} ${styles.speedup}`}>
              <div className={styles.icon}>
                <Image src={optimization} priority quality={25} />
              </div>
              <h6>SEO</h6>
              <p>
                Monitoring search algorithms set by search engine and developing
                and integrating content marketing strategies.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className={styles.box}>
            <div className={`${styles.our_services} ${styles.privacy}`}>
              <div className={styles.icon}>
                <Image src={backend} priority quality={25} />
              </div>
              <h6>BACKEND DEVELOPMENT</h6>
              <p>
                Building and maintaining web applications,boosting current
                applications and managing hosting environments.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className={styles.box}>
            <div className={`${styles.our_services} ${styles.backups}`}>
              <div className={styles.icon}>
                <Image src={responsive} priority quality={25} />
              </div>
              <h6>RESPONSIVE WEB DESIGN</h6>
              <p>
                create content that adjusts smoothly to various screen sizes to
                automatically adapt to the browser space.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className={styles.box}>
            <div className={`${styles.our_services} ${styles.ssl}`}>
              <div className={styles.icon}>
                <Image src={database} />
              </div>
              <h6>DATABASE MANAGEMENT</h6>
              <p>
                Develop and maintain databases. Create data storage and
                retrieval systems, troubleshoot database issues.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className={styles.box}>
            <div className={`${styles.our_services} ${styles.database}`}>
              <div className={styles.icon}>
                <Image src={frontend} priority quality={25} />
              </div>
              <h6>FRONTEND DEVELOPMENT</h6>
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
