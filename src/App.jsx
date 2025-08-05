const Card = ({ title }) => {
  return (
    <h2>{title}</h2>
  )
}

const App = () => {

  return (
    <div>
      <h2>App</h2>

      <Card title="One"/>

      <Card title="Two"/>

      <Card title="Three"/>

    </div>
  )
}
export default App
