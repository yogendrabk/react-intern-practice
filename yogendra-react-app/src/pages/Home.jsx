import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export function Home() {
  // Set document title
  useEffect(() => {
    document.title = "Home — React App";
  }, []);
  // Sample links for navbar
  const navLinks = [
    { label: 'Home', href: '#', active: true },
    { label: 'Components', href: '#' },
    { label: 'Learning', href: '#' },
    { label: 'About', href: '#' },
  ];

  // Sample links for footer
  const footerLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Discord', href: '#' },
    { label: 'Roadmap', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-12">
        
        {/* Hero Section */}
        <section className="mb-12">
          <Card 
            header={<h1 className="text-3xl font-bold text-gray-800">Welcome to React World!</h1>}
            className="bg-gradient-to-r from-purple-50 to-blue-50"
          >
            <p className="text-gray-600 mb-6">
              This Week 4 of React training. We learning components, props, state, and building real application.
            </p>
            <div className="flex gap-4">
              <Button variant="primary">Start Learning</Button>
              <Button variant="ghost">View Docs</Button>
            </div>
          </Card>
        </section>

        {/* Skills Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Skills We Learning This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Card header="Component Design">
              <p className="text-gray-600 mb-4">
                Build reusable component with multiple variant and state management. Design system approach.
              </p>
              <Badge color="blue">React</Badge>
            </Card>

            <Card header="Props & Data Flow">
              <p className="text-gray-600 mb-4">
                Understanding unidirectional data flow. Pass data parent to child via props.
              </p>
              <Badge color="green">Skills</Badge>
            </Card>

            <Card header="Children Prop Pattern">
              <p className="text-gray-600 mb-4">
                Composition pattern using children. Build flexible, reusable component structure.
              </p>
              <Badge color="purple">Advanced</Badge>
            </Card>

            <Card header="Responsive Design">
              <p className="text-gray-600 mb-4">
                Mobile-first approach with Tailwind CSS. Media query responsive layout.
              </p>
              <Badge color="yellow">Design</Badge>
            </Card>

            <Card header="State Management">
              <p className="text-gray-600 mb-4">
                useState hook for internal component state. Interactive user experience.
              </p>
              <Badge color="red">Hooks</Badge>
            </Card>

            <Card header="Vite Development">
              <p className="text-gray-600 mb-4">
                Fast build tool with HMR. Modern development workflow and tooling.
              </p>
              <Badge color="pink">Tooling</Badge>
            </Card>
          </div>
        </section>

        {/* Day Breakdown */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Week 4 Daily Breakdown</h2>
          
          <div className="space-y-4">
            <Card 
              header={<div className="flex items-center gap-3">
                <Avatar size="sm" initials="16" />
                <span className="text-lg font-semibold">Day 16: React Core Concepts</span>
              </div>}
              footer="Status: ✅ Complete"
            >
              <p className="text-gray-600">
                Comprehensive documentation covering React fundamentals, JSX compilation, Virtual DOM algorithm, 
                framework comparison, and defense Q&A prepare for interview.
              </p>
            </Card>

            <Card 
              header={<div className="flex items-center gap-3">
                <Avatar size="sm" initials="17" />
                <span className="text-lg font-semibold">Day 17: Vite Project Setup</span>
              </div>}
              footer="Status: ✅ Complete"
            >
              <p className="text-gray-600">
                Initialize Vite React project with proper configuration. Explain every file in structure. 
                Setup Tailwind CSS for styling. Ready development server.
              </p>
            </Card>

            <Card 
              header={<div className="flex items-center gap-3">
                <Avatar size="sm" initials="18" />
                <span className="text-lg font-semibold">Day 18: Reusable Components</span>
              </div>}
              footer="Status: ✅ Complete"
            >
              <p className="text-gray-600">
                Build design system with Button, Badge, Avatar component. Multiple variant (primary, secondary, danger). 
                Multiple size (small, medium, large). Interactive loading state.
              </p>
            </Card>

            <Card 
              header={<div className="flex items-center gap-3">
                <Avatar size="sm" initials="19" />
                <span className="text-lg font-semibold">Day 19: Layout Components & Home Page</span>
              </div>}
              footer="Status: 🚀 Current"
            >
              <p className="text-gray-600">
                Create layout component: Card (children pattern), Navbar (responsive), Footer (grid layout). 
                Build Home page showcase all component. Explain slot pattern.
              </p>
            </Card>

            <Card 
              header={<div className="flex items-center gap-3">
                <Avatar size="sm" initials="20" />
                <span className="text-lg font-semibold">Day 20: Props Demo & Week Summary</span>
              </div>}
              footer="Status: ⏳ Pending"
            >
              <p className="text-gray-600">
                Create PropsDemo component showcase all prop pattern (basic, default, spreading, callbacks). 
                Unidirectional data flow mini application. Week 4 summary documentation. GitHub push.
              </p>
            </Card>
          </div>
        </section>

        {/* Key Learnings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key React Learnings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              header="Component Pattern"
              footer={<Badge color="blue">Design System</Badge>}
            >
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>✅ Reusable component with variant</li>
                <li>✅ Prop validation with PropTypes</li>
                <li>✅ Default props value</li>
                <li>✅ Render based on props</li>
              </ul>
            </Card>

            <Card 
              header="Children Prop"
              footer={<Badge color="green">Composition</Badge>}
            >
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>✅ Flexible component composition</li>
                <li>✅ Slot pattern implementation</li>
                <li>✅ Nested content rendering</li>
                <li>✅ Component override children</li>
              </ul>
            </Card>

            <Card 
              header="State Management"
              footer={<Badge color="purple">Hooks</Badge>}
            >
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>✅ useState hook usage</li>
                <li>✅ State update pattern</li>
                <li>✅ Component re-render trigger</li>
                <li>✅ Counter example implement</li>
              </ul>
            </Card>

            <Card 
              header="Responsive Design"
              footer={<Badge color="yellow">Tailwind</Badge>}
            >
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>✅ Mobile-first approach</li>
                <li>✅ Tailwind utility class</li>
                <li>✅ Grid layout responsive</li>
                <li>✅ Breakpoint md, lg usage</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Featured Projects Section - Day 35 Addition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Project Card 1 - with hover lift animation */}
            <div className="group cursor-pointer">
              <Card 
                className="bg-white hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2"
              >
                <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5-9H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V3a2 2 0 00-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Todo Application</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Full-featured task manager with localStorage persistence and dynamic list management.
                </p>
                <div className="flex gap-2">
                  <Badge color="blue">React</Badge>
                  <Badge color="green">Hooks</Badge>
                </div>
              </Card>
            </div>

            {/* Project Card 2 */}
            <div className="group cursor-pointer">
              <Card 
                className="bg-white hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2"
              >
                <div className="h-40 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 19H9a6 6 0 010-12h6a6 6 0 010 12z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">User Directory</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Fetch and display user data from API with search, filter ang pagination features.
                </p>
                <div className="flex gap-2">
                  <Badge color="purple">API</Badge>
                  <Badge color="blue">Fetch</Badge>
                </div>
              </Card>
            </div>

            {/* Project Card 3 */}
            <div className="group cursor-pointer">
              <Card 
                className="bg-white hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2"
              >
                <div className="h-40 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Auth Dashboard</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Protected routes with login authentication and role-based access control system.
                </p>
                <div className="flex gap-2">
                  <Badge color="green">Security</Badge>
                  <Badge color="red">Protected</Badge>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Why React? Section - Day 35 Addition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Why React? — Key Advantages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Advantage 1 */}
            <Card className="hover:bg-blue-50 transition-colors text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Component Reusability</h3>
              <p className="text-sm text-gray-600">
                Build once, use everywhere. Reusable components save development time.
              </p>
            </Card>

            {/* Advantage 2 */}
            <Card className="hover:bg-green-50 transition-colors text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10a1 1 0 11-2 0 1 1 0 012 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19H5a2 2 0 01-2-2V7a2 2 0 012-2h4m0 0h4a2 2 0 012 2v10a2 2 0 01-2 2h-4m0 0V7" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Virtual DOM</h3>
              <p className="text-sm text-gray-600">
                Efficient rendering with virtual DOM. Updates only necessary parts.
              </p>
            </Card>

            {/* Advantage 3 */}
            <Card className="hover:bg-purple-50 transition-colors text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Unidirectional Data Flow</h3>
              <p className="text-sm text-gray-600">
                Data flows one way. Easier to debug and maintain application.
              </p>
            </Card>

            {/* Advantage 4 */}
            <Card className="hover:bg-orange-50 transition-colors text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-orange-100 rounded-full">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Large Ecosystem</h3>
              <p className="text-sm text-gray-600">
                Rich ecosystem with libraries and tools. Community support strong.
              </p>
            </Card>
          </div>
        </section>

        {/* Stats Counter Section - Day 35 Addition */}
        <StatsSection />

      </main>
    </div>
  );
}

/**
 * StatsSection Component with Animated Counters
 * 
 * Uses IntersectionObserver to animate counter when scrolled into view.
 * Counter animates from 0 to target value using JavaScript animation frame.
 */
function StatsSection() {
  // IntersectionObserver hook to detect when section enters viewport
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  
  const [stats, setStats] = useState({
    components: 0,
    users: 0,
    projects: 0,
  });

  // Animation target values
  const targetStats = {
    components: 25,
    users: 5000,
    projects: 8,
  };

  // Animate counters when section becomes visible
  useEffect(() => {
    if (!isVisible) return;

    // Use object to track animation progress
    const animationState = {
      components: 0,
      users: 0,
      projects: 0,
    };

    // Duration of animation in milliseconds
    const duration = 2000;
    const startTime = Date.now();

    // Animation frame callback
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0 to 1

      // Calculate current value for each stat using linear interpolation
      setStats({
        components: Math.floor(targetStats.components * progress),
        users: Math.floor(targetStats.users * progress),
        projects: Math.floor(targetStats.projects * progress),
      });

      // Continue animation if not finished
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Start animation
    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <section ref={ref} className="mb-12 py-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">By The Numbers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Stat 1 - Components */}
        <div className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {stats.components}+
          </div>
          <p className="text-gray-600 font-medium">Reusable Components Built</p>
          <p className="text-sm text-gray-500 mt-1">Used across all projects</p>
        </div>

        {/* Stat 2 - Users */}
        <div className="text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {stats.users.toLocaleString()}+
          </div>
          <p className="text-gray-600 font-medium">Active Users</p>
          <p className="text-sm text-gray-500 mt-1">Using our applications</p>
        </div>

        {/* Stat 3 - Projects */}
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-600 mb-2">
            {stats.projects}+
          </div>
          <p className="text-gray-600 font-medium">Live Projects</p>
          <p className="text-sm text-gray-500 mt-1">Deployed in production</p>
        </div>
      </div>
    </section>
  );
}
