import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getMoviesByTopRated } from "../actions/";
import "../styles/MoviesList.css";
import MovieDetails from "./MovieDetails";
import CircularProgress from "@material-ui/core/CircularProgress";

class MoviesListByTopRated extends Component {
  state = {
    pageId: this.props.history.location.search
      ? parseInt(this.props.history.location.search.slice(6))
      : 1,
  };

  handlePageId = async (id) => {
    await this.setState({ pageId: id });
    this.props.getMoviesByTopRated(this.state.pageId);
  };

  componentDidMount() {
    this.props.getMoviesByTopRated(this.state.pageId);
  }

  renderButton = () => {
    if (this.state.pageId === 1) {
      return (
        <>
          <div></div>
          <Link className="special" to={`?page=${2}`}>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                this.handlePageId(2);
              }}
            >
              Page {this.state.pageId + 1}
            </button>
          </Link>
        </>
      );
    } else if (this.state.pageId <= 391) {
      return (
        <>
          <Link to={`?page=${this.state.pageId - 1}`}>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                this.handlePageId(this.state.pageId - 1);
              }}
            >
              Page {this.state.pageId - 1}
            </button>
          </Link>
          <Link to={`?page=${this.state.pageId + 1}`}>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                this.handlePageId(this.state.pageId + 1);
              }}
            >
              Page {this.state.pageId + 1}
            </button>
          </Link>
        </>
      );
    } else if (this.state.pageId === 392) {
      return (
        <>
          <Link to={`?page=${this.state.pageId - 1}`}>
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                this.handlePageId(this.state.pageId - 1);
              }}
            >
              Page {this.state.pageId - 1}
            </button>
          </Link>
        </>
      );
    }
    return (
      <div className="error__boxcontainer">
        <div className="error__box">
          <h1>Oh No!</h1>
          <p>It looks like something went wrong!</p>
          <Link to="/">
            <button>Go Home</button>
          </Link>
        </div>
      </div>
    );
  };

  renderHeading() {
    return this.state.pageId <= 391 ? (
      <div className="header__details">
        <h2>Top Rated Movies</h2>
        <p>
          Browse thousands of movies through{" "}
          <a
            href="https://www.themoviedb.org/documentation/api"
            className=""
            target="_blank"
            rel="noopener noreferrer"
          >
            TMDB API
          </a>
        </p>
      </div>
    ) : (
      <></>
    );
  }

  renderMovies = () => {
    const { movies } = this.props;
    return movies ? (
      movies.map((movie) => {
        return <MovieDetails movie={movie} key={movie.id} />;
      })
    ) : this.state.pageId <= 391 ? (
      <div className="loading__spinner">
        <CircularProgress />
      </div>
    ) : (
      <></>
    );
  };

  render() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return (
      <div className="moviesHeader__container">
        {this.renderHeading()}
        <div className="movies__container">{this.renderMovies()}</div>
        <div className="page__container">{this.renderButton()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { movies: state.movies.results };
};

export default connect(mapStateToProps, { getMoviesByTopRated })(
  MoviesListByTopRated
);
