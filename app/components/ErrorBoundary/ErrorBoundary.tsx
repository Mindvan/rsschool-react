import React, { Component, ReactNode } from 'react';
import cls from './styles.module.css';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className={cls.error_info}>
                    <h1 style={{ color: 'red' }}>YEAH, YOU BROKE IT, GREAT JOB</h1>
                    <h2>Info:</h2>
                    <div>
                        <p>{String(this.state.error)}</p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
