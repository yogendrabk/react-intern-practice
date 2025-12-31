import { useState } from 'react';
import { Button } from './components/Button';
import { Badge } from './components/Badge';
import { Avatar } from './components/Avatar';
import './App.css';

export function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Namaste! Yogendra BK</h1>
          <p className="text-lg opacity-90">React Training - Week 4: Components & Props</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Button Components Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Button Variants</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="space-y-6">
              
              {/* Primary Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Primary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm" variant="primary">Small Primary</Button>
                  <Button size="md" variant="primary">Medium Primary</Button>
                  <Button size="lg" variant="primary">Large Primary</Button>
                  <Button size="md" variant="primary" loading={true}>Loading...</Button>
                </div>
              </div>

              {/* Secondary Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Secondary Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm" variant="secondary">Small Secondary</Button>
                  <Button size="md" variant="secondary">Medium Secondary</Button>
                  <Button size="lg" variant="secondary">Large Secondary</Button>
                </div>
              </div>

              {/* Danger Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Danger Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm" variant="danger">Delete</Button>
                  <Button size="md" variant="danger">Remove</Button>
                  <Button size="lg" variant="danger">Danger Action</Button>
                </div>
              </div>

              {/* Ghost Buttons */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Ghost Buttons</h3>
                <div className="flex flex-wrap gap-4">
                  <Button size="sm" variant="ghost">Cancel</Button>
                  <Button size="md" variant="ghost">Skip</Button>
                  <Button size="lg" variant="ghost">Maybe Later</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Badge Components Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Badge Components</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <Badge color="blue">Beginner</Badge>
                <Badge color="green">Intermediate</Badge>
                <Badge color="yellow">Advanced</Badge>
                <Badge color="red">Critical</Badge>
                <Badge color="purple">Featured</Badge>
                <Badge color="pink">Popular</Badge>
                <Badge color="gray">Archived</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Avatar Components Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Avatar Components</h2>
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex flex-wrap gap-8 items-center">
              <div>
                <p className="text-sm text-gray-600 mb-3">Small (8x8 × 8)</p>
                <Avatar size="sm" initials="YB" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Medium (12x12 × 12)</p>
                <Avatar size="md" initials="YB" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Large (16x16 × 16)</p>
                <Avatar size="lg" initials="YB" />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Avatar with Image</p>
                <Avatar size="lg" src="https://i.pravatar.cc/150?img=1" />
              </div>
            </div>
          </div>
        </section>

        {/* Counter Demo */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Counter Demo</h2>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-6xl font-bold text-purple-600 mb-6">{count}</p>
            <p className="text-gray-600 mb-4">This showcase React State hook (useState)</p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="primary" 
                onClick={() => setCount(count + 1)}
              >
                Increment
              </Button>
              <Button 
                variant="danger" 
                onClick={() => setCount(count - 1)}
              >
                Decrement
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setCount(0)}
              >
                Reset
              </Button>
            </div>
          </div>
        </section>

        {/* Week Overview */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Week 4 Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded">
              <h3 className="font-semibold text-purple-800 mb-1">Day 16</h3>
              <p className="text-sm text-gray-700">React Concepts, JSX, Virtual DOM fundamentals documentation</p>
            </div>
            
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
              <h3 className="font-semibold text-blue-800 mb-1">Day 17</h3>
              <p className="text-sm text-gray-700">Vite React setup and project structure explanation</p>
            </div>
            
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded">
              <h3 className="font-semibold text-green-800 mb-1">Day 18</h3>
              <p className="text-sm text-gray-700">Reusable components: Button, Badge, Avatar design system</p>
            </div>
            
            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
              <h3 className="font-semibold text-orange-800 mb-1">Day 19-20</h3>
              <p className="text-sm text-gray-700">Layout components, props patterns, advanced examples</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">Built with React 18 + Vite + Tailwind CSS</p>
          <p className="text-sm text-gray-400">Learning at Tech Yatra Private Limited</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
