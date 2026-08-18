import { Code2, Github, Mail, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-dark-500/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Code2 className="w-4 h-4 text-accent" />
            </div>
            <span className="font-bold text-sm tracking-tight">
              NG Bontsi<span className="text-accent">.</span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/ndimphiwe-bontsi-368b4960"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-accent transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/ngbontsi"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 hover:text-accent transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="mailto:ngbontsi@gmail.com"
              className="p-2 rounded-lg text-gray-500 hover:text-accent transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-dark-600/50">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} Decoded Solutions. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  )
}
