'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllusers } from '@/store/slices/userSlice';

const GetAdmin = ({ id }) => {
    const dispatch = useDispatch();
    const { users, status } = useSelector((state) => state.User);
    const [adminName, setAdminName] = useState('');

    useEffect(() => {
        if (status !== 'succeeded') {
            dispatch(fetchAllusers());
        } else {
            const getUser = users.find(user => user._id === id);
            if (getUser) {
                setAdminName(`${getUser.firstName} ${getUser.lastName}`);
            }
        }
    }, [dispatch, id, status, users]);

    return (
        <>
            {adminName ? (
                <>{adminName}</>
            ) : (
                <>NA</>
            )}
        </>
    );
};

export default GetAdmin;
