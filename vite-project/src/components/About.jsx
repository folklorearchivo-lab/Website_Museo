import artisanHandsImg from '../assets/artisan_hands.png'
import { useReveal } from '../hooks/useReveal'
import { useConfig } from '../context/ConfigContext'

function About() {
  const { ref, isVisible } = useReveal(0.2)
  const { configWeb, loadingConfig } = useConfig()

  const defaultAboutText = `El **Archivo Regional del Folklore y Patrimonio Cultural "Luis Felipe Ramón y Rivera"** fue creado el 21 de junio de 1993 con la firme misión de investigar científicamente y preservar las expresiones de nuestro patrimonio cultural tradicional. Desde sus primeros años, ha trabajado para crear conciencia sobre la necesaria protección de la memoria histórica en todos los municipios del estado.

Tras años de evolución y compromiso con la cultura, el 30 de septiembre de 2008, el Archivo se integró formalmente a las instalaciones del Museo del Táchira. Hoy en día, desde esta sede, continuamos nuestra labor como centro de investigación para recopilar, estudiar y difundir sistemáticamente las manifestaciones, creencias y costumbres que nos definen.`

  return (
    <section id="nosotros" ref={ref} className="relative scroll-mt-20 bg-gallery-cream py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-16 lg:flex-row lg:items-center lg:gap-16">
          
          {/* Imagen de acompañamiento con diseño asimétrico (Aparece por la derecha) */}
          <div className={`relative lg:w-5/12 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}>
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[2rem] shadow-2xl shadow-cafe-noir/10 z-10">
              <img 
                src={(!loadingConfig && configWeb?.about_imagen) ? configWeb.about_imagen : artisanHandsImg} 
                alt="Manos artesanas moldeando arcilla" 
                className="h-full w-full object-cover sepia-[.15] contrast-[1.05]"
              />
            </div>
            {/* Elementos decorativos */}
            <div className="absolute -bottom-10 -right-10 z-0 h-64 w-64 rounded-full border border-cafe-noir/10"></div>
            <div className="absolute -top-10 -left-10 z-0 h-40 w-40 rounded-full border border-cafe-noir/5"></div>
          </div>

          {/* Textos del contexto e historia (Aparece por la izquierda) */}
          <div className={`lg:w-7/12 text-left transition-all duration-1000 ease-out delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-24 opacity-0'}`}>

            <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl leading-tight">
              Nuestra Historia
            </h2>
            <div className="mt-8 h-px w-20 bg-primary/40" />
            
            <div className="mt-8 space-y-4 lg:space-y-5 font-sans text-base lg:text-lg text-cafe-noir/80 leading-relaxed whitespace-pre-wrap">
              {loadingConfig ? defaultAboutText : (configWeb?.about_texto || defaultAboutText)}
            </div>
            <blockquote className="border-l-2 border-tertiary/30 pl-6 py-2 mt-6">
                <p className="font-serif text-lg lg:text-xl italic text-cafe-noir/90 leading-snug">
                  "No solo conservamos el pasado, resguardamos los valores culturales que dan significado a la memoria viva y a la identidad tachirense."
                </p>
              </blockquote>
            </div>
          
        </div>
      </div>
    </section>
  )
}

export default About
