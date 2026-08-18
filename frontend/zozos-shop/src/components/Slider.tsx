import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { slides } from '../data/slides'

export default function Slider() {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  const prev = () => setI(p => (p - 1 + slides.length) % slides.length)
  const next = () => setI(p => (p + 1) % slides.length)

  return (
    <div className="slider">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`slide-bg ${idx === i ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
        >
          <div className="slide-overlay" />
          <div className={`slide-text ${idx === i ? 'active' : ''}`}>
            <h1>{s.title}</h1>
            <p>{s.subtitle}</p>
          </div>
        </div>
      ))}
      <button className="slider-btn left" onClick={prev}><ChevronLeft size={28} /></button>
      <button className="slider-btn right" onClick={next}><ChevronRight size={28} /></button>
      <div className="slider-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === i ? 'active' : ''}`}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </div>
  )
}
