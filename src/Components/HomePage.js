import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <header>
          <h1>Weekly Bundle</h1>
          <h3>
            Store all your weekly newsletters in one place and free up your
            inbox.
          </h3>
        </header>
        <main>
          <p>Subscribe to all your favorite weekly newsletters</p>
          <p>Avoid spam.</p>
          <p>
            Simply copy and paste any URL from the RSS feed of your favorite
            newsletters.
          </p>
          <p>
            Sign up to get started:
            <Link className="nav-links" to="/Createaccount">
              Create Account
            </Link>
          </p>
        </main>
      </>
    );
  }
}
