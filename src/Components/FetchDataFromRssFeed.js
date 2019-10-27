import React, { Component } from "react";
import "./FetchDataFromRssFeed.css";

export default class FetchDataFromRssFeed extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      value: "",
      newsLetterTitle: "",
      titlesMappedToLetters: []
    };
  }

  fetchLetters() {
    fetch("https://aqueous-caverns-36239.herokuapp.com/urls", {
      headers: {}
    }).then(res =>
      !res.ok
        ? res.json().then(e => Promise.reject(e))
        : res.json().then(data => {
            const feedTitles = [];
            data.map(feed => feedTitles.push(feed.title));
            console.log(feedTitles);
            this.setState({ newsLetterTitle: feedTitles });
            let uniqueUrls = [...new Set(data.map(_ => _.rssurl))];
            console.log(uniqueUrls);
            const newsLetters = uniqueUrls.map(url =>
              fetch(url).then(_ => _.json())
            );
            Promise.all(newsLetters).then(responses => {
              const items = responses
                .filter(response => response.status === "ok")

                .map(_ => _.items.slice(0, 4));
              console.log(items);
              this.setState({ items });
              const labeledLetters = this.state.newsLetterTitle.reduce(
                (obj, key, index) => ({
                  ...obj,
                  [key]: this.state.items[index]
                }),
                {}
              );
              this.setState({ titlesMappedToLetters: labeledLetters });
              console.log(labeledLetters);
            });
          })
    );
  }

  componentDidMount() {
    this.fetchLetters();
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
    // user_ref_id will be hard coded until auth/sessions are added for the sake of time
    const hardCodedUserId = 1;
    const newUrl = {
      title: this.state.newsLetterTitle,
      rssurl: url,
      user_ref_id: hardCodedUserId
    };
    fetch("https://aqueous-caverns-36239.herokuapp.com/urls", {
      method: "POST",
      body: JSON.stringify(newUrl),
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      res.json();
    });
  };

  render() {
    const titlesArray = Object.keys(this.state.titlesMappedToLetters);
    const arrayOfNewsLetters = titlesArray.map((title, i) => (
      <div key={i} className="title-with-articles">
        <h2 className="newsletter-title">{title}</h2>
        {this.state.titlesMappedToLetters[title].map((article, i) => (
          <div className="newsletter-card" key={i}>
            <li key={i} className="item-title">
              {article.title} <br></br>
              <a key={i} className="item-link" href={article.link}>
                {article.link}
              </a>
            </li>
          </div>
        ))}
      </div>
    ));

    return (
      <>
        <div className="rss-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-heading">Add an RSS Feed to Your Account</div>
            <div className="label-input-wrapper">
              <label htmlFor="newsletter-name">Add a Title</label>
            </div>
            <input
              type="text"
              onChange={this.handleTitleChange}
              value={this.state.newsLetterTitle}
              placeholder="ex: Frontend Focus"
              className="title-input"
            />
            <div className="label-input-wrapper">
              <label htmlFor="RSSURL">Add the URL of the RSS Feed</label>
            </div>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="ex: https://frontendfoc.us/rss/1nm7je3m"
              className="url-input"
            />
            <button type="submit" className="fetch-newsletter-button">
              Submit
            </button>
          </form>
        </div>
        <ul className="newsletter-list">{arrayOfNewsLetters}</ul>
      </>
    );
  }
}
