import React, { useState } from "react";
import { Link } from "react-router-dom";

function ContactCard({ id, name, email, removeContact }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="is-flex is-justify-content-space-between is-align-items-center">
      <div className="is-flex is-align-items-center">
        <span className="icon fa-2x" style={{ marginRight: "15px" }}>
          <i className="fas fa-user-circle"></i>
        </span>
        <Link
          to={{
            pathname: `/contact/${id}`,
            state: { id, name, email },
          }}
        >
          <p className="title is-4">{name}</p>
          <p className="subtitle is-6">{email}</p>
        </Link>
      </div>
      <div>
        <Link
          to={{
            pathname: `/update`,
            state: { id, name, email },
          }}
        >
          <span
            style={{ cursor: "pointer", marginRight: "10px" }}
            className="icon has-text-info"
          >
            <i className="fas fa-edit"></i>
          </span>
        </Link>

        <span
          style={{ cursor: "pointer" }}
          className="icon has-text-danger"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </div>
      {showModal && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Delete Contact?</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setShowModal(false)}
              ></button>
            </header>
            <section className="modal-card-body">
              Are you sure you want to delete this contact?
              <div className="block"></div>
              <p className="title is-4">
                <strong>{name}</strong>
              </p>
              <p className="subtitle is-6">
                <strong>{email}</strong>
              </p>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-flex-end">
              <button
                className="button is-danger"
                onClick={() => removeContact(id)}
              >
                Delete
              </button>
              <button className="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactCard;
