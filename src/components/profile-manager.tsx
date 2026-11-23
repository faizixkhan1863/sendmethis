'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { UserPlus, Trash2, RotateCcw, Save } from 'lucide-react'
import {
  type Profile,
  DEFAULT_PROFILES,
  initialsOf,
  gradientFor,
  ROLE_LABEL,
} from '@/lib/profiles'

type Props = {
  profiles: Profile[]
  onChange: (next: Profile[]) => void
}

export function ProfileManager({ profiles, onChange }: Props) {
  const { toast } = useToast()
  const [newName, setNewName] = useState('')

  const addProfile = () => {
    const name = newName.trim()
    if (!name) return
    onChange([...profiles, { id: crypto.randomUUID(), name }])
    setNewName('')
    toast({ title: 'Profile added', description: `${name} · ${ROLE_LABEL}` })
  }

  const renameProfile = (id: string, name: string) => {
    onChange(profiles.map((p) => (p.id === id ? { ...p, name } : p)))
  }

  const deleteProfile = (id: string) => {
    const target = profiles.find((p) => p.id === id)
    onChange(profiles.filter((p) => p.id !== id))
    if (target) toast({ title: 'Profile deleted', description: target.name })
  }

  const resetDefaults = () => {
    onChange(DEFAULT_PROFILES.map((p) => ({ ...p })))
    toast({ title: 'Reset to defaults', description: `${DEFAULT_PROFILES.length} profiles restored` })
  }

  return (
    <div className="space-y-4">
      {/* List */}
      <ul className="max-h-72 space-y-2.5 overflow-y-auto pr-1" aria-label="Team profiles">
        {profiles.map((p, i) => (
          <li key={p.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/90 px-3.5 py-3 shadow-sm transition-shadow hover:shadow-md">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientFor(i)} text-sm font-bold text-white shadow-md`}
              aria-hidden
            >
              {initialsOf(p.name)}
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <Input
                value={p.name}
                onChange={(e) => renameProfile(p.id, e.target.value)}
                placeholder="Full name"
                aria-label={`Edit name for profile ${i + 1}`}
                className="h-9 border-slate-200 font-semibold text-slate-800 focus-visible:ring-blue-300"
              />
              <p className="text-xs font-medium text-slate-400">{ROLE_LABEL}</p>
            </div>
            <button
              type="button"
              onClick={() => deleteProfile(p.id)}
              aria-label={`Delete profile ${p.name || i + 1}`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-rose-400 transition-all hover:bg-rose-50 hover:text-rose-600 active:scale-90"
            >
              <Trash2 className="h-4.5 w-4.5" aria-hidden />
            </button>
          </li>
        ))}
        {profiles.length === 0 && (
          <li className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-8 text-center text-sm font-medium text-slate-400">
            No profiles yet — add your first team member below.
          </li>
        )}
      </ul>

      {/* Add new */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addProfile()
        }}
        className="flex gap-2.5"
      >
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New team member name…"
          aria-label="New team member name"
          className="h-12 flex-1 rounded-xl border-slate-200 focus-visible:ring-blue-300"
        />
        <Button
          type="submit"
          disabled={!newName.trim()}
          className="h-12 min-w-[44px] gap-2 rounded-xl bg-gradient-to-r from-[#1a6be0] to-[#0fb5c9] px-5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/35 active:scale-95 disabled:opacity-40 disabled:hover:translate-y-0"
        >
          <UserPlus className="h-4.5 w-4.5" aria-hidden />
          Add
        </Button>
      </form>

      {/* Footer actions */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-3.5">
        <p className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
          <Save className="h-3.5 w-3.5 text-emerald-500" aria-hidden />
          Changes save automatically on this device
        </p>
        <button
          type="button"
          onClick={resetDefaults}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-700 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}
