import React, { Component } from "react";

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
        const arrayOfNewsLetters = this.state.items.map((item, i) => (
            <li key={i}>
                {item.title} <br></br>
                <a href={item.link}>{item.link}</a>
            </li>
        ));
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="RSSURL">
                        Add an RSS Feed URL from Your Favorite Newsletters:
                        <input
                            type="text"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                </form>
                <ul>{arrayOfNewsLetters}</ul>
            </>
        );
    }
}

// array.slice
