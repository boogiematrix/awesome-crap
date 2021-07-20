import "./Login.css";
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';


const Login = () => {

  const [formState, setFormState] = useState({ email: '', password: ''});
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit  = async (event) => {
    event.preventDefault();
    try{
      const mutationResponse = await login({
        variables : { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    }catch (error){
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
    [ name]: value,
    });
  };

  return (
    <div className="login">
      <Header />
      <Nav />
        <from onSubmit={handleFormSubmit}>
          <div className="">
            <label htmlFor="email">Email adress:</label>
            <input placeholder="youremail@test.com"
                   name="email"
                   type="email"
                   id="email"
                   onChange={handleChange}
              />
          </div>
          <div>
          
          </div>
        </form>

      <Footer />
    </div>
  );
};

export default Login;
