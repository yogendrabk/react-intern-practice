import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { useIntersectionObserver } from '../hooks';

// ============================================================================
// Portfolio Page (Day 30) — Bootstrap Integration + Component Reuse
// ============================================================================
// 
// Enhanced portfolio with Bootstrap 5 component:
// - Breadcrumb (Bootstrap)
// - Modal for project detail (Bootstrap + React state)
// - Progress bar for skill level (Bootstrap + animation)
// - Accordion for FAQ (Bootstrap + React state)
// - Mix of Tailwind (layout) + Bootstrap (component)
//
// This demonstrate integration of Bootstrap component inside React app.
// Use React state to control Bootstrap element (modal, accordion).
// Use Bootstrap CSS for styling (card, progress, badge).
//
// ============================================================================

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  
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
      {/* SKILL PROFICIENCY — Animated Progress Bars (useIntersectionObserver) */}
      {/* ====================================================================== */}

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Skill Proficiency
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Scroll down to see skill bars animate as they enter viewport (useIntersectionObserver)
          </p>

          <div className="space-y-6">
            <SkillBar skill="React & JSX" proficiency={75} />
            <SkillBar skill="JavaScript (ES6+)" proficiency={75} />
            <SkillBar skill="HTML & Semantic Markup" proficiency={85} />
            <SkillBar skill="CSS & Tailwind" proficiency={80} />
            <SkillBar skill="Git & Version Control" proficiency={70} />
            <SkillBar skill="API Integration" proficiency={65} />
            <SkillBar skill="Problem Solving" proficiency={80} />
            <SkillBar skill="Communication" proficiency={75} />
          </div>

          <p className="text-sm text-gray-600 mt-8 p-4 bg-blue-50 rounded border border-blue-200">
            <span className="font-semibold">💡 Technical note:</span> These progress bars use useIntersectionObserver hook!
            When bar scroll into viewport, animation trigger automatically. Better UX without scroll event listener!
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
              status="completed"
            />

            {/* Week 6-7 */}
            <TimelineItem
              week="6-7"
              title="Advanced React & Router"
              description="React Router v6, authentication, protected routes, custom hooks"
              status="completed"
            />

            {/* Week 8 */}
            <TimelineItem
              week={8}
              title="Advanced Features & Polish"
              description="useReducer tables, CSS charts, infinite scroll, defense prep, documentation"
              status="completed"
            />

            {/* Week 9 */}
            <TimelineItem
              week={9}
              title="Advanced Patterns & Defense Finalization"
              description="Real-time activity feeds, multi-step forms, React patterns (compound, render props, HOC), defense documentation"
              status="completed"
            />
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* WEEK 9 ADVANCED PATTERNS & FINALIZATION */}
      {/* ====================================================================== */}

      <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ✨ Advanced Week: Week 9 Completion
            </h2>
            <p className="text-lg text-gray-700">
              Real-time data patterns, advanced form handling, and React design patterns mastery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Day 41 - ActivityFeed */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">⚡ Day 41: Real-Time Activity Feed</h3>}
              className="border-2 border-blue-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Feature:</strong> Simulated real-time updates with useReducer polling</p>
                <p><strong>Tech:</strong> useReducer, setInterval, relative time formatting</p>
                <p><strong>Lines:</strong> 260+ lines of ActivityFeed + 110+ lines of timeUtils</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-blue-50 rounded">
                  💡 useReducer for multiple related state (activities array + isPaused). 
                  Polling every 8 seconds simulates real-time (production: WebSocket).
                </p>
              </div>
            </Card>

            {/* Day 42 - MultiStepForm */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">📋 Day 42: Multi-Step Form Wizard</h3>}
              className="border-2 border-green-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Features:</strong> 3-step form with validation, progress bar, localStorage</p>
                <p><strong>Tech:</strong> useState, localStorage, form validation pattern</p>
                <p><strong>Lines:</strong> 350+ lines with comprehensive step management</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-green-50 rounded">
                  💡 Per-step validation + centralized formData + localStorage persistence. 
                  Data survives refresh, enables progressive form completion.
                </p>
              </div>
            </Card>

            {/* Day 43 - React Patterns */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">🎨 Day 43: React Design Patterns</h3>}
              className="border-2 border-purple-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Patterns:</strong> Compound Components, Render Props, Higher-Order Components</p>
                <p><strong>Tech:</strong> Context API, composition, flexible component design</p>
                <p><strong>Lines:</strong> 300+ of interactive pattern examples</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-purple-50 rounded">
                  💡 Compound Components (implicit state sharing), Render Props (maximum flexibility), 
                  HOC (cross-cutting concerns). Modern approach: custom hooks instead.
                </p>
              </div>
            </Card>

            {/* Day 44 - Defense Prep Comprehensive */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">🎓 Day 44: Comprehensive Defense Prep</h3>}
              className="border-2 border-yellow-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Created:</strong> Complete defense documentation with Q&A</p>
                <p><strong>Content:</strong> Opening statement, 5 technical deep dives, 10+ Q&A</p>
                <p><strong>Lines:</strong> 825+ lines of reference material</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-yellow-50 rounded">
                  💡 Defense-ready with technical explanations, architecture decisions, 
                  and honest improvement suggestions.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ====================================================================== */}
      {/* UPDATED INTERNSHIP COMPLETION & CERTIFICATE (Week 8 focus) */}
      {/* ====================================================================== */}

      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ✅ Internship Completion: Week 8
            </h2>
            <p className="text-lg text-gray-700">
              Advanced React patterns, state management, and production-ready components
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Day 36 - DataTable */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">📊 Day 36: DataTable Component</h3>}
              className="border-2 border-blue-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Feature:</strong> Reusable, sortable, filterable data table</p>
                <p><strong>Tech:</strong> useReducer, useMemo, pagination</p>
                <p><strong>Lines:</strong> 350+ lines of production-ready code</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-blue-50 rounded">
                  💡 Why useReducer? Multiple related state values (sort, search, pagination) 
                  managed as cohesive unit instead of scattered useState hooks.
                </p>
              </div>
            </Card>

            {/* Day 37 - Charts */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">📈 Day 37: CSS-Only Charts</h3>}
              className="border-2 border-purple-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Feature:</strong> 3 charts without libraries (bars, donut, heatmap)</p>
                <p><strong>Tech:</strong> conic-gradient, CSS Grid, Tooltip component</p>
                <p><strong>Lines:</strong> 300+ lines with 3 different visualizations</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-purple-50 rounded">
                  💡 CSS-first approach: Smaller bundle, fully customizable, semantic HTML. 
                  Perfect for simple data viz!
                </p>
              </div>
            </Card>

            {/* Day 38 - Infinite Scroll */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">♾️ Day 38: Infinite Scroll Posts</h3>}
              className="border-2 border-green-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Features:</strong> Infinite scroll posts, bookmarks (localStorage), PostDetail</p>
                <p><strong>Tech:</strong> IntersectionObserver, localStorage, Clipboard API</p>
                <p><strong>Lines:</strong> 180+ for PostsPage + 120+ for PostDetail</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-green-50 rounded">
                  💡 IntersectionObserver: Efficient pattern vs scroll listeners. 
                  Bookmarks persist via localStorage. Share button copies URL.
                </p>
              </div>
            </Card>

            {/* Day 39 - Defense Prep */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">🎓 Day 39: Defense Prep</h3>}
              className="border-2 border-yellow-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Created:</strong> Comprehensive defense documentation</p>
                <p><strong>Content:</strong> 15 Q&A, concept table, patterns, component map</p>
                <p><strong>Lines:</strong> 650+ lines of reference material</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-yellow-50 rounded">
                  💡 Prepared for internship defense interview with architecture 
                  decisions, design patterns, and technical deep-dives.
                </p>
              </div>
            </Card>

            {/* Day 40 - Polish */}
            <Card 
              header={<h3 className="text-lg font-semibold text-gray-800">✨ Day 40: Final Polish</h3>}
              className="border-2 border-red-200 bg-white"
            >
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Created:</strong> Utility functions, hooks, updated README</p>
                <p><strong>Utilities:</strong> formatDate, formatNumber, truncateText, etc</p>
                <p><strong>Documentation:</strong> Complete project README, week summary</p>
                <p className="text-xs text-gray-600 mt-3 p-2 bg-red-50 rounded">
                  💡 Centralized formatting functions enforce consistency. 
                  Complete documentation for future reference & portfolio showcase.
                </p>
              </div>
            </Card>
          </div>

          {/* Key Achievements */}
          <Card 
            header={<h2 className="text-2xl font-bold text-gray-900">🏆 Key Achievements</h2>}
            className="bg-white shadow-lg"
          >
            <div className="space-y-4 text-gray-700">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded">
                  <p className="text-3xl font-bold text-blue-600">45</p>
                  <p className="text-sm text-gray-600">Git Commits</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded">
                  <p className="text-3xl font-bold text-purple-600">2500+</p>
                  <p className="text-sm text-gray-600">Lines of Code</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded">
                  <p className="text-3xl font-bold text-green-600">20+</p>
                  <p className="text-sm text-gray-600">Components Built</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded">
                  <p className="text-3xl font-bold text-yellow-600">9</p>
                  <p className="text-sm text-gray-600">Weeks Completed</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-lg mb-3">Technical Competencies:</h3>
                <ul className="space-y-2 text-sm">
                  <li>✅ React 18 with functional components & hooks deep understanding</li>
                  <li>✅ Custom hooks for reusable logic (useLocalStorage, useIntersectionObserver, useDocumentTitle)</li>
                  <li>✅ State management with useState, useReducer, Context API patterns</li>
                  <li>✅ API integration with error handling, loading states, caching patterns</li>
                  <li>✅ Responsive design with Tailwind CSS & Bootstrap integration</li>
                  <li>✅ Production-ready components (DataTable reusable, Charts visualized data, Tooltip interactive UX)</li>
                  <li>✅ Browser APIs (IntersectionObserver for infinite scroll, Clipboard API for sharing, localStorage for persistence)</li>
                  <li>✅ Git workflow with meaningful commits, testing practices, code organization</li>
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-semibold text-lg mb-3">Internship Certificate Details:</h3>
                <p className="text-sm">
                  <strong>Duration:</strong> December 9, 2025 - February 6, 2026 (9 weeks)
                </p>
                <p className="text-sm mt-2">
                  <strong>Company:</strong> Tech Yatra Private Limited, Kathmandu, Nepal
                </p>
                <p className="text-sm mt-2">
                  <strong>Course:</strong> Advanced React Development with Modern Web Technologies
                </p>
                <p className="text-sm mt-2">
                  <strong>Outcome:</strong> Built 8+ projects with 45 commits, mastered React hooks, 
                  custom components, state management patterns (useState/useReducer/Context), 
                  API integration, design patterns, and professional development practices.
                </p>
              </div>
            </div>
          </Card>
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
// SkillBar Component — Uses useIntersectionObserver for animation
// ============================================================================
//
// This component demonstrate useIntersectionObserver hook:
// - When skill bar scroll into viewport, animation trigger
// - Progress width animate from 0 to target proficiency level
// - No scroll event listener needed (browser API handle it)
//
// ============================================================================

function SkillBar({ skill, proficiency }) {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between">
        <span className="font-semibold text-gray-800">{skill}</span>
        <span className="text-sm text-gray-600">{proficiency}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`
            h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full
            transition-all duration-1000 ease-out
            ${isVisible ? 'w-[proficiency%]' : 'w-0'}
          `}
          style={{
            width: isVisible ? `${proficiency}%` : '0%',
          }}
        />
      </div>
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
