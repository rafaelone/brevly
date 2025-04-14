import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from './pages/home'
import { NotFound } from './pages/notFound'
import { Redirect } from './pages/redirect'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:short_url" element={<Redirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
