import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';

export function Home() {
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

      </main>
    </div>
  );
}

export default Home;
