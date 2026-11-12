import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  ShoppingBag, Menu, X, User, LogOut, PackageSearch, Truck, Search, ChevronDown,
  ArrowLeft, ArrowRight,
} from 'lucide-react'
import { useCart } from '../context/cart-context'
import { useAuth } from '../context/auth-context'
import { products } from '../pages/dealsProducts'
import { ChevronLeft, ChevronRight } from './ui'
import areaRepair from '../assets/new-images/recovery.avif'
import areaMetabolic from '../assets/new-images/metabolic.jpg'
import areaLongevity from '../assets/new-images/cellular.avif'
import areaSkinHair from '../assets/new-images/skin.jpg'
import './Header.css'

/* Rotating promises in the top bar. Routed to the pages that back them up so
   the bar is navigable rather than decorative. */
const ANNOUNCEMENTS = [
  { text: 'Independently verified ≥99% purity — CoA with every batch', to: '/about' },
  { text: 'Order before 3pm for same-day cold-chain dispatch', to: '/shipping-policy' },
  { text: 'Complimentary shipping on research orders over $250', to: '/shipping-policy' },
  { text: 'Questions about a compound? Talk to our lab team', to: '/contact' },
]

const ROTATE_MS = 5200

const navLinks = [
  { to: '/services', type: 'best', label: 'Bestsellers' },
  { to: '/services', type: 'mega', label: 'All products' },
  { to: '/about', type: 'route', label: 'About' },
  { to: '/contact', type: 'route', label: 'Contact' },
]

/* The "All products" mega menu. One tab rail, one grid of picture cards. */
const MEGA_TABS = [
  {
    id: 'area',
    label: 'Shop by research area',
    cards: [
      { label: 'Repair & recovery', to: '/services?area=repair', img: areaRepair },
      { label: 'Metabolic research', to: '/services?area=metabolic', img: areaMetabolic },
      { label: 'Longevity & cellular', to: '/services?area=cellular', img: areaLongevity },
      { label: 'Skin & hair', to: '/services?area=skin', img: areaSkinHair },
    ],
  },
]

const initialsOf = (nameOrEmail) => {
  if (!nameOrEmail) return '?'
  const clean = String(nameOrEmail).trim()
  if (!clean) return '?'
  if (clean.includes('@')) return clean[0].toUpperCase()
  const parts = clean.split(/\s+/).filter(Boolean)
  const first = parts[0] || ''
  const last = parts.length > 1 ? parts[parts.length - 1] : ''
  return `${first[0] || ''}${last[0] || ''}`.toUpperCase() || first[0].toUpperCase()
}

const Wordmark = () => (
  <span className="hdr__wordmark" aria-hidden="true">
    zyra<sup>®</sup>
  </span>
)

/* -------------------------------------------------------------------------
   Announcement bar
   ------------------------------------------------------------------------- */

function AnnouncementBar() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const id = setInterval(
      () => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      ROTATE_MS,
    )
    return () => clearInterval(id)
  }, [paused])

  const step = (dir) =>
    setIndex((i) => (i + dir + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length)

  return (
    <div
      className="topbar"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="topbar__inner">
        <button
          type="button"
          className="topbar__arrow"
          onClick={() => step(-1)}
          aria-label="Previous announcement"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="topbar__viewport" aria-live="polite" aria-atomic="true">
          {ANNOUNCEMENTS.map((item, i) => (
            <NavLink
              key={item.text}
              to={item.to}
              className={`topbar__item ${i === index ? 'is-current' : ''}`}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
            >
              {item.text}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="topbar__arrow"
          onClick={() => step(1)}
          aria-label="Next announcement"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------
   Header
   ------------------------------------------------------------------------- */

function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [acctOpen, setAcctOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [megaTab, setMegaTab] = useState(MEGA_TABS[0].id)
  const [bestOpen, setBestOpen] = useState(false)
  const [stuck, setStuck] = useState(false)
  const acctRef = useRef(null)
  const megaRef = useRef(null)
  const bestRef = useRef(null)
  const bestTrackRef = useRef(null)
  const bestCloseTimer = useRef(null)
  const megaCloseTimer = useRef(null)

  /* Bestsellers opens on hover. Leaving starts a short close timer so the
     pointer can cross the gap between the pill and the panel without it
     snapping shut; re-entering cancels it. */
  const openBest = () => {
    clearTimeout(bestCloseTimer.current)
    setMegaOpen(false)
    setBestOpen(true)
  }
  const closeBestSoon = () => {
    clearTimeout(bestCloseTimer.current)
    bestCloseTimer.current = setTimeout(() => setBestOpen(false), 180)
  }
  useEffect(() => () => clearTimeout(bestCloseTimer.current), [])

  /* All products opens on hover on the same terms. Only one panel is ever
     open, so each opener closes the other. */
  const openMega = () => {
    clearTimeout(megaCloseTimer.current)
    setBestOpen(false)
    setMegaOpen(true)
  }
  const closeMegaSoon = () => {
    clearTimeout(megaCloseTimer.current)
    megaCloseTimer.current = setTimeout(() => setMegaOpen(false), 180)
  }
  useEffect(() => () => clearTimeout(megaCloseTimer.current), [])

  const scrollBest = (dir) => {
    const track = bestTrackRef.current
    if (track) track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  // Tighten the header once the announcement bar has scrolled out of view.
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close every transient layer whenever the route changes.
  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    if (menuOpen) setMenuOpen(false)
    if (acctOpen) setAcctOpen(false)
    if (megaOpen) setMegaOpen(false)
    if (bestOpen) setBestOpen(false)
  }, [location.pathname])
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  // Prevent body scroll behind the mobile drawer.
  useEffect(() => {
    if (!menuOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [menuOpen])

  // Dismiss the account dropdown on outside click / Escape.
  useEffect(() => {
    if (!acctOpen) return undefined
    const onDown = (e) => {
      if (acctRef.current && !acctRef.current.contains(e.target)) setAcctOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setAcctOpen(false) }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [acctOpen])

  // Same for the mega menu.
  useEffect(() => {
    if (!megaOpen) return undefined
    const onDown = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setMegaOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setMegaOpen(false) }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [megaOpen])

  // And for the Bestsellers panel (touch users open it by tapping).
  useEffect(() => {
    if (!bestOpen) return undefined
    const onDown = (e) => {
      if (bestRef.current && !bestRef.current.contains(e.target)) setBestOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setBestOpen(false) }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [bestOpen])

  const handleNavClick = (e, href) => {
    const id = href.replace('#', '')
    setMenuOpen(false)
    // Cross-page anchor: navigate to landing with state; Deals handles the scroll.
    if (location.pathname !== '/') {
      e.preventDefault()
      navigate('/', { state: { scrollTo: id } })
      return
    }
    const target = document.getElementById(id)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSignOut = () => {
    setAcctOpen(false)
    setMenuOpen(false)
    logout()
    navigate('/')
  }

  const displayName = user && (user.name || user.email || 'Researcher')

  return (
    <div className="hdr-shell">
      <AnnouncementBar />

      <header className={`hdr ${stuck ? 'is-stuck' : ''} ${menuOpen ? 'is-menu-open' : ''}`}>
        {/* --- left: desktop nav / mobile menu toggle --- */}
        <div className="hdr__lead">
          <button
            type="button"
            className="hdr__burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="hdr-drawer"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className="hdr__nav" aria-label="Primary">
            {navLinks.map((link) => {
              if (link.type === 'best') {
                return (
                  <div
                    className="hdr__mega-wrap"
                    key={link.label}
                    ref={bestRef}
                    onMouseEnter={openBest}
                    onMouseLeave={closeBestSoon}
                  >
                    <button
                      type="button"
                      className={`hdr__link hdr__link--mega ${bestOpen ? 'is-open' : ''}`}
                      aria-expanded={bestOpen}
                      aria-controls="hdr-best"
                      onClick={() => (bestOpen ? setBestOpen(false) : openBest())}
                      onFocus={openBest}
                    >
                      {link.label}
                    </button>

                    <div
                      className={`hdr__mega-veil ${bestOpen ? 'is-open' : ''}`}
                      aria-hidden="true"
                      onMouseEnter={() => setBestOpen(false)}
                      onClick={() => setBestOpen(false)}
                    />

                    <div id="hdr-best" className={`hdr__mega ${bestOpen ? 'is-open' : ''}`}>
                      <div className="hdr__mega-clip">
                        <div className="hdr__best">
                          <button
                            type="button"
                            className="hdr__best-nav hdr__best-nav--prev"
                            onClick={() => scrollBest(-1)}
                            aria-label="Previous products"
                            tabIndex={bestOpen ? 0 : -1}
                          >
                            <ArrowLeft size={18} />
                          </button>

                          <div className="hdr__best-track" ref={bestTrackRef}>
                            {products.map((p, i) => (
                              <NavLink
                                key={p.id}
                                to={`/product/${p.id}`}
                                className="hdr__best-card"
                                tabIndex={bestOpen ? 0 : -1}
                                style={{
                                  '--card-i': i,
                                  '--a1': p.accent ? p.accent[0] : undefined,
                                  '--a2': p.accent ? p.accent[1] : undefined,
                                }}
                              >
                                <img src={p.image} alt="" loading="lazy" />
                                {p.tag && <span className="hdr__best-tag">{p.tag}</span>}
                                <span className="hdr__best-body">
                                  <span className="hdr__best-text">
                                    <span className="hdr__best-title">{p.title.replace(/-/g, '‑')}</span>
                                    <span className="hdr__best-sub">{p.subtitle}</span>
                                  </span>
                                  <ArrowRight size={18} className="hdr__best-go" aria-hidden="true" />
                                </span>
                              </NavLink>
                            ))}
                          </div>

                          <button
                            type="button"
                            className="hdr__best-nav hdr__best-nav--next"
                            onClick={() => scrollBest(1)}
                            aria-label="Next products"
                            tabIndex={bestOpen ? 0 : -1}
                          >
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              if (link.type === 'mega') {
                return (
                  <div
                    className="hdr__mega-wrap"
                    key={link.label}
                    ref={megaRef}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMegaSoon}
                  >
                    <button
                      type="button"
                      className={`hdr__link hdr__link--mega ${megaOpen ? 'is-open' : ''}`}
                      aria-expanded={megaOpen}
                      onClick={() => (megaOpen ? setMegaOpen(false) : openMega())}
                      onFocus={openMega}
                    >
                      {link.label}
                      <ChevronDown size={15} className="hdr__link-caret" />
                    </button>

                    {/* The veil is inside the hover region, so entering it has
                        to count as leaving the menu rather than keeping it open. */}
                    <div
                      className={`hdr__mega-veil ${megaOpen ? 'is-open' : ''}`}
                      aria-hidden="true"
                      onMouseEnter={() => setMegaOpen(false)}
                      onClick={() => setMegaOpen(false)}
                    />

                    <div className={`hdr__mega ${megaOpen ? 'is-open' : ''}`}>
                      {/* The clip element is what the height transition runs on;
                          its parent animates grid-template-rows 0fr -> 1fr so the
                          panel can expand to its natural height. */}
                      <div className="hdr__mega-clip">
                        <div className="hdr__mega-inner">
                          <div className="hdr__mega-rail" role="tablist" aria-label="Browse products by">
                            {MEGA_TABS.map((tab) => (
                              <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                id={`mega-tab-${tab.id}`}
                                aria-selected={megaTab === tab.id}
                                aria-controls={`mega-panel-${tab.id}`}
                                className={`hdr__mega-tab ${megaTab === tab.id ? 'is-active' : ''}`}
                                onClick={() => setMegaTab(tab.id)}
                                onMouseEnter={() => setMegaTab(tab.id)}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {MEGA_TABS.map((tab) => (
                            <div
                              key={tab.id}
                              role="tabpanel"
                              id={`mega-panel-${tab.id}`}
                              aria-labelledby={`mega-tab-${tab.id}`}
                              hidden={megaTab !== tab.id}
                              className="hdr__mega-cards"
                            >
                              {tab.cards.map((card, i) => (
                                <NavLink
                                  to={card.to}
                                  key={card.label}
                                  className="hdr__card"
                                  style={{ '--card-i': i }}
                                >
                                  <img src={card.img} alt="" loading="lazy" />
                                  <span className="hdr__card-label">{card.label}</span>
                                  <span className="hdr__card-go" aria-hidden="true">
                                    <ChevronRight size={16} />
                                  </span>
                                </NavLink>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              return link.type === 'route' ? (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `hdr__link ${isActive ? 'is-active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="hdr__link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        </div>

        {/* --- centre: logo --- */}
        <NavLink to="/" className="hdr__brand" aria-label="Zyra Labs — home">
          <Wordmark />
        </NavLink>

        {/* --- right: utilities --- */}
        <div className="hdr__actions">
          <NavLink to="/services" className="hdr__icon-link" aria-label="Search products">
            <Search size={20} strokeWidth={1.7} />
          </NavLink>

          {user ? (
            <div className="hdr__acct" ref={acctRef}>
              <button
                type="button"
                className={`hdr__icon-link ${acctOpen ? 'is-open' : ''}`}
                aria-haspopup="menu"
                aria-expanded={acctOpen}
                aria-label="Account menu"
                onClick={() => setAcctOpen((v) => !v)}
              >
                <span className="hdr__avatar" aria-hidden="true">
                  {initialsOf(user.name || user.email)}
                </span>
              </button>

              <div className={`hdr__acct-menu ${acctOpen ? 'is-open' : ''}`} role="menu">
                <div className="hdr__acct-info">
                  <span className="hdr__acct-name">{displayName}</span>
                  {user.email && <span className="hdr__acct-email">{user.email}</span>}
                </div>
                <div className="hdr__acct-divider" aria-hidden="true" />
                <NavLink to="/orders" className="hdr__acct-item" role="menuitem"
                  onClick={() => setAcctOpen(false)}>
                  <PackageSearch size={16} /> <span>My orders</span>
                </NavLink>
                <NavLink to="/track-order" className="hdr__acct-item" role="menuitem"
                  onClick={() => setAcctOpen(false)}>
                  <Truck size={16} /> <span>Track order</span>
                </NavLink>
                <NavLink to="/cart" className="hdr__acct-item" role="menuitem"
                  onClick={() => setAcctOpen(false)}>
                  <ShoppingBag size={16} /> <span>My cart {count > 0 ? `(${count})` : ''}</span>
                </NavLink>
                <div className="hdr__acct-divider" aria-hidden="true" />
                <button type="button" className="hdr__acct-item hdr__acct-item--danger"
                  role="menuitem" onClick={handleSignOut}>
                  <LogOut size={16} /> <span>Sign out</span>
                </button>
              </div>
            </div>
          ) : (
            <NavLink to="/signin" className="hdr__icon-link" aria-label="Sign in">
              <User size={20} strokeWidth={1.7} />
            </NavLink>
          )}

          <NavLink to="/cart" className="hdr__icon-link" aria-label={`Cart, ${count} items`}>
            <ShoppingBag size={20} strokeWidth={1.7} />
            {count > 0 && <span className="hdr__cart-count">{count}</span>}
          </NavLink>
        </div>
      </header>

      {/* --- mobile drawer --- */}
      <div
        className={`hdr__scrim ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        id="hdr-drawer"
        className={`hdr__drawer ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="hdr__drawer-top">
          <Wordmark />
          <button
            type="button"
            className="zk-icon-btn"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="hdr__drawer-nav" aria-label="Mobile">
          {navLinks.map((link) => (
            link.type === 'anchor' ? (
              <a key={link.href} href={link.href} className="hdr__drawer-link"
                onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            ) : (
              <NavLink key={link.label} to={link.to} end={link.to === '/'}
                className="hdr__drawer-link" onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            )
          ))}
        </nav>

        <div className="hdr__drawer-products">
          <p className="hdr__mega-title">Catalogue</p>
          {products.map((p) => (
            <NavLink key={p.id} to={`/product/${p.id}`} className="hdr__drawer-product"
              onClick={() => setMenuOpen(false)}>
              <img src={p.image} alt="" loading="lazy" />
              <span className="hdr__drawer-product-body">
                <span className="hdr__drawer-product-title">{p.title}</span>
                <span className="hdr__drawer-product-price">{p.price}</span>
              </span>
            </NavLink>
          ))}
        </div>

        <div className="hdr__drawer-foot">
          {user ? (
            <>
              <div className="hdr__drawer-user">
                <span className="hdr__avatar" aria-hidden="true">
                  {initialsOf(user.name || user.email)}
                </span>
                <span className="hdr__drawer-user-body">
                  <span className="hdr__acct-name">{displayName}</span>
                  {user.email && <span className="hdr__acct-email">{user.email}</span>}
                </span>
              </div>
              <NavLink to="/orders" className="hdr__drawer-util" onClick={() => setMenuOpen(false)}>
                <PackageSearch size={18} /> My orders
              </NavLink>
              <NavLink to="/track-order" className="hdr__drawer-util" onClick={() => setMenuOpen(false)}>
                <Truck size={18} /> Track order
              </NavLink>
              <button type="button" className="hdr__drawer-util hdr__drawer-util--danger"
                onClick={handleSignOut}>
                <LogOut size={18} /> Sign out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/track-order" className="hdr__drawer-util" onClick={() => setMenuOpen(false)}>
                <Truck size={18} /> Track order
              </NavLink>
              <NavLink to="/signin" className="hdr__drawer-util" onClick={() => setMenuOpen(false)}>
                <User size={18} /> Sign in
              </NavLink>
            </>
          )}
          <NavLink to="/cart" className="hdr__drawer-util" onClick={() => setMenuOpen(false)}>
            <ShoppingBag size={18} /> Cart {count > 0 ? `(${count})` : ''}
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header
