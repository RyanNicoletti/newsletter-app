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

  // fetchLetters() {
  //   fetch("https://aqueous-caverns-36239.herokuapp.com/urls", {
  //     headers: {}
  //   }).then(res =>
  //     !res.ok
  //       ? res.json().then(e => Promise.reject(e))
  //       : res.json().then(data => {
  //           let lettersUrlArray = [];
  //           for (let i = 0; i < data.length; i++) {
  //             lettersUrlArray.push(data[i].rssurl);
  //           }
  //           let uniqueUrls = [...new Set(lettersUrlArray)];
  //           uniqueUrls.forEach(url =>
  //             fetch(url)
  //               .then(res => res.json())
  //               .then(data => {
  //                 console.log(data.items);
  //                 let renderedLetters = [];
  //                 for (let i in data) {
  //                   if (i === data[i].url) {
  //                     renderedLetters.push(data[i].url);
  //                   }
  //                 }

  //                 console.log(renderedLetters);
  //                 // this.setState({ items: data.items });
  //               })
  //               .then(data => console.log(data))
  //           );
  //         })
  //   );
  // }

  fetchLetters() {
    fetch("https://aqueous-caverns-36239.herokuapp.com/urls", {
      headers: {}
    }).then(res =>
      !res.ok
        ? res.json().then(e => Promise.reject(e))
        : res.json().then(data => {
            let rssUrls = [];
            for (let i = 0; i < data.length; i++) {
              rssUrls.push(data[i].rssurl);
            }
            console.log(rssUrls);
            let uniqueUrls = [...new Set(rssUrls)];
            console.log(uniqueUrls);

            uniqueUrls.forEach(url => {
              fetch(url)
                .then(res => res.json())
                .then(data => console.log(data.items));
              // this.setState({ items: data.items });
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
    const arrayOfNewsLetters = this.state.items.slice(0, 4).map((item, i) => (
      <div className="newsletter-card" key={i}>
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
