# Loan purpose message — prototype

A lightweight UX prototype of an AI-assisted flow that helps a borrower turn rough notes into a clear loan-purpose message for their banker.

Built for the Abrigo Product Builder (UX) take-home exercise. Vite + React, client-only — no backend, no real AI call, and nothing is actually sent.

**Live demo:** https://abrigo-loan-purpose-prototype.vercel.app

## The flow — 6 states

1. **Composer** — the borrower jots rough notes in their own words
2. **Here's what I understood** — the AI helper reflects the notes back as grounded bullets, plus one optional question about the unconfirmed amount
3. **Amount marked approximate** — the borrower chooses to note the amount is an estimate; a preview chip shows exactly how it will read
4. **Draft** — an editable draft built only from the borrower's words, with the uncertainty preserved
5. **Review** — a modal showing exactly what the banker will see; nothing is sent until the borrower taps "Send to banker"
6. **Sent** — a simple confirmation with no approval implication; the banker can reply in-thread

## Product principles

- **Uncertainty survives the flow.** The estimate stays an approximate range ("about $8,000–$9,000") end to end — the AI never hardens it into a confirmed amount.
- **The AI only organizes.** It reflects the borrower's own words, asks one optional question, and never adds details.
- **The user owns the message.** The draft is fully editable, the review modal shows the exact final text, and sending is always an explicit user action.
- A non-AI path (sending your own words as-is) belongs in the full product; it's intentionally outside this prototype's single happy path.

## What's mocked

- The "understood" bullets and the drafted message are deterministic stand-ins for an AI response — no model call is made.
- "Send to banker" transitions the UI only; no message is transmitted or stored.

## Run locally

```bash
npm install
npm run dev
```
