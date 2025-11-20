import React, { createContext, useState, useEffect } from 'react';
import { authClient } from '../lib/auth-client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const { data: session, isPending, error } = authClient.useSession();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (session) {
            setUser(session.user);
        } else {
            setUser(null);
        }
        setLoading(isPending);
    }, [session, isPending]);

    const login = async (email, password) => {
        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: '/'
        });
        if (error) throw error;
        return data;
    };

    const register = async (username, email, password) => {
        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name: username,
            callbackURL: '/'
        });
        if (error) throw error;
        return data;
    };

    const logout = async () => {
        await authClient.signOut();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
