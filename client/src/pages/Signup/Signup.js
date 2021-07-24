import "./Signup.css";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        username: formState.username,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="signup">
      <h1 className="signupHeader">Sign Up</h1>
      <form className="signupForm" onSubmit={handleFormSubmit}>
        <div className="signupSections">
          <label className="signupLabel" htmlFor="username">
            Username:
          </label>
          <input
            className="signupInput"
            placeholder="username"
            name="username"
            type="username"
            id="username"
            onChange={handleChange}
          />
        </div>

        <div className="signupSections">
          <label className="signupLabel" htmlFor="email">
            Email:
          </label>
          <input
            className="signupInput"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>

        <div className="signupSections">
          <label className="signupLabel" htmlFor="pwd">
            Password:
          </label>
          <input
            className="signupInput"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        <div className="signupSections">
          <button className="signupButton" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
