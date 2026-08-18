import { useState, useEffect, useCallback } from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSlider from './components/HeroSlider'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Lightbox from './components/Lightbox'
import Image1 from '../public/assets/1.jpeg'
import Image2 from '../public/assets/2.jpeg'
import Image3 from '../public/assets/3.jpeg'
import Image4 from '../public/assets/WhatsApp Image 2026-06-27 at 10.08.54.jpeg'
import Image5 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.06.jpeg'
import Image6 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.06 (1).jpeg'
import Image7 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.07.jpeg'
import Image8 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.07 (1).jpeg'
import Image9 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.08.jpeg'
import Image10 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.08 (1).jpeg'
import Image11 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.08 (2).jpeg'
import Image12 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.09.jpeg'
import Image13 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.09 (1).jpeg'
import Image14 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.10.jpeg'
import Image15 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.10 (1).jpeg'
import Image16 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.10 (2).jpeg'
import Image17 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.11.jpeg'
import Image18 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.11 (1).jpeg'
import Image19 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.12.jpeg'
import Image20 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.12 (1).jpeg'
import Image21 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.13.jpeg'
import Image22 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.13 (1).jpeg'
import Image23 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.14.jpeg'
import Image24 from '../public/assets/WhatsApp Image 2026-06-27 at 10.09.14 (1).jpeg'



const heroSlides = [
  { src: Image1, title: 'Vuyolwethu Madyungu', subtitle: 'Quality products you can trust' },
  { src: Image2, title: 'Vuyolwethu Madyungu', subtitle: 'Browse our latest collection' },
  { src: Image3, title: 'Vuyolwethu Madyungu', subtitle: 'Something for everyone' },
]

const galleryImages = [
  Image1, Image2, Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
  Image11,
  Image12,
  Image13,
  Image14,
  Image15,
  Image16,
  Image17,
  Image18,
  Image19,
  Image20,
  Image21,
  Image22,
  Image23,
  Image24,
]

export default function App() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [closeLightbox])

  return (
    <>
      <Header />
      <main>
        <HeroSlider slides={heroSlides} />
        <About />
        <Gallery images={galleryImages} onImageClick={setLightboxSrc} />
        <Contact />
      </main>
      <Footer />
      <Lightbox src={lightboxSrc} onClose={closeLightbox} />
    </>
  )
}
