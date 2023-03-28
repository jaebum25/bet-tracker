import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function TestPage() {
  const [odds, setOdds] = useState([])
  
  const apiKey = '743f398782ef7a29bc5ce48df05749dd'

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/users')
    // fetch(`https://api.allorigins.win/raw?url=https://mma-api-production-1e44.up.railway.app/api/fighters/Conor-McGregor`)
    // fetch(`https://api.the-odds-api.com/v4/sports/?apiKey=${apiKey}`)
    axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&oddsFormat=american&apiKey=${apiKey}`)
    // .then(response => response.json())
    // .then(res => console.log(res.data))
    // .then(data => setOdds(data))
    .then(res => {
      setOdds(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div>TestPage</div>
      <ul>
        {odds?.map(odd => (
          <li key={odd.id}>
            <hr/>
            {odd.home_team} {odd.bookmakers[0].markets[0].outcomes[0].price}
            <br/>
            v.
            <br/>
            {odd.away_team} {odd.bookmakers[0].markets[0].outcomes[1].price}
          </li>
        ))}
      </ul>
    </>
    
  )
}
