import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    useEffect(() => {
        getProfile();
    }, []);

    const [isUpdate, setIsUpdate] = useState(false);
    const [userData, setUserData]: any = useState({});
    const [user, setUser]: any = useState({});

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];

        setUserData({
            ...userData,
            file: file,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        var data = new FormData();

        for (const key in userData) {
            data.append(key, userData[key]);
        }

        UserService.update(userData.id, data).then(response => {
            toast.success(response.data.message, {
                position: 'top-right'
            });
            localStorage.setItem('user', JSON.stringify(userData));
            setUserData({
                ...userData,
                file: '',
            });
        })
    };

    const getProfile = () => {
        let user: string | boolean = localStorage.getItem('user') ?? false;
        if (user) {
            setUser(JSON.parse(user))
        }
    }

    const editProfile = () => {
        UserService.me(user.id).then(response => {
            setUserData(response.data.data);
            setIsUpdate(true)
            localStorage.setItem('user', JSON.stringify(response.data.data))
        })
    }

    const goToProfile = () => {
        getProfile();
        setIsUpdate(false)
    }

    return (
        <div className="bg-slate-200 flex items-center justify-center h-screen">
            <Toaster />
            {
                !isUpdate ?
                    <div className="items-center justify-center w-full max-w-xs">
                        <div className="max-w-lg">
                            <div className="bg-white shadow-xl rounded-lg py-3">
                                <div className="photo-wrapper p-2">
                                    <img
                                        src={(process.env.REACT_APP_MEDIA_URL + user.image) ?? "https://via.placeholder.com/150"}
                                        alt="Profile Picture"
                                        className="h-32 mx-auto mb-1 rounded-full"
                                    />
                                </div>
                                <div className="p-2">
                                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.name}</h3>
                                    <table className="my-3">
                                        <tbody>
                                            <tr>
                                                <td className="px-4 py-2 text-gray-500 font-bold">Username</td>
                                                <td className="px-4 py-2">{user.username}</td>
                                            </tr>
                                            <tr>
                                                <td className="px-4 py-2 text-gray-500 font-bold">Email</td>
                                                <td className="px-4 py-2">{user.email}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="text-center mt-5">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={editProfile}
                                        >
                                            Edit Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : <div className="w-full max-w-sm">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-3">
                            <img
                                src={(process.env.REACT_APP_MEDIA_URL + user.image) ?? "https://via.placeholder.com/150"}
                                alt="Profile Picture"
                                className="h-32 mx-auto mb-1 rounded-full"
                            />
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full md:w-1/1 px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Name
                                    </label>
                                    <input
                                        defaultValue={userData.name}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-name"
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Username
                                    </label>
                                    <input
                                        defaultValue={userData.username}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-username"
                                        name="username"
                                        type="text"
                                        placeholder="Username"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Email
                                    </label>
                                    <input
                                        defaultValue={userData.email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-email"
                                        type="email"
                                        name="eamil"
                                        placeholder="Email"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-4">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Language
                                    </label>
                                    <input
                                        defaultValue={userData.language}
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="grid-lang"
                                        type="text"
                                        placeholder="Language"
                                        name="language"
                                        onChange={(e) => handleChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-3 mb-6">
                                <div className="w-full px-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Change Profile</label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="small-file-input"
                                        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-200 dark:border-gray-500 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600
                                                file:bg-gray-50 file:border-0
                                                file:bg-gray-100 file:me-4
                                                file:py-2 file:px-4"
                                        onChange={(e) => handleFileChange(e)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center justify-center">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={handleSubmit}
                                >
                                    Update
                                </button>
                                <button
                                    className="text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                    onClick={goToProfile}
                                >
                                    Back
                                </button>
                            </div>
                        </form>
                    </div>
            }
        </div>
    );
};

export default Profile;
