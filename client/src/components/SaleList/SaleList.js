import './SaleList.css';
import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_SALES } from '../../utils/queries';
import { format_date } from '../../utils/helpers';
import { format_address } from '../../utils/helpers';
import SaleItem from "../SaleItem/SaleItem";

const SaleList = () => {
  const { loading, data } = useQuery(GET_ALL_SALES);

    if (loading) {
        return (<h3>Loading...</h3>)
    } else {
        console.log(data)
        return (
            <div className="saleList">
                
                {data.sales.map((sale) => {
                    return <SaleItem
                    key={sale._id}
                    _id={sale._id}
                    image={sale.image}
                    location={format_address(sale.location)}
                    startDate={format_date(sale.startDate)}
                    endDate={format_date(sale.endDate)}
                    description={sale.description}
                    />
                    
                })}
            </div>
            )
        }
    }
        
        export default SaleList
