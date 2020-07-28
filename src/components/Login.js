import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.emailInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.emailInputRef, this.passwordInputRef);
  };
  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header"> Login</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            ref={this.emailInputRef}
            required
          />
          <input
            type="password"
            placeholder="Password"
            ref={this.passwordInputRef}
            required
          />
        </div>
        <div className="field">
          <button onClick={this.handleFormSubmit}>Login</button>
        </div>
      </form>
    );
  }
}
