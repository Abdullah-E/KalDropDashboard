import { useState, useEffect, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../providers/supabaseAuth";
import { useGet } from "../api/useGet";

// Create context for the authenticated user
const UserContext = createContext(null);

// Custom hook to access the user context
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserContext.Provider');
    }
    return context.user;
};

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const { data: dbUser, loading: dbLoading, error: dbError } = useGet(isAuthenticated ? 'user' : null);

    useEffect(() => {
        if (dbUser && !dbLoading) {
            setUser(dbUser);
        }
    }, [dbUser, dbLoading]);
    useEffect(() => {
        // Check initial auth state
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setIsAuthenticated(!!user);
            setIsLoading(false);
        };
        
        checkUser();

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setIsAuthenticated(!!session);
            setIsLoading(false);
        });

        // Cleanup subscription
        return () => subscription.unsubscribe();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            Loading...
        </div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return (
        <UserContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </UserContext.Provider>
    );
};

export default ProtectedRoute;