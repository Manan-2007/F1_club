import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ScrollReveal from '@/components/ui/ScrollReveal'

const roles = [
  { icon: 'D', name: 'Developer', desc: 'Web · App · Systems' },
  { icon: 'UI', name: 'Designer', desc: 'UI/UX · Graphic · Motion' },
  { icon: 'AI', name: 'Data / AI', desc: 'ML · Analytics · Viz' },
  { icon: 'S', name: 'Strategist', desc: 'Race · Business · Research' },
  { icon: 'M', name: 'Media', desc: 'Content · Photo · Video' },
  { icon: 'O', name: 'Operations', desc: 'Events · Logistics · Comms' },
]

const inputClasses =
  'bg-f1-surface border border-white/10 text-f1-white px-4 py-3 text-sm placeholder:text-f1-silver/30 focus:border-f1-red focus:outline-none transition-colors duration-200 w-full'

export default function Join() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    year: '',
    why: '',
    link: '',
  })
  const rolesRef = useRef(null)

  // Role cards stagger in on mount (top of page, no ScrollTrigger)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.role-card', {
        opacity: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.2,
      })
    }, rolesRef)
    // Form height settles after mount animations
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [])

  const updateField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const isValid =
    selectedRole &&
    form.fullName.trim() &&
    form.email.trim() &&
    form.year &&
    form.why.trim()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    // Firestore write will be wired by the backend partner
    setSubmitted(true)
  }

  return (
    <PageWrapper>
      <PageHero
        eyebrow="Applications Open"
        title="Join the"
        titleAccent="Grid"
        subtitle="Every F1 team has specialists in every role. Tell us where you fit."
      />

      <section className="pb-24">
        <div className="f1-container">
          {submitted ? (
            <div className="telemetry-card p-12 text-center max-w-2xl">
              <span className="block w-3 h-3 rounded-full bg-f1-green mx-auto animate-pulse-slow mb-6" />
              <h2 className="f1-heading text-2xl mb-3">Application Received</h2>
              <p className="text-f1-silver font-light">
                We&apos;ll review your application and reach out via email
                within 48 hours.
              </p>
              <p className="f1-mono mt-6">STATUS: UNDER REVIEW</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl">
              {/* Role selector */}
              <div ref={rolesRef} className="mb-10">
                <p className="f1-eyebrow mb-4">Select Your Role</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {roles.map((role) => (
                    <div
                      key={role.name}
                      onClick={() => setSelectedRole(role.name)}
                      className={`role-card telemetry-card p-4 cursor-pointer ${
                        selectedRole === role.name ? '!border-f1-red' : ''
                      }`}
                    >
                      <div className="w-8 h-8 bg-f1-carbon flex items-center justify-center mb-3">
                        <span className="f1-mono">{role.icon}</span>
                      </div>
                      <p
                        className={`font-semibold text-sm ${
                          selectedRole === role.name
                            ? 'text-f1-red'
                            : 'text-f1-white'
                        }`}
                      >
                        {role.name}
                      </p>
                      <p className="text-xs text-f1-silver/60 mt-0.5">
                        {role.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <ScrollReveal
                target=".form-field"
                stagger={0.08}
                y={20}
                className="flex flex-col gap-6"
              >
                <div className="form-field flex flex-col gap-2">
                  <label htmlFor="fullName" className="f1-eyebrow">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={updateField('fullName')}
                    className={inputClasses}
                  />
                </div>

                <div className="form-field flex flex-col gap-2">
                  <label htmlFor="email" className="f1-eyebrow">
                    University Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@chitkara.edu.in"
                    value={form.email}
                    onChange={updateField('email')}
                    className={inputClasses}
                  />
                </div>

                <div className="form-field flex flex-col gap-2">
                  <label htmlFor="year" className="f1-eyebrow">
                    Year of Study
                  </label>
                  <div className="relative">
                    <select
                      id="year"
                      required
                      value={form.year}
                      onChange={updateField('year')}
                      className={`${inputClasses} appearance-none ${
                        form.year ? '' : 'text-f1-silver/30'
                      }`}
                    >
                      <option value="" disabled>
                        Select your year
                      </option>
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year">3rd Year</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-f1-silver/50 text-xs">
                      ▾
                    </span>
                  </div>
                </div>

                <div className="form-field flex flex-col gap-2">
                  <label htmlFor="why" className="f1-eyebrow">
                    Why F1 Chitkara?
                  </label>
                  <textarea
                    id="why"
                    rows={5}
                    required
                    placeholder="What would you build here?"
                    value={form.why}
                    onChange={updateField('why')}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <div className="form-field flex flex-col gap-2">
                  <label htmlFor="link" className="f1-eyebrow">
                    Link <span className="!text-f1-silver/40">(Optional)</span>
                  </label>
                  <input
                    id="link"
                    type="url"
                    placeholder="GitHub / Portfolio / LinkedIn"
                    value={form.link}
                    onChange={updateField('link')}
                    className={inputClasses}
                  />
                </div>
              </ScrollReveal>

              <button
                type="submit"
                disabled={!isValid}
                className={`btn-primary w-full sm:w-fit mt-10 ${
                  !isValid
                    ? 'opacity-50 cursor-not-allowed hover:!bg-f1-red hover:!translate-y-0'
                    : ''
                }`}
              >
                Submit Application →
              </button>
            </form>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
