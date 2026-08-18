import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Zozo\'s Kitchen',
    role: 'Restaurant Owner',
    quote: 'The website brought in more customers than I expected. People love being able to see the menu and order on WhatsApp directly.',
    rating: 5,
  },
  {
    name: 'Vuyolwethu Madyungu',
    role: 'Small Business Owner',
    quote: 'Professional work and quick delivery. The gallery and contact features make it easy for my customers to reach me.',
    rating: 5,
  },
  {
    name: 'Fikiswa Zenzile',
    role: 'Job Seeker',
    quote: 'Got my CV looking professional and ready to print. Simple, clean, and exactly what I needed.',
    rating: 5,
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )

    const els = sectionRef.current?.querySelectorAll('.fade-in-up')
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in-up text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            Client Feedback
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">What People Say</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Real feedback from real clients I've built for.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="fade-in-up p-6 rounded-2xl border border-dark-500 bg-dark-800/50"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="w-6 h-6 text-accent/20 absolute -top-1 -left-1" />
                <p className="text-sm text-gray-400 leading-relaxed pl-4 relative z-10">
                  "{t.quote}"
                </p>
              </div>

              <div className="border-t border-dark-600 pt-4 mt-4">
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
