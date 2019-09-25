import React from "react";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
    render() {
        return (
            <div className="navbar">
                <nav className="nav">
                    <div></div>
                    <div className="navbar-logo">Weekly NewsFeed</div>
                    <div className="flex-space" />
                    <div className="nav-items">
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
