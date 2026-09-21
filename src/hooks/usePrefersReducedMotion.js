import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * 是否开启系统「减少动态效果」。用于给 React Bits 组件做静态降级。
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia(QUERY).matches
      : false,
  )

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined

    const mql = window.matchMedia(QUERY)
    const onChange = (event) => setReduced(event.matches)

    setReduced(mql.matches)
    mql.addEventListener('change', onChange)

    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export default usePrefersReducedMotion
