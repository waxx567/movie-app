import { useState } from 'react'

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  
  return (
    <div className="card">
      <h2>{title}</h2>

      <button onClick={() => setHasLiked(true)}>
        Like
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
