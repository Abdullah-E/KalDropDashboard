import { baseApi, getStoredToken } from './config';

export const usePost = () => {
  const post = async (url, body) => {
    const token = getStoredToken();
    if (!token) throw new Error('No authentication token found');
    try {
      const response = await fetch(`${baseApi}${url}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  return post;
};