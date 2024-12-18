import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Form from './Form';
import EmployeeDetails from './EmployeeDetails';

const App = () => (
    <Router>
        <div>
            <Routes>
                <Route path="/" element={<Form/>} />
                <Route path="/employees" element={<EmployeeDetails />} />
            </Routes>
        </div>
    </Router>
);

export default App;
