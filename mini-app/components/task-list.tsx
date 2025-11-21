"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newText, setNewText] = useState("");

  const addTask = () => {
    if (!newText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newText, completed: false }]);
    setNewText("");
  };

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTask = (id: number, text: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex space-x-2">
        <Input
          placeholder="New task"
          value={newText}
          onChange={e => setNewText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <input
              type="text"
              value={task.text}
              onChange={e => editTask(task.id, e.target.value)}
              className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}
            />
            <Button variant="outline" size="sm" onClick={() => deleteTask(task.id)}>Del</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
