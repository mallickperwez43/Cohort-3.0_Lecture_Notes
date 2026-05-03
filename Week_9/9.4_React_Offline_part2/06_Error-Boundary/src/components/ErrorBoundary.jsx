import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("Error caught:", error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div style={{ background: "red", borderRadius: 20, padding: 15, margin: 10, color: "white", textAlign: "center" }}>
                Something went wrong while rendering
            </div>
        }

        return this.props.children;
    }
}

