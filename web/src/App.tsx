import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

import { Home } from './pages/home'
import { NotFound } from './pages/notFound'
import { Redirect } from './pages/redirect'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:short_url" element={<Redirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
