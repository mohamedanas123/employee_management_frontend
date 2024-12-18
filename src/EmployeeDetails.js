import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/Employee.css';
import { useNavigate } from 'react-router-dom';

const EmployeeDetails = () => {
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingEmployee, setEditingEmployee] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
        email: '',
        phone: '',
        department: '',
        dateOfJoining: '',
        role: '',
    });

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://example-xmtc.onrender.com/employees');
                setEmployees(response.data);
            } catch (err) {
                setError(err.response?.data || 'Failed to fetch employee details.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleEdit = (employee) => {
        setEditingEmployee(employee);
        setFormData({ ...employee });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const navigate=useNavigate()
    const handleNavigate=()=>{
        navigate('/')
    }

    const handleSave = async () => {
        try {
            await axios.put(`https://example-xmtc.onrender.com/employees/${formData.employeeId}`, formData);
            setEmployees((prev) =>
                prev.map((emp) => (emp.employeeId === formData.employeeId ? formData : emp))
            );
            setEditingEmployee(null);
        } catch (err) {
            setError(err.response?.data || 'Failed to update employee.');
        }
    };

    const handleDelete = async (employeeId) => {
        try {
            await axios.delete(`https://example-xmtc.onrender.com/employees/${employeeId}`);
            setEmployees((prev) => prev.filter((emp) => emp.employeeId !== employeeId));
        } catch (err) {
            setError(err.response?.data || 'Failed to delete employee.');
        }
    };

    return (
        <div className="employee-details-container">
            <h2>Employee Details</h2>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && employees.length === 0 && <p>No employees found.</p>}
            {!loading && !error && employees.length > 0 && (
                <table className="employee-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Employee ID</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Date of Joining</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.employeeId}>
                                <td>{employee.name}</td>
                                <td>{employee.employeeId}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.department}</td>
                                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                                <td>{employee.role}</td>
                                <td>
                                    <button onClick={() => handleEdit(employee)}>Edit</button>
                                    <button onClick={() => handleDelete(employee.employeeId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {editingEmployee && (
                <div className="edit-modal">
                    <h3>Edit Employee</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Phone:
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Department:
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Date of Joining:
                        <input
                            type="date"
                            name="dateOfJoining"
                            value={formData.dateOfJoining}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Role:
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                        />
                    </label>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingEmployee(null)}>Cancel</button>
                </div>
            )}
            <button onClick={handleNavigate}>Add employee</button>
        </div>
    );
};

export default EmployeeDetails;
