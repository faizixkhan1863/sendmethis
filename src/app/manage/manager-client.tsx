'use client'

import Link from 'next/link'
import { ArrowLeft, Users, ShieldCheck } from 'lucide-react'
import { ProfileManager } from '@/components/profile-manager'
import { useSyncedProfiles } from '@/lib/profiles'

export function ManageClient() {
  const [profiles, updateProfiles] = useSyncedProfiles()

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
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200/80 bg-white/70 px-3.5 py-2 text-sm font-semibold text-slate-600 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-md active:scale-95"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Portal
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a6be0] to-[#0fb5c9] shadow-lg shadow-blue-500/25">
            <Users className="h-5 w-5 text-white" aria-hidden />
          </div>
          <p className="text-lg font-bold tracking-tight text-slate-800">Synkrew</p>
        </div>
      </header>

      {/* ── Main card ── */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-6">
        <section
          aria-label="Manage team profiles"
          className="w-full max-w-md rounded-3xl border border-white/70 bg-white/85 p-7 shadow-2xl shadow-blue-900/10 backdrop-blur-xl sm:p-9"
        >
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-5">
              <span aria-hidden className="sk-ring-pulse absolute inset-0 rounded-2xl bg-blue-400/40" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a6be0] to-[#0fb5c9] shadow-xl shadow-blue-500/30">
                <Users className="h-8 w-8 text-white" aria-hidden />
              </div>
            </div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 ring-1 ring-blue-100">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              Team Directory
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[1.7rem]">
              Manage Profiles
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">
              Rename team members, add new ones, or remove anyone — changes apply instantly.
            </p>
          </div>

          <div className="mt-7">
            <ProfileManager profiles={profiles} onChange={updateProfiles} />
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] font-medium text-slate-400">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-500" aria-hidden />
            Saved privately in your browser · Syncs with the portal instantly
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
