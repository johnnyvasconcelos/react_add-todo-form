import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectAuthor, setSelectAuthor] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const initialTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => {
      return u.id === todo.userId;
    });

    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      user: user || null,
    };
  });
  const [todos, setTodos] = useState(initialTodos);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = usersFromServer.find(u => {
      return u.name === selectAuthor;
    });

    if (inputTitle.length === 0 && selectAuthor === '0') {
      setTitleError(true);
      setSelectError(true);
    } else if (selectAuthor === '0') {
      setSelectError(true);
      setTitleError(false);
    } else if (inputTitle.length === 0) {
      setTitleError(true);
      setSelectError(false);
    } else {
      setTitleError(false);
      setSelectError(false);
      // enviar formulário abaixo
      if (!user || !user.id) {
        return;
      }

      setTodos([
        ...todos,
        {
          id: Math.max(...todos.map(t => t.id), 0) + 1,
          title: inputTitle,
          completed: false,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
          },
        },
      ]);

      // limpar
      setInputTitle('');
      setSelectAuthor('0');
    }
  }

  interface User {
    id: number;
    name: string;
    username: string;
    email: string;
  }

  interface Todo {
    id: number;
    title: string;
    completed: boolean;
    user: User | null;
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            defaultValue={inputTitle}
            onChange={event => {
              setInputTitle(event.target.value);
              setTitleError(false);
              setSelectError(false);
            }}
          />
          <span className="error">
            {titleError ? 'Please enter a title' : ''}
          </span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={event => {
              setSelectAuthor(event.target.value);
              setTitleError(false);
              setSelectError(false);
            }}
          >
            <option value="0" selected>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              );
            })}
          </select>

          <span className="error">
            {selectError ? 'Please choose an user' : ''}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
