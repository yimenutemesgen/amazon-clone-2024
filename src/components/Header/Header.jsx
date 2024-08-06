





import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import { auth } from "../../firebase";
import LowerHeader from "../LowerHeader/LowerHeader";
import "./Header.css";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header__wrapper">
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt="Amazon Logo"
          />
        </Link>

        <div className="header__address">
          <SlLocationPin className="header__locationIcon" />
          <div className="header__addressInfo">
            <span className="header__optionLineOne">Deliver to:</span>
            <span className="header__optionLineTwo">Ethiopia</span>
          </div>
        </div>

        <div className="header__searchDropdownContainer">
          <select className="header__searchDropdown">
            <option value="all">All</option>
            {/* Add more options as needed */}
          </select>
        </div>

        <div className="header__search">
          <input className="header__searchInput" type="text" />
          <BsSearch className="header__searchIcon" />
        </div>

        <div className="header__language">
          <img
            className="header__flagIcon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1280px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
            alt="US Flag"
          />
          <select className="header__languageSelect">
            <option value="EN">EN</option>
            {/* Add more language options as needed */}
          </select>
        </div>

        <div className="header__nav">
          <Link to={!user && "/login"}>
            <div onClick={handleAuthenticaton} className="header__option">
              <span className="header__optionLineOne">
                Hello, {!user ? "Sign In" : user.email}
              </span>
              <span className="header__optionLineTwo">
                {user ? "Sign Out" : "Account & Lists"}
              </span>
            </div>
          </Link>

          <Link to="/orders">
            <div className="header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>

          <Link to="/checkout">
            <div className="header__optionBasket">
              <BiCart />
              <span className="header__optionLineTwo header__basketCount">
                {basket?.length}
              </span>
            </div>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </div>
  );
}

export default Header;


