import type { Metadata } from 'next'
import Link from 'next/link'
import CopyButton from '@/components/CopyButton'
import Footer from '@/components/Footer'
import Reveal from '@/components/Reveal'
import { getFriends } from '@/lib/friends'

export const metadata: Metadata = {
  title: '岔路迷途 · 云端庇护所',
  description: '走在这条路上的人，各有各的方向。',
}

/** 岔路迷途：友链板 */
export default function FriendsPage() {
  const { owner, friends } = getFriends()

  const snippet = owner
    ? `<a href="${owner.url}" target="_blank" rel="noopener"><img src="${owner.avatar ?? ''}" width="96" height="96" alt="${owner.name}"></a>`
    : ''

  return (
    <main className="mx-auto w-full max-w-3xl px-6 pt-12">
      <Reveal className="mb-12">
        <Link href="/clouds" className="text-sm font-light text-ink-sub transition-colors hover:text-ink">
          ← 单行道
        </Link>
        <div className="mt-8 text-center">
          <h1 className="font-serif text-2xl font-normal tracking-wide text-ink">岔路迷途</h1>
          <p className="mt-3 text-sm font-light leading-relaxed text-ink-sub">
            走在这条路上的人，各有各的方向。
          </p>
        </div>
      </Reveal>

      {/* 本站卡片 */}
      {owner && (
        <Reveal className="mb-14">
          <div className="glass p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">本站</p>
            <div className="mt-4 flex items-start gap-4">
              {owner.avatar && (
                <img
                  src={owner.avatar}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-serif text-lg font-normal text-ink">{owner.name}</p>
                <p className="mt-1 text-sm font-light text-ink-sub">{owner.desc}</p>
                <p className="mt-2 break-all font-mono text-[11px] text-ink-faint">{owner.url}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <CopyButton text={snippet} label="复制友链代码" />
              <CopyButton text={owner.url} label="复制网址" />
            </div>
          </div>
        </Reveal>
      )}

      {/* 别人的岔路 */}
      <section className="mb-14">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">别人的岔路</h2>

        {friends.length === 0 ? (
          <Reveal className="mt-5">
            <p className="glass px-6 py-10 text-center text-sm font-light text-ink-faint">
              还没有别人的岔路。
            </p>
          </Reveal>
        ) : (
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {friends.map((f, i) => (
              <Reveal as="li" key={f.url} delay={i * 0.05} className="min-w-0">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover flex min-w-0 items-start gap-3 p-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sand/40 text-sm text-ink-mute">
                    {f.avatar ? (
                      <img src={f.avatar} alt="" className="h-full w-full object-cover" />
                    ) : (
                      f.name.slice(0, 1)
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-serif text-base font-normal text-ink">{f.name}</span>
                    <span className="mt-1 block text-xs font-light leading-relaxed text-ink-sub">
                      {f.desc}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        )}
      </section>

      {/* 交换说明 */}
      <Reveal className="mb-16">
        <div className="rounded-2xl border border-white/60 bg-white/40 p-6">
          <p className="font-serif text-sm font-normal text-ink">想交换友链？</p>
          <p className="mt-2 text-sm font-light leading-relaxed text-ink-sub">
            把你的站名、网址、头像地址和一句话发给我，我会把它放到这条岔路上。
          </p>
          <p className="mt-3 text-xs font-light leading-relaxed text-ink-faint">
            只放自己能长久维护的站点；你会看见它出现在这里。
          </p>
        </div>
      </Reveal>

      <Footer />
    </main>
  )
}
