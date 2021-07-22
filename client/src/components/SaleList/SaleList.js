import './SaleList.css';
import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_SALES } from '../../utils/queries';

import SaleItem from '../SaleItem/SaleItem';

const SaleList = () => {
    const { loading, data } = useQuery(GET_ALL_SALES)

    if (loading) {
        return (<h3>Loading...</h3>)
    } else {
        console.log(data)
        return (
            <div className="saleList">
                {/* TODO: Create loop for available sale items */}
                {/* Is this a list??? */}
                {data.sales.map((sale) => {
                    return <SaleItem
                    key={sale._id}
                    _id={sale._id}
                    image={sale.image}
                    location={sale.location}
                    startDate={sale.startDate}
                    endDate={sale.endDate}
                    description={sale.description}
                    />
                    
                })}
            </div>
            )
        }
    }
        
        export default SaleList
