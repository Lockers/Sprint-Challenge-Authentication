import React from 'react';
import Axios from 'axios';
import Styled from 'styled-components';


const Div = Styled.div`
  display: flex;
  border: 1px solid black;
  background: dodgerblue;
  max-width: 800px;
  height: 100px;
  margin: 10px auto;
`
// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  state = {
    token: '',
    jokes: []
  };

  register = (newUser) => {
    Axios
      .post('http://localhost:3301/api/register', newUser)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  eventHandler = (event) => {
    event.preventDefault()
    const username = event.target['username'].value
    const password = event.target['password'].value

    const newUser = {
      username: username,
      password: password
    }
    this.register(newUser)
  }

  login = (user) => {
    Axios
      .post('http://localhost:3301/api/login', user)
      .then(response => {
        // console.log(response.data)
        this.setState({ token: response.data.Token })
        console.log(this.state.token)
      })
      .catch(error => {
        console.log(error)
      })
  }

  eventHandler1 = (event) => {
    event.preventDefault()
    const username = event.target['username'].value
    const password = event.target['password'].value

    const user = {
      username: username,
      password: password
    }
    this.login(user)
  }

  getUsers = (token) => {

    Axios.defaults.headers.common['Authorization'] = token;
    Axios
      .get('http://localhost:3301/api/jokes')
      .then(response => {
        this.setState({ jokes: response.data })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.eventHandler}>
          <input
            type='text'
            name='username'
          />
          <input
            type='text'
            name='password'
          />
          <button>Register</button>
        </form>
        <form onSubmit={this.eventHandler1}>
          <input
            type='text'
            name='username'
          />
          <input
            type='text'
            name='password'
          />
          <button>Login</button>
        </form>
        <button onClick={() => this.getUsers(this.state.token)}>Get Users</button>
        {this.state.jokes.map(user => {

          return <Div><p>Joke: {user.joke}</p></Div>
        })}
      </div>
    );
  }
}

export default App;