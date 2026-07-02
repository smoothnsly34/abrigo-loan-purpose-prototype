import { useEffect, useRef } from 'react'
import { IconInfo } from './Icons.jsx'

export default function ReviewModal({ draft, onClose, onSend }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(onClose)
  closeRef.current = onClose

  useEffect(() => {
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement
    dialog.focus()

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeRef.current()
        return
      }
      if (e.key !== 'Tab') return
      const focusables = Array.from(dialog.querySelectorAll('button'))
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === dialog)
      ) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = prevOverflow
      if (previouslyFocused?.focus && document.contains(previouslyFocused)) {
        previouslyFocused.focus()
      }
    }
  }, [])

  return (
    <div
      className="overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
        aria-describedby="review-sub"
        tabIndex={-1}
        ref={dialogRef}
      >
        <h2 id="review-title" className="modal-heading">
          Review your message
        </h2>
        <p id="review-sub" className="step-sub">
          This is exactly what Jordan will see.
        </p>
        <p className="field-label">To</p>
        <p className="to-line">Jordan Lee · your banker</p>
        <div className="panel message-preview">{draft}</div>
        <p className="hint icon-hint send-hint">
          <IconInfo size={15} />
          <span>Nothing's sent until you tap Send to banker.</span>
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={onSend}>
            Send to banker
          </button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Back to edit
          </button>
        </div>
      </div>
    </div>
  )
}
