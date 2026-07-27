import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
// import todosFromServer from './api/todos';

export const App = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [selectAuthor, setSelectAuthor] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputTitle.length === 0 && selectAuthor === 0) {
      setTitleError(true);
      setSelectError(true);
    } else if (selectAuthor === 0) {
      setSelectError(true);
      setTitleError(false);
    } else if (inputTitle.length === 0) {
      setTitleError(true);
      setSelectError(false);
    } else {
      setTitleError(false);
      setSelectError(false);
      // enviar formulário
    }
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
              setSelectAuthor(+event.target.value);
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
        <article data-id="1" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="15" className="TodoInfo TodoInfo--completed">
          <h2 className="TodoInfo__title">delectus aut autem</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            Leanne Graham
          </a>
        </article>

        <article data-id="2" className="TodoInfo">
          <h2 className="TodoInfo__title">
            quis ut nam facilis et officia qui
          </h2>

          <a className="UserInfo" href="mailto:Julianne.OConner@kory.org">
            Patricia Lebsack
          </a>
        </article>
      </section>
    </div>
  );
};
