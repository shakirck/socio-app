import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Friends extends Component {
  render() {
    console.log(this.props, 'FREINDSLIST VIEW<<<<<<<<<<<<<<<<<<<<<<<<<');
    return (
      <div>
        <Link className="friends-item" to={`user/${this.props.friend._id}`}>
          <div className="friends-img">
            <img
              src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
              alt="user-pic"
            />
          </div>
          <div className="friends-name">{this.props.friend.email}</div>
        </Link>
      </div>
    );
  }
}
