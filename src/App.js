import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Home from './container/Home';
import FilmList from './container/FilmList';
import PeopleList from './container/PeopleList';
import PlanetList from './container/PlanetList';
import StarshipList from './container/StarshipList';
import VehicleList from './container/VehicleList';
import SpeciesList from './container/SpeciesList';
import FilmDetail from './container/FilmDetail';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/films/:filmId" component={FilmDetail} />
        <Route path="/films" component={FilmList} />
        <Route path="/people" component={PeopleList} />
        <Route path="/planets" component={PlanetList} />
        <Route path="/starships" component={StarshipList} />
        <Route path="/vehicles" component={VehicleList} />
        <Route path="/species" component={SpeciesList} />
      </Switch>
    </div>
  );
}

export default App;
