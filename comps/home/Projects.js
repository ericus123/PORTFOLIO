import React from "react";
import { Button, Row, Col, Carousel } from "react-bootstrap";
import image from "../";
import Image from "next/image";

const Projects = () => {
  return (
    <div className="projects">
      <Carousel>
        <Image src={image} style={{ borderRadius: "1%" }} />
        {[1, 2, 3, 4, 5].map(() => (
          <Carousel.Item>
            <Row>
              <Col className="project-desc">
                <h3>Project title</h3>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.{" "}
                </p>
                <div>
                  <Button className="codes-btn">Codes</Button>
                  <Button className="visit-btn">Visit App</Button>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Projects;
