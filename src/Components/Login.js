import React, { Component } from "react";

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
            <form className="login">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Email</label>
                    <input
                        type="email"
                        value={this.state.username.value}
                        className="login-input"
                        name="email"
                        id="email"
                        onChange={e => this.handleEmailChange(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={this.state.password.value}
                        className="login=input"
                        name="password"
                        id="password"
                        onChange={e =>
                            this.handlePasswordChange(e.target.value)
                        }
                    />
                </div>
                <div className="login-button">
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
