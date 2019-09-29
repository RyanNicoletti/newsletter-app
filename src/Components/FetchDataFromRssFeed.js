import React, { Component } from "react";
import "./FetchDataFromRssFeed.css";

export default class FetchDataFromRssFeed extends Component {
    constructor() {
        super();
        this.state = {
            items: [],
            value: ""
        };
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        let url = `https://api.rss2json.com/v1/api.json?rss_url=${this.state.value}`;
        this.parseRSSToJSON(url);
    };

    async parseRSSToJSON(url) {
        try {
            const response = await fetch(url);
            const json = await response.json();
            this.setState({ items: json.items });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        console.log(this.state);
        const arrayOfNewsLetters = this.state.items
            .slice(0, 4)
            .map((item, i) => (
                <div className="newsletter-card">
                    <li key={i} className="item-title">
                        {item.title} <br></br>
                        <a className="item-link" href={item.link}>
                            {item.link}
                        </a>
                    </li>
                </div>
            ));
        return (
            <div className="rss-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="label-input-wrapper">
                        <label htmlFor="RSSURL">
                            Add an RSS Feed URL from Your Favorite Newsletters:
                        </label>
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        <button
                            type="submit"
                            className="fetch-newsletter-button"
                        >
                            Get News Letter
                        </button>
                    </div>
                </form>

                <ul className="newsletter-list">{arrayOfNewsLetters}</ul>
            </div>
        );
    }
}
