import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Search from './pages/Search';
import MangaDetails from './pages/MangaDetails';
import Reader from './pages/Reader';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Register from './pages/Register';

const Layout = ({ children }) => {
    const location = useLocation();
    const isReader = location.pathname.startsWith('/read');
    const isAuth = ['/login', '/register'].includes(location.pathname);

    if (isAuth) return children;

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-900 font-sans">
            {!isReader && <Sidebar />}
            <main className={`flex-1 ${!isReader ? 'ml-20 md:ml-64' : ''} transition-all duration-300`}>
                {children}
            </main>
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/search" element={<Search />} />
                        <Route path="/manga/:id" element={<MangaDetails />} />
                        <Route path="/read/:chapterId" element={<Reader />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
