import { Analytics } from '@vercel/analytics/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { ScrollToTop } from './components/ScrollToTop'
import { AuthProvider } from './context/AuthContext'
import { ContentProvider } from './context/ContentContext'
import { ThemeProvider } from './context/ThemeContext'
import { AdminLoginPage } from './pages/admin/AdminLoginPage'
import { AdminPage } from './pages/admin/AdminPage'
import { CardNewsDetailPage } from './pages/CardNewsDetailPage'
import { CardNewsPage } from './pages/CardNewsPage'
import { GuestbookPage } from './pages/GuestbookPage'
import { HomePage } from './pages/HomePage'
import { InsightsPage } from './pages/InsightsPage'
import { MapPage } from './pages/MapPage'
import { SearchPage } from './pages/SearchPage'
import { YoutubePage } from './pages/YoutubePage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ContentProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="card-news" element={<CardNewsPage />} />
                <Route path="card-news/:id" element={<CardNewsDetailPage />} />
                <Route path="insights" element={<InsightsPage />} />
                <Route path="youtube" element={<YoutubePage />} />
                <Route path="map" element={<MapPage />} />
                <Route path="guestbook" element={<GuestbookPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="admin/login" element={<AdminLoginPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
            <Analytics />
          </BrowserRouter>
        </ContentProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
