import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login } from '.';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Signup from './Signup';

const logout = () => <div>logout</div>;
const signup = () => <div>signup</div>;
export class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log('PROPS', this.props);
    const { posts } = this.props;
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
              return <Home {...props} posts={posts} />;
            }}
          />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={logout} />
          <Route path="/signup" component={Signup} />

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
  };
}
export default connect(mapStateToProps)(App);
