import React, { useRef } from 'react';
import { Download, Printer } from 'lucide-react';

// InternshipReport component - Making the comprehensive internship report that can be printed
// This component show all the internship details in one formatted page
// We using @media print CSS for making it print-friendly - removing unnecessary elements

const InternshipReport = () => {
  const reportRef = useRef(null);

  // Function for printing - browser native print dialog is opening
  const handlePrint = () => {
    window.print();
  };

  // Function for downloading as PDF - using browser print to PDF feature
  const handleDownloadPDF = () => {
    window.print();
    // Alternative: can use jsPDF library for advanced PDF generation
    // But browser print-to-PDF is simplest and working good
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      {/* Header section with title and print button - THIS WILL HIDE WHEN PRINTING */}
      <div className="max-w-4xl mx-auto mb-6 print:hidden flex justify-between items-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Internship Report
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Printer size={20} />
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Download size={20} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Main report content - this is visible both on screen and when printing */}
      <div
        ref={reportRef}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-12"
      >
        {/* EXECUTIVE SUMMARY SECTION */}
        <section className="mb-10 pb-8 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Executive Summary
          </h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">Company</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Tech Yatra Private Limited</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">Intern Name</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Yogendra BK</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">Duration</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Dec 8, 2025 – Feb 19, 2026</p>
            </div>
            <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mb-1">Supervisor</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">Tech Yatra Team</p>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-gray-700 p-6 rounded-lg border-l-4 border-indigo-600">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
              <strong>Objective:</strong> Complete 11-week React web development internship program, learning 
              HTML, CSS, JavaScript, React fundamentals through advanced patterns, and building production-ready 
              applications. The internship focused on practical skills, code quality, and professional development.
            </p>
          </div>
        </section>

        {/* LEARNING OBJECTIVES VS ACHIEVEMENTS */}
        <section className="mb-10 pb-8 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Learning Objectives vs Achievements
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-6">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Learning Objective</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900 dark:text-white">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">HTML5 & CSS3 Fundamentals</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">Responsive Design & Flexbox/Grid</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">JavaScript ES6+ & Async Programming</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">React Fundamentals & Hooks</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">React Router & State Management (Context API)</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">Advanced React Patterns & Custom Hooks</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">Tailwind CSS & Component Styling</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
                <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">Building Production-Ready Web Applications</td>
                  <td className="px-4 py-3"><span className="bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100 px-3 py-1 rounded-full text-xs font-bold">✅ Achieved</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TECHNICAL SKILLS ACQUIRED */}
        <section className="mb-10 pb-8 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Technical Skills Acquired
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { skill: 'React Hooks (useState, useEffect, useContext, useReducer, useRef)', proficiency: 95 },
              { skill: 'React Router v6', proficiency: 90 },
              { skill: 'Context API State Management', proficiency: 88 },
              { skill: 'Tailwind CSS', proficiency: 92 },
              { skill: 'JavaScript ES6+', proficiency: 90 },
              { skill: 'Component-Based Architecture', proficiency: 92 },
              { skill: 'Responsive Design', proficiency: 90 },
              { skill: 'Web Animation & CSS Transforms', proficiency: 85 },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold text-gray-900 dark:text-white">{item.skill}</p>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{item.proficiency}%</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS COMPLETED */}
        <section className="mb-10 pb-8 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Projects Completed
          </h2>

          <div className="space-y-4">
            {[
              {
                name: '🏠 Portfolio Website',
                desc: '12+ page responsive React application with routing, authentication, dark mode support, and dynamic content rendering.'
              },
              {
                name: '📊 Dashboard with Charts',
                desc: 'Interactive dashboard featuring data visualization, real-time updates, and multiple context providers working together.'
              },
              {
                name: '📝 Multi-Step Form',
                desc: 'Complex form with validation using useReducer for state management, form state persistence, and step-by-step progression.'
              },
              {
                name: '✅ Todo Application',
                desc: 'Full-featured todo app with localStorage persistence, filtering, search, and CRUD operations.'
              },
              {
                name: '👥 User Management System',
                desc: 'Display user lists with search, sort, pagination, and detailed user profile pages with rich information.'
              },
              {
                name: '📚 Blogging Platform',
                desc: 'Post listing with infinite scroll, pagination, detailed post views, and comment section UI.'
              },
            ].map((proj, idx) => (
              <div key={idx} className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{proj.name}</h4>
                <p className="text-gray-700 dark:text-gray-300">{proj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WEEKLY PROGRESS SUMMARY */}
        <section className="mb-10 pb-8 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Weekly Progress Summary
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Weeks 1-3: HTML, CSS, JavaScript Fundamentals</h4>
              <p className="text-gray-700 dark:text-gray-300">Building strong foundation in web basics. Learned semantic HTML, CSS box model, flexbox, grid, responsive design, ES6 syntax, array methods, closures, and async/await.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Weeks 4-6: React Core & Intermediate Concepts</h4>
              <p className="text-gray-700 dark:text-gray-300">Mastered React component lifecycle, hooks system, routing with React Router, state management, form handling, and styling approaches. Built first multi-page applications.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Weeks 7-9: Advanced Patterns & Production Skills</h4>
              <p className="text-gray-700 dark:text-gray-300">Deep dive into compound components, render props, custom hooks, Context API, animations, performance optimization. Built complex data-driven applications with real-world patterns.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Weeks 10-11: Integration, Verification & Completion</h4>
              <p className="text-gray-700 dark:text-gray-300">Integration of all learned concepts into single cohesive application. Complete verification, testing, documentation, and defense preparation. Final application deployment-ready.</p>
            </div>
          </div>
        </section>

        {/* CHALLENGES AND SOLUTIONS */}
        <section className="mb-10 pb-8 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Challenges and Solutions
          </h2>

          <div className="space-y-6">
            <div className="bg-red-50 dark:bg-gray-700 p-5 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">❌ Challenge 1: Understanding Complex React Patterns</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Problem:</strong> Compound components, render props, and custom hooks concepts were initially confusing with unclear use cases.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Solution:</strong> Built small projects practicing each pattern individually, then combined patterns in larger applications. Reading other developers' code and watching educational videos helped solidify understanding. By Week 8-9, patterns became natural to use.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-gray-700 p-5 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">❌ Challenge 2: Managing Complex State Across Components</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Problem:</strong> Prop drilling through many components became problematic. State management scattered and difficult to debug.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Solution:</strong> Implemented Context API properly with separate contexts for different concerns (ThemeContext, AuthContext). Used useReducer for complex state logic. Centralized state management at application root, making state flow predictable and debuggable.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-gray-700 p-5 rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-3">❌ Challenge 3: Performance Optimization & InfiniteScroll Implementation</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                <strong>Problem:</strong> Large lists caused performance issues. Implementing infinite scroll or virtualization was initially complex.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Solution:</strong> Learned about IntersectionObserver API for detecting when elements enter viewport. Created custom useIntersectionObserver hook for reusable scroll detection. Implemented pagination first, then infinite scroll by combining fetch-on-demand with IntersectionObserver. Performance improved significantly with proper memoization.
              </p>
            </div>
          </div>
        </section>

        {/* RECOMMENDATIONS FOR FUTURE INTERNS */}
        <section className="mb-10 pb-8 border-b-2 border-gray-300 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Recommendations for Future Interns
          </h2>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">✓</span>
              <p className="text-gray-700 dark:text-gray-300"><strong>Start with fundamentals:</strong> Do not skip HTML, CSS, JavaScript weeks. Strong foundation makes React concepts much easier to understand.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">✓</span>
              <p className="text-gray-700 dark:text-gray-300"><strong>Build projects, not just tutorials:</strong> Theory alone is insufficient. Build projects from scratch, facing real problems and solving them.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">✓</span>
              <p className="text-gray-700 dark:text-gray-300"><strong>Read others' code:</strong> Study well-written code on GitHub. Understanding patterns used by experienced developers accelerates learning.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">✓</span>
              <p className="text-gray-700 dark:text-gray-300"><strong>Document learning:</strong> Write explanations of what you learned. This reinforces understanding and creates reference material for future.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">✓</span>
              <p className="text-gray-700 dark:text-gray-300"><strong>Commit code regularly:</strong> Use Git from day one. Regular commits help track progress and provide checkpoint safety.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">✓</span>
              <p className="text-gray-700 dark:text-gray-300"><strong>Test your application:</strong> Manual testing is crucial. Test all features, various screen sizes, dark/light modes, and different user flows.</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl font-bold text-green-600">✓</span>
              <p className="text-gray-700 dark:text-gray-300"><strong>Prepare for defense:</strong> Create comprehensive documentation. Write down what you built, how you built it, and what you learned. Practice demo beforehand.</p>
            </li>
          </ul>
        </section>

        {/* FINAL SECTION */}
        <section className="text-center pt-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-3">
              This internship represented a complete learning journey from absolute beginner to confident React developer.
            </p>
            <p className="text-lg font-semibold">
              The combination of dedicated study, consistent practice, real project building, and proper documentation 
              resulted in production-ready skills and deployment-ready applications.
            </p>
          </div>
        </section>

        {/* PRINT-FRIENDLY CSS STYLES */}
        <style>{`
          /* @media print is for styling when browser print dialog is opened */
          /* This CSS controls what is shown and hidden when user prints the page */
          @media print {
            /* Hide navbar, footer, and buttons when printing - no need to print them */
            .print\\:hidden {
              display: none !important;
            }

            /* Remove all backgrounds for cleaner print output - saves ink/toner */
            body {
              background: white;
              color: black;
            }

            /* Keep white background for main report content */
            .bg-white {
              background: white !important;
            }

            /* Make report full width and remove padding for print efficiency */
            div {
              page-break-inside: avoid; /* Prevent breaking sections across pages */
            }

            /* Ensure text is dark and readable in print */
            .dark\\:text-white {
              color: black !important;
            }

            .dark\\:text-gray-200 {
              color: #333 !important;
            }

            .dark\\:text-gray-300 {
              color: #555 !important;
            }

            /* Use simple colors for printed output */
            .bg-blue-50, .bg-gray-50 {
              background: #f9f9f9 !important;
              border: 1px solid #ddd !important;
            }

            /* Reduce margins and padding for more compact print */
            section {
              margin-bottom: 1.5rem;
            }

            /* Print tables clearly */
            table {
              border-collapse: collapse;
              width: 100%;
            }

            th, td {
              border: 1px solid #ddd;
              padding: 0.5rem;
            }

            /* Status badges remain visible but simplified */
            .bg-green-200 {
              background: #ddd !important;
              color: black !important;
            }

            /* Header styling for print */
            h2 {
              page-break-after: avoid; /* Keep header with content */
              margin-top: 1.5rem;
              margin-bottom: 1rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default InternshipReport;
