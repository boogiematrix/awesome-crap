import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth";
import { ADD_SALE } from "../../utils/mutations";
import DatetimePicker from "react-datetime-picker";
import { useHistory } from "react-router";
import { HIDE_DATE_WARNING, SHOW_DATE_WARNING } from "../../utils/actions";
import { useDispatch, useSelector } from "react-redux";
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
  const state = useSelector((state) => state);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const location =
      `${formState.street}+${formState.city}+${formState.state}+${formState.zip}`.replaceAll(
        " ",
        "+"
      );
    if (!formState.startDate || !formState.endDate) {
      console.log("problemo");
      dispatch({
        type: SHOW_DATE_WARNING,
      });
      return;
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
      type: HIDE_DATE_WARNING,
    });
    history.push("/");
  };

  const handleStartDateChange = (value) => {
    console.log(value);
    const label = "startDate";
    setFormState({
      ...formState,
      [label]: value,
    });
  };

  const handleEndDateChange = (value) => {
    console.log(value);
    const label = "endDate";
    setFormState({
      ...formState,
      [label]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return Auth.loggedIn ? (
    <div>
      <h1 className="addSale">Add A Sale</h1>
      <form className="postForm" onSubmit={handleFormSubmit}>
        <div className="infoSection">
          <div className="saleCategory">
            <h3 className="newSaleSection">Address</h3>
            <section className="saleBox">
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
              <select
                placeholder="state"
                name="state"
                type="state"
                id="state"
                required
                onChange={handleChange}
              >
                <option value="AL">AL</option>
                <option value="AK">AK</option>
                <option value="AZ">AZ</option>
                <option value="AR">AR</option>
                <option value="CA">CA</option>
                <option value="CO">CO</option>
                <option value="CT">CT</option>
                <option value="DE">DE</option>
                <option value="DC">DC</option>
                <option value="FL">FL</option>
                <option value="GA">GA</option>
                <option value="HI">HI</option>
                <option value="ID">ID</option>
                <option value="IL">IL</option>
                <option value="IN">IN</option>
                <option value="IA">IA</option>
                <option value="KS">KS</option>
                <option value="KY">KY</option>
                <option value="LA">LA</option>
                <option value="ME">ME</option>
                <option value="MD">MD</option>
                <option value="MA">MA</option>
                <option value="MI">MI</option>
                <option value="MN">MN</option>
                <option value="MS">MS</option>
                <option value="MO">MO</option>
                <option value="MT">MT</option>
                <option value="NE">NE</option>
                <option value="NV">NV</option>
                <option value="NH">NH</option>
                <option value="NJ">NJ</option>
                <option value="NM">NM</option>
                <option value="NY">NY</option>
                <option value="NC">NC</option>
                <option value="ND">ND</option>
                <option value="OH">OH</option>
                <option value="OK">OK</option>
                <option value="OR">OR</option>
                <option value="PA">PA</option>
                <option value="RI">RI</option>
                <option value="SC">SC</option>
                <option value="SD">SD</option>
                <option value="TN">TN</option>
                <option value="TX">TX</option>
                <option value="UT">UT</option>
                <option value="VT">VT</option>
                <option value="VA">VA</option>
                <option value="WA">WA</option>
                <option value="WV">WV</option>
                <option value="WI">WI</option>
                <option value="WY">WY</option>
                <option value="AS">AS</option>
                <option value="GU">GU</option>
                <option value="MH">MH</option>
                <option value="FM">FM</option>
                <option value="MP">MP</option>
                <option value="PW">PW</option>
                <option value="PR">PR</option>
                <option value="VI">VI</option>
              </select>
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
            <h3 className="newSaleSection">Date & Time</h3>
            <section className="saleBox">
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
            <h3 style={{ visibility: state.dateWarning, color: "red" }}>
              Start and end dates required!
            </h3>
          </div>
          <div className="saleCategory">
            <h3 className="newSaleSection">Details</h3>
            <section className="saleBox">
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
                accept=".png, .jpg, .jpeg"
                alt={formState.description}
                name="image"
                id="image"
                onChange={handleChange}
              />
            </section>
          </div>
        </div>
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  ) : (
    <h2>You need to be logged in!</h2>
  );
};

export default UserPost;
