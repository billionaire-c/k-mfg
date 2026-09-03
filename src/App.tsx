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
import { CasesPage } from './pages/CasesPage'
import { ContactPage } from './pages/ContactPage'
import { FieldNoteDetailPage } from './pages/FieldNoteDetailPage'
import { FieldNotesPage } from './pages/FieldNotesPage'
import { GuestbookPage } from './pages/GuestbookPage'
import { GlossaryPage } from './pages/GlossaryPage'
import { HomePage } from './pages/HomePage'
import { IndustryClassifyPage } from './pages/IndustryClassifyPage'
import { InsightsPage } from './pages/InsightsPage'
import { MapPage } from './pages/MapPage'
import { MaturityPage } from './pages/MaturityPage'
import { OtSecurityPage } from './pages/OtSecurityPage'
import { PolicyPage } from './pages/PolicyPage'
import { ReferenceModelPage } from './pages/ReferenceModelPage'
import { RoadmapPage } from './pages/RoadmapPage'
import { SearchPage } from './pages/SearchPage'
import { SitemapPage } from './pages/SitemapPage'
import { SmartFactoryIntroPage } from './pages/SmartFactoryIntroPage'
import { SmartFactoryNumbersPage } from './pages/SmartFactoryNumbersPage'
import { ManufacturingAiPage } from './pages/ManufacturingAiPage'
import { SmartHaccpPage } from './pages/SmartHaccpPage'
import { StandardsPage } from './pages/StandardsPage'
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
                <Route path="notes" element={<FieldNotesPage />} />
                <Route path="notes/:id" element={<FieldNoteDetailPage />} />
                <Route path="youtube" element={<YoutubePage />} />
                <Route path="smart-factory" element={<SmartFactoryIntroPage />} />
                <Route
                  path="smart-factory-numbers"
                  element={<SmartFactoryNumbersPage />}
                />
                <Route
                  path="manufacturing-ai"
                  element={<ManufacturingAiPage />}
                />
                <Route path="smart-haccp" element={<SmartHaccpPage />} />
                <Route path="map" element={<MapPage />} />
                <Route path="policy" element={<PolicyPage />} />
                <Route path="standards" element={<StandardsPage />} />
                <Route path="ot-security" element={<OtSecurityPage />} />
                <Route path="reference-model" element={<ReferenceModelPage />} />
                <Route path="industries" element={<IndustryClassifyPage />} />
                <Route path="cases" element={<CasesPage />} />
                <Route path="check" element={<MaturityPage />} />
                <Route path="roadmap" element={<RoadmapPage />} />
                <Route path="glossary" element={<GlossaryPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="guestbook" element={<GuestbookPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="sitemap" element={<SitemapPage />} />
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
