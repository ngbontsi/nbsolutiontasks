import { useEffect, useRef, useState } from 'react'
import { Mail, Github, Send, MessageSquare, Linkedin } from 'lucide-react'

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)
    window.open(`mailto:ngbontsi@gmail.com?subject=${subject}&body=${body}`)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in-up text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Drop me a message and
            I'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <a
              href="mailto:ngbontsi@gmail.com"
              className="fade-in-up flex items-center gap-4 p-5 rounded-2xl border border-dark-500 bg-dark-800/50 hover:border-accent/30 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-sm">ngbontsi@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/ngbontsi"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-in-up flex items-center gap-4 p-5 rounded-2xl border border-dark-500 bg-dark-800/50 hover:border-accent/30 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Github className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500">GitHub</p>
                <p className="font-medium text-sm">github.com/ngbontsi</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/ndimphiwe-bontsi-368b4960"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-in-up flex items-center gap-4 p-5 rounded-2xl border border-dark-500 bg-dark-800/50 hover:border-accent/30 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Linkedin className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500">LinkedIn</p>
                <p className="font-medium text-sm">Ndimphiwe Bontsi</p>
              </div>
            </a>

            <a
              href="https://wa.me/27646320739"
              target="_blank"
              rel="noopener noreferrer"
              className="fade-in-up flex items-center gap-4 p-5 rounded-2xl border border-dark-500 bg-dark-800/50 hover:border-accent/30 transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <MessageSquare className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-gray-500">WhatsApp</p>
                <p className="font-medium text-sm">+27 064 632 0739</p>
              </div>
            </a>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-500 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-500 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Your Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-dark-700 border border-dark-500 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200 glow-sm hover:glow"
            >
              <Send className="w-4 h-4" />
              {submitted ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
