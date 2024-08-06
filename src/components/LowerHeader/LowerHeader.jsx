





import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import "./LowerHeader.css";

function LowerHeader() {
  return (
    <div className="lower__container">
      <ul className="lower__list">
        <li className="lower__listItem lower__all">
          <AiOutlineMenu className="lower__menuIcon" />
          <p className="lower__allText">All</p>
        </li>
        <li className="lower__listItem">Today's Deals</li>
        <li className="lower__listItem">Customer Service</li>
        <li className="lower__listItem">Registry</li>
        <li className="lower__listItem">Gift Cards</li>
        <li className="lower__listItem">Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
