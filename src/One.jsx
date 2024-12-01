import React from 'react';
import { dateDiff, fromSekelToX } from './function';
import './one.css'
//מקבל בלולאה את מערך התרומות ואת המטבע
const One = (props) => {
  return (
    <div className="donnation">
      <h2>name: {props.find.name} </h2>
      <h3>dedication: {props.find.dedication}</h3>
      <h3>
   {/* הסכום יומר לשקלים ,fromSekelToX אם בחרו להמיר לשקלים אז הסכום ילך לפונקציה */}
      {props.coin.type === "S" && (
    <span>sum: {fromSekelToX(props.find.sum, props.coin.type, props.coin.dollarRate)}</span>
  )}
       {/* הסכום יומר דולרים ,fromSekelToX אם בחרו להמיר לדולרים אז הסכום ילך לפונקציה */}

  {props.coin.type === "D" && (
    <span>sum: ${fromSekelToX(props.find.sum, props.coin.type, props.coin.dollarRate)}</span>
  )}
   </h3>
   {/* מציג את ההפרש בין תאריכים dateDiff הולך לפונרציה  */}

      {dateDiff(props.find.date)}
    </div>
  );
};
export default One;
