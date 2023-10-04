import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  const [counter, setCounter] = useState(0)
  const [message, setMessage] = useState(null)
  const api = "https://kalykebackendv1.yatharthsurana.repl.co/api"
  const counterAddHandler = () => {
    counter < 10 ? setCounter(counter + 1) : setMessage("Cannot add count more than 10")
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }
  const counterRemoveHandler = () => {
    counter > 0 ? setCounter(counter - 1) : setMessage("Cannot substract count less than 0")
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }
  const fetchApiTestHandler = async (api) => {
    try {
      const response = await fetch(api);
      const data = await response.json();
      console.log(data, "response from server")
    } catch (err) {
      console.log("err:", err)
    }
  }
  useEffect(() => {
    fetchApiTestHandler(api)
  }, [])
  return (
    <div>
      <span style={{ display: "block" }}>Counter Value: {counter}</span>
      <p>{message}</p>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button onClick={counterAddHandler}>+</button>
        <button onClick={counterRemoveHandler}>-</button>
      </div>
    </div>
  )
}
