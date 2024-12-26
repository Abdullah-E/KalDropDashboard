import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../providers/supabaseAuth";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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

    return children;
};

export default ProtectedRoute;