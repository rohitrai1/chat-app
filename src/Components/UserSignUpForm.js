import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserSignUpForm extends Component {
  state = {
    data: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
  };
  handleChange = event => {
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value }
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = this.state.data;
    fetch("http://localhost:2000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.username,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password
      })
    }).then(result => {
      if (result && result.status === 200) {
        return (window.location = "/home");
      }
    });
  };
  render() {
    return (
      <div class="container">
        <div class="d-flex justify-content-center h-100">
          <div class="card-signup">
            <div class="card-header">
              <h3>Sign Up</h3>
              <div class="d-flex justify-content-end social_icon">
                <span>
                  <i class="fab fa-facebook-square" />
                </span>
                <span>
                  <i class="fab fa-google-plus-square" />
                </span>
                <span>
                  <i class="fab fa-twitter-square" />
                </span>
              </div>
            </div>
            <div class="card-body">
              <form onSubmit={this.handleSubmit}>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    name="username"
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="firstname"
                    value={this.state.firstname}
                    onChange={this.handleChange}
                    name="firstname"
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="lastname"
                    value={this.state.lastname}
                    onChange={this.handleChange}
                    name="lastname"
                  />
                </div>
                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-user" />
                    </span>
                  </div>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    name="email"
                  />
                </div>

                <div class="input-group form-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fas fa-key" />
                    </span>
                  </div>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                  />
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="Sign Up"
                    class="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="justify-content-center links">
                Already! have an account?<Link to="/">Sign In</Link>
              </div>
              <div class="d-flex justify-content-center" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserSignUpForm;
