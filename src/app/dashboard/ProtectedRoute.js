'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken } from '@/store/slices/authSlice';
import { navigateToLogin } from '../action';
import Link from 'next/link';

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, status, error } = useSelector((state) => state.auth);
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            dispatch(verifyToken(authToken));
        } else {
            navigateToLogin('/login');
        }
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed' || !isAuthenticated) {
        navigateToLogin('/login');
        return <div>
            {`Login failed. `} Please 
            <Link href='/login' className='text-teal-400'> login</Link> again..
        </div>;
    }

    return children;
};

export default ProtectedRoute;
