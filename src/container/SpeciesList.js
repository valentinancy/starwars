import React from 'react';

import logo from '../assets/logo.jpg';
import { URL_GET_SPECIES, PAGINATION_HEIGHT_OFFSET } from '../constant';

class SpeciesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecies: [],
      isFetching: false,
      nextUrl: null
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);

    this.getSpecies();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  getSpecies = async () => {
    this.setState(
      {
        isFetching: true
      },
      async () => {
        const { nextUrl, arrSpecies } = this.state;
        const url = nextUrl !== null ? nextUrl : URL_GET_SPECIES;
        const fetchResponse = await fetch(url, {
          method: 'GET'
        });
        const response = await fetchResponse.json();

        const { next, results } = response;
        const combinedArrSpecies = [...arrSpecies, ...results];
        this.setState({
          arrSpecies: combinedArrSpecies,
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
      this.getSpecies();
    }
  };

  render() {
    const arrSpecies = this.state.arrSpecies;
    return (
      <div className="app">
        <img src={logo} className="img-logo" alt="" />
        <div className="description">
          Here is the list of All Star Wars Species:
        </div>
        <div className="container-list">
          {arrSpecies.length === 0 ? (
            <div className="detail-sub">Loading...</div>
          ) : (
            arrSpecies.map(starship => {
              const {
                average_height,
                average_lifespan,
                classification,
                designation,
                eye_colors,
                hair_colors,
                language,
                name,
                skin_colors
              } = starship;

              return (
                <div key={name} className="list-detail">
                  <div className="detail-title">{name}</div>
                  <div className="detail-sub">
                    Classification: {classification}
                  </div>
                  <div className="detail-sub">Designation: {designation}</div>
                  <div className="detail-sub">Eye color: {eye_colors}</div>
                  <div className="detail-sub">Hair color: {hair_colors}</div>
                  <div className="detail-sub">Skin color: {skin_colors}</div>
                  <div className="detail-sub">Language: {language}</div>
                  <div className="detail-sub">
                    Avarage height: {average_height}
                  </div>
                  <div className="detail-sub">
                    Avarage lifespan: {average_lifespan}
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

export default SpeciesList;
