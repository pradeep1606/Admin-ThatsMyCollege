'use client'
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/config/AxiosIntercepter';

const GetAdmin = ({ id }) => {
    const Api = process.env.SERVICE_BASE_URL;
    const [adminName, setAdminName] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axiosInstance.get(`${Api}/users/${id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setAdminName(response.data.data.firstName + ' ' + response.data?.data?.lastName);
            } catch (error) {
                console.error('Error fetching admin:', error);
            }
        };
        fetchAdmin();
    }, [id, Api]);

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
