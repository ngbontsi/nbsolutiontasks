import { useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.05 }
    )

    const els = sectionRef.current?.querySelectorAll('.fade-in-up')
    els?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const featured = projects.filter((p) => p.featured)
  const others = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in-up text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A selection of projects I've built — from enterprise platforms to client websites.
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {others.length > 0 && (
          <>
            <h3 className="fade-in-up text-xl font-semibold mb-6 text-gray-300">
              Client Work
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {others.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
