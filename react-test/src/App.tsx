import Login from './pages/Login';
import Profile from './pages/Profile';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        toast.success('Goodbye User!', {
            position: 'top-right'
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <div className="App">
            <Toaster />
            {
                (localStorage.getItem('token') && location.pathname !== 'login' && location.pathname !== '/') &&
                <div dir="rtl">
                    <div className="bg-slate-200 absolute">
                        <button
                            className="bg-blue-500 mt-2 mx-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            }
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
