import SaleList from "../../components/SaleList/SaleList";
import { OriginalSales } from "../../components/OriginalSales/OriginalSales";
import "./UserCrap.css";


const userCrap = (props) => {
    return (
        <div className='usercrap'>
            <SaleList location={props.location}/> 
            <OriginalSales />
        </div>
    )
}

export default userCrap
