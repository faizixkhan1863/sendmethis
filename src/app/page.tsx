'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Send,
  Loader2,
  Check,
  KeyRound,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  Mail,
  Users,
} from 'lucide-react'

type Status = 'idle' | 'sending' | 'sent'

const PROFILES = [
  { initials: 'M', name: 'Maryam', role: 'SDR', gradient: 'from-blue-500 to-sky-400' },
  { initials: 'N', name: 'Nimra', role: 'SDR', gradient: 'from-teal-500 to-emerald-400' },
  { initials: 'K', name: 'Kinza', role: 'SDR', gradient: 'from-cyan-500 to-blue-400' },
]

export default function Home() {
  const [status, setStatus] = useState<Status>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSend = () => {
    if (status !== 'idle') return
    setStatus('sending')
    timerRef.current = setTimeout(() => setStatus('sent'), 1800)
  }

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setStatus('idle')
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-[#f2f8ff] via-[#eef6ff] to-[#e9fbfd]">
      {/* ── Decorative background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(30,111,217,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(30,111,217,0.045)_1px,transparent_1px)] bg-[size:44px_44px]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="sk-float absolute -left-32 -top-32 h-96 w-96 rounded-full bg-sky-300/35 blur-3xl" />
        <div
          className="sk-float absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-teal-300/30 blur-3xl"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="sk-float absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
          style={{ animationDelay: '-3s' }}
        />
      </div>

      {/* ── Header ── */}
      <header className="relative z-10 flex items-center justify-between px-5 py-5 sm:px-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a6be0] to-[#0fb5c9] shadow-lg shadow-blue-500/25">
            <Users className="h-5 w-5 text-white" aria-hidden />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight text-slate-800">Synkrew</p>
            <p className="text-[11px] font-medium text-slate-500">AI-powered growth for healthcare practices</p>
          </div>
        </div>
        <div className="hidden items-center gap-1.5 rounded-full border border-teal-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-teal-700 shadow-sm backdrop-blur sm:flex">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
          HIPAA-Compliant Delivery
        </div>
      </header>

      {/* ── Main card ── */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-6">
        <section
          aria-label="Send login credentials"
          className="w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-7 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-9"
        >
          {/* Icon + heading */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5">
              <span aria-hidden className="sk-ring-pulse absolute inset-0 rounded-2xl bg-blue-400/40" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a6be0] to-[#0fb5c9] shadow-xl shadow-blue-500/30">
                <KeyRound className="h-8 w-8 text-white" aria-hidden />
              </div>
            </div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 ring-1 ring-blue-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              Credential Delivery Portal
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem]">
              Send Login Credentials
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Dispatch secure login credentials to your clinic team — one gentle click and it&apos;s done.
            </p>
          </div>

          {/* Profile list */}
          <ul className="mt-7 space-y-2.5" aria-label="Team profiles ready for delivery">
            {PROFILES.map((p) => (
              <li
                key={p.name}
                className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 px-4 py-3 shadow-sm transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${p.gradient} text-sm font-bold text-white shadow-md`}
                  aria-hidden
                >
                  {p.initials}
                </div>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-sm font-semibold text-slate-800">{p.name}</p>
                  <p className="truncate text-xs text-slate-400">{p.role}</p>
                </div>
                {status === 'idle' && (
                  <span key="idle" className="sk-pop inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-600 ring-1 ring-amber-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Queued
                  </span>
                )}
                {status === 'sending' && (
                  <span key="sending" className="sk-pop inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-600 ring-1 ring-blue-100">
                    <Loader2 className="h-3 w-3 animate-spin" aria-hidden />
                    Sending…
                  </span>
                )}
                {status === 'sent' && (
                  <span key="sent" className="sk-pop inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-600 ring-1 ring-emerald-100">
                    <Check className="h-3 w-3" aria-hidden />
                    Sent
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Progress line while sending */}
          <div aria-hidden className="mt-5 h-1 overflow-hidden rounded-full bg-blue-100/70">
            {status === 'sending' && (
              <div className="sk-progress h-full w-1/4 rounded-full bg-gradient-to-r from-[#1a6be0] to-[#0fb5c9]" />
            )}
          </div>

          {/* Action area */}
          <div className="mt-6">
            {status !== 'sent' ? (
              <button
                type="button"
                onClick={handleSend}
                disabled={status === 'sending'}
                aria-live="polite"
                className={`group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a6be0] to-[#0fb5c9] px-8 py-4.5 text-base font-bold text-white shadow-xl shadow-blue-500/30 transition-all duration-200 ${
                  status === 'idle'
                    ? 'hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-blue-500/40 active:scale-[0.97] min-h-[56px]'
                    : 'cursor-wait opacity-90 min-h-[56px]'
                }`}
              >
                {status === 'idle' && (
                  <span
                    aria-hidden
                    className="sk-shine-anim pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                )}
                {status === 'idle' ? (
                  <>
                    <Send className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden />
                    Send Login Credentials
                  </>
                ) : (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                    Sending Profiles…
                  </>
                )}
              </button>
            ) : (
              <div
                role="status"
                aria-live="polite"
                className="sk-fade-up relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-5 text-center"
              >
                {/* sparkles */}
                <Sparkles aria-hidden className="sk-sparkle absolute left-4 top-3 h-4 w-4 text-teal-400" />
                <Sparkles
                  aria-hidden
                  className="sk-sparkle absolute right-6 top-6 h-5 w-5 text-emerald-400"
                  style={{ animationDelay: '-0.6s' }}
                />
                <Sparkles
                  aria-hidden
                  className="sk-sparkle absolute bottom-3 right-10 h-3.5 w-3.5 text-cyan-400"
                  style={{ animationDelay: '-1.1s' }}
                />
                <div className="sk-pop mx-auto mb-2.5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/30">
                  <Check className="h-6 w-6 text-white" strokeWidth={3} aria-hidden />
                </div>
                <p className="text-lg font-extrabold tracking-tight text-emerald-700">
                  Profiles Sent!
                </p>
                <p className="mt-1 flex items-center justify-center gap-1.5 text-xs font-medium text-emerald-600/90">
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                  Login credentials delivered to all 3 team members via email.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-emerald-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-emerald-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:scale-95"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Send Again
                </button>
              </div>
            )}
          </div>

          {/* tiny reassurance */}
          <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] font-medium text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-500" aria-hidden />
            Encrypted delivery · Credentials never stored in plain text
          </p>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 mt-auto px-5 pb-6 pt-2 text-center">
        <p className="text-xs font-medium text-slate-400">
          Powered by <span className="font-bold text-slate-500">Synkrew</span> · AI-powered growth for
          healthcare practices
        </p>
      </footer>
    </div>
  )
}
