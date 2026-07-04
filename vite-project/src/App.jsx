import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ConfigProvider } from './context/ConfigContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Eventos from './components/Eventos'
import Efemerides from './components/Efemerides'
import Directorio from './components/Directorio'
import Gallery from './components/Gallery'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import UploadObraForm from './components/UploadObraForm'
import CultorDashboard from './components/CultorDashboard'
import CultorProfile from './components/CultorProfile'
import Footer from './components/Footer'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'

// La home pública: Navbar + secciones + todos los modales (Registro, Login, Subir
// obra, Panel del cultor). El login nunca tuvo página propia, vive como modal — por
// eso "/login" reutiliza este mismo componente, solo que abre el modal automáticamente.
function HomePage({ autoOpenLogin = false }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(autoOpenLogin)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [panelTab, setPanelTab] = useState('obras')
  const [selectedCultor, setSelectedCultor] = useState(null)

  return (
    <div className="scroll-smooth bg-linen relative">
      <Navbar
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenPanel={(tab) => { setPanelTab(tab || 'obras'); setIsPanelOpen(true) }}
      />
      <Hero onOpenRegister={() => setIsRegisterOpen(true)} />
      <About />
      <Eventos />
      <Efemerides />
      <Gallery />
      <Directorio onSelectCultor={setSelectedCultor} />
      <RegisterForm isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <UploadObraForm isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      <CultorDashboard
        isOpen={isPanelOpen}
        initialTab={panelTab}
        onClose={() => setIsPanelOpen(false)}
        onOpenUpload={() => { setIsPanelOpen(false); setIsUploadOpen(true) }}
      />
      {selectedCultor && (
        <CultorProfile cultor={selectedCultor} onClose={() => setSelectedCultor(null)} />
      )}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<HomePage autoOpenLogin />} />
          <Route path="/olvide-password" element={<ForgotPassword />} />
          <Route path="/recuperar-password" element={<ResetPassword />} />
        </Routes>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App
