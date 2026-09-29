import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage from './pages/auth'
import Dashboard from './pages/dashboard'
import BiblePage from './pages/bible'
import ProtectedLayout from './layouts/ProtectedLayout'
import PublicLayout from './layouts/PublicLayout'
import TimelinePage from './pages/timeline'
import ProfilePage from './pages/profile'
import BibleReaderPage from './pages/bible-reader'
import FlashContext from '@/context/FlashContext'

function App() {
  return (
    <BrowserRouter>
      <FlashContext />
      <Routes>
        <Route
          path="/auth"
          element={
            <PublicLayout>
              <AuthPage />
            </PublicLayout>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />

        <Route
          path="/timeline"
          element={
            <ProtectedLayout>
              <TimelinePage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/bible"
          element={
            <ProtectedLayout>
              <BiblePage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/bible/:book/:chapter"
          element={
            <ProtectedLayout>
              <BibleReaderPage />
            </ProtectedLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedLayout>
              <ProfilePage />
            </ProtectedLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App