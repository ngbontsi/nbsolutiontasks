import { useEffect, useRef } from 'react'

const skills = [
  { name: 'Java', icon: '☕', color: 'from-orange-500/10 to-red-500/10' },
  { name: 'Spring Boot', icon: '🍃', color: 'from-green-500/10 to-emerald-500/10' },
  { name: 'React', icon: '⚛️', color: 'from-cyan-500/10 to-blue-500/10' },
  { name: 'TypeScript', icon: '📘', color: 'from-blue-500/10 to-indigo-500/10' },
  { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600/10 to-blue-400/10' },
  { name: 'Docker', icon: '🐳', color: 'from-sky-500/10 to-cyan-500/10' },
  { name: 'Redis', icon: '🔴', color: 'from-red-500/10 to-red-400/10' },
  { name: 'Kafka', icon: '📡', color: 'from-purple-500/10 to-violet-500/10' },
  { name: 'Node.js', icon: '🟢', color: 'from-green-500/10 to-lime-500/10' },
  { name: 'Git', icon: '🔀', color: 'from-orange-500/10 to-amber-500/10' },
  { name: 'REST APIs', icon: '🔗', color: 'from-accent/10 to-blue-500/10' },
  { name: 'Microservices', icon: '🏗️', color: 'from-violet-500/10 to-purple-500/10' },
]

export default function About() {
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
    <section id="about" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in-up text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            About Me
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Developer, Architect, Problem Solver
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I build full-stack applications with a focus on clean architecture, scalable
            backends, and intuitive user interfaces. My work spans from designing
            microservice platforms to crafting responsive web experiences for real businesses.
          </p>
        </div>

        <div className="fade-in-up grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={`group relative p-5 rounded-2xl border border-dark-500 bg-gradient-to-br ${skill.color} hover:border-accent/30 transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="text-3xl mb-3">{skill.icon}</div>
              <h3 className="font-semibold text-sm">{skill.name}</h3>
            </div>
          ))}
        </div>

        <div className="fade-in-up mt-16 grid sm:grid-cols-3 gap-6">
          {[
            { number: '12+', label: 'Years of Experience' },
            { number: '4', label: 'Full-Stack Applications' },
            { number: '100%', label: 'Client Satisfaction' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl border border-dark-500 bg-dark-800/50"
            >
              <div className="text-3xl font-bold text-accent mb-1">{stat.number}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
