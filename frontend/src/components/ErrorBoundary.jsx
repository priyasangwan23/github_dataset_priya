import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-wrapper" id="global-error-boundary">
          <div className="dataset-card error-card glass-panel" style={{ maxWidth: "520px" }}>
            <span className="error-icon">💥</span>
            <h3 className="error-title">Something Went Wrong</h3>
            <p className="error-msg">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button className="btn-primary" onClick={this.handleReset}>
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
