import { useEffect, useRef } from 'react'
import {
  Globe,
  ShoppingCart,
  LayoutDashboard,
  CalendarCheck,
  Server,
  CodeXml,
  Check,
  Sparkles,
  Zap,
} from 'lucide-react'

const services = [
  {
    icon: Globe,
    title: 'Full-Stack Web Apps',
    description:
      'End-to-end applications with React frontends and Spring Boot backends — built for performance and scale.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Solutions',
    description:
      'Custom online stores with product management, carts, checkout flows, and payment integration.',
  },
  {
    icon: LayoutDashboard,
    title: 'Admin Dashboards',
    description:
      'Internal management panels with role-based access, analytics, and real-time data monitoring.',
  },
  {
    icon: CalendarCheck,
    title: 'Booking Systems',
    description:
      'Reservation platforms for guesthouses, restaurants, and service businesses with real-time availability.',
  },
  {
    icon: Server,
    title: 'REST APIs & Microservices',
    description:
      'Scalable backend architectures with API gateways, authentication, and database-per-service patterns.',
  },
  {
    icon: CodeXml,
    title: 'Custom Development',
    description:
      'Tailored solutions for unique business needs — from automation tools to data pipelines.',
  },
]

const packages = [
  {
    name: 'Starter',
    price: 'From R3,500',
    icon: Sparkles,
    description: 'Perfect for getting your business online',
    features: [
      'Single-page responsive website',
      'Contact form & social links',
      'Mobile-first design',
      '1 round of revisions',
      'Basic SEO setup',
      '1 month hosting support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Business',
    price: 'From R8,000',
    icon: Zap,
    description: 'Multi-page site with business tools',
    features: [
      'Multi-page responsive website',
      'Online ordering / booking system',
      'WhatsApp integration',
      'Image gallery & lightbox',
      '3 rounds of revisions',
      '3 months hosting support',
    ],
    cta: 'Go Business',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    icon: Sparkles,
    description: 'Full-stack platform with everything',
    features: [
      'Custom full-stack application',
      'Admin dashboard & analytics',
      'User accounts & roles',
      'REST API & database design',
      'Ongoing support & maintenance',
      'Docker deployment',
    ],
    cta: 'Let\'s Talk',
    popular: false,
  },
]

export default function Services() {
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
    <section id="services" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in-up text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            What I Offer
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Services & Pricing</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            From a simple business card site to a full-stack platform — I build
            software that helps South African businesses grow.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-20">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`fade-in-up relative p-[1px] rounded-2xl ${
                pkg.popular
                  ? 'bg-gradient-to-b from-accent/40 to-dark-600'
                  : 'bg-dark-600'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div
                className={`rounded-2xl p-8 h-full flex flex-col ${
                  pkg.popular ? 'bg-dark-800' : 'bg-dark-800'
                }`}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    <pkg.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                  <div className="text-2xl font-extrabold text-accent mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-sm text-gray-500">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-200 ${
                    pkg.popular
                      ? 'bg-accent hover:bg-accent-hover text-white glow-sm hover:glow'
                      : 'border border-dark-500 text-gray-300 hover:text-white hover:border-accent/30'
                  }`}
                >
                  {pkg.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="fade-in-up text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-3">
            What I Build
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Every project includes</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="fade-in-up group p-6 rounded-2xl border border-dark-500 bg-dark-800/50 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-up mt-16 text-center p-8 rounded-2xl border border-dark-500 bg-dark-800/30">
          <p className="text-gray-400 mb-4">
            Not sure what you need? Let's chat — I'll help figure out the best solution.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium rounded-xl transition-all duration-200"
          >
            Let's Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
