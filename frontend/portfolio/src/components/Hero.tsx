import { ArrowDown, Github, Linkedin } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/2 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-gray-400">Available for new projects</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
          Building Digital
          <br />
          <span className="text-gradient">Solutions</span> That Scale
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ndimphiwe Given Bonsti is a Full-stack developer specializing in enterprise-grade applications.
          From microservice architectures to responsive frontends — I turn complex
          problems into elegant, production-ready software.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl transition-all duration-200 glow-sm hover:glow"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border border-dark-500 hover:border-accent/50 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-200 bg-dark-800/50"
          >
            Get In Touch
          </a>
        </div>

        <div className="flex items-center justify-center gap-6 mb-12">
          <a
            href="https://github.com/ngbontsi"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-dark-500 bg-dark-800/50 text-gray-400 hover:text-accent hover:border-accent/30 transition-all duration-200"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ndimphiwe-bontsi-368b4960"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl border border-dark-500 bg-dark-800/50 text-gray-400 hover:text-accent hover:border-accent/30 transition-all duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        <a
          href="#about"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
        >
          Scroll to learn more
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  )
}
