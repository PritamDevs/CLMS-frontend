import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify';
import { BACKEND_URL } from '../config';
import Loading from '../component/Loading';
import axios from 'axios';

function Librarian_register() {
    let [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword, phone } = formData;   
        if (!name || !email || !password || !cpassword || !phone ) {
            return toast.error('Please fill in all fields');
        }   
        if (password !== cpassword) {
            return toast.error('Passwords do not match');
        }   
        try {
            const res = await axios.post(`${BACKEND_URL}/api/librarian/register`, {
                name,
                email,
                password,
                cpassword,
                phone,
            }); 
            toast.success('Librarian registered successfully');
            navigate('/Librarian/Login');
        } catch (err) {
            const msg = err.response?.data?.message || 'Registration failed';
            toast.error(msg);
        }
    };
    return (
        <div className="h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Image Section */}
            <div className="md:w-1/2 hidden md:block">
                <img
                    src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?w=600&auto=format&fit=crop&q=60"
                    alt="Library"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Form Section */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-200">
                <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-bold text-center text-gray-800 mb-4">Register As Librarian</h2>

                    <div className="space-y-3">
                        {[
                            { label: 'Name',name:"name" ,type: 'text', placeholder: 'John Doe' },
                            { label: 'Email',name:"email", type: 'email', placeholder: 'you@example.com' },
                            { label: 'Password',name:"password", type: 'password', placeholder: '********' },
                            { label: 'confirm Password',name:"cpassword", type: 'password', placeholder: '*********' },
                            { label: 'Phone',name:"phone", type: 'text', placeholder: '+134567890' },
                        ].map((field, idx) => (
                            <div key={idx}>
                                <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                                <input
                                    name={field.name} 
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                        >
                            Register
                        </button>
                    </div>

                    <p className="mt-3 text-center text-sm text-gray-600">
                        Have an account?{' '}
                        <Link to="/Librarian/Login" className="text-blue-600 hover:underline">
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
            {loading && <Loading/>}
        </div>
    );
}

export default Librarian_register