import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

// ============================================================================
// PATTERN 1: Lazy Initialization
// ============================================================================
// Problem: If initialize state directly with expensive function,
// function run on EVERY render (expensive!)
// Solution: Pass function to useState — run only on first render

function expensiveComputation() {
  console.log('Running expensive computation...');
  // Simulate expensive calculation (sum 1 billion number, API call, etc)
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
}

function LazyInitializationDemo() {
  const [count, setCount] = useState(() => expensiveComputation());
  const [renderCount, setRenderCount] = useState(0);

  return (
    <Card header="Pattern 1: Lazy Initialization">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 bg-yellow-50 p-3 rounded border border-yellow-200">
          <span className="font-semibold">Key Point:</span> useState function call only on mount, not every render.
          Check console - "expensive computation" print once, not repeatedly!
        </p>
        
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <p>Initial computed value: <span className="font-bold text-lg">{count.toLocaleString()}</span></p>
          <p className="text-sm text-gray-600 mt-2">Render count: {renderCount}</p>
        </div>

        <button
          onClick={() => setRenderCount(renderCount + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Trigger Re-render (Check Console — computation NOT run again!)
        </button>

        <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// ❌ BAD: expensiveComputation() run every render
const [value, setValue] = useState(expensiveComputation());

// ✅ GOOD: function run only on mount
const [value, setValue] = useState(() => expensiveComputation());`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// PATTERN 2: State from Props — Anti-Pattern vs Correct
// ============================================================================
// Problem: Initializing state from prop that change
// If prop change, state NOT update (they independent!)
// Solution: Use useEffect to sync OR don't duplicate state

function StateFromPropsDemo() {
  const [propValue, setPropValue] = useState('Initial');
  const [showAntiPattern, setShowAntiPattern] = useState(true);

  return (
    <Card header="Pattern 2: State from Props">
      <div className="space-y-4">
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <p className="font-semibold text-red-800 mb-2">❌ Anti-Pattern:</p>
          <p className="text-sm text-gray-700 mb-3">
            Initialize state from prop. If parent prop change, child state NOT update!
            They independent now.
          </p>
          <AntiPatternChild propValue={propValue} />
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <p className="font-semibold text-green-800 mb-2">✅ Correct Pattern:</p>
          <p className="text-sm text-gray-700 mb-3">
            Don't duplicate state. Either (a) use prop directly, or (b) useEffect sync when prop change.
          </p>
          <CorrectPatternChild propValue={propValue} />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPropValue('Changed ' + new Date().getTime())}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Parent Change Prop
          </button>
          <span className="px-3 py-2 bg-gray-100 rounded text-sm text-gray-700">
            Current prop: {propValue.substring(0, 15)}...
          </span>
        </div>

        <p className="text-xs text-gray-600 bg-yellow-50 p-2 rounded">
          Notice: Anti-pattern NOT update when prop change. Correct pattern sync!
        </p>
      </div>
    </Card>
  );
}

function AntiPatternChild({ propValue }) {
  // ❌ BAD: State initialized from prop, never update when prop change
  const [state, setState] = useState(propValue);

  return (
    <div className="border border-red-300 p-3 rounded bg-white">
      <p className="text-sm">State: <span className="font-bold text-red-600">{state}</span></p>
      <p className="text-xs text-gray-600 mt-1">❌ State NOT update when parent prop change!</p>
    </div>
  );
}

function CorrectPatternChild({ propValue }) {
  // ✅ GOOD: Use prop directly (best) or sync with useEffect

  return (
    <div className="border border-green-300 p-3 rounded bg-white">
      <p className="text-sm">Display Prop: <span className="font-bold text-green-600">{propValue}</span></p>
      <p className="text-xs text-gray-600 mt-1">✅ Automatically update when parent prop change!</p>
    </div>
  );
}

// ============================================================================
// PATTERN 3: Derived State (Computed Values)
// ============================================================================
// Problem: Keep copy of same data in multiple state (duplication, sync problem)
// Solution: Compute value from existing state (single source of truth)

function DerivedStateDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React', done: true },
    { id: 2, text: 'Build project', done: false },
    { id: 3, text: 'Deploy', done: false },
  ]);

  // ❌ BAD: Keep separate state for completed count (duplication!)
  // const [completedCount, setCompletedCount] = useState(1);
  // Problem: If task change, must remember update completedCount also!
  // Easy forget, easy create bug

  // ✅ GOOD: Compute from existing state (derived)
  const completedCount = tasks.filter(t => t.done).length;
  const totalCount = tasks.length;
  const percentDone = Math.round((completedCount / totalCount) * 100);

  return (
    <Card header="Pattern 3: Derived State">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 bg-blue-50 p-3 rounded border border-blue-200">
          <span className="font-semibold">Key Point:</span> Compute values from existing state.
          Don't keep duplicate copy in separate state. Single source of truth!
        </p>

        <div className="p-4 bg-gray-50 border border-gray-200 rounded">
          <div className="space-y-2 mb-4">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => {
                    setTasks(tasks.map(t =>
                      t.id === task.id ? { ...t, done: !t.done } : t
                    ));
                    // Notice: completedCount automatically update! Because derive from state.
                  }}
                />
                <span className={task.done ? 'line-through text-gray-500' : ''}>{task.text}</span>
              </div>
            ))}
          </div>

          <div className="space-y-1 p-3 bg-green-50 rounded border border-green-200">
            <p className="text-sm"><span className="font-semibold">Completed:</span> {completedCount} / {totalCount}</p>
            <p className="text-sm"><span className="font-semibold">Progress:</span> {percentDone}%</p>
            <div className="w-full bg-gray-200 rounded h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded transition-all"
                style={{ width: `${percentDone}%` }}
              ></div>
            </div>
          </div>
        </div>

        <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// ❌ BAD: Separate state for count
const [tasks, setTasks] = useState(...);
const [count, setCount] = useState(1);

// ✅ GOOD: Derive from tasks
const count = tasks.filter(t => t.done).length;`}
        </pre>
      </div>
    </Card>
  );
}

// ============================================================================
// PATTERN 4: State Colocation (Keep state close to usage)
// ============================================================================

function StateColocationDemo() {
  const [showForm, setShowForm] = useState(false);

  return (
    <Card header="Pattern 4: State Colocation">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 bg-cyan-50 p-3 rounded border border-cyan-200">
          <span className="font-semibold">Key Point:</span> Keep state as close as possible to where use.
          Don't lift to parent if not needed — keep scope small!
        </p>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Toggle Form
        </button>

        {showForm && <SearchForm />}

        <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// ✅ GOOD: Form state inside component (not lifted to parent)
function SearchForm() {
  const [query, setQuery] = useState('');  // State only use here
  const results = query ? filterData(query) : [];
  return (...);
}`}
        </pre>
      </div>
    </Card>
  );
}

function SearchForm() {
  const [query, setQuery] = useState('');
  const results = ['React', 'Node.js', 'Redux', 'Vue'].filter(s =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 bg-white border border-cyan-200 rounded">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
      />
      {results.length > 0 && (
        <div className="space-y-1">
          {results.map(r => (
            <div key={r} className="text-sm p-2 bg-cyan-50 rounded">
              ✓ {r}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PATTERN 5: Lifting State Up (Sharing state between sibling)
// ============================================================================

function LiftingStateDemo() {
  const [sharedValue, setSharedValue] = useState('Initial shared value');

  return (
    <Card header="Pattern 5: Lifting State Up">
      <div className="space-y-4">
        <p className="text-sm text-gray-700 bg-purple-50 p-3 rounded border border-purple-200">
          <span className="font-semibold">Key Point:</span> Two sibling component need share state?
          Lift state to parent. Parent hold state, pass via props + callback.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <SiblingA value={sharedValue} onUpdate={setSharedValue} />
          <SiblingB value={sharedValue} onUpdate={setSharedValue} />
        </div>

        <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`// Parent hold shared state
const [shared, setShared] = useState('...');

// Pass to sibling 1
<Sibling1 value={shared} onUpdate={setShared} />

// Pass to sibling 2
<Sibling2 value={shared} onUpdate={setShared} />

// Both sibling can read + update same state!`}
        </pre>
      </div>
    </Card>
  );
}

function SiblingA({ value, onUpdate }) {
  return (
    <div className="p-3 border border-purple-300 rounded bg-purple-50">
      <p className="font-semibold text-sm mb-2">Sibling A (Reader)</p>
      <p className="text-sm bg-white p-2 rounded mb-2">Value: {value}</p>
      <button
        onClick={() => onUpdate('Updated by A — ' + new Date().getTime())}
        className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Update
      </button>
    </div>
  );
}

function SiblingB({ value, onUpdate }) {
  return (
    <div className="p-3 border border-purple-300 rounded bg-purple-50">
      <p className="font-semibold text-sm mb-2">Sibling B (Also reader)</p>
      <p className="text-sm bg-white p-2 rounded mb-2">Value: {value}</p>
      <button
        onClick={() => onUpdate('Updated by B — ' + new Date().getTime())}
        className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Update
      </button>
    </div>
  );
}

// ============================================================================
// MAIN: All 5 patterns showcase
// ============================================================================

export function StatePatterns() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          useState Advanced Patterns
        </h1>
        <p className="text-gray-600">
          5 essential patterns for managing component state effectively. Run example, toggle button, understand pattern!
        </p>
      </div>

      <div className="space-y-8">
        <LazyInitializationDemo />
        <StateFromPropsDemo />
        <DerivedStateDemo />
        <StateColocationDemo />
        <LiftingStateDemo />

        {/* Key Learnings */}
        <Card header="Key useState Concepts" footer={<Badge color="green">Master These!</Badge>}>
          <div className="space-y-3 text-sm text-gray-700">
            <p>✅ <span className="font-semibold">Lazy Initialization:</span> useState(() => exp) for expensive calc</p>
            <p>✅ <span className="font-semibold">Avoid State from Props:</span> Use prop direct or sync with useEffect</p>
            <p>✅ <span className="font-semibold">Derived State:</span> Compute from existing state, not duplicate</p>
            <p>✅ <span className="font-semibold">State Colocation:</span> Keep state close to where use</p>
            <p>✅ <span className="font-semibold">Lifting State Up:</span> Share between sibling via parent</p>
          </div>
        </Card>

        {/* Defense Questions */}
        <Card header="Defense Questions" footer={<Badge color="blue">Interview Ready</Badge>}>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-gray-800 mb-2">Q: Derived state bhanne ke ho? State duplication kina problem hunchha?</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">A:</span> Derived state mean computed value from existing state. Example: have task array, complete count derive from filter task array.
                <br/><br/>
                State duplication problem: if keep separate completedCount state, when task change, must remember update count also. Easy forget, cause bug. 
                Single source of truth better — compute from existing state, automatic always correct!
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <p className="font-semibold text-gray-800 mb-2">Q: Lazy initialization kina use garchau? Regular useState ko farak kya?</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold">A:</span> Regular useState run function on EVERY render (expensive!). 
                Lazy initialization pass function — run only on first render (mount).
                <br/><br/>
                Example: <code className="bg-gray-100 px-1">useState(() =&gt; expensiveComputation())</code> vs <code className="bg-gray-100 px-1">useState(expensiveComputation())</code>.
                First good (run once), second bad (run every render).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default StatePatterns;
