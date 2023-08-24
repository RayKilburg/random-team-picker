import { useState } from 'react'
import './App.css'

function App() {
  const [choice, setChoice]  = useState('');
  const [teams, setTeams] = useState([
    {name: "Team 1", weight: 0.5},
    {name: "Team 2", weight: 0.5},
    {name: "Team 3", weight: 0.5},
    {name: "Team 4", weight: 0.5},
    {name: "Team 5", weight: 0.5},
    {name: "Team 6", weight: 0.5},
    {name: "Team 7", weight: 0.5},
    {name: "Team 8", weight: 0.5},
    {name: "Team 9", weight: 0.5},
    {name: "Team 10", weight: 0.5},
    {name: "Team 11", weight: 0.5},
    {name: "Team 12", weight: 0.5},
  ]);

  const handleAdjustWeights = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = Array.from(teams);
    const index = temp.findIndex(tm => tm.name === e.target.name);
    temp[index].weight = e.target.valueAsNumber;
    setTeams(temp)
  }

  const calculateRandomChoice = () => {
    const allChoices = teams.map(tm => new Array(Math.round(tm.weight * 20)).fill(tm.name)).flat()
    const randomChoice = allChoices[Math.floor(Math.random() * allChoices.length)]
    setChoice(randomChoice);
  }

  const handleReset = () => {
    setTeams(teams.map(tm => ({...tm, weight: 0.5})))
  }

  return (
<div className='App'>
    <div>
      <button onClick={handleReset}>Reset Odds</button>
      <button onClick={calculateRandomChoice}>{!choice ? "Get a random choice!" : <span><strong>{choice}. Choose again?</strong></span>}</button>
      </div>

    {teams.map((tm, i) => (
      <div key={`team-div-${i}`}>
        <label>{tm.name}</label>
        <input onChange={handleAdjustWeights} name={tm.name} type="range" step={0.05} value={tm.weight} max={1} />
      </div>

    ))}

</div>
  )
}

export default App
