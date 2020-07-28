import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    return (
      <form className="signup-form">
        <span className="login-signup-header">Signup</span>
        <div className="field">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
        </div>
        <div className="field">
          <button>Signup</button>
        </div>
      </form>
    );
  }
}
