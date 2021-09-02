import React from "react";
import { Link } from "react-router-dom";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    showAlert: false,
  };

  componentDidMount() {
    document.title = "Add Contact | Contact Manager";
  }

  add = (e) => {
    e.preventDefault();
    if (this.state.name === "" || this.state.email === "") {
      this.setState({ showAlert: true });
      return;
    }
    this.setState({ showAlert: false });
    this.props.addContact(this.state);
    this.setState({ name: "", email: "" });
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="box">
        <div className="is-flex is-justify-content-space-between is-align-items-center">
          <h2 className="subtitle is-2">Add Contact</h2>
          <Link to="/">
            <button className="button is-outlined is-link">
              Go To Contacts List
            </button>
          </Link>
        </div>
        <form onSubmit={this.add}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter Name"
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                placeholder="Enter Email"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
          </div>
          <div
            hidden={!this.state.showAlert}
            className="notification is-warning"
            style={{ marginTop: "20px" }}
          >
            <button
              className="delete"
              onClick={() => this.setState({ showAlert: false })}
            ></button>
            <strong>Missing or Incorrect Credentials</strong>
            <br />
            Please ensure that you have provided the input in correct format.
            Check if your email address is complete as well. Also check if you
            have filled all the necessary fields.
          </div>
          <div className="control">
            <button className="button is-outlined is-primary">Add</button>
          </div>
        </form>
      </div>
    );
  }
}

export default AddContact;
