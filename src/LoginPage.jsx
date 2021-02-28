import React from "react";
import { login } from "./api";

const LoginPage = () => {
  const initialButtonClasses = "button is-primary is-focused is-fullwidth";
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [disabledStatus, setDisabledStatus] = React.useState(false);
  const [buttonClasses, setButtonClasses] = React.useState(initialButtonClasses);
  const [loginErrorNotification, setLoginErrorNotification] = React.useState();

  function setUsernameOnClick(e) {
    setUsername(e.target.value);
  }
  function setPasswordOnClick(e) {
    setPassword(e.target.value);
  }
  async function loginButtonOnClick() {
    if(username.length === 0 || password.length === 0) {
      return false;
    }
    setDisabledStatus(true);
    setButtonClasses(initialButtonClasses + " is-loading");
    const responseCode = await login(username, password);
    console.log(responseCode);
    const notification = (message) => (
      <div className="notification is-danger is-light has-text-centered">
        {message}
      </div>
    );
    if(responseCode === 401) {
      setLoginErrorNotification(notification("Invalid credentials"));
    } else if(responseCode == 200) {
      setLoginErrorNotification(<></>);
      window.location.replace("/");
    } else {
      setLoginErrorNotification(notification("Unable to login please try again later"));
    }
    setDisabledStatus(false);
    setButtonClasses(initialButtonClasses);
  }

  return (
    <div className="section">
      <div className="container is-mobile is-centered column is-three-fifths">
        <div className="">
          {loginErrorNotification}
          <form onSubmit={e => e.preventDefault()}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  required
                  disabled={disabledStatus}
                  className="input"
                  type="text"
                  placeholder="Username"
                  onChange={setUsernameOnClick}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"/>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control has-icons-left">
                <input
                  required
                  disabled={disabledStatus}
                  className="input"
                  type="password"
                  placeholder="Password"
                  onChange={setPasswordOnClick}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-key"></i>
                </span>
              </div>
            </div>
            <button
              type="submit"
              className={buttonClasses}
              onClick={loginButtonOnClick}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;