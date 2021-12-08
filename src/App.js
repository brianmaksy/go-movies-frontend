import React, { Fragment } from 'react';
// nts - cf BrowserRouter needs some webserver config. HashRouter = easiest. 
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // funny syntax using word "as"
import Movies from './components/Movies'
import Admin from './components/Admin'
import Home from './components/Home'
import Genres from './components/Genres'
import OneMovie from './components/OneMovie'
import OneGenre from './components/OneGenre'
import EditMovie from './components/EditMovie'

export default function App() {
  return (
    <Router>
    <div className="container">
      <div className="row">
        <h1 className="mt-3">
          Watch a movie
        </h1>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <ul className="list-group">
              <li className="list-group-item">
                <Link to="/">Home</Link>
              </li>
              <li className="list-group-item">
                <Link to="/movies">Movies</Link>
              </li>
              <li className="list-group-item">
                <Link to="/genres">Genres</Link>
              </li>
              <li className="list-group-item">
                <Link to="/admin/movie/0">Add movie</Link>
              </li>
              <li className="list-group-item">
                <Link to="/admin">Manage Catalogue</Link>
              </li>
            </ul>
          </nav>
        </div>    

        <div className="col-md-10">
          <Fragment>
            <Switch>
              <Route path="/movies/:id" component={OneMovie} />
              {/* <Route path="/movies/:id">
                <Movie />
              </Route> */}
              <Route path="/movies">
                <Movies />
              </Route>

              <Route path="/genre/:id" component={OneGenre} />

              <Route exact path="/genres">
                <Genres />
              </Route>
              {/* Both syntax ok <Route [] /> or <Route></Route> */}

              <Route path="/admin/movie/:id" component={EditMovie} />
              <Route path="/admin">
                <Admin />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Fragment>
        </div>

      </div>
    </div>
    </Router>
  );
}
// routing order matters, in the above switch! Else use <route exact path="/">


// function Movie() {
//   let { id } = useParams(); // nts - use the param in the placeholder id (?)
//   return <h2>Movie id: {id}</h2>
// }
