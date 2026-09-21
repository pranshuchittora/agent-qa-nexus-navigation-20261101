import { useEffect, useRef, useState } from 'react'

/**
 * 数字滚动：元素进入视口后，用 requestAnimationFrame 递增到目标值。
 */
export function useCountUp(target, duration = 1400) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setValue(target)
      return undefined
    }

    let frame = 0
    let start = 0
    let cancelled = false

    const step = (now) => {
      if (cancelled) return
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          frame = requestAnimationFrame(step)
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [target, duration])

  return [ref, value]
}

export default useCountUp
