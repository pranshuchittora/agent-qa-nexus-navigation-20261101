import { useEffect, useState } from 'react'

/**
 * 高亮当前所在板块：按滚动位置计算距离顶部的可见区块。
 */
export function useActiveSection(ids = []) {
  const [active, setActive] = useState(ids[0] ?? '')

  useEffect(() => {
    if (!ids.length) return undefined

    let frame = 0

    const update = () => {
      const offset = window.innerHeight * 0.32
      let current = ids[0]

      ids.forEach((id) => {
        const node = document.getElementById(id)
        if (!node) return
        if (node.getBoundingClientRect().top - offset <= 0) current = id
      })

      setActive(current)
      frame = 0
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return active
}

export default useActiveSection
