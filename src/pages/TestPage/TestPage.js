import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function TestPage({ data }) {
  const [odds, setOdds] = useState([])
  
  const apiKey = '743f398782ef7a29bc5ce48df05749dd'

  // useEffect(() => {
  //   // fetch('https://jsonplaceholder.typicode.com/users')
  //   // fetch(`https://api.allorigins.win/raw?url=https://mma-api-production-1e44.up.railway.app/api/fighters/Conor-McGregor`)
  //   // fetch(`https://api.the-odds-api.com/v4/sports/?apiKey=${}`)
  //   axios.get(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&oddsFormat=american&apiKey=${}`)
  //   // .then(response => response.json())
  //   // .then(res => console.log(res.data))
  //   // .then(data => setOdds(data))
  //   .then(res => {
  //     setOdds(res.data)
  //     console.log(res.data)
  //   })
  //   .catch(err => console.log(err))
  // }, [])

  fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&oddsFormat=american&apiKey=${apiKey}`)
  .then(response => {
    const requestsUsed = response.headers.get('x-requests-used');
    const requestsRemaining = response.headers.get('x-requests-remaining');
    console.log(`Requests used: ${requestsUsed}`);
    console.log(`Requests remaining: ${requestsRemaining}`);
    return response.json();
  })
  // .then(data => {
    // Process the response data
  // });

  // const myObject = {
  //   firstNestedObject: {values: [1, 2, 3]},
  //   secondNestedObject: {values: [4, 5, 6]},
  //   thirdNestedObject: {values: [7, 10, 11, 12]}
  // };

  const prices = data.flatMap((item) => {
    return item.bookmakers.flatMap((bookmaker) => {
      return bookmaker.markets.flatMap((market) => {
        return market.outcomes.map((outcome) => {
          return {
            name: outcome.name,
            price: outcome.price,
            app: bookmaker.title,
            type: market.key,
            home: item.home_team,
            away: item.away_team,
            spread: outcome.point,
            title: bookmaker.title
          }
          // .sort((a, b) => b.outcome.price - a.outcome.price);
        });
      });
    });
  });

  const sortedPrices = prices.sort((a, b) => b.price - a.price);
  
  console.log(sortedPrices);

  const mappedPricesH2hHome = sortedPrices
    .filter((item) => 
      item.type === "h2h")
    .filter((item) => 
      item.name === item.home)
    .filter((bookmaker) => 
      bookmaker.title === "Bet365" || 
      bookmaker.title === "BetMGM" ||
      bookmaker.title === "BetRivers" ||
      bookmaker.title === "Caesars" ||
      bookmaker.title === "DraftKings" ||
      bookmaker.title === "FanDuel" ||
      bookmaker.title === "PointsBet (US)"
    )
    .map((item, index) => {
    return <tr key={index}>
      <th>{item.type}</th>
      <td>{item.name}</td>
      <td>{item.app}</td>
      <th>{item.price}</th>
    </tr>;
  });

  const mappedPricesH2hAway = sortedPrices
    .filter((item) => 
    item.type === "h2h")
    .filter((item) => 
    item.name === item.away)
    .filter((bookmaker) => 
      bookmaker.title === "Bet365" || 
      bookmaker.title === "BetMGM" ||
      bookmaker.title === "BetRivers" ||
      bookmaker.title === "Caesars" ||
      bookmaker.title === "DraftKings" ||
      bookmaker.title === "FanDuel" ||
      bookmaker.title === "PointsBet (US)"
    )
    .map((item, index) => {
    return <tr key={index}>
      <th>{item.price}</th>
      <td>{item.app}</td>
      <td>{item.name}</td>
      <th>{item.type}</th>
    </tr>;
  });

  const mappedPricesAtsHome = sortedPrices
    .filter((item) => 
    item.type === "spreads")
    .filter((item) => 
    item.name === item.home)
    .filter((bookmaker) => 
      bookmaker.title === "Bet365" || 
      bookmaker.title === "BetMGM" ||
      bookmaker.title === "BetRivers" ||
      bookmaker.title === "Caesars" ||
      bookmaker.title === "DraftKings" ||
      bookmaker.title === "FanDuel" ||
      bookmaker.title === "PointsBet (US)"
    )
    .map((item, index) => {
    return <tr key={index}>
      <th>{item.type}</th>
      <td>{item.name}</td>
      <td>{item.app}</td>
      <td>{item.spread}</td>
      <th>{item.price}</th>
    </tr>; 
  });

  const mappedPricesAtsAway = sortedPrices
    .filter((item) => 
    item.type === "spreads")
    .filter((item) => 
    item.name === item.away)
    .filter((bookmaker) => 
      bookmaker.title === "Bet365" || 
      bookmaker.title === "BetMGM" ||
      bookmaker.title === "BetRivers" ||
      bookmaker.title === "Caesars" ||
      bookmaker.title === "DraftKings" ||
      bookmaker.title === "FanDuel" ||
      bookmaker.title === "PointsBet (US)"
    )
    .map((item, index) => {
      return <tr key={index}>
      <th>{item.price}</th>
      <td>{item.spread}</td>
      <td>{item.app}</td>
      <td>{item.name}</td>
      <th>{item.type}</th>
    </tr>; 
  });

  console.log(data)

  return (
    <>
      <div>H2H</div>
      <table>
        {data.map((item) => (
          <tbody key={item.id}>
            <hr/>
            {item.home_team} vs. {item.away_team}
            <br/>
            <hr/>
            {item.bookmakers
            .filter((bookmaker) => 
            bookmaker.title === "Bet365" || 
            bookmaker.title === "BetMGM" ||
            bookmaker.title === "BetRivers" ||
            bookmaker.title === "Caesars" ||
            bookmaker.title === "DraftKings" ||
            bookmaker.title === "PointsBet (US)" ||
            bookmaker.title === "FanDuel"
            )
            .map((bookmaker) => (
              <tr key={bookmaker.id}>
                {bookmaker.markets
                .filter((market) => (
                  market.key === "h2h"
                ))
                .map((market) => (
                  market.outcomes
                  .map((outcome) => (
                    <td key={outcome.id}>
                      {bookmaker.title} {outcome.price} {outcome.name}
                    </td>
                  ))
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <h1>break</h1>
      <div>Spread</div>
      <table>
        {data.map((item) => (
          <tbody key={item.id}>
            <hr/>
            {item.home_team} vs. {item.away_team}
            <br/>
            <hr/>
            {item.bookmakers
            .filter((bookmaker) => 
            bookmaker.title === "Bet365" || 
            bookmaker.title === "BetMGM" ||
            bookmaker.title === "BetRivers" ||
            bookmaker.title === "Caesars" ||
            bookmaker.title === "DraftKings" ||
            bookmaker.title === "PointsBet (US)" ||
            bookmaker.title === "FanDuel"
            )
            .map((bookmaker) => (
              <tr key={bookmaker.id}>
                {bookmaker.markets
                .filter((market) => (
                  market.key === "spreads"
                ))
                .map((market) => (
                  market.outcomes
                  .map((outcome) => (
                    <td key={outcome.id}>
                      {bookmaker.title} {outcome.price} {outcome.point} {outcome.name}
                    </td>
                  ))
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <h1>break</h1>
      <table>
        <tbody>
          <th>
            {mappedPricesH2hHome}
          </th>
          <th>
            {mappedPricesH2hAway}
          </th>
        </tbody>
      </table>
      <hr/>
      <table>
        <tbody>
          <th>
            {mappedPricesAtsHome}
          </th>
          <th>
            {mappedPricesAtsAway}
          </th>
        </tbody>
      </table>
      {/* <div>
        hi
      </div>
      <div>
        {Object.keys(myObject).map((key) => {
          const nestedObject = myObject[key];
          return (
            <div key={key}>
              <p>{key}</p>
              {nestedObject.values.map((value, index) => (
                <p key={index}>{value}</p>
              ))}
            </div>
          );
        })}
      </div>
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
      </ul> */}
    </>
  )
}
