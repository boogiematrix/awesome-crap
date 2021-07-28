import './OriginalSales.css';
import React from 'react';
import Auth from '../../utils/auth'
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { format_date } from '../../utils/helpers';
import { format_address } from '../../utils/helpers';
import SaleItem from '../SaleItem/SaleItem';

export const OriginalSales = () => {
    const { loading, data } = useQuery(GET_ME);

        if (loading) {
            return (<h2>Loading...</h2>)
        } else {
            console.log(data)
            return (
                <div className="userSale">
                    <h2>Your Crap</h2>
                    {data.me.sales.map((sale) => {
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

