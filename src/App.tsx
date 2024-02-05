import { useState } from 'react'
import DEMO from './pages/demo'
import './App.css'

function App() {
  const [env] = useState(process.env.NODE_ENV)

  return (
    <>
      {env}

      <div>
        'VITE_APP_URL': {import.meta.env.VITE_APP_URL}
      </div>
      
      <DEMO />
    </>
  )
}

export default App
