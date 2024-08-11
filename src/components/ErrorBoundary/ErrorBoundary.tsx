import {Component, ErrorInfo, ReactNode} from 'react';
import cls from './styles.module.css';

interface Props {
    children: ReactNode;
}

interface State {
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.errorInfo) {
            return <div className={cls.error_info}>
                <h1 style={{color: 'red'}}>YEAH, YOU BROKE IT, GREAT JOB</h1>
                <h2>Info:</h2>
                <div>
                    <p> {this.state.error?.toString()}</p>
                    <p> {this.state.errorInfo.componentStack}</p>
                </div>
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
