import React from 'react';

import logo from '../assets/logo.jpg';
import { URL_GET_VEHICLES, PAGINATION_HEIGHT_OFFSET } from '../constant';

class VehicleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrVehicles: [],
      isFetching: false,
      nextUrl: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);

    this.getVehicles();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getVehicles = async () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        const { nextUrl, arrVehicles } = this.state;
        const url = nextUrl !== null ? nextUrl : URL_GET_VEHICLES;
        const fetchResponse = await fetch(url, {
          method: 'GET'
        });
        const response = await fetchResponse.json();

        const { next, results } = response;
        const combinedArrVehicles = [...arrVehicles, ...results];
        this.setState({
          arrVehicles: combinedArrVehicles,
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
      this.getVehicles();
    }
  };

  render() {
    const arrVehicles = this.state.arrVehicles;
    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        <div className="description">
          Here is the list of All Star Wars Vehicles:
        </div>
        <div className="container-list">
          {arrVehicles.length === 0 ? (
            <div className="detail-sub">Loading...</div>
          ) : (
            arrVehicles.map(starship => {
              const {
                cargo_capacity,
                consumables,
                cost_in_credits,
                crew,
                length,
                manufacturer,
                max_atmosphering_speed,
                model,
                name,
                passengers,
                vehicle_class
              } = starship;

              return (
                <div key={name} className="list-detail">
                  <div className="detail-title">{name}</div>
                  <div className="detail-sub">Model: {model}</div>
                  <div className="detail-sub">Manufacturer: {manufacturer}</div>
                  <div className="detail-sub">
                    Vehicle class: {vehicle_class}
                  </div>
                  <div className="detail-sub">Crew: {crew}</div>
                  <div className="detail-sub">Passangers: {passengers}</div>
                  <div className="detail-sub">Length: {length}</div>
                  <div className="detail-sub">
                    Maximum Atmosphering Speed: {max_atmosphering_speed}
                  </div>
                  <div className="detail-sub">
                    Cargo capacity: {cargo_capacity}
                  </div>
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

export default VehicleList;
