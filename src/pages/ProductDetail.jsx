import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, ExternalLink, FileCheck2, Minus, Plus, ShoppingBag, X } from 'lucide-react'
import { products, getProductById } from './dealsProducts'
import { useCart } from '../context/cart-context'
import SiteFooter from '../components/SiteFooter'
import Seo from '../components/Seo'
import { Stars } from '../components/ui'
import './ProductDetail.css'

const RESEARCH_DISCLAIMER =
  'FOR RESEARCH PURPOSES ONLY. Not intended for human or veterinary use. Not intended to diagnose, treat, cure, or prevent any disease. Products are supplied strictly for laboratory and analytical research conducted by qualified professionals.'

/* Review counts are display copy that accompanies the catalogue rather than
   living in it, so they're keyed by product id here. */
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

const SITE = 'https://zyralabs.com'
// Bundled asset paths are root-relative (/assets/…); make them absolute for schema.
const absolute = (src) => (src && src.startsWith('/') ? `${SITE}${src}` : src)

/* The Janoshik result as a card: batch, fill, purity and the assay table.
   Shown inline on the page and inside the certificate modal. */
const JanoshikCard = ({ janoshik }) => (
  <div className="pd-janoshik-card">
    <div className="pd-janoshik-card__head">
      <h3>Janoshik Third-Party Lab Analysis</h3>
      <p>Independently tested and verified by Janoshik Analytical.</p>
    </div>

    <div className="pd-janoshik-stats">
      <div className="pd-janoshik-stat">
        <span>Batch Number</span>
        <strong>{janoshik.batchNumber}</strong>
      </div>
      <div className="pd-janoshik-stat">
        <span>Fill Volume</span>
        <strong>{janoshik.fillVolume}</strong>
      </div>
      {janoshik.purity && (
        <div className="pd-janoshik-stat">
          <span>Purity</span>
          <strong>{janoshik.purity}</strong>
        </div>
      )}
    </div>

    <table className="pd-janoshik-table">
      <thead>
        <tr>
          <th>Compound</th>
          <th>Concentration</th>
          <th>Verified Content</th>
        </tr>
      </thead>
      <tbody>
        {janoshik.rows.map((row) => (
          <tr key={row.compound}>
            <td>{row.compound}</td>
            <td>{row.concentration}</td>
            <td>{row.verifiedContent}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {janoshik.note && <p className="pd-janoshik-note">{janoshik.note}</p>}
  </div>
)

/* Certificate modal. A native <dialog> gives focus trapping, Escape-to-close
   and the top layer for free. If a product's janoshik data carries an
   `image` (a scan of the certificate), it is shown above the results.
   Janoshik's own page refuses to be framed, so it opens in a new tab. */
const CoaModal = ({ open, onClose, title, janoshik }) => {
  const ref = useRef(null)

  useEffect(() => {
    const dlg = ref.current
    if (!dlg) return undefined
    if (open && !dlg.open) dlg.showModal()
    if (!open && dlg.open) dlg.close()
    if (!open) return undefined
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => { html.style.overflow = prev }
  }, [open])

  return (
    <dialog
      ref={ref}
      className="pd-coa"
      aria-labelledby="pd-coa-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose() }}
    >
      <div className="pd-coa__panel">
        <header className="pd-coa__head">
          <div>
            <span className="pd-coa__eyebrow"><FileCheck2 size={14} /> Certificate of analysis</span>
            <h2 id="pd-coa-title">{title}</h2>
          </div>
          <button type="button" className="pd-coa__close" onClick={onClose} aria-label="Close certificate">
            <X size={20} />
          </button>
        </header>

        <div className="pd-coa__body">
          {janoshik.image && (
            <img className="pd-coa__scan" src={janoshik.image} alt={`Janoshik certificate for ${title}`} />
          )}
          <JanoshikCard janoshik={janoshik} />
        </div>

        <footer className="pd-coa__foot">
          <a className="zk-btn pd-coa__verify" href={janoshik.reportUrl} target="_blank" rel="noopener noreferrer">
            <span className="zk-btn__fill" aria-hidden="true" />
            <span>Verify on Janoshik</span>
            <ExternalLink size={16} />
          </a>
          <button type="button" className="pd-coa__dismiss" onClick={onClose}>Continue to product</button>
        </footer>
      </div>
    </dialog>
  )
}

function ProductDetail() {
  const { id } = useParams()
  const product = getProductById(id)
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [activeTab, setActiveTab] = useState(0)
  const [coaOpen, setCoaOpen] = useState(false)

  /* Every product with a Janoshik report opens on its certificate, so the
     third-party result is the first thing a visitor sees. Re-runs when the
     id changes (related-product links reuse this component). */
  const hasCoa = Boolean(product?.janoshik)
  useEffect(() => {
    setCoaOpen(false)
    if (!hasCoa) return undefined
    const t = setTimeout(() => setCoaOpen(true), 450)
    return () => clearTimeout(t)
  }, [id, hasCoa])

  /* The packshot leads, then the detail photography. Sourcing the first frame
     from `image` keeps this page showing the same artwork as the card that was
     clicked to reach it, for every product and without a second list to keep
     in step. */
  const gallery = useMemo(() => {
    if (!product) return []
    const rest = (product.gallery || []).filter((src) => src !== product.image)
    return [product.image, ...rest]
  }, [product])

  const related = useMemo(
    () => products.filter((p) => p.id !== id).slice(0, 3),
    [id],
  )

  const reviewCount = PRODUCT_REVIEWS[id] || 184

  if (!product) {
    return (
      <div className="pd-page">
        <Seo title="Product not found" path={`/product/${id}`} noindex />
        <div className="pd-page__inner pd-missing">
          <h1>Product not found</h1>
          <p>The product you’re looking for doesn’t exist or was removed.</p>
          <Link className="zk-btn" to="/services">
            <span className="zk-btn__fill" aria-hidden="true" />
            <ArrowLeft size={16} /> <span>Back to products</span>
          </Link>
        </div>
        <SiteFooter />
      </div>
    )
  }

  const infoTabs = [
    product.packageContents && {
      label: 'Package Contents',
      content: (
        <ul className="pd-tabs__list">
          {product.packageContents.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    },
    product.storageLogic && { label: 'Storage Logic', content: <p>{product.storageLogic}</p> },
  ].filter(Boolean)

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image,
      qty,
    })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  const priceValue = String(product.price).replace(/[^0-9.]/g, '')
  const productUrl = `${SITE}/product/${product.id}`
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.title,
        description: product.description,
        image: gallery.map(absolute),
        sku: product.id,
        brand: { '@type': 'Brand', name: 'Zyra Labs' },
        offers: {
          '@type': 'Offer',
          url: productUrl,
          priceCurrency: 'USD',
          price: priceValue,
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE}/services` },
          { '@type': 'ListItem', position: 3, name: product.title, item: productUrl },
        ],
      },
    ],
  }

  return (
    <div className="pd-page">
      <Seo
        title={product.title}
        path={`/product/${product.id}`}
        type="product"
        image={absolute(product.image)}
        description={`${product.subtitle} — ${product.description}`.slice(0, 160)}
        jsonLd={productJsonLd}
      />
      <div className="pd-page__inner">
        <nav className="pd-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/services">Products</Link>
          <span aria-hidden="true">/</span>
          <span className="pd-crumbs__current">{product.title}</span>
        </nav>

        <section className="pd-hero">
          <div className="pd-gallery">
            <div className="pd-gallery__main">
              <img
                key={activeImg}
                src={gallery[activeImg] || product.image}
                alt={product.title}
              />
            </div>
            {gallery.length > 1 && (
              <div className="pd-gallery__thumbs" role="tablist" aria-label="Product images">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    role="tab"
                    aria-selected={activeImg === i}
                    aria-label={`Show image ${i + 1}`}
                    className={`pd-gallery__thumb ${activeImg === i ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveImg(i)}
                    onFocus={() => setActiveImg(i)}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pd-hero__body">
            <span className="pd-eyebrow">{product.subtitle}</span>
            <h1 className="pd-title">{product.title}</h1>

            <div className="pd-rating">
              <Stars size={15} />
              <strong>4.9</strong>
              <span aria-hidden="true">|</span>
              <span>{reviewCount} reviews</span>
            </div>

            <p className="pd-desc">{product.description}</p>

            {product.highlights && product.highlights.length > 0 && (
              <ul className="pd-tags">
                {product.highlights.slice(0, 4).map((h) => (
                  <li className="zk-tag" key={h}>{h}</li>
                ))}
              </ul>
            )}

            <div className="pd-price">{product.price}</div>

            <p className="pd-safety">
              <strong>Research Use Disclaimer:</strong> {RESEARCH_DISCLAIMER}
            </p>

            <div className="pd-actions">
              <div className="pd-qty" aria-label="Quantity">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button
                type="button"
                className={`zk-btn zk-btn--lg pd-add ${added ? 'is-added' : ''}`}
                onClick={handleAdd}
              >
                <span className="zk-btn__fill" aria-hidden="true" />
                {added ? (
                  <>
                    <Check size={17} /> <span>Added to cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={17} /> <span>Add to cart</span>
                  </>
                )}
              </button>
            </div>
            <p className="pd-safety pd-safety--compact">
              For research purposes only — not for human or veterinary use.
            </p>

            <dl className="pd-specs">
              {Object.entries(product.specs).map(([k, v]) => (
                <div key={k} className="pd-specs__row">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>

            {product.janoshik && (
              <div className="pd-janoshik">
                <a
                  className="pd-janoshik__link"
                  href={product.janoshik.reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileCheck2 size={15} /> View Janoshik Analytical Report
                </a>

                <button type="button" className="pd-janoshik__open" onClick={() => setCoaOpen(true)}>
                  View certificate
                </button>

                <JanoshikCard janoshik={product.janoshik} />
              </div>
            )}

            {infoTabs.length > 0 && (
              <div className="pd-tabs">
                <div className="pd-tabs__nav" role="tablist" aria-label="Product information">
                  {infoTabs.map((tab, i) => (
                    <button
                      key={tab.label}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === i}
                      className={`pd-tabs__btn ${activeTab === i ? 'is-active' : ''}`}
                      onClick={() => setActiveTab(i)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="pd-tabs__panel">{infoTabs[activeTab]?.content}</div>
              </div>
            )}

            <p className="pd-safety pd-safety--footer">{RESEARCH_DISCLAIMER}</p>
          </div>
        </section>

        <section className="pd-related" aria-labelledby="pd-related-heading">
          <div className="pd-related__head">
            <span className="pd-eyebrow">also explore</span>
            <h2 id="pd-related-heading">Related products</h2>
          </div>
          <div className="pd-related__grid">
            {related.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="pd-related-card">
                <div className="pd-related-card__media">
                  <img src={p.image} alt={p.title} />
                </div>
                <div className="pd-related-card__info">
                  <span className="pd-related-card__subtitle">{p.subtitle}</span>
                  <h3 className="pd-related-card__title">{p.title}</h3>
                  <span className="pd-related-card__price">{p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />

      {product.janoshik && (
        <CoaModal
          open={coaOpen}
          onClose={() => setCoaOpen(false)}
          title={product.title}
          janoshik={product.janoshik}
        />
      )}
    </div>
  )
}

export default ProductDetail
