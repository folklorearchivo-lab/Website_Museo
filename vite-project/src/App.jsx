import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Gallery from './components/Gallery'
import Eventos from './components/Eventos'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'

function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  return (
    <div className="scroll-smooth bg-linen relative">
      <Navbar onOpenRegister={() => setIsRegisterOpen(true)} />
      <Hero onOpenRegister={() => setIsRegisterOpen(true)} />
      <About />
      <Gallery />
      <Eventos />
      <RegisterForm isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      <Footer />
    </div>
  )
}

export default App
