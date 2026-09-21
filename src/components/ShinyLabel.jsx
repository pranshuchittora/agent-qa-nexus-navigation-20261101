import ShinyText from './reactbits/ShinyText.jsx'
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion.js'

/**
 * 区段 eyebrow 的英文标签：统一走 ShinyText 扫光，并在「减少动态效果」下降级为静态。
 */
export default function ShinyLabel({ text }) {
  const reduce = usePrefersReducedMotion()

  return (
    <ShinyText
      text={text}
      speed={4}
      color="rgba(244, 246, 251, 0.55)"
      shineColor="#ffffff"
      spread={100}
      disabled={reduce}
    />
  )
}
