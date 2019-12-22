import React from 'react';

import logo from '../assets/logo.jpg';
import { URL_GET_PLANETS, PAGINATION_HEIGHT_OFFSET } from '../constant';

class PlanetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPlanets: [],
      isFetching: false,
      nextUrl: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);

    this.getPlanets();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getPlanets = async () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        const { nextUrl, arrPlanets } = this.state;
        const url = nextUrl !== null ? nextUrl : URL_GET_PLANETS;
        const fetchResponse = await fetch(url, {
          method: 'GET'
        });
        const response = await fetchResponse.json();

        const { next, results } = response;
        const combinedArrPlanets = [...arrPlanets, ...results];
        this.setState({
          arrPlanets: combinedArrPlanets,
          nextUrl: next,
          isFetching: false
        });
      }
    );
  };

  onScroll = () => {
    const { nextUrl, isFetching } = this.state;
    if (
      window.innerHeight + window.scrollY >=
        document.body.offsetHeight - PAGINATION_HEIGHT_OFFSET &&
      nextUrl !== null &&
      !isFetching
    ) {
      this.getPlanets();
    }
  };

  render() {
    const arrPlanets = this.state.arrPlanets;
    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        <div className="description">
          Here is the list of All Star Wars Planets:
        </div>
        <div className="container-list">
          {arrPlanets.length === 0 ? (
            <div className="detail-sub">Loading...</div>
          ) : (
            arrPlanets.map(planet => {
              const {
                climate,
                diameter,
                gravity,
                name,
                orbital_period,
                population,
                rotation_period,
                surface_water,
                terrain
              } = planet;

              return (
                <div key={name} className="list-detail">
                  <div className="detail-title">{name}</div>
                  <div className="detail-sub">Diamter: {diameter}</div>
                  <div className="detail-sub">
                    Orbital period: {orbital_period}
                  </div>
                  <div className="detail-sub">
                    Rotation perios: {rotation_period}
                  </div>
                  <div className="detail-sub">Gravity: {gravity}</div>
                  <div className="detail-sub">Climate: {climate}</div>
                  <div className="detail-sub">
                    Surface water: {surface_water}
                  </div>
                  <div className="detail-sub">Terrain: {terrain}</div>
                  <div className="detail-sub">Population: {population}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default PlanetList;
