import { useEffect, useRef, useState } from 'react'
import BankerHeader from './components/BankerHeader.jsx'
import ReviewModal from './components/ReviewModal.jsx'
import {
  IconArrowRight,
  IconCheck,
  IconLock,
  IconPencil,
  IconSparkles,
} from './components/Icons.jsx'

const SAMPLE_NOTES =
  "My car needs repairs and I need it to drive to work. I got a mechanic estimate for around $8,000 or $9,000 but I'm waiting on the final estimate. I'm not sure exactly what to ask for yet."

const UNDERSTOOD = [
  'A loan for car repairs, so you can keep getting to work',
  "Your mechanic's estimate is around $8,000–$9,000",
  "That estimate isn't final yet — you're waiting on the confirmed quote",
  "You're not sure of the exact amount to ask for",
]

const THINK_MS = 700

// Mock of the AI drafting step. The draft is assembled only from the
// borrower's own facts, and the amount always stays approximate.
function buildDraft(amountChoice) {
  const uncertaintyNote =
    amountChoice === 'approximate' ? ', so the exact amount may change' : ''
  return (
    "Hi Jordan, I'm looking into a loan to help repair my car, which I rely on to get to work. " +
    `I have an initial estimate of about $8,000–$9,000, but I'm still waiting on the final quote${uncertaintyNote}. ` +
    "I'd like to understand what options may be available."
  )
}

function excerpt(text, max = 64) {
  const t = text.trim().replace(/\s+/g, ' ')
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export default function App() {
  // compose | clarify | draft | sent
  const [step, setStep] = useState('compose')
  const [notes, setNotes] = useState(SAMPLE_NOTES)
  // null | 'approximate' | 'exact'
  const [amountChoice, setAmountChoice] = useState(null)
  const [draft, setDraft] = useState('')
  const [reviewOpen, setReviewOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const headingRef = useRef(null)
  const mountedRef = useRef(false)

  // Move focus to the step heading on each transition so keyboard and
  // screen-reader users land on the new content.
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    headingRef.current?.focus()
  }, [step])

  // Brief simulated "organizing" beat where a real AI call would happen.
  function simulate(next) {
    setBusy(true)
    window.setTimeout(() => {
      setBusy(false)
      next()
    }, THINK_MS)
  }

  const startClarify = () => simulate(() => setStep('clarify'))

  const startDraft = (choice) =>
    simulate(() => {
      setDraft(buildDraft(choice))
      setStep('draft')
    })

  function resetAll() {
    setStep('compose')
    setNotes(SAMPLE_NOTES)
    setAmountChoice(null)
    setDraft('')
  }

  return (
    <div className="shell">
      <header className="sk-nav" aria-hidden="true">
        <span className="sk sk-logo" />
        <span className="sk sk-nav-item" />
        <span className="sk sk-nav-item" style={{ width: 72 }} />
        <span className="sk sk-nav-item" style={{ width: 48 }} />
        <span className="sk-spacer" />
        <span className="sk sk-avatar" />
      </header>

      <div className="shell-body">
        <aside className="sk-side" aria-hidden="true">
          {['72%', '54%', '66%', '48%'].map((w) => (
            <span className="sk" style={{ width: w }} key={`a-${w}`} />
          ))}
          <span className="sk-side-gap" />
          {['60%', '70%', '44%'].map((w) => (
            <span className="sk" style={{ width: w }} key={`b-${w}`} />
          ))}
        </aside>

        <div className="stage">
          <div className="sk-page" aria-hidden="true">
            <div className="sk-page-head">
              <span className="sk sk-title" />
              <span className="sk sk-action" />
            </div>
            <div className="sk-cols">
              <div className="sk-panel">
                {['56%', '84%', '72%', '64%'].map((w) => (
                  <span className="sk" style={{ width: w }} key={w} />
                ))}
              </div>
              <div className="sk-panel">
                {['78%', '52%', '88%', '60%'].map((w) => (
                  <span className="sk" style={{ width: w }} key={w} />
                ))}
              </div>
            </div>
          </div>

          <main className="card">
            <BankerHeader />

        {step === 'compose' && (
          <section className="step" key="compose">
            <h1 className="step-heading" tabIndex={-1} ref={headingRef}>
              What's the loan for?
            </h1>
            <p className="step-sub">
              Jot it down however it comes out — I'll help you turn it into a
              message for Jordan. Rough notes are fine.
            </p>
            <label className="field-label" htmlFor="notes">
              Your notes
            </label>
            <textarea
              id="notes"
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p className="hint icon-hint privacy-hint">
              <IconLock size={15} />
              <span>
                Skip SSNs, account numbers, and card details — Jordan doesn't
                need them here.
              </span>
            </p>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={startClarify}
                disabled={busy || !notes.trim()}
                aria-busy={busy}
              >
                {busy ? (
                  <span className="spinner" aria-hidden="true" />
                ) : (
                  <IconSparkles size={17} />
                )}
                Help me make this clear
              </button>
              <p className="hint">
                I only organize what you write. I don't add details, and
                nothing is sent unless you choose to send it.
              </p>
            </div>
          </section>
        )}

        {step === 'clarify' && (
          <section className="step" key="clarify">
            {amountChoice === null ? (
              <>
                <div className="panel notes-row">
                  <span className="notes-quote">
                    Your notes: "{excerpt(notes)}"
                  </span>
                  <button
                    type="button"
                    className="link-btn"
                    onClick={() => setStep('compose')}
                  >
                    <IconPencil size={14} /> Edit
                  </button>
                </div>
                <div className="panel panel-ai">
                  <h1 className="panel-heading" tabIndex={-1} ref={headingRef}>
                    <IconSparkles size={15} /> Here's what I understood
                  </h1>
                  <ul className="understood-list">
                    {UNDERSTOOD.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <p className="hint">
                    Pulled straight from your words — I haven't added anything.
                  </p>
                </div>
              </>
            ) : (
              <p className="condensed">
                <IconCheck size={15} />
                <span>
                  Understood: car repairs · about $8,000–$9,000 · estimate not
                  final
                </span>
              </p>
            )}

            <fieldset className="question">
              <legend>
                One optional thing — the amount isn't final. Want me to note
                that?
              </legend>
              <div className="radio-group">
                <label
                  className={`radio ${
                    amountChoice === 'approximate' ? 'checked' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="amount"
                    value="approximate"
                    checked={amountChoice === 'approximate'}
                    onChange={() => setAmountChoice('approximate')}
                  />
                  <span>Note that the amount is approximate</span>
                </label>
                {amountChoice === 'approximate' && (
                  <p className="chip">
                    Will read: "about $8,000–$9,000, still waiting on the final
                    quote"
                  </p>
                )}
                <label
                  className={`radio ${
                    amountChoice === 'exact' ? 'checked' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="amount"
                    value="exact"
                    checked={amountChoice === 'exact'}
                    onChange={() => setAmountChoice('exact')}
                  />
                  <span>I'll give an exact amount</span>
                </label>
              </div>
            </fieldset>

            {amountChoice !== null && (
              <p className="hint">You can change this anytime.</p>
            )}

            <div className="btn-row">
              {amountChoice === null ? (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => startDraft(null)}
                    disabled={busy}
                  >
                    Skip for now
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => startDraft(amountChoice)}
                    disabled={busy}
                    aria-busy={busy}
                  >
                    {busy && <span className="spinner" aria-hidden="true" />}
                    Draft my message
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setAmountChoice(null)}
                    disabled={busy}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => startDraft(amountChoice)}
                    disabled={busy}
                    aria-busy={busy}
                  >
                    {busy ? (
                      <span className="spinner" aria-hidden="true" />
                    ) : null}
                    Draft my message
                    {!busy && <IconArrowRight size={16} />}
                  </button>
                </>
              )}
            </div>
          </section>
        )}

        {step === 'draft' && (
          <section className="step" key="draft">
            <h1 className="step-heading" tabIndex={-1} ref={headingRef}>
              Here's your draft
            </h1>
            <p className="step-sub">
              Edit anything — it's your message. I used only what you told me.
            </p>
            <label className="sr-only" htmlFor="draft">
              Your draft message
            </label>
            <textarea
              id="draft"
              className="draft-area"
              rows={8}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setReviewOpen(true)}
                disabled={!draft.trim()}
              >
                Review &amp; send
              </button>
            </div>
          </section>
        )}

        {step === 'sent' && (
          <section className="step" key="sent">
            <div className="sent-hero">
              <span className="sent-check" aria-hidden="true">
                <IconCheck size={24} />
              </span>
              <h1 className="step-heading" tabIndex={-1} ref={headingRef}>
                Message sent
              </h1>
              <p className="hint sent-meta">Sent to Jordan Lee · First National</p>
            </div>
            <div className="panel message-preview">{draft}</div>
            <p className="hint reply-hint">Jordan can reply here.</p>
            <div className="btn-row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={resetAll}
              >
                Done
              </button>
            </div>
          </section>
        )}
          </main>

          <p className="demo-note">
            Demo prototype — messages aren't actually sent or stored.
          </p>
        </div>
      </div>

      {reviewOpen && (
        <ReviewModal
          draft={draft}
          onClose={() => setReviewOpen(false)}
          onSend={() => {
            setReviewOpen(false)
            setStep('sent')
          }}
        />
      )}
    </div>
  )
}
