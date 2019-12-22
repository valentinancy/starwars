import React from 'react';

import logo from '../assets/logo.jpg';
import { URL_GET_PEOPLE, PAGINATION_HEIGHT_OFFSET } from '../constant';

class PeopleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrPeople: [],
      isFetching: false,
      nextUrl: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);

    this.getPeople();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getPeople = async () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        const { nextUrl, arrPeople } = this.state;
        const url = nextUrl !== null ? nextUrl : URL_GET_PEOPLE;
        const fetchResponse = await fetch(url, {
          method: 'GET'
        });
        const response = await fetchResponse.json();

        const { next, results } = response;
        const combinedArrPeople = [...arrPeople, ...results];
        this.setState({
          arrPeople: combinedArrPeople,
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
      this.getPeople();
    }
  };

  render() {
    const arrPeople = this.state.arrPeople;
    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        <div className="description">
          Here is the list of All Star Wars People:
        </div>
        <div className="container-list">
          {arrPeople.length === 0 ? (
            <div className="detail-sub">Loading...</div>
          ) : (
            arrPeople.map(person => {
              const {
                birth_year,
                gender,
                eye_color,
                hair_color,
                height,
                mass,
                name,
                skin_color
              } = person;

              return (
                <div key={name} className="list-detail">
                  <div className="detail-title">{name}</div>
                  <div className="detail-sub">Birth year: {birth_year}</div>
                  <div className="detail-sub">Gender: {gender}</div>
                  <div className="detail-sub">Eye color: {eye_color}</div>
                  <div className="detail-sub">Hair color: {hair_color}</div>
                  <div className="detail-sub">Skin color: {skin_color}</div>
                  <div className="detail-sub">Height: {height}</div>
                  <div className="detail-sub">Mass: {mass}</div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default PeopleList;
