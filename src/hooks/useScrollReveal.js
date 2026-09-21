import { useEffect } from 'react'

/**
 * 全局滚动渐显：为页面中所有 .reveal 元素注册 IntersectionObserver，
 * 并在 DOM 变化（例如分类筛选后重新渲染）时自动补挂观察器。
 */
export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )

    const observeAll = () => {
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer.observe(el))
    }

    observeAll()

    const mutation = new MutationObserver(observeAll)
    mutation.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutation.disconnect()
    }
  }, [])
}

export default useScrollReveal
