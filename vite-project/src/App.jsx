import { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Eventos from './components/Eventos'
import Directorio from './components/Directorio'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import UploadObraForm from './components/UploadObraForm'
import CultorProfile from './components/CultorProfile'
import Footer from './components/Footer'

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedCultor, setSelectedCultor] = useState(null)

  return (
    <AuthProvider>
      <div className="scroll-smooth bg-linen relative">
        <Navbar 
          onOpenRegister={() => setIsRegisterOpen(true)} 
          onOpenLogin={() => setIsLoginOpen(true)}
        />
        <Hero onOpenRegister={() => setIsRegisterOpen(true)} />
        <About />
        <Gallery onOpenUpload={() => setIsUploadOpen(true)} />
        <Eventos />
        <Directorio onSelectCultor={setSelectedCultor} />
        <RegisterForm isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        <LoginForm isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        <UploadObraForm isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
        {selectedCultor && (
          <CultorProfile cultor={selectedCultor} onClose={() => setSelectedCultor(null)} />
        )}
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
