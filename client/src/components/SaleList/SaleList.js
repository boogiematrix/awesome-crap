import './SaleList.css';
import React from 'react'
import Auth from '../../utils/auth'
import { useQuery } from '@apollo/client';
import { GET_ALL_SALES, GET_ME } from '../../utils/queries';
import { format_date } from '../../utils/helpers';
import { format_address } from '../../utils/helpers';

import SaleItem from "../SaleItem/SaleItem";

const SaleList = () => {

    const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
    const { loading, data } = useQuery(GET_ALL_SALES)

    if (loading || loadingMe) {

        return (<h3>Loading...</h3>)
    } else {
        let mySavedSales = [];
        console.log(data)
        if (Auth.loggedIn) {
            dataMe.me.savedSales.map(({_id}) =>  mySavedSales.push(_id))
        }
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
                    mySavedSales={mySavedSales}
                    />
                    
                })}
            </div>
            )
        }
    }
        
        export default SaleList
