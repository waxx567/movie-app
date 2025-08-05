const Card = ({ title }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
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
