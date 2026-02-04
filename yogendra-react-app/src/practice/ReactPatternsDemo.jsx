import { useState, createContext, useContext } from 'react';

// ============================================================================
// React Patterns Demo Component
// ============================================================================
//
// Demonstrates 3 important React design patterns:
// 1. Compound Components - Uses Context API for implicit prop sharing
// 2. Render Props - Makes behavior flexible, testable, and reusable
// 3. Higher-Order Component (HOC) - Wraps component with extra functionality
//
// Why use patterns?
// - Compound Components: Better readability, implicit sharing of related state
// - Render Props: Maximum flexibility without wrapper hell
// - HOC: Code reuse and cross-cutting concerns (loading, auth, themes)
//
// ============================================================================

// =============================================================================
// PATTERN 1: COMPOUND COMPONENTS
// =============================================================================
// Problem: A Tabs component where Tab buttons and Tab panels are tightly coupled.
// Without pattern: Would need to pass complex props or maintain manual state.
// Solution: Context API makes Tab buttons and Tab panels share state implicitly.
//
// When to use: Multi-part components where children need to communicate

const TabsContext = createContext();

function CompoundTabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return (
    <div className="flex border-b border-gray-300 bg-gray-50">
      {children}
    </div>
  );
}

function Tab({ label, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      className={`
        px-4 py-2 font-semibold transition-colors flex-1
        ${activeTab === index 
          ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
          : 'text-gray-600 hover:text-gray-800'
        }
      `}
    >
      {label}
    </button>
  );
}

function TabPanels({ children }) {
  const { activeTab } = useContext(TabsContext);
  
  return (
    <div className="p-4">
      {children[activeTab]}
    </div>
  );
}

// Usage example:
// <CompoundTabs>
//   <TabList>
//     <Tab label="Tab 1" index={0} />
//     <Tab label="Tab 2" index={1} />
//   </TabList>
//   <TabPanels>
//     <div>Content 1</div>
//     <div>Content 2</div>
//   </TabPanels>
// </CompoundTabs>

// =============================================================================
// PATTERN 2: RENDER PROPS
// =============================================================================
// Problem: Want to track mouse position, but don't want to hardcode the render.
// Without pattern: Would need separate components for every use case.
// Solution: Pass render logic as a prop (or children as function).
//
// When to use: Sharing behavior without wrapper components

function MouseTracker({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div 
      onMouseMove={handleMouseMove}
      className="bg-gray-100 p-4 rounded-lg border border-gray-300 w-full h-64 relative"
    >
      {children(position)}
    </div>
  );
}

// Usage example:
// <MouseTracker>
//   {(pos) => (
//     <div>
//       <p>Mouse: {pos.x}, {pos.y}</p>
//       <div style={{left: pos.x, top: pos.y}} className="absolute w-2 h-2 bg-red-500 rounded-full" />
//     </div>
//   )}
// </MouseTracker>

// =============================================================================
// PATTERN 3: HIGHER-ORDER COMPONENT (HOC)
// =============================================================================
// Problem: Want to add loading state to multiple components.
// Without pattern: Would need to duplicate loading logic in each component.
// Solution: Wrap component with HOC that adds loading behavior.
//
// When to use: Cross-cutting concerns (auth, loading, theme, etc.)

function withLoading(WrappedComponent) {
  return function LoadingWrapper({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-40 bg-gray-50 border border-gray-300 rounded-lg">
          <div className="animate-spin">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full"></div>
          </div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
}

// Example component to wrap
function UserCard({ name, email, role }) {
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg">
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-gray-600">{email}</p>
      <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
        {role}
      </span>
    </div>
  );
}

const UserCardWithLoading = withLoading(UserCard);

// Usage example:
// <UserCardWithLoading 
//   isLoading={true}
//   name="Yogendra" 
//   email="yogendra@example.com" 
//   role="React Developer"
// />

// =============================================================================
// DEMO COMPONENT
// =============================================================================

export function ReactPatternsDemo() {
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [demoTab, setDemoTab] = useState(0);

  const handleLoadUser = () => {
    setIsUserLoading(true);
    setTimeout(() => setIsUserLoading(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">React Patterns Demo</h1>
      <p className="text-gray-600 mb-8">
        Three essential React design patterns for building scalable, reusable components.
      </p>

      {/* Pattern Navigation */}
      <div className="flex gap-2 mb-8">
        {[
          { name: 'Compound Components', id: 0 },
          { name: 'Render Props', id: 1 },
          { name: 'Higher-Order Components', id: 2 }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setDemoTab(tab.id)}
            className={`
              px-4 py-2 rounded-lg font-semibold transition-colors
              ${demoTab === tab.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }
            `}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Pattern 1: Compound Components */}
      {demoTab === 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            1. Compound Components Pattern
          </h2>
          <p className="text-gray-600 mb-6">
            <strong>Problem:</strong> Complex components with multiple related parts need implicit state sharing.<br />
            <strong>Solution:</strong> Use React Context to let child components access shared state without prop drilling.<br />
            <strong>Benefit:</strong> Clean API, better readability, flexible composition.
          </p>

          <div className="bg-gray-50 p-4 rounded mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Live Example - Tab Component:</h3>
            <CompoundTabs defaultTab={0}>
              <TabList>
                <Tab label="Profile" index={0} />
                <Tab label="Settings" index={1} />
                <Tab label="History" index={2} />
              </TabList>
              <TabPanels>
                <div>
                  <h4 className="font-semibold mb-2">Profile Information</h4>
                  <p className="text-gray-600">Name: Yogendra Bikram Koirala</p>
                  <p className="text-gray-600">Role: React Developer</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Settings</h4>
                  <p className="text-gray-600">Theme: Light Mode</p>
                  <p className="text-gray-600">Notifications: Enabled</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Activity History</h4>
                  <p className="text-gray-600">Last login: 2 hours ago</p>
                  <p className="text-gray-600">Last update: 30 minutes ago</p>
                </div>
              </TabPanels>
            </CompoundTabs>
          </div>

          <details className="bg-gray-100 p-3 rounded text-sm">
            <summary className="cursor-pointer font-semibold text-gray-900">
              How it works (click to expand)
            </summary>
            <pre className="mt-2 overflow-auto text-xs bg-white p-2 rounded border border-gray-300">
{`// 1. Context holds shared state (active tab)
const TabsContext = createContext();

// 2. Provider manages the state
<CompoundTabs>
  
  // 3. TabList and Tab components use Context
  <TabList>
    <Tab label="Profile" index={0} />
  </TabList>
  
  // 4. TabPanels render based on Context value
  <TabPanels>
    <div>Content...</div>
  </TabPanels>
</CompoundTabs>`}
            </pre>
          </details>
        </div>
      )}

      {/* Pattern 2: Render Props */}
      {demoTab === 1 && (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            2. Render Props Pattern
          </h2>
          <p className="text-gray-600 mb-6">
            <strong>Problem:</strong> Multiple components need same behavior (tracking data) but render differently.<br />
            <strong>Solution:</strong> Pass rendering logic as a prop (function) to let consumer decide what to render.<br />
            <strong>Benefit:</strong> Maximum flexibility, easy to test, no wrapper hell.
          </p>

          <div className="bg-gray-50 p-4 rounded mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Live Example - Mouse Tracking:</h3>
            <MouseTracker>
              {(pos) => (
                <div>
                  <div className="text-center font-semibold text-gray-900 mb-2">
                    Mouse Position:
                  </div>
                  <div className="text-center text-lg text-blue-600 font-bold mb-3">
                    X: {pos.x} | Y: {pos.y}
                  </div>
                  <div className="text-center text-gray-600 text-sm">
                    (Move your mouse in the gray box below)
                  </div>
                  <div 
                    style={{
                      left: `${Math.min(pos.x - 58, 400)}px`,
                      top: `${Math.min(pos.y - 168, 200)}px`
                    }} 
                    className="absolute w-4 h-4 bg-red-500 rounded-full shadow-lg"
                  />
                </div>
              )}
            </MouseTracker>
          </div>

          <details className="bg-gray-100 p-3 rounded text-sm">
            <summary className="cursor-pointer font-semibold text-gray-900">
              How it works (click to expand)
            </summary>
            <pre className="mt-2 overflow-auto text-xs bg-white p-2 rounded border border-gray-300">
{`// 1. Component manages behavior (state, effects)
function MouseTracker({ children }) {
  const [position, setPosition] = useState({x:0, y:0});
  // ...handle mouse move...
  
  // 2. Render prop is a function child
  return (
    <div onMouseMove={handleMouseMove}>
      {children(position)} {/* Pass data to child function */}
    </div>
  );
}

// 3. Consumer uses render prop to decide what to display
<MouseTracker>
  {(pos) => (
    <div>
      Mouse: {pos.x}, {pos.y}
    </div>
  )}
</MouseTracker>`}
            </pre>
          </details>
        </div>
      )}

      {/* Pattern 3: HOC */}
      {demoTab === 2 && (
        <div className="bg-white p-6 rounded-lg border border-gray-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            3. Higher-Order Component (HOC) Pattern
          </h2>
          <p className="text-gray-600 mb-6">
            <strong>Problem:</strong> Multiple components need same enhancement (loading state, auth check, theme).<br />
            <strong>Solution:</strong> Wrap component with a function that adds functionality before rendering.<br />
            <strong>Benefit:</strong> DRY principle, reusable enhancements, clean separation of concerns.
          </p>

          <div className="bg-gray-50 p-4 rounded mb-4">
            <h3 className="font-bold text-gray-900 mb-3">Live Example - Loading State HOC:</h3>
            
            <div className="mb-4">
              <button
                onClick={handleLoadUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              >
                {isUserLoading ? 'Loading...' : 'Load User Data'}
              </button>
            </div>

            <UserCardWithLoading 
              isLoading={isUserLoading}
              name="Yogendra Bikram Koirala"
              email="yogendra@example.com"
              role="React Intern"
            />
          </div>

          <details className="bg-gray-100 p-3 rounded text-sm">
            <summary className="cursor-pointer font-semibold text-gray-900">
              How it works (click to expand)
            </summary>
            <pre className="mt-2 overflow-auto text-xs bg-white p-2 rounded border border-gray-300">
{`// 1. HOC is a function that takes a component
function withLoading(WrappedComponent) {
  
  // 2. Returns an enhanced component
  return function LoadingWrapper({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    // 3. Renders original component with all props
    return <WrappedComponent {...props} />;
  };
}

// 4. Wrap any component with HOC
const UserCardWithLoading = withLoading(UserCard);

// 5. Use enhanced component
<UserCardWithLoading 
  isLoading={true}
  name="Yogendra"
  email="yogendra@example.com"
  role="Developer"
/>`}
            </pre>
          </details>
        </div>
      )}

      {/* Pattern Comparison */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-300">
        <h3 className="font-bold text-lg text-blue-900 mb-3">Pattern Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <strong className="text-blue-900">Compound Components</strong>
            <p className="text-gray-700 mt-1">
              ✓ Multi-part components<br />
              ✓ Clean composition<br />
              ✗ Context API overhead
            </p>
          </div>
          <div>
            <strong className="text-blue-900">Render Props</strong>
            <p className="text-gray-700 mt-1">
              ✓ Maximum flexibility<br />
              ✓ Easy to test<br />
              ✗ "Callback hell" possible
            </p>
          </div>
          <div>
            <strong className="text-blue-900">Higher-Order Component</strong>
            <p className="text-gray-700 mt-1">
              ✓ Code reuse<br />
              ✓ Cross-cutting concerns<br />
              ✗ Wrapper component hell
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReactPatternsDemo;
