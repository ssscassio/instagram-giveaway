import React, { Component } from 'react';
import './styles.css';

class Home extends Component {
  state = {
    userName: ''
  };

  handleInputChange = event => {
    this.setState({
      userName: event.target.value
    });
  };

  // TODO: Remover URI fixa
  render() {
    const { userName } = this.state;
    return (
      <div id="main-container">
        <form onSubmit={this.handleSubmit}>
          <img
            src={'https://avatars2.githubusercontent.com/u/7540050?s=460&v=4'}
            alt=""
          />
          <input
            placeholder="@meuinstagram"
            value={userName}
            onChange={this.handleInputChange}
          />
          <button type="submit">Prosseguir</button>
        </form>
      </div>
    );
  }
}

export default Home;
