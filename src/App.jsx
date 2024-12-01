import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyNavBar from './MyNavBar';
import AddDonnation from './AddDonnation';
import List from './List';
import './App.css'
import Campein from './Campein';
function App() {
  //משתנה ששמור את סוג המטבע ואת שער הדולר
  let [coin, setCoin] = useState({ type: "S", dollarRate: 3.5 })//ערך התחלתי
  let [donation, setDonation] = useState(() => {//שומר את מערך התןרמים בלוקאל סטורג'
    //אם יש נתונים בלוקאל סטורג' אז ממיר למחרוזת ואם לא מזין נתונים התחלתיים
    return JSON.parse(localStorage.getItem("donation")) || [{ id: 0, name: "sara", dedication: "good", sum: 250, date: new Date("2024-11-5") }];
  });
//מקבלת את סוג המטבע ומשנה את סוג המטבע למה שבחר
function changeType(value) {
  let copyR = { ...coin, type: value }
  setCoin(copyR)
}
//מה שנטען בעת טעינת הדף
  useEffect(() => {
    localStorage.setItem("donation", JSON.stringify(donation));//מערך התורמים בלוקאל סטורג'
    fetch("https://v6.exchangerate-api.com/v6/2a1c83bc2582377bcaa20034/latest/USD")//המערך למציאת שער הדולר
      .then(res => res.JSON())
      .then(date => {

        setCoin({ ...coin, dollarRate: date.conversion_rates.ILS })
      })
      .catch((err)=>console.log(err))//אם יש שגיאה מדפיס אותה בקונסול
  }, [donation]);
  
  const addToDonate = (newDonation) => {//מוסיףף תרומה חדשה
    newDonation.id = donation[donation.length - 1].id + 1;// id מוסיף לכל תרומה 
    let copy = [...donation, newDonation]
    setDonation(copy);
  };
  return (
    <>
      {/* מייבא את כל הקומפוננטות */}
      <MyNavBar changeType={changeType} />
      <Campein arr={donation} coin={coin}  />
            {/* Routes לדפדןף בין הקומפוננטות*/}
      <Routes>
        {/*coin ואת addToDonate את הפונקציה  AddDonnation לעמוד props שולח ב*/}
        <Route path="AddDonation" element={<AddDonnation onAdd={addToDonate} coin={coin} />} />
        <Route path="List" element={<List donation={donation} coin={coin}/>} />
      </Routes>
    </>
  );
}
export default App;


