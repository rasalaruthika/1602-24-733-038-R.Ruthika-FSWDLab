
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, resetKey: 0 };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught:", error);
    console.error("Component details:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong!</h2>
          <button
            onClick={() =>
              this.setState((state) => ({
                hasError: false,
                resetKey: state.resetKey + 1
              }))
            }
          >
            Try Again
          </button>
        </div>
      );
    }

    return React.cloneElement(this.props.children, {
      key: this.state.resetKey
    });
  }
}

class BuggyComponent extends React.Component {
  state = { crash: false };

  render() {
    if (this.state.crash) {
      throw new Error("Button click caused an error!");
    }

    return (
      <div>
        <h2>Error Boundary Demonstration</h2>
        <button
          onClick={() => this.setState({ crash: true })}
        >
          Throw Error
        </button>
      </div>
    );
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
