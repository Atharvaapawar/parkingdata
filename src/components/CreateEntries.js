import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateEntries() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8888/api/user/save', inputs).then(function (response) {
            console.log(response.data);
            navigate('/');
        });

    };

    return (
        <div>
            <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "##000000" }}>Create Entries</h1>
            <form onSubmit={handleSubmit}>
                <table style={{ width: "40%", background: "#f0f0f0", padding: "20px" }} align="center">
                    <tbody>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>frame_nmr: </label>
                            </th>
                            <td>
                                <input type="text" name="frame_nmr" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>car_id: </label>
                            </th>
                            <td>
                                <input type="text" name="car_id" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>license_plate_bbox: </label>
                            </th>
                            <td>
                                <input type="text" name="license_plate_bbox" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>license_number: </label>
                            </th>
                            <td>
                                <input type="text" name="license_number" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>license_number_score: </label>
                            </th>
                            <td>
                                <input type="text" name="license_number_score" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>registered: </label>
                            </th>
                            <td>
                                <input type="text" name="registered" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{ textAlign: "center", paddingTop: "10px" }}>
                                <button style={{ backgroundColor: "#007BFF", color: "#fff", padding: "5px 20px", border: "none", cursor: "pointer" }}>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
