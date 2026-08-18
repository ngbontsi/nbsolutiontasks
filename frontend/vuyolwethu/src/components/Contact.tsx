import { useEffect, useRef } from 'react'
import { Phone, MessageCircle, Mail } from 'lucide-react'

export default function Contact() {
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
    <section className="section contact-section" id="contact" ref={ref}>
      <h2 className="fade-in">Place an Order</h2>
      <p className="fade-in">Contact me to order or enquire about any product</p>
      <div className="social-links fade-in">
        <a href="tel:0692316230" className="social-btn"><Phone size={18} /> 069 231 6230</a>
        <a href="https://wa.me/27692316230" target="_blank" rel="noopener noreferrer" className="social-btn"><MessageCircle size={18} /> WhatsApp</a>
        <a href="mailto:vuyolwethumadyungu@gmail.com" className="social-btn"><Mail size={18} /> Email</a>
      </div>
    </section>
  )
}
