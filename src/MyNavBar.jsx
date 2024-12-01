import { Link } from 'react-router-dom';
import React from 'react';
import './App'
import image from './imnn.jpg';
import "./navBar.css"
const MyNavBar = ({ changeType }) => {
  return (
    <nav className='head'>
      <button className="button" onClick={() => changeType('S')}>Shekel</button>
      <button className="button" onClick={() => changeType('D')}>Dollar</button>
      <Link to="List" className='link'>List</Link>
      <Link to="addDonation" className='link'>Add Donation</Link>
      <img src={image} alt=" לוגו" />
    </nav>
  );
};

export default MyNavBar;
