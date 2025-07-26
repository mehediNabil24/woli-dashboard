
import { Link } from "react-router";
import logo from "../../assets/logo3.png"
const MenuItem = () => {
    return (
        <div className='bg-[#000000] '>
          <div className="!max-w-[1200px] pl-14 lg:pl-34 pt-4">
          <Link to=>
            <div className="w-[90px] max-w-[1300px] ">
              <img src={logo} alt="as" />
          </div>
          </Link>
          </div>
        </div>
    );
};

export default MenuItem;