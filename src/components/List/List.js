import React from 'react'
import Row from '../Row/Row'
// import Row from '../Row/Row'

export default function List({ list, handleDelete, data }) {

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Game</th>
            {/* <th>{data[0].bookmakers[0].title}</th>
            <th>{data[0].bookmakers[1].title}</th>
            <th>{data[0].bookmakers[2].title}</th>
            <th>{data[0].bookmakers[4].title}</th> */}
            {/* <th>{data[0].home_team}</th> */}
          </tr>
        </thead>
        {/* for every element(todo) in list, give me Row element */}
        {/* {data?.map(data => (
          <div key={data.id}>
            <hr/>
            {data.home_team} {data.bookmakers[0].markets[0].outcomes[0].price}
            <br/>
            v.
            <br/>
            {data.away_team} {data.bookmakers[0].markets[0].outcomes[1].price}
          </div>
        ))} */}
        {data.map(data => 
          <Row
            key={data.id}
            data={data}
          />)}
        
        {/* {list.map(todo => 
          <Row 
            todo={todo}
            key={todo.id}
            handleDelete={handleDelete}
            data={data}
          />)} */}
        {/* mapping list 1 level up, access to each todo as I map out each Row */}
      </table>
    </>
  )
}
