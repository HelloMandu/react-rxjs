import React, { useEffect, useMemo, useState } from 'react';
import { TodoList } from './todo';
import { TodoProps, TodoServiceController } from './services/todo-service';
import { Subscription } from 'rxjs';

function App() {
  const [todoList, setTodoList] = useState<TodoProps[]>([]);
  const [todoList2, setTodoList2] = useState<TodoProps[]>([]);
  const todoService = useMemo(() => TodoServiceController.getInstance(), []);
  const newTodoService = useMemo(() => new TodoServiceController(), []);

  useEffect(() => {
    const todoSubscriber: Subscription = todoService.todoData$.subscribe(
      (todoData) => {
        console.log('update1');
        setTodoList(todoData);
      }
    );
    return () => todoSubscriber.unsubscribe();
  }, [todoService.todoData$]);
  useEffect(() => {
    const todoSubscriber: Subscription = newTodoService.todoData$.subscribe(
      (todoData) => {
        console.log('update new');
        setTodoList2(todoData);
      }
    );
    return () => todoSubscriber.unsubscribe();
  }, [newTodoService.todoData$]);
  return (
    <>
      <TodoList todoList={todoList} />
      <TodoList todoList={todoList2} />
    </>
  );
}

export default App;
