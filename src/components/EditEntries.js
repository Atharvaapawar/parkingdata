import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEntries() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:8888/api/user/${id}`).then(function (response) {
            console.log(response.data);
            setInputs(response.data);
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8888/api/user/${id}/edit`, inputs).then(function (response) {
            console.log(response.data);
            navigate('/');
        });

    };

    return (
        <div>
            <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#007BFF" }}>Edit Entries</h1>
            <form onSubmit={handleSubmit}>
                <table style={{ width: "100%", background: "#f0f0f0", padding: "20px" }}>
                    <tbody>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>Name: </label>
                            </th>
                            <td>
                                <input value={inputs.name} type="text" name="name" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>Email: </label>
                            </th>
                            <td>
                                <input value={inputs.email} type="text" name="email" onChange={handleChange} style={{ padding: "5px" }} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ textAlign: "right", padding: "5px" }}>
                                <label style={{ color: "#007BFF" }}>Mobile: </label>
                            </th>
                            <td>
                                <input value={inputs.mobile} type="text" name="mobile" onChange={handleChange} style={{ padding: "5px" }} />
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
