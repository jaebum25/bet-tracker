import List from "../../components/List/List";

export default function HomePage({ list, handleSubmit, handleChange, name, handleDelete, data }) {

  return (
    <>
      <h1>Bet Tracker!</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          name="name"
          value={name}
          onChange={handleChange} 
        />
        <button>X</button>
      </form>
      <hr/>
      <List 
        list={list}
        handleDelete={handleDelete}
        data={data}
        />
    </>
  )
}
