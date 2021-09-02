import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";

function ContactList({ contacts, removeContact, searchTerm, searchHandler }) {
  useEffect(() => {
    document.title = "Home | Contact Manager";
  }, []);

  const inputElement = useRef("");

  function getSearchTerm() {
    searchHandler(inputElement.current.value);
  }

  const renderContactList = contacts.map((contact) => (
    <>
      <ContactCard
        key={contact.id}
        {...contact}
        removeContact={removeContact}
      />
      <hr />
    </>
  ));

  return (
    <div className="box">
      <div className="is-flex is-justify-content-space-between is-align-items-center">
        <h2 className="subtitle is-2">Contacts List</h2>
        <Link to="/add">
          <button className="button is-outlined is-link">Add Contact</button>
        </Link>
      </div>

      <div className="block">
        <div className="field">
          <p className="control has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Enter Search Term"
              value={searchTerm}
              onChange={getSearchTerm}
              ref={inputElement}
            />
            <span className="icon is-small is-right">
              <i className="fas fa-search"></i>
            </span>
          </p>
        </div>
      </div>

      {renderContactList.length > 0 ? (
        renderContactList
      ) : (
        <h2 className="subtitle is-4">No Contacts Found</h2>
      )}
    </div>
  );
}

export default ContactList;
