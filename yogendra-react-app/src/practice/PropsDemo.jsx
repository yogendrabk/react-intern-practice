import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

// Example 1: Basic Props
function BasicPropsExample({ message, count }) {
  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <p className="font-semibold text-blue-800 mb-2">Basic Props Demo:</p>
      <p className="text-gray-700">Message: <span className="font-bold">{message}</span></p>
      <p className="text-gray-700">Count: <span className="font-bold">{count}</span></p>
      <p className="text-xs text-gray-600 mt-2">Props pass parent → child (read-only)</p>
    </div>
  );
}

// Example 2: Default Props
function DefaultPropsExample({ name = 'Guest', role = 'User' }) {
  return (
    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
      <p className="font-semibold text-green-800 mb-2">Default Props Demo:</p>
      <p className="text-gray-700">Name: <span className="font-bold">{name}</span></p>
      <p className="text-gray-700">Role: <span className="font-bold">{role}</span></p>
      <p className="text-xs text-gray-600 mt-2">Use default value if not provide</p>
    </div>
  );
}

// Example 3: Props Spreading
function PropsSpreadingExample(props) {
  return (
    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
      <p className="font-semibold text-purple-800 mb-2">Props Spreading Demo ({`{...props}`}):</p>
      <p className="text-gray-700">Received: {Object.keys(props).length} props passed</p>
      <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
        {JSON.stringify(props, null, 2)}
      </pre>
      <p className="text-xs text-gray-600 mt-2">Spread props with {`{...obj}`} syntax</p>
    </div>
  );
}

// Example 4: Callback Props
function CallbackPropsExample({ onButtonClick, onInputChange }) {
  const handleClick = () => {
    onButtonClick?.({ message: 'Button clicked!', timestamp: new Date() });
  };

  return (
    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <p className="font-semibold text-yellow-800 mb-2">Callback Props Demo:</p>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => onInputChange?.(e.target.value)}
        className="w-full px-3 py-2 border border-yellow-300 rounded mb-2"
      />
      <button
        onClick={handleClick}
        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded"
      >
        Send Data to Parent
      </button>
      <p className="text-xs text-gray-600 mt-2">Child pass data parent via callback function</p>
    </div>
  );
}

// Example 5: Children Props (Composition)
function ChildrenExample({ children, title }) {
  return (
    <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
      <p className="font-semibold text-pink-800 mb-2">Children Props Demo:</p>
      {title && <p className="font-bold text-gray-800 mb-2">{title}</p>}
      <div className="text-gray-700">{children}</div>
      <p className="text-xs text-gray-600 mt-2">Children render component content (slot pattern)</p>
    </div>
  );
}

// Main PropsDemo Component
export function PropsDemo() {
  // State for callback demo
  const [callbackData, setCallbackData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [childInput, setChildInput] = useState('');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Card 
        header={<h1 className="text-3xl font-bold text-gray-800">Props Patterns Demonstration</h1>}
        className="mb-12 bg-gradient-to-r from-purple-50 to-blue-50"
      >
        <p className="text-gray-600 mb-4">
          Complete showcase of all React props pattern. Understand how data flow parent → child unidirectional.
          Child cannot modify parent props (read-only) but can pass data via callback function.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge color="blue">Props Flow</Badge>
          <Badge color="green">Data Management</Badge>
          <Badge color="purple">React Fundamentals</Badge>
        </div>
      </Card>

      {/* Pattern 1: Basic Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Basic Props</h2>
        <Card>
          <BasicPropsExample message="Hello from Parent!" count={42} />
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Code Example:</p>
            <pre className="text-xs overflow-x-auto bg-gray-800 text-green-400 p-3 rounded">
{`// Parent pass props to child
<BasicProps message="Hello from Parent!" count={42} />

// Child receive via function parameter
function BasicProps({ message, count }) {
  return (
    <div>
      <p>Message: {message}</p>
      <p>Count: {count}</p>
    </div>
  );
}`}
            </pre>
          </div>
        </Card>
      </section>

      {/* Pattern 2: Default Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Default Props (Using Default Parameters)</h2>
        <Card>
          <div className="space-y-3">
            <DefaultPropsExample name="Yogendra" role="Developer" />
            <DefaultPropsExample name="Ravi" />
            <DefaultPropsExample />
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Code Example:</p>
            <pre className="text-xs overflow-x-auto bg-gray-800 text-green-400 p-3 rounded">
{`// Default props using function parameter default
function DefaultProps({ name = 'Guest', role = 'User' }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Role: {role}</p>
    </div>
  );
}

// Usage
<DefaultProps name="Yogendra" role="Developer" />
<DefaultProps name="Ravi" />  // role use default "User"
<DefaultProps />  // all default`}
            </pre>
          </div>
        </Card>
      </section>

      {/* Pattern 3: Props Spreading */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Props Spreading ({`{...props}`})</h2>
        <Card>
          <PropsSpreadingExample 
            title="User Profile"
            username="yogendra_bk"
            email="yogendra@techyatra.com"
            country="Nepal"
          />
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Code Example:</p>
            <pre className="text-xs overflow-x-auto bg-gray-800 text-green-400 p-3 rounded">
{`// Props spreading - pass all props at once
function Parent() {
  const userData = {
    title: "User Profile",
    username: "yogendra_bk",
    email: "yogendra@techyatra.com"
  };
  
  return <PropsSpreading {...userData} />;
}

// Child receive with spreading
function PropsSpreading(props) {
  // props = {
  //   title: "User Profile",
  //   username: "yogendra_bk",
  //   email: "yogendra@techyatra.com"
  // }
}`}
            </pre>
          </div>
        </Card>
      </section>

      {/* Pattern 4: Callback Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Callback Props (Child → Parent Communication)</h2>
        <Card header="Callback Demo">
          <CallbackPropsExample 
            onButtonClick={(data) => setCallbackData(data)}
            onInputChange={(value) => setChildInput(value)}
          />
          
          {callbackData && (
            <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
              <p className="font-semibold text-green-800 mb-2">Parent Received Data:</p>
              <pre className="text-sm bg-gray-800 text-green-400 p-2 rounded">
                {JSON.stringify(callbackData, null, 2)}
              </pre>
            </div>
          )}

          {childInput && (
            <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded">
              <p className="font-semibold text-blue-800">Child Input: <span className="font-bold">{childInput}</span></p>
            </div>
          )}

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Code Example:</p>
            <pre className="text-xs overflow-x-auto bg-gray-800 text-green-400 p-3 rounded">
{`// Parent pass function as prop
function Parent() {
  const [data, setData] = useState(null);
  
  const handleChildData = (childData) => {
    setData(childData);  // Parent update state
  };
  
  return (
    <Child onSendData={handleChildData} />
  );
}

// Child call callback to send data
function Child({ onSendData }) {
  return (
    <button onClick={() => onSendData({ msg: 'Hello!' })}>
      Send Data to Parent
    </button>
  );
}

// Data flow: Parent → Child (props)
//           Child → Parent (callback function)`}
            </pre>
          </div>
        </Card>
      </section>

      {/* Pattern 5: Children Props */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Children Props (Composition/Slot Pattern)</h2>
        <Card>
          <div className="space-y-3">
            <ChildrenExample title="Welcome Message">
              <p>This content pass as children to component.</p>
              <p className="font-bold mt-2">Very flexible for component composition!</p>
            </ChildrenExample>

            <ChildrenExample title="Another Example">
              <ul className="list-disc list-inside space-y-1">
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
              </ul>
            </ChildrenExample>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p className="font-semibold mb-2">Code Example:</p>
            <pre className="text-xs overflow-x-auto bg-gray-800 text-green-400 p-3 rounded">
{`// Component receive children
function Card({ children, title }) {
  return (
    <div>
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  );
}

// Usage - anything between opening/closing tag become children
<Card title="Hello">
  <p>This paragraph is children</p>
  <button>This button also children</button>
</Card>

// children = [<p>...</p>, <button>...</button>]`}
            </pre>
          </div>
        </Card>
      </section>

      {/* Complete Example: Mini Settings Panel */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Example: Settings Panel</h2>
        <Card header="User Settings Application">
          <SettingsPanel />
        </Card>
      </section>

      {/* Key Concepts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Props Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card header="Props are Read-Only" footer={<Badge color="red">Important!</Badge>}>
            <p className="text-gray-700 text-sm">
              Child cannot modify parent props directly. This unidirectional data flow make app predictable.
              If need change, parent must update and re-pass new prop value.
            </p>
          </Card>

          <Card header="Props vs State" footer={<Badge color="blue">Difference</Badge>}>
            <ul className="text-gray-700 text-sm space-y-1">
              <li><span className="font-bold">Props:</span> From parent (read-only)</li>
              <li><span className="font-bold">State:</span> Internal (mutable)</li>
            </ul>
          </Card>

          <Card header="Unidirectional Flow" footer={<Badge color="green">Data Flow</Badge>}>
            <p className="text-gray-700 text-sm">
              Parent → Child via props (broadcast)
              <br/>
              Child → Parent via callbacks (events)
              <br/>
              Reverse not possible (important constraint!)
            </p>
          </Card>

          <Card header="Use Cases" footer={<Badge color="yellow">Patterns</Badge>}>
            <ul className="text-gray-700 text-sm space-y-1">
              <li>✅ Configuration (variant, size, color)</li>
              <li>✅ Data passing (name, id, list)</li>
              <li>✅ Callbacks (on click, on change)</li>
              <li>✅ Composition (children)</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Mini Settings Panel Example
function SettingsPanel() {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    language: 'en',
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-4">
      <SettingItem 
        label="Theme"
        value={settings.theme}
        options={['light', 'dark', 'auto']}
        onChange={(value) => handleSettingChange('theme', value)}
      />
      
      <SettingItem 
        label="Notifications"
        value={settings.notifications}
        type="toggle"
        onChange={(value) => handleSettingChange('notifications', value)}
      />
      
      <SettingItem 
        label="Language"
        value={settings.language}
        options={['en', 'ne', 'hi']}
        onChange={(value) => handleSettingChange('language', value)}
      />

      <div className="p-4 bg-green-100 border border-green-300 rounded mt-4">
        <p className="font-semibold text-green-800 mb-2">Current Settings:</p>
        <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded">
          {JSON.stringify(settings, null, 2)}
        </pre>
      </div>
    </div>
  );
}

function SettingItem({ label, value, options, type = 'select', onChange }) {
  return (
    <div className="p-3 border border-gray-300 rounded">
      <label className="block font-semibold text-gray-700 mb-2">{label}</label>
      
      {type === 'select' && (
        <select 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        >
          {options?.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
      
      {type === 'toggle' && (
        <button
          onClick={() => onChange(!value)}
          className={`px-4 py-2 rounded font-semibold text-white ${
            value ? 'bg-green-600' : 'bg-gray-400'
          }`}
        >
          {value ? 'ON' : 'OFF'}
        </button>
      )}
    </div>
  );
}

export default PropsDemo;
