import React, { useState } from 'react';
import { TodoProps, TodoServiceController } from '../services/todo-service';
import { TodoItem } from './todo-item';

interface TodoListProps {
  todoList: TodoProps[];
}

export function TodoList({ todoList }: TodoListProps) {
  const [newTodo, setNewTodo] = useState<string>('');
  const todoService = TodoServiceController.getInstance();
  return (
    <>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button
        onClick={() => {
          todoService.addTodo(newTodo);
          setNewTodo('');
        }}
      >
        추가
      </button>
      {todoList.map((todo) => {
        const { id, content, done } = todo;
        return (
          <TodoItem
            key={todo.id}
            id={id}
            content={content}
            done={done}
            toggleTodo={() => todoService.toggleTodo(todo.id)}
            deleteTodo={() => todoService.deleteTodo(todo.id)}
          />
        );
      })}
    </>
  );
}
