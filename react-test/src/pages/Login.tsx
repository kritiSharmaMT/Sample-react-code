import React, { useState } from 'react';
import UserService from '../services/UserService';
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Invalid email format'),
        password: Yup.string().required('Password is required'),
    });

    const handleLogin = async (values: any) => {
        const { email, password } = values;
        await UserService.login({ email, password }).then((response) => {
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/profile');
            }
        })
    };

    return (
        <div className="flex bg-slate-200 items-center justify-center h-screen">
            <div className="w-full max-w-xs">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ values, setValues }) => (
                        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <Field
                                    type="text" id="email" name="email"
                                    value={values.email}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <Field
                                    type="password" id="password" name="password"
                                    value={values.password}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
