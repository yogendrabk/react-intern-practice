import { Tooltip } from '../ui/Tooltip';

/**
 * Charts Component — Data Visualization using CSS Only
 *
 * Build charts thatuse only CSS and Tailwind CSS — no chart libraries like Chart.js.
 * This shows the power of modern CSS features for data visualization.
 *
 * Three charts included:
 * 1. Skill Proficiency — Horizontal bar chart
 * 2. Time Distribution — Donut chart using CSS conic-gradient
 * 3. Activity Heatmap — 11 weeks × 5 days grid with intensity colors
 *
 * Why CSS-only vs Chart.js?
 * "CSS-only charts are better for simple visualizations because:
 * - Smaller bundle size (no extra library)
 * - Faster rendering (no JS calculations)
 * - Fully customizable with Tailwind
 * - Semantic HTML (accessibility better)
 * - Direct control over styling
 *
 * But Chart.js better for:
 * - Complex interactive charts (zoom, pan, tooltips)
 * - Real-time data updates
 * - Multiple chart types
 * - Animation libraries
 * - Business intelligence dashboards
 *
 * For internship portfolio: CSS-only is impressive — shows CSS mastery!"
 */

export function Charts() {
  // Skills data: {skill: string, percentage: number}
  const skills = [
    { name: 'HTML', percentage: 90 },
    { name: 'CSS', percentage: 85 },
    { name: 'JavaScript', percentage: 75 },
    { name: 'React', percentage: 65 },
    { name: 'Bootstrap', percentage: 80 },
    { name: 'Tailwind', percentage: 70 },
  ];

  // Time distribution data for donut chart
  const timeDistribution = [
    { topic: 'Frontend', hours: 60, color: 'from-blue-400 to-blue-600' },
    { topic: 'Styling', hours: 40, color: 'from-purple-400 to-purple-600' },
    { topic: 'Tooling', hours: 30, color: 'from-green-400 to-green-600' },
    { topic: 'API', hours: 25, color: 'from-orange-400 to-orange-600' },
    { topic: 'Practice', hours: 45, color: 'from-pink-400 to-pink-600' },
  ];

  const totalHours = timeDistribution.reduce((sum, item) => sum + item.hours, 0);

  // Calculate percentages for donut chart
  const segments = timeDistribution.map(item => ({
    ...item,
    percentage: Math.round((item.hours / totalHours) * 100),
  }));

  // Create conic-gradient for donut
  let cumulativePercentage = 0;
  const conicStops = segments.map(segment => {
    const start = cumulativePercentage;
    const end = cumulativePercentage + segment.percentage;
    cumulativePercentage = end;
    return `${segment.color} ${start}%, ${segment.color} ${end}%`;
  }).join(', ');

  // Weekly activity heatmap: 11 weeks × 5 days (Monday-Friday)
  const weeks = [
    { week: 'W1', days: [5, 4, 5, 3, 4] }, // Dec 8-12
    { week: 'W2', days: [4, 5, 3, 5, 4] }, // Dec 15-19
    { week: 'W3', days: [5, 5, 4, 3, 5] }, // Dec 22-26
    { week: 'W4', days: [3, 4, 5, 5, 4] }, // Dec 29 - Jan 2
    { week: 'W5', days: [5, 3, 5, 4, 5] }, // Jan 5-9
    { week: 'W6', days: [4, 5, 5, 5, 3] }, // Jan 12-16
    { week: 'W7', days: [5, 4, 5, 5, 4] }, // Jan 19-23
    { week: 'W8', days: [4, 5, 3, 4, 5] }, // Jan 26-30
  ];

  // Get intensity color based on commit count (0-5)
  const getIntensityColor = (count) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-green-100';
    if (count === 2) return 'bg-green-300';
    if (count === 3) return 'bg-green-500';
    if (count === 4) return 'bg-green-700';
    return 'bg-green-900';
  };

  return (
    <div className="space-y-12">
      {/* ========================================
          CHART 1: Skill Proficiency Bar Chart
          ======================================== */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Skill Proficiency</h3>
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          {skills.map((skill) => (
            <Tooltip key={skill.name} text={`${skill.name}: ${skill.percentage}%`} position="right">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">{skill.percentage}%</span>
                </div>
                {/* Bar container */}
                <div className="w-full h-8 bg-gray-200 rounded-lg overflow-hidden">
                  {/* Animated bar fill */}
                  <div
                    style={{ width: `${skill.percentage}%` }}
                    className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg transition-all duration-500 ease-out flex items-center justify-end pr-2"
                  >
                    {skill.percentage > 30 && (
                      <span className="text-xs font-bold text-white">{skill.percentage}%</span>
                    )}
                  </div>
                </div>
              </div>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* ========================================
          CHART 2: Donut Chart using conic-gradient
          ======================================== */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Time Distribution (by Topic)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-lg p-6">
          {/* Donut Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              {/* CSS conic-gradient donut */}
              <div
                style={{
                  background: `conic-gradient(${conicStops})`,
                  borderRadius: '50%',
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* White circle in center to create donut hole */}
                <div className="absolute bg-white rounded-full w-32 h-32 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gray-900">{totalHours}</p>
                    <p className="text-sm text-gray-600">Total Hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col justify-center space-y-3">
            {segments.map((segment) => (
              <Tooltip
                key={segment.topic}
                text={`${segment.topic}: ${segment.hours}h (${segment.percentage}%)`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${segment.color}`} />
                  <span className="flex-1 text-sm font-medium text-gray-900">
                    {segment.topic}
                  </span>
                  <span className="text-sm font-bold text-gray-600">
                    {segment.hours}h
                  </span>
                </div>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================
          CHART 3: Activity Heatmap
          ======================================== */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Activity Heatmap (Commits per Day)</h3>
        <div className="bg-white rounded-lg shadow-lg p-6 overflow-x-auto">
          {/* Grid: weeks on Y, days on X */}
          <div className="inline-block">
            {/* Header row with day labels */}
            <div className="flex gap-1 mb-2">
              <div className="w-12"></div> {/* Empty space for week labels */}
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
                <div
                  key={day}
                  className="w-12 h-6 flex items-center justify-center text-xs font-medium text-gray-600"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap rows */}
            {weeks.map((weekData, weekIdx) => (
              <div key={weekIdx} className="flex gap-1 mb-1">
                {/* Week label */}
                <div className="w-12 h-8 flex items-center justify-center text-xs font-bold text-gray-700 bg-gray-50 rounded">
                  {weekData.week}
                </div>

                {/* Day boxes */}
                {weekData.days.map((count, dayIdx) => (
                  <Tooltip
                    key={`${weekIdx}-${dayIdx}`}
                    text={`${count} commit${count !== 1 ? 's' : ''}`}
                    position="top"
                  >
                    <div
                      className={`w-8 h-8 rounded transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg ${getIntensityColor(
                        count
                      )}`}
                      title={`${count} commits`}
                    />
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>

          {/* Legend for intensity */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-600 mb-3">Commit Intensity</p>
            <div className="flex gap-1 items-center">
              {[0, 1, 2, 3, 4, 5].map((intensity) => (
                <Tooltip
                  key={intensity}
                  text={`${intensity} commit${intensity !== 1 ? 's' : ''}`}
                  position="top"
                >
                  <div
                    className={`w-4 h-4 rounded ${getIntensityColor(intensity)}`}
                  />
                </Tooltip>
              ))}
              <span className="ml-4 text-xs text-gray-600">More commits →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info box explaining techniques */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <p className="text-sm text-blue-900">
          <strong>CSS Techniques Used:</strong> These charts are built with CSS only!
          The donut chart uses <code className="bg-white px-1 py-0.5 rounded text-xs">conic-gradient</code> for segments.
          The heatmap uses CSS Grid. No chart library needed!
        </p>
      </div>
    </div>
  );
}
