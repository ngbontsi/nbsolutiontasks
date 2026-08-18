import { useEffect, useRef } from 'react'

interface GalleryProps {
  images: string[]
  onImageClick: (src: string) => void
}

export default function Gallery({ images, onImageClick }: GalleryProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    el.querySelectorAll('.fade-in').forEach(child => observer.observe(child))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="gallery" ref={ref}>
      <h2 className="section-title fade-in">Gallery</h2>
      <p className="section-sub fade-in">Moments captured through the lens</p>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <div key={i} className="gallery-item fade-in">
            <img
              src={`${src}`}
              alt={`Gallery ${i + 1}`}
              loading="lazy"
              onClick={() => onImageClick(`${src}`)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
