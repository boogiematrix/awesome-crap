import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { useMutation, useQuery } from '@apollo/client';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Auth  from '../../utils/auth'
import { TOGGLE_INTERESTED_IN } from '../../utils/actions';
import { GET_ME } from '../../utils/queries';
import { SAVE_SALE, UNSAVE_SALE } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';
import "./SaleItem.css";


const SaleItem = (props) => {
let userData = {}

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const [saveSale, { error }] = useMutation(SAVE_SALE)
  const [unsaveSale] = useMutation(UNSAVE_SALE)
  const { loading, data } = useQuery(GET_ME)

  const {
    _id,
    location,
    startDate,
    endDate,
    description,
    image,
    mySavedSales
  } = props

  const { savedSales } = state;

  let isInterested = savedSales.includes(_id) || mySavedSales.includes(_id)

  const imInterested = async () => {
    dispatch({
      type: TOGGLE_INTERESTED_IN,
      isInterested: isInterested,
      saleID: _id
    })
    if (isInterested) {
      await unsaveSale({
        variables: {
          _id: _id
        }
      })
    } else {
      try {
        await saveSale({
          variables: {
            _id: _id,
            location: location,
            startDate: startDate,
            endDate: endDate,
            description: description,
            image: image
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  const fetchCoordinates = (location) => {

    var qAddress = location.address
    var qCity = location.city
    var qState = location.state
    var qZIP = location.zip

    var geoSearch = "https://maps.googleapis.com/maps/api/geocode/json?address=" + qAddress + ",+" + qCity + ",+" + qState + ",+" + qZIP + "&key=AIzaSyA0E2xlF5DnuUkpFRByU1eb_e-AbdZGjjM";

    fetch(geoSearch)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            generateMap(data);
        })
  };

  const generatemap = (data) =>{

    const geoData = { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng };
    const MyMapComponent = compose(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA0E2xlF5DnuUkpFRByU1eb_e-AbdZGjjM&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `50%` }} />,
      containerElement: <div style={{ height: `300px`, width: `300px` }} />,
      mapElement: <div style={{ height: `50%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ geoData }}>
      {props.isMarkerShown && (
        <Marker position={{ geoData }} />
      )}
    </GoogleMap>
    ));
    ReactDOM.render(<MyMapComponent isMarkerShown />, document.getElementById("map"));
  }


    return (
      <section className="saleItem">
      <div className="saleItemBox">

        <p>{location}</p>
        <div id="map"></div>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{description}</p>

          {Auth.loggedIn() ? (isInterested ? (<button className="saleItemBtn" onClick={imInterested}>I'm Aware of This Crap</button>)
            : <button className="saleItemBtn" onClick={imInterested}>I Want This Crap!</button>
          ) : (<p></p>)}
      </div>
    </section>
  );

};

export default SaleItem;
