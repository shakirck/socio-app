import React, { Component } from 'react';
import { login } from '../actions/auth';
import { connect } from 'react-redux';
export class Login extends Component {
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
    const { email, password } = this.state;
    e.preventDefault();
    console.log(this.state);

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
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
    const { error, inProgress } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header"> Login</span>
        {error && <div className="alert error-dailog">{error}</div>}
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
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Loging in ...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Login
            </button>
          )}
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
