import './App.css';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/NavBar/NavBar.js'
import { useState, useEffect } from 'react'
import TestPage from '../TestPage/TestPage';

export default function App() {

  const [data, setData] = useState([])
  const apiKey = '743f398782ef7a29bc5ce48df05749dd'

  useEffect(() => {
    fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&oddsFormat=american&apiKey=${apiKey}`)
    // return fetch("https://www.boredapi.com/api/activity")
      // .then(response => {
      //   const requestsUsed = response.headers.get('x-requests-used');
      //   const requestsRemaining = response.headers.get('x-requests-remaining');
      //   console.log(`Requests used: ${requestsUsed}`);
      //   console.log(`Requests remaining: ${requestsRemaining}`);
      // })
      .then(response => response.json())
      .then(data => setData(data))
  }, []);
  
  const [list, setList] = useState([
    {
      id: '1',
      name: 'hi',
      done: false
    }
  ])

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  
  const handleChange = (evt) => {
    evt.preventDefault()
    setName(evt.target.value)
  }
  
  const handleSubmit = (evt) => {
    evt.preventDefault()
    setId((Math.floor(Math.random()*100000).toString()))
    setList([...list, { id, name, done: false }])
    setName('')
  }

  const handleDelete = (id) => {
    setList(list.filter(todo => todo.id !== id))
  }

  return (
    <main className="App">
      <NavBar />
      <HomePage 
        list={list} 
        name={name}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleDelete={handleDelete}
        data={data}
      />
      <TestPage data={data} />
    </main>
  );
}