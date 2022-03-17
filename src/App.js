import axios from "axios"
import { useEffect, useState } from "react"
import Select from "react-select"
import data from './teams.json'
import "./styles.scss"

export default function App() {
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [result, setResult] = useState(null)


  async function submitMatchup() {
    if (!team1 || !team2 || !team1.value || !team2.value) {
      alert("Please choose 2 teams to matctup.")
      return }
    
    let res = await axios({
      url: "https://fantasy.espncdn.com/tournament-challenge-bracket/2022/en/api/v4/matchupPreview",
      method: "GET",
      params: {
        cb: "110",
        team1ID: team1.value,
        team2ID: team2.value
      }
    });

    if (res.status !== 200) {
      setTeam1(null)
      setTeam2(null)
      setResult(null)
      return
    }

    console.log(res.data)
    setResult(res.data)
  }

  

  return (
    <div className="App">
      <h1 style={{ margin: '0 0 24px', textAlign: 'center' }}>Matchup Generator</h1>

      <div className="matchup-input">
        <div className="team-choice">
          <div className="team">
            <h2>Team 1</h2>
            <Select className="react-select-container"
              classNamePrefix="react-select"
              isClearable="true"
              options={data.teams.filter(item => item !== team2)}
              onChange={(c) => { setTeam1(c) }} />
          </div>
            
          <hr />

          <div className="team">
            <h2>Team 2</h2>
            <Select className="react-select-container"
              classNamePrefix="react-select"
              isClearable="true"
              options={data.teams.filter(item => item !== team1)}
              onChange={(c) => { setTeam2(c) }} />
          </div>

          <button onClick={async () => { submitMatchup() }}>
            Submit</button>

          {result && team1 && team2 ? (
            <>
              <hr />
              <div className="results">
                <div className="team-names">
                  <h2>{team1.label}</h2>
                  <h2 className="r">{team2.label}</h2>
                </div>
                <div className="weights">
                  <div className="weight">
                    <h3 className={`${parseInt(result.premium.model1) > 50 ? 'g' : ''}`}>
                        {result.premium.model1}%</h3>
                    <h3>Decision Tree</h3>
                    <h3 className={`${(100 - parseInt(result.premium.model1)) > 50 ? 'g' : ''}`}>
                      {100 - parseInt(result.premium.model1)}%</h3>
                  </div>

                  <div className="weight">
                    <h3 className={`${parseInt(result.premium.model4) > 50 ? 'g' : ''}`}>
                        {result.premium.model4}%</h3>
                    <h3>Seed Comparison</h3>
                    <h3 className={`${(100 - parseInt(result.premium.model4)) > 50 ? 'g' : ''}`}>
                      {100 - parseInt(result.premium.model4)}%</h3>
                  </div>

                  <div className="weight">
                    <h3 className={`${parseInt(result.premium.model2) > 50 ? 'g' : ''}`}>
                        {result.premium.model2}%</h3>
                    <h3>Power Rating</h3>
                    <h3 className={`${(100 - parseInt(result.premium.model2)) > 50 ? 'g' : ''}`}>
                      {100 - parseInt(result.premium.model2)}%</h3>
                  </div>

                  <div className="weight">
                    <h3 className={`${parseInt(result.premium.model3) > 50 ? 'g' : ''}`}>
                        {result.premium.model3}%</h3>
                    <h3>Similar Games</h3>
                    <h3 className={`${(100 - parseInt(result.premium.model3)) > 50 ? 'g' : ''}`}>
                      {100 - parseInt(result.premium.model3)}%</h3>
                  </div>
                </div>
              </div>
            </>
            ) : null}
        </div>
      </div>
    </div>
  );
}
