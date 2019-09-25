import React, { Component } from "react";
import FetchDataFromRssFeed from "./FetchDataFromRssFeed";
import { Route } from "react-router-dom";

export default class LoginForm extends Component {
    static defaultProps = {
        onLoginSuccess: () => {}
    };

    state = { error: null };

    handleSubmitBasicAuth = ev => {
        ev.preventDefault();
        const { user_name, password } = ev.target;

        console.log("login form submitted");
        console.log({ user_name, password });

        user_name.value = "";
        password.value = "";
        this.props.onLoginSuccess();
    };

    routeToUsersFeed = () => {
        this.props.history.push("/FetchDataFromRssFeed");
    };

    render() {
        const { error } = this.state;
        return (
            <form className="LoginForm">
                <div role="alert">
                    {error && <p className="red">{error}</p>}
                </div>
                <div className="user_name">
                    <label htmlFor="LoginForm__user_name">User name</label>
                    <input name="user_name" id="LoginForm__user_name"></input>
                </div>
                <div className="password">
                    <label htmlFor="LoginForm__password">Password</label>
                    <input
                        name="password"
                        type="password"
                        id="LoginForm__password"
                    ></input>
                </div>

                <button type="submit" onClick={this.routeToUsersFeed}>
                    Login
                </button>
            </form>
        );
    }
}

// form validation: onSubmit={this.handleSubmitBasicAuth}
