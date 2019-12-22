import React from 'react';

import logo from '../assets/logo.jpg';
import { URL_GET_FILM_DETAIL } from '../constant';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      director: '',
      opening_crawl: '',
      title: '',
      release_date: '',
      producer: ''
    };
  }

  componentDidMount() {
    this.getFilm();
  }

  getFilm = async () => {
    const id = this.props.history.location.pathname.split('/')[2];
    const url = URL_GET_FILM_DETAIL.replace(':filmId', `${id}`);
    const fetchResponse = await fetch(url, {
      method: 'GET'
    });
    const response = await fetchResponse.json();

    const { director, opening_crawl, title, release_date, producer } = response;

    this.setState({
      director,
      opening_crawl,
      title,
      release_date,
      producer
    });
  };

  render() {
    const {
      director,
      opening_crawl,
      title,
      release_date,
      producer
    } = this.state;

    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        {title === '' ? (
          <div className="detail-sub">Loading...</div>
        ) : (
          <>
            <div className="description">Here is the detail about {title}</div>
            <div className="container-list">
              <div className="list">
                <div className="detail-title">{title}</div>
                <div className="detail-sub">Director: {director}</div>
                <div className="detail-sub">Producer: {producer}</div>
                <div className="detail-sub">Release Date: {release_date}</div>
                <div className="detail-sub">{opening_crawl}</div>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default FilmDetail;
