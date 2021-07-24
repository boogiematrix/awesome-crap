import React from 'react'
import { useMutation } from '@apollo/client';
import { TOGGLE_INTERESTED_IN } from '../../utils/actions';
import { SAVE_SALE, UNSAVE_SALE } from '../../utils/mutations';
import { useDispatch, useSelector } from 'react-redux';
import "./SaleItem.css";

const SaleItem = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state)
  const [saveSale, { error }] = useMutation(SAVE_SALE)
  const [unsaveSale] = useMutation(UNSAVE_SALE)
  
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

  const imInterested = async () => {
    if (isInterested) {
      dispatch({
        type: TOGGLE_INTERESTED_IN,
        isInterested: isInterested,
        saleID: _id
      })
      await unsaveSale({
        variables: {
          _id: _id
        }
      })
    } else {
      await saveSale({
        variables: {
          _id,
          location,
          startDate,
          endDate,
          description,
          image
        }
      })
    }
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
