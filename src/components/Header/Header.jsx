






import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Utility/firebase";

function Header() {
  const { state } = useContext(DataContext);
  const {user, basket } = state; // Access basket from state

  console.log(basket.length);

  // Calculate total items in basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="amazon-logo"
              />
            </Link>
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* search */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" placeholder="search product" />
            <BsSearch size={38} />
          </div>

          <div className={classes.order__container}>
            <Link to="" className={classes.language}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Flag_of_the_United_States.png"
                alt=""
              />
              <select className={classes.en}>
                <option value="EN">EN</option>
              </select>
            </Link>
            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p>Hello, {user?.email?.split("@")[0]}</p>
                    <span
                      onClick={() => auth.signOut()}
                      className={classes.sign__Out}
                    >
                      Sign Out
                    </span>
                  </>
                ) : (
                  <>
                    <p> Hello, Sign In</p>
                    <span className={classes.account__list}>
                      Account and Lists
                    </span>
                  </>
                )}
              </div>
            </Link>
            <Link to="/orders">
              <p>returns</p>
              <span className={classes.orders}>& Orders</span>
            </Link>
            <Link to="/cart" className={classes.cart}>
              <BiCart size={25} />
              <span>{totalItem || 0}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header;









