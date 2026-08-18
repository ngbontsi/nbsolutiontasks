import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  if (project.featured) {
    return (
      <div className={`fade-in-up p-[1px] rounded-3xl bg-gradient-to-br ${project.color} hover:from-accent/20 hover:to-blue-600/20 transition-all duration-500`}>
        <div className="bg-dark-800 rounded-3xl p-8 sm:p-10 h-full">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full border border-accent/20">
              Featured
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-dark-600 text-gray-400 rounded-full">
              {project.subtitle}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold mb-4">{project.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-6">{project.longDescription}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium bg-dark-600 text-gray-300 rounded-lg border border-dark-500"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.subProjects && (
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {project.subProjects.map((sub) => (
                <div
                  key={sub.name}
                  className="p-4 rounded-xl bg-dark-700/50 border border-dark-500/50 hover:border-accent/20 transition-colors"
                >
                  <h4 className="font-semibold text-sm mb-1">{sub.name}</h4>
                  <p className="text-xs text-gray-500 mb-2">{sub.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {sub.tags.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 bg-dark-600 text-gray-400 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4">
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-xl transition-all duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-dark-500 hover:border-accent/30 text-gray-300 hover:text-white text-sm font-medium rounded-xl bg-dark-700/50 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`fade-in-up p-[1px] rounded-2xl bg-gradient-to-br ${project.color} hover:from-accent/15 hover:to-blue-600/15 transition-all duration-500`}>
      <div className="bg-dark-800 rounded-2xl p-6 sm:p-8 h-full flex flex-col">
        <span className="text-xs font-medium text-gray-500 mb-3">{project.subtitle}</span>
        <h3 className="text-xl font-bold mb-3">{project.title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium bg-dark-600 text-gray-300 rounded-lg border border-dark-500"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-dark-500 hover:border-accent/30 text-gray-300 hover:text-white text-sm font-medium rounded-xl bg-dark-700/50 transition-all duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              View
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
