import React, { useState, useEffect } from "react";
import { TextField, Select, MenuItem, Box } from "@mui/material";
import One from "./One";
//  מקבל מיידע על סוג המטבע וכן את רשימה של האובייקטים שמיצג את התרומות
const List = ({ donation, coin }) => {
  let [searchName, setSearchName] = useState("");
  let [searchDedication, setSearchDedication] = useState("");
  let [filteredDonations, setFilteredDonations] = useState(donation);
  //מופעלת כל פעם שהמשתמש בוחר בסינון
  useEffect(() => {
    let find = donation.filter(item =>
      item.name.toLowerCase().includes(searchName.toLowerCase()) &&
      item.dedication.toLowerCase().includes(searchDedication.toLowerCase()));
    setFilteredDonations(find);
  }, [searchName, searchDedication, donation]);

  // פונקצית מיון מקבלת את האירוע - את מה רוצים למיין אות את הסכום או התאריך
  //ולוקחת 2 איברים סמוכים ומפחיתה את הסכומים שלהם וככה ממיננת את כל הרשימה
  let sortDonations = (e) => {
    let sorted = [...filteredDonations].sort((a, b) =>
      e.target.value === "sum" ? a.sum - b.sum : new Date(b.date) - new Date(a.date)
    );
    setFilteredDonations(sorted);
  };
  return (

    <div className="search">
      <Select
        defaultValue=""
        onChange={sortDonations}
        displayEmpty
        variant="outlined"
        fullWidth
        style={{ marginBottom: "10px", width: "150px", marginRight: "50px" }}
      >
        <MenuItem value="sum">By sum</MenuItem>
        <MenuItem value="date">By date</MenuItem>
      </Select>

      <TextField
        label="Search by name"
        variant="outlined"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        fullWidth
        style={{ marginBottom: "10px", width: "150px", marginRight: "50px" }}
      />
      <TextField
        label="Search by dedication"
        variant="outlined"
        value={searchDedication}
        onChange={(e) => setSearchDedication(e.target.value)}
        fullWidth
        style={{ marginBottom: "10px", width: "150px" }}
      />
      {filteredDonations.map((item) => (
        <p key={item.id}>
          <One find={item} coin={coin} />
        </p>
      ))}
    </div>
  );
};

export default List;