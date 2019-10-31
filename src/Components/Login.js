import React, { Component } from "react";
import "./login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      }
    };
  }

  handleEmailChange(email) {
    this.setState({ username: { value: email, touched: true } });
  }
  handlePasswordChange(password) {
    this.setState({ password: { value: password, touched: true } });
  }
  routeToUsersFeed = () => {
    this.props.history.push("/FetchDataFromRssFeed");
  };
  render() {
    return (
      <form className="login-form">
        <h2 className="login-header">Login</h2>
        <div className="login-container">
          <div className="form-group">
            <label htmlFor="username" className="login-labels">
              Email
            </label>
          </div>
          <input
            type="email"
            value={this.state.username.value}
            className="login-email-input"
            name="email"
            id="email"
            onChange={e => this.handleEmailChange(e.target.value)}
          />
          <div className="form-group">
            <label htmlFor="password" className="login-labels">
              Password
            </label>
          </div>
          <input
            type="password"
            value={this.state.password.value}
            className="login-pw-input"
            name="password"
            id="password"
            onChange={e => this.handlePasswordChange(e.target.value)}
          />
        </div>
        <div className="login-button-container">
          <button
            type="submit"
            className="login-button"
            onClick={this.routeToUsersFeed}
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}
