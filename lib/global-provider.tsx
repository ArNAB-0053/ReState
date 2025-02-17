import {createContext, ReactNode} from "react";
import {useAppwrite} from "@/lib/useAppwrite";
import {getCurrentUser} from "@/lib/appwrite";

interface User {
    $id: string;
    name: string;
    email: string;
    avatar: string;
}

interface GlobalContextType {
    isLoggedIn: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams?: Record<string, string | number>) => Promise<void>;
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
        fn: getCurrentUser,
    });

    const isLogged = !!user;

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                user,
                loading,
                refetch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};