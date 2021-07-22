import React from 'react'
import { TOGGLE_INTERESTED_IN } from '../../utils/actions';
import { useDispatch, useSelector } from 'react-redux';
import "./SaleItem.css";

const SaleItem = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  
  const {
    _id,
    location,
    startDate,
    endDate,
    description,
    image
  } = props

  const { savedSale } = state;

  const isInteresting = () => {
    dispatch({
      type: TOGGLE_INTERESTED_IN,
      saleID: _id
    })
  }

  return (
    <section className="saleItem">
      <div className="saleItemBox">
        <p>{location}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{description}</p>
        <button onClick={isInteresting}>Toggle Button</button>
      </div>
    </section>
  );
};

export default SaleItem;
