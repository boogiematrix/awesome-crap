import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import { useMutation, useQuery } from '@apollo/client';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Auth from '../../utils/auth'
import { GET_ME } from '../../utils/queries';
import { TOGGLE_INTERESTED_IN } from '../../utils/actions';
import { SAVE_SALE, UNSAVE_SALE } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';

import "./SaleItem.css";

const SaleItem = (props) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const [saveSale] = useMutation(SAVE_SALE)
  const [unsaveSale] = useMutation(UNSAVE_SALE)
  const { loading, data } = useQuery(GET_ME)


  const {
    _id,
    location,
    startDate,
    endDate,
    description,
    image,
    unformattedAddress,
    isOriginalSale
  } = props

  const { savedSales } = state;

  const savedSalesIds = savedSales.map(({_id}) => _id)
  const sale = {
    _id: _id,
    location: location,
    startDate: startDate,
    endDate: endDate,
    description: description,
    image: image
  }
  
  let isInterested = savedSalesIds.includes(_id)
  

  const imInterested = async () => {
    dispatch({
      type: TOGGLE_INTERESTED_IN,
      isInterested: isInterested,

      sale: sale
    })

    if (isInterested) {
      await unsaveSale({
        variables: {
          _id: _id,
        },
      });
    } else {
      try {
        await saveSale({
          variables: {
            _id: _id,
            location: location,
            startDate: startDate,
            endDate: endDate,
            description: description,
            image: image,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  
  const generatemap = (data) =>{
    console.log(`data ${JSON.stringify(data)}`)
    const geoData = { lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng };
    console.log(`geoData ${JSON.stringify(geoData)}`)
    const MyMapComponent = compose(
      withProps({
        googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyA0E2xlF5DnuUkpFRByU1eb_e-AbdZGjjM&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `50%` }} />,
        containerElement: <div style={{ height: `300px`, width: `auto` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
      )((props) => (
        <GoogleMap defaultZoom={8} defaultCenter={ geoData }>
      {props.isMarkerShown && (
        <Marker position={ geoData } />
        )}
    </GoogleMap>
    ));
    ReactDOM.render(<MyMapComponent isMarkerShown />, document.getElementById(_id));
  }
  
  const fetchCoordinates = () => {


    var geoSearch = "https://maps.googleapis.com/maps/api/geocode/json?address=" + unformattedAddress + "&key=" + process.env.REACT_APP_GOOGLE_API;

    fetch(geoSearch)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            generatemap(data);
        })
  };
  

  return (
    <section className="saleItem">
      <div className="saleItemBox">

        <h3>Where</h3>
        <p>{location}</p>
        <h3>Starts</h3>
        <p>{startDate}</p>
        <h3>Ends</h3>
        <p>{endDate}</p>
        <h3>Description</h3>
        <p>{description}</p>

          {!isOriginalSale ?( 
        <div>
          {image ? (
            <img
            src={image}
            alt={description}
                style={{ width: "70%", height: "70%", borderRadius: "20px", border: "5px solid gray" }}
            />
            ) : (
              <p></p>
              )}
              <div id={_id} className="map">{fetchCoordinates()}</div>
        </div>
          ): (<p></p>)}

<br />
        {Auth.loggedIn() ? (
          isInterested ? (
            <button className="saleItemBtn" onClick={imInterested}>
              I'm Aware of This Crap
            </button>
          ) : (
            <button className="saleItemBtn" onClick={imInterested}>
              I Want This Crap!
            </button>
          )
        ) : (
          <p></p>
        )}

      </div>
    </section>
  );
};

export default SaleItem;
