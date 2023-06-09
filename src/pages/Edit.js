import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function Edit() {
    const {id} = useParams();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        bio: "",
        state: "",
        city: "",
        gender: ""
    });
    const { firstName, lastName, email, password, confirmPassword, bio, gender } = data; //object destructuring

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:3004/employees/${id}`, data);
        console.log(data)

        toast.warning('Please Wait !', {
            position: toast.POSITION.TOP_RIGHT
        });
        setTimeout (() => {
            navigate("/");

        }, 5000);

    }
    const getData= async ()=>{
        const result=await axios.get(`http://localhost:3004/employees/${id}`);
        setData(result.data)
    }

    useEffect (() => {
        getData();
    },[])

    const handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        setData({ ...data, [name]: value });
    }

    return (
        <>
            <h2>Update Here</h2>

            <form className="form-box container" onSubmit={handleSubmit}>

                <label>
                    Enter First Name : </label>
                    <input type='text' placeholder="Enter First Name" name="firstName" value={firstName} onChange={handleChange} required />
                <br></br>
                <br></br><label>
                    Enter Last Name : </label>
                    <input type='text' placeholder="Enter Last Name" name="lastName" value={lastName} onChange={handleChange} required />
                <br></br>
                <br></br>
                <label>
                    Email : </label>
                    <input type='email' placeholder="Enter Email" name="email" value={email} onChange={handleChange} required />
                <br></br>
                <br></br><label>
                    Password : </label>
                    <input type='password' placeholder="Enter Password" name='password' value={password} onChange={handleChange} required />
                <br></br>
                <br></br><label>
                    Confirm Password : </label>
                    <input type='password' placeholder="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={handleChange} required />
                <br></br>
                <br></br><label>
                    Enter Bio : </label>
                    <textarea name="bio" placeholder="Enter Bio" value={bio} onChange={handleChange} required />
                <br></br>
                <br></br><label>
                    State : </label>
                    <select name="state" onChange={handleChange} required="required">
                        <option value="select">Select</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Haryana">Haryana</option>
                    </select>
                 &nbsp; &nbsp;
                <label>
                    City : </label>
                    <select name="city" onChange={handleChange} required="required">
                        <option value="Select">Select</option>
                        <option value="Pune">Pune</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Jodhpur">Jodhpur</option>
                    </select>
                    <br></br>
                <br></br><div>
                    Gender :
                    <br></br><label>
                        Male </label> &nbsp;  
                        <input type='radio' name="gender" value="Male" checked={gender === "Male"} onChange={handleChange} required />
                    <br></br>
                    <label>
                        Female </label> &nbsp; 
                        <input type='radio' name="gender" value="Female" checked={gender === "Female"} onChange={handleChange} required />
                    
                </div>
                <br></br><label>
                    All the Information filled is true to my knowledge.
                    </label>
                    
                <br></br>

                <br></br>

                <input type='submit' value="Update" onClick={handleSubmit} />  
                &nbsp; &nbsp; &nbsp;
                <Link to='/'>
                <input type='button' className="btnBack" value="Back"></input>
                </Link>
                <ToastContainer />
            </form>
        </>
    );
}
export default Edit;
