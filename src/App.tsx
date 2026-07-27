import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectAuthor, setSelectAuthor] = useState('0');
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);
  const [todos, setTodos] = useState(todosFromServer);

  function getUserId() {
    const us = usersFromServer.find(user => {
      return user.name === selectAuthor;
    });

    return us ? us.id : 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      setTodos([
        ...todos,
        {
          id: todos.length,
          title: inputTitle,
          completed: true,
          userId: getUserId(),
        },
      ]);

      // limpar
      setInputTitle('');
      setSelectAuthor('0');
    }
  }

  function getUser(todo: Todo) {
    const userList = usersFromServer.find(user => {
      return user.id === todo.userId;
    });

    return userList;
  }

  interface Todo {
    userId: number;
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

      <section className="TodoList">
        {todos.map(todo => {
          return (
            <article
              key={todo.id}
              data-id={todo.id}
              className="TodoInfo TodoInfo--completed"
            >
              <h2 className="TodoInfo__title">{todo.title}</h2>

              <a className="UserInfo" href="mailto:Sincere@april.biz">
                {getUser(todo)?.name}
              </a>
            </article>
          );
        })}
      </section>
    </div>
  );
};
