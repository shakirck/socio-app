import React, { Component } from 'react';
import FriendsItem from './FriendsItem';
export default class FriendsList extends Component {
  render() {
    const { friends } = this.props;
    console.log('FFFFFFRIIIIIIENNNNNNNNDLLLLLIST', friends);
    return (
      <div className="friends-list">
        <div className="header">My Friends </div>
        {friends && friends.length === 0 && (
          <div className="no-friends">No friends found!</div>
        )}

        {friends &&
          friends.map((friend) => (
            <FriendsItem friend={friend.to_user} key={friend._id} />
          ))}
      </div>
    );
  }
}
