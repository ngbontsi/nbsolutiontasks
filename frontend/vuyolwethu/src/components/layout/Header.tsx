import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="header">
      <span className="logo">Vuyolwethu</span>
      <nav className={`nav ${mobileOpen ? 'nav-open' : ''}`}>
        <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
        <a href="#gallery" onClick={() => setMobileOpen(false)}>Gallery</a>
        <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
      </nav>
      <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </header>
  )
}
