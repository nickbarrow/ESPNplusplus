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
      <div className="header">
        <div className="logo-bg">
          <div className="logo">
            <svg height="138.6pt" width="555.23pt" viewBox="0 0 555.23395 138.60228">
              <path d="m226.33 1.6855c-25.76-0.0341-42.82 13.544-45.22 33.848-0.89 7.47-1.73 14.071-1.73 14.071h335.17s0.63-4.946 1.12-8.916c2.52-20.454-6.17-39-37.78-39v0.0024s-237.98 0.0091-251.56-0.0059zm-204.55 0.0059l-5.883 47.914h152l5.86-47.914-151.98 0.0004zm510.23 0l-5.87 47.914h164.78s0.2-1.733 0.93-7.373c4.01-31.45-16.28-40.541-35.87-40.541l-123.97 0.0004zm-8.14 66.157l-12.84 104.57 56.85-0.02 12.85-104.53-56.86-0.022zm108 0l-12.86 104.57 56.85-0.02 12.85-104.53-56.84-0.022zm-618.19 0.015l-12.862 104.56h151.99l5.6-45.36-95.173-0.01 2.408-19.56h95.135l4.87-39.627h-151.96zm163.47 0c-4.17 27.29 9.49 39.627 28.85 39.627 10.53 0 76.9-0.03 76.9-0.03l-2.4 19.59-110.61 0.01-5.57 45.36s120.42 0.04 125.3 0c4.03-0.29 32.2-1.06 41.79-24.1 3.11-7.48 5.86-34.3 6.63-39.93 4.43-32.7-18.21-40.497-36.04-40.497-9.83 0-105.44-0.03-124.85-0.03zm176.94 0l-12.84 104.56h56.82l8-64.93h71.37c20.24 0 31.12-10.882 33.14-25.496 1.02-7.373 1.75-14.131 1.75-14.131h-158.24z" transform="scale(.8)" fill="#ef4135"/>
            </svg>
            <span>++</span>
          </div>
        </div>

        <h2>Matchup Generator</h2>
      </div>


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

      <div className="credits">
        <a href="https://github.com/nickbarrow/ESPNplusplus">Made with 🌽 in Indiana</a>
      </div>
    </div>
  );
}
