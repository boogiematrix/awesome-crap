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

  const { savedSales } = state;
  let isInterested = savedSales.includes(_id)

  const imInterested = () => {
    dispatch({
      type: TOGGLE_INTERESTED_IN,
      isInterested: isInterested,
      saleID: _id
    })
  }
console.log(savedSales)
  
    return (
      <section className="saleItem">
      <div className="saleItemBox">

        <p>{location}</p>
        <p>{startDate}</p>
        <p>{endDate}</p>
        <p>{description}</p>
        {isInterested ? (<button className="saleItemBtn" onClick={imInterested}>I'm Aware of This Crap</button>)
       : <button className="saleItemBtn" onClick={imInterested}>I Want This Crap!</button>
      }

      </div>
    </section>
  );

};

export default SaleItem;
