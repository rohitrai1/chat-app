import React, { Component } from "react";

class UserLoginForm extends Component {
  state = {
    data: {
      username: "",
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
    console.log("==========", data);
    fetch("http://localhost:2000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    }).then(result => {
      if (result && result.status === 200) {
        console.log(result.status);

        sessionStorage.setItem("loggedIn", "loggedIn");
        return (window.location = "/chatapp");
      }
    });
  };

  render() {
    return (
      <div class="container">
        <div class="d-flex justify-content-center h-100">
          <div class="card">
            <div class="card-header">
              <h3>Sign In</h3>
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
                <div class="row align-items-center remember">
                  <input type="checkbox" />
                  Remember Me
                </div>
                <div class="form-group">
                  <input
                    type="submit"
                    value="Login"
                    class="btn float-right login_btn"
                  />
                </div>
              </form>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-center links">
                Don't have an account?<a href="">Sign Up</a>
              </div>
              <div class="d-flex justify-content-center">
                <a href="">Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserLoginForm;
