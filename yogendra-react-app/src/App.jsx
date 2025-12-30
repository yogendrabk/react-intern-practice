import { useState } from 'react';
import './App.css';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Namaste! Yogendra BK
        </h1>
        
        <p className="text-gray-600 text-center mb-6">
          Welcome to React Learning Journey. This week we learning React fundamentals:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded">
            <h3 className="font-semibold text-purple-800">Day 16</h3>
            <p className="text-sm text-gray-700">React Concepts, JSX, Virtual DOM</p>
          </div>
          
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <h3 className="font-semibold text-blue-800">Day 17</h3>
            <p className="text-sm text-gray-700">Vite Setup, Project Structure</p>
          </div>
          
          <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
            <h3 className="font-semibold text-green-800">Days 18-19</h3>
            <p className="text-sm text-gray-700">Reusable Components, Layout</p>
          </div>
          
          <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
            <h3 className="font-semibold text-orange-800">Day 20</h3>
            <p className="text-sm text-gray-700">Props Demo, Week Summary</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Counter: <span className="text-2xl font-bold text-purple-600">{count}</span></p>
          <button
            onClick={() => setCount(count + 1)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Increment
          </button>
        </div>

        <div className="mt-8 text-xs text-gray-500 text-center border-t pt-4">
          <p>Built with React 18 + Vite + Tailwind CSS</p>
          <p>Learning at Tech Yatra Private Limited</p>
        </div>
      </div>
    </div>
  );
}

export default App;
