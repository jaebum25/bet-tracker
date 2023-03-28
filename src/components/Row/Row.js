import React from 'react'

export default function Row({ todo, handleDelete, data }) {
  return (
    <tbody>
      <tr>
        <td>
          <hr/>
          bookmaker:
          <br/>
          {data.home_team}
          <br/>
          v.
          <br/>
          {data.away_team}
        </td>
        <td>
          <hr/>
          {data.bookmakers[0].title}
          <br/>
          {data.bookmakers[0].markets[0].outcomes[0].price}
          <br/>
          v.
          <br/>
          {data.bookmakers[0].markets[0].outcomes[1].price}
        </td>
        <td>
          <hr/>
          {data.bookmakers[1].title}
          <br/>
          {data.bookmakers[1].markets[0].outcomes[0].price}
          <br/>
          v.
          <br/>
          {data.bookmakers[1].markets[0].outcomes[1].price}
        </td>
        <td>
          {
            data.forEach((bookmaker, index) => {
              data.push(
                <div key={index}>
                  <div>hello: {data.bookmakers} </div>
                </div>
              )
            })
          }
        </td>
        <td>
          <button onClick={() => handleDelete(todo.id)}>X</button>
        </td>
      </tr>
    </tbody>
  )
  
}