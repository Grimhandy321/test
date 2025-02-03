import { useState } from 'react'
import './App.css'
import { Title } from './components/Title'
import { BgColor } from './components/BgColor'
import { UserCard } from './components/UserCard'

function App() {
  const [count, setCount] = useState(0)

  const user1 = {
    name: 'Jan Novák',
    age: 25,
    email: 'jan.novak@example.com',
    isStudent: true,
    address: 'Praha, Česká republika',
    hobbies: ['programování', 'fotbal']
  };

  const user2 = {
    name: 'Anna Dvořáková',
    age: 30,
    email: 'anna.dvorakova@example.com'
  };

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      <Title text="Můj první nadpis" />
      <Title text="Druhý nadpis" color="blue" />
      <Title text="Třetí nadpis" color="green" />
      <UserCard user={user1} />
      <UserCard user={user2} />
      <BgColor />
    </div>
    </>
  )
}

export default App
