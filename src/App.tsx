import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { DashboardLayout } from './layouts/DashboardLayout'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { FloodMapPage } from './pages/FloodMapPage'
import { RiskAnalysisPage } from './pages/RiskAnalysisPage'
import { SheltersPage } from './pages/SheltersPage'
import { EvacuationRoutesPage } from './pages/EvacuationRoutesPage'
import { AlertsPage } from './pages/AlertsPage'
import { ReportsPage } from './pages/ReportsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { SettingsPage } from './pages/SettingsPage'
import { MonitoringPage } from './pages/MonitoringPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/monitoring" element={<MonitoringPage />} />
          <Route path="/map" element={<FloodMapPage />} />
          <Route path="/risk" element={<RiskAnalysisPage />} />
          <Route path="/shelters" element={<SheltersPage />} />
          <Route path="/routes" element={<EvacuationRoutesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </div>
  )
}
