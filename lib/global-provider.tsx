import React, { createContext, useContext, ReactNode } from "react";

import {account, getCurrentUser} from "./appwrite";
import { useAppwrite } from "./useAppwrite";
import { Redirect } from "expo-router";

interface GlobalContextType {
    isLogged: boolean;
    user: User | null;
    loading: boolean;
    refetch: () => void;
}

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: async () => {
            try {
                const sessions = await account.listSessions();
                if (sessions.sessions.length === 0) return null;
                return await getCurrentUser();
            } catch (error) {
                console.error("Session check failed:", error);
                return null;
            }
        },
    });

    const isLogged = !!user;

    // Make sure any text is wrapped in Text components
    return (
        <GlobalContext.Provider value={{ isLogged, user, loading, refetch }}>
            {children}
        </GlobalContext.Provider>
    );
};


export const useGlobalContext = (): GlobalContextType => {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error("useGlobalContext must be used within a GlobalProvider");

    return context;
};

export default GlobalProvider;