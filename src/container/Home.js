import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.jpg';

class Home extends React.Component {
  render() {
    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        <div className="description">
          All the Star Wars data you've ever wanted:
        </div>
        <div className="container-list">
          <div className="list">
            <Link className="link" to="/films">
              Star Wars Film List
            </Link>
          </div>
          <div className="list">
            <Link className="link" to="/people">
              People in All Star Wars Film
            </Link>
          </div>
          <div className="list">
            <Link className="link" to="/planets">
              Planets in All Star Wars Film
            </Link>
          </div>
          <div className="list">
            <Link className="link" to="/starships">
              Starships in All Star Wars Film
            </Link>
          </div>
          <div className="list">
            <Link className="link" to="/vehicles">
              Vehicles in All Star Wars Film
            </Link>
          </div>
          <div className="list">
            <Link className="link" to="/species">
              Species in All Star Wars Film
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
