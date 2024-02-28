import { Suspense, useState, lazy } from 'react'

const ComponentA = lazy(async () => import('./ComponentA'))
const ComponentB = lazy(async () => import('./ComponentB'))

import data from './data'

export default function App() {
  const { searchParams } = new URL(window.location.toString())

  const Component =
    searchParams.get('component') === 'versionA' ? ComponentA : ComponentB

  const [increment, setIncrement] = useState(0)
  const [show, setShow] = useState(false)

  return (
    <Suspense>
      <div className='container'>
        <button data-testid='start' onClick={() => setShow(true)}>
          start
        </button>
        <button data-testid='rerender' onClick={() => setIncrement(i => i + 1)}>
          rerender
        </button>
        {show
          ? data.map(value => (
              <Component value={value + increment} key={value} />
            ))
          : null}
      </div>
    </Suspense>
  )
}
