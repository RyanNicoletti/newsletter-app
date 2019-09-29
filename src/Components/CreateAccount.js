import React from "react";
import ValidationErrorMessage from "./ValidationErrorMessage";

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
        const { email, password, repeatPassword } = this.state;
        console.log("email:", email.value);
        console.log("password:", password.value);
        console.log("repeatPassword:", repeatPassword.value);
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

    routeToUsersFeed = () => {
        this.props.history.push("/FetchDataFromRssFeed");
    };

    render() {
        const emailError = this.validateEmail();
        const passwordError = this.validatePassword();
        const repeatPasswordError = this.validateRepeatPassword();
        return (
            <form className="registration" onSubmit={e => this.handleSubmit(e)}>
                <h2>Sign Up</h2>
                <div className="registration-form-hint">* required field</div>
                <div className="form-group">
                    <label htmlFor="name">Email *</label>
                    <input
                        type="text"
                        value={this.state.email.value}
                        className="registration-input"
                        name="email"
                        id="email"
                        onChange={e => this.handleEmailChange(e.target.value)}
                    />
                    {this.state.email.touched && (
                        <ValidationErrorMessage
                            message={emailError}
                        ></ValidationErrorMessage>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                        type="password"
                        value={this.state.password.value}
                        className="registration-input"
                        name="password"
                        id="password"
                        onChange={e =>
                            this.handlePasswordChange(e.target.value)
                        }
                    />
                    <div className="registration-form-hint">
                        6 to 70 characters, must include a number
                    </div>
                    {this.state.password.touched && (
                        <ValidationErrorMessage message={passwordError} />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="repeatPassword">Repeat Password *</label>
                    <input
                        type="password"
                        value={this.state.repeatPassword.value}
                        className="registration-input"
                        name="repeatPassword"
                        id="repeatPassword"
                        onChange={e =>
                            this.handleRepeatPasswordChange(e.target.value)
                        }
                    />
                    {this.state.repeatPassword.touched && (
                        <ValidationErrorMessage message={repeatPasswordError} />
                    )}
                </div>
                <div className="registration-button-group">
                    <button
                        type="submit"
                        className="registration-button"
                        disabled={
                            this.validateEmail() ||
                            this.validatePassword() ||
                            this.validateRepeatPassword()
                        }
                        onClick={this.routeToUsersFeed}
                    >
                        Create Account
                    </button>
                </div>
            </form>
        );
    }
}
