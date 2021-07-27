import './SaleList.css';
import React, {useState, useEffect} from 'react'
//import Auth from '../../utils/auth'
import { useQuery } from '@apollo/client';
import { GET_ALL_SALES, GET_ME } from '../../utils/queries';
import { TOGGLE_INTERESTED_IN } from '../../utils/actions';
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
   // const [mySavedSales, setMySavedSales] = useState([]);
    const { savedSales } = state;

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

    
    if (loading || loadingMe) {
        return (<h3>Loading...</h3>)
    } else {
        let renderedSales = data.sales
        //let mySavedSalesIds = [];
        
        console.log(renderedSales)
        // if (Auth.loggedIn()) {
        //     dataMe?.me.savedSales.map(({_id}) =>  mySavedSalesIds.push(_id))
        // }
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
                    // mySavedSales={mySavedSalesIds}
                    pathname={location.pathname}
                    />
                    
                })}
            </div>
            )
        }
    }
        
        export default SaleList
