import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import TodoInput from '../components/TodoInput';
import TodoItem from '../components/TodoItem';
import useTodos from '../hooks/useTodos';

export default function DashboardPage() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
        </div>

        <TodoInput onAdd={addTodo} />

        <div className="mt-8 space-y-3">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 py-6">
              No tasks yet. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}