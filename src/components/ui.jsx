/* Shared presentation primitives for the theme.
   Everything here is purely visual — no data fetching, no cart or auth logic —
   so pages can adopt the design language without changing their behaviour. */

import { Link } from 'react-router-dom'

/* -------------------------------------------------------------------------
   Icons
   Inline rather than imported so stroke weight matches the theme (1.75) and
   the arrow can animate independently inside a button.
   ------------------------------------------------------------------------- */

export const ArrowRight = ({ size = 18, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ChevronLeft = ({ size = 20, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
)

export const ChevronRight = ({ size = 20, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...rest}>
    <path d="M9 5l7 7-7 7" />
  </svg>
)

const StarIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 1.8l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.56l-6.18 3.25L7 13.94l-5-4.87 6.91-1z" />
  </svg>
)

/* -------------------------------------------------------------------------
   Button
   Renders as a router Link, an anchor, or a button depending on the props it
   is given, so callers never have to restyle for the element they need.
   ------------------------------------------------------------------------- */

export function Btn({
  to,
  href,
  variant = 'primary',
  size,
  arrow = false,
  block = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'zk-btn',
    variant !== 'primary' ? `zk-btn--${variant}` : '',
    size === 'lg' ? 'zk-btn--lg' : '',
    block ? 'zk-btn--block' : '',
    className,
  ].filter(Boolean).join(' ')

  const inner = (
    <>
      <span className="zk-btn__fill" aria-hidden="true" />
      <span>{children}</span>
      {arrow && <ArrowRight className="zk-btn__icon" />}
    </>
  )

  if (to) return <Link to={to} className={classes} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={classes} {...rest}>{inner}</a>
  return <button type="button" className={classes} {...rest}>{inner}</button>
}

/* -------------------------------------------------------------------------
   Rating
   ------------------------------------------------------------------------- */

export function Stars({ count = 5, size = 13, className = '' }) {
  return (
    <span className={`zk-stars ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => <StarIcon key={i} size={size} />)}
    </span>
  )
}

export function Rating({ score, reviews, size = 13, className = '' }) {
  const label = [score, reviews && `${reviews} reviews`].filter(Boolean).join(' · ')
  return (
    <span className={`zk-rating ${className}`}>
      <Stars size={size} />
      {score != null && <strong style={{ color: 'var(--color-text)' }}>{score}</strong>}
      {reviews != null && <span>{reviews} reviews</span>}
      <span className="zk-visually-hidden">Rated {label}</span>
    </span>
  )
}

/* Prev/next arrow pair bound to the controls from a useRail() instance. */
export function RailNav({ rail, label = 'carousel', className = '' }) {
  return (
    <div className={`zk-rail-nav ${className}`}>
      <button
        type="button"
        className="zk-icon-btn"
        onClick={rail.prev}
        disabled={rail.atStart}
        aria-label={`Previous ${label} item`}
      >
        <ChevronLeft />
      </button>
      <button
        type="button"
        className="zk-icon-btn"
        onClick={rail.next}
        disabled={rail.atEnd}
        aria-label={`Next ${label} item`}
      >
        <ChevronRight />
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------
   Section heading
   Eyebrow + title + lede with the theme's standard centred rhythm. Pass the
   title with <em> around the word that should get the peach underline.
   ------------------------------------------------------------------------- */

export function SectionHead({ eyebrow, title, lede, align = 'center', className = '' }) {
  return (
    <div
      className={`zk-section-head ${className}`}
      style={align === 'start'
        ? { alignItems: 'flex-start', textAlign: 'start', marginInline: 0 }
        : undefined}
    >
      {eyebrow && <p className="zk-eyebrow" data-rv="fade">{eyebrow}</p>}
      {title && <h2 className="zk-title" data-rv>{title}</h2>}
      {lede && <p className="zk-lede" data-rv style={{ '--reveal-delay': '80ms' }}>{lede}</p>}
    </div>
  )
}
