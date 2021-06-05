import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Alert } from "react-bootstrap";
import { messageRequest } from "../../redux/actions/contact/index";

const Contact = () => {
  const error = useSelector((state) => state.sendMessage.error);
  const msg = useSelector((state) => state.sendMessage.msg);
  const isLoading = useSelector((state) => state.sendMessage.isLoading);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    const contactForm = document.querySelector(".contact__form");
    e.preventDefault();

    const Name = contactForm.name.value;
    const Email = contactForm.email.value;
    const Message = contactForm.message.value;

    dispatch(messageRequest(Name, Email, Message));
  };
  if (msg) {
    setTimeout(() => {
      document.querySelector(".contact__form").reset();
    }, 2000);
  }
  return (
    <div className="contact section" id="contact">
      <h2 className="section-title">Contact</h2>

      <div className="contact__container bd-grid">
        <form action="" className="contact__form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="contact__input"
          />
          <input
            type="mail"
            placeholder="Email"
            name="email"
            className="contact__input"
          />
          <textarea
            name="message"
            id=""
            cols="0"
            rows="5"
            className="contact__input"
          ></textarea>
          {error ? (
            <Alert style={{ textAlign: "center" }} variant="danger">
              {error}
            </Alert>
          ) : null}
          {msg ? (
            <Alert style={{ textAlign: "center" }} variant="success">
              {msg}
            </Alert>
          ) : null}
          {isLoading ? (
            <div style={{ textAlign: "center" }}>
              <Spinner animation="border" size="lg" role="status" />
            </div>
          ) : (
            <button type="submit" className="contact__button button">
              Send
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
