// export const baseApi = "http://localhost:3000/api/v1/";
export const baseApi = "https://naor-backend.vercel.app/api/v1/";
export const getStoredToken = () => {
  const storedValue = localStorage.getItem('noar.auth');  
  if (!storedValue) {
    console.error('Token not found in localStorage');
    return null;
  }

  try {
    const parsedValue = JSON.parse(storedValue);
    return parsedValue.access_token;
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};