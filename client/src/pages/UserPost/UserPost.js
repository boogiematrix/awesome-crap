import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_SALE } from "../../utils/mutations";
import DatetimePicker from 'react-datetime-picker';
import { useHistory } from "react-router";
import { HIDE_DATE_WARNING, SHOW_DATE_WARNING } from "../../utils/actions";
import { useDispatch, useSelector } from 'react-redux';
import "./UserPost.css";

const UserPost = (props) => {
  const [formState, setFormState] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    startDate: "",
    endDate: "",
    description: "",
    image: "",
  });
  const [addSale] = useMutation(ADD_SALE);
  const history = useHistory();
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const location =
      `${formState.street}+${formState.city}+${formState.state}+${formState.zip}`.replaceAll(
        " ",
        "+"
      );
    if (!formState.startDate || !formState.endDate) {
      console.log('problemo')
      dispatch({
        type: SHOW_DATE_WARNING
      })
      return
    }
    const { data } = await addSale({
      variables: {
        location: location,
        startTime: formState.startTime,
        endTime: formState.endTime,
        startDate: formState.startDate,
        endDate: formState.endDate,
        description: formState.description,
        image: formState.image,
      },
    });
    dispatch({
      type: HIDE_DATE_WARNING
    })
    history.push('/')
  };

  const handleStartDateChange = (value) => {
    console.log(value)
    const label = "startDate"
    setFormState({
      ...formState,
      [label]: value
    })
  }

  const handleEndDateChange = (value) => {
    console.log(value)
    const label = "endDate"
    setFormState({
      ...formState,
      [label]: value
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };


  return (
    Auth.loggedIn ? (

      <div>
      <h1 className="addSale">Add A Sale</h1>
      <form onSubmit={handleFormSubmit}>
      <div className="saleCategory">
        <h3 className="newSaleSection">Address</h3>
        <section>
          <label htmlFor="street">Street:</label>
          <input
            placeholder="street"
            name="street"
            type="street"
            id="street"
            required
            onChange={handleChange}
            />
          <label htmlFor="city">City:</label>
          <input
            placeholder="city"
            name="city"
            type="city"
            id="city"
            required
            onChange={handleChange}
            />
          <label htmlFor="state">State:</label>
          <input
            placeholder="state"
            name="state"
            type="state"
            id="state"
            required
            onChange={handleChange}
            />
          <label htmlFor="Zip">Zip:</label>
          <input
            placeholder="zip"
            name="zip"
            type="zip"
            id="zip"
            required
            onChange={handleChange}
            />
        </section>
        </div>
        <div className="saleCategory">
        <h3 className="newSaleSection">Date</h3>
        <section>
          <label htmlFor="startDate">Start Date:</label>
          <DatetimePicker
            disableClock={true}
            disableCalendar={true}
            name="startDate"
            minDate={new Date()}
            onChange={handleStartDateChange}
            />
          <label htmlFor="endDate">End Date:</label>
          <DatetimePicker
            disableClock={true}
            disableCalendar={true}
            name="endDate"
            minDate={formState.startDate}
            onChange={handleEndDateChange}
            />
          </section>
          <h3 style={{ visibility: state.dateWarning , color:"red" }}>Start and end dates required!</h3>
        </div>
        <div className="saleCategory">
        <h3 className="newSaleSection">Details</h3>
        <section>
          <label htmlFor="description">Description:</label>
          <input
            placeholder="description"
            name="description"
            type="description"
                id="description"
                required
            onChange={handleChange}
            />
          <label htmlFor="image">Image:</label>
          <input
            placeholder="image"
            alt={formState.description}
            name="image"
            id="image"
            onChange={handleChange}
            />
        </section>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    ) : (
        <h2>You need to be logged in!</h2>
  )
  );
};

export default UserPost;
