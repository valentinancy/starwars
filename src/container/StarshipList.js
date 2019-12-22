import React from 'react';

import logo from '../assets/logo.jpg';
import { URL_GET_STARSHIPS, PAGINATION_HEIGHT_OFFSET } from '../constant';

class StarshipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStarships: [],
      isFetching: false,
      nextUrl: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);

    this.getStarships();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getStarships = async () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        const { nextUrl, arrStarships } = this.state;
        const url = nextUrl !== null ? nextUrl : URL_GET_STARSHIPS;
        const fetchResponse = await fetch(url, {
          method: 'GET'
        });
        const response = await fetchResponse.json();

        const { next, results } = response;
        const combinedArrStarships = [...arrStarships, ...results];
        this.setState({
          arrStarships: combinedArrStarships,
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
      this.getStarships();
    }
  };

  render() {
    const arrStarships = this.state.arrStarships;
    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        <div className="description">
          Here is the list of All Star Wars Starships:
        </div>
        <div className="container-list">
          {arrStarships.length === 0 ? (
            <div className="detail-sub">Loading...</div>
          ) : (
            arrStarships.map(starship => {
              const {
                MGLT,
                cargo_capacity,
                consumables,
                cost_in_credits,
                crew,
                hyperdrive_rating,
                length,
                manufacturer,
                max_atmosphering_speed,
                model,
                name,
                passengers,
                starship_class
              } = starship;

              return (
                <div key={name} className="list-detail">
                  <div className="detail-title">{name}</div>
                  <div className="detail-sub">Model: {model}</div>
                  <div className="detail-sub">Manufacturer: {manufacturer}</div>
                  <div className="detail-sub">
                    Starship class: {starship_class}
                  </div>
                  <div className="detail-sub">Crew: {crew}</div>
                  <div className="detail-sub">Passangers: {passengers}</div>
                  <div className="detail-sub">Length: {length}</div>
                  <div className="detail-sub">
                    Maximum Atmosphering Speed: {max_atmosphering_speed}
                  </div>
                  <div className="detail-sub">
                    Hyperdrive rating: {hyperdrive_rating}
                  </div>
                  <div className="detail-sub">
                    Cargo capacity: {cargo_capacity}
                  </div>
                  <div className="detail-sub">MGLT: {MGLT}</div>
                  <div className="detail-sub">Consumeables: {consumables}</div>
                  <div className="detail-sub">
                    Cost in credits: {cost_in_credits}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default StarshipList;
