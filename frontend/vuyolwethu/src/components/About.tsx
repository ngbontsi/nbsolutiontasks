import { useEffect, useRef } from 'react'
import Image1 from '../../public/assets/1.jpeg'

export default function About() {
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
    <section className="section" id="about" ref={ref}>
      <h2 className="section-title fade-in">About</h2>
      <p className="section-sub fade-in">Discover quality products &amp; great service</p>
      <div className="about-grid">
        <img src={`${Image1}`} alt="Products" className="about-image fade-in" />
        <div className="about-text fade-in">
          <h3>Vuyolwethu Madyungu</h3>
          <p>Welcome to my store. I offer a carefully curated selection of quality products at affordable prices. Every item is chosen with care to ensure you get the best value.</p>
          <p>Customer satisfaction is my priority. Browse the gallery to see what&apos;s available, and get in touch to place your order. Fast delivery and friendly service guaranteed.</p>
        </div>
      </div>
    </section>
  )
}
