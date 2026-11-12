import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/cart-context'
import { newsletterSubscribe, ApiError } from '../lib/api'
import { FlaskConical, Layers, PackageCheck, FileCheck2, MessageCircle, Users } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Lenis from 'lenis'
import SiteFooter from '../components/SiteFooter'
import Seo from '../components/Seo'
import { Btn, Stars, SectionHead, RailNav, ArrowRight } from '../components/ui'
import { useRail, useReveal } from '../lib/ui-hooks'
import { products as catalogProducts } from './dealsProducts'
import './Deals.css'

/* ---------- Home-page media ---------- */
import heroImg from '../assets/new-images/hero.png'
import newProductImg from '../assets/new-images/new.png'
import weComparedImg from '../assets/new-images/we-compared.png'
import aboutSectionImg from '../assets/new-images/about.png'
import aboutImg2 from '../assets/images/new/home-about2.webp'
import benchImg from "../assets/new-images/from the bench.png"
import whyImg1 from '../assets/images/new/whyus-1.webp'
import whyImg2 from '../assets/images/new/whyus2.webp'
import whyImg4 from '../assets/images/new/whyus4.webp'
import whyImg5 from '../assets/images/new/whyus5.webp'

/* 2 × 2 grid beside "Six reasons labs stay": vial, molecule, unboxing, carton. */
const STAY_PHOTOS = [whyImg1, whyImg2, whyImg4, whyImg5]

/* =========================================================================
   Home
   Section order mirrors the reference commerce layout: hero card, feature
   pair, rated intro, press row, product rail, partner strip, testimonial
   card, collection rail, standards grid, about split, press quote, review
   cloud, contact.
   ========================================================================= */

/* Review counts are presentation copy that sits alongside the live catalogue
   rather than in it, so they're keyed by product id here. */
const PRODUCT_REVIEWS = {
  'bpc-157-tb-500': 412,
  tirzepatide: 338,
  'retatrutide-20': 275,
  'retatrutide-40': 261,
  glow: 198,
  'nad-plus-1000': 224,
  'mots-c-40': 146,
  'cjc-1295': 132,
  'tesamorelin-20': 158,
}

const PRESS = [
  { source: 'LabBench Weekly', mark: 'didone', quote: 'Purity numbers that hold up' },
  { source: 'Peptide Review', mark: 'heavy', quote: 'The documentation standard others should meet' },
  { source: 'Applied Research', mark: 'serif', quote: 'Batch-to-batch consistency is exceptional' },
  { source: 'The Synthesis', mark: 'paper', quote: 'Cold-chain handling done properly' },
]

/* Partner strip — each name drawn as its own logo-style wordmark. */
const PARTNER_MARKS = [
  <span className="pm pm--grid" aria-label="Northfield Institute">
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
      <rect x="0.5" y="0.5" width="43" height="43" fill="none" stroke="currentColor" />
      <path d="M15 0.5V43.5M29 0.5V43.5M0.5 15H43.5M0.5 29H43.5" stroke="currentColor" />
    </svg>
    <span>NORTHFIELD INSTITUTE</span>
  </span>,
  <span className="pm pm--script">Camden Biolab</span>,
  <span className="pm pm--badge" aria-label="Helix Research">
    <b>HELIX</b>
    <small>RESEARCH</small>
  </span>,
  <span className="pm pm--outline">
    ORRIN<em>UNIVERSITY</em>
  </span>,
  <span className="pm pm--box">
    Westgate<br />Analytics
  </span>,
  <span className="pm pm--flourish">Meridian Labs</span>,
]

/* Each research area is fronted by the catalogue product that defines it, so
   this rail shows the same packshots as the bestsellers section and follows
   any change made there. */
const productImage = (id) => catalogProducts.find((p) => p.id === id)?.image

const COLLECTIONS = [
  { title: 'Repair & recovery', note: 'BPC-157, TB-500 and regenerative blends', img: productImage('bpc-157-tb-500'), to: '/services' },
  { title: 'Metabolic research', note: 'Tirzepatide and retatrutide, multiple strengths', img: productImage('tirzepatide'), to: '/services' },
  { title: 'Longevity & cellular', note: 'NAD+ and mitochondrial research compounds', img: productImage('nad-plus-1000'), to: '/services' },
  { title: 'Dermal & aesthetic', note: 'Glow and skin-directed formulations', img: productImage('glow'), to: '/services' },
  { title: 'Pre-filled devices', note: 'Fixed-volume, sealed, ready for the bench', img: productImage('retatrutide-40'), to: '/services' },
]

const STANDARDS = [
  { title: 'Purity first', desc: 'Every batch is checked thoroughly to maintain clean, high-quality formulations.', Icon: FlaskConical },
  { title: 'Reliable consistency', desc: 'Uniform production standards mean every batch performs the same.', Icon: Layers },
  { title: 'Secure packaging', desc: 'Sealed and protected so products arrive intact, stable and bench-ready.', Icon: PackageCheck },
  { title: 'Verified documentation', desc: 'Strict testing and clear paperwork back every order, production to delivery.', Icon: FileCheck2 },
  { title: 'Quick email support', desc: 'Fast, direct assistance from real people who know the chemistry.', Icon: MessageCircle },
  { title: 'Trusted by thousands', desc: 'Researchers and laboratories worldwide choose Zyra Labs batch after batch.', Icon: Users },
]

const REVIEWS = [
  { name: 'Emily C.', text: 'Fast support and remarkably consistent products. Zyra Labs has become our go-to source for research-grade peptides.' },
  { name: 'Sofia B.', text: 'Secure delivery, excellent communication, and a team that genuinely understands what reliability means in this field.' },
  { name: 'Michael R.', text: 'The consistency across batches is what keeps me coming back. Helpful guidance and a smooth ordering experience throughout.' },
  { name: 'Aisha K.', text: 'Documentation and traceability are flawless. I trust their batches the way I trust my own bench notes.' },
  { name: 'James W.', text: 'We compared four suppliers over six months. Zyra Labs was the only one whose purity numbers held up under independent retesting.' },
]

/* -------------------------------------------------------------------------
   Hero — full-bleed rounded media card with centred copy
   ------------------------------------------------------------------------- */

const Hero = () => (
  <section className="hm-hero" id="home">
    <div className="hm-wide">
      <div className="zk-media hm-hero__card">
        <img src={heroImg} alt="" fetchPriority="high" />
        <div className="zk-media__scrim zk-media__scrim--bottom" />
        <div className="hm-hero__body">
          <h1 className="hm-hero__title" data-rv>
            Purity, Proven
          </h1>
          <p className="hm-hero__sub" data-rv style={{ '--reveal-delay': '90ms' }}>
            Research peptides at ≥99% purity, with a COA on every batch
          </p>
          <div data-rv style={{ '--reveal-delay': '180ms' }}>
            <Btn to="/services" variant="ghost" size="lg" arrow className="hm-hero__btn">Shop now</Btn>
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Feature pair — two linked cards under the hero
   ------------------------------------------------------------------------- */

const FeaturePair = () => (
  <section className="hm-pair">
    <div className="hm-wide">
      <div className="hm-pair__grid">
        <Link to="/product/retatrutide-40" className="zk-media hm-pair__card hm-pair__card--new" data-rv="scale">
          <img src={newProductImg} alt="" loading="lazy" />
          <div className="zk-media__scrim zk-media__scrim--left" />
          <div className="hm-pair__body">
            <p className="hm-pair__eyebrow">New product</p>
            <h2>Retatrutide 40mg</h2>
            <p className="hm-pair__note">Our most-requested metabolic research compound.</p>
            <span className="zk-btn zk-btn--ghost hm-pair__cta">
              <span className="zk-btn__fill" aria-hidden="true" />
              <span>Shop now</span>
              <ArrowRight size={17} className="zk-btn__icon" />
            </span>
          </div>
        </Link>

        <Link to="/about" className="zk-media hm-pair__card" data-rv="scale" style={{ '--reveal-delay': '110ms' }}>
          <img src={aboutImg2} alt="" loading="lazy" />
          <div className="zk-media__scrim zk-media__scrim--left" />
          <div className="hm-pair__body">
            <p className="hm-pair__eyebrow">Every batch</p>
            <h2>Certificates of analysis</h2>
            <p className="hm-pair__note">HPLC and MS reports, traceable to the batch you hold.</p>
            <span className="zk-btn zk-btn--ghost hm-pair__cta">
              <span className="zk-btn__fill" aria-hidden="true" />
              <span>How we test</span>
              <ArrowRight size={17} className="zk-btn__icon" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Rated intro + press row
   ------------------------------------------------------------------------- */

const Intro = () => (
  <section className="zk-section zk-section--alt zk-section--rounded-start zk-section--rounded-end hm-intro">
    <div className="zk-container">
      <div className="hm-intro__head">
        <Link to="/#testimonials" className="hm-intro__rating" data-rv="fade">
          <Stars size={15} />
          <strong>(1,200+ reviews)</strong>
        </Link>
        <h2 className="zk-title zk-title--lg hm-intro__title" data-rv>
          The home of <em>verified</em> research compounds
        </h2>
        <p className="zk-lede" data-rv style={{ '--reveal-delay': '80ms' }}>
          Clean formulations, documented purity, and cold-chain delivery — engineered for
          structured laboratory work.
        </p>
      </div>

      <ul className="hm-press">
        {PRESS.map((p, i) => (
          <li
            className="zk-card zk-card--bordered hm-press__card"
            key={p.source}
            data-rv
            style={{ '--reveal-delay': `${i * 70}ms` }}
          >
            <span className={`hm-press__source hm-press__source--${p.mark}`}>{p.source}</span>
            <p className="hm-press__quote">&ldquo;{p.quote}&rdquo;</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Product rail
   ------------------------------------------------------------------------- */

/* Add to Cart colour comes from the product's `accent` (set in dealsProducts).
   A product without one falls back to brand orange in the CSS. */
const accentStyle = (a) =>
  a ? { '--pc-a1': a[0], '--pc-a2': a[1], '--pc-glow': a[2] } : undefined

const HeartIcon =({ filled }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
)

/* Photo on top, white panel with a curved top edge overlapping it, then
   title | price, rating, and an orange Add to Cart pill beside a wishlist button. */
const ProductCard = ({ p }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleAdd = () => {
    addToCart({ id: p.id, name: p.title, price: p.price, image: p.image, qty: 1 })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <article className="hm-product" style={accentStyle(p.accent)}>
      <Link to={`/product/${p.id}`} className="hm-product__media" tabIndex={-1} aria-hidden="true">
        <img src={p.image} alt="" loading="lazy" />
      </Link>
      {p.tag && (
        <span className={`hm-product__tag hm-product__tag--${p.tag.toLowerCase().replace(/\s+/g, '-')}`}>
          {p.tag}
        </span>
      )}

      <div className="hm-product__body">
        {/* Wavy top edge of the white panel, overlapping the photo. */}
        <svg className="hm-product__wave" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40V25C0 13 9 7 22 6C88 1 140 4 200 14C262 24 318 23 368 11C384 7 400 11 400 24V40Z" />
        </svg>
        <div className="hm-product__row">
          <h3 className="hm-product__title">
            {/* Non-breaking hyphens keep "BPC-157" / "TB-500" whole on wrap. */}
            <Link to={`/product/${p.id}`}>{p.title.replace(/-/g, '‑')}</Link>
          </h3>
          <div className="hm-product__price">
            <span>From</span>
            <strong>{p.price}</strong>
          </div>
        </div>

        <div className="hm-product__rating">
          <Stars size={17} />
          <span className="hm-product__reviews">{PRODUCT_REVIEWS[p.id] || 120} reviews</span>
        </div>

        <div className="hm-product__actions">
          <button type="button" className="hm-product__add" onClick={handleAdd}>
            {added ? 'Added ✓' : 'Add to Cart'}
            {!added && <ArrowRight size={18} />}
          </button>
          <button
            type="button"
            className={`hm-product__like${liked ? ' is-liked' : ''}`}
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label={`Save ${p.title} to wishlist`}
          >
            <HeartIcon filled={liked} />
          </button>
        </div>
      </div>
    </article>
  )
}

const Bestsellers = () => {
  const [railRef, rail] = useRail()
  return (
    <section className="zk-section hm-best" id="services">
      <div className="zk-container">
        <SectionHead
          title={<>Our <em>bestsellers</em></>}
          lede="Tried. Verified. Reordered again and again."
        />
        <RailNav rail={rail} label="product" className="hm-best__nav" />
      </div>

      <div className="hm-best__railwrap">
        <div className="zk-rail hm-best__rail" ref={railRef}>
          {catalogProducts.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Partner strip
   ------------------------------------------------------------------------- */

const Partners = () => (
  <section className="zk-section zk-section--sm hm-partners">
    <div className="zk-container">
      <h2 className="zk-title zk-title--sm hm-partners__title" data-rv>Trusted in…</h2>
      <ul className="hm-partners__list">
        {PARTNER_MARKS.map((mark, i) => (
          <li key={i} data-rv="fade" style={{ '--reveal-delay': `${i * 60}ms` }}>{mark}</li>
        ))}
      </ul>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Full-bleed testimonial card
   ------------------------------------------------------------------------- */

const FeatureQuote = ({ img, quote, attribution, cta, to, reverse = false }) => (
  <section className="zk-section zk-section--sm hm-quote">
    <div className="zk-container">
      <div className={`zk-media hm-quote__card ${reverse ? 'is-reverse' : ''}`} data-rv="scale">
        <img src={img} alt="" loading="lazy" />
        <div className="zk-media__scrim zk-media__scrim--left" />
        <div className="hm-quote__body">
          <blockquote className="hm-quote__text">&ldquo;{quote}&rdquo;</blockquote>
          <p className="hm-quote__who">— {attribution}</p>
          <Btn to={to} variant="ghost" arrow>{cta}</Btn>
        </div>
      </div>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Split testimonial — photo on the left, light panel with copy on the right
   ------------------------------------------------------------------------- */

const SplitQuote = ({ img, eyebrow, headline, body, attribution, cta, to }) => (
  <section className="zk-section zk-section--sm hm-split">
    <div className="zk-container">
      <div className="hm-split__card" data-rv="scale">
        <div className="hm-split__media">
          <img src={img} alt="" loading="lazy" />
        </div>
        <div className="hm-split__body">
          <p className="hm-split__eyebrow">{eyebrow}</p>
          <blockquote className="hm-split__title">&ldquo;{headline}&rdquo;</blockquote>
          <p className="hm-split__text">
            {body}
            <span className="hm-split__who">— {attribution}</span>
          </p>
          <Btn to={to} arrow>{cta}</Btn>
        </div>
      </div>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Collection rail
   ------------------------------------------------------------------------- */

const Collections = () => {
  const [railRef, rail] = useRail()
  return (
    <section className="zk-section hm-collections">
      <div className="zk-container">
        <SectionHead
          title="Shop by research area"
          lede="Targeted compounds, grouped the way labs actually order them."
        />
        <RailNav rail={rail} label="collection" className="hm-best__nav" />
      </div>

      <div className="hm-best__railwrap">
        <div className="zk-rail hm-collections__rail" ref={railRef}>
          {COLLECTIONS.map((c) => (
            <Link to={c.to} className="zk-media hm-collection" key={c.title}>
              <img src={c.img} alt="" loading="lazy" />
              <div className="zk-media__scrim zk-media__scrim--bottom" />
              <div className="hm-collection__body">
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.note}</p>
                </div>
                <ArrowRight size={20} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------
   Standards grid
   ------------------------------------------------------------------------- */

/* Bento: one proof panel (photo + headline numbers) beside six icon cards. */
const Standards = () => (
  <section className="zk-section" id="why-us">
    <div className="zk-container">
      <div className="hm-stay">
        <div className="hm-stay__copy">
          <h2 className="hm-stay__title zk-title" data-rv>
            Six reasons<br />labs <em>stay</em>
          </h2>
          <p className="hm-stay__lede" data-rv style={{ '--reveal-delay': '80ms' }}>
            The standards behind every product we ship — from the first assay to the
            box that lands on your bench.
          </p>
          <ul className="hm-stay__list">
            {STANDARDS.map(({ title, desc, Icon }, i) => (
              <li className="hm-stay__item" key={title} data-rv style={{ '--reveal-delay': `${120 + i * 50}ms` }}>
                <span className="hm-stay__icon"><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="hm-stay__photos">
          {STAY_PHOTOS.map((src, i) => (
            <div className="hm-stay__photo" key={src} data-rv="scale" style={{ '--reveal-delay': `${i * 90}ms` }}>
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   About split
   ------------------------------------------------------------------------- */

const AboutSplit = () => (
  <section className="zk-section hm-about" id="about">
    <div className="zk-container">
      <div className="hm-about__grid">
        <div className="zk-media hm-about__media" data-rv="scale">
          <img src={aboutSectionImg} alt="" loading="lazy" />
        </div>
        <div className="hm-about__body">
          <h2 className="zk-title" data-rv>About <em>us</em></h2>
          <p data-rv style={{ '--reveal-delay': '80ms' }}>
            Zyra Labs is committed to advancing high-quality peptide and research compound
            production through clean, reliable and precisely developed formulations. Our goal
            is simple: controlled, consistent research materials engineered for structured
            laboratory applications.
          </p>
          <p data-rv style={{ '--reveal-delay': '140ms' }}>
            Every compound we ship is independently assayed, batch-numbered and documented,
            so the material on your bench matches the paperwork in your file — down to the
            decimal place.
          </p>
          <div className="hm-about__stats" data-rv style={{ '--reveal-delay': '200ms' }}>
            <div><strong>10k+</strong><span>researchers served</span></div>
            <div><strong>99%</strong><span>verified purity</span></div>
            <div><strong>24h</strong><span>support response</span></div>
          </div>
          <div data-rv style={{ '--reveal-delay': '260ms' }}>
            <Btn to="/about" arrow>Read our standards</Btn>
          </div>
        </div>
      </div>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Review cloud
   ------------------------------------------------------------------------- */

const ReviewCloud = () => (
  <section className="zk-section hm-reviews" id="testimonials">
    <div className="zk-container">
      <div className="hm-reviews__stage">
        <h2 className="hm-reviews__stat">
          <span data-rv>10,000+</span>
          <span data-rv style={{ '--reveal-delay': '120ms' }}>researchers served</span>
        </h2>

        {REVIEWS.map((r, i) => (
          <blockquote
            className={`hm-review hm-review--${i + 1}`}
            key={r.name}
            data-rv="scale"
            style={{ '--reveal-delay': `${i * 90}ms` }}
          >
            <cite>{r.name}</cite>
            <p>{r.text}</p>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
)

/* -------------------------------------------------------------------------
   Contact
   ------------------------------------------------------------------------- */

/* Community sign-up — light rounded sheet, centred copy, one email field with
   a round orange submit. Posts to the same newsletter endpoint as the footer. */
const Contact = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (status === 'sending') return
    if (!email) {
      setStatus('error')
      setMessage('Enter your email.')
      return
    }
    setStatus('sending')
    setMessage(null)
    try {
      const res = await newsletterSubscribe({ email, consent: true, source: 'home-community' })
      setStatus('success')
      setMessage(res && res.already_subscribed
        ? "You're already on the list. See you in the next drop."
        : 'Subscribed — welcome to the lab.')
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof ApiError && err.status === 429
        ? 'Too many submissions — please try again later.'
        : err.message || 'Could not subscribe. Please try again.')
    }
  }

  return (
    <section className="hm-join" id="contact">
      <div className="hm-join__sheet">
        <h2 className="hm-join__title" data-rv>Join the Zyra community</h2>
        <p className="hm-join__sub" data-rv style={{ '--reveal-delay': '60ms' }}>
          and be first to hear about new batches
        </p>
        <p className="hm-join__lede" data-rv style={{ '--reveal-delay': '120ms' }}>
          Early access to new compounds, CoAs as soon as they land, and notes from the lab
          team.
        </p>
        <p className="hm-join__cue" data-rv style={{ '--reveal-delay': '160ms' }}>Sign up &amp; stay ahead…</p>

        <form className="hm-join__form" onSubmit={submit} noValidate data-rv style={{ '--reveal-delay': '200ms' }}>
          <label htmlFor="hm-join-email" className="zk-visually-hidden">Email address</label>
          <input
            id="hm-join-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />
          <button type="submit" aria-label="Subscribe" disabled={status === 'sending'}>
            <ArrowRight size={18} />
          </button>
        </form>

        {message && (
          <p className={`hm-join__msg hm-join__msg--${status}`} role="status">{message}</p>
        )}
      </div>
    </section>
  )
}

/* =========================================================================
   Page composition
   ========================================================================= */

function Deals() {
  const revealRef = useReveal()
  const lenisRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  /* Disable native scroll restoration — initial scroll is managed below. */
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  /* Lenis — smooth scrolling for the whole page. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  /* Honour cross-page anchor navigation: if we arrived with state.scrollTo,
     wait for the section to render then scroll to it. Otherwise open at the
     hero. Clear the state afterwards so a reload lands at the top. */
  useEffect(() => {
    const targetId = location.state && location.state.scrollTo
    if (!targetId) {
      window.scrollTo(0, 0)
      return undefined
    }
    let cancelled = false
    const attemptScroll = (attempt = 0) => {
      if (cancelled) return
      const el = document.getElementById(targetId)
      if (el) {
        const lenis = lenisRef.current
        if (lenis) lenis.scrollTo(el, { offset: -120, duration: 1.2 })
        else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        navigate('/', { replace: true, state: null })
        return
      }
      if (attempt < 40) requestAnimationFrame(() => attemptScroll(attempt + 1))
    }
    requestAnimationFrame(() => attemptScroll())
    return () => { cancelled = true }
  }, [location.state, navigate])

  return (
    <div className="hm" ref={revealRef}>
      <Seo
        path="/"
        description="Research-grade peptides and laboratory research compounds third-party batch-tested for purity and CoA-documented. For laboratory research use only. Explore BPC-157, tirzepatide, retatrutide and more."
      />
      <Hero />
      <FeaturePair />
      <Intro />
      <Bestsellers />
      <Partners />
      <FeatureQuote
        img={weComparedImg}
        quote="We compared four suppliers over six months. Zyra Labs was the only one whose purity numbers held up under independent retesting."
        attribution="James Whitford, Lab Director"
        cta="See the data"
        to="/about"
      />
      <Collections />
      <AboutSplit />
      <Standards />
      <SplitQuote
        img={benchImg}
        eyebrow="From the bench"
        headline="Documentation and traceability are flawless."
        body="I trust their batches the way I trust my own bench notes."
        attribution="Aisha Khan, Analytical Chemist"
        cta="Request a CoA"
        to="/contact"
      />
      <ReviewCloud />
      <Contact />
      <SiteFooter />
    </div>
  )
}

export default Deals
