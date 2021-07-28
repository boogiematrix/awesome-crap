import './SaleList.css';
import React from 'react';
import Auth from '../../utils/auth'
import { useQuery } from '@apollo/client';
import { GET_ALL_SALES, GET_ME } from '../../utils/queries';
import { format_date } from '../../utils/helpers';
import { format_address } from '../../utils/helpers';

import SaleItem from "../SaleItem/SaleItem";

const SaleList = (props) => {

    const { location } = props;
    const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);
    const { loading, data } = useQuery(GET_ALL_SALES)

    if (loading || loadingMe) {
        return (<h3>Loading...</h3>)
    } else {
        let renderedSales = data.sales
        let mySavedSales = [];
        console.log(renderedSales)
        if (Auth.loggedIn()) {
            dataMe?.me.savedSales.map(({_id}) =>  mySavedSales.push(_id))
        }
        if (location.pathname === '/usercrap') {
            renderedSales = dataMe?.me.savedSales
            console.log(`savedsales ${renderedSales}`)
        }
        return (
            <div className="saleList">

                {renderedSales.map((sale) => {
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
