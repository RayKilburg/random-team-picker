import { useEffect, useState } from 'react'
import './App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STORAGE_KEY = 'team'

interface Team {
  name: string;
  weight: number
}

function App() {
  const [choice, setChoice]  = useState('');
  const [newName, setNewName] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);

  

  useEffect(() => {
    const store = localStorage.getItem(STORAGE_KEY)

    if(store) {
      setTeams(JSON.parse(store))
    } else {
      setTeams([
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
      ])
    }
  }, [])

  useEffect(() => {
    if(!teams.length) return;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(teams))
  }, [teams])

  const handleAddTeam = () => {
    if(!newName) return;
    setTeams([...teams, {name: newName, weight: 0.5}])
    setNewName("");
  }

  const handleRemoveTeam = (name: string) => {
    setTeams(teams.filter(tm => tm.name !== name))
  }

  const handleAdjustWeights = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = Array.from(teams);
    const index = temp.findIndex(tm => tm.name === e.target.name);
    temp[index].weight = e.target.valueAsNumber;
    setTeams(temp)
  }

  

  const calculateRandomChoice = () => {
    const allChoices = teams.map(tm => new Array(Math.round(tm.weight * 20)).fill(tm.name)).flat();
    const randomChoice = allChoices[Math.floor(Math.random() * allChoices.length)];
    setChoice(randomChoice); // Pass the notify function as a callback
  };

  const notify = () => {
    toast(`${choice}`);
  };

  useEffect(() => {
    if (choice !== '') {
      notify(); // Call notify when the choice state changes
    }
  }, [choice]);

  const handleReset = () => {
    setTeams(teams.map(tm => ({...tm, weight: 0.5})))
  }

  const handleSubmitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter" ) {
      handleAddTeam();
    }
  }

  return (
<div className='App'>
    <div className='topRow'>
      <button onClick={handleReset}>Reset Odds</button>
      <button onClick={calculateRandomChoice}>{!choice ? "Get a random choice!" : <span><strong>{choice}. Choose again?</strong></span>}</button>
      <ToastContainer />
    </div>
      

      <div>
        <input onKeyDown={e => handleSubmitOnEnter(e)} value={newName} onChange={e => setNewName(e.target.value)} type="text" />
        <button onClick={handleAddTeam}>Add</button>
      </div>

    {teams.map((tm, i) => (
      <div key={`team-div-${i}`}>
        <label>{tm.name}</label>
        <input onChange={handleAdjustWeights} name={tm.name} type="range" step={0.05} value={tm.weight} max={1} />
        <span className='trash' onClick={() => handleRemoveTeam(tm.name)}>🗑️</span>
      </div>

    ))}

</div>
  )
}

export default App
