import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import RegisterForm from './components/RegisterForm'
import Footer from './components/Footer'

function App() {
  return (
    <div className="scroll-smooth bg-linen">
      <Navbar />
      <Hero />
      <Gallery />
      <RegisterForm />
      <Footer />
    </div>
  )
}

export default App
