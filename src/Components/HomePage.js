import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class HomePage extends Component {
  render() {
    return (
      <>
        <header>
          <h1>A New Place to Get Weekly Newsletters</h1>
          <h3>All your weekly news letters, in one place.</h3>
        </header>
        <main>
          <p>
            Why use Weekly Bulletin?<br></br>
            Newsletters are great, but can quickly lead to a cluttered inbox.
            <br></br>
            With Weekly Bulletin, you can avoid email spam and get newsletters
            delivered directly to your home-page.
          </p>
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
