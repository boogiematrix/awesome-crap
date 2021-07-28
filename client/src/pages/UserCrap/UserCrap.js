import SaleList from "../../components/SaleList/SaleList";
import { OriginalSales } from "../../components/OriginalSales/OriginalSales";
import "./UserCrap.css";


const userCrap = (props) => {
    return (
        <div className='usercrap'>
            <OriginalSales />
            <SaleList location={props.location}/>
        </div>
    )
}

export default userCrap
