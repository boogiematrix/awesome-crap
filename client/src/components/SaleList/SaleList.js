import './SaleList.css';
import Auth from '../../utils/auth'

import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { GET_ALL_SALES, GET_ME } from '../../utils/queries';
import { ADD_SALE_ITEM, REMOVE_SALE_ITEM, TOGGLE_INTERESTED_IN } from '../../utils/actions';
import { format_date } from '../../utils/helpers';
import { format_address } from '../../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';

import SaleItem from "../SaleItem/SaleItem";

const SaleList = (props) => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state)
    const { location } = props;
    const { loading: loadingMe, data: dataMe } = useQuery(GET_ME);

    const { loading, data } = useQuery(GET_ALL_SALES);
    const { savedSales, sales } = state;

    useEffect(() => {
        if (dataMe) {
            dataMe.me.savedSales.forEach((sale) => {
                dispatch({
                    type: TOGGLE_INTERESTED_IN,
                    isInterested: false,
                    sale: sale
                })
            })
            return function () {
                dataMe.me.savedSales.forEach((sale) => {
                    dispatch({
                        type: TOGGLE_INTERESTED_IN,
                        isInterested: true,
                        sale: sale
                    })
                })
            }
        };
    }, [dataMe, dispatch])

    useEffect(() => {
        if (data) {
            data.sales.forEach((sale) => {
                dispatch({
                    type: ADD_SALE_ITEM,
                    sale: sale
                })
            })
            return function () {
                data.sales.forEach((sale) => {
                    dispatch({
                        type: REMOVE_SALE_ITEM,
                        _id: sale._id,
                    })
                })
            }
        };
    }, [data, dispatch])

    if (loading || loadingMe) {
        return (<h3>Loading...</h3>)
    } else {
        let renderedSales = sales

        if (location.pathname === '/usercrap') {
            renderedSales = savedSales;
            console.log(`savedsales ${JSON.stringify(savedSales) }`)
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
                    pathname={location.pathname}
                    />

                })}
            </div>
            )
        }
    }

        export default SaleList
