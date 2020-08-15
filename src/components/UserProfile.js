import React, { Component } from 'react';
import { fetchUserProfile } from '../actions/profile';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import profile from '../reducers/profile';
import { APIURLS } from '../helpers/urls';
import { getAuthTokenFromlocalStorage } from '../helpers/util';
import { addFriend, removeFriend } from '../actions/friends';

export class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: '',
    };
  }
  componentDidMount() {
    const { match } = this.props;
    // console.log('**************************Match', match);
    if (match.params.userId) {
      console.log('User Profile is to be showed');
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }
  componentDidUpdate(prevProps) {
    const {
      match: { params: prevParams },
    } = prevProps;

    const {
      match: { params: currentParams },
    } = this.props;

    if (
      prevParams &&
      currentParams &&
      prevParams.userId !== currentParams.userId
    ) {
      this.props.dispatch(fetchUserProfile(currentParams.userId));
      // this.setState({
      //   successMessage: '',
      //   success: null,
      //   error: null,
      // });
    }
  }

  checkIfUserIsAFriend = () => {
    console.log('this.props', this.props);
    const { match, friends } = this.props;
    const userId = match.params.userId;

    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);

    if (index !== -1) {
      return true;
    }

    return false;
  };
  handleAddFriendClick = async () => {
    console.log('Clicked');
    const userId = this.props.match.params.userId;
    console.log(userId);
    const url = APIURLS.addFriend(userId);

    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
    };

    const response = await fetch(url, opts);
    const data = await response.json();
    // console.log(data.succ);
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', data);

    if (data.success) {
      this.setState({
        success: true,
        successMessage: data.message,
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };

  handleRemoveFriend = async () => {
    const url = APIURLS.removeFriend(this.props.match.params.userId);
    console.log(url);
    const opts = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${getAuthTokenFromlocalStorage()}`,
      },
    };

    const response = await fetch(url, opts);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: data.message,
      });
      this.props.dispatch(removeFriend(this.props.match.params.userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };
  render() {
    console.log('PROPS', this.props);

    console.log('PROILE', this.props);
    const user = this.props.profile.user;
    console.log(
      '**********************inProgress',
      this.props.profile.inProgress
    );
    if (this.props.profile.inProgress) {
      return <div>Loading </div>;
    }
    const { error, success } = this.state;
    const isUserAFriend = this.checkIfUserIsAFriend();
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="btn-grp">
          {!isUserAFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleAddFriendClick}
            >
              Add Friend
            </button>
          ) : (
            <button
              className="button save-btn"
              onClick={this.handleRemoveFriend}
            >
              Remove Friend
            </button>
          )}
          {success && (
            <div className=" alert  success-dailog">
              {' '}
              {this.state.successMessage}
            </div>
          )}
          {error && <div className=" alert  error-dailog"> {error}</div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return {
    profile,
    friends,
  };
}
export default connect(mapStateToProps)(UserProfile);
