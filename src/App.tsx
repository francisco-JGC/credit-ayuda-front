import { Toaster } from 'sonner'
import Router from './router'
import { Header } from './components/header'
import { useLocation } from 'react-router-dom'

function App() {
  const location = useLocation()

  return (
    <div className="mx-auto flex flex-col max-w-7xl items-center justify-between lg:px-8">
      {location.pathname !== '/login' && <Header />}

      <div className='w-full mt-6'>
        <Router />
      </div>

      <Toaster />
    </div>
  )
}

export default App
