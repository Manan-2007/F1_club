export default function PageHero({ eyebrow, title, titleAccent, subtitle }) {
  return (
    <section className="pt-28 pb-16">
      <div className="f1-container flex flex-col gap-6">
        <div className="section-tag">
          <span className="f1-eyebrow">{eyebrow}</span>
        </div>
        <h1 className="f1-heading text-5xl sm:text-6xl lg:text-7xl leading-[0.9]">
          {title}
          {titleAccent && (
            <>
              {' '}
              <span className="text-f1-red">{titleAccent}</span>
            </>
          )}
        </h1>
        {subtitle && (
          <p className="text-f1-silver font-light max-w-xl">{subtitle}</p>
        )}
      </div>
    </section>
  )
}
