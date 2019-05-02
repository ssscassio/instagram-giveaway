import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css';

const Home = props => {
  const [userName, setUserName] = useState('');

  const handleInputChange = event => {
    setUserName(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const user = await api.post(
      '/graphql',
      {
        query: `
      query {
        user(username:"${userName}"){
          full_name
          profile_picture
          isPrivate
        }
      }`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const feed = await api.post(
      '/graphql',
      {
        query: `
        query {
          feed(username:'${userName}') {
            id
          }
        }
      `
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log(feed);
    console.log(user);
  };

  return (
    <div id="main-container">
      <div id="header">
        <h1>Instagram Giveway</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <img
          src={'https://avatars2.githubusercontent.com/u/7540050?s=460&v=4'}
          alt=""
        />
        <input
          placeholder="@meuinstagram"
          value={userName}
          onChange={handleInputChange}
        />
        <button type="submit">Prosseguir</button>
      </form>
    </div>
  );
};

export default Home;
