import { useState } from 'react'
import { submitFeedback } from '../lib/api'
import { trackFeedback } from '../lib/analytics'

export default function FeedbackWidget() {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState('suggestion')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('sending')
    try {
      await submitFeedback(type, message.trim(), window.location.pathname)
      trackFeedback('submit', { type })
      setStatus('sent')
      setMessage('')
      setTimeout(() => {
        setOpen(false)
        setStatus(null)
      }, 1500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        onClick={() => { setOpen(true); trackFeedback('open') }}
        aria-label="Send feedback"
        className="fixed bottom-4 left-4 z-50 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors"
        style={{ background: 'var(--da-teal)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30" onClick={() => setOpen(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Send Feedback</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600" aria-label="Close feedback">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {status === 'sent' ? (
              <p className="text-center py-8 font-medium" style={{ color: 'var(--da-success)' }}>Thanks for your feedback!</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex gap-2 mb-4">
                  {['suggestion', 'bug', 'praise'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(t)}
                      className="px-3 py-1.5 rounded-full text-sm font-medium capitalize transition-colors"
                      style={{
                        background: type === t ? 'var(--da-teal)' : 'var(--da-surface)',
                        color: type === t ? 'var(--da-text-on-teal)' : 'var(--da-text-secondary)',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you think..."
                  rows={4}
                  className="w-full rounded-lg p-3 text-sm outline-none resize-none"
                  style={{ border: '1px solid var(--da-border)', background: 'var(--da-bg)' }}
                  required
                />
                {status === 'error' && (
                  <p className="text-sm mt-1" style={{ color: 'var(--da-error)' }}>Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending' || !message.trim()}
                  className="mt-3 w-full text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  style={{ background: 'var(--da-teal)' }}
                >
                  {status === 'sending' ? 'Sending...' : 'Submit'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
