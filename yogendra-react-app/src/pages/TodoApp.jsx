import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

// ============================================================================
// TodoApp — React Hook Mastery with localStorage Persistence
// ============================================================================
//
// This component demonstrate advanced React pattern:
//
// 1. useState:
//    - todos: array of task object
//    - input: current input value
//    - filter: "all", "active", "completed"
//
// 2. useEffect Pattern (CRITICAL):
//    - Effect with dependency [todos]:
//      Run whenever todos change (add/delete/toggle complete)
//      → Save current todos to localStorage
//      → This mean every change persist to disk!
//
//    - Effect with empty dependency []:
//      Run only on component mount
//      → Load todos from localStorage
//      → Restore user data from previous session
//
// 3. Data Flow:
//    mount → useEffect [] → load from localStorage → render with saved data
//    user add → setState → useEffect [todos] trigger → save to localStorage
//    page reload → mount → useEffect [] trigger → restore from localStorage
//
// 4. localStorage Pattern (Key Learning):
//    - JSON.stringify: JavaScript object → string (for storage)
//    - JSON.parse: string → JavaScript object (for retrieval)
//    - localStorage.setItem(key, value): save
//    - localStorage.getItem(key): retrieve
//    - localStorage.removeItem(key): delete
//
// ============================================================================

const STORAGE_KEY = "yogendra_todos";

export function TodoApp() {
  // ========================================================================
  // State Management
  // ========================================================================

  // todos: array of {id, text, completed, priority, createdAt}
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all"); // "all", "active", "completed"
  const [priority, setPriority] = useState("medium"); // task priority: low, medium, high

  // ========================================================================
  // useEffect 1: Load todos from localStorage on mount
  // ========================================================================
  // 
  // This effect run ONLY on component mount (empty dependency array [])
  // Purpose: Restore user data from previous session
  //

  useEffect(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    
    if (savedTodos) {
      try {
        // Parse JSON string back to JavaScript object
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
        
        console.log(`✅ Load ${parsedTodos.length} todos from localStorage`);
      } catch (error) {
        console.error("Error parsing todos from localStorage:", error);
        // If parse fail, start with empty list
        setTodos([]);
      }
    } else {
      // First time user, no saved todos
      console.log("📝 No saved todos, starting fresh");
      setTodos([]);
    }
  }, []); // Empty dependency array = run only once on mount

  // ========================================================================
  // useEffect 2: Save todos to localStorage whenever todos change
  // ========================================================================
  // 
  // This effect run WHENEVER todos array change (dependency [todos])
  // Purpose: Persist todos to localStorage after every modification
  //
  // When this run?
  // - User add new task → todos change → effect run → save to localStorage
  // - User mark complete → todos change → effect run → save to localStorage
  // - User delete task → todos change → effect run → save to localStorage
  // - User reorder task → todos change → effect run → save to localStorage
  //
  // This the key pattern for persistence!
  //

  useEffect(() => {
    // Convert todos array to JSON string for storage
    const jsonString = JSON.stringify(todos);
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, jsonString);
    
    console.log(`💾 Saved ${todos.length} todos to localStorage`);
  }, [todos]); // Dependency: [todos] = run whenever todos array change

  // ========================================================================
  // Handler Functions
  // ========================================================================

  const handleAddTodo = () => {
    if (input.trim() === "") return;

    const newTodo = {
      id: Date.now(), // Simple unique ID using timestamp
      text: input.trim(),
      completed: false,
      priority: priority,
      createdAt: new Date().toLocaleDateString(),
    };

    setTodos([newTodo, ...todos]); // Add new todo to beginning
    setInput(""); // Clear input field
  };

  const handleKeyPress = (e) => {
    // Add task on Enter key press
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (id) => {
    // Toggle completed status
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    // Remove task
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleMoveUp = (index) => {
    // Move task up in list
    if (index === 0) return;
    const newTodos = [...todos];
    [newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]];
    setTodos(newTodos);
  };

  const handleMoveDown = (index) => {
    // Move task down in list
    if (index === todos.length - 1) return;
    const newTodos = [...todos];
    [newTodos[index], newTodos[index + 1]] = [newTodos[index + 1], newTodos[index]];
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    // Remove all completed task
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // ========================================================================
  // Filtered Todos
  // ========================================================================

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all"
  });

  // ========================================================================
  // Statistics
  // ========================================================================

  const totalTodos = todos.length;
  const completedTodos = todos.filter((t) => t.completed).length;
  const activeTodos = totalTodos - completedTodos;

  // ========================================================================
  // Render
  // ========================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">
            Manage your task with persistence — data save automatically!
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Add New Task
          </label>
          
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Type your task here... (press Enter to add)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button variant="primary" onClick={handleAddTodo}>
              Add
            </Button>
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-sm font-semibold text-gray-700">Priority:</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <StatCard 
            label="Total Tasks"
            count={totalTodos}
            color="bg-blue-100 text-blue-800"
          />
          <StatCard 
            label="Active"
            count={activeTodos}
            color="bg-yellow-100 text-yellow-800"
          />
          <StatCard 
            label="Completed"
            count={completedTodos}
            color="bg-green-100 text-green-800"
          />
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "active"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === "completed"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Completed
          </button>

          {completedTodos > 0 && (
            <button
              onClick={handleClearCompleted}
              className="ml-auto px-4 py-2 rounded-lg font-semibold bg-red-100 text-red-800 hover:bg-red-200 transition"
            >
              Clear Completed
            </button>
          )}
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500 text-lg">
                {todos.length === 0
                  ? "No tasks yet. Add one to get started!"
                  : "No tasks in this category."}
              </p>
            </div>
          ) : (
            filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={todos.indexOf(todo)} // Get original index from todos array
                totalTodos={todos.length}
                onToggle={() => handleToggleTodo(todo.id)}
                onDelete={() => handleDeleteTodo(todo.id)}
                onMoveUp={() => handleMoveUp(todos.indexOf(todo))}
                onMoveDown={() => handleMoveDown(todos.indexOf(todo))}
              />
            ))
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-100 border border-blue-300 rounded-lg text-blue-900 text-sm">
          <p>
            <span className="font-semibold">💾 Auto-Save Active:</span> Your tasks save to browser localStorage automatically.
            Come back later, and all your task will still here!
          </p>
          <p className="mt-2 text-xs">
            <span className="font-semibold">Technical Detail:</span> This apply useEffect pattern with dependency [todos].
            Every time todos change → effect run → save to localStorage via JSON.stringify().
            On page reload → mount effect run → load from localStorage via JSON.parse().
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TodoItem Component
// ============================================================================

function TodoItem({
  todo,
  index,
  totalTodos,
  onToggle,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="w-6 h-6 mt-1 cursor-pointer accent-blue-500 rounded"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p
            className={`text-lg font-medium transition ${
              todo.completed
                ? "line-through text-gray-400"
                : "text-gray-900"
            }`}
          >
            {todo.text}
          </p>
          <p className="text-xs text-gray-500 mt-1">Added: {todo.createdAt}</p>
        </div>

        {/* Priority Badge */}
        <Badge color={getPriorityColor(todo.priority)} className="text-xs capitalize">
          {todo.priority}
        </Badge>

        {/* Actions */}
        <div className="flex gap-1 ml-2">
          {/* Move Up */}
          <button
            onClick={onMoveUp}
            disabled={index === 0}
            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            title="Move up"
          >
            <span className="text-lg">⬆️</span>
          </button>

          {/* Move Down */}
          <button
            onClick={onMoveDown}
            disabled={index === totalTodos - 1}
            className="p-2 rounded-lg bg-gray-100 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            title="Move down"
          >
            <span className="text-lg">⬇️</span>
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 transition"
            title="Delete task"
          >
            <span className="text-lg">🗑️</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// StatCard Component
// ============================================================================

function StatCard({ label, count, color }) {
  return (
    <div className={`${color} rounded-lg p-4 text-center`}>
      <p className="text-3xl font-bold">{count}</p>
      <p className="text-sm font-semibold mt-1">{label}</p>
    </div>
  );
}

export default TodoApp;
