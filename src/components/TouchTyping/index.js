import {useState} from 'react'
import './index.css'

import LettersList from '../Letterslist'

const lettersArray = [
  {id: 1, letter: 'A'},
  {id: 2, letter: 'S'},
  {id: 3, letter: 'D'},
  {id: 4, letter: 'F'},
  {id: 5, letter: 'J'},
  {id: 6, letter: 'K'},
  {id: 7, letter: 'L'},
]

const words = [
  'A S D F J K L',
  'S A D F L K J',
  'D S A F L K J',
  'F D L K S A J',
  'J S A D F K L',
  'K J L S A D F',
  'L F D S A K J',
]

const TouchTyping = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [typedWord, setTypedWord] = useState('')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [activeLetter, setActiveLetter] = useState(null)

  const onActiveKey = event => {
    console.log(event.key.toUpperCase())
    setActiveLetter(event.key.toUpperCase())
  }

  const handleInputChange = event => {
    setTypedWord(event.target.value.toUpperCase())

    if (currentWordIndex === 0 && !startTime) {
      setStartTime(new Date())
    }

    if (event.target.value.toUpperCase() === words[currentWordIndex]) {
      if (currentWordIndex === words.length - 1) {
        setEndTime(new Date())
      } else {
        setCurrentWordIndex(currentWordIndex + 1)
        setTypedWord('')
        setActiveLetter('')
      }
    }
  }

  const calculateAccuracy = () => {
    let correctCharacters = 0
    for (let i = 0; i < typedWord.length; i += 1) {
      if (typedWord[i] === words[currentWordIndex][i]) {
        correctCharacters += 1
      }
    }
    return (correctCharacters / typedWord.length) * 100
  }

  const calculateSpeed = () => {
    const minutes = (endTime - startTime) / 60000
    const wordsPerMinute = words.length / minutes
    return Math.round(wordsPerMinute)
  }

  return (
    <div className="main-container">
      <h1 className="heading">Typing App</h1>
      <h1 className="display-text">{words[currentWordIndex]}</h1>
      <input
        type="text"
        className="input-element"
        onChange={handleInputChange}
        onKeyDown={onActiveKey}
        value={typedWord}
        placeholder=" Please type  letters"
      />
      <ul className="letters-list">
        {lettersArray.map(eachLet => (
          <LettersList
            key={eachLet.id}
            letter={eachLet}
            isActive={activeLetter === eachLet.letter}
          />
        ))}
      </ul>
      {endTime && (
        <div>
          <p className="accuracy">Accuracy: {calculateAccuracy()}%</p>
          <p className="speed">Speed: {calculateSpeed()} words per minute</p>
        </div>
      )}
    </div>
  )
}

export default TouchTyping
