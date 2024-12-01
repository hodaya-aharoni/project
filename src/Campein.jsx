import { useState, useEffect } from 'react';
import { fromSekelToX } from './function';
import './Campein.css';
import image from './ip.png';
//מקבל בפרופ את המערך ואת המטבע
function Campein(props) {
    const goal = 500000;//מאתחל את היעד
    let [percent, setPercent] = useState(0);
    let [allDonations, setAllDonations] = useState(0);
//כל פעם שמערך התרומות משתנה
    useEffect(() => {
        let totalDonations = props.arr.reduce((acc, donation1) => acc + Number(donation1.sum), 0);//סוכם את כל התרומות שנתרמו עד כה
        setAllDonations(totalDonations);
        let precentT = ((totalDonations / goal) * 100).toFixed(2);
        setPercent(precentT);
    }, [props.arr, goal]);

    return (
        <div className="donationCampein">
            <img src={image} alt="תמונה של ילד" className='img' />
            <h1> Want to help Shimon?</h1>
            <div className="percentContainer">
                <div className="percentBackGround">
                    <div className="percent" style={{ width: `${percent}%` }}></div>
                </div>
                <div className="percentText">{percent}%</div>
            </div>
            <h2>Target:
                {props.coin.type === "S" && " ₪"}
                {(Math.floor(fromSekelToX(goal, props.coin.type, props.coin.dollarRate)).toLocaleString())}
                {props.coin.type === "D" && "$"}
            </h2>
            <h2>Donated:
                {props.coin.type === "S" && " ₪"}
                {(Math.floor(fromSekelToX(allDonations, props.coin.type, props.coin.dollarRate)).toLocaleString())}
                {props.coin.type === "D" && "$"}
            </h2>

            <h3>Number of Donations: {props.arr.length}</h3>
        </div>
    );
}

export default Campein;