import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import PageWrapper from '@/components/layout/PageWrapper'
import PageHero from '@/components/ui/PageHero'
import ScrollReveal from '@/components/ui/ScrollReveal'

const ROLES = [
  { id: 'technical',      label: 'Technical',       desc: 'Development & Engineering' },
  { id: 'media',          label: 'Media',            desc: 'Coverage & Photography'   },
  { id: 'graphics',       label: 'Graphics',         desc: 'Visual Design & Branding' },
  { id: 'content',        label: 'Content',          desc: 'Writing & Strategy'       },
  { id: 'video-editing',  label: 'Video Editing',    desc: 'Editing & Production'     },
  { id: 'operations',     label: 'Operations',       desc: 'Events & Logistics'       },
]

const inputClasses =
  'bg-f1-surface border border-white/10 text-f1-white px-4 py-3 text-sm placeholder:text-f1-silver/30 focus:border-f1-red focus:outline-none transition-colors duration-200 w-full'

export default function Join() {
  const [selectedRole, setSelectedRole] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    fullName: '',
    rollNo: '',
    email: '',
    course: '',
    year: '',
    why: '',
  })
  const [links, setLinks] = useState(['']) // dynamic link fields
  const rolesRef = useRef(null)

  const addLink = () => setLinks(prev => [...prev, ''])
  const updateLink = (index, value) => {
    const updated = [...links]
    updated[index] = value
    setLinks(updated)
  }
  const removeLink = (index) => {
    if (links.length === 1) return // always keep at least one
    setLinks(prev => prev.filter((_, i) => i !== index))
  }

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
    form.rollNo.trim() &&
    form.email.trim() &&
    form.course.trim() &&
    form.year &&
    form.why.trim().length >= 20

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitting(true)
    setError(null)
    try {
      await addDoc(collection(db, 'applications'), {
        name: form.fullName,
        rollNo: form.rollNo,
        email: form.email,
        course: form.course,
        year: form.year,
        role: selectedRole,
        why: form.why,
        links: links.filter((l) => l.trim() !== ''),
        status: 'pending',
        notes: null,
        submittedAt: serverTimestamp(),
        reviewedAt: null,
        reviewedBy: null,
      })
      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong submitting your application. Please try again.')
      console.error(err)
    } finally {
      setSubmitting(false)
    }
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
                  {ROLES.map((role) => (
                    <div
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`role-card telemetry-card p-4 cursor-pointer ${
                        selectedRole === role.id ? '!border-f1-red' : ''
                      }`}
                    >
                      <p
                        className={`font-semibold text-sm ${
                          selectedRole === role.id
                            ? 'text-f1-red'
                            : 'text-f1-white'
                        }`}
                      >
                        {role.label}
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
                  <label htmlFor="rollNo" className="f1-eyebrow">
                    Roll Number
                  </label>
                  <input
                    id="rollNo"
                    type="text"
                    required
                    placeholder="e.g. 2310992123"
                    value={form.rollNo}
                    onChange={updateField('rollNo')}
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
                  <label htmlFor="course" className="f1-eyebrow">
                    Course Name
                  </label>
                  <input
                    id="course"
                    type="text"
                    required
                    placeholder="e.g. B.E. Computer Science (AI/ML)"
                    value={form.course}
                    onChange={updateField('course')}
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
                      className={`${inputClasses} appearance-none cursor-pointer ${
                        form.year ? '' : 'text-f1-silver/30'
                      }`}
                    >
                      <option value="" disabled>
                        Select year
                      </option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                    <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-f1-silver/50 text-xs">
                      ▾
                    </span>
                  </div>
                </div>

                <div className="form-field flex flex-col gap-2">
                  <label htmlFor="why" className="f1-eyebrow">
                    Why F1 Chitkara? <span className="!text-f1-silver/40">(min. 20 characters)</span>
                  </label>
                  <textarea
                    id="why"
                    rows={5}
                    required
                    placeholder="Tell us what excites you about F1 Chitkara and what you'd contribute..."
                    value={form.why}
                    onChange={updateField('why')}
                    className={`${inputClasses} resize-none`}
                  />
                  <p className="text-xs text-f1-silver/40">
                    {form.why.trim().length}/20
                  </p>
                </div>

                {/* Links — dynamic, add more */}
                <div className="form-field flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <label className="f1-eyebrow">
                      Links <span className="!text-f1-silver/30 normal-case tracking-normal text-[10px]">
                        — GitHub, Portfolio, LinkedIn, etc.
                      </span>
                    </label>
                  </div>

                  {links.map((link, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="url"
                        value={link}
                        onChange={e => updateLink(index, e.target.value)}
                        placeholder={
                          index === 0
                            ? 'https://github.com/yourusername'
                            : 'https://linkedin.com/in/yourprofile'
                        }
                        className={`flex-1 ${inputClasses}`}
                      />
                      {links.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeLink(index)}
                          className="w-10 h-10 border border-white/10 text-f1-silver/50
                                     hover:border-f1-red hover:text-f1-red transition-colors
                                     flex items-center justify-center text-lg shrink-0"
                          aria-label="Remove link"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Add another link */}
                  <button
                    type="button"
                    onClick={addLink}
                    className="flex items-center gap-2 text-xs text-f1-green/70
                               hover:text-f1-green transition-colors w-fit"
                  >
                    <span className="w-4 h-4 border border-f1-green/40 flex items-center
                                     justify-center text-f1-green text-sm">+</span>
                    Add another link
                  </button>
                </div>
              </ScrollReveal>

              {error && (
                <p className="text-sm text-f1-red mt-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={!isValid || submitting}
                className={`btn-primary w-full sm:w-fit mt-10 ${
                  !isValid || submitting
                    ? 'opacity-50 cursor-not-allowed hover:!bg-f1-red hover:!translate-y-0'
                    : ''
                }`}
              >
                {submitting ? 'Submitting…' : 'Submit Application →'}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}
