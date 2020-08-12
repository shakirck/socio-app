import React from 'react';
import { connect } from 'react-redux';
import * as jwtDecode from 'jwt-decode';

import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Settings } from '.';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import Signup from './Signup';
import { authenticateUser } from '../actions/auth';
import UserProfile from './UserProfile';
import { fetchUserFriends } from '../actions/friends';

// const logout = () => <div>logout</div>;
// const signup = () => <div>signup</div>;
const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  console.log('PRivate route Props', privateRouteProps);
  return (
    <Route
      path={path}
      render={(props) => {
        console.log('Settings', props);
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};
export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const user = jwtDecode(token);
      console.log(user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    console.log('PROPS APP', this.props);
    const { posts, auth, friends } = this.props;
    console.log('FFFFFFFFRIEEEEEEEENDS', friends);
    return (
      <Router>
        <div>
          <Navbar />
        </div>
        <Switch>
          <Route
            exact={true}
            path="/home"
            render={(props) => {
              return (
                <Home
                  {...props}
                  posts={posts}
                  isLoggedin={auth.isLoggedin}
                  friends={friends}
                />
              );
            }}
          />
          <Route path="/login" component={Login} />
          {/* <Route path="/logout" component={logout} /> */}
          <Route path="/signup" component={Signup} />
          <PrivateRoute
            path="/settings"
            component={Settings}
            isLoggedin={auth.isLoggedin}
          />
          <PrivateRoute
            path="/user/:userId"
            component={UserProfile}
            isLoggedin={auth.isLoggedin}
          />
          <Route component={Page404} />
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}
export default connect(mapStateToProps)(App);
