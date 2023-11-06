import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import DateTimePicker from 'react-datetime-picker';
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';




export default function ListEntries() {
    const [users, setUsers] = useState([]);
    const [dbUsers, setDBUsers] = useState([]);
    const [fromTimestamp, setFromTimestamp] = useState(null);
    const [toTimestamp, setToTimestamp] = useState(null);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [value, setValue] = useState("10:00");

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        axios.get('http://localhost:8888/api/users/').then(function (response) {
            console.log(response.data);
            response.data.sort(function(a, b) {
                return a.timestamp < b.timestamp;
            });

            setUsers(response.data);
            setDBUsers(response.data);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:8888/api/users/${id}/delete`).then(function (response) {
            console.log(response.data);
            getUsers();
        });
    }

    const removeFilter = () => {
        setUsers(dbUsers)
    }

    const handleFilter = () => {
        // Filter the users based on the "from" and "to" timestamps
        const filteredUsers = users.filter(user => {
            const timestamp = user.timestamp;
            var t = timestamp.split(/[- :]/);
            console.log("from time", fromTimestamp)
            console.log("to time", toTimestamp)
            

// Apply each element to the Date function
var timenew = Date.parse(new Date(Date.UTC(t[0], t[1]-1, t[2])));
console.log("curr", timenew)
            return ( timenew >= fromTimestamp) && ( timenew <= toTimestamp);
        });
        setUsers(filteredUsers);
    }

    return (
        // style={{height: "500px", width: "100%"}}
        <div>
            <h1 style={{ fontSize: "24px", color: "##000000" }}>List Entries</h1>
            <div > 
                <label style={{display : "inline"}}>From time  <DatePicker

selected={startDate}
onChange={(date) => {
  let date_timestamp = Date.parse(date);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let miliseconds = date.getMilliseconds();
  let time = date.getTime();
  let date_Date =
    time -
    hours * 3600 * 1000 -
    minutes * 60 * 1000 -
    seconds * 1000 -
    miliseconds;
  console.log(date_Date);
  console.log(new Date(date_Date));
  setStartDate(date_Date);
  setFromTimestamp(date_Date);
}}
/></label>
            <label style={{display : "inline"}}>To Time <DatePicker
              selected={endDate}
              onChange={(date) => {
                let date_timestamp = Date.parse(date);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();
                let miliseconds = date.getMilliseconds();
                let time = date.getTime();
                let date_Date =
                  time -
                  hours * 3600 * 1000 -
                  minutes * 60 * 1000 -
                  seconds * 1000 -
                  miliseconds;
                console.log(date_Date);
                console.log(new Date(date_Date));
                setEndDate(date_Date);
                setToTimestamp(date_Date);

              }}
            /></label>
            
            
                <button onClick={handleFilter}>Filter</button>
                <button onClick={removeFilter}>Remove Filter</button>
            </div>
            {/* <TimePicker
              onChange={(time) => {
                setValue(time);
              }}
              value = {value}
            /> */}
            <table style={{ width: "100%", background: "#f0f0f0", padding: "20px" }} align="center">
                <thead>
                    <tr>
                        <th>frame_nmr</th>
                        <th>car_id</th>
                        <th>license_plate_bbox</th>
                        <th>license_number</th>
                        <th>license_number_score</th>
                        <th>registered</th>
                        <th>timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => (
                        <tr key={key}>
                            <td>{user.frame_nmr}</td>
                            <td>{user.car_id}</td>
                            <td>{user.license_plate_bbox}</td>
                            <td>{user.license_number}</td>
                            <td>{user.license_number_score}</td>
                            <td>{user.registered}</td>
                            <td>{user.timestamp}</td>
                            <td>
                                <button onClick={() => deleteUser(user.car_id)} style={{ backgroundColor: "#ff0000", color: "#fff", padding: "5px 10px", border: "none", cursor: "pointer" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
