import React, { Component } from "react";
import "./FetchDataFromRssFeed.css";

export default class FetchDataFromRssFeed extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      value: "",
      newsLetterTitle: ""
    };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleTitleChange = e => {
    this.setState({ newsLetterTitle: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let url = `https://api.rss2json.com/v1/api.json?rss_url=${this.state.value}`;
    const newUrl = { title: this.state.newsLetterTitle, rssUrl: url };
    fetch("https://aqueous-caverns-36239.herokuapp.com/urls", {
      method: "POST",
      body: JSON.stringify(newUrl),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong!");
        }
        res.json();
      })
      .then(data => console.log(data));
  };

  async parseRSSToJSON(url) {
    try {
      const response = await fetch(url);
      const json = await response.json();

      this.setState({ items: json.items });
      console.log("the function is working");
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const arrayOfNewsLetters = this.state.items.slice(0, 4).map((item, i) => (
      <div className="newsletter-card">
        <li key={i} className="item-title">
          {item.title} <br></br>
          <a key={i} className="item-link" href={item.link}>
            {item.link}
          </a>
        </li>
      </div>
    ));
    return (
      <div className="rss-form">
        <form onSubmit={this.handleSubmit}>
          <div className="label-input-wrapper">
            <label htmlFor="newsletter-name">Name of Newsletter</label>
            <input
              type="text"
              value={this.state.newsLetterTitle}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className="label-input-wrapper">
            <label htmlFor="RSSURL">
              Add an RSS Feed URL from Your Favorite Newsletters:
            </label>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button type="submit" className="fetch-newsletter-button">
              Get News Letter
            </button>
          </div>
        </form>
        <ul className="newsletter-list">{arrayOfNewsLetters}</ul>
      </div>
    );
  }
}
