import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header"> Login</span>
        <div className="field">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
        </div>
        <div className="field">
          <button>Login</button>
        </div>
      </form>
    );
  }
}
