import React from "react";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isClicked: false };
    }

    openMenu(event) {
        event.preventDefault();
        const previousMenuState = this.state.isClicked;
        this.setState({ isClicked: !previousMenuState });
    }

    render() {
        return (
            <div className="navbar">
                <nav className="nav">
                    <div className="hamburger-container" id="hamburger-menu">
                        <button
                            className="hamburger"
                            onClick={event => this.openMenu(event)}
                        >
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                            <div className="hamburger-line"></div>
                        </button>
                    </div>

                    <div className="navbar-logo">Weekly NewsFeed</div>
                    <div className="flex-space" />
                    <div
                        className={
                            !this.state.isClicked ? "nav-items" : "display-menu"
                        }
                    >
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/Createaccount">Create Account</Link>
                            </li>
                            <li>
                                <Link to="/Login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
