import React from 'react';
import { TodoProps } from '../services/todo-service';
import styled from '@emotion/styled';

const TodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
`;

interface TodoItemProps extends TodoProps {
  toggleTodo: () => void;
  deleteTodo: () => void;
}

export function TodoItem({
  id,
  content,
  done,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  return (
    <TodoItemWrapper>
      <input
        id={id.toString()}
        type="checkbox"
        checked={done}
        onChange={toggleTodo}
      />
      <label htmlFor={id.toString()}>{content}</label>
      <button onClick={deleteTodo}>삭제</button>
    </TodoItemWrapper>
  );
}
