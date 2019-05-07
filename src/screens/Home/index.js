import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.css';

import './styles.css';

const Home = props => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState({
    full_name: '',
    profile_picture:
      'https://avatars2.githubusercontent.com/u/7540050?s=460&v=4',
    isPrivate: false
  }); // TODO: Change profile_picture placeholder
  const [loading, setLoading] = useState(false);

  const handleInputChange = event => {
    if (event.target.value.charAt(0) === '@') {
      setUserName(event.target.value);
    } else {
      setUserName(`@${event.target.value}`);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (userName.length <= 1) return;
    setLoading(true);
    const userResponse = await api.post(
      '/graphql',
      {
        query: `
      query {
        user(username:"${userName.substring(1)}"){
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
    setUser(userResponse.data.data.user);
    setLoading(false);
  };

  return (
    <div id="main-container">
      <div id="header">
        <h1>Instagram Giveway</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <img src={user.profile_picture} alt="" />
        <input
          placeholder="@username"
          value={userName}
          onChange={handleInputChange}
        />
        <Button disabled={loading} type="submit">
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Prosseguir'
          )}
        </Button>
      </form>
    </div>
  );
};

export default Home;
