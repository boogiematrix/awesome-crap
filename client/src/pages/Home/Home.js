import "./Home.css";
import SaleList from '../../components/SaleList/SaleList';

const Home = (props) => {
  return (
    <div className="home">
      <SaleList location={props.location}/>
    </div>
  );
};

export default Home;
