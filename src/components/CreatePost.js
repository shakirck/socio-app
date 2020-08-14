import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewPost } from '../actions/posts';

export class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  handleClick = () => {
    this.props.dispatch(createNewPost(this.state.content));
  };
  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          onChange={this.handleChange}
          onClick={this.handleClick}
        />
        <div>
          <button id="add-post-btn" onClick={this.handleClick}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CreatePost);
