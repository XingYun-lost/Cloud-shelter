import fs from 'node:fs'
import path from 'node:path'

export interface Friend {
  name: string
  url: string
  avatar?: string
  desc?: string
}

export interface FriendsData {
  /** 本站卡片，供别人取用 */
  owner?: Friend
  friends: Friend[]
}

const file = path.join(process.cwd(), 'content', 'friends.json')

function normalize(raw: unknown): Friend | undefined {
  if (!raw || typeof raw !== 'object') return undefined
  const o = raw as Record<string, unknown>
  if (typeof o.name !== 'string' || typeof o.url !== 'string') return undefined
  return {
    name: o.name,
    url: o.url,
    avatar: typeof o.avatar === 'string' ? o.avatar : undefined,
    desc: typeof o.desc === 'string' ? o.desc : undefined,
  }
}

/** 读取 content/friends.json；文件缺失或格式不对时返回空列表，不让页面崩 */
export function getFriends(): FriendsData {
  if (!fs.existsSync(file)) return { friends: [] }
  try {
    const parsed: unknown = JSON.parse(fs.readFileSync(file, 'utf8'))
    const o = (parsed ?? {}) as Record<string, unknown>
    const list = Array.isArray(o.friends) ? o.friends : []
    return {
      owner: normalize(o.owner),
      friends: list.map(normalize).filter((f): f is Friend => Boolean(f)),
    }
  } catch {
    return { friends: [] }
  }
}
