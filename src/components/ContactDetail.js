import React from "react";
import { Link } from "react-router-dom";
import reef from "../reef.jpg";

function ContactDetail(props) {
  const { name, email } = props.location.state;
  return (
    <div className="container is-flex is-justify-content-center">
      <div className="box" style={{ width: "340px", height: "500px" }}>
        <div className="box" style={{ width: "300px", height: "400px" }}>
          <figure className="image is-square">
            <img src={reef} alt="reef" />
          </figure>
          <div className="block"></div>
          <p className="title is-4">{name}</p>
          <p className="subtitle is-6">{email}</p>
        </div>
        <Link to="/">
          <button className="button is-link">Go Back To Contacts List</button>
        </Link>
      </div>
    </div>
  );
}

export default ContactDetail;
