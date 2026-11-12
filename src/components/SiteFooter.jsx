import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ShieldCheck, Truck, Snowflake, FlaskConical } from 'lucide-react'
import { newsletterSubscribe, ApiError } from '../lib/api'
import { ArrowRight } from './ui'
import { useReveal } from '../lib/ui-hooks'
import './SiteFooter.css'

/* Reassurance strip that caps the white sheet before the orange footer. */
const PROMISES = [
  { icon: ShieldCheck, title: '≥99% verified purity', note: 'HPLC tested, CoA on request' },
  { icon: Snowflake, title: 'Cold-chain shipping', note: 'Temperature-controlled, tracked' },
  { icon: Truck, title: 'Free over $250', note: 'Same-day dispatch before 3pm' },
  { icon: FlaskConical, title: 'Research-grade only', note: 'Not for human consumption' },
]

/* Looping claim strip at the foot of the orange panel. */
const CLAIMS = [
  'Independently verified',
  'HPLC & MS tested',
  'Batch-traceable',
  'Cold-chain handled',
  'CoA with every order',
]

const PAYMENTS = ['Visa', 'Mastercard', 'Amex', 'Discover', 'PayPal', 'Apple Pay', 'Google Pay']

/* Newsletter form — posts to /api/newsletter/subscribe.
   States: idle → sending → success | error. Rate-limited server-side
   at 5 submits/hour per IP, so surface that message when we hit 429. */
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(true)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!email || !consent) {
      setStatus('error')
      setMessage(!email ? 'Enter your email.' : 'Please tick the consent box.')
      return
    }
    setStatus('sending')
    setMessage(null)
    try {
      const res = await newsletterSubscribe({ email, consent, source: 'footer' })
      setStatus('success')
      setMessage(res && res.already_subscribed
        ? "You're already on the list. See you in the next drop."
        : 'Subscribed — welcome to the lab.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      if (err instanceof ApiError && err.status === 429) {
        setMessage('Too many submissions — please try again later.')
      } else {
        setMessage(err.message || 'Could not subscribe. Please try again.')
      }
    }
  }

  return (
    <form className="ftr__news" onSubmit={submit} noValidate>
      <div className="ftr__news-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address"
          autoComplete="email"
          disabled={status === 'sending'}
          required
        />
        <button
          type="submit"
          className="ftr__news-btn"
          disabled={status === 'sending'}
          aria-label="Subscribe"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      <label className="ftr__news-consent">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <span>I agree to receive lab updates and batch drops. Unsubscribe anytime.</span>
      </label>

      {message && (
        <p className={`ftr__news-msg ftr__news-msg--${status}`} role="status">
          {message}
        </p>
      )}
    </form>
  )
}

const Social = ({ name, size = 18 }) => {
  const P = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round',
  }
  switch (name) {
    case 'instagram':
      return (
        <svg {...P}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
        </svg>
      )
    case 'x-twitter':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...P}>
          <rect x="2" y="5" width="20" height="14" rx="4" />
          <path d="M10 9.5v5l4-2.5z" fill="currentColor" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg {...P}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 10v7" />
          <circle cx="8" cy="7" r="0.8" fill="currentColor" />
          <path d="M12 17v-4a2 2 0 0 1 4 0v4" />
          <path d="M12 10v7" />
        </svg>
      )
    default:
      return null
  }
}

function SiteFooter() {
  /* The footer animates its own promise strip. Only the home page runs a
     page-level reveal, so without this the strip stayed invisible
     (opacity 0) on every other page. */
  const promisesRef = useReveal()

  const claimRun = (
    <div className="zk-marquee__track" aria-hidden="true">
      {CLAIMS.map((c) => (
        <span className="ftr__claim" key={c}>
          {c}
          <span className="ftr__claim-dot" />
        </span>
      ))}
    </div>
  )

  return (
    <>
      {/* Promise strip — still on the white sheet, rounding it off. */}
      <section className="ftr-promises" aria-label="Our promises" ref={promisesRef}>
        <div className="zk-container">
          <ul className="ftr-promises__grid">
            {PROMISES.map(({ icon: Ico, title, note }) => (
              <li className="ftr-promises__item" key={title} data-rv="fade">
                <Ico size={24} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="ftr-promises__title">{title}</p>
                  <p className="ftr-promises__note">{note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="ftr" aria-label="Site footer">
        <div className="zk-container">
          <div className="ftr__top">
            <nav className="ftr__cols" aria-label="Footer">
              <div className="ftr__col">
                <h4>Our products</h4>
                <ul>
                  <li><NavLink to="/services">All compounds</NavLink></li>
                  <li><NavLink to="/product/retatrutide-40">Retatrutide</NavLink></li>
                  <li><NavLink to="/product/tirzepatide">Tirzepatide</NavLink></li>
                  <li><NavLink to="/product/bpc-157-tb-500">BPC-157 &amp; TB-500</NavLink></li>
                  <li><NavLink to="/product/nad-plus-1000">NAD+</NavLink></li>
                </ul>
              </div>

              <div className="ftr__col">
                <h4>Learn</h4>
                <ul>
                  <li><NavLink to="/about">About Zyra Labs</NavLink></li>
                  <li><NavLink to="/press-release">Press releases</NavLink></li>
                  <li><NavLink to="/contact">Request a CoA</NavLink></li>
                  <li><NavLink to="/services">Specs &amp; purity</NavLink></li>
                  <li><NavLink to="/shipping-policy">Cold-chain handling</NavLink></li>
                </ul>
              </div>

              <div className="ftr__col">
                <h4>Help</h4>
                <ul>
                  <li><NavLink to="/signin">My account</NavLink></li>
                  <li><NavLink to="/orders">My orders</NavLink></li>
                  <li><NavLink to="/track-order">Track order</NavLink></li>
                  <li><NavLink to="/contact">Contact us</NavLink></li>
                  <li><NavLink to="/refund-policy">Returns</NavLink></li>
                </ul>
              </div>
            </nav>

            <div className="ftr__signup">
              <h3 className="ftr__signup-title">Stay in the loop</h3>
              <NewsletterForm />
              <p className="ftr__signup-note">
                CoAs, batch drops and lab notes — no more than once a month.
              </p>

              <ul className="ftr__socials">
                <li>
                  <a href="https://instagram.com/zyralabs" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Social name="instagram" />
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/zyralabs" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                    <Social name="x-twitter" size={16} />
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/@zyralabs" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Social name="youtube" />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/company/zyralabs" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Social name="linkedin" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="zk-marquee ftr__marquee" style={{ '--marquee-duration': '30s' }}>
          {claimRun}
          {claimRun}
        </div>

        <div className="zk-container">
          <div className="ftr__bottom">
            <div className="ftr__legal">
              <span>© {new Date().getFullYear()} Zyra Labs. All rights reserved.</span>
              <ul>
                <li><NavLink to="/refund-policy">Refund policy</NavLink></li>
                <li><NavLink to="/privacy-policy">Privacy policy</NavLink></li>
                <li><NavLink to="/terms-of-service">Terms of service</NavLink></li>
                <li><NavLink to="/shipping-policy">Shipping policy</NavLink></li>
              </ul>
            </div>

            <ul className="ftr__payments" aria-label="Accepted payment methods">
              {PAYMENTS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default SiteFooter
