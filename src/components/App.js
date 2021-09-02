import "../App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import api from "../api/contacts";
import UpdateContact from "./UpdateContact";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function retrieveContacts() {
    const res = await api.get("/contacts");
    return res.data;
  }

  async function addContact(contact) {
    const req = {
      id: uuid(),
      ...contact,
    };

    const res = await api.post("/contacts", req);
    setContacts([...contacts, res.data]);
  }

  async function removeContact(id) {
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  }

  async function updateContact(contact) {
    const res = await api.put(`/contacts/${contact.id}`, contact);
    const { id } = res.data;
    setContacts(
      contacts.map((contact) => (contact.id === id ? { ...res.data } : contact))
    );
  }

  useEffect(() => {
    /* const getContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (getContacts) setContacts(getContacts); */

    async function getAllContacts() {
      const contactsList = await retrieveContacts();
      if (contactsList) setContacts(contactsList);
    }

    getAllContacts();
  }, []);

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
