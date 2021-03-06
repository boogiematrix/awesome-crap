import "./Login.css";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import Auth from "../../utils/auth";

const Login = () => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <h1 className="loginHeader">Log In</h1>
      <form className="loginForm" onSubmit={handleFormSubmit}>
        <div className="loginSections">
          <label className="loginLabel" htmlFor="email">Email Address:</label>
          <input
            className="loginInput"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="loginSections">
          <label className="loginLabel" htmlFor="pwd">Password:</label>
          <input
            className="loginInput"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="loginLabel">
              Incorrect email and/or password! please try again.
            </p>
          </div>
        ) : null}
        <div className="loginSections">
          <button className="loginButton" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
