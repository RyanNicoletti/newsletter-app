import React from "react";
import ValidationErrorMessage from "./ValidationErrorMessage";
import "./createaccount.css";

export default class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: {
        value: "",
        touched: false
      },
      password: {
        value: "",
        touched: false
      },
      repeatPassword: {
        value: "",
        touched: false
      }
    };
  }

  handleEmailChange(email) {
    this.setState({ email: { value: email, touched: true } });
  }

  handlePasswordChange(password) {
    this.setState({ password: { value: password, touched: true } });
  }

  handleRepeatPasswordChange(repeatPassword) {
    this.setState({
      repeatPassword: { value: repeatPassword, touched: true }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push("/FetchDataFromRssFeed");
    const newUser = {
      email: this.state.email.value,
      password: this.state.password.value
    };

    fetch("https://aqueous-caverns-36239.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (!res.ok) {
        throw new Error("something went wrong");
      }
      return res.json();
    });
  }

  validateEmail() {
    const email = this.state.email.value.trim();
    if (email.length === 0) {
      return "Email is required";
    } else if (email.length < 3) {
      return "Email must be at least 3 characters long";
    }
  }

  validatePassword() {
    const password = this.state.password.value.trim();
    if (password.length === 0) {
      return "Password is required";
    } else if (password.length < 6 || password.length > 72) {
      return "Password must be between 6 and 72 characters long";
    } else if (!password.match(/[0-9]/)) {
      return "Password must contain at least one number";
    }
  }

  validateRepeatPassword() {
    const repeatPassword = this.state.repeatPassword.value.trim();
    const password = this.state.password.value.trim();
    if (repeatPassword !== password) {
      return "Passwords do not match";
    }
  }

  render() {
    const emailError = this.validateEmail();
    const passwordError = this.validatePassword();
    const repeatPasswordError = this.validateRepeatPassword();
    return (
      <form className="registration" onSubmit={e => this.handleSubmit(e)}>
        <h2 className="create-account-header">Create An Account</h2>
        <div className="registration-flex-container">
          <div className="form-group">
            <label htmlFor="name" className="create-account-labels">
              Email *
            </label>
          </div>
          <input
            type="text"
            value={this.state.email.value}
            className="registration-input-email"
            name="email"
            id="email"
            onChange={e => this.handleEmailChange(e.target.value)}
          />
          {this.state.email.touched && (
            <ValidationErrorMessage
              message={emailError}
            ></ValidationErrorMessage>
          )}
          <div className="form-group">
            <label htmlFor="password" className="create-account-labels">
              Password *
            </label>
          </div>
          <input
            type="password"
            value={this.state.password.value}
            className="registration-input-pw"
            name="password"
            id="password"
            onChange={e => this.handlePasswordChange(e.target.value)}
          />
          <div className="registration-form-hint">
            6 to 70 characters, must include a number
          </div>
          {this.state.password.touched && (
            <ValidationErrorMessage message={passwordError} />
          )}
          <div className="form-group">
            <label htmlFor="repeatPassword" className="create-account-labels">
              Repeat Password*
            </label>
          </div>
          <input
            type="password"
            value={this.state.repeatPassword.value}
            className="registration-input-repeat-pw"
            name="repeatPassword"
            id="repeatPassword"
            onChange={e => this.handleRepeatPasswordChange(e.target.value)}
          />
          {this.state.repeatPassword.touched && (
            <ValidationErrorMessage message={repeatPasswordError} />
          )}
        </div>
        <div className="registration-form-hint">* required field</div>

        <div className="registration-button-group">
          <button
            type="submit"
            className="registration-button"
            disabled={
              this.validateEmail() ||
              this.validatePassword() ||
              this.validateRepeatPassword()
            }
          >
            Create Account
          </button>
        </div>
      </form>
    );
  }
}
