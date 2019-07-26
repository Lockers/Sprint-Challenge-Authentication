import React from 'react';
import Axios from 'axios';
import Styled from 'styled-components';

const MainDiv = Styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  justify-content: center;
  flex-direction: column;
`

const Form = Styled.form`
  display: flex;
  justify-content: center;
`

const Input = Styled.input`
  display: flex;
  width: 40%;
`
const Div = Styled.div`
  display: flex;
  border: 1px solid black;
  background: dodgerblue;
  max-width: 100%;
  height: 5rem;
  width: 80%;
  margin: 10px auto;
`

const Button = Styled.button`
  display: flex;
  width: 5rem;
  border-radius: 25%;
  background: black;
  color: white;
  margin: 0 auto;
`

const GetJokesButton = Styled(Button)`
  margin: 1rem auto;
  padding: 2rem;
  justify-content: center;
  text-align: center;
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

  getJokes = (token) => {

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
      <MainDiv>
        <Form onSubmit={this.eventHandler}>
          <Input
            type='text'
            name='username'
          />
          <Input
            type='text'
            name='password'
          />
          <Button>Register</Button>
        </Form>
        <Form onSubmit={this.eventHandler1}>
          <Input
            type='text'
            name='username'
          />
          <Input
            type='text'
            name='password'
          />
          <Button>Login</Button>
        </Form>
        <GetJokesButton onClick={() => this.getJokes(this.state.token)}>Get Dad Jokes</GetJokesButton>
        {this.state.jokes.map(joke => {

          return <Div><p>Dad Joke: {joke.joke}</p></Div>
        })}
      </MainDiv>
    );
  }
}

export default App;