import './index.css'

const LettersList = props => {
  const {letter, isActive} = props

  const activeLetter = isActive ? 'color' : ''

  return (
    <li className="list-item">
      <p className={`letter-para ${activeLetter}`}>{letter.letter}</p>
    </li>
  )
}
export default LettersList
