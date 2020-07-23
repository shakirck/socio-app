import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import { PostList, Navbar } from '.';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const login = () => <div>LOGIN</div>;
const home = () => <div>Home</div>;
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
          {/* <PostList posts={posts} /> */}
        </div>
        <Route exact={true} path="/" component={login} />
        <Route path="/home" component={home} />
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
