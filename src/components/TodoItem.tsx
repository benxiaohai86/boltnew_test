import React, { useState } from 'react';
import { Check, Pencil, Trash2, X } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="group flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm transition-all hover:shadow-md">
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-emerald-500 border-emerald-500'
            : 'border-gray-300 hover:border-emerald-500'
        }`}
      >
        {todo.completed && <Check className="w-4 h-4 text-white" />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
          <button
            onClick={handleSubmit}
            className="p-1 text-emerald-600 hover:text-emerald-700"
          >
            <Check className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditText(todo.text);
            }}
            className="p-1 text-gray-600 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 text-gray-800 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.text}
          </span>
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-600 hover:text-gray-700"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="p-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}