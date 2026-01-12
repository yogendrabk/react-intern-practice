import { Badge } from '../components/Badge';
import { Card } from '../components/Card';

// ============================================================================
// About Page — Yogendra's Internship Journey
// ============================================================================
//
// This page display:
// - Internship overview (company, duration, supervisor, tech stack)
// - Weekly learning breakdown showing progress across all 11 week
// - Key achievement highlight
// - Skill acquired organized by category
//
// Purpose: Show complete internship context, what learn, progress tracking
//
// ============================================================================

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About This Internship</h1>
          <p className="text-xl text-gray-600">
            My journey from Nepal — learning React, building project, becoming junior developer
          </p>
        </div>

        {/* SECTION 1: Internship Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Internship Overview</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50">Company</td>
                  <td className="px-6 py-4 text-gray-700">Tech Yatra Private Limited, Kathmandu, Nepal</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50">Internship Duration</td>
                  <td className="px-6 py-4 text-gray-700">December 8, 2025 – February 19, 2026 (11 weeks)</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50">Intern Name</td>
                  <td className="px-6 py-4 text-gray-700">Yogendra BK</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50">Email</td>
                  <td className="px-6 py-4 text-gray-700">bkyogendra246@gmail.com</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-gray-800 bg-gray-50">Tech Stack</td>
                  <td className="px-6 py-4 text-gray-700">React 18, Vite, Tailwind CSS, JavaScript ES6+, Git, APIs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: Weekly Learning Breakdown */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Weekly Learning Breakdown</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-3 text-left font-semibold">Week</th>
                  <th className="px-4 py-3 text-left font-semibold">Focus Area</th>
                  <th className="px-4 py-3 text-left font-semibold">Key Skill</th>
                  <th className="px-4 py-3 text-center font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                <TR week="1" focus="Dev Setup, HTML, CSS, Git" skill="Semantic HTML, Box Model, Git basics" status="✅" />
                <TR week="2" focus="CSS Layouts, Responsive" skill="Flexbox, Grid, Mobile-first, Animations" status="✅" />
                <TR week="3" focus="JavaScript Fundamentals" skill="Scope, Closure, Array methods, ES6+, Async" status="✅" />
                <TR week="4" focus="React Components, Props" skill="JSX, Components, Props, Design System" status="✅" />
                <TR week="5" focus="React Hooks, APIs" skill="useState, useEffect, localStorage, API fetch" status="✅" />
                <TR week="6" focus="Router, Auth, Bootstrap" skill="React Router, Protected routes, Bootstrap" status="✅" />
                <TR week="7-9" focus="Advanced Projects" skill="Context API, Custom hooks, Full-stack" status="⏳" />
                <TR week="10-11" focus="Portfolio, Deployment" skill="Performance, Testing, Final project" status="⏳" />
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Key Achievements */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Achievement 
              number="30"
              label="Commits"
              description="Clean, well-organized git history across 6 weeks"
            />
            <Achievement 
              number="3,000+"
              label="Lines of Code"
              description="Production-ready React components and utilities"
            />
            <Achievement 
              number="8"
              label="React Pages"
              description="Home, About, Portfolio, ToDo, Users, Dashboard, and more"
            />
            <Achievement 
              number="5"
              label="Component Patterns"
              description="Props, children, composition, reusable design system"
            />
            <Achievement 
              number="6"
              label="useEffect Patterns"
              description="Mount-only, dependencies, cleanup, data fetching, debounce"
            />
            <Achievement 
              number="100%"
              label="Attendance"
              description="Never missed a day, consistent daily commits"
            />
          </div>
        </section>

        {/* SECTION 4: Skills Acquired */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills Acquired by Category</h2>
          
          <div className="space-y-8">
            {/* Frontend Skills */}
            <SkillCategory 
              title="Frontend Development"
              skills={['React 18', 'JSX', 'Tailwind CSS', 'Bootstrap 5', 'Responsive Design', 'CSS Grid/Flexbox']}
              color="blue"
            />

            {/* JavaScript */}
            <SkillCategory 
              title="JavaScript & ES6+"
              skills={['Async/await', 'Promise', 'Destructuring', 'Array methods', 'Scope/Closure', 'Module']}
              color="yellow"
            />

            {/* React Advanced */}
            <SkillCategory 
              title="React Hooks & Patterns"
              skills={['useState', 'useEffect', 'useParams', 'useContext', 'Custom Hooks']}
              color="blue"
            />

            {/* Routing & Auth */}
            <SkillCategory 
              title="Routing & Authentication"
              skills={['React Router v6', 'Protected Routes', 'Navigation', 'Dynamic Routing', 'Auth Flow']}
              color="purple"
            />

            {/* APIs & Data */}
            <SkillCategory 
              title="APIs & Data Management"
              skills={['REST API', 'Fetch API', 'Error Handling', 'Loading State', 'localStorage', 'Race Condition Prevention']}
              color="green"
            />

            {/* Developer Tools */}
            <SkillCategory 
              title="Developer Tools & Workflow"
              skills={['Git/GitHub', 'VS Code', 'npm/Vite', 'Browser DevTools', 'Terminal/CLI']}
              color="green"
            />
          </div>
        </section>

        {/* SECTION 5: Personal Growth */}
        <section className="mb-12">
          <Card header={<h2 className="text-2xl font-bold">Personal Growth & What I Learned</h2>}>
            <div className="space-y-4 text-gray-700">
              <p>
                <strong>Before Internship:</strong> I had theoretical knowledge of web development from college but never built real application. I didn't understand how state management work, how to handle error in API request, how to organize large codebase.
              </p>
              <p>
                <strong>Week 1-3 Breakthrough:</strong> Finally understood how browser rendering work, CSS layout algorithm, JavaScript closure concept. This foundation essential for React.
              </p>
              <p>
                <strong>Week 4 Realization:</strong> React make sense! Breaking UI into component, prop drilling, component reuse — these concept click when build interactive UI. Design system thinking = professional approach.
              </p>
              <p>
                <strong>Week 5 Understanding:</strong> React state/hook no longer scary. useEffect dependency array, cleanup function, localStorage persistence — all make sense now. Build UserDirectory with real API made everything click.
              </p>
              <p>
                <strong>Week 6 Confidence:</strong> React Router, protected route, authentication flow — these are standard pattern in professional application. I now understand big picture of web development.
              </p>
              <p>
                <strong>Key Lesson:</strong> <em>"Deep understanding better than memorizing."</em> Not just know useState, but understand WHY dependency array work this way. Not just use localStorage, but understand browser storage persistence model.
              </p>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white">
          <h2 className="text-3xl font-bold mb-4">Ready for Next Challenge</h2>
          <p className="text-lg mb-6">Week 7 onwards: Context API, Custom Hooks, Full-Stack Projects</p>
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
            See My Projects
          </button>
        </section>
      </div>
    </div>
  );
}

// ============================================================================
// Helper Components
// ============================================================================

function TR({ week, focus, skill, status }) {
  const statusColor = status === '✅' ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-800';
  
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="px-4 py-3 font-semibold text-gray-900">Week {week}</td>
      <td className="px-4 py-3 text-gray-700">{focus}</td>
      <td className="px-4 py-3 text-gray-700">{skill}</td>
      <td className={`px-4 py-3 text-center font-semibold text-lg ${statusColor}`}>{status}</td>
    </tr>
  );
}

function Achievement({ number, label, description }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
      <p className="text-4xl font-bold text-blue-600 mb-2">{number}</p>
      <p className="text-lg font-semibold text-gray-900 mb-2">{label}</p>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

function SkillCategory({ title, skills, color }) {
  const colorMap = {
    blue: 'blue',
    yellow: 'yellow',
    purple: 'purple',
    green: 'green',
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} color={colorMap[color]}>
            {skill}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default About;
