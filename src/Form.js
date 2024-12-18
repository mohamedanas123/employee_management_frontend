import React, { useState } from 'react';
import axios from 'axios';
import './style/Form.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const goto = () => {
        navigate('/employees');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({
            name: '',
            employeeId: '',
            email: '',
            phone: '',
            department: '',
            dateOfJoining: '',
            role: '',
        });
    };

    const displayMessage = (setter, msg) => {
        setter(msg);
        setTimeout(() => setter(''), 5000);
    };

    const validateForm = () => {
        const { name, employeeId, email, phone, department, dateOfJoining, role } = formData;
        const phoneRegex = /^\d{10}$/;

        if (!name || !employeeId || !email || !phone || !department || !dateOfJoining || !role) {
            displayMessage(setError, 'All fields are mandatory.');
            return false;
        }

        if (employeeId.length > 10) {
            displayMessage(setError, 'Employee ID must be a maximum of 10 characters.');
            return false;
        }
        if (!phoneRegex.test(phone)) {
            displayMessage(setError, 'Phone number must be exactly 10 digits.');
            return false;
        }


        const today = new Date();
        if (new Date(dateOfJoining) > today) {
            displayMessage(setError, 'Date of Joining cannot be a future date.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage('');
            return;
        }

        try {
            const response = await axios.post('https://example-xmtc.onrender.com/add-employee', formData);
            displayMessage(setMessage, response.data);
            resetForm();
        } catch (err) {
            displayMessage(setError, err.response?.data || 'Error adding employee.');
        }
    };

    return (
        <div className="form-container">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        maxLength="10"
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone Number:</label>
                    <input
                        type="number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div>
                    <label>Date of Joining:</label>
                    <input
                        type="date"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {message && <p className="success">{message}</p>}
                <button type="submit">Submit</button>
                <button type="button" onClick={resetForm}>
                    Reset
                </button>
                <button type="button" onClick={goto}>
                    Details
                </button>
            </form>
        </div>
    );
};

export default Form;
