import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Landmark, Upload, FileText, CircleCheck, Clock, CircleAlert, Loader2 } from 'lucide-react'
import {
  paymentCaptureValidate,
  paymentCaptureApplyPromo,
  paymentCaptureUpload,
  ApiError,
} from '../lib/api'
import SiteFooter from '../components/SiteFooter'
import './Cart.css'
import './PaymentCapture.css'

const fmt = (n) => `$${Number(n || 0).toFixed(2)}`

const pick = (row, keys, fallback = '') => {
  for (const k of keys) {
    if (row && row[k] != null && row[k] !== '') return row[k]
  }
  return fallback
}

/* Result of a screenshot upload — 200/ok:true does not mean the payment was
   approved, so the UI branches on payment_status, not on request success. */
function UploadOutcome({ result, onUploadAnother }) {
  const status = result.payment_status

  if (status === 'received') {
    return (
      <div className="zl-pc-outcome">
        <span className="zl-chip zl-chip--ok">
          <CircleCheck size={14} /> Payment confirmed
        </span>
        <p>
          Thanks — we&apos;ve verified your payment and your order is now being processed.
          You&apos;ll receive a confirmation shortly.
        </p>
      </div>
    )
  }

  if (status === 'pending') {
    return (
      <div className="zl-pc-outcome">
        <span className="zl-chip zl-chip--wait">
          <Clock size={14} /> Pending review
        </span>
        <p>
          We&apos;ve received your screenshot and it&apos;s queued for manual review.
          We&apos;ll confirm your payment as soon as it&apos;s checked.
        </p>
      </div>
    )
  }

  return (
    <div className="zl-pc-outcome">
      <span className="zl-chip zl-chip--bad">
        <CircleAlert size={14} /> Couldn&apos;t verify payment
      </span>
      <p>
        {result.verification_error ||
          "We couldn't automatically verify this screenshot. Please upload a clearer image of your payment confirmation."}
      </p>
      <button type="button" className="zl-btn-ghost" onClick={onUploadAnother}>
        Upload again
      </button>
    </div>
  )
}

function PaymentCapture() {
  const { token } = useParams()

  const [state, setState] = useState({ status: 'loading', data: null, error: null })

  const validate = useCallback(async () => {
    // TEMP: the header's "Payment page" preview button links here with no
    // real order behind it — short-circuit with sample data instead of
    // hitting the backend, so the designed page is visible without a real
    // token. Remove alongside that header link once no longer needed.
    if (token === 'preview') {
      setState({
        status: 'ready',
        data: {
          order: { order_number: 'ZYR-8K3F2-A91', total: 189.5 },
          items: [],
          payments: [],
          allowPromo: true,
          bank: {
            payeeName: 'HSA INTERPAY UK',
            sortCode: '60-95-61',
            accountNumber: '21327124',
            reference: 'ZYR-8K3F2-A91',
          },
        },
        error: null,
      })
      return
    }
    setState({ status: 'loading', data: null, error: null })
    try {
      const res = await paymentCaptureValidate(token)
      setState({ status: 'ready', data: res, error: null })
    } catch (err) {
      const invalid = err instanceof ApiError && (err.status === 400 || err.status === 404)
      setState({
        status: invalid ? 'invalid' : 'error',
        data: null,
        error: (err && err.message) || 'Something went wrong. Please try again.',
      })
    }
  }, [token])

  useEffect(() => {
    // setState happens inside validate() — data-fetch is the entire point of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    validate()
  }, [validate])

  // ---------- Promo code ----------
  const [promoInput, setPromoInput] = useState('')
  const [promo, setPromo] = useState(null) // { promoCode, promoDiscountPercent, discountAmount, total }
  const [promoLoading, setPromoLoading] = useState(false)
  const [promoError, setPromoError] = useState(null)

  const applyPromo = async () => {
    const code = promoInput.trim().toUpperCase()
    if (!code) {
      setPromoError('Enter a code.')
      return
    }
    setPromoLoading(true)
    setPromoError(null)
    try {
      const res = await paymentCaptureApplyPromo({ token, promoCode: code })
      setPromo(res)
    } catch (err) {
      setPromoError((err && err.message) || 'Could not apply that code.')
    } finally {
      setPromoLoading(false)
    }
  }

  // ---------- Screenshot upload ----------
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const [uploadResult, setUploadResult] = useState(null)

  const onFileChange = (e) => {
    setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)
    setUploadError(null)
  }

  const submitScreenshot = async (e) => {
    e.preventDefault()
    if (uploading) return
    if (!file) {
      setUploadError('Choose a screenshot of your transfer first.')
      return
    }
    setUploading(true)
    setUploadError(null)
    try {
      const res = await paymentCaptureUpload({ token, file })
      setUploadResult(res)
    } catch (err) {
      setUploadError((err && err.message) || 'Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const uploadAnother = () => {
    setUploadResult(null)
    setFile(null)
    setUploadError(null)
  }

  if (state.status === 'loading') {
    return (
      <div className="zl-shop-page">
        <div className="zl-shop-page__inner">
          <div className="zl-pc-status">
            <span className="zl-pc-status__icon zl-pc-status__icon--loading" aria-hidden="true">
              <Loader2 size={24} className="zl-spin" />
            </span>
            <p className="zl-orders__hint">Loading your payment details…</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  if (state.status === 'invalid') {
    return (
      <div className="zl-shop-page">
        <div className="zl-shop-page__inner">
          <div className="zl-shop-page__head">
            <div>
              <p className="zl-eyebrow">Payment link</p>
              <h1 className="zl-shop-page__title">This link is invalid or has expired</h1>
            </div>
            <Link to="/" className="zl-shop-page__back">← Back to home</Link>
          </div>
          <div className="zl-pc-status">
            <span className="zl-pc-status__icon zl-pc-status__icon--bad" aria-hidden="true">
              <CircleAlert size={24} />
            </span>
            <p className="zl-orders__hint">
              The payment link you followed is no longer valid — it may have already been used,
              or it&apos;s expired. Please contact us if you still need to complete a payment.
            </p>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="zl-shop-page">
        <div className="zl-shop-page__inner">
          <div className="zl-shop-page__head">
            <div>
              <p className="zl-eyebrow">Payment link</p>
              <h1 className="zl-shop-page__title">Something went wrong</h1>
            </div>
            <Link to="/" className="zl-shop-page__back">← Back to home</Link>
          </div>
          <div className="zl-pc-status">
            <span className="zl-pc-status__icon zl-pc-status__icon--bad" aria-hidden="true">
              <CircleAlert size={24} />
            </span>
            <p className="zl-error">{state.error}</p>
          </div>
        </div>
        <SiteFooter />
      </div>
    )
  }

  const { order = {}, allowPromo, bank = {} } = state.data || {}
  const orderNumber = pick(order, ['order_number', 'orderNumber', 'orderId', 'id'])
  const baseTotal = pick(order, ['total', 'total_amount'], 0)
  const amountDue = promo && promo.total != null ? promo.total : baseTotal

  return (
    <div className="zl-shop-page">
      <div className="zl-shop-page__inner">
        <div className="zl-shop-page__head">
          <div>
            <p className="zl-eyebrow">Complete your payment</p>
            <h1 className="zl-shop-page__title">Order {orderNumber || '—'}</h1>
          </div>
          <Link to="/" className="zl-shop-page__back">← Back to home</Link>
        </div>

        <div className="zl-shop-grid">
          <div className="zl-checkout-form zl-pc-form">
            <section className="zl-checkout-form__section zl-pc-bank">
              <h2><span className="zl-pc-icon-badge"><Landmark size={18} /></span> Bank transfer details</h2>
              <dl className="zl-pc-bank__rows">
                <div>
                  <dt>Payee name</dt>
                  <dd>{bank.payeeName || '—'}</dd>
                </div>
                <div>
                  <dt>Sort code</dt>
                  <dd>{bank.sortCode || '—'}</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd>{bank.accountNumber || '—'}</dd>
                </div>
                <div>
                  <dt>Reference</dt>
                  <dd>{bank.reference || '—'}</dd>
                </div>
              </dl>
            </section>

            {allowPromo && (
              <section className="zl-checkout-form__section">
                <h2>Promo code</h2>
                {promo ? (
                  <div className="zl-promo__applied">
                    <span>
                      <strong>{promo.promoCode}</strong>
                      <span className="zl-promo__pct"> · {promo.promoDiscountPercent}% off</span>
                    </span>
                  </div>
                ) : (
                  <div className="zl-promo__row">
                    <input
                      className="zl-input zl-promo__input"
                      placeholder="Discount code"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') { e.preventDefault(); applyPromo() }
                      }}
                    />
                    <button
                      type="button"
                      className="zl-promo__apply"
                      onClick={applyPromo}
                      disabled={promoLoading}
                    >
                      {promoLoading ? '…' : 'Apply'}
                    </button>
                  </div>
                )}
                {promoError && <p className="zl-promo__msg zl-promo__msg--err">{promoError}</p>}
              </section>
            )}

            <section className="zl-checkout-form__section zl-pc-upload-section">
              <h2><span className="zl-pc-icon-badge"><Upload size={18} /></span> Upload proof of payment</h2>
              {uploadResult ? (
                <UploadOutcome result={uploadResult} onUploadAnother={uploadAnother} />
              ) : (
                <form onSubmit={submitScreenshot} noValidate className="zl-pc-upload">
                  <p className="zl-note">
                    Once you&apos;ve made the bank transfer, upload a screenshot of your payment
                    confirmation and we&apos;ll verify it.
                  </p>
                  <label className={`zl-pc-dropzone ${file ? 'has-file' : ''}`}>
                    <input
                      className="zl-pc-dropzone__input"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={onFileChange}
                      disabled={uploading}
                      aria-label="Choose a screenshot of your transfer"
                    />
                    <FileText size={20} className="zl-pc-dropzone__icon" aria-hidden="true" />
                    <span className="zl-pc-dropzone__text">
                      {file ? file.name : 'Choose a screenshot of your transfer'}
                    </span>
                  </label>
                  {uploadError && <p className="zl-error">{uploadError}</p>}
                  <button
                    type="submit"
                    className="zl-btn-solid"
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading…' : 'Submit screenshot'}
                  </button>
                </form>
              )}
            </section>
          </div>

          <aside className="zl-summary zl-pc-summary">
            <h2 className="zl-summary__title">Amount due</h2>
            <dl className="zl-summary__rows">
              {promo && (
                <div>
                  <dt>Subtotal</dt>
                  <dd>{fmt(baseTotal)}</dd>
                </div>
              )}
              {promo && (
                <div>
                  <dt>Discount ({promo.promoCode})</dt>
                  <dd className="zl-summary__discount">−{fmt(promo.discountAmount)}</dd>
                </div>
              )}
              <div className="zl-summary__divider" aria-hidden="true" />
              <div className="zl-summary__total">
                <dt>Total due</dt>
                <dd>{fmt(amountDue)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  )
}

export default PaymentCapture
