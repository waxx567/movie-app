import { useState, useEffect } from 'react'

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`)
  });

  return (
    <div className="card">
      <h2>{title}</h2>

      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? '❤️' : '❤︎'}
      </button>
    </div>
  )
}

const App = () => {

  return (
    <div className="card-container">
      <Card title="Get Shorty" rating={4} isCool={true}/>
      <Card title="Be Cool"/>
      <Card title="Rum Punch"/>
    </div>
  )
}
export default App
