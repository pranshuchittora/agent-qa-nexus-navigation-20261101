import { useEffect, useState } from 'react'

const QUERY = '(max-width: 899px), (hover: none), (prefers-reduced-motion: reduce)'

/**
 * 移动端 / 触屏 / 减少动态效果时进入轻量模式：
 * 由调用方据此跳过颗粒层、点击火花等纯装饰性的持续运行效果。
 */
export function useLiteMode() {
  const [lite, setLite] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(QUERY).matches
      : false,
  )

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined

    const mql = window.matchMedia(QUERY)
    const onChange = (event) => setLite(event.matches)

    setLite(mql.matches)
    mql.addEventListener('change', onChange)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return lite
}

export default useLiteMode
