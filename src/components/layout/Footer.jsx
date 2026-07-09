import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Teams', to: '/teams' },
  { label: 'Projects', to: '/projects' },
  { label: 'Events', to: '/events' },
  { label: 'Join', to: '/join' },
]

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-f1-surface border-t border-white/5 mt-16 md:mt-32">
      <div className="f1-container py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-[2px] h-6 bg-f1-red" />
            <span className="f1-heading text-sm tracking-[0.15em]">
              F1 <span className="text-f1-red">CHITKARA</span>
            </span>
          </div>
          <p className="text-f1-silver text-sm font-light max-w-xs">
            Where speed meets innovation. Engineering, strategy, design and
            technology — united by racing.
          </p>
          <img
            src="/chitkara.png"
            alt="Chitkara University"
            className="h-8 w-auto object-contain opacity-80 self-start"
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <span className="f1-eyebrow">Navigation</span>
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-f1-silver hover:text-f1-white uppercase tracking-widest transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <span className="f1-eyebrow">Connect</span>
          <div className="flex flex-col gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm text-f1-silver hover:text-f1-white uppercase tracking-widest transition-colors duration-300"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="f1-container py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-f1-silver/60 font-mono">
            © 2026 F1 Chitkara. All rights reserved.
          </p>
          <p className="f1-mono flex items-center gap-2">
            <span className="animate-pulse-slow">●</span> SYSTEM ONLINE
          </p>
        </div>
      </div>
    </footer>
  )
}
