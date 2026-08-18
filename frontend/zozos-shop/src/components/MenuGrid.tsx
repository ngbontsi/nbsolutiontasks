import { ShoppingCart } from 'lucide-react'
import type { MenuItem } from '../data/menu'

interface Props {
  items: MenuItem[]
  title: string
}

export default function MenuGrid({ items, title }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="menu-grid">
        {items.map((item, idx) => (
          <div key={idx} className="menu-card">
            <div className="menu-img" style={{ backgroundImage: `url(${item.image})` }} />
            <div className="menu-body">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="menu-footer">
                <span className="menu-price">{item.price}</span>
                <button className="btn-order">
                  <ShoppingCart size={16} />
                  Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
