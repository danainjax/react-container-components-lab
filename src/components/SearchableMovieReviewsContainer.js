import React, { Component } from "react";
import "isomorphic-fetch";
import MovieReviews from "./MovieReviews";

const NYT_API_KEY = "AaDMCadKNEpOtThDWaDcJbIRCV4PcDVt";
const URL =
  "https://api.nytimes.com/svc/movies/v2/reviews/search.json?" +
  `api-key=${NYT_API_KEY}&query=`;

// Code SearchableMovieReviewsContainer Here

export default class SearchableMovieReviewsContainer extends Component {
  constructor() {
    super();
    this.state = {
      reviews: [],
      searchTerm: "",
    };
  }

  handleChange = (event) => {
    console.log(this.state.searchTerm);
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(URL);
    fetch(URL.concat(this.state.searchTerm))
      .then((resp) => resp.json())
      .then((data) => this.setState({ reviews: data.results }));
  };

  render() {
    return (
      <div className="searchable-movie-reviews">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search"> Search Movie Reviews</label>
          <input id="search" type="text" onChange={this.handleChange} />
          <button type="submit">Submit</button>
          <MovieReviews reviews={this.state.reviews} />
        </form>
      </div>
    );
  }
}
