import  { useState, useEffect } from 'react'

import Bells from "../../assets/music/342650__dishonoredblood__31516-peaceful-melody.mp3";
import water from "../../assets/music/footsteps-in-water-nature-sounds-8185.mp3";

import './style.css'

const Sounds = () => {
  const [track, setTrack] = useState(Bells)
  

  const tracks = {
    "bells sounds": Bells,
    "water sounds":water
    
  }

  const music = new Audio(track)
  music.loop = true

  useEffect(() => {new Audio(track)
  },[track])

  const playTrack = () => {
    
    music.play()

  }

  const pauseTrack = () => {
    
    music.pause()

  }

  return (
    <div className='music-container'>
      <div className='form-container'>
        <label className='form-label'> Relaxing Sounds :
          <select
            value={track}
            onChange={e => setTrack(e.target.value)}
            > {Object.entries(tracks).map(([name, value]) =>(
              <option key={`${name}`} value={value}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className='button-container'>
        <button className='pink-btn subjects' onClick={playTrack}>Play</button>
        <button className='pink-btn subjects' onClick={pauseTrack}>Pause</button>
      </div>
    </div>
  )
}

export default Sounds
