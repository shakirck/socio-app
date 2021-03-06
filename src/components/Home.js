import React, { Component } from 'react';
import { PostList } from '.';
import FriendsList from './FriendsList';
import CreatePost from './CreatePost';
import Chat from './Chat';

export default class Home extends Component {
  render() {
    const { posts, friends, isLoggedin } = this.props;
    return (
      <div className="home">
        <PostList posts={posts} />
        {isLoggedin && <FriendsList friends={friends} />}
        {isLoggedin && <Chat />}
      </div>
    );
  }
}
