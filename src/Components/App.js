import React from "react";
import FetchDataFromRssFeed from "./FetchDataFromRssFeed";
import NavBar from "./NavBar";
import "./NavBar.css";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "./FetchDataFromRssFeed.css";
import NotFoundPage from "./NotFoundPage";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import HomePage from "./HomePage";

export default class App extends React.Component {
    render() {
        return (
            <div className="main-app">
                <nav>
                    <NavBar />
                </nav>
                <main className="app">
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route path="/Login" component={Login} />
                        <Route
                            path="/CreateAccount"
                            component={CreateAccount}
                        />
                        <Route
                            path="/FetchDataFromRssFeed"
                            component={FetchDataFromRssFeed}
                        />

                        <Route component={NotFoundPage} />
                    </Switch>
                </main>
            </div>
        );
    }
}
