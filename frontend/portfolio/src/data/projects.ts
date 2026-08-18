export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured: boolean
  color: string
  subProjects?: { name: string; description: string; tags: string[] }[]
}

export const projects: Project[] = [
  {
    id: 'decoded-solutions',
    title: 'Decoded Solutions Platform',
    subtitle: 'Full-Stack SaaS Platform',
    description:
      'A comprehensive multi-service platform featuring e-commerce, restaurant management, guesthouse bookings, and an admin dashboard — built with microservices architecture.',
    longDescription:
      'End-to-end platform with Spring Boot microservices, React frontends, API gateway with JWT auth, PostgreSQL databases with Row-Level Security, Redis caching, Docker orchestration, and GitHub Pages deployment.',
    tags: [
      'React 19',
      'Spring Boot 3.4',
      'PostgreSQL',
      'Docker',
      'Redis',
      'Kafka',
      'TypeScript',
      'Spring Security',
    ],
    liveUrl: 'https://ngbontsi.github.io/decodedsolutions/',
    githubUrl: 'https://github.com/ngbontsi/decodedsolutions',
    featured: true,
    color: 'from-accent/10 to-blue-600/10',
    subProjects: [
      {
        name: 'Butcher Shop',
        description: 'E-commerce store with cart, wishlist, checkout, and product management.',
        tags: ['React', 'Marketplace API', 'JWT Auth'],
      },
      {
        name: 'Admin Dashboard',
        description: 'Internal management panel with user roles, analytics, and audit trails.',
        tags: ['React', 'RBAC', 'Real-time Data'],
      },
      {
        name: 'Guesthouse Client',
        description: 'Property browsing and reservation system with room selection.',
        tags: ['React', 'Booking System', 'Mock Data'],
      },
      {
        name: "Zozo's Shop",
        description: 'Lightweight food ordering site with WhatsApp integration.',
        tags: ['React', 'Static Site', 'WhatsApp API'],
      },
    ],
  },
  {
    id: 'zozos-kitchen',
    title: "Zozo's Kitchen",
    subtitle: 'Client Project',
    description:
      'A polished food ordering website for a local kitchen business, featuring an image slider, daily menu, and WhatsApp-based ordering.',
    longDescription:
      'Built for a home-based food business. Features a hero image slider, interactive menu with pricing in Rand, and seamless WhatsApp integration for order placement. Responsive design with smooth animations.',
    tags: ['HTML/CSS', 'JavaScript', 'WhatsApp API', 'Responsive Design'],
    liveUrl:'https://ngbontsi.github.io/zozos-kitchen/',
    githubUrl: 'https://github.com/ngbontsi/zozos-kitchen',
    featured: false,
    color: 'from-orange-500/10 to-amber-500/10',
  },
  {
    id: 'vuyolwethu',
    title: 'Vuyolwethu',
    subtitle: 'Client Project',
    description:
      'A sleek business portfolio website with a product gallery, lightbox viewer, and contact integration.',
    longDescription:
      'Professional portfolio site for a small business owner. Includes a hero slider, product image gallery with lightbox functionality, about section, and multi-channel contact options (phone, WhatsApp, email).',
    tags: ['HTML/CSS', 'JavaScript', 'Gallery', 'Responsive Design'],
    liveUrl: 'https://ngbontsi.github.io/vuyolwethu/',
    githubUrl: 'https://github.com/ngbontsi/vuyolwethu',
    featured: false,
    color: 'from-emerald-500/10 to-teal-500/10',
  },
]
