import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import Seo from './Seo'
import './LegalPage.css'

/* Shared template for long-form legal/policy pages (refund, shipping,
   privacy, terms, press). Keeps the cream/ink design language from
   About/Contact but skips the heavy hero animation — these are reference
   pages people scan, not marketing surfaces. */
function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections = [],
  contact,
  seoTitle,
  seoPath,
  seoDescription,
}) {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="zl-page zl-legal">
      <Seo title={seoTitle} path={seoPath} description={seoDescription} />

      <header className="zl-legal__head">
        <div className="zl-legal__head-inner">
          {eyebrow && <span className="zl-legal__eyebrow">{eyebrow}</span>}
          <h1 className="zl-legal__title">{title}</h1>
          {updated && <p className="zl-legal__updated">Last updated {updated}</p>}
          {intro && <p className="zl-legal__intro">{intro}</p>}
        </div>
      </header>

      <main className="zl-legal__body">
        {sections.map((s) => (
          <section className="zl-legal__section" key={s.heading}>
            <h2>{s.heading}</h2>
            {s.paragraphs && s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            {s.list && (
              <ul>
                {s.list.map((li, i) => <li key={i}>{li}</li>)}
              </ul>
            )}
          </section>
        ))}

        {contact && (
          <section className="zl-legal__contact">
            <h2>Contact us</h2>
            <p>{contact.lead}</p>
            <ul className="zl-legal__contact-list">
              {contact.items.map((c) => (
                <li key={c.href}>
                  <span>{c.label}</span>
                  <a href={c.href}>{c.value}</a>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="zl-btn zl-btn--ghost zl-legal__contact-cta">
              Or use the contact form
            </Link>
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

export default LegalPage
