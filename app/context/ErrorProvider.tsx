import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ErrorContextType {
    setError: (error: Error | null) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<Error | null>(null);

    return (
        <ErrorContext.Provider value={{ setError }}>
            {error ? <div>Error: {error.message}</div> : children}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (!context) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};
