import { useState } from 'react'
import { Phone, ShoppingCart, Clock } from 'lucide-react'
import Slider from './components/Slider'
import MenuGrid from './components/MenuGrid'
import { todayMenu, allMenu } from './data/menu'

const WHATSAPP = "https://wa.me/27790000000"

export default function App() {
  const [showAll, setShowAll] = useState(false)

  return (
    <div className="app">
      <header className="header">
        <span className="logo">Zozo's Kitchen</span>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="contact-btn">
          <Phone size={18} />
          Contact Me
        </a>
      </header>

      <Slider />

      <section className="section cta-section">
        <h2>Hungry?</h2>
        <p>Fresh, homemade meals ready for you</p>
        <div className="cta-buttons">
          <button className="btn-primary btn-lg" onClick={() => setShowAll(true)}>
            <ShoppingCart size={20} />
            Order Now
          </button>
          <button className="btn-secondary btn-lg" onClick={() => setShowAll(true)}>
            <Clock size={20} />
            Menu for Today
          </button>
        </div>
      </section>

      <MenuGrid items={todayMenu} title="Today's Menu" />

      {showAll && (
        <MenuGrid items={allMenu} title="Full Menu" />
      )}

      <section className="section contact-section">
        <h2>Get In Touch</h2>
        <p>Order via WhatsApp for pickup or delivery</p>
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg whatsapp-btn">
          <Phone size={20} />
          Message on WhatsApp
        </a>
      </section>

      <footer className="footer">
        <p>&copy; 2026 Zozo's Kitchen. Made with love.</p>
      </footer>
    </div>
  )
}
