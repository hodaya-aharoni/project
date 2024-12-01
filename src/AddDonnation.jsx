import { useState } from "react";
import './AddDonnation.css'
import { checkCoins } from "./function";
import Swal from 'sweetalert2';
//מקבל את מערך התרומות ואת המטבע
const AddDonnation = (props) => {
    let [myErrors, setMyErrors] = useState({})//אובייקט שמכיל הודעות שגיאה לכל שדה בטופס.
    let [empty, setEmpty] = useState({//  מערך התורמים שבכל תא במערך יהיה את הערכים הבאים
        name: " ",
        dedication: " ",
        sum: " ",
        date: new Date()//מאותחל לתאריך של היום
    })

//בדיקת תקינות לערכים שהוזנו + החזרת הודעת שגיאה
    const validate = () => {
        let err = {};
        if (!empty.name)//אם השדה ריק
            err.name = "Mandatory field"
        else if (empty.name.length < 1)//אם אורך השם קטן מאחד
            err.name = "Immediate short name"
        if (!empty.sum)//אם הסכום ריק
            err.sum = "Mandatory field"
        else if (empty.sum <= 0)// אם הסכום שווה לאפס
            err.sum = "No amount selected"
        showError(err)
        return err;//מחזירה את השגיאה
    }
    const showError = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
        })
    };
    const showThank = () => {
        Swal.fire({
            title: 'Thank You!',
            text: 'We deeply appreciate your contribution and support for our project. It means a lot to us!',
            icon: 'success',
            confirmButtonText: 'Close',
            confirmButtonColor: '#3085d6',
            background: '#fefefe',
            customClass: {
                popup: 'thank-you-popup',
            },
        });
    };


    const save = (e) => {//מקבלת את הנתונים שהוכנסו
        e.preventDefault();//מונע את רענון הדף כברירת מחדל
        let coinNew = checkCoins(props.coin.type, props.coin.dollarRate, empty.sum);//checkCoins שולח לפונקציה 
        let result = validate();//result מכניס את השגיאה לתוך 
        if (Object.keys(result).length == 0) {/// ריק זה אומר שאין שגיאות result בודק עם מה שחזר 
            let donate = { ...empty, date: new Date(), sum: coinNew } // מעדכנת את הערך של השדה המתאים (name) במצב של empty.
            setEmpty(donate)
            showThank()
            props.onAdd(donate)//קוראת לפונקציה onAdd שזמינה מתוך props.
        }
        //בשגיאה שהתקבלה  MyErrors מעדכן את 
        setMyErrors(result)
    }
    const change = (e) => {//onChange נגשת כל פעם שיש שינוי ב 
        let { type, value, name } = e.target;//unput מייצגת את הקלט שהוכנס ל 
        if (type == "number")//number אם הקלט מסוג 
            value = +value;//למספר value ממירה את ה
        let copy = { ...empty };
        copy[name] = value;
        setEmpty(copy);
    }
    return (
        <form className="forms" onSubmit={save}>
        <label>name </label>
        <input name="name" type="text" value={empty.name} onChange={change} />
        {myErrors.name && <div style={{ color: "red" }}>{myErrors.name}</div>}
        <label>dedication </label>
        <input name="dedication" type="text" value={empty.dedication} onChange={change} />
        {myErrors.dedication && <>{myErrors.dedication}</>}
        <label>sum </label>
        <input name="sum" type="text" value={empty.sum} onChange={change} />
        {myErrors.sum && <div style={{ color: "red" }}>{myErrors.sum}</div>}
        <input type="submit" value="send" className="sabmit" />
    </form>);
}
export default AddDonnation;

