import React, { Component, Fragment } from 'react';
// nts - cf BrowserRouter needs some webserver config. HashRouter = easiest. 
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; // funny syntax using word "as"
import Movies from './components/Movies'
import Admin from './components/Admin'
import Home from './components/Home'
import Genres from './components/Genres'
import OneMovie from './components/OneMovie'
import OneGenre from './components/OneGenre'
import EditMovie from './components/EditMovie'
import Login from './components/Login'
import GraphQL from './components/GraphQL'
import OneMovieGraphQL from 'components/OneMovieGraphQL';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
    }
    

  }
  // to lift state. nts - changed App from function to class. 


  componentDidMount() {
    let t = window.localStorage.getItem("jwt");
    if (t) {
      // see if user is already logged in
      if (this.state.jwt === "") {
        this.setState({jwt: JSON.parse(t)});
      }
    }
  }

  handleJWTChange = (jwt) => {
    this.setState({ jwt: jwt });
  }

  logout = () => {
    this.setState({ jwt: "" });
    // clear local storage of jwt (by key) as well 
    window.localStorage.removeItem("jwt");
  }

  render() {
    let loginLink;
    if (this.state.jwt === "") {
      loginLink = <Link to="/login">Login</Link>
    } else {
      loginLink = <Link to="/logout" onClick={this.logout}>Logout</Link>
    }


    return (
      <Router>
        <div className="container">
          <div className="row">
            <div className="col mt-3">
              <h1 className="mt-3">
                Watch a movie
              </h1>
            </div>
            <div className="col mt-3 text-end">
              {loginLink}
            </div>
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

                  {this.state.jwt !== "" && (
                    <Fragment>
                      <li className="list-group-item">
                        <Link to="/admin/movie/0">Add movie</Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/admin">Manage Catalogue</Link>
                      </li>
                    </Fragment>
                  )}
                  <li className="list-group-item">
                    <Link to="/graphql">GraphQL</Link>
                  </li>
                </ul>
                <pre>
                  {JSON.stringify(this.state, null, 3)}
                </pre>
              </nav>
            </div>

            <div className="col-md-10">
              <Fragment>
                <Switch>
                  <Route path="/movies/:id" component={OneMovie} />
                  <Route path="/moviesgraphql/:id" component={OneMovieGraphQL} />
                  {/* <Route path="/movies/:id">
                <Movie />
              </Route> */}
                  <Route path="/movies">
                    <Movies />
                  </Route>

                  <Route path="/genre/:id" component={OneGenre} />

                  <Route exact path="/login" component={(props) => <Login {...props} handleJWTChange={this.handleJWTChange} />} />

                  <Route exact path="/genres">
                    <Genres />
                  </Route>

                  <Route exact path="/graphql">
                    <GraphQL />
                  </Route>

                  {/* Both syntax ok <Route [] /> or <Route></Route> */}

                  <Route path="/admin/movie/:id" component={(props) => (
                    // to pass props and jwt token  (nts - props referring to those in this file?)
                    <EditMovie {...props} jwt={this.state.jwt} /> 
                  )}
                  />
                  <Route path="/admin" component={(props) => (
                    <Admin {...props} jwt={this.state.jwt} />
                  )}
                  />
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
}
// routing order matters, in the above switch! Else use <route exact path="/">


// function Movie() {
//   let { id } = useParams(); // nts - use the param in the placeholder id (?)
//   return <h2>Movie id: {id}</h2>
// }
