import { useState, useEffect, useReducer } from 'react';
import { formatRelativeTime } from '../../utils/timeUtils';

/**
 * ActivityFeed Component
 * 
 * Real-time activity feed showing simulated live updates.
 * Every 8 seconds, new activity appears at top (new user joined, post created, etc).
 * User can pause/resume feed updates.
 * 
 * Features:
 * - useReducer for feed state management (ADD_ACTIVITY, TOGGLE_PAUSE, CLEAR actions)
 * - Feed limited to last 20 activities
 * - Relative timestamps ("2 minutes ago" format)
 * - Pause/resume button to control updates
 * - Auto-scroll to top when new activity appears
 * 
 * Real-time Updates Pattern:
 * "In React, real-time updates can be done:
 * 1. Polling (setInterval) — simple, works everywhere, less efficient
 * 2. WebSocket — efficient, true real-time, needs backend support
 * 3. Server-Sent Events (SSE) — one-way streaming from server
 * We use polling here for simplicity. In production, WebSocket better."
 */

const activities = [
  { user: 'Yogendra BK', action: 'joined the community', icon: '✅' },
  { user: 'Priya Sharma', action: 'completed a task', icon: '📋' },
  { user: 'Raj Patel', action: 'created new post', icon: '📝' },
  { user: 'Maya Singh', action: 'commented on thread', icon: '💬' },
  { user: 'Ali Khan', action: 'earned a badge', icon: '🏆' },
  { user: 'Sofia Garcia', action: 'started learning React', icon: '⚛️' },
  { user: 'Chen Wu', action: 'shared an article', icon: '📰' },
  { user: 'Amira Hassan', action: 'answered a question', icon: '❓' },
];

/**
 * feedReducer — Manages activity feed state
 * Actions:
 * - ADD_ACTIVITY: Add new activity at top, limit to 20
 * - TOGGLE_PAUSE: Pause/resume updates
 * - CLEAR: Clear all activities
 */
function feedReducer(state, action) {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [action.payload, ...state.activities].slice(0, 20),
      };
    case 'TOGGLE_PAUSE':
      return {
        ...state,
        isPaused: !state.isPaused,
      };
    case 'CLEAR':
      return {
        ...state,
        activities: [],
      };
    default:
      return state;
  }
}

export function ActivityFeed() {
  const [state, dispatch] = useReducer(feedReducer, {
    activities: [],
    isPaused: false,
  });

  /**
   * Real-time simulation using setInterval
   * Every 8 seconds, random activity appears at top
   */
  useEffect(() => {
    if (state.isPaused) return; // Don't add activities when paused

    const interval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      dispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: Date.now(),
          ...randomActivity,
          timestamp: new Date(),
        },
      });
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [state.isPaused]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Live Activity Feed</h2>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_PAUSE' })}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              state.isPaused
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {state.isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button
            onClick={() => dispatch({ type: 'CLEAR' })}
            className="px-4 py-2 bg-red-500 text-white rounded font-semibold hover:bg-red-600 transition-colors"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Empty state */}
      {state.activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No activities yet. Check back soon!</p>
          <p className="text-sm">(Activities appear every 8 seconds)</p>
        </div>
      ) : (
        /* Activity list */
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {state.activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              {/* Icon */}
              <span className="text-3xl flex-shrink-0">{activity.icon}</span>

              {/* Content */}
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{activity.user}</span>
                  <span className="text-gray-600">{activity.action}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formatRelativeTime(activity.timestamp)}
                </p>
              </div>

              {/* Status indicator */}
              <span className="text-2xl flex-shrink-0">🔔</span>
            </div>
          ))}
        </div>
      )}

      {/* Info box: Polling vs WebSocket */}
      <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200 text-sm text-gray-700">
        <strong>💡 Implementation Note:</strong> Real-time updates shown here use polling (setInterval).
        Every 8 seconds, random activity appears. In production, prefer WebSocket for true real-time
        without unnecessary polling. This demo simulates real-time for learning.
      </div>
    </div>
  );
}

export default ActivityFeed;
