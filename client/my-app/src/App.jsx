import { useState } from 'react'
import './App.css'
import ProductFetcher from './components/ProductFetcher'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <ProductFetcher />
      </div>
    </>
  )
}

export default App
