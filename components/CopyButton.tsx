'use client'

import { useState } from 'react'

/** 复制一段文本，成功后短暂提示 */
export default function CopyButton({ text, label = '复制' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      window.setTimeout(() => setDone(false), 1600)
    } catch {
      setDone(false)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-light text-ink-sub transition-colors hover:bg-white/85 hover:text-ink"
    >
      {done ? '已复制' : label}
    </button>
  )
}
