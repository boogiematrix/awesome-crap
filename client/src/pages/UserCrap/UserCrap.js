import SaleList from "../../components/SaleList/SaleList";
import "./UserCrap.css";


const userCrap = (props) => {
    return (
        <div className='usercrap'>
            <SaleList location={props.location}/>
        </div>
    )
}

export default userCrap
