import ComponentA from './ComponentA'
import data from './data'

export default function App() {
  return (
    <div className='container'>
      {data.map(value => (
        <ComponentA value={value} key={value} />
      ))}
    </div>
  )
}
