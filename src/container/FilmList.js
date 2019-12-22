import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.jpg';
import { URL_GET_FILMS } from '../constant';

class FilmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrFilms: []
    };
  }

  componentDidMount() {
    this.getFilms();
  }

  getFilms = async () => {
    const url = URL_GET_FILMS;
    const fetchResponse = await fetch(url, {
      method: 'GET'
    });
    const response = await fetchResponse.json();

    this.setState({
      arrFilms: response.results
    });
  };

  render() {
    const arrFilms = this.state.arrFilms;
    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        <div className="description">
          Here is the list of All Star Wars Films:
        </div>
        <div className="container-list">
          {arrFilms.length === 0 ? (
            <div className="detail-sub">Loading...</div>
          ) : (
            arrFilms.map((film, index) => {
              const { episode_id, opening_crawl, title } = film;

              return (
                <Link
                  key={episode_id}
                  className="link"
                  to={`/films/${index + 1}`}
                >
                  <div className="list-detail">
                    <div className="detail-title">{title}</div>
                    <div className="detail-sub">
                      {`${opening_crawl}`.substring(0, 100)} [..read more]
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default FilmList;
