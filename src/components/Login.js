import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props);
    // this.emailInputRef = React.createRef();
    // this.passwordInputRef = React.createRef();

    this.state = {
      email: '',
      password: '',
    };
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    return (
      <form className="login-form">
        <span className="login-signup-header"> Login</span>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            // ref={this.emailInputRef}
            onChange={this.handleEmailChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            // ref={this.passwordInputRef}
            onChange={this.handlePasswordChange}
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
