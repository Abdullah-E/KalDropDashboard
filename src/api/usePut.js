import { useState } from 'react';
import { baseApi, getStoredToken } from './config';

export const usePut = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const putData = async (url, body) => {
    const token = getStoredToken();
    if (!token) throw new Error('No authentication token found');

    setLoading(true);
    try {
        const response = await fetch(`${baseApi}${url}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (err) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
    };

    return { putData, loading, error };
};