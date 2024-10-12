import { Toaster } from 'sonner'
import Router from './router'

import { Header } from './components/header'

function App() {
  return (
    <div className="mx-auto flex flex-col max-w-7xl items-center justify-between lg:px-8">
      <Header />
      <div className='w-full mt-6'>
        <Router />
      </div>
      {/* <Footer /> */}

      <Toaster />
    </div>
  )
}

export default App