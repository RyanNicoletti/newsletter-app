import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./homepage.css";

export default class HomePage extends Component {
  render() {
    return (
      <div className="homepage-container">
        <header>
          <h1>Newsletter Digest</h1>
          <h3>
            Store all your weekly newsletters in one place and free up your
            inbox.
          </h3>
        </header>
        <main>
          <p>Subscribe to your favorite weekly newsletters</p>
          <p>
            Simply copy and paste the link to an RSS feed of your favorite
            newsletters
          </p>
          <Link className="nav-links" to="/Createaccount">
            <button className="create-account-button">
              Create An Account To Get Started
            </button>
          </Link>
        </main>
      </div>
    );
  }
}
