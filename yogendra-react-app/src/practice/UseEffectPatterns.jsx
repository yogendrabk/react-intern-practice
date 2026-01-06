import { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

// ============================================================================
// PATTERN 1: Run on Mount Only (Empty Dependency Array)
// ============================================================================

function MountOnlyDemo() {
  const [data, setData] = useState(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active) return;
    
    console.log('Effect run — mount only!');
    // Simulate fetch on mount
    setData('Loaded on mount: ' + new Date().toLocaleTimeString());
  }, []); // Empty array = run ONLY on mount, never again

  return (
    <Card header="Pattern 1: Run on Mount Only">
      <div className="space-y-3">
        <Button 
          size="sm"
          variant={active ? 'primary' : 'ghost'}
          onClick={() => setActive(!active)}
        >
          {active ? 'Mounted — See console' : 'Click to mount demo'}
        </Button>
        {active && data && (
          <div className="p-3 bg-green-50 border border-green-300 rounded">
            <p className="text-sm">{data}</p>
            <p className="text-xs text-gray-600 mt-2">Check console — effect run once on mount!</p>
          </div>
        )}
        <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto">
{`useEffect(() => {
  console.log('Run on mount only');
  // Fetch data, initialize
}, [])`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// PATTERN 2: Run on Specific Dependency Change
// ============================================================================

function SpecificDependencyDemo() {
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);
  const [effectLog, setEffectLog] = useState([]);

  useEffect(() => {
    if (!active) return;

    // Run when count change (add to dependency array)
    const msg = `Effect run: count = ${count}`;
    console.log(msg);
    setEffectLog(prev => [...prev, msg].slice(-5)); // Keep last 5
  }, [count, active]); // Run when count OR active change

  return (
    <Card header="Pattern 2: Run on Specific Dependency">
      <div className="space-y-3">
        <Button 
          size="sm"
          variant={active ? 'primary' : 'ghost'}
          onClick={() => setActive(!active)}
        >
          {active ? 'Active' : 'Toggle'}
        </Button>

        {active && (
          <>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setCount(count + 1)}>
                Count: {count}
              </Button>
            </div>

            <div className="p-3 bg-blue-50 border border-blue-300 rounded">
              <p className="text-xs font-semibold text-blue-800 mb-2">Last 5 effect calls:</p>
              {effectLog.map((log, i) => (
                <p key={i} className="text-xs text-gray-700">→ {log}</p>
              ))}
            </div>

            <p className="text-xs text-gray-600">Effect run when count change. Try increment button!</p>
          </>
        )}

        <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto">
{`useEffect(() => {
  console.log('count changed:', count);
}, [count]) // Run when count change`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// PATTERN 3: Run on Multiple Dependencies
// ============================================================================

function MultipleDependenciesDemo() {
  const [active, setActive] = useState(false);
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [fullName, setFullName] = useState('John Doe');

  useEffect(() => {
    if (!active) return;

    // Run when either firstName OR lastName change
    const combined = `${firstName} ${lastName}`;
    setFullName(combined);
    console.log('Full name computed:', combined);
  }, [firstName, lastName, active]); // Multiple dependencies

  return (
    <Card header="Pattern 3: Multiple Dependencies">
      <div className="space-y-3">
        <Button 
          size="sm"
          variant={active ? 'primary' : 'ghost'}
          onClick={() => setActive(!active)}
        >
          {active ? 'Active' : 'Toggle'}
        </Button>

        {active && (
          <>
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <div className="p-3 bg-purple-50 border border-purple-300 rounded">
              <p className="text-sm font-semibold text-purple-800">
                Full Name: {fullName}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Effect run when firstName OR lastName change
              </p>
            </div>
          </>
        )}

        <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto">
{`useEffect(() => {
  const combined = firstName + ' ' + lastName;
  setFullName(combined);
}, [firstName, lastName]) // Multiple deps`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// PATTERN 4: Cleanup Function (Memory Leak Prevention)
// ============================================================================

function CleanupDemo() {
  const [active, setActive] = useState(false);
  const [secondsWithoutCleanup, setSecondsWithoutCleanup] = useState(0);
  const [secondsWithCleanup, setSecondsWithCleanup] = useState(0);

  // ❌ WITHOUT CLEANUP: Memory leak! Timer keep running after unmount
  useEffect(() => {
    if (!active) return;

    const intervalId = setInterval(() => {
      setSecondsWithoutCleanup(prev => prev + 1);
    }, 1000);

    // No cleanup = missing cleanup! Timer still run after component unmount!
    // This cause memory leak
  }, [active]);

  // ✅ WITH CLEANUP: Clean up timer on unmount
  useEffect(() => {
    if (!active) return;

    const intervalId = setInterval(() => {
      setSecondsWithCleanup(prev => prev + 1);
    }, 1000);

    // Cleanup function: run before effect run again or component unmount
    return () => {
      clearInterval(intervalId);
      console.log('Timer cleanup — no memory leak!');
    };
  }, [active]);

  return (
    <Card header="Pattern 4: Cleanup Function">
      <div className="space-y-3">
        <Button 
          size="sm"
          variant={active ? 'primary' : 'ghost'}
          onClick={() => {
            setActive(!active);
            if (!active) {
              setSecondsWithoutCleanup(0);
              setSecondsWithCleanup(0);
            }
          }}
        >
          {active ? 'Timer Running' : 'Start Timers'}
        </Button>

        {active && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-red-50 border border-red-300 rounded">
                <p className="text-xs font-semibold text-red-800 mb-1">❌ Without Cleanup</p>
                <p className="text-2xl font-bold text-red-600">{secondsWithoutCleanup}</p>
                <p className="text-xs text-red-700 mt-1">Memory leak! Timer not cleared</p>
              </div>

              <div className="p-3 bg-green-50 border border-green-300 rounded">
                <p className="text-xs font-semibold text-green-800 mb-1">✅ With Cleanup</p>
                <p className="text-2xl font-bold text-green-600">{secondsWithCleanup}</p>
                <p className="text-xs text-green-700 mt-1">Safe! Timer cleared on unmount</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 bg-yellow-50 p-2 rounded">
              Toggle off then on multiple times. Check console cleanup log. Without cleanup = leak!
            </p>
          </>
        )}

        <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto">
{`useEffect(() => {
  const id = setInterval(...);
  
  // Cleanup function - run before unmount
  return () => {
    clearInterval(id);
  };
}, [])`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// PATTERN 5: Data Fetching with Loading/Error/Success
// ============================================================================

function DataFetchingDemo() {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!active) return;

    setLoading(true);
    setError(null);

    // Simulate API fetch with delay
    const timer = setTimeout(() => {
      try {
        // Simulate success
        setUsers([
          { id: 1, name: 'Yogendra' },
          { id: 2, name: 'Ravi' },
          { id: 3, name: 'Priya' }
        ]);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [active]);

  return (
    <Card header="Pattern 5: Data Fetching States">
      <div className="space-y-3">
        <Button 
          size="sm"
          variant={active ? 'primary' : 'ghost'}
          onClick={() => {
            setActive(!active);
            setUsers([]);
          }}
        >
          {active ? 'Fetching...' : 'Fetch Data'}
        </Button>

        {active && (
          <>
            {loading && (
              <div className="p-4 bg-blue-50 border border-blue-300 rounded">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-blue-800">Loading data...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-50 border border-red-300 rounded">
                <p className="text-sm text-red-800">❌ Error: {error}</p>
              </div>
            )}

            {!loading && !error && users.length > 0 && (
              <div className="p-3 bg-green-50 border border-green-300 rounded">
                <p className="text-sm font-semibold text-green-800 mb-2">✅ Data loaded:</p>
                {users.map(user => (
                  <p key={user.id} className="text-sm text-gray-700">
                    • {user.name}
                  </p>
                ))}
              </div>
            )}
          </>
        )}

        <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto">
{`useEffect(() => {
  setLoading(true);
  fetch('/api/users')
    .then(r => r.json())
    .then(data => {
      setUsers(data);
      setLoading(false);
    })
    .catch(err => setError(err));
}, [])`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// PATTERN 6: Debounced Effect (Search with Delay)
// ============================================================================

function DebouncedEffectDemo() {
  const [active, setActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const allItems = ['React', 'Node.js', 'Redux', 'Vue', 'Angular', 'TypeScript', 'JavaScript', 'Express'];

  useEffect(() => {
    if (!active || !searchQuery) {
      setResults([]);
      return;
    }

    // Set timer for debounce (wait 500ms after user stop typing)
    const timer = setTimeout(() => {
      setSearching(true);
      console.log('Searching for:', searchQuery);

      // Simulate API search
      setTimeout(() => {
        const filtered = allItems.filter(item =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);
        setSearching(false);
      }, 300);
    }, 500); // Wait 500ms after user stop typing

    // Cleanup: clear timer if user type again before 500ms
    return () => clearTimeout(timer);
  }, [searchQuery, active]);

  return (
    <Card header="Pattern 6: Debounced Effect (Search)">
      <div className="space-y-3">
        <Button 
          size="sm"
          variant={active ? 'primary' : 'ghost'}
          onClick={() => {
            setActive(!active);
            setSearchQuery('');
            setResults([]);
          }}
        >
          {active ? 'Active' : 'Toggle'}
        </Button>

        {active && (
          <>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search (e.g. 'react')... wait 500ms"
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />

            <p className="text-xs text-gray-600">
              Effect wait 500ms after you stop typing, then search.
              Check console!
            </p>

            {searching && (
              <div className="text-sm text-blue-600">🔍 Searching...</div>
            )}

            {results.length > 0 && (
              <div className="p-3 bg-green-50 border border-green-300 rounded">
                <p className="text-sm font-semibold text-green-800 mb-2">
                  Found {results.length}:
                </p>
                {results.map(r => (
                  <p key={r} className="text-sm text-gray-700">
                    ✓ {r}
                  </p>
                ))}
              </div>
            )}

            {searchQuery && results.length === 0 && !searching && (
              <p className="text-sm text-gray-600">No results found</p>
            )}
          </>
        )}

        <pre className="text-xs bg-gray-900 text-green-400 p-2 rounded overflow-x-auto">
{`useEffect(() => {
  // Wait 500ms after dependency change
  const timer = setTimeout(() => {
    // Search API call
    search(query);
  }, 500);

  return () => clearTimeout(timer);
}, [query]) // Re-run timer if query change`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// MAIN: All 6 patterns showcase
// ============================================================================

export function UseEffectPatterns() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          useEffect Comprehensive Guide
        </h1>
        <p className="text-gray-600">
          Master 6 essential useEffect patterns. Toggle each demo independently to understand behavior!
        </p>
      </div>

      <div className="space-y-8">
        <MountOnlyDemo />
        <SpecificDependencyDemo />
        <MultipleDependenciesDemo />
        <CleanupDemo />
        <DataFetchingDemo />
        <DebouncedEffectDemo />

        {/* Key Points */}
        <Card header="useEffect Decision Tree" footer={<Badge color="green">Which deps array?</Badge>}>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">✅ No dependency array: Run on EVERY render</p>
              <code className="text-xs bg-gray-100 px-1">useEffect(() =&gt; ...)</code>
              <p className="text-xs text-gray-600 mt-1">Rarely use. Effect too many time.</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">✅ Empty array []: Run on MOUNT only</p>
              <code className="text-xs bg-gray-100 px-1">useEffect(() =&gt; ..., [])</code>
              <p className="text-xs text-gray-600 mt-1">Best for initialize, fetch initial data</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">✅ With deps [count]: Run when count change</p>
              <code className="text-xs bg-gray-100 px-1">useEffect(() =&gt; ..., [count])</code>
              <p className="text-xs text-gray-600 mt-1">Most common. React dependency array</p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold">✅ Always cleanup: return () =&gt; ...</p>
              <code className="text-xs bg-gray-100 px-1">return () =&gt; clearInterval(id)</code>
              <p className="text-xs text-gray-600 mt-1">Prevent memory leak. Timer, listener, subscription</p>
            </div>
          </div>
        </Card>

        {/* Defense Questions */}
        <Card header="Defense Questions" footer={<Badge color="blue">Interview Ready</Badge>}>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-gray-800 mb-2">Q: useEffect cleanup function kina chainchha? Memory leak bhanne ke ho?</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">A:</span> Cleanup function run before effect run again or component unmount. Use to clean up resource.
                <br/><br/>
                Memory leak: if create timer/listener but not cleanup, still running after component unmount. Waste memory, cause slow. 
                Cleanup prevent this. Example: <code className="bg-gray-100 px-1">return () =&gt; clearInterval(id)</code> stop timer.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-gray-800 mb-2">Q: useEffect dependency array kina important? Missing dependency kya problem hunchha?</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">A:</span> Dependency array tell React when run effect. Missing dependency = effect not run when should, or run too many time.
                <br/><br/>
                Example: use variable inside effect but not in dependency array → variable outdated, cause bug. 
                ESLint warn about this. Always include all variable used inside effect in dependency array!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default UseEffectPatterns;
