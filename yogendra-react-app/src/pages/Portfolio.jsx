import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';

// ============================================================================
// Portfolio Page — Component Reuse Showcase
// ============================================================================
// 
// This page demonstrate power of reusable component:
// - Same Badge component used in skill + project section (consistency!)
// - Same Card component wrap different content (flexibility!)
// - Same Button component different variant (scalability!)
// - Same Avatar component different size (adaptability!)
//
// Building with reusable component = less code, more maintainable!
// ============================================================================

export function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ====================================================================== */}
      {/* HERO SECTION */}
      {/* ====================================================================== */}

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-30"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Avatar initials="YB" size="lg" />
          
          <h1 className="mt-6 text-5xl font-bold text-gray-900 mb-4">
            Yogendra BK
          </h1>
          
          <p className="text-xl text-gray-700 mb-4">
            React Developer & Web Technology Enthusiast
          </p>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Building beautiful, responsive web application using React, JavaScript, and modern web technologies.
            Currently learning at Tech Yatra Private Limited (December 2025 - February 2026).
          </p>

          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg">
              View Project
            </Button>
            <Button variant="ghost" size="lg">
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* SKILLS SECTION — Reusable Badge Component */}
      {/* ====================================================================== */}

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Technical Skills
          </h2>

          <div className="space-y-8">
            {/* Frontend Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-3">
                <Badge color="blue">React</Badge>
                <Badge color="blue">JavaScript</Badge>
                <Badge color="blue">HTML/CSS</Badge>
                <Badge color="blue">Tailwind CSS</Badge>
                <Badge color="blue">Responsive Design</Badge>
                <Badge color="blue">JSX</Badge>
              </div>
            </div>

            {/* Tools & Development */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tools & Development</h3>
              <div className="flex flex-wrap gap-3">
                <Badge color="green">Git/GitHub</Badge>
                <Badge color="green">Vite</Badge>
                <Badge color="green">npm</Badge>
                <Badge color="green">VS Code</Badge>
                <Badge color="green">DevTools</Badge>
                <Badge color="green">Figma</Badge>
              </div>
            </div>

            {/* Currently Learning */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Currently Learning</h3>
              <div className="flex flex-wrap gap-3">
                <Badge color="purple">React Hooks</Badge>
                <Badge color="purple">Context API</Badge>
                <Badge color="purple">API Integration</Badge>
                <Badge color="purple">State Management</Badge>
                <Badge color="purple">Web Performance</Badge>
                <Badge color="purple">Testing</Badge>
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Soft Skills</h3>
              <div className="flex flex-wrap gap-3">
                <Badge color="yellow">Problem Solving</Badge>
                <Badge color="yellow">Communication</Badge>
                <Badge color="yellow">Team Collaboration</Badge>
                <Badge color="yellow">Quick Learning</Badge>
                <Badge color="yellow">Attention to Detail</Badge>
              </div>
            </div>
          </div>

          {/* Note: Same Badge component used everywhere — reusability! */}
          <p className="text-sm text-gray-600 mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <span className="font-semibold">💡 Technical note:</span> All badge use same Badge component with different color props.
            This reusable approach = less code, consistent styling, easy maintain!
          </p>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* PROJECTS SECTION — Reusable Card Component */}
      {/* ====================================================================== */}

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project 1: Component Showcase */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">Component Showcase</h3>}
              footer={
                <div className="flex gap-2 flex-wrap">
                  <Badge color="blue" className="text-xs">React</Badge>
                  <Badge color="green" className="text-xs">Tailwind</Badge>
                </div>
              }
            >
              <p className="text-gray-700 text-sm mb-4">
                Reusable component library — Button, Badge, Avatar, Card component with multiple variant.
                Design system approach demonstrate consistency across application.
              </p>
              <p className="text-xs text-gray-600">Week 4 Project • January 2026</p>
            </Card>

            {/* Project 2: User Directory */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">User Directory</h3>}
              footer={
                <div className="flex gap-2 flex-wrap">
                  <Badge color="blue" className="text-xs">API</Badge>
                  <Badge color="green" className="text-xs">Hooks</Badge>
                </div>
              }
            >
              <p className="text-gray-700 text-sm mb-4">
                Real API integration from JSONPlaceholder. Feature: loading skeleton, error handling, search, sort.
                Demonstrate useEffect pattern for data fetching.
              </p>
              <p className="text-xs text-gray-600">Week 5 Project • January 2026</p>
            </Card>

            {/* Project 3: Todo App */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">Todo App</h3>}
              footer={
                <div className="flex gap-2 flex-wrap">
                  <Badge color="blue" className="text-xs">State</Badge>
                  <Badge color="green" className="text-xs">Storage</Badge>
                </div>
              }
            >
              <p className="text-gray-700 text-sm mb-4">
                Full-featured todo application with localStorage persistence. Features: add, complete, delete,
                filter, clear completed. Data persist across page reload.
              </p>
              <p className="text-xs text-gray-600">Week 5 Project • January 2026</p>
            </Card>

            {/* Project 4: Coming Soon */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">E-Commerce Admin</h3>}
              footer={
                <Badge color="purple" className="text-xs">Coming Soon</Badge>
              }
            >
              <p className="text-gray-700 text-sm mb-4">
                Dashboard with real API integration, data table management, chart visualization.
                Combination of all learned skill.
              </p>
              <p className="text-xs text-gray-600">Week 6-7 Project • TBD</p>
            </Card>
          </div>

          {/* Note: Card component used multiple time with different content */}
          <p className="text-sm text-gray-600 mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <span className="font-semibold">💡 Technical note:</span> Same Card component show different project.
            Pass header/footer/children props — component adapt to content. This composition power!
          </p>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* INTERNSHIP TIMELINE */}
      {/* ====================================================================== */}

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Internship Timeline
          </h2>

          <div className="space-y-6">
            {/* Week 1 */}
            <TimelineItem
              week={1}
              title="HTML/CSS/Git Foundation"
              description="Semantic HTML, CSS box model, Flexbox, Git version control"
              status="completed"
            />

            {/* Week 2 */}
            <TimelineItem
              week={2}
              title="Advanced CSS"
              description="Flexbox, Grid, Responsive design, CSS animation"
              status="completed"
            />

            {/* Week 3 */}
            <TimelineItem
              week={3}
              title="JavaScript Fundamentals"
              description="Variables, scope, array method, ES6+, async/await"
              status="completed"
            />

            {/* Week 4 */}
            <TimelineItem
              week={4}
              title="React Components & Props"
              description="Vite setup, JSX, component, props, design system"
              status="completed"
            />

            {/* Week 5 */}
            <TimelineItem
              week={5}
              title="React Hooks Deep Dive"
              description="useState, useEffect, API integration, real project"
              status="in-progress"
            />

            {/* Week 6-7 */}
            <TimelineItem
              week="6-7"
              title="Advanced React"
              description="Context API, custom hooks, state management"
              status="pending"
            />

            {/* Week 8-11 */}
            <TimelineItem
              week="8-11"
              title="Full-Stack Project & Portfolio"
              description="End-to-end application, deployment, final presentation"
              status="pending"
            />
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* ABOUT SECTION */}
      {/* ====================================================================== */}

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <Card 
            header={<h2 className="text-2xl font-bold text-gray-900">About Yogendra</h2>}
            className="bg-white shadow-lg"
          >
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                I am a bachelor student from Nepal pursuing my first internship in web development. 
                Before joining Tech Yatra, my knowledge of web development was mostly theoretical from college.
                I never had professional experience building real application with modern framework.
              </p>

              <p>
                When I got opportunity to learn React at Tech Yatra, I was excited because React is one of most
                in-demand skill in job market. The internship give me hands-on experience building real component,
                managing state, integrating API, and thinking like professional developer.
              </p>

              <p>
                By end of internship (February 2026), I will have built multiple project demonstrate skills:
                reusable component, state management, API integration, responsive design, Git workflow, and deployment.
                I aim to be ready junior developer role in Nepal and internationally.
              </p>

              <p>
                Besides coding, I enjoy learning new technology, discussing with mentor and peer, and understanding
                why solution work way it work. I believe deep understanding better than memorizing.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* FOOTER CTA */}
      {/* ====================================================================== */}

      <section className="py-12 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to collaborate?</h2>
          <p className="text-lg mb-6 opacity-90">
            Feel free reach out if you have project, question, or opportunity!
          </p>
          <Button variant="ghost" size="lg" className="text-white border-white">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}

// ============================================================================
// Timeline Item Component
// ============================================================================

function TimelineItem({ week, title, description, status }) {
  const statusConfig = {
    completed: { color: 'bg-green-100 border-green-300', badge: 'green', textColor: 'text-green-800' },
    'in-progress': { color: 'bg-blue-100 border-blue-300', badge: 'blue', textColor: 'text-blue-800' },
    pending: { color: 'bg-gray-100 border-gray-300', badge: 'gray', textColor: 'text-gray-800' },
  };

  const config = statusConfig[status];

  return (
    <div className={`p-4 border-l-4 ${config.color} rounded`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-lg font-semibold text-gray-900">
            Week {week}: {title}
          </p>
          <p className="text-sm text-gray-700 mt-1">{description}</p>
        </div>
        <Badge 
          color={config.badge} 
          className="text-xs capitalize"
        >
          {status}
        </Badge>
      </div>
    </div>
  );
}

export default Portfolio;
