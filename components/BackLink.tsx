import Link from 'next/link'

/** 返回上一层的链接：胶囊底 + 实心箭头，比纯文字箭头更明确 */
export default function BackLink({ href, label = '单行道' }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/55 px-3.5 py-1.5 text-sm font-normal text-ink-sub backdrop-blur-sm transition-colors hover:bg-white/85 hover:text-ink"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M15 18 9 12l6-6" />
      </svg>
      {label}
    </Link>
  )
}
