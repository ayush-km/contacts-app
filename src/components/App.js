import "../App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import UpdateContact from "./UpdateContact";
import { db } from "../config/firebase_config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  /* retrieve contacts */
  const contactRef = db.collection("contacts");
  const query = contactRef.orderBy("createdAt");
  const [contactsList] = useCollectionData(query, { idField: "id" });

  async function addContact(contact) {
    const { name, email, showAlert } = contact;

    await db.collection("contacts").add({
      name: name,
      email: email,
      showAlert: showAlert,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  async function removeContact(id) {
    await db.collection("contacts").doc(id).delete();
  }

  async function updateContact(contact) {
    const { id, name, email, showAlert } = contact;

    await db.collection("contacts").doc(id).set({
      name: name,
      email: email,
      showAlert: showAlert,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  useEffect(() => {
    if (contactsList) setContacts(contactsList);
  }, [contactsList]);

  function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactsList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactsList);
    } else setSearchResults(contacts);
  }

  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <ContactList
                {...props}
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                removeContact={removeContact}
                searchTerm={searchTerm}
                searchHandler={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addContact={addContact} />
            )}
          />
          <Route
            path="/update"
            render={(props) => (
              <UpdateContact {...props} updateContact={updateContact} />
            )}
          />
          <Route
            path="/contact/:id"
            render={(props) => <ContactDetail {...props} />}
          />
        </Switch>
        {/* <AddContact addContact={addContact} />
        <ContactList
          key={contacts.id}
          contacts={contacts}
          removeContact={removeContact}
        /> */}
      </Router>
    </div>
  );
}

export default App;
