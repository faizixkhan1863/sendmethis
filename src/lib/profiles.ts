'use client'

import { useSyncExternalStore } from 'react'

export type Profile = { id: string; name: string }

export const ROLE_LABEL = 'SDR'

export const DEFAULT_PROFILES: Profile[] = [
  { id: 'p1', name: 'Rana Kamran' },
  { id: 'p2', name: 'Waqas Malik' },
  { id: 'p3', name: 'Abeera Maroof' },
  { id: 'p4', name: 'Ahmad Faiz' },
]

const STORAGE_KEY = 'synkrew_team_profiles'
const CHANGE_EVENT = 'synkrew-profiles-change'

/** Parse a raw localStorage string into a validated profile list. */
function parseProfiles(raw: string | null): Profile[] {
  if (!raw) return DEFAULT_PROFILES
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return DEFAULT_PROFILES
    return parsed
      .filter(
        (p): p is { id?: unknown; name: string } =>
          typeof p === 'object' && p !== null && typeof (p as { name?: unknown }).name === 'string'
      )
      .map((p) => ({
        id: typeof p.id === 'string' && p.id.length > 0 ? p.id : crypto.randomUUID(),
        name: (p.name as string).trim(),
      }))
      .filter((p) => p.name.length > 0)
  } catch {
    return DEFAULT_PROFILES
  }
}

/* ── External store plumbing for useSyncExternalStore ──
   A module-level cache keeps the snapshot referentially stable. */
let snapshotCache: { raw: string; list: Profile[] } | null = null

function getSnapshot(): Profile[] {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (snapshotCache && snapshotCache.raw === raw) return snapshotCache.list
  const list = parseProfiles(raw)
  snapshotCache = { raw: raw ?? '', list }
  return list
}

function getServerSnapshot(): Profile[] {
  return DEFAULT_PROFILES
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener('storage', onChange)
  window.addEventListener(CHANGE_EVENT, onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener(CHANGE_EVENT, onChange)
  }
}

function notify(): void {
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

/**
 * Reactive team-profiles store backed by browser localStorage.
 * Safe across tabs (storage event) and same-tab updates (custom event).
 */
export function useSyncedProfiles(): [Profile[], (next: Profile[]) => void] {
  const profiles = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const updateProfiles = (next: Profile[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      snapshotCache = { raw: JSON.stringify(next), list: next }
    } catch {
      // storage full or unavailable — keep in-memory state only
    }
    notify()
  }
  return [profiles, updateProfiles]
}

/** Derive up-to-2-letter initials from a full name. */
export function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

const AVATAR_GRADIENTS = [
  'from-blue-500 to-sky-400',
  'from-teal-500 to-emerald-400',
  'from-cyan-500 to-blue-400',
  'from-violet-500 to-purple-400',
]

/** Cycle avatar gradient colors by list index. */
export function gradientFor(index: number): string {
  return AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]
}
