import { Toaster } from 'sonner'
import Router from './router'

import { Header } from './components/header'

function App() {
  return (
    <div className="mx-auto flex max-w-7xl items-center justify-between lg:px-8">
      <Header />
      <Router />
      {/* <Footer /> */}

      <Toaster />
    </div>
  )
}

export default App