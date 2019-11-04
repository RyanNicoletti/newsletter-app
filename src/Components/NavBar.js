import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { navBar_class: "" };
  }

  setToggleNavBarClass = e => {
    e.preventDefault();
    if (this.state.navBar_class === "") {
      this.setState({ navBar_class: "toggled" });
    } else {
      this.setState({ navBar_class: "" });
    }
  };

  render() {
    let topNavBarClass = `top-menu-${this.state.navBar_class}`;
    return (
      <nav className="nav-container">
        <div className={topNavBarClass}>
          <ul className="nav-item-list">
            <li>
              <Link className="nav-links" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/Createaccount">
                Create Account
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/Login">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <FontAwesomeIcon
          icon={faBars}
          size="lg"
          className="top-menu-icon"
          onClick={e => this.setToggleNavBarClass(e)}
        />

        <ul className="top-nav-item-list">
          <li>
            <Link className="top-nav-links" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="top-nav-links" to="/Createaccount">
              Create Account
            </Link>
          </li>
          <li>
            <Link className="top-nav-links" to="/Login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
