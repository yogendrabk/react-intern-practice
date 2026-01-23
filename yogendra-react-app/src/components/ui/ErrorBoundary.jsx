import React from 'react';

/**
 * ErrorBoundary Component (Class Component)
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs error information, and displays a fallback UI instead of crashing.
 *
 * Key Points:
 * - Must be a CLASS component (not functional component)
 * - Uses componentDidCatch lifecycle method to catch errors
 * - Prevents white screen of death from JS errors
 * - Logs error info to console for debugging
 *
 * Usage: Wrap main app content with <ErrorBoundary>
 *
 * Defense Q&A: "Error boundary kasari error catch garchau?"
 * Answer: "componentDidCatch lifecycle method use garchau.
 * Jab child component ma error aunchha, yesto method call hunchha.
 * Tyo error ko state set garchau ra fallback UI dekhaunchhu."
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // State to track error occurred or not
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // Static method to update state when error occurs
  static getDerivedStateFromError(error) {
    // Return new state to show fallback UI
    return { hasError: true };
  }

  // Called when error occurs - log error info
  componentDidCatch(error, errorInfo) {
    // Log error details to console for debugging
    console.error('Error caught by boundary:', error);
    console.error('Error Info:', errorInfo);

    // Update state with error details
    this.setState({
      error: error,
    });
  }

  // Reset error state (allow user to retry)
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            {/* Error icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4v2m0 4v2m.615-10.238l1.068-1.068a1 1 0 00-1.414-1.414l-1.068 1.068A1 1 0 00.615 11.762zm5.238 5.238l1.068 1.068a1 1 0 101.414-1.414l-1.068-1.068a1 1 0 00-1.414 1.414zM7.5 3.838L6.432 2.77A1 1 0 005.018 4.184l1.068 1.068a1 1 0 001.414-1.414z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-2">
                We encountered an unexpected error. Don't worry, our team has been notified.
              </p>
              {/* Show error message if available (only in development) */}
              {this.state.error && (
                <details className="text-left mt-4 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 overflow-auto max-h-32">
                  <summary className="cursor-pointer font-semibold">
                    Technical details
                  </summary>
                  <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3">
              {/* Retry button */}
              <button
                onClick={this.handleReset}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>

              {/* Go home button */}
              <button
                onClick={() => {
                  // Navigate to home page
                  window.location.href = '/';
                }}
                className="w-full px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Go to Home
              </button>

              {/* Reload page button */}
              <button
                onClick={() => {
                  // Hard reload to reset application state completely
                  window.location.reload();
                }}
                className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}
