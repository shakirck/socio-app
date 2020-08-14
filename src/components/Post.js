import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import { createComment, addLike } from '../actions/posts';
import { connect } from 'react-redux';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  handleCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };
  handleCommentAdd = (e) => {
    if (e.key === 'Enter') {
      this.props.dispatch(
        createComment(this.state.comment, this.props.post._id)
      );

      this.setState({
        comment: '',
      });
    }
  };
  handlePostLike = () => {
    const { post, user } = this.props;
    this.props.dispatch(addLike(post._id, 'Post', user._id));
  };

  render() {
    const { post, user } = this.props;
    const isPostLiked = post.likes.includes(user._id);
    console.log('*****************************', this.props);
    return (
      <div>
        <div className="post-wrapper" key={post._id}>
          <div className="post-header">
            <div className="post-avatar">
              <Link to={`/user/${post.user._id}`}>
                <img
                  src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                  alt="user-pic"
                />
              </Link>

              <div>
                <span className="post-author">{post.user.name}</span>
                <span className="post-time">a minute ago</span>
              </div>
            </div>
            <div className="post-content">{post.content}</div>

            <div className="post-actions">
              <button
                className="post-like no-btn"
                onClick={this.handlePostLike}
              >
                {isPostLiked ? (
                  <img
                    src="https://image.flaticon.com/icons/svg/325/325072.svg"
                    alt="likes-icon"
                  />
                ) : (
                  <img
                    src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                    alt="likes-icon"
                  />
                )}
                <span>{post.likes.length}</span>
              </button>

              <div className="post-comments-icon">
                <img
                  src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                  alt="comments-icon"
                />
                <span>{post.comments.length}</span>
              </div>
            </div>
            <div className="post-comment-box">
              <input
                placeholder="Start typing a comment"
                onChange={this.handleCommentChange}
                onKeyPress={this.handleCommentAdd}
              />
            </div>

            <div className="post-comments-list">
              <div className="post-comments-item">
                {post.comments.map((comment) => (
                  <Comment comment={comment} postId={post._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}
export default connect(mapStateToProps)(Post);
